import Image from "next/image";

export default function BrandGuidePage() {
  const colors = [
    {
      name: "Neon Green",
      role: "Main Brand Color",
      hex: "#B3ECC8",
      className: "bg-rr-green",
      usage: "Primary text, borders, main UI elements",
    },
    {
      name: "Yellow",
      role: "Alternative 1",
      hex: "#F6F792",
      className: "bg-rr-yellow",
      usage: "Headings, highlights, hover states",
    },
    {
      name: "Pink",
      role: "Alternative 2",
      hex: "#FEABC3",
      className: "bg-rr-pink",
      usage: "Accents, CTAs, special highlights",
    },
    {
      name: "Dark Green",
      role: "Background",
      hex: "#334143",
      className: "bg-rr-dark",
      usage: "Main background, card backgrounds",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-rr-yellow">
          Ritchie Royale Brand Guide
        </h1>
        <p className="text-rr-green/70">
          Official brand colors and design guidelines for Ritchie Royale
        </p>
      </div>

      {/* Logo Section */}
      <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-pink">Logo</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-rr-dark/60 border-2 border-rr-green/20 rounded-lg p-8 flex items-center justify-center">
            <Image
              src="/rr-logo.png"
              alt="Ritchie Royale Logo"
              width={200}
              height={200}
              className="drop-shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-3 text-rr-green">
              Usage Guidelines
            </h3>
            <ul className="space-y-2 text-rr-green/70">
              <li>• Always maintain clear space around the logo</li>
              <li>• Minimum size: 40px × 40px</li>
              <li>• Use on dark backgrounds for best visibility</li>
              <li>• Do not modify colors or proportions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-pink">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((color) => (
            <div
              key={color.hex}
              className="border-2 border-rr-green/30 rounded-lg overflow-hidden hover:border-rr-yellow/50 transition-all"
            >
              <div className={`${color.className} h-32 w-full`} />
              <div className="p-4 bg-rr-dark/60">
                <h3 className="font-bold text-rr-green mb-1">{color.name}</h3>
                <p className="text-xs text-rr-yellow mb-2">{color.role}</p>
                <p className="text-sm font-mono text-rr-green/70 mb-2">
                  {color.hex}
                </p>
                <p className="text-xs text-rr-green/60">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tailwind Classes */}
      <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-pink">
          Tailwind CSS Classes
        </h2>
        <div className="space-y-4">
          <div className="bg-rr-dark/60 border border-rr-green/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-rr-yellow">
              Text Colors
            </h3>
            <div className="font-mono text-sm space-y-1">
              <p className="text-rr-green">
                text-rr-green <span className="text-rr-green/50">· Main text</span>
              </p>
              <p className="text-rr-yellow">
                text-rr-yellow <span className="text-rr-green/50">· Headings</span>
              </p>
              <p className="text-rr-pink">
                text-rr-pink <span className="text-rr-green/50">· Accents</span>
              </p>
              <p className="text-rr-green/70">
                text-rr-green/70{" "}
                <span className="text-rr-green/50">· Secondary text</span>
              </p>
            </div>
          </div>

          <div className="bg-rr-dark/60 border border-rr-green/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-rr-yellow">
              Background Colors
            </h3>
            <div className="font-mono text-sm space-y-1 text-rr-green">
              <p>bg-rr-dark · Main background</p>
              <p>bg-rr-dark/80 · Card backgrounds</p>
              <p>bg-rr-green/20 · Subtle highlights</p>
            </div>
          </div>

          <div className="bg-rr-dark/60 border border-rr-green/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-rr-yellow">
              Border Colors
            </h3>
            <div className="font-mono text-sm space-y-1 text-rr-green">
              <p>border-rr-green/30 · Default borders</p>
              <p>border-rr-yellow · Hover states</p>
              <p>border-rr-pink · Special elements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-pink">Typography</h2>
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl font-bold text-rr-yellow mb-2">
              Heading 1
            </h1>
            <p className="text-sm font-mono text-rr-green/60">
              text-5xl font-bold text-rr-yellow
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-rr-yellow mb-2">
              Heading 2
            </h2>
            <p className="text-sm font-mono text-rr-green/60">
              text-3xl font-bold text-rr-yellow
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-rr-green mb-2">Heading 3</h3>
            <p className="text-sm font-mono text-rr-green/60">
              text-xl font-bold text-rr-green
            </p>
          </div>
          <div>
            <p className="text-base text-rr-green mb-2">
              Body text: Regular paragraph text should use rr-green with good
              readability against the dark background.
            </p>
            <p className="text-sm font-mono text-rr-green/60">
              text-base text-rr-green
            </p>
          </div>
          <div>
            <p className="text-sm text-rr-green/70 mb-2">
              Secondary text: Use for captions, metadata, and less important
              information.
            </p>
            <p className="text-sm font-mono text-rr-green/60">
              text-sm text-rr-green/70
            </p>
          </div>
        </div>
      </section>

      {/* UI Components */}
      <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-pink">UI Components</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-rr-yellow">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-rr-green/20 border-2 border-rr-green text-rr-green px-6 py-2 rounded-lg hover:bg-rr-green/30 hover:border-rr-yellow hover:text-rr-yellow transition-all font-semibold">
                Primary Button
              </button>
              <button className="bg-rr-pink/20 border-2 border-rr-pink text-rr-pink px-6 py-2 rounded-lg hover:bg-rr-pink/30 transition-all font-semibold">
                Secondary Button
              </button>
              <button className="border-2 border-rr-green/30 text-rr-green/70 px-6 py-2 rounded-lg hover:border-rr-pink hover:text-rr-pink transition-all font-semibold">
                Outline Button
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-rr-yellow">Cards</h3>
            <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-6 hover:border-rr-yellow/50 transition-all">
              <h4 className="text-xl font-bold mb-2 text-rr-green">
                Card Title
              </h4>
              <p className="text-rr-green/70 mb-4">
                Cards use a dark background with semi-transparency, green
                borders, and hover effects that transition to yellow.
              </p>
              <a
                href="#"
                className="text-rr-yellow hover:text-rr-pink transition-colors font-semibold"
              >
                Learn More →
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-rr-yellow">
              Form Inputs
            </h3>
            <div className="space-y-3 max-w-md">
              <input
                type="text"
                placeholder="Text Input"
                className="w-full px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
              />
              <textarea
                placeholder="Textarea"
                rows={3}
                className="w-full px-4 py-2 bg-rr-dark border-2 border-rr-green/30 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-rr-pink">
          Design Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rr-dark/60 border border-rr-green/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-rr-yellow">
              Contrast & Readability
            </h3>
            <p className="text-rr-green/70">
              Always ensure high contrast between text and backgrounds. Use
              neon green as primary text on dark backgrounds for optimal
              readability.
            </p>
          </div>
          <div className="bg-rr-dark/60 border border-rr-green/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-rr-yellow">
              Transparency & Depth
            </h3>
            <p className="text-rr-green/70">
              Use backdrop blur and semi-transparent backgrounds to create
              depth while maintaining the logo visibility in the background.
            </p>
          </div>
          <div className="bg-rr-dark/60 border border-rr-green/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-rr-yellow">
              Hover States
            </h3>
            <p className="text-rr-green/70">
              Interactive elements should transition from green to yellow or
              pink on hover, with smooth transitions for a polished feel.
            </p>
          </div>
          <div className="bg-rr-dark/60 border border-rr-green/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-rr-yellow">
              Consistency
            </h3>
            <p className="text-rr-green/70">
              Use the same border styles, rounded corners, and spacing
              throughout the site to maintain visual consistency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

