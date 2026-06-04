import { BsFillPersonCheckFill, BsFillPersonXFill, BsFillPersonPlusFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { PiChatCircleTextBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbChecks } from "react-icons/tb";
import GlucoseIcon from "../ui/GlucoseIcon";
import CommunityIcon from "../ui/CommunityIcon";

import { formatRelativeTime } from "../../util/formatRelativeTime";
import { formatDateTimeString } from "../../util/formatDiplayedDate";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotificationCard({ type, time, is_read, extraData, markAsRead, onDelete, ...rest }) {
    const navigate = useNavigate();
    const formattedTime = formatDateTimeString(time);

    const cardContent = {
        like: { icon: FaHeart, title: "إعجاب بمنشورك", description: `قام ${extraData.senderName || "مستخدم"} بالإعجاب بمنشورك الأخير.` },
        comment: { icon: CommunityIcon, title: "تعليق جديد", description: `علق ${extraData.senderName || "مستخدم"} على منشورك "${extraData.postTitle || ""}".` },
        reminder: { icon: MdNotificationsActive, title: "تذكير", description: `حان وقت: ${extraData.reminderName || "التنبيه الخاص بك"}.` },
        system: { icon: IoSettingsOutline, title: "تحديث التطبيق", description: `تم إطلاق تحديث جديد للنظام برقم ${extraData.version || ""}.` },
        message: { icon: PiChatCircleTextBold, title: "رسالة جديدة", description: `أرسل لك ${extraData.senderName || "مستخدم"} رسالة جديدة في الخاص.` },
        follow: { icon: BsFillPersonPlusFill, title: "طلب صداقة", description: `أرسل لك ${extraData.senderName || "مستخدم"} طلب صداقة جديد.` },
        glucose: { icon: GlucoseIcon, title: "تنبيه صحي مهم", description: `مستوى السكر في الدم الحالي هو ${extraData.glucoseLevel || "--"} mg/dL. يرجى الانتباه!` },
    };

    const IconComponent = cardContent[type]?.icon || BsFillPersonCheckFill;

    // Handles destination matching based on notification type
    const handleNavigation = () => {
        switch (type) {
            case "message":
                if (extraData.receiverId) navigate(`/chats/${extraData.receiverId}`);
                break;
            case "system":
                navigate("/settings");
                break;
            case "like":
            case "comment":
                if (extraData.postId) navigate(`/posts/${extraData.postId}`);
                break;
            case "follow":
                if (extraData.userId) navigate(`/profile/${extraData.userId}`);
                break;
            default:
                break; // Reminder & glucose alerts do not navigate
        }
    };

    // Determine if the card type should act as a link
    const isClickable = type !== "reminder" && type !== "glucose";

    return (
        <motion.div
            whileHover={isClickable ? { boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" } : {}}
            whileTap={isClickable ? { scale: 0.98 } : {}}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleNavigation}
            className={`grid grid-cols-5 items-center gap-8 p-8 rounded-xl shadow-lg
                bg-white dark:bg-white/5 border transition-colors duration-300
                ${isClickable ? "cursor-pointer" : "cursor-default"}
                ${is_read ? "border-[#D9D9D9]/30 dark:border-white/10" : "border-[#6976EB] bg-[#6976EB]/5"}
            `}
        >
            <div className="col-span-4 flex justify-start items-start gap-4 min-w-0">
                <div className="w-12 h-12 bg-[#6976EB]/20 rounded-lg flex items-center overflow-hidden justify-center shrink-0">
                    <IconComponent className="w-6 h-6 text-[#6976EB]" />
                </div>
                
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full col-span-3 flex flex-col gap-1 min-w-0">
                        <h3 className="font-bold text-[#161A41] dark:text-white mb-0 text-lg truncate">
                            {cardContent[type]?.title || "إشعار جديد"}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 truncate">
                            {cardContent[type]?.description || "لديك إشعار جديد، تحقق منه الآن!"}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full flex justify-start items-center font-semibold" onClick={(e) => e.stopPropagation()}>
                        {type !== "follow" ? (
                            <div className="w-full grid grid-cols-2 gap-4 justify-center items-center">
                                <button className="flex items-center justify-center px-4 py-2 gap-2 rounded-lg text-[#6976EB] bg-[#6976EB]/10 hover:bg-[#6976EB]/20 transition-colors cursor-pointer" 
                                onClick={markAsRead}>
                                    <TbChecks className="w-5 h-5" />
                                    <span>تحديد كمقروء</span>
                                </button>
                            <button 
                            onClick={onDelete}
                            className="flex items-center justify-center px-4 py-2 gap-2 rounded-lg text-[#FB2C36] bg-[#FB2C36]/10 hover:bg-[#FB2C36]/20 w-auto transition-colors cursor-pointer">
                                <RiDeleteBin6Line className="w-5 h-5" />
                                <span>حذف</span>
                            </button>
                            </div>
                        ) : (
                            <div className="w-full grid grid-cols-2 gap-4 justify-center items-center">
                                <button className="flex items-center justify-center px-4 py-2 gap-2 rounded-lg text-[#6976EB] bg-[#6976EB]/10 hover:bg-[#6976EB]/20 transition-colors cursor-pointer">
                                    <BsFillPersonCheckFill className="w-5 h-5" />
                                    <span>قبول</span>
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 gap-2 rounded-lg text-[#FB2C36] bg-[#FB2C36]/10 hover:bg-[#FB2C36]/20 transition-colors cursor-pointer">
                                    <BsFillPersonXFill className="w-5 h-5" />
                                    <span>رفض</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="col-span-1 w-full h-full flex flex-col justify-start items-center gap-2">
                <p className={`text-sm font-medium ${is_read ? "text-gray-400" : "text-[#6976EB]"}`}>
                    {formatRelativeTime(formattedTime)}
                </p>
            </div>
        </motion.div>
    );
}