import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton } from '../(admin)/LogoutButton';

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // This shouldn't happen due to middleware, but double-check
  if (!user) {
    redirect('/login');
  }

  // Check for member or admin role
  if (user.role !== 'ADMIN' && user.role !== 'MEMBER') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      {/* Member Header */}
      <header className="sticky top-0 z-50 bg-rr-dark/95 backdrop-blur-sm border-b-2 border-rr-green/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Nav */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                RR
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/member/dashboard"
                  className="text-rr-green hover:text-rr-yellow transition-colors text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/member/songs"
                  className="text-rr-green hover:text-rr-yellow transition-colors text-sm font-medium"
                >
                  Songs
                </Link>
                <Link
                  href="/member/profile"
                  className="text-rr-green hover:text-rr-yellow transition-colors text-sm font-medium"
                >
                  Profile
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin/manage"
                    className="text-rr-pink hover:text-rr-yellow transition-colors text-sm font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
              </nav>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-rr-yellow">
                  {user.member?.displayName || user.email}
                </p>
                <p className="text-xs text-rr-green/60 uppercase tracking-wider">
                  {user.role}
                </p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}


