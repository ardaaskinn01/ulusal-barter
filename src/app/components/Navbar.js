"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (href) =>
    pathname === href || (href === "/projelerimiz" && pathname.startsWith("/projelerimiz"))
      ? "text-black font-bold border-b-6 border-black"
      : "text-black hover:text-gray-900 transition-colors duration-300";

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-400 backdrop-blur-md top-0 left-0 right-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/logo2.png"
              alt="Nurettin Tutak Logo"
              width={100}
              height={20}
            />
          </Link>

          {/* Desktop Menü */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`px-2 py-2 text-md bold ${getLinkClass("/")}`}>ANA SAYFA</Link>
            <Link href="/hakkinda" className={`px-2 py-2 text-md ${getLinkClass("/hakkinda")}`}>HAKKIMIZDA</Link>
            <Link href="/barter" className={`px-2 py-2 text-md ${getLinkClass("/barter")}`}>BARTER SİSTEMİ</Link>
            <Link href="/projelerimiz" className={`px-2 py-2 text-md ${getLinkClass("/projelerimiz")}`}>HİZMETLER</Link>
            <Link href="/uyelik" className={`px-2 py-2 text-md ${getLinkClass("/uyelik")}`}>ÜYELİK</Link>
            <Link href="/iletisim" className={`px-2 py-2 text-md ${getLinkClass("/iletisim")}`}>İLETİŞİM</Link>
          </div>

          {/* Mobil Menü Butonu */}
          <button
            className="md:hidden p-2 text-black focus:outline-none rounded-md hover:bg-yellow-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobil Menü İçeriği */}
        {isMenuOpen && (
          <div className="md:hidden bg-yellow-400/90 backdrop-blur-lg border-t border-yellow-500">
            <div className="px-4 py-3 space-y-4">
              {[
                { href: "/", label: "Ana Sayfa" },
                { href: "/hakkinda", label: "Hakkımızda" },
                { href: "/barter", label: "Barter Sistemi" },
                { href: "/projelerimiz", label: "Hizmetler" },
                { href: "/uyelik", label: "Üyelik" },
                { href: "/iletisim", label: "İletişim" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-lg ${getLinkClass(item.href)} hover:bg-yellow-500/60 transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
