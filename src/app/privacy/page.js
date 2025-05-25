import Head from 'next/head';

export const metadata = {
    title: "Gizlilik Politikası | ulusalbarteryatırım.com",
    description: "Sitemizde kullanılan Gizlilik politikası hakkında bilgi"
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <Head>
                <link rel="canonical" href="https://ulusalbarteryatırım.com/privacy" />
            </Head>

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gizlilik Politikası</h1>
                    <p className="text-sm text-gray-500">Son güncelleme: 21 Mayıs 2025</p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700">
                    <p>
                        Bu İnternet sitesini kullanarak kişisel verilerinizin işlenmesini kabul etmiş olursunuz. Güvenliğiniz bizim için önemli. Bu sebeple, bizimle paylaşacağınız kişisel verileriniz hassasiyetle korunmaktadır.
                    </p>

                    <h2>Veri Sorumlusu</h2>
                    <p>
                        Biz, Ulusal Barter Yatırım A.Ş., veri sorumlusu olarak, bu gizlilik ve kişisel verilerin korunması politikası ile ziyaret etmekte olduğunuz İnternet sitesi kapsamında hangi kişisel verilerinizin hangi amaçlarla işleneceği, işlenen verilerin kimlerle ve hangi sebeplerle paylaşılabileceği, veri işleme yöntemimiz ve hukuki sebepleri ile; işlenen verilerinize ilişkin haklarınızın neler olduğu hususunda siz kullanıcılarımızı aydınlatmayı amaçlıyoruz.
                    </p>

                    <h2>Toplanan Kişisel Veriler</h2>
                    <ul>
                        <li>Adres bilgileri</li>
                        <li>E-posta adresi</li>
                        <li>Ad ve soyad</li>
                    </ul>

                    <h2>Kullanılan Servisler</h2>
                    <h3>Analitik ve izleme</h3>
                    <p>
                        <strong>Google Analytics:</strong> Google Analytics, ziyaretçi davranışlarını ve site kullanımını analiz etmek için kullanılmaktadır. Bu hizmet, ziyaretçi trafiği, etkileşimler ve kullanıcı davranışları hakkında detaylı raporlar sağlar.
                    </p>

                    <h2>Verilerin İşlenme Amaçları</h2>
                    <p>
                        Kişisel verileriniz, bu İnternet sitesi tarafından amacına uygun hizmet sunulabilmesi, yasal yükümlülüklerin yerine getirilmesi, hizmet kalitesinin artırılması, iletişim, güvenlik ve gerektiğinde yasal merciler ile bilgi paylaşılabilmesi amaçları ile işlenmektedir. Kişisel verileriniz, bu sayılan amaçlar dışında kullanılmayacaktır.
                    </p>

                    <h2>Verilerin Aktarılması</h2>
                    <p>
                        Bu İnternet sitesi tarafından toplanan kişisel verileriniz, yasal zorunluluklar haricinde, açık rızanız olmadan üçüncü kişiler ile paylaşılmaz. Ancak hizmet sağlayıcılarımız, iş ortaklarımız ve yasal merciler ile, hizmetin sağlanması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla gerekli olduğu ölçüde paylaşılabilir.
                    </p>

                    <h2>Çerez Kullanımı</h2>
                    <p>
                        Bu İnternet sitesi çerez kullanmaktadır. Çerezler, bir İnternet sayfası ziyaret edildiğinde kullanıcılara ilişkin birtakım bilgilerin kullanıcıların terminal cihazlarında depolanmasına izin veren düşük boyutlu zengin metin biçimli text formatlarıdır. Çerezler, bir İnternet sitesini ilk ziyaretiniz sırasında tarayıcınız aracılığıyla cihazınıza depolanabilir ve aynı siteyi aynı cihazla tekrar ziyaret ettiğinizde, tarayıcınız cihazınızda site adına kayıtlı bir çerez olup olmadığını kontrol eder. Eğer kayıt var ise, kaydın içindeki veriyi ziyaret etmekte olduğunuz İnternet sitesine iletir. Bu sayede İnternet sitesi, sizin daha önceki ziyaretinizi tespit eder ve size iletilecek içeriği ona göre belirler.
                    </p>

                    <h2>KVKK Kapsamında Haklarınız</h2>
                    <p>6698 sayılı KVKK madde 11 uyarınca herkes, veri sorumlusuna başvurarak kendisiyle ilgili aşağıda yer alan taleplerde bulunma hakkına sahiptir:</p>
                    <ul>
                        <li>Kişisel verilerinin işlenip işlenmediğini öğrenme.</li>
                        <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme.</li>
                        <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
                        <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme.</li>
                        <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme.</li>
                        <li>KVKK madde 7 ile öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme.</li>
                        <li>Düzeltme, silme ve yok edilme talepleri neticesinde yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme.</li>
                        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme.</li>
                        <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.</li>
                    </ul>

                    <h2>İletişim</h2>
                    <p>
                        Kişisel verilerinizle ilgili haklarınızı kullanmak veya Gizlilik Politikamız hakkında daha fazla bilgi almak için <a href="mailto:simsekoglugrup@gmail.com">simsekoglugrup@gmail.com</a> adresinden bizimle iletişime geçebilirsiniz.
                    </p>

                    <h2>Onay ve Yürürlük</h2>
                    <p>
                        İnternet sitemiz ile kişisel verilerinizi paylaşmak, tamamen sizin tercihinizdir. İnternet sitemizi kullanmaya devam ettiğiniz takdirde, bu Gizlilik Politikası&apos;nı kabul ettiğiniz varsayılacaktır. Bu politika, 21 Mayıs 2025 tarihinde yürürlüğe girmiş olup, gerektiğinde güncellenir.
                    </p>
                </div>
            </div>
        </div>
    );
}