import type { Response } from 'express';
import prisma from '../utils/prisma.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const addExpense = async (req: AuthRequest, res: Response) => {
  const { title, amount, category, date } = req.body;
  try {
    const expense = await prisma.expense.create({
      data: {
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        userId: req.userId!,
      },
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'desc' },
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error getting expenses', error });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  const id = req.params['id'];
  const { title, amount, category, date } = req.body;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid expense ID' });
  }

  try {
    const expense = await prisma.expense.update({
      where: { id, userId: req.userId! },
      data: {
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
      },
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  const id = req.params['id'];
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid expense ID' });
  }

  try {
    await prisma.expense.delete({
      where: { id, userId: req.userId! },
    });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};
