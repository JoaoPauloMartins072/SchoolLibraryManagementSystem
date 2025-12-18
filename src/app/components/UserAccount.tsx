import { AlertCircle, Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { mockBooks, mockLoans, mockFines } from '../data/mockData';

interface UserAccountProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'staff';
    studentId?: string;
    avatar: string;
  };
}

export function UserAccount({ user }: UserAccountProps) {
  const userLoans = mockLoans.filter(loan => loan.userId === user.id);
  const activeLoans = userLoans.filter(loan => loan.status !== 'returned');
  const loanHistory = userLoans.filter(loan => loan.status === 'returned');
  const userFines = mockFines.filter(fine => fine.userId === user.id);

  const getBookById = (bookId: string) => mockBooks.find(b => b.id === bookId);

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-500 mt-1">{user.email}</p>
              <div className="flex items-center gap-3 mt-3">
                {user.studentId && (
                  <Badge variant="outline">Student ID: {user.studentId}</Badge>
                )}
                <Badge className="capitalize bg-blue-100 text-blue-700">
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overdue Notice */}
      {userLoans.some(loan => loan.status === 'overdue') && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">You have overdue items</p>
            <p className="text-sm text-red-700 mt-1">
              Please return your overdue books to avoid additional late fees.
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Loans</TabsTrigger>
          <TabsTrigger value="history">Borrowing History</TabsTrigger>
          <TabsTrigger value="fines">Fines & Payments</TabsTrigger>
        </TabsList>

        {/* Current Loans */}
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Loans</CardTitle>
            </CardHeader>
            <CardContent>
              {activeLoans.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No active loans</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Borrowed Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLoans.map((loan) => {
                      const book = getBookById(loan.bookId);
                      const daysUntilDue = getDaysUntilDue(loan.dueDate);
                      
                      return (
                        <TableRow key={loan.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={book?.coverUrl}
                                alt={book?.title}
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium">{book?.title}</p>
                                <p className="text-sm text-slate-500">{book?.author}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {loan.borrowDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400" />
                              {loan.dueDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            {loan.status === 'overdue' ? (
                              <Badge className="bg-red-100 text-red-700">
                                Overdue by {Math.abs(daysUntilDue)} days
                              </Badge>
                            ) : daysUntilDue <= 3 ? (
                              <Badge className="bg-orange-100 text-orange-700">
                                Due in {daysUntilDue} days
                              </Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700">
                                Active
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Borrowing History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing History</CardTitle>
            </CardHeader>
            <CardContent>
              {loanHistory.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No borrowing history</p>
              ) : (
                <div className="space-y-3">
                  {loanHistory.map((loan) => {
                    const book = getBookById(loan.bookId);
                    return (
                      <div key={loan.id} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                        <img
                          src={book?.coverUrl}
                          alt={book?.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{book?.title}</p>
                          <p className="text-sm text-slate-500">{book?.author}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            Borrowed: {loan.borrowDate} • Returned: {loan.returnDate}
                          </p>
                        </div>
                        <Badge variant="outline">Returned</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fines & Payments */}
        <TabsContent value="fines">
          <Card>
            <CardHeader>
              <CardTitle>Fines & Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {userFines.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No fines or payments</p>
              ) : (
                <div className="space-y-4">
                  {userFines.map((fine) => (
                    <div key={fine.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div>
                        <p className="font-medium">{fine.reason}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          Status: <span className={fine.status === 'unpaid' ? 'text-red-600' : 'text-green-600'}>
                            {fine.status === 'unpaid' ? 'Unpaid' : 'Paid'}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">${fine.amount.toFixed(2)}</p>
                        {fine.status === 'unpaid' && (
                          <Button size="sm" className="mt-2">Pay Now</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
