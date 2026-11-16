// Сайтын бүх бичвэр, мэдээлэл энд. Өөрчлөх бол зөвхөн энэ файлыг засна.

export const company = {
  brand: "ICT Tool",
  legalName: "Nart ICT Tool LLC",
  legalNameMn: "Нарт Ай Си Ти Түүл ХХК",
  // Улсын бүртгэлийн гэрчилгээ, D&B-д бүртгэсэнтэй ҮСЭГ НЭГ БҮРЧЛЭН адил байх ёстой —
  // D&B сайт дээрх мэдээллийг тулгаж шалгадаг.
  registry: "7343649",
  addressMn: "Улаанбаатар хот, Баянгол дүүрэг, 12-р хороо, 6 бичил хороолол, 6а байр, 89 тоот",
  addressEn: "Bayangol district, 12-r khoroo, 6 bichil khoroolol, Building 6a, Door 89, Ulaanbaatar, Mongolia",
  email: "hello@icttool.net",
  phone: "+976 7270 5789",
};

export type Work = {
  id: string;
  title: string;
  kind: string;
  description: string;
  url: string;
  // false = тухайн сайт өөр сайтад iframe-ээр суулгахыг хориглосон (popup дотор амьдаар харагдахгүй)
  embeddable: boolean;
  image?: string;
  // Ажлуудын дотор онцолж харуулах (тендерийн гол бүтээгдэхүүн)
  featured?: boolean;
};

export const hero = {
  eyebrow: "Программ хангамж · Вэб · Апп · AI",
  // Хоёр мөр; accent хэсэг нь тоорын өнгөөр налуу харагдана
  line1: "Бусдын амжилтад баярлаж чаддаг хүн",
  accent: "өөрийн ирээдүйг илүү томоор",
  after: " хардаг.",
};

export const about = {
  title: ["Санаанаас", "технологи хүртэл."],
  paragraphs: [
    "NART ICT TOOL LLC нь программ хангамж, дижитал бүтээгдэхүүн, технологийн шийдэл хөгжүүлдэг компани юм.",
    "Бид боловсрол, аялал жуулчлал, худалдаа болон бусад салбарт зориулсан өөрийн платформ, систем, үйлчилгээг бүтээж, технологийн тусламжтайгаар шинэ боломжуудыг бий болгодог.",
  ],
  directions: ["Software Development", "Web & Mobile", "AI Solutions", "Digital Platforms", "System Integration"],
  principles: ["Найдвартай байдал", "Тасралтгүй хөгжил", "Хэрэглэгч төвтэй шийдэл", "Хариуцлага"],
};

export const works: Work[] = [
  // Дараалал: EDU онцлох, дараа нь Zulzaga-гийн өгсөн жагсаалтын урвуу дарааллаар (11-16).
  // zulzaga.app ба zulzaga-ai.pro нь ижил сайт тул нэг карт.
  {
    id: "edu",
    title: "Zulzaga EDU",
    kind: "Боловсролын нэгдсэн систем",
    description: "Сургуулийн ирц, дүн, журнал, эцэг эхтэй харилцах ажлыг нэг дор.",
    url: "https://edu.zulzaga.app",
    embeddable: false,
    image: "/works/edu.webp",
    featured: true,
  },
  {
    id: "ai",
    title: "ZulzagaAI",
    kind: "AI туслах",
    description: "Монгол хэлээр ярилцдаг хиймэл оюуны туслах: бичиж, ярьж, зураг илгээж асууна.",
    url: "https://zulzaga-ai.pro",
    embeddable: true,
    image: "/works/ai.webp",
  },
  {
    id: "kodu",
    title: "KoDu",
    kind: "AI платформ",
    description: "Санаагаа монголоор бичихэд хиймэл оюун вэб сайтыг тань бүтээнэ.",
    url: "https://kodu.live",
    embeddable: false,
    image: "/works/kodu.webp",
  },
  {
    id: "iq",
    title: "QI Smart Learning",
    kind: "Хүүхдийн сургалт",
    description: "Өдөрт 15 минут: математик, логик, шатраар хүүхэд өөрөө бодож сурна.",
    url: "https://iq.shatar.online",
    embeddable: true,
    image: "/works/iq.webp",
  },
  {
    id: "auto24",
    title: "AUTO 24",
    kind: "Авто зарын платформ",
    description: "Машин худалдах, худалдан авах зарын платформ, AI туслахтай.",
    url: "https://auto24.live",
    embeddable: false,
    image: "/works/auto24.webp",
  },
  {
    id: "lite",
    title: "Lite+",
    kind: "eSIM",
    description: "Дэлхий даяар ашиглах eSIM болон орчуулга, валют зэрэг аяллын хэрэгслүүд.",
    url: "https://litesim.site",
    embeddable: true,
    image: "/works/lite.webp",
  },
  {
    id: "home24",
    title: "HOME24",
    kind: "Үл хөдлөх хөрөнгийн зар",
    description: "Улаанбаатарын байр, хашаа байшин, газар, оффисын зарыг нэг дороос.",
    url: "https://home24.live",
    embeddable: true,
    image: "/works/home24.webp",
  },
  {
    id: "datatai",
    title: "DataTai",
    kind: "Аяллын eSIM",
    description: "Аялахдаа SIM карт солихгүйгээр датаг онлайнаар идэвхжүүлнэ.",
    url: "https://datatai.world",
    embeddable: true,
    image: "/works/datatai.webp",
  },
  {
    id: "sainuu",
    title: "Hi Сайн уу",
    kind: "Дуут орчуулагч",
    description: "Монгол болон гадаад хэлний хооронд ярьж орчуулна.",
    url: "https://hisainuu.online",
    embeddable: true,
    image: "/works/sainuu.webp",
  },
];
