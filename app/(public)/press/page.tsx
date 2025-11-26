export default async function PressPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-rr-yellow">
        Press / Electronic Press Kit
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-rr-pink">About Ritchie Royale</h2>
          <p className="text-rr-green/80 leading-relaxed mb-4">
            Ritchie Royale Rock N' Roll Revue - coming soon to a town near you!
          </p>
        </section>

        <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-rr-pink">Press Inquiries</h2>
          <p className="text-rr-green/80 mb-4">
            For press inquiries, interviews, or booking information, please
            contact:
          </p>
          <p className="text-rr-yellow font-semibold">
            press@ritchieroyale.com
          </p>
        </section>

        <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-rr-pink">Assets</h2>
          <p className="text-rr-green/80 mb-4">
            High-resolution photos, logos, and press materials coming soon.
          </p>
        </section>
      </div>
    </div>
  );
}

