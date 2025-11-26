import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritchie Royale",
  description:
    "Ritchie Royale's Rock N' Roll Revue - Coming soon to a town near you",
  metadataBase: new URL("https://ritchieroyale.com"),
  openGraph: {
    title: "Ritchie Royale",
    description:
      "Ritchie Royale's Rock N' Roll Revue - Coming soon to a town near you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

