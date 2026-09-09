import Copyright from "@/components/massively/Copyright";
import Footer from "@/components/massively/Footer";
import Header from "@/components/massively/Header";
import IntroSlot from "@/components/massively/IntroSlot";
import MassivelyEffects from "@/components/massively/MassivelyEffects";
import Nav from "@/components/massively/Nav";
import NavPanel from "@/components/massively/NavPanel";

// Scoped to the public site: these only ship on (public) routes, leaving the
// Tailwind-based admin and member areas untouched.
import "@/styles/massively/css/main.css";
import "@/styles/massively/css/ritchie.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Suppresses transitions for the first paint so the intro animates in
          instead of snapping. MassivelyEffects clears it after load. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.add('is-preload')`,
        }}
      />
      <MassivelyEffects />

      <div id="wrapper" className="fade-in">
        <div className="bg fixed" />
        <IntroSlot />
        <Header />
        <Nav />
        <div id="main">{children}</div>
        <Footer />
        <Copyright />
      </div>

      {/* Outside #wrapper: the wrapper dims to 50% opacity while the panel is
          open, which would otherwise fade the panel with it. */}
      <NavPanel />
    </>
  );
}
