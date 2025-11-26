export default function Footer() {
  return (
    <footer id="footer" className="bg-rr-dark/95 backdrop-blur-sm text-rr-green border-t border-rr-green/20 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <section>
            <h3 className="text-xl font-bold mb-4 text-rr-yellow">Contact</h3>
            <p className="text-rr-green/70">press@ritchieroyale.com</p>
          </section>
          <section>
            <h3 className="text-xl font-bold mb-4 text-rr-yellow">Follow</h3>
            <div className="space-y-2">
              <p className="text-rr-green/70">Social media links coming soon</p>
            </div>
          </section>
          <section>
            <h3 className="text-xl font-bold mb-4 text-rr-yellow">Links</h3>
            <div className="space-y-2">
              <a
                href="/shows"
                className="block text-rr-green/70 hover:text-rr-pink transition-colors"
              >
                Shows
              </a>
              <a
                href="/music"
                className="block text-rr-green/70 hover:text-rr-pink transition-colors"
              >
                Music
              </a>
              <a
                href="/press"
                className="block text-rr-green/70 hover:text-rr-pink transition-colors"
              >
                Press
              </a>
            </div>
          </section>
        </div>
        <div className="border-t border-rr-green/20 pt-8 text-center">
          <p className="text-rr-green/70 text-sm">
            &copy; {new Date().getFullYear()} Ritchie Royale. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

