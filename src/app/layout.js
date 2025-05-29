import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from './ClientLayout'; // ClientLayout'u import ediyoruz

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ulusal Barter A.Ş.",
  description: "Ulusal Barter A.Ş.",
  icons: {
    icon: "/newbg02.png",
    shortcut: "/newbg02.png",
    apple: "/newbg02.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
