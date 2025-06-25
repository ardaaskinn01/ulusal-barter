import dynamic from "next/dynamic";

const HakkindaClient = dynamic(() => import("./HakkindaClient"), { ssr: true });

export const metadata = {
  title: "Hakkımızda | ULUSAL BARTER A.Ş. - Türkiye'nin Lider Barter Platformu",
  description: "Ulusal Barter A.Ş. hakkında detaylı bilgi...",
  openGraph: {
    title: "Hakkımızda | ULUSAL BARTER A.Ş.",
    description: "Türkiye'nin lider barter platformu",
    url: "https://www.ulusalbarter.com/hakkinda",
    type: "website",
  },
};

export default function HakkindaPage() {
  return <HakkindaClient />;
}