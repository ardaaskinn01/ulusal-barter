import "./globals.css";
import Script from "next/script";
import PushPermissionButton from "./PushPermissionButton";

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
        promptOptions: {
          slidedown: {
            enabled: false // İngilizce preprompt'u devre dışı bırak
          }
        },
        notifyButton: {
          enable: false // köşedeki varsayılan çan simgesini de kapatıyoruz
        }
      });
    });
  `}
        </Script>
      </head>
      <body>
        {children}
         <PushPermissionButton />
      </body>
    </html>
  );
}