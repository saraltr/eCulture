import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { dm_sans } from "./fonts/fonts";

export const metadata: Metadata = {
  title: {
    template: '%s | Eculture',
    default: 'Eculture',
  },
  description: 'Eculture online platform',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} bg-white text-primary`}>
        <Header></Header>
        {children}
        <Footer></Footer>
        </body>
    </html>
  );
}
