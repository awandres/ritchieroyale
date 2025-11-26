export default function ManagePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-rr-yellow">Admin Dashboard</h1>
      
      <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-green">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/brand-guide"
            className="block p-6 border-2 border-rr-pink/30 rounded-lg hover:border-rr-pink hover:bg-rr-pink/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-pink group-hover:text-rr-pink transition-colors">Brand Guide</h3>
            <p className="text-sm text-rr-green/70">View brand colors and assets</p>
          </a>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 border-2 border-rr-green/30 rounded-lg hover:border-rr-yellow hover:bg-rr-yellow/5 transition-all group"
          >
            <h3 className="font-semibold mb-2 text-rr-green group-hover:text-rr-yellow transition-colors">
              Supabase Dashboard ↗
            </h3>
            <p className="text-sm text-rr-green/70">
              Manage shows, cities, songs, and products directly
            </p>
          </a>
        </div>
      </div>

      <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-rr-green">How to Manage Content</h2>
        <div className="space-y-4 text-rr-green/80">
          <p>
            For now, manage your content directly in Supabase:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-rr-yellow hover:text-rr-pink">Supabase Dashboard</a></li>
            <li>Select your <strong>ritchieroyale</strong> project</li>
            <li>Click <strong>Table Editor</strong> in the sidebar</li>
            <li>Select a table (Show, City, Song, Product, etc.)</li>
            <li>Add, edit, or delete rows directly</li>
          </ol>
          <div className="mt-6 p-4 bg-rr-dark/60 border border-rr-yellow/30 rounded-lg">
            <p className="text-rr-yellow text-sm">
              💡 <strong>Tip:</strong> To add a show, first make sure you have at least one City created, 
              then create a Show with that city&apos;s ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
