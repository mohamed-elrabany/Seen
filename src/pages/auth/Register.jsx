import Button from "../../components/ui/Button";
import Step1 from "./register-steps/Step1";
import Step2 from "./register-steps/Step2";
import Step3 from "./register-steps/Step3";
import Step4 from "./register-steps/Step4";
import StepProgressBar from "../../components/ui/StepProgressBar";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { register } from "../../services/authService";
import { redirect, Form } from "react-router-dom";

export default function Register() {
  const { t } = useTranslation();
  const [isStepValid, setIsStepValid] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("registerData");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          gender: "",
          birthDate: "",
          weight: "",
          height: "",
          diabetesType: "",
          insulin: "",
        };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("registerData", JSON.stringify(formData));
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  const [currentStep, setCurrentStep] = useState(() => {
    const step = localStorage.getItem("registerStep");
    return step ? JSON.parse(step) : 0;
  });

  useEffect(() => {
    localStorage.setItem("registerStep", JSON.stringify(currentStep));
  }, [currentStep]);

  function handleCurrentStep(e) {
    const action = e.currentTarget.name;
    if (action === "prev" && currentStep > 0) {
      setCurrentStep((step) => step - 1);
    } else if (action === "next" && currentStep < 3) {
      setCurrentStep((step) => step + 1);
      setIsStepValid(false);
    }
  }

  const steps = [Step1, Step2, Step3, Step4];
  const CurrentStep = steps[currentStep];

  return (
    <Form className="">
      <StepProgressBar currentStep={currentStep} />

      <div className="max-w-3xl mx-auto px-6 py-12 mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl p-8 lg:p-12"
          >
            <CurrentStep
              data={formData}
              setData={setFormData}
              isStepValid={setIsStepValid}
            />

            <div className="flex-center gap-4 mt-10">
              {currentStep !== 0 && (
                <Button
                  name="prev"
                  onClick={(e) => handleCurrentStep(e)}
                  className="bg-transparent border-2 border-[#6976EB] hover:bg-[#F8F9FF] w-full px-6 py-3 transition-all flex-center gap-2 cursor-pointer text-[#6976EB]"
                >
                  <IoIosArrowBack
                    className={`${i18next.language === "ar" && "rotate-180"}`}
                  />
                  <p>{t("registerPage.buttons.prev")}</p>
                </Button>
              )}
              {currentStep !== 3 && (
                <Button
                  name="next"
                  disabled={!isStepValid}
                  onClick={(e) => handleCurrentStep(e)}
                  className={`${isStepValid ? "bg-[#6976EB] hover:bg-[#2B3695] cursor-pointer" : "bg-gray-300 cursor-not-allowed"} w-full px-6 py-3 transition-all flex-center gap-2 text-white`}
                >
                  <p>{t("registerPage.buttons.next")}</p>
                  <IoIosArrowForward
                    className={`${i18next.language === "ar" && "rotate-180"}`}
                  />
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  type="submit"
                  disabled={!isStepValid}
                  className={`${isStepValid ? "bg-[#6976EB] hover:bg-[#2B3695] cursor-pointer" : "bg-gray-300 cursor-not-allowed"} w-full px-6 py-3 transition-all flex-center gap-2 text-white`}
                >
                  <p>{t("registerPage.buttons.submit")}</p>
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Form>
  );
}

export async function action() {
  const storedData = localStorage.getItem("registerData");
  const userData = storedData ? JSON.parse(storedData) : null;
  if (!userData) {
    // If no data found, return an error
    return { error: "بيانات التسجيل غير موجودة" };
  }

  try {
    await register(userData);

    localStorage.removeItem("registerData");
    localStorage.removeItem("registerStep");
    console.log('registered');

    return redirect("/login");
  } catch (err) {
    console.error(err);

    return {
      error: err.response?.data?.message || "حدث خطأ أثناء إنشاء الحساب",
    };
  }
}
