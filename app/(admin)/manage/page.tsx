export default function ManagePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-rr-yellow">Admin Dashboard</h1>
      
      <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-green">Manage Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/manage/shows"
            className="block p-6 border-2 border-rr-green/30 rounded-lg hover:border-rr-yellow hover:bg-rr-yellow/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-green group-hover:text-rr-yellow transition-colors">Shows</h3>
            <p className="text-sm text-rr-green/70">
              Manage upcoming shows and events
            </p>
          </a>
          <a
            href="/admin/manage/cities"
            className="block p-6 border-2 border-rr-green/30 rounded-lg hover:border-rr-yellow hover:bg-rr-yellow/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-green group-hover:text-rr-yellow transition-colors">Cities</h3>
            <p className="text-sm text-rr-green/70">
              Manage cities and locations
            </p>
          </a>
          <a
            href="/admin/manage/songs"
            className="block p-6 border-2 border-rr-green/30 rounded-lg hover:border-rr-yellow hover:bg-rr-yellow/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-green group-hover:text-rr-yellow transition-colors">Songs</h3>
            <p className="text-sm text-rr-green/70">
              Manage songs and resources
            </p>
          </a>
          <a
            href="/admin/manage/members"
            className="block p-6 border-2 border-rr-green/30 rounded-lg hover:border-rr-yellow hover:bg-rr-yellow/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-green group-hover:text-rr-yellow transition-colors">Members</h3>
            <p className="text-sm text-rr-green/70">
              Manage band members
            </p>
          </a>
          <a
            href="/admin/manage/products"
            className="block p-6 border-2 border-rr-green/30 rounded-lg hover:border-rr-yellow hover:bg-rr-yellow/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-green group-hover:text-rr-yellow transition-colors">Products</h3>
            <p className="text-sm text-rr-green/70">Manage merch shop</p>
          </a>
          <a
            href="/admin/manage/orders"
            className="block p-6 border-2 border-rr-green/30 rounded-lg hover:border-rr-yellow hover:bg-rr-yellow/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-green group-hover:text-rr-yellow transition-colors">Orders</h3>
            <p className="text-sm text-rr-green/70">View and manage orders</p>
          </a>
          <a
            href="/admin/brand-guide"
            className="block p-6 border-2 border-rr-pink/30 rounded-lg hover:border-rr-pink hover:bg-rr-pink/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-pink group-hover:text-rr-pink transition-colors">Brand Guide</h3>
            <p className="text-sm text-rr-green/70">View brand colors and assets</p>
          </a>
        </div>
      </div>
    </div>
  );
}

