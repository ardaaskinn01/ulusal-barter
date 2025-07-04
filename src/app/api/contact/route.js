import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    // **BURAYI EKLEYİN:** Ortam değişkenlerini konsola yazdırın
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    // Güvenlik nedeniyle SMTP_PASS'i doğrudan yazdırmayın, sadece varlığını kontrol edin
    console.log("SMTP_PASS var mı:", !!process.env.SMTP_PASS);
    
    if (!name || !email || !message) {
      return new Response("Lütfen tüm alanları doldurun", { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,  // SSL/TLS bağlantısı
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Bağlantıyı doğrulama
    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP bağlantı hatası:", error);
      } else {
        console.log("SMTP bağlantısı başarılı");
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.SMTP_USER,
      subject: `Yeni İletişim Formu: ${name}`,
      text: `
        İsim: ${name}
        Telefon: ${phone || "Belirtilmemiş"}
        Mesaj: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response("E-posta başarıyla gönderildi!", { status: 200 });
  } catch (error) {
    console.error("Mail gönderme hatası:", error.message);
    console.error("Stack trace:", error.stack);
    return new Response("Mail gönderme başarısız", { status: 500 });
  }
}