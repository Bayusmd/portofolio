import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fauzan Bayu Samudra",
  description: "Website portofolio",
   icons: {
    icon: "/logo.png",},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}