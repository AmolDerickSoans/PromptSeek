import AuthGuard from '@/components/AuthGuard';
import LogoutButton from '@/components/LogOutButton';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <h1>Dashboard</h1>
      <LogoutButton />
      {/* Dashboard content */}
    </AuthGuard>
  );
}