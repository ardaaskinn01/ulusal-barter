import "./globals.css";
import ClientLayout from "./ClientLayout";

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
    <html lang="tr" className="geist-sans geist-mono">
      <head>
        {/* Favicon tanımları */}
        <link rel="icon" href="/newbg02.png" type="image/png" />
        <link rel="apple-touch-icon" href="/newbg02.png" />
        <link rel="shortcut icon" href="/newbg02.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
