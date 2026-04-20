import { PiPulseBold } from "react-icons/pi";
import { RxPeople } from "react-icons/rx";
import { FiBell } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { LuTrophy } from "react-icons/lu";
import { IoBarChart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";

export const features = [
  {
    icon: PiPulseBold,
    title: "landingPage.features.tracking.title",
    description: "landingPage.features.tracking.description",
  },
  {
    icon: IoBarChart,
    title: "landingPage.features.analytics.title",
    description: "landingPage.features.analytics.description",
  },
  {
    icon: RxPeople,
    title: "landingPage.features.community.title",
    description: "landingPage.features.community.description",
  },
  {
    icon: FiBell,
    title: "landingPage.features.reminders.title",
    description: "landingPage.features.reminders.description",
  },
  {
    icon: LuTrophy,
    title: "landingPage.features.challenges.title",
    description: "landingPage.features.challenges.description",
  },
  {
    icon: BiDollar,
    title: "landingPage.features.donations.title",
    description: "landingPage.features.donations.description",
  },
];

export const testimonials = [
  {
    name: "landingPage.testimonials.items.ahmed.name",
    type: "landingPage.testimonials.items.ahmed.type",
    text: "landingPage.testimonials.items.ahmed.text",
    rating: 5,
  },
  {
    name: "landingPage.testimonials.items.sara.name",
    type: "landingPage.testimonials.items.sara.type",
    text: "landingPage.testimonials.items.sara.text",
    rating: 5,
  },
  {
    name: "landingPage.testimonials.items.mahmoud.name",
    type: "landingPage.testimonials.items.mahmoud.type",
    text: "landingPage.testimonials.items.mahmoud.text",
    rating: 5,
  },
];

//Home header cards content
export const headerCardsContent = [
  {
    icon: PiPulseBold,
    value: 128,
    label: 'homePage.header.cards.currentReading',
  },
  {
    icon: IoBarChart,
    value: 132,
    label: 'homePage.header.cards.weeklyAverage',
  },
  {
    icon: SlEnergy,
    value: 12,
    label: 'homePage.header.cards.streak',
  },
  {
    icon: FaRegHeart,
    value: "85%",
    label: 'homePage.header.cards.timeInRange',
  },
];

const commentsData = [
  {
    id: 1,
    content: "فعلاً الأكل الصحي بيفرق جدًا 🙌",
    likesCount: 4210,
    isLiked: false,
    dueDate: "2026-04-03",
    user: {
      name: "Ahmed Ali",
      avatar: "https://i.pravatar.cc/150?img=5",
      diabetesType: "type1"
    },
  },
  {
    id: 2,
    content: "أنا جربت أقلل السكر وحسيت بتحسن كبير 👍",
    likesCount: 101,
    isLiked: true,
    dueDate: "2026-04-03",
    user: {
      name: "Mona Hassan",
      avatar: "https://i.pravatar.cc/150?img=6",
      diabetesType: "type2"
    },
  },
  {
    id: 3,
    content: "ممكن تشاركنا نظامك الغذائي؟",
    likesCount: 1000025,
    isLiked: false,
    dueDate: "2026-04-03",
    user: {
      name: "Youssef Khaled",
      avatar: "https://i.pravatar.cc/150?img=7",
      diabetesType: "gestational"
    },
  },
];

export const posts = [
  {
    id: 1,
    title: "General Tips for Diabetes",
    body: "حاول تمشي يوميًا 30 دقيقة وحافظ على نظام غذائي متوازن.",
    images: [],
    category: "general",
    isOwner: false,
    likesCount: 25064,
    isLiked: false,
    commentsCount: 3,
    // DYNAMIC: This will always show "Just now" or "less than a minute"
    dueDate: new Date().toISOString(), 
    user: { name: "Ahmed Ali", avatar: "https://i.pravatar.cc/150?img=1", diabetesType: "type2" },
    hashtags: ["#health", "#صحة", "#fitness"],
    comments: commentsData,
  },
  {
    id: 2,
    title: "My Type 1 Journey",
    body: "كنت بعاني في البداية لكن مع الوقت اتعلمت أتحكم في السكر.",
    images: ["https://picsum.photos/300/200?random=1"],
    category: "type1",
    isOwner: true,
    likesCount: 12500,
    isLiked: true,
    commentsCount: 25000,
    // STATIC: Set to ~5 minutes ago from current system time
    dueDate: "2026-04-20T05:25:00.000Z", 
    user: { name: "Mohamed Hassan", avatar: "https://i.pravatar.cc/150?img=2", diabetesType: "type1" },
    hashtags: ["#Type1", "#تجربة", "#Control"],
    comments: commentsData,
  },
  {
    id: 3,
    title: "Type 2 & Healthy Living",
    body: "Eating healthy really helps in controlling blood sugar.",
    images: [
      "https://picsum.photos/300/200?random=1",
      "https://picsum.photos/300/200?random=2",
      "https://picsum.photos/300/200?random=3"
    ],
    category: "type2",
    isOwner: false,
    likesCount: 3164,
    isLiked: false,
    commentsCount: 100,
    // STATIC: Set to ~2 hours ago
    dueDate: "2026-04-20T03:30:00.000Z", 
    user: { name: "Sara Mohamed", avatar: "https://i.pravatar.cc/150?img=3", diabetesType: "type2" },
    hashtags: ["#Type2", "#أكل_صحي"],
    comments: commentsData,
  },
  {
    id: 4,
    title: "LADA Experience",
    body: "تم تشخيصي بـ LADA وكان الموضوع محتاج متابعة دقيقة.",
    images: [],
    category: "lada",
    isOwner: false,
    likesCount: 1011065,
    isLiked: true,
    commentsCount: 1024,
    // STATIC: Set to Yesterday
    dueDate: "2026-04-19T10:00:00.000Z", 
    user: { name: "Omar Khaled", avatar: "https://i.pravatar.cc/150?img=4", diabetesType: "lada" },
    hashtags: ["#LADA", "#Diabetes", "#تجربة"],
    comments: commentsData,
  },
  {
    id: 5,
    title: "Is MODY common?",
    body: "النوع ده نادر لكنه مهم يتشخص صح.",
    images: ["https://picsum.photos/300/200?random=4"],
    category: "mody",
    isOwner: false,
    likesCount: 30215,
    isLiked: false,
    commentsCount: 2500,
    dueDate: "2026-04-05T12:00:00.000Z", 
    user: { name: "Nour Ahmed", avatar: "https://i.pravatar.cc/150?img=5", diabetesType: "mody" },
    hashtags: ["#MODY", "#Rare", "#نادر"],
    comments: commentsData,
  },
  {
    id: 6,
    title: "Gestational Diabetes",
    body: "مهم جدًا متابعة السكر أثناء الحمل لحماية الأم والجنين.",
    images: [
      "https://picsum.photos/300/200?random=3",
      "https://picsum.photos/300/200?random=4",
      "https://picsum.photos/300/200?random=5",
      "https://picsum.photos/300/200?random=6",
    ],
    category: "gestational",
    isOwner: false,
    likesCount: 1221542,
    isLiked: true,
    commentsCount: 120,
    // STATIC: Today, but 10 hours ago
    dueDate: "2026-04-19T19:30:00.000Z", 
    user: { name: "Fatma Ali", avatar: "https://i.pravatar.cc/150?img=6", diabetesType: "gestational" },
    hashtags: ["#Gestational", "#حملي", "#Pregnancy"],
    comments: commentsData,
  },
  {
    id: 7,
    title: "Daily Advice",
    body: "اشرب مية كتير وقلل السكريات البسيطة.",
    images: [],
    category: "advices",
    isOwner: true,
    likesCount: 10000,
    isLiked: true,
    commentsCount: 1200,
    dueDate: "2026-04-07T08:00:00.000Z", 
    user: { name: "You", avatar: "https://i.pravatar.cc/150?img=7", diabetesType: "type1" },
    hashtags: ["#Tips", "#نصائح", "#Health"],
    comments: commentsData,
  },
];