import Button from "../../components/ui/Button";
import Step1 from "./register-steps/Step1";
import Step2 from "./register-steps/Step2";
import Step3 from "./register-steps/Step3";
import Step4 from "./register-steps/Step4";
import StepProgressBar from "../../components/ui/StepProgressBar";

import { store } from "../../store/store";
import { userActions } from "../../store/slices/userSlice";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { register } from "../../services/authService";
import { redirect, Form, useActionData, useNavigation } from "react-router-dom";

export default function Register() {
  const { t } = useTranslation();
  const [isStepValid, setIsStepValid] = useState(false);
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitted = useRef(false);
  const isSubmitting = navigation.state === "submitting";

  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("registerData");
    const parsed = saved ? JSON.parse(saved) : null;

    return (
      parsed || {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
        birthDate: "",
        weight: "",
        height: "",
        diabetes_type: "",
        insulin_therapy: "",
      }
    );
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const step = sessionStorage.getItem("registerStep");
    const parsedStep = step ? JSON.parse(step) : 0;

    if (parsedStep > 0 && !formData.password) {
      return 0;
    }
    return parsedStep;
  });

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
      method="post"
      className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F] overflow-hidden"
      onSubmit={() => (isSubmitted.current = true)}
    >
      <StepProgressBar currentStep={currentStep} />

      {Object.keys(formData).map((key) => (
        <input key={key} type="hidden" name={key} value={formData[key] || ""} />
      ))}

      <div className="max-w-3xl mx-auto px-6 py-12 mt-5">
        {actionData?.error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-center rounded">
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
            className="rounded-xl shadow-xl p-8 lg:p-12
            bg-white border border-[#D9D9D9]/30
            dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10"
          >
            <CurrentStep
              data={formData}
              setData={setFormData}
              isStepValid={setIsStepValid}
            />

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
              {currentStep !== 0 && (
                <Button
                  disabled={isSubmitting}
                  type="button"
                  name="prev"
                  onClick={(e) => handleCurrentStep(e)}
                  className="bg-transparent border-2 border-[#6976EB] text-[#6976EB] hover:bg-[#6976EB]/10 w-full px-6 py-3 transition-all flex-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoIosArrowBack
                    className={`${i18next.language === "ar" && "rotate-180"}`}
                  />
                  <p>{t("registerPage.buttons.prev")}</p>
                </Button>
              )}

              {currentStep !== 3 ? (
                <Button
                  type="button"
                  name="next"
                  disabled={!isStepValid || isSubmitting}
                  onClick={(e) => handleCurrentStep(e)}
                  className={`w-full px-6 py-3 transition-all flex-center gap-2 ${
                    !isStepValid
                      ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
                      : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
                  }`}
                >
                  <p>{t("registerPage.buttons.next")}</p>
                  <IoIosArrowForward
                    className={`${i18next.language === "ar" && "rotate-180"}`}
                  />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid || isSubmitting}
                  className={`w-full px-6 py-3 transition-all flex-center gap-2 ${
                    !isStepValid || isSubmitting
                      ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
                      : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
                  }`}
                >
                  <p>
                    {isSubmitting
                      ? `${t("registerPage.buttons.submit")}...`
                      : t("registerPage.buttons.submit")}
                  </p>
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

  delete userData.confirmPassword;
  if (userData.weight) userData.weight = Number(userData.weight);
  if (userData.height) userData.height = Number(userData.height);

  try {
    const user = await register(userData);
    store.dispatch(userActions.setUser(user));
    sessionStorage.removeItem("registerData");
    sessionStorage.removeItem("registerStep");
    return redirect("/home");
  } catch (err) {
    return {
      error: err.response?.data?.message || "Registration failed.",
    };
  }
}