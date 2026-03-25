import { GiCheckMark } from "react-icons/gi";
import i18next from "i18next";

export default function StepProgressBar({ currentStep }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6">
      <div className="flex-between relative">

        {/* progress line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -translate-y-1/2"></div>

        <div
          className={`absolute top-1/2 left-0 h-1 bg-[#6976EB] -translate-y-1/2 transition-all duration-300
                    ${i18next.language === 'en' ? "left-0" : "right-0"}`}
          style={{ width: `${(currentStep / 3) * 100}%` }}
        ></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative z-10 flex-center w-10 h-10 rounded-full text-white font-bold
            ${
              index <= currentStep
                ? "bg-[#6976EB]"
                : "bg-gray-300"
            }`}
          >
            {index < currentStep ? <GiCheckMark /> : step}
          </div>
        ))}
      </div>
    </div>
  );
}