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
      ? "relative font-semibold text-gray-100 after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-gray-100 after:bottom-0 after:left-0"
      : "relative text-gray-100 hover:text-gray-100 transition-colors duration-300 after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bg-gray-100 after:bottom-0 after:left-0 after:transition-all after:duration-300";

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 backdrop-blur-md top-0 left-0 right-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-2">
        {/* Üst Satır: Logo ve Üye Ol */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/newbg02.png"
              alt="Ulusal Barter A.Ş. Logo"
              width={140} // daha büyük logo
              height={40}
              priority
            />
          </Link>

          {/* Üye Ol Butonu */}
          <Link
            href="/uyelik"
            className="hidden md:inline-block px-5 py-2 rounded-lg text-sm font-semibold bg-white text-yellow-600 hover:bg-yellow-200 transition"
          >
            Hemen Üye Ol
          </Link>

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

        {/* Alt Satır: Navigation Linkleri */}
        <div className="hidden md:flex justify-center mt-s space-x-16">
          <Link href="/" className={`px-2 py-2 text-sm ${getLinkClass("/")}`}>ANA SAYFA</Link>
          <Link href="/hakkinda" className={`px-2 py-2 text-sm ${getLinkClass("/hakkinda")}`}>HAKKIMIZDA</Link>
          <Link href="/barter" className={`px-2 py-2 text-sm ${getLinkClass("/barter")}`}>BARTER SİSTEMİ</Link>
          <Link href="/uyelik" className={`px-2 py-2 text-sm ${getLinkClass("/uyelik")}`}>ÜRÜN VE HİZMETLER</Link>
          <Link href="/iletisim" className={`px-2 py-2 text-sm ${getLinkClass("/iletisim")}`}>İLETİŞİM</Link>
        </div>

        {/* Mobil Menü İçeriği */}
        {isMenuOpen && (
          <div className="md:hidden bg-yellow-400/90 backdrop-blur-lg border-t border-yellow-500 mt-2">
            <div className="px-4 py-3 space-y-4">
              {[ 
                { href: "/", label: "Ana Sayfa" },
                { href: "/hakkinda", label: "Hakkımızda" },
                { href: "/barter", label: "Barter Sistemi" },
                { href: "/uyelik", label: "Ürün ve Hizmetler" },
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
              {/* Mobilde de "Hemen Üye Ol" */}
              <Link
                href="/uyelik"
                className="block text-center px-4 py-3 rounded-lg bg-white text-yellow-900 font-semibold hover:bg-yellow-200 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Hemen Üye Ol
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

