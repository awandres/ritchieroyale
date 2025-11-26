"use client";

export default function Intro() {
  return (
    <div
      id="intro"
      className="relative min-h-screen flex flex-col items-center justify-center text-center"
    >
      <div className="relative z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent drop-shadow-2xl">
          Ritchie Royale
        </h1>
        <p className="text-xl md:text-2xl text-rr-green mb-8 max-w-2xl mx-auto drop-shadow-lg">
          Ritchie Royale&apos;s Rock N&apos; Roll Revue - Coming soon to a town near you
        </p>
        <a
          href="#header"
          className="inline-block mt-8 text-rr-yellow hover:text-rr-pink transition-colors animate-bounce"
        >
          <span className="sr-only">Continue</span>
          <svg
            className="w-8 h-8 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
