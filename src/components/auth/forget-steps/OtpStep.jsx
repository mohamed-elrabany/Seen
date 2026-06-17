import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

import { CgSpinner } from "react-icons/cg";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { verifyOtp } from "../../../services/authService";

export default function OtpStep({ email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("OTP Step rendered with email:", email);

  const isOtpComplete = otp.trim().length === 6;

  async function handleVerifyOtp() {
    if (!isOtpComplete) return;
    console.log("Verifying OTP for email:", email, "with code:", otp);

    setIsSubmitting(true);
    try {
      // Pass otp as a clean string to preserve potential leading zeros (e.g. "012345")
      const response = await verifyOtp(email, otp);
      console.log("OTP verification response:", response);
      
      // If the promise resolves successfully without crashing into the catch block, 
      // the request was accepted (200 OK). We can safely advance.
      onSuccess();
      
    } catch (error) {
      const backendMessage = error.response?.data?.message || "Invalid OTP";
      toast.error(backendMessage);
      console.error("Verification error:", error);
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Verify your Email
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          We sent a 6-digit verification code to{" "}
          <span className="font-semibold text-[#6976EB] break-all">
            {email || "your email"}
          </span>
        </p>
      </div>

      <Input
        label="OTP"
        value={otp}
        maxLength={6}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="XXXXXX"
        className="text-center tracking-widest text-lg font-semibold"
      />

      <Button
        disabled={!isOtpComplete || isSubmitting}
        type="button"
        onClick={handleVerifyOtp}
        className={`w-full mt-8 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
          !isOtpComplete || isSubmitting
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
              <span>Verifying OTP</span>
            </motion.div>
          ) : (
            <motion.span
              key="static"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Verify OTP
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}