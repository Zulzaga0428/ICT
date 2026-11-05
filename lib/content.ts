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
    id: "school",
    title: "Сургуулийн сайт",
    kind: "Вэб сайт",
    description: "Сургууль бүрт зориулсан нээлттэй сайт: мэдээ, танилцуулга, холбоо барих.",
    url: "https://demo.zulzaga.app",
    embeddable: true,
    image: "/works/school.webp",
  },
  {
    id: "kodu",
    title: "KoDu",
    kind: "AI платформ",
    description: "Хиймэл оюуны тусламжтайгаар сайт, аппыг монгол хэлээр бүтээх платформ.",
    url: "https://kodu.live",
    embeddable: true,
    image: "/works/kodu.webp",
  },
  {
    id: "goesim",
    title: "GoTravel eSIM",
    kind: "Аялал · Цахим худалдаа",
    description: "Дэлхийн 200 гаруй улсад ашиглах eSIM-ийг QPay-ээр шууд худалдан авах.",
    url: "https://goesim.world",
    embeddable: true,
    image: "/works/goesim.webp",
  },
  {
    id: "shatar",
    title: "Хаан Шатар",
    kind: "Онлайн тоглоом",
    description: "Бодит цагийн онлайн шатрын платформ.",
    url: "https://shatar.online",
    embeddable: true,
    image: "/works/shatar.webp",
  },
];
