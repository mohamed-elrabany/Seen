import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

import { CgSpinner } from "react-icons/cg";

import { useState } from "react";
// FIX: Added missing AnimatePresence import
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../../../services/authService";

export default function ResetPasswordStep({ email, onSuccess }) {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  async function handleResetPassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await resetPassword(email, password);
      console.log("Password reset successful:", response);
      toast.success("Password reset successful");
      onSuccess();
    } catch (error) {
      toast.error("Error resetting password");
      console.error("Error resetting password:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const isValid = password.length >= 8 && password === confirmPassword;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col gap-4"
    >
      {/* Typography Styling Polish */}
      <div className="mb-2">
        <h2>
          Reset Password
        </h2>
        <p className="meta-text">
          Choose a new secure password for your account.
        </p>
      </div>

      {/* Password Input */}
      <Input
        name="password"
        label={t("registerPage.step1.inputs.password.label")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur("password")}
        placeholder={t("registerPage.step1.inputs.password.placeholder")}
        error={
          touched.password && password && password.length < 8
            ? "Minimum 8 characters"
            : false
        }
      />

      {/* Confirm Password Input */}
      <Input
        name="confirmPassword"
        label={t("registerPage.step1.inputs.confirmPassword.label")}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => handleBlur("confirmPassword")}
        placeholder={t("registerPage.step1.inputs.confirmPassword.placeholder")}
        error={
          touched.confirmPassword &&
          confirmPassword &&
          confirmPassword !== password
            ? "Passwords mismatch"
            : false
        }
      />

      {/* Animated Action Button */}
      <Button
        disabled={isSubmitting || !isValid}
        type="button"
        onClick={handleResetPassword}
        className={`w-full mt-6 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
          isSubmitting || !isValid
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
              <span>Resetting Password...</span>
            </motion.div>
          ) : (
            <motion.span
              key="static"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Reset Password
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}