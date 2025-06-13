import UyelikClient from "./UyelikClient";

export const metadata = {
  title: "Üyelik Girişi | ULUSAL BARTER A.Ş.",
  description: "Ulusal Barter A.Ş. üyelik giriş sayfası. Barter sistemine giriş yaparak takas ekonomisine katılın.",
  openGraph: {
    title: "Üyelik Girişi | ULUSAL BARTER A.Ş.",
    description: "Barter sistemine giriş yapın",
    type: "website",
    url: "https://ulusalbarter.com/uyelik",
  },
};

export default function UyelikPage() {
  return <UyelikClient />;
}