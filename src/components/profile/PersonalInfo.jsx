import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { LuRuler } from "react-icons/lu";
import { TiFlashOutline } from "react-icons/ti";
import { LuDroplet } from "react-icons/lu";
import { FaWeightScale } from "react-icons/fa6";


export default function PersonalInfo() {
    const user = useSelector((state) => state.user.user);
    const userName = (user?.first_name + " " + user?.last_name) ?? "username";
    return(
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-[#161A41] dark:text-white">المعلومات الشخصية</h2>
        <div className="rounded-2xl shadow-lg p-6 border
        bg-white bg-none border-[#D9D9D9]/30
        dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
                    <div className="flex-start gap-2">
                        <IoPersonOutline className="w-5 h-5 text-[#6976EB]" />
                        <span className="text-sm text-[#808080] dark:text-gray-400">الاسم الكامل</span>
                    </div>
                    <p className="text-lg font-bold dark:text-white text-[#161A41]">
                        {userName}
                    </p>
                </div>
                                <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
                    <div className="flex-start gap-2">
                        <MdOutlineDateRange className="w-5 h-5 text-[#6976EB]" />
                        <span className="text-sm text-[#808080] dark:text-gray-400">تاريخ الميلاد</span>
                    </div>
                    <p className="text-lg font-bold dark:text-white text-[#161A41]">
                        {user?.birthDate ?? '15 مارس 1990'}
                    </p>
                    <p className="text-sm text-[#808080] dark:text-gray-400">
                        {user?.birthDate ?? '34 سنة'}
                    </p>
                </div>
                <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
                    <div className="flex-start gap-2">
                        <FaWeightScale className="w-5 h-5 text-[#6976EB]" />
                        <span className="text-sm text-[#808080] dark:text-gray-400">الوزن</span>
                    </div>
                    <p className="text-lg font-bold dark:text-white text-[#161A41]">
                        {user?.weight ?? '75 كجم'}
                    </p>
                </div>
                <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
                    <div className="flex-start gap-2">
                        <LuRuler className="w-5 h-5 text-[#6976EB]" />
                        <span className="text-sm text-[#808080] dark:text-gray-400">الطول</span>
                    </div>
                    <p className="text-lg font-bold dark:text-white text-[#161A41]">
                        {user?.height ?? '175 سم'}
                    </p>
                </div>
                <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
                    <div className="flex-start gap-2">
                        <LuDroplet className="w-5 h-5 text-[#6976EB]" />
                        <span className="text-sm text-[#808080] dark:text-gray-400">وحدة قياس السكر</span>
                    </div>
                    <p className="text-lg font-bold dark:text-white text-[#161A41]">
                        {user?.bloodSugarUnit ?? 'mg/dl'}
                    </p>
                </div>
                <div className="rounded-xl p-4 space-y-2 bg-[#F8F9FF] dark:bg-white/5">
                    <div className="flex-start gap-2">
                        <TiFlashOutline className="w-5 h-5 text-[#6976EB]" />
                        <span className="text-sm text-[#808080] dark:text-gray-400">وحدة الكربوهيدرات</span>
                    </div>
                    <p className="text-lg font-bold dark:text-white text-[#161A41]">
                        {user?.carbUnit ?? 'غرام'}
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    );
}