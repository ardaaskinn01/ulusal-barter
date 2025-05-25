"use client";
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

export default function ClientLayout({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/music2.mp3');
    audioRef.current.loop = true;

    const handleFirstInteraction = () => {
      if (!isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.error("Müzik çalınamadı:", e));
        document.removeEventListener('click', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);

    return () => {
      audioRef.current.pause();
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  return (
    <>
      {children}
      <button
        onClick={() => {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }}
        className="fixed bottom-4 right-4 z-50 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
    </>
  );
}