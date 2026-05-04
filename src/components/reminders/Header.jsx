import { MdNotificationAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function ReminderHeader(){
    const { t, i18n } = useTranslation();
    return(
        <div className="relative overflow-hidden px-4 py-12 rounded-2xl bg-gradient-to-b from-[#6976EB] via-[#4448A5] to-[#1F1A5F] dark:from-[#2B3695] dark:via-[#1F1A5F] dark:to-[#161A41]">
              {/* Background Decorative Icon */}
              {/* Changed -top-1/2 to top-0 and adjusted right to compensate for padding */}
              <MdNotificationAdd 
                className={`absolute top-8 ${i18n.dir() === 'rtl' ? 'left-4 md:left-8 lg:left-12' : 'right-12 md:right-8 lg:right-12'} w-32 h-32 text-[#161A41]/20 dark:text-[#6976EB]/20 -mr-6 -mt-6 pointer-events-none`}
              />
        
              <div className="relative z-10 flex justify-start items-center gap-4">
                <div className="bg-[#161A41]/40 p-2 rounded-full text-white flex items-center justify-center">
                  <MdNotificationAdd className="w-8 h-8" />
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Add Reminder
                </p>
              </div>
            </div>
    );
}