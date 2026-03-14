export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  userId: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: {
    name: string;
  };
  createdAt: string;
}
