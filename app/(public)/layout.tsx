import Header from "@/components/layout/Header";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="wrapper" className="fade-in">
      <Header />
      <Nav />
      <main id="main" className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

