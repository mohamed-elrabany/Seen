import Button from "../../components/ui/Button";
import Step1 from "./register-steps/Step1";
import Step2 from "./register-steps/Step2";
import Step3 from "./register-steps/Step3";
import Step4 from "./register-steps/Step4";
import StepProgressBar from "../../components/ui/StepProgressBar";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { register } from "../../services/authService";
import { redirect, Form, useActionData } from "react-router-dom";

export default function Register() {
  const { t } = useTranslation();
  const [isStepValid, setIsStepValid] = useState(false);
  const actionData = useActionData();

  const isSubmitted = useRef(false);

  // ENHANCEMENT: Initial State Logic
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("registerData");
    const parsed = saved ? JSON.parse(saved) : null;

    return (
      parsed || {
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
      }
    );
  });

  // ENHANCEMENT: Smart Step Initializer
  // If password is missing (due to refresh), force user to Step 0 (Step 1)
  const [currentStep, setCurrentStep] = useState(() => {
    const step = sessionStorage.getItem("registerStep");
    const parsedStep = step ? JSON.parse(step) : 0;

    // Logic: If we have saved data but NO password, reset to start
    if (parsedStep > 0 && !formData.password) {
      return 0;
    }
    return parsedStep;
  });

  // ENHANCEMENT: Modified Sync Effect
  // We exclude password and confirmPassword from sessionStorage for security
  useEffect(() => {
    const timer = setTimeout(() => {
      const { password, confirmPassword, ...safeData } = formData;
      sessionStorage.setItem("registerData", JSON.stringify(safeData));
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem("registerStep", JSON.stringify(currentStep));
  }, [currentStep]);

  // ENHANCEMENT: Auto-Cleanup on Navigation
  useEffect(() => {
    return () => {
      if (!isSubmitted.current) {
        sessionStorage.removeItem("registerData");
        sessionStorage.removeItem("registerStep");
      }
    };
  }, []);

  function handleCurrentStep(e) {
    const actionName = e.currentTarget.name;
    if (actionName === "prev" && currentStep > 0) {
      setCurrentStep((step) => step - 1);
    } else if (actionName === "next" && currentStep < 3) {
      setCurrentStep((step) => step + 1);
      setIsStepValid(false);
    }
  }

  const steps = [Step1, Step2, Step3, Step4];
  const CurrentStep = steps[currentStep];

  return (
    <Form
      className=""
      method="post"
      onSubmit={() => (isSubmitted.current = true)}
    >
      <StepProgressBar currentStep={currentStep} />

      {/* Hidden Input Bridge for React Router Action */}
      {Object.keys(formData).map((key) => (
        <input key={key} type="hidden" name={key} value={formData[key]} />
      ))}

      <div className="max-w-3xl mx-auto px-6 py-12 mt-5">
        {/* Backend Error Message Display */}
        {actionData?.error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-center rounded">
            {actionData.error}
          </div>
        )}

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
                  type="button"
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
                  type="button"
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

export async function action({ request }) {
  const rawFormData = await request.formData();
  const userData = Object.fromEntries(rawFormData);

  try {
    await register(userData);

    sessionStorage.removeItem("registerData");
    sessionStorage.removeItem("registerStep");

    return redirect("/home");
  } catch (err) {
    return {
      error:
        err.response?.data?.message ||
        "Please check that all steps are filled correctly.",
    };
  }
}
