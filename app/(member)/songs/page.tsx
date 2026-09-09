export default function MemberSongsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent">
          Song Library
        </h1>
        <p className="text-rr-green/70 mt-2">
          Access chord charts, tabs, and practice resources
        </p>
      </div>

      <div className="bg-rr-dark/60 backdrop-blur-sm border-2 border-rr-green/30 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-rr-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-rr-green"
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
        <h2 className="text-2xl font-bold text-rr-yellow mb-2">Coming Soon</h2>
        <p className="text-rr-green/70 max-w-md mx-auto">
          Song resources including chord charts, tablature, reference recordings,
          and stems will be available here soon.
        </p>
      </div>
    </div>
  );
}


