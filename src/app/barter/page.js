import Link from 'next/link';
// framer-motion import'u kaldırıldı
import { CheckCircle, Lightbulb, Handshake, DollarSign, Users, Info, Box, Globe, Lock, Shield } from 'lucide-react'; // İkonlar hala gerekli
import Navbar from "../components/Navbar"; // Navbar yolunuzu kontrol edin!

// Sayfa bazlı metadata tanımı (Next.js App Router için)
export const metadata = {
  title: "Barter Sistemi | ULUSAL BARTER A.Ş.",
  description: "Ulusal Barter A.Ş. ile nakitsiz, değer odaklı ticaretin avantajlarını keşfedin. İşletmenizi büyütün, stoklarınızı değerlendirin.",
  openGraph: {
    title: "Barter Sistemi | ULUSAL BARTER A.Ş.",
    description: "Ürün ve hizmetlerinizi takas yöntemiyle değerlendirin",
    url: "https://www.ulusalbarter.com.tr/barter", // Kendi URL'nizi girin
    type: "website",
  },
};

export default function Barter() {
  const videoSrc = "/10.mp4"; // Video dosyanızın yolu

  // Animasyon varyantları kaldırıldı

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-white text-gray-800">
      {/* Navbar sabit kalmalı */}
      <Navbar />

      {/* Hero Section - Büyük Başlık ve Video */}
      <section className="relative w-full pt-32 pb-16 sm:pt-48 sm:pb-24 overflow-hidden mt-8">
        {/* Daha hafif, soyut arka plan şekilleri - Animasyon sınıfları kaldırıldı */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          {/* motion.h1 yerine normal h1 */}
          <h1
            className="text-4xl sm:text-5xl md:text-5xl font-bold text-yellow-500 leading-tight mb-6"
          >
            <span className="bg-clip-text text-transparent bg-yellow-500">
              Barter Sistemi:
            </span> <br /> İşletmenizin Geleceği
          </h1>

          {/* motion.p yerine normal p */}
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            Ulusal Barter A.Ş. ile nakitsiz, değer odaklı ticaretin avantajlarını keşfedin. Ürün ve hizmetlerinizi takas yoluyla değerlendirerek finansal esneklik kazanın.
          </p>

          {/* motion.div yerine normal div */}
          <div
            className="relative w-full max-w-5xl h-[250px] sm:h-[400px] md:h-[550px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              Tarayıcınız video etiketini desteklemiyor.
            </video>
            <div className="absolute inset-0 bg-black/20"></div> {/* Video üzerine hafif karartma */}
          </div>
        </div>
      </section>

      {/* Barter Nedir? Bölümü */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* motion.div yerine normal div */}
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Barter Nedir ve Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Basit, güvenli ve yenilikçi bir ticaret modeliyle tanışın.
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* motion.div yerine normal div */}
            <div
              className="space-y-6 text-gray-700 leading-relaxed text-lg"
            >
              <p>
                &quot;Barter, ürünlerin ve hizmetlerin nakit para kullanmadan doğrudan takas edilmesidir.&quot; Ulusal Barter A.Ş. olarak, bu eski ticaret yöntemini modernize ederek işletmelerin yeni pazarlara açılmasını, atıl kapasitelerini değerlendirmesini ve nakit akışlarını optimize etmesini sağlıyoruz.
              </p>
              <p>
                Sistemimiz, bir barter çeki sistemi (veya barter puanı) üzerine kuruludur. Üyelerimiz, sattıkları ürün veya hizmetler karşılığında nakit yerine &quot;barter çeki&quot; kazanır ve bu çekleri sistemdeki diğer üyelerden ihtiyaç duydukları ürün veya hizmetleri almak için kullanır. Bu sayede, işletmeler nakitlerini koruyarak değerlerini katlar.
              </p>
              <p>
                Ulusal Barter A.Ş.&apos;nin uzman kadrosu, tüm ticaret süreçlerinizde size rehberlik eder, güvenli ve şeffaf bir platform sunar.
              </p>
            </div>
            {/* motion.div yerine normal div */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { icon: <Handshake className="w-8 h-8 text-yellow-500" />, title: "Değer Takası", description: "Ürün ve hizmetlerinizi nakitsiz takas edin." },
                { icon: <DollarSign className="w-8 h-8 text-yellow-500" />, title: "Nakit Koruma", description: "İşletmenizin likiditesini artırın." },
                { icon: <Users className="w-8 h-8 text-yellow-500" />, title: "Geniş Ağ", description: "Binlerce firmaya erişim sağlayın." },
                { icon: <CheckCircle className="w-8 h-8 text-yellow-500" />, title: "Güvenli İşlem", description: "Tüm işlemler güvence altında." },
              ].map((item, i) => (
                // motion.div yerine normal div
                <div
                  key={i}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-start"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Adım Adım Barter Süreci */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* motion.div yerine normal div */}
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Barter Süreci: Kolay ve Hızlı Adımlar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ulusal Barter A.Ş. ile takas yapmak işte bu kadar kolay!
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* motion.div yerine normal div */}
          <div
            className="relative flex flex-col items-center"
          >
            {/* Dikey çizgi */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 w-full">
              {/* Adım 1 */}
              {/* motion.div yerine normal div */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right md:pr-12 relative">
                <div className="md:order-2 w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full text-2xl font-bold mb-4 md:mb-0 md:ml-6 shrink-0 shadow-lg">1</div>
                <div className="md:order-1 flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Üyelik ve Tanımlama</h3>
                  <p className="text-gray-600 text-sm">
                    İşletmenizi platformumuza kaydedin, ürün ve hizmetlerinizi tanımlayın. Uzmanlarımız size rehberlik edecek.
                  </p>
                </div>
              </div>

              {/* Adım 2 */}
              {/* motion.div yerine normal div */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:pl-12 relative">
                <div className="md:order-1 w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full text-2xl font-bold mb-4 md:mb-0 md:mr-6 shrink-0 shadow-lg">2</div>
                <div className="md:order-2 flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ticaret ve Çek Kazanma</h3>
                  <p className="text-gray-600 text-sm">
                    Tanımladığınız ürün veya hizmetleri sistemdeki diğer üyelere satın. Karşılığında barter çeki kazanın.
                  </p>
                </div>
              </div>

              {/* Adım 3 */}
              {/* motion.div yerine normal div */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right md:pr-12 relative">
                <div className="md:order-2 w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full text-2xl font-bold mb-4 md:mb-0 md:ml-6 shrink-0 shadow-lg">3</div>
                <div className="md:order-1 flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">İhtiyaçlarınızı Karşılama</h3>
                  <p className="text-gray-600 text-sm">
                    Kazandığınız barter çekleri ile sistemdeki binlerce firmadan ihtiyacınız olan ürün ve hizmetleri alın.
                  </p>
                </div>
              </div>

              {/* Adım 4 */}
              {/* motion.div yerine normal div */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:pl-12 relative">
                <div className="md:order-1 w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full text-2xl font-bold mb-4 md:mb-0 md:mr-6 shrink-0 shadow-lg">4</div>
                <div className="md:order-2 flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Büyüme ve Kazanç</h3>
                  <p className="text-gray-600 text-sm">
                    Nakitsiz ticaretle işletmenizin atıl kapasitesini değerlendirin ve finansal esnekliğin tadını çıkarın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sıkça Sorulan Sorular (SSS) Bölümü */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* motion.div yerine normal div */}
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Barter sistemi hakkında merak ettikleriniz.
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "Barter sistemi nedir?",
                answer: "Barter, nakit para kullanmadan ürün ve hizmetlerin doğrudan takas edildiği bir ticaret yöntemidir. Ulusal Barter A.Ş. sistemi, üyelerin sattıkları ürün ve hizmetler karşılığında barter çeki kazanıp, bu çeklerle diğer üyelerden ihtiyaçlarını karşılamasını sağlar."
              },
              {
                question: "Kimler barter yapabilir?",
                answer: "Her sektörden ve her büyüklükten işletme, barter sistemine dahil olabilir. Özellikle atıl kapasitesi veya stoğu olan firmalar için büyük avantajlar sunar. Barter sistemimiz, geniş bir üye ağına sahiptir."
              },
              {
                question: "Barter çekleri nasıl kullanılır?",
                answer: "Kazandığınız barter çekleri, Ulusal Barter A.Ş. platformunda listelenen diğer tüm ürün ve hizmetler için kullanılabilir. Çekler, nakit gibi değerlendirilir ve sistem içindeki tüm ticari faaliyetlerde geçerlidir."
              },
              {
                question: "Güvenli mi?",
                answer: "Evet, Ulusal Barter A.Ş. olarak tüm ticari işlemlerde şeffaflık ve güvenliği ön planda tutuyoruz. Her işlem kayıt altına alınır ve olası anlaşmazlıklarda profesyonel destek sağlanır."
              },
              {
                question: "Barter sistemi işletmeme ne gibi faydalar sağlar?",
                answer: "Nakit akışı optimizasyonu, atıl stokların değerlendirilmesi, yeni müşterilere ulaşım, pazar payı artışı ve ekonomik dalgalanmalara karşı direnç gibi pek çok fayda sağlar."
              }
            ].map((faq, index) => (
                // motion.div yerine normal div
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-2 flex items-center">
                  <Info className="w-5 h-5 text-yellow-500 mr-2 shrink-0" /> {faq.question}
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
          {/* motion.h2 yerine normal h2 */}
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Siz de Barter Dünyasına Katılın!
          </h2>
          {/* motion.p yerine normal p */}
          <p
            className="text-lg sm:text-xl opacity-90 mb-8"
          >
            İşletmenizin geleceğini dönüştürmek ve nakitsiz ticaretin avantajlarından faydalanmak için bugün bize ulaşın.
          </p>
          {/* motion.div yerine normal div */}
          <div>
            <Link href="/uyelik" passHref>
              <button className="inline-flex items-center bg-white text-yellow-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Hemen Üye Olun
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}