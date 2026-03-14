import { Router } from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/add', addExpense);
router.get('/all', getExpenses);
router.put('/update/:id', updateExpense);
router.delete('/delete/:id', deleteExpense);

export default router;
