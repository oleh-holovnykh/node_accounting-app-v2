'use strict';

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getFiltered = (userId, category, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === userId));
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense => (
      category.includes(expense.category)));
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= fromDate;
    });
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate <= toDate;
    });
  }

  return filteredExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(({ id }) => id === expenseId);

  return foundExpense || null;
};

const addExpense = (expenseData) => {
  const maxId = Math.max(...expenses.map(expense => expense.id), 0);
  const newId = maxId + 1;

  const newExpense = {
    id: newId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== expenseId);
};

const updateExpense = (expenseId, newExpenseData) => {
  let expense = getById(expenseId);

  expense = {
    ...expense,
    ...newExpenseData,
  };

  return expense;
};

module.exports = {
  resetExpenses,
  getFiltered,
  getById: getById,
  addExpense,
  removeExpense,
  updateExpense,
};