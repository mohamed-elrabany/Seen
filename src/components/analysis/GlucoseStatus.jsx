import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { PiPulseBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function GlucoseStatus({ reportStatistics }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // Array defined inside to smoothly fallback to defaults if analysisData is missing
    const highLowCards = [
        {
            title: t("analysis.highest"),
            logId: reportStatistics?.highestLog.logId || null,
            value: reportStatistics?.highestLog.glucoseValue || "320",
            icon: FaArrowTrendUp,
        },
        {
            title: t("analysis.lowest"),
            logId: reportStatistics?.lowestLog.logId || null,
            value: reportStatistics?.lowestLog.glucoseValue || "80",
            icon: FaArrowTrendDown,
        },
        {
            title: t("analysis.avg"),
            value: reportStatistics?.averageGlucose || "128",
            icon: PiPulseBold,
        },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 justify-center items-center gap-4">
                {highLowCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.title}
                        onClick={() => { card.logId && navigate(`/logs/${card.logId}`) }}
                        className={`p-4 space-y-4 rounded-2xl shadow-lg border
                        bg-white bg-none dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] border-[#D9D9D9]/30 dark:border-white/10
                        ${index === 2 ? "col-span-2" : "col-span-1"}
                        ${card.logId ? "cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1" : "cursor-default"}
                        `}>
                            <div className="flex items-center justify-start gap-4">
                                <div className="p-2 bg-[#6976EB]/20 rounded-lg">
                                    <Icon className="w-6 h-6 text-[#6976EB]" />
                                </div>
                                <h3 className="text-[#161A41] mb-0 dark:text-white">{card.title}</h3>
                            </div>
                            <p className="text-2xl font-bold text-[#161A41] dark:text-white">{card.value}</p>
                            <p className="text-base font-bold text-[#6976EB]">mg/dl</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}