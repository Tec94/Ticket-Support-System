import { ThemeProvider } from '@/components/theme-provider';
import { AuthForm } from '@/components/auth/auth-form';
import { AuthProvider, useAuth } from '@/lib/auth';
import { Layout } from '@/components/layout/layout';
import { TicketList } from '@/components/tickets/ticket-list';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider>
      <Layout>
        {user ? (
          <div className="w-full max-w-[2000px]">
            <TicketList />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <AuthForm />
          </div>
        )}
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProviders;