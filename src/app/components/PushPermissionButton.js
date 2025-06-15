"use client";
import { useEffect, useState } from "react";

export default function PushPermissionButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.OneSignal) {
      window.OneSignalDeferred.push(function (OneSignal) {
        OneSignal.isPushNotificationsEnabled().then((enabled) => {
          setIsSubscribed(enabled);
        });
      });
    }
  }, []);

  const handleSubscribe = () => {
    if (typeof window !== "undefined" && window.OneSignal) {
      window.OneSignalDeferred.push(function (OneSignal) {
        OneSignal.showNativePrompt();
      });
    }
  };

  if (isSubscribed) return null;

  return (
    <button
      onClick={handleSubscribe}
      style={{
        padding: "10px 20px",
        backgroundColor: "#ffcc00",
        color: "#000",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        margin: "1rem auto",
        display: "block",
      }}
    >
      Bildirim almak ister misiniz?
    </button>
  );
}
