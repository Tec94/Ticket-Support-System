import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/lib/auth';
import { LogOut, Moon, Sun, TicketIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { toggleTheme, theme } = useTheme();
  const { user, signOut } = useAuth();

  const handleDashboardClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-50 bg-background">
        <nav className="h-16 flex items-center justify-between px-4 md:px-6">
          <button
            onClick={handleDashboardClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Go to dashboard"
          >
            <TicketIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold">Support Desk</h1>
          </button>
          <div className="flex items-center gap-2">
            {user && (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.email}
                </span>
                <Button variant="ghost" size="icon" onClick={() => signOut()}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}