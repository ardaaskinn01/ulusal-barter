import ContactForm from "./ContactForm";

export const metadata = {
  title: "İletişim | ULUSAL BARTER A.Ş. - Bize Ulaşın",
  description: "Ulusal Barter A.Ş. ile iletişime geçin. Uzman barter danışmanlarımız size en kısa sürede dönüş yapacaktır. Ofis adresimiz, telefon ve e-posta bilgilerimiz.",
  openGraph: {
    title: "İletişim | ULUSAL BARTER A.Ş.",
    description: "Uzman barter danışmanlarımızla iletişime geçin",
    type: "website",
    url: "https://ulusalbarter.com/iletisim",
  },
};

export default function IletisimPage() {
  return (
    <>
      <ContactForm />
    </>
  );
}