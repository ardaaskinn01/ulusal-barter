"use client";
import Link from 'next/link';
import { useLanguage } from '../LanguageContext';
import { CheckCircle, Lightbulb, Handshake, DollarSign, Users, Info, Box, Globe, Lock, Shield } from 'lucide-react'; // İkonlar hala gerekli
import Navbar from "../components/Navbar"; // Navbar yolunuzu kontrol edin!

// Sayfa bazlı metadata tanımı (Next.js App Router için)
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

export default function BarterClient() {
  const videoSrc = "/10.mp4"; // Video dosyanızın yolu
  const { translate } = useLanguage();
  const faqs = [
    {
      question: translate("faq1Q"),
      answer: translate("faq1A"),
    },
    {
      question: translate("faq2Q"),
      answer: translate("faq2A"),
    },
    {
      question: translate("faq3Q"),
      answer: translate("faq3A"),
    },
    {
      question: translate("faq4Q"),
      answer: translate("faq4A"),
    },
    {
      question: translate("faq5Q"),
      answer: translate("faq5A"),
    },
  ];
  // Animasyon varyantları kaldırıldı

  return (
     <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-16 sm:pt-48 sm:pb-24 overflow-hidden mt-8">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-yellow-500 leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-yellow-500">
              {translate("heroTitlePrefix")}
            </span>{" "}
            <br />
            {translate("heroTitleSuffix")}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            {translate("heroDescription")}
          </p>

          <div className="relative w-full max-w-5xl h-[220px] sm:h-[400px] md:h-[550px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              {translate("videoFallback")}
            </video>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </section>

      {/* Barter Nedir */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {translate("whatIsBarterTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {translate("whatIsBarterDescription")}
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>{translate("barterParagraph1")}</p>
              <p>{translate("barterParagraph2")}</p>
              <p>{translate("barterParagraph3")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Handshake className="w-8 h-8 text-yellow-500" />,
                  title: translate("benefit1Title"),
                  description: translate("benefit1Desc"),
                },
                {
                  icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
                  title: translate("benefit2Title"),
                  description: translate("benefit2Desc"),
                },
                {
                  icon: <Users className="w-8 h-8 text-yellow-500" />,
                  title: translate("benefit3Title"),
                  description: translate("benefit3Desc"),
                },
                {
                  icon: <CheckCircle className="w-8 h-8 text-yellow-500" />,
                  title: translate("benefit4Title"),
                  description: translate("benefit4Desc"),
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-start">
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Barter Süreci */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {translate("barterStepsTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {translate("barterStepsDesc")}
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 w-full">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex flex-col md:flex-row items-center md:items-start text-center ${
                    step % 2 === 1 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  } relative`}
                >
                  <div
                    className={`${
                      step % 2 === 1 ? "md:order-2 md:ml-6" : "md:order-1 md:mr-6"
                    } w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full text-2xl font-bold mb-4 md:mb-0 shrink-0 shadow-lg`}
                  >
                    {step}
                  </div>
                  <div
                    className={`${
                      step % 2 === 1 ? "md:order-1" : "md:order-2"
                    } flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {translate(`step${step}Title`)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {translate(`step${step}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Sıkça Sorulan Sorular (SSS) Bölümü */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {translate("faqTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {translate("faqDescription")}
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-2 flex items-center">
                  <Info className="w-5 h-5 text-yellow-500 mr-2 shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-base pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harekete Geçirme (Call to Action) Bölümü */}
      <section className="py-16 sm:py-24 bg-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {translate("ctaTitle")}
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-8">
            {translate("ctaDescription")}
          </p>
          <div>
            <Link href="/uyelik" passHref>
              <button className="inline-flex items-center bg-white text-yellow-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                {translate("ctaButton")}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}