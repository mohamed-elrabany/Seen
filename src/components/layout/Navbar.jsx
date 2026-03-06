import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex-between fixed top-0 z-50 w-full bg-white p-8 shadow-md">
      <img src="/logo.svg" alt="Seen logo" className="h-12 w-auto" />

      <ul className="flex-center gap-8 text-lightGray">

            <a className="text-lightGray hover:text-[#6976EB] transition-all font-medium" href="#features">المميزات</a>
            <a className="text-lightGray hover:text-[#6976EB] transition-all font-medium" href="#community">المجتمع</a>
            <a className="text-lightGray hover:text-[#6976EB] transition-all font-medium" href="#testimonials">التقييمات</a>
        <li>
          <Link to="/login" className="text-lightGray hover:text-[#6976EB] transition-all font-medium">
            تسجيل الدخول
          </Link>
        </li>

        <li>
          <Link
            to="/signup"
            className="bg-[#6976EB] hover:bg-[#1F1A5F] transition-all text-white rounded-full px-6 py-3 cursor-pointer font-bold shadow-lg"
          >
            ابدأ الآن
          </Link>
        </li>
      </ul>
    </nav>
  );
}