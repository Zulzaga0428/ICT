// Сайтын бүх бичвэр, мэдээлэл энд. Өөрчлөх бол зөвхөн энэ файлыг засна.

export const company = {
  brand: "ICT Tool",
  legalName: "Nart ICT Tool LLC",
  legalNameMn: "Нарт Ай Си Ти Түүл ХХК",
  // TODO: бодит мэдээллээр солих
  registry: "—",
  address: "Улаанбаатар хот",
  email: "—",
  phone: "—",
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
};

export const flagship: Work & { features: string[] } = {
  id: "edu",
  title: "Zulzaga EDU",
  kind: "Боловсролын нэгдсэн систем",
  description:
    "Сургуулийн өдөр тутмын ажлыг нэг дор: ирц, дүн, журнал, хуваарь, эцэг эхтэй харилцах. Багш ажлаа алдахгүй, эцэг эх хүүхдийнхээ явцыг цаг алдалгүй харна.",
  url: "https://edu.zulzaga.app",
  embeddable: false,
  image: "/works/edu.webp",
  features: [
    "Ирц ба цахим журнал",
    "Дүн, голч, жилийн эцсийн тайлан",
    "Эцэг эхийн апп ба мэдэгдэл",
    "Багш, анги, хичээлийн удирдлага",
    "Сургууль бүрийн нээлттэй сайт",
  ],
};

export const works: Work[] = [
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

export const principles = [
  {
    title: "Ажилладаг байх",
    text: "Гоё харагдахаас өмнө тасралтгүй, найдвартай ажиллах нь чухал. Хэрэглэгч ажлаа хэзээ ч алдах ёсгүй.",
  },
  {
    title: "Монгол хэрэглэгчид зориулсан",
    text: "Монгол хэл, QPay, дотоодын журам, бодит хэрэглээг анхнаас нь тусгаж бүтээдэг.",
  },
  {
    title: "Өөрсдөө бүтээж, өөрсдөө хариуцна",
    text: "Санаанаас эхлээд байршуулалт, засвар үйлчилгээ хүртэл нэг баг хариуцна.",
  },
  {
    title: "Хурдан нэвтрүүлэлт",
    text: "Шинэ хэрэгцээг долоо хоногоор биш өдрөөр шийдэж, хэрэглэгчийн санал дээр тулгуурлан сайжруулна.",
  },
];
