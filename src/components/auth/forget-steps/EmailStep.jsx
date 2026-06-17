import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

import { CgSpinner } from "react-icons/cg";

import { useState } from "react";
// FIX: Imported AnimatePresence here so your inner button text swap doesn't break
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { sendOtp } from "../../../services/authService";

export default function EmailStep({ onSuccess }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Derive email validity dynamically so we don't flash errors prematurely 
  const isEmailValid = emailRegex.test(email);

  async function handleSendOtp() {
    if (!isEmailValid) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await sendOtp(email);
      onSuccess(email);
    } catch (error) {
      toast.error("Error sending OTP");
      console.error("Error sending OTP:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Visual Header Text Polish */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Forgot Password?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Enter your email address and we will send you an OTP verification code.
        </p>
      </div>

      <Input
        name="email"
        label={t("registerPage.step1.inputs.email.label")}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setIsTouched(true)}
        placeholder={t("registerPage.step1.inputs.email.placeholder")}
        /* FIX: Changed data.email and emailError to check the local state */
        error={isTouched && email && !isEmailValid ? "Invalid email format" : false}
      />

      <Button
        disabled={!email || !isEmailValid || isSubmitting}
        type="button" // Changed to type="button" since it uses an explicit onClick handler
        onClick={handleSendOtp}
        className={`w-full mt-8 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
          !email || !isEmailValid || isSubmitting
            ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
            : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer shadow-md shadow-[#6976EB]/20"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2 items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <CgSpinner className="text-white w-5 h-5" />
              </motion.div>
              <span>Sending OTP</span>
            </motion.div>
          ) : (
            <motion.span
              key="static"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Send OTP
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}