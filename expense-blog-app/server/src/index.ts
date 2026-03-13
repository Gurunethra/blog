import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import blogRoutes from './routes/blog.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/blog', blogRoutes);

app.get('/', (req, res) => {
  res.send('Expense Blog App API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
