import Intro from "@/components/Intro";

export default function HomePage() {
  return (
    <>
      <Intro />
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent drop-shadow-lg">
            Ritchie Royale
          </h1>
          <p className="text-xl text-rr-green/90 max-w-2xl mx-auto drop-shadow-md">
           Rock N&apos; Roll Revue!
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-rr-yellow">
            Coming Soon
          </h2>
          <p className="text-center text-rr-green/70 max-w-xl mx-auto">
            Shows and tour dates will be announced here. Stay tuned!
          </p>
        </section>
      </div>
    </>
  );
}
