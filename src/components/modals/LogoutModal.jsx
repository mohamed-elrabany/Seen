import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";
import { MdOutlineLogout } from "react-icons/md";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notificationActions } from "../../store/slices/notificationSlice";
import { userActions } from "../../store/slices/userSlice";
import toast from "react-hot-toast";

import { logout } from "../../services/authService";

export default function LogoutModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Added navigate for redirection
  const { t } = useTranslation();

  async function handleLogout(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await logout();
      if (result) {
        toast.success("Logged out successfully!");
        dispatch(userActions.clearUser());
        dispatch(notificationActions.toggleEnabled(false));
        onClose();
        localStorage.removeItem("token");
        localStorage.removeItem("seen-app-theme");
        navigate("/login");
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to log out.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Logout"
      icon={MdOutlineLogout}
    >
      <form onSubmit={handleLogout} className="space-y-6">
        {/* Warning Message */}
        <div className="bg-[#FF0404]/5 border-l-4 border-[#FF0404] p-4 rounded-r-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Are you sure you want to log out? You will need to enter your credentials again to access your account.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {/* Cancel Button - Subtle Style */}
          <Button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-4 py-3 sm:py-3.5 font-bold cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            Cancel
          </Button>

          {/* Logout Button - Danger Style */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-all border ${
              isSubmitting
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "text-[#FF0404] border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
