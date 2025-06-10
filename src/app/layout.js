import "./globals.css";

export const metadata = {
  title: "Ulusal Barter A.Ş.",
  description: "Ulusal Barter A.Ş.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/st-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/st-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="geist-sans geist-mono">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        {/* PWA için gerekli meta tag'ler */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="application-name" content="Ulusal Barter" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/st-144x144.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}