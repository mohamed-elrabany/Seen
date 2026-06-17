import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import EmailStep from "../../components/auth/forget-steps/EmailStep";
import OtpStep from "../../components/auth/forget-steps/OtpStep";
import ResetPasswordStep from "../../components/auth/forget-steps/ResetPasswordStep";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    /* Full-screen backdrop that pins everything dead-center */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
                    bg-slate-900/40 backdrop-blur-sm 
                    dark:bg-slate-950/60"
    >
      {/* Your Modal Box */}
      <div
        className="w-full max-w-md rounded-xl shadow-2xl p-8 lg:p-12
                      bg-white bg-none border border-[#D9D9D9]/30
                      dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] dark:border-white/10
                      overflow-hidden min-h-[380px] flex flex-col justify-center"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <EmailStep
              key="email-step"
              onSuccess={(verifiedEmail) => {
                setEmail(verifiedEmail);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <OtpStep
              key="otp-step"
              email={email}
              onSuccess={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <ResetPasswordStep
              key="reset-step"
              email={email}
              onSuccess={() => navigate("/login")}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
