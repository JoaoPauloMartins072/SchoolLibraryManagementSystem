// Mock data for the School Library Management System

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  year: number;
  description: string;
  coverUrl: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff';
  studentId?: string;
  avatar: string;
}

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'overdue' | 'returned';
}

export interface Fine {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  status: 'unpaid' | 'paid';
}

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    isbn: '978-0-06-112008-4',
    year: 1960,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    totalCopies: 5,
    availableCopies: 2,
    location: 'Shelf A3 – Fiction'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    isbn: '978-0-452-28423-4',
    year: 1949,
    description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
    coverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop',
    totalCopies: 4,
    availableCopies: 0,
    location: 'Shelf A3 – Fiction'
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    isbn: '978-0-7432-7356-5',
    year: 1925,
    description: 'A critique of the American Dream set in the Jazz Age.',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    totalCopies: 3,
    availableCopies: 3,
    location: 'Shelf A2 – Fiction'
  },
  {
    id: '4',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'Computer Science',
    isbn: '978-0-262-03384-8',
    year: 2009,
    description: 'Comprehensive text on computer algorithms and data structures.',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    totalCopies: 6,
    availableCopies: 4,
    location: 'Shelf C5 – Technology'
  },
  {
    id: '5',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    isbn: '978-0-553-10953-5',
    year: 1988,
    description: 'An exploration of cosmology and the nature of time and the universe.',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
    totalCopies: 4,
    availableCopies: 2,
    location: 'Shelf B7 – Science'
  },
  {
    id: '6',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Fiction',
    isbn: '978-0-14-143951-8',
    year: 1813,
    description: 'A romantic novel of manners set in Georgian England.',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    totalCopies: 5,
    availableCopies: 3,
    location: 'Shelf A1 – Fiction'
  },
  {
    id: '7',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    category: 'Fiction',
    isbn: '978-0-316-76948-0',
    year: 1951,
    description: 'A story about teenage rebellion and alienation.',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    totalCopies: 4,
    availableCopies: 1,
    location: 'Shelf A4 – Fiction'
  },
  {
    id: '8',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'History',
    isbn: '978-0-062-31609-1',
    year: 2011,
    description: 'A brief history of humankind from the Stone Age to modern times.',
    coverUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=400&fit=crop',
    totalCopies: 5,
    availableCopies: 5,
    location: 'Shelf D2 – History'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@school.edu',
    role: 'student',
    studentId: 'S2023001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@school.edu',
    role: 'staff',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.d@school.edu',
    role: 'student',
    studentId: 'S2023002',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  }
];

export const mockLoans: Loan[] = [
  {
    id: '1',
    bookId: '2',
    userId: '1',
    borrowDate: '2024-11-15',
    dueDate: '2024-12-15',
    status: 'active'
  },
  {
    id: '2',
    bookId: '5',
    userId: '1',
    borrowDate: '2024-12-01',
    dueDate: '2025-01-01',
    status: 'active'
  },
  {
    id: '3',
    bookId: '7',
    userId: '1',
    borrowDate: '2024-11-01',
    dueDate: '2024-12-01',
    status: 'overdue'
  }
];

export const mockFines: Fine[] = [
  {
    id: '1',
    userId: '1',
    amount: 5.00,
    reason: 'Late return - The Catcher in the Rye',
    status: 'unpaid'
  }
];

export const mockActivity = [
  {
    id: '1',
    type: 'borrow',
    book: 'A Brief History of Time',
    date: '2024-12-01',
    user: 'John Smith'
  },
  {
    id: '2',
    type: 'return',
    book: 'Pride and Prejudice',
    date: '2024-11-30',
    user: 'Emily Davis'
  },
  {
    id: '3',
    type: 'borrow',
    book: '1984',
    date: '2024-11-15',
    user: 'John Smith'
  }
];
