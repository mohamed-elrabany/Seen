import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { redirect } from "react-router-dom";
import { GoLock } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";

import BaseModal from "../ui/BaseModal";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Imported API functions
import {
  verifyPassword,
  updatePassword,
  logout,
} from "../../services/authService";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  // State management
  const [step, setStep] = useState(1); // 1: Verify Password, 2: Change Password
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Reset all data state on modal close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTouched({});
    }
  }, [isOpen]);

  // Field tracking handler
  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  // --- VALIDATION LOGIC ---
  const isStep1Valid = password.length >= 8;

  const isNewPasswordLongEnough = newPassword.length >= 8;
  const isNewPasswordDifferent = newPassword !== password;
  const doNewPasswordsMatch = newPassword === confirmNewPassword;

  const isStep2Valid =
    isNewPasswordLongEnough && isNewPasswordDifferent && doNewPasswordsMatch;

  // --- ACTIONS ---
  async function handleVerifyPassword() {
    setIsSubmitting(true);
    try {
      const response = await verifyPassword(password);
      console.log("Password verification response:", response);

      // FIX: Check if the response indicates a failure or is missing success flags
      // Adjust this condition based on your exact API response structure (e.g., !response.success or response.error)
      if (!response || response.status === "error" || response.error) {
        toast.error(response?.message || "Invalid current password");
        return;
      }

      // Only move to step 2 if the API verified it successfully
      setStep(2);
      setTouched({});
    } catch (error) {
      // This catches network failures or thrown rejections
      toast.error(error?.response?.data?.message || "Verification failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdatePassword() {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    let updateSuccess = false;

    try {
      // 1. First, make sure the password updates successfully
      await updatePassword(newPassword, confirmNewPassword);
      updateSuccess = true;
      toast.success("Password changed successfully!");

      // 2. Attempt to call backend logout to invalidate backend sessions
      await logout();
    } catch (error) {
      console.error("Error during password update/logout sequence:", error);

      if (!updateSuccess) {
        toast.error(
          error?.response?.data?.message || "Failed to change password",
        );
        setIsSubmitting(false);
        return;
      }
    }

    // 3. Runs ONLY if the password update succeeded.
    try {
      onClose();
      localStorage.removeItem("token");

      // ✅ Force a hard redirect. This bypasses React entirely and always works.
      window.location.replace("/login");
    } catch (navError) {
      window.location.href = "/login";
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      icon={GoLock}
      title="Change Password"
    >
      <AnimatePresence mode="wait">
        {/* STEP 1: VERIFY PASSWORD */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Input
              name="password"
              label={"Current Password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder={"********"}
              error={
                touched.password && password.length < 8
                  ? "Minimum 8 characters"
                  : false
              }
            />

            <Button
              disabled={!password || !isStep1Valid || isSubmitting}
              type="button"
              onClick={handleVerifyPassword} // FIX: Updated reference
              className={`w-full mt-8 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                !password || !isStep1Valid || isSubmitting
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
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="flex items-center justify-center"
                    >
                      <CgSpinner className="text-white w-5 h-5" />
                    </motion.div>
                    <span>Verifying Password</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="static"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Verify Password
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        )}

        {/* STEP 2: CHANGE PASSWORD */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-4"
          >
            <Input
              name="newPassword"
              label={"New Password"}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() => handleBlur("newPassword")}
              placeholder={"********"}
              error={
                touched.newPassword && newPassword.length < 8
                  ? "Minimum 8 characters"
                  : touched.newPassword && newPassword === password
                    ? "Must be different from your old password"
                    : false
              }
            />

            <Input
              name="confirmPassword"
              label={"Confirm Password"}
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              placeholder={"********"}
              error={
                touched.confirmPassword && confirmNewPassword !== newPassword
                  ? "Passwords mismatch"
                  : false
              }
            />

            <Button
              disabled={!newPassword || !isStep2Valid || isSubmitting}
              type="button"
              onClick={handleUpdatePassword} // FIX: Updated reference
              className={`w-full mt-4 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                !newPassword || !isStep2Valid || isSubmitting
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
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="flex items-center justify-center"
                    >
                      <CgSpinner className="text-white w-5 h-5" />
                    </motion.div>
                    <span>Changing Password</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="static"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Change Password
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}
