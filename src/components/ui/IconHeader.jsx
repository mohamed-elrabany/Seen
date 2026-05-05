import { useTranslation } from "react-i18next";

export default function IconHeader({icon, title}){
    const { t, i18n } = useTranslation();
    const Icon= icon;
    return(
        <div className="relative overflow-hidden px-4 md:px-12 py-12 rounded-2xl bg-gradient-to-b from-[#6976EB] via-[#4448A5] to-[#1F1A5F] dark:from-[#2B3695] dark:via-[#1F1A5F] dark:to-[#161A41]">
              <Icon 
                className={`absolute top-8 ${i18n.dir() === 'rtl' ? 'left-4 md:left-8 lg:left-12' : 'right-12 md:right-8 lg:right-12'} w-32 h-32 text-[#161A41]/20 dark:text-[#6976EB]/20 -mr-6 -mt-6 pointer-events-none`}
              />
              <div className="relative z-10 flex justify-start items-center gap-4">
                <div className="bg-[#161A41]/40 p-2 rounded-full text-white flex items-center justify-center">
                  <Icon className="w-7 h-7" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-0">
                  {title}
                </h1>
              </div>
            </div>
    );
}