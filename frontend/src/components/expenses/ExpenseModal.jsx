import React from 'react';
import Modal from '../ui/Modal';
import ExpenseForm from './ExpenseForm';
import { useExpenses } from '../../context/ExpenseContext';
import toast from 'react-hot-toast';

const ExpenseModal = ({ isOpen, onClose, expense }) => {
  const { addExpense, updateExpense } = useExpenses();

  const handleSubmit = async (data) => {
    try {
      if (expense) {
        await updateExpense(expense.id, data);
        toast.success('Expense updated successfully');
      } else {
        await addExpense(data);
        toast.success('Expense added successfully');
      }
      onClose();
    } catch (error) {
      toast.error(expense ? 'Failed to update expense' : 'Failed to add expense');
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={expense ? 'Edit Expense' : 'Add Expense'}
      size="md"
    >
      <ExpenseForm
        initialData={expense}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ExpenseModal;
