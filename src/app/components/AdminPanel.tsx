import { useState } from 'react';
import { Plus, Edit, Trash, Users, Book, Settings } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { mockBooks, mockUsers, mockLoans } from '../data/mockData';

export function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalBooks: mockBooks.reduce((sum, book) => sum + book.totalCopies, 0),
    availableBooks: mockBooks.reduce((sum, book) => sum + book.availableCopies, 0),
    totalUsers: mockUsers.length,
    activeLoans: mockLoans.filter(loan => loan.status !== 'returned').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-500 mt-1">Staff Only • Manage library resources</p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
          Staff Access
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Books</CardDescription>
            <CardTitle className="text-3xl">{stats.totalBooks}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.availableBooks}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{stats.totalUsers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Loans</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.activeLoans}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="books" className="space-y-4">
        <TabsList>
          <TabsTrigger value="books" className="gap-2">
            <Book className="w-4 h-4" />
            Manage Books
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Manage Users
          </TabsTrigger>
          <TabsTrigger value="loans" className="gap-2">
            <Settings className="w-4 h-4" />
            Loans & Returns
          </TabsTrigger>
        </TabsList>

        {/* Manage Books */}
        <TabsContent value="books">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Book Management</CardTitle>
                  <CardDescription>Add, edit, or remove books from the catalogue</CardDescription>
                </div>
                <Button className="bg-blue-900 hover:bg-blue-800 gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Book
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-center">Total Copies</TableHead>
                    <TableHead className="text-center">Available</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{book.totalCopies}</TableCell>
                      <TableCell className="text-center">{book.availableCopies}</TableCell>
                      <TableCell>
                        {book.availableCopies > 0 ? (
                          <Badge className="bg-green-100 text-green-700">In Stock</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">All Out</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Users */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage library users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.studentId || '—'}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loans & Returns */}
        <TabsContent value="loans">
          <Card>
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
              <CardDescription>Monitor and manage current book loans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Borrowed Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLoans
                    .filter(loan => loan.status !== 'returned')
                    .map((loan) => {
                      const book = mockBooks.find(b => b.id === loan.bookId);
                      const user = mockUsers.find(u => u.id === loan.userId);
                      return (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{book?.title}</TableCell>
                          <TableCell>{user?.name}</TableCell>
                          <TableCell>{loan.borrowDate}</TableCell>
                          <TableCell>{loan.dueDate}</TableCell>
                          <TableCell>
                            {loan.status === 'overdue' ? (
                              <Badge className="bg-red-100 text-red-700">Overdue</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700">Active</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline">
                              Process Return
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
