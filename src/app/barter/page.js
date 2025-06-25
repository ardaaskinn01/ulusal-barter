import BarterClient from "./BarterClient";

export const metadata = {
  title: "Barter Sistemi | ULUSAL BARTER A.Ş.",
  description: "Ulusal Barter A.Ş. ile nakitsiz, değer odaklı ticaretin avantajlarını keşfedin. İşletmenizi büyütün, stoklarınızı değerlendirin.",
  openGraph: {
    title: "Barter Sistemi | ULUSAL BARTER A.Ş.",
    description: "Ürün ve hizmetlerinizi takas yöntemiyle değerlendirin",
    url: "https://www.ulusalbarter.com/barter", // Kendi URL'nizi girin
    type: "website",
  },
};
export default function BarterPage() {
  return <BarterClient />;
}