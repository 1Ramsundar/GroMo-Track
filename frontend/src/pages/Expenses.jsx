import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from '../components/layout/DashboardLayout';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseCard from '../components/expenses/ExpenseCard';
import ExpenseSearch from '../components/expenses/ExpenseSearch';
import ExpenseFilters from '../components/expenses/ExpenseFilters';
import ExpensePagination from '../components/expenses/ExpensePagination';
import ExpenseModal from '../components/expenses/ExpenseModal';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';
import SectionTitle from '../components/ui/SectionTitle';
import { useExpenses } from '../context/ExpenseContext';
import { Plus, Receipt, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Expenses = () => {
  const { expenses, deleteExpense, loading } = useExpenses();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    paymentMethod: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [modalState, setModalState] = useState({ isOpen: false, expense: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, expense: null });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("add") === "true") {
      setModalState({
        isOpen: true,
        expense: null,
      });

      navigate("/expenses", { replace: true });
    }
  }, [location.search, navigate]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: 'all', paymentMethod: 'all', dateFrom: '', dateTo: '' });
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const confirmDelete = async () => {
    try {
      await deleteExpense(deleteModal.expense.id);
      toast.success('Expense deleted successfully');
      setDeleteModal({ isOpen: false, expense: null });
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  // Filter & Sort Logic
  const processedExpenses = useMemo(() => {
    let result = [...(expenses || [])];

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(ex => 
        ex.title.toLowerCase().includes(lowerSearch) ||
        ex.category.toLowerCase().includes(lowerSearch) ||
        (ex.notes && ex.notes.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter
    if (filters.category !== 'all') {
      result = result.filter(ex => ex.category === filters.category);
    }
    if (filters.paymentMethod !== 'all') {
      result = result.filter(ex => ex.paymentMethod === filters.paymentMethod);
    }
    if (filters.dateFrom) {
      result = result.filter(ex => new Date(ex.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter(ex => new Date(ex.date) <= new Date(filters.dateTo));
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'date') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (sortConfig.key === 'amount') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [expenses, searchTerm, filters, sortConfig]);

  // Pagination Logic
  const totalItems = processedExpenses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const currentExpenses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedExpenses.slice(start, start + itemsPerPage);
  }, [processedExpenses, currentPage, itemsPerPage]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <SectionTitle 
            title="Expenses" 
            subtitle="Manage and track your daily spending"
          />
          <Button 
            variant="primary" 
            onClick={() => setModalState({ isOpen: true, expense: null })}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Expense
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <ExpenseSearch value={searchTerm} onChange={setSearchTerm} />
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              icon={<Filter className="w-4 h-4" />}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {showFilters && (
            <ExpenseFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onClearFilters={clearFilters}
            />
          )}
        </div>

        {loading && expenses.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-700"></div>
          </div>
        ) : currentExpenses.length > 0 ? (
          <>
            <ExpenseTable 
              expenses={currentExpenses}
              onEdit={(expense) => setModalState({ isOpen: true, expense })}
              onDelete={(expense) => setDeleteModal({ isOpen: true, expense })}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            
            <div className="md:hidden">
              {currentExpenses.map(expense => (
                <ExpenseCard 
                  key={expense.id}
                  expense={expense}
                  onEdit={(ex) => setModalState({ isOpen: true, expense: ex })}
                  onDelete={(ex) => setDeleteModal({ isOpen: true, expense: ex })}
                />
              ))}
            </div>

            <ExpensePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(num) => {
                setItemsPerPage(num);
                setCurrentPage(1);
              }}
            />
          </>
        ) : (
          <EmptyState 
            icon={Receipt}
            title={searchTerm || showFilters ? "No matching expenses" : "No expenses yet"}
            description={
              searchTerm || showFilters 
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Start tracking your spending by adding your first expense."
            }
            actionLabel={!(searchTerm || showFilters) ? "Add Expense" : "Clear Filters"}
            onAction={() => !(searchTerm || showFilters) ? setModalState({ isOpen: true, expense: null }) : clearFilters()}
          />
        )}
      </div>

      <ExpenseModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, expense: null })}
        expense={modalState.expense}
      />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, expense: null })}
        title="Delete Expense"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Are you sure you want to delete this expense? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setDeleteModal({ isOpen: false, expense: null })}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Expenses;
