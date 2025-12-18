import { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface LoginScreenProps {
  onLogin: (role: 'student' | 'staff') => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo logic: staff emails contain "staff"
    const role = email.includes('staff') ? 'staff' : 'student';
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-2">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl">School Library System</CardTitle>
          <CardDescription>Sign in to manage your library account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username / Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="cursor-pointer">
                Remember me
              </Label>
            </div>
            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
              Log In
            </Button>
            <div className="text-center">
              <a href="#" className="text-sm text-blue-900 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-slate-500">
          © School Library – Internal system
        </CardFooter>
      </Card>
      <div className="absolute bottom-4 left-4 text-xs text-slate-500 bg-white/80 p-2 rounded">
        Demo: Use "john@school.edu" for student or "sarah@staff.school.edu" for staff
      </div>
    </div>
  );
}
