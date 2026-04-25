import { GiCheckMark } from "react-icons/gi";
import i18next from "i18next";

export default function StepProgressBar({ currentStep }) {
  const steps = [1, 2, 3, 4];
  const isEn = i18next.language === 'en';

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6">
      <div className="flex-between relative">

        {/* Progress Line Background (Inactive) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-white/10 -translate-y-1/2"></div>

        {/* Progress Line (Active) */}
        <div
          className={`absolute top-1/2 h-1 bg-[#6976EB] -translate-y-1/2 transition-all duration-300
            ${isEn ? "left-0" : "right-0"}`}
          style={{ 
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            // Ensures the line grows from the correct side in RTL
            transformOrigin: isEn ? "left" : "right" 
          }}
        ></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative z-10 flex-center w-10 h-10 rounded-full text-white font-bold transition-colors duration-300
            ${
              index <= currentStep
                ? "bg-[#6976EB]"
                /* Here is the change for dark mode */
                : "bg-gray-300 dark:bg-[#1F1A5F] dark:text-gray-500 border-2 border-transparent dark:border-white/10"
            }`}
          >
            {index < currentStep ? <GiCheckMark className="text-white" /> : step}
          </div>
        ))}
      </div>
    </div>
  );
}