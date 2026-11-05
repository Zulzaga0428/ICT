import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { company } from "@/lib/content";

// Нууцлалын бодлого. Google Play / App Store-д аппын нууцлалын холбоос болгон
// https://icttool.net/privacy-г өгнө. Огноо, агуулгыг өөрчлөхдөө EFFECTIVE-ийг шинэчил.
const EFFECTIVE = { mn: "2026 оны 11-р сарын 5", en: "November 5, 2026" };

export const metadata: Metadata = {
  title: "Нууцлалын бодлого / Privacy Policy — ICT Tool",
  description: `${company.legalName}-ийн нууцлалын бодлого. Privacy Policy of ${company.legalName}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="doc">
      <header className="docBar">
        <Link href="/" className="logo" aria-label="Нүүр">
          <Logo />
        </Link>
        <nav className="docLang">
          <a href="#mn">Монгол</a>
          <a href="#en">English</a>
        </nav>
      </header>

      <main className="docBody">
        <article id="mn" lang="mn">
          <p className="eyebrow">Хүчин төгөлдөр болсон: {EFFECTIVE.mn}</p>
          <h1>Нууцлалын бодлого</h1>
          <p>
            Энэхүү бодлого нь {company.legalName} ({company.legalNameMn}, улсын бүртгэлийн дугаар{" "}
            {company.registry})-ийн icttool.net вэб сайт болон манай хөгжүүлсэн вэб, гар утасны
            аппликейшн, үйлчилгээнд (цаашид «Үйлчилгээ») хамаарна. Тухайн бүтээгдэхүүн өөрийн тусгай
            нууцлалын бодлоготой бол тэр нь давуу хүчинтэй.
          </p>

          <h2>1. Бидний цуглуулдаг мэдээлэл</h2>
          <ul>
            <li>
              <b>Таны өгсөн мэдээлэл:</b> нэр, имэйл, утасны дугаар, бүртгэлийн мэдээлэл, бидэнд
              илгээсэн захидал болон Үйлчилгээнд оруулсан агуулга.
            </li>
            <li>
              <b>Боловсролын үйлчилгээ:</b> сургууль, багш, эцэг эх оруулсан сурагчийн мэдээлэл (нэр,
              анги, ирц, дүн гэх мэт). Энэ мэдээллийг бид сургууль болон эцэг эхийн өмнөөс,
              үйлчилгээ үзүүлэх зорилгоор л боловсруулна.
            </li>
            <li>
              <b>Төлбөр:</b> төлбөрийг QPay зэрэг төлбөрийн үйлчилгээ үзүүлэгчээр дамжуулан хийдэг. Бид
              банкны карт, дансны нууц мэдээллийг хадгалдаггүй.
            </li>
            <li>
              <b>Техникийн мэдээлэл:</b> төхөөрөмж, хөтчийн төрөл, IP хаяг, алдааны бүртгэл болон
              нэвтрэлтийг хадгалахад шаардлагатай cookie.
            </li>
          </ul>

          <h2>2. Мэдээллийг ашиглах зорилго</h2>
          <ul>
            <li>Үйлчилгээг үзүүлэх, сайжруулах, хэрэглэгчид тусламж үзүүлэх;</li>
            <li>Бүртгэл, нэвтрэлт болон аюулгүй байдлыг хангах, залилангаас сэргийлэх;</li>
            <li>Хуульд заасан үүргээ биелүүлэх.</li>
          </ul>
          <p>
            Бид таны хувийн мэдээллийг худалдахгүй, сурталчилгааны зорилгоор гуравдагч этгээдэд
            дамжуулахгүй.
          </p>

          <h2>3. Мэдээлэл хуваалцах</h2>
          <p>
            Мэдээллийг зөвхөн Үйлчилгээг ажиллуулахад шаардлагатай гэрээт үйлчилгээ үзүүлэгч (сервер,
            өгөгдлийн сан, имэйл, төлбөрийн үйлчилгээ) болон хуулиар эрх бүхий байгууллагын хүсэлтээр
            хуваалцана. Манай серверүүд Монгол Улсаас гадна (тухайлбал Сингапурт) байрлаж болно.
          </p>

          <h2>4. Хүүхдийн мэдээлэл</h2>
          <p>
            Боловсролын үйлчилгээнд хүүхдийн мэдээллийг сургууль эсвэл эцэг эх, асран хамгаалагчийн
            зөвшөөрлөөр боловсруулна. Хүүхдийн мэдээллийг сурталчилгаанд ашиглахгүй.
          </p>

          <h2>5. Хадгалах хугацаа ба устгах</h2>
          <p>
            Мэдээллийг таны бүртгэл идэвхтэй байх хугацаанд эсвэл хуульд заасан хугацаагаар хадгална.
            Та бүртгэлээ аппын тохиргооноос эсвэл {company.email} хаягаар хүсэлт илгээж устгуулах
            боломжтой.
          </p>

          <h2>6. Аюулгүй байдал</h2>
          <p>
            Өгөгдлийг дамжуулахдаа шифрлэж (HTTPS), хандах эрхийг хязгаарлан хамгаална. Гэсэн хэдий ч
            интернэтээр дамжих ямар ч систем бүрэн эрсдэлгүй гэж баталгаажуулах боломжгүй.
          </p>

          <h2>7. Таны эрх</h2>
          <p>
            Та өөрийн мэдээлэлтэй танилцах, засварлуулах, устгуулах, боловсруулахыг зогсоолгох эрхтэй.
            Хүсэлтээ {company.email} хаягаар илгээнэ үү.
          </p>

          <h2>8. Өөрчлөлт</h2>
          <p>
            Бодлогод өөрчлөлт орвол энэ хуудсанд шинэ огноотойгоор нийтэлнэ.
          </p>

          <h2>9. Холбоо барих</h2>
          <Contact lang="mn" />
        </article>

        <hr />

        <article id="en" lang="en">
          <p className="eyebrow">Effective date: {EFFECTIVE.en}</p>
          <h1>Privacy Policy</h1>
          <p>
            This policy applies to the icttool.net website and to the web and mobile applications and
            services developed by {company.legalName} (Reg. No. {company.registry}) (the
            &quot;Services&quot;). Where a product has its own privacy policy, that policy takes
            precedence.
          </p>

          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <b>Information you provide:</b> name, email, phone number, account details, messages you
              send us and content you submit to the Services.
            </li>
            <li>
              <b>Education services:</b> student information entered by schools, teachers or parents
              (such as name, class, attendance and grades). We process it on behalf of the school and
              parents, only to provide the service.
            </li>
            <li>
              <b>Payments:</b> payments are handled by payment providers such as QPay. We do not store
              bank card or account credentials.
            </li>
            <li>
              <b>Technical data:</b> device and browser type, IP address, error logs and the cookies
              required to keep you signed in.
            </li>
          </ul>

          <h2>2. How we use information</h2>
          <ul>
            <li>To provide and improve the Services and to support users;</li>
            <li>To secure accounts and sign-in and to prevent fraud;</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <p>We do not sell personal information or share it with third parties for advertising.</p>

          <h2>3. Sharing</h2>
          <p>
            We share information only with contracted service providers needed to run the Services
            (hosting, database, email and payment providers) and with authorities when required by law.
            Our servers may be located outside Mongolia (for example, in Singapore).
          </p>

          <h2>4. Children</h2>
          <p>
            In our education services, children&apos;s information is processed with the authorization
            of the school or of a parent or guardian. It is never used for advertising.
          </p>

          <h2>5. Retention and deletion</h2>
          <p>
            We keep information while your account is active or as long as the law requires. You can
            delete your account in the app settings or by emailing {company.email}.
          </p>

          <h2>6. Security</h2>
          <p>
            Data is encrypted in transit (HTTPS) and access is restricted. No system connected to the
            internet can be guaranteed to be completely secure.
          </p>

          <h2>7. Your rights</h2>
          <p>
            You may request access to, correction or deletion of your information, or ask us to stop
            processing it, by emailing {company.email}.
          </p>

          <h2>8. Changes</h2>
          <p>We will publish any changes on this page with a new effective date.</p>

          <h2>9. Contact</h2>
          <Contact lang="en" />
        </article>
      </main>

      <footer className="docFoot">
        © {new Date().getFullYear()} {company.legalName} · Reg. No. {company.registry}
      </footer>
    </div>
  );
}

function Contact({ lang }: { lang: "mn" | "en" }) {
  return (
    <address className="docContact">
      <b>{company.legalName}</b>
      <span>{lang === "mn" ? company.addressMn : company.addressEn}</span>
      <a href={`mailto:${company.email}`}>{company.email}</a>
      <a href={`tel:+${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>
    </address>
  );
}
