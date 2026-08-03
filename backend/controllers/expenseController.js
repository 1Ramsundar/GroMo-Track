import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
    console.log("Fetching expenses for user:", req.user.id);

  try {
    const expenses = await Expense.getAllByUser(req.user.id);

    res.json({
      success: true,
      expenses
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses"
    });
  }
};

export const addExpense = async (req, res) => {

    console.log("Logged in user:", req.user.id);
    console.log("Expense body:", req.body);

  try {
    const {
      title,
      amount,
      category,
      paymentMethod,
      date,
      notes
    } = req.body;

    const expense = await Expense.create({
      user_id: req.user.id,
      title,
      amount,
      category,
      payment_method: paymentMethod,
      date,
      notes
    });

    res.status(201).json({
      success: true,
      expense
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to add expense"
    });
  }
};

export const updateExpense = async (req, res) => {
  try {

    const {
      title,
      amount,
      category,
      paymentMethod,
      date,
      notes
    } = req.body;

    const expense = await Expense.update(
      req.params.id,
      req.user.id,
      {
        title,
        amount,
        category,
        payment_method: paymentMethod,
        date,
        notes
      }
    );

    res.json({
      success: true,
      expense
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update expense"
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.delete(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Expense deleted"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete expense"
    });
  }
};