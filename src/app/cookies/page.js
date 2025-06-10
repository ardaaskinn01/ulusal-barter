import Head from 'next/head';

export const metadata = {
  title: "Çerez Politikası | ulusalbarter.com",
  description: "Sitemizde kullanılan çerezler ve yönetim seçenekleri hakkında bilgi."
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <link rel="canonical" href="https://ulusalbarter.com/cookies" />
      </Head>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Çerez Politikası</h1>
          <p className="text-sm text-gray-500">Son güncelleme: 11 Haziran 2025</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Bu metnin amacı, ziyaret etmekte olduğunuz İnternet sitesi tarafından kullanılan çerezlerin cihazınıza
            yerleştirilmesi aracılığıyla otomatik yolla elde edilen kişisel verilerin işlenmesine ilişkin olarak, hangi
            amaçlarla hangi tür çerezleri kullandığımız ve bu çerezleri nasıl yönetebileceğiniz konularında sizlere bilgi
            vermektir. Platform içerisinde, hizmetlerin yerine getirilebilmesi için kullandığımız zorunlu çerezler ile bunlar
            haricinde kullanıcıların açık rızalarına bağlı türlerinde çerezler yer almaktadır.
          </p>

          <h2>Çerez Nedir?</h2>
          <p>
            Çerezler, bir İnternet sayfası ziyaret edildiğinde kullanıcılara ilişkin birtakım bilgilerin kullanıcıların terminal
            cihazlarında depolanmasına izin veren düşük boyutlu zengin metin biçimli text formatlarıdır. Çerezler, bir
            İnternet sitesini ilk ziyaretiniz sırasında tarayıcınız aracılığıyla cihazınıza depolanabilir ve aynı siteyi aynı
            cihazla tekrar ziyaret ettiğinizde, tarayıcınız cihazınızda site adına kayıtlı bir çerez olup olmadığını kontrol eder.
            Eğer kayıt var ise, kaydın içindeki veriyi ziyaret etmekte olduğunuz İnternet sitesine iletir. Bu sayede İnternet
            sitesi, sizin daha önceki ziyaretinizi tespit eder ve size iletilecek içeriği ona göre belirler.
          </p>

          <h2>Çerezler Neden Kullanılır?</h2>
          <p>
            Çerezler, İnternet sitesinin daha verimli çalışması ve kullanıcılarının kişisel ihtiyaçlarına daha uygun hizmet
            sunulması amaçlarıyla kullanılmaktadır. Kullanmakta olduğumuz çerezler, bilgilerin toplanması, İnternet
            sitemizin işlevselliğini ve performansını artırılması, kullanıcı deneyiminin iyileştirilmesi ve yasal yükümlülüklerin
            yerine getirilmesi gibi işlevleri yerine getirmektedir. Bunların yanı sıra, kullanmakta olduğumuz çerezler sayesinde:
          </p>
          <ul>
            <li>Oturum bilgileriniz korunur ve güvenliğiniz sağlanır.</li>
            <li>Site içi deneyiminiz iyileştirilir ve hızlandırılır.</li>
            <li>Tercihleriniz hatırlanarak size özel içerikler sunulur.</li>
            <li>Site kullanımına ilişkin analiz yapılarak hizmet kalitesi artırılır.</li>
          </ul>

          <h2>Kullanılan Çerez Türleri ve Kullanım Amaçları</h2>
          <h3>Zorunlu Çerezler</h3>
          <p>
            Zorunlu çerezler, bir İnternet sitesinin çalışması için gerekli olan çerezlerdir. Bu çerezler, kullanıcının talep etmiş
            olduğu bir bilgi toplama hizmetinin (log-in olma, form doldurma, gizlilik tercihlerinin hatırlanması gibi) yerine
            getirilebilmesi için zorunlu olarak kullanılmaktadırlar. Pazarlama amacı taşımayan zorunlu çerezlerin engellenmesi
            halinde, İnternet sitesinin bazı bölümleri çalışmayacağından, İnternet sitesi kendisinden beklenen fonksiyonu
            yerine getiremeyecektir.
          </p>

          <h2>Çerez Yönetimi</h2>
          <p>
            Tarayıcı ayarlarınızdan çerez tercihlerinizi istediğiniz zaman değiştirebilirsiniz. Çerezleri tamamen devre dışı
            bırakabilir veya belirli türdeki çerezlere izin verebilirsiniz. Çoğu tarayıcı, varsayılan olarak çerezleri kabul edecek
            şekilde ayarlanmıştır, ancak tarayıcınızın ayarlarını değiştirerek çerezleri reddedebilir veya çerez gönderildiğinde
            uyarı verecek şekilde ayarlayabilirsiniz. Daha fazla bilgi için{' '}
            <a href="mailto:simsekoglugrup@gmail.com" className="text-yellow-600 hover:underline">
              simsekoglugrup@gmail.com
            </a>{' '}
            adresinden bize ulaşabilirsiniz.
          </p>

          <h3>Tarayıcı Ayarları</h3>
          <ul>
            <li>
              <a href="chrome://settings/cookies" target="_blank" rel="noopener noreferrer">
                Google Chrome: chrome://settings/cookies
              </a>
            </li>
            <li>
              <a href="about:preferences#privacy" target="_blank" rel="noopener noreferrer">
                Mozilla Firefox: about:preferences#privacy
              </a>
            </li>
            <li>Safari: Tercihler &gt; Gizlilik</li>
            <li>
              <a href="edge://settings/privacy" target="_blank" rel="noopener noreferrer">
                Microsoft Edge: edge://settings/privacy
              </a>
            </li>
            <li>
              <a href="opera://settings/privacy" target="_blank" rel="noopener noreferrer">
                Opera: opera://settings/privacy
              </a>
            </li>
          </ul>

          <h2>Güncellemeler</h2>
          <p>
            Bu Çerez Politikası, gerektiğinde güncellenir. Değişiklikler yayınlandığı anda yürürlüğe girer.
          </p>
        </div>
      </div>
    </div>
  );
}
