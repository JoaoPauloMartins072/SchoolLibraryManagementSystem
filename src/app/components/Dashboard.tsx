import { Book, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockBooks, mockLoans, mockFines, mockActivity } from '../data/mockData';

interface DashboardProps {
  userName: string;
  userId: string;
  onNavigate: (view: string, bookId?: string) => void;
}

export function Dashboard({ userName, userId, onNavigate }: DashboardProps) {
  const userLoans = mockLoans.filter(loan => loan.userId === userId);
  const userFines = mockFines.filter(fine => fine.userId === userId);
  const overdueLoans = userLoans.filter(loan => loan.status === 'overdue');
  const totalFines = userFines.reduce((sum, fine) => sum + (fine.status === 'unpaid' ? fine.amount : 0), 0);

  const recommendedBooks = mockBooks.filter(book => book.availableCopies > 0).slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {userName}! 👋</h1>
        <p className="text-slate-500 mt-1">Here's your library overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
            <Book className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userLoans.filter(l => l.status !== 'returned').length}</div>
            <p className="text-xs text-slate-500 mt-1">Currently checked out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overdueLoans.length}</div>
            <p className="text-xs text-slate-500 mt-1">Books overdue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fines</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalFines.toFixed(2)}</div>
            <p className="text-xs text-slate-500 mt-1">Outstanding balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Books */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Books</CardTitle>
          <CardDescription>Popular books available for borrowing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedBooks.map((book) => (
              <div
                key={book.id}
                className="group cursor-pointer"
                onClick={() => onNavigate('book-detail', book.id)}
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 mb-2">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-medium text-sm line-clamp-1 group-hover:text-blue-900">{book.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{book.author}</p>
                <Badge variant="secondary" className="mt-1 text-xs bg-green-100 text-green-700">
                  {book.availableCopies} Available
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest library transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'borrow' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <Book className={`w-5 h-5 ${
                    activity.type === 'borrow' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.type === 'borrow' ? 'Borrowed' : 'Returned'}: {activity.book}
                  </p>
                  <p className="text-xs text-slate-500">{activity.user} • {activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
