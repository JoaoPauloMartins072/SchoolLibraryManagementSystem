import { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { mockBooks } from '../data/mockData';

interface SearchCatalogueProps {
  onNavigate: (view: string, bookId?: string) => void;
}

export function SearchCatalogue({ onNavigate }: SearchCatalogueProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(mockBooks.map(book => book.category)))];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    
    const matchesAvailability = availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && book.availableCopies > 0) ||
      (availabilityFilter === 'checked-out' && book.availableCopies === 0);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Search Catalogue</h1>
        <p className="text-slate-500 mt-1">Find and borrow books from our collection</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="search"
            placeholder="Search by title, author, ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-lg h-12"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-slate-700 mb-2 block">Availability</label>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Books</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium">{filteredBooks.length}</span> results
          </p>
          <Select defaultValue="title">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id} className="cursor-pointer hover:bg-slate-50">
                <TableCell>
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Badge variant="outline">{book.category}</Badge>
                </TableCell>
                <TableCell>
                  {book.availableCopies > 0 ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      {book.availableCopies} Available
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
                      Checked Out
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate('book-detail', book.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">1</Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">2</Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">3</Button>
          </div>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
