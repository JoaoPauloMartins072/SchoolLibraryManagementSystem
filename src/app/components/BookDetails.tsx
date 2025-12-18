import { ArrowLeft, Book, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { mockBooks } from '../data/mockData';

interface BookDetailsProps {
  bookId: string;
  onNavigate: (view: string, bookId?: string) => void;
}

export function BookDetails({ bookId, onNavigate }: BookDetailsProps) {
  const book = mockBooks.find(b => b.id === bookId);
  
  if (!book) {
    return (
      <div className="p-6">
        <p>Book not found</p>
      </div>
    );
  }

  const similarBooks = mockBooks
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const handleBorrow = () => {
    alert(`Borrowing "${book.title}". This would create a new loan record in a real system.`);
  };

  const handleReserve = () => {
    alert(`Reserving "${book.title}". You will be notified when it becomes available.`);
  };

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => onNavigate('search')}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Book Cover */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 shadow-lg">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {book.availableCopies > 0 ? (
              <Badge className="w-full justify-center py-2 bg-green-100 text-green-700 hover:bg-green-200">
                {book.availableCopies} of {book.totalCopies} Available
              </Badge>
            ) : (
              <Badge className="w-full justify-center py-2 bg-red-100 text-red-700 hover:bg-red-200">
                All Copies Checked Out
              </Badge>
            )}

            <div className="space-y-2">
              <Button 
                className="w-full bg-blue-900 hover:bg-blue-800" 
                disabled={book.availableCopies === 0}
                onClick={handleBorrow}
              >
                <Book className="w-4 h-4 mr-2" />
                Borrow Book
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleReserve}
              >
                Reserve
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{book.title}</h1>
            <p className="text-xl text-slate-600 mb-4">by {book.author}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline">{book.category}</Badge>
              <Badge variant="outline">Published {book.year}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-500">ISBN</p>
                <p className="font-medium">{book.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Publication Year</p>
                <p className="font-medium">{book.year}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Category</p>
                <p className="font-medium">{book.category}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium">{book.location}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed">{book.description}</p>
            </div>
          </div>

          {/* Borrowing Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Borrowing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Loan Period</p>
                  <p className="text-sm text-slate-600">30 days from checkout date</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Book className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Borrowing Limit</p>
                  <p className="text-sm text-slate-600">Maximum 5 books at a time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">Late Fees</p>
                  <p className="text-sm text-slate-600">$0.50 per day after due date</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Books */}
          {similarBooks.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">Similar Books</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarBooks.map((similarBook) => (
                  <div
                    key={similarBook.id}
                    className="group cursor-pointer"
                    onClick={() => onNavigate('book-detail', similarBook.id)}
                  >
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 mb-2">
                      <img
                        src={similarBook.coverUrl}
                        alt={similarBook.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-medium text-sm line-clamp-1 group-hover:text-blue-900">
                      {similarBook.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{similarBook.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
