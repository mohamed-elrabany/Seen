import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <footer className="bg-[#161A41] w-full px-6 lg:px-12 py-12 flex-col-center">
            <div className="w-full grid md:grid-cols-4 gap-12 mb-8">
                <div className="flex-col-start gap-4">
                    <img src="/logo.svg" alt="Seen logo" className="h-12 w-auto" />
                    <p className="text-white/70">منصة متكاملة لإدارة السكري بذكاء</p>
                </div>
                <div className="flex-col-start gap-4">
                    <h4 className="font-bold text-white">روابط سريعة</h4>
                    <ul className="space-y-2">
                        <li><a href="#features" className="text-white/70 hover:text-white transition-colors">المميزات</a></li>
                        <li><a href="#community" className="text-white/70 hover:text-white transition-colors">المجتمع</a></li>
                        <li><a href="#donate" className="text-white/70 hover:text-white transition-colors">التبرعات</a></li>
                    </ul>
                </div>
                <div className="flex-col-start gap-4">
                    <h4 className="font-bold text-white">الحساب</h4>
                    <ul className="space-y-2">
                        <li><Link to={'/login'} className="text-white/70 hover:text-white transition-colors">تسجيل الدخول</Link></li>
                        <li><Link to={'/signup'} className="text-white/70 hover:text-white transition-colors">إنشاء الحساب</Link></li>
                    </ul>
                </div>
                <div className="flex-col-start gap-4">
                    <h4 className="font-bold text-white">قانوني</h4>
                    <ul className="space-y-2">
                        <li><a href="#features" className="text-white/70 hover:text-white transition-colors">سياسة الخصوصية</a></li>
                        <li><a href="#community" className="text-white/70 hover:text-white transition-colors">شروط الاستخدام</a></li>
                        <li><a href="#donate" className="text-white/70 hover:text-white transition-colors">تواصل معنا</a></li>
                    </ul>
                </div>
                
            </div>
            <div className="w-full border-t border-[#D9D9D9] py-8">
                <p className="text-center text-white/70">
                    © 2026 Seen. جميع الحقوق محفوظة.
                </p>
            </div>
        </footer>
    )
}