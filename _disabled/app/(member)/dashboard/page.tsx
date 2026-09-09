import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';

export default async function MemberDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent">
          Member Dashboard
        </h1>
        <p className="text-rr-green/70 mt-2">
          Welcome back, {user?.member?.displayName || user?.email}!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Songs Card */}
        <Link
          href="/member/songs"
          className="group bg-rr-dark/60 backdrop-blur-sm border-2 border-rr-green/30 rounded-xl p-6 hover:border-rr-yellow transition-all hover:shadow-lg hover:shadow-rr-yellow/10"
        >
          <div className="w-12 h-12 bg-rr-green/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rr-yellow/20 transition-colors">
            <svg
              className="w-6 h-6 text-rr-green group-hover:text-rr-yellow transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-rr-yellow mb-2">Songs</h2>
          <p className="text-rr-green/70 text-sm">
            Access chord charts, tabs, and practice tracks
          </p>
        </Link>

        {/* Profile Card */}
        <Link
          href="/member/profile"
          className="group bg-rr-dark/60 backdrop-blur-sm border-2 border-rr-green/30 rounded-xl p-6 hover:border-rr-yellow transition-all hover:shadow-lg hover:shadow-rr-yellow/10"
        >
          <div className="w-12 h-12 bg-rr-green/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rr-yellow/20 transition-colors">
            <svg
              className="w-6 h-6 text-rr-green group-hover:text-rr-yellow transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-rr-yellow mb-2">Profile</h2>
          <p className="text-rr-green/70 text-sm">
            Update your info and instrument details
          </p>
        </Link>

        {/* Shows Card */}
        <Link
          href="/shows"
          className="group bg-rr-dark/60 backdrop-blur-sm border-2 border-rr-green/30 rounded-xl p-6 hover:border-rr-yellow transition-all hover:shadow-lg hover:shadow-rr-yellow/10"
        >
          <div className="w-12 h-12 bg-rr-green/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rr-yellow/20 transition-colors">
            <svg
              className="w-6 h-6 text-rr-green group-hover:text-rr-yellow transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-rr-yellow mb-2">Shows</h2>
          <p className="text-rr-green/70 text-sm">
            View upcoming tour dates and setlists
          </p>
        </Link>
      </div>

      {/* Coming Soon */}
      <div className="mt-12 text-center">
        <p className="text-rr-green/50 text-sm">
          More features coming soon: Agreements, Practice Resources, and more!
        </p>
      </div>
    </div>
  );
}


