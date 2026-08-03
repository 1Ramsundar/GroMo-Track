import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const CATEGORIES = [
  { label: 'Food', value: 'Food' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Shopping', value: 'Shopping' },
  { label: 'Bills', value: 'Bills' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Education', value: 'Education' },
  { label: 'Others', value: 'Others' }
];

const PAYMENT_METHODS = [
  { label: 'Cash', value: 'Cash' },
  { label: 'UPI', value: 'UPI' },
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'Debit Card', value: 'Debit Card' },
  { label: 'Net Banking', value: 'Net Banking' }
];

const ExpenseForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    paymentMethod: 'Cash',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        paymentMethod:
          initialData.paymentMethod || initialData.payment_method || "Cash",
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || Number(formData.amount) < 1) newErrors.amount = 'Valid amount is required (min 1)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      amount: Number(formData.amount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="e.g. Lunch at Cafe"
      />
      <Input
        label="Amount (₹)"
        type="number"
        name="amount"
        min="1"
        step="0.01"
        value={formData.amount}
        onChange={handleChange}
        error={errors.amount}
        placeholder="e.g. 500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={CATEGORIES}
        />
        <Select
          label="Payment Method"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          options={PAYMENT_METHODS}
        />
      </div>
      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors bg-white"
          placeholder="Optional notes..."
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update Expense' : 'Add Expense'}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
