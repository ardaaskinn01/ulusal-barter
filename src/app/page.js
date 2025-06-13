import MainClient from "./MainClient";

export const metadata = {
  title: "Ana Sayfa | ULUSAL BARTER A.Ş. Türkiye'nin Lider Barter Platformu",
  description: "Ulusal Barter A.Ş. Ana Sayfa.",
  openGraph: {
    title: "Ana Sayfa | ULUSAL BARTER A.Ş.",
    description: "Ulusal Barter A.Ş. Ana Sayfa. Türkiye'nin Lider Barter Platformu",
    type: "website",
    url: "https://ulusalbarter.com/",
  },
};

export default function MainPage() {
  return <MainClient />;
}