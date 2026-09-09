import { getCurrentUser } from '@/lib/auth';

export default async function MemberProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent">
          Your Profile
        </h1>
        <p className="text-rr-green/70 mt-2">
          Manage your account and member information
        </p>
      </div>

      <div className="bg-rr-dark/60 backdrop-blur-sm border-2 border-rr-green/30 rounded-xl p-8">
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-rr-yellow mb-2">
              Email Address
            </label>
            <p className="text-rr-green">{user?.email}</p>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-rr-yellow mb-2">
              Role
            </label>
            <span className="inline-flex items-center px-3 py-1 bg-rr-green/20 text-rr-green text-sm font-medium rounded-full">
              {user?.role}
            </span>
          </div>

          {/* Member Info (if exists) */}
          {user?.member && (
            <>
              <hr className="border-rr-green/20" />
              <div>
                <label className="block text-sm font-medium text-rr-yellow mb-2">
                  Display Name
                </label>
                <p className="text-rr-green">{user.member.displayName}</p>
              </div>
            </>
          )}

          {/* Coming Soon Notice */}
          <hr className="border-rr-green/20" />
          <div className="text-center py-4">
            <p className="text-rr-green/50 text-sm">
              Profile editing coming soon. Contact admin to update your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


