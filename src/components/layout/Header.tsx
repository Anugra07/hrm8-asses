import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoDark from '@/assets/logo-dark.png';
import { useAuth } from '@/contexts/AuthContext';
import { LoginDialog } from '@/components/auth/LoginDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/assessments', label: 'Assessments' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src={logoDark} alt="HRM8" className="h-8 w-auto" />
          </Link>
          <div className="h-5 w-px bg-border" />
          <Link to="/dashboard" className="text-sm font-semibold tracking-wider text-primary uppercase hover:text-primary/80 transition-colors cursor-pointer">
            Assessment Hub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.href)
                  ? 'text-primary bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                Dashboard
              </Button>
            </Link>
          ) : (
            <LoginDialog>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </LoginDialog>
          )}
          <Link to="/wizard">
            <Button variant="hero" size="sm">
              Start Assessment
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
              {isAuthenticated ? (
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <LoginDialog onOpenChange={(open) => !open && setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </LoginDialog>
              )}
              <Link to="/wizard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
