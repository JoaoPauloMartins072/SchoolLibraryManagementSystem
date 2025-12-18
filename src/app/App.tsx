import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { SearchCatalogue } from './components/SearchCatalogue';
import { BookDetails } from './components/BookDetails';
import { UserAccount } from './components/UserAccount';
import { AdminPanel } from './components/AdminPanel';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { mockUsers } from './data/mockData';

type View = 'dashboard' | 'search' | 'borrow' | 'return' | 'account' | 'admin' | 'book-detail';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<typeof mockUsers[0] | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleLogin = (role: 'student' | 'staff') => {
    // Set user based on role
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('dashboard');
    setSelectedBookId(null);
  };

  const handleNavigate = (view: string, bookId?: string) => {
    setCurrentView(view as View);
    if (bookId) {
      setSelectedBookId(bookId);
    }
  };

  // Show login screen if not logged in
  if (!isLoggedIn || !currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Main application layout
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        userRole={currentUser.role}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          userName={currentUser.name}
          userRole={currentUser.role}
          userAvatar={currentUser.avatar}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <Dashboard
              userName={currentUser.name}
              userId={currentUser.id}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'search' && (
            <SearchCatalogue onNavigate={handleNavigate} />
          )}

          {currentView === 'borrow' && (
            <div className="p-6">
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Borrow a Book</h2>
                <p className="text-slate-500 mb-4">
                  Use the Search Books section to find and borrow books
                </p>
                <button
                  onClick={() => handleNavigate('search')}
                  className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Go to Search
                </button>
              </div>
            </div>
          )}

          {currentView === 'return' && (
            <div className="p-6">
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Return a Book</h2>
                <p className="text-slate-500 mb-4">
                  Visit the library desk to return your borrowed books
                </p>
                <button
                  onClick={() => handleNavigate('account')}
                  className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  View My Loans
                </button>
              </div>
            </div>
          )}

          {currentView === 'account' && (
            <UserAccount user={currentUser} />
          )}

          {currentView === 'admin' && currentUser.role === 'staff' && (
            <AdminPanel />
          )}

          {currentView === 'book-detail' && selectedBookId && (
            <BookDetails bookId={selectedBookId} onNavigate={handleNavigate} />
          )}
        </main>
      </div>
    </div>
  );
}
