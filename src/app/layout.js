import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Ulusal Barter A.Ş.",
  description: "Ulusal Barter A.Ş. Resmi Web Sayfası",
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
        {/* OneSignal SDK v16 scriptleri */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="beforeInteractive"
        />
        <Script id="onesignal-init" strategy="beforeInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "d4f432ca-d0cc-4d13-873d-b24b41de5699",
                // Add this configuration for welcome notification
                welcomeNotification: {
                  disable: false, // Ensure it's not disabled if you want to show it
                  title: "Bildirimlerimize Abone Olun", // Turkish title
                  message: "En son haberler ve güncellemeler için bildirimlerimize abone olun. İstediğiniz zaman devre dışı bırakabilirsiniz.", // Turkish message
                  url: null // Optional: URL to open when clicking the notification
                },
                // You might also want to set the language for the prompt itself
                // This targets the category of "prompts" which includes the bell icon and slide prompt
                promptAndEffort: {
                    acceptButtonText: 'ABONE OL',
                    cancelButtonText: 'SONRA',
                    text: {
                        prompt: {
                            title: 'Bildirimleri Açmak İster Misiniz?',
                            message: 'Web sitemizden en son haberleri ve güncellemeleri almak için bildirimleri açın.'
                        },
                        autoPrompt: {
                            title: 'Bildirimlerimize Abone Olun',
                            message: 'En son haberler ve güncellemeler için bildirimlerimize abone olun. İstediğiniz zaman devre dışı bırakabilirsiniz.'
                        }
                    }
                }
              });
            });
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}