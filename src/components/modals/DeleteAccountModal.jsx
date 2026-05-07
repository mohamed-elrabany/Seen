import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

// UI Components
import BaseModal from "../ui/BaseModal";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Actions & Services
import { userActions } from "../../store/slices/userSlice";
import { notificationActions } from "../../store/slices/notificationSlice";
import { deleteAccount } from "../../services/authService";

export default function DeleteAccountModal({ isOpen, onClose, deleteRef }) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Reset input state when the modal closes (via backdrop, ESC, or Cancel)
  useEffect(() => {
    if (!isOpen) {
      setPassword("");
    }
  }, [isOpen]);

  // Combined function to clear state and trigger parent close
  const handleClose = () => {
    setPassword("");
    onClose();
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      return toast.error("Please enter your password to confirm.");
    }

    setIsSubmitting(true);
    try {
      const result = await deleteAccount({ password });

      if (result) {
        toast.success("Account deleted successfully.");
        
        // 1. Wipe all sensitive Redux state
        dispatch(userActions.clearUser());
        dispatch(notificationActions.clearAll());
        
        // 2. Finalize UI
        handleClose();
        navigate("/");
      } else {
        toast.error("Incorrect password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during account deletion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Account"
      icon={BsTrash}
    >
      <form ref={deleteRef} onSubmit={handleDeleteAccount} className="space-y-6">
        {/* Warning Information Box */}
        <div className="bg-[#FF0404]/5 border-l-4 border-[#FF0404] p-4 rounded-r-lg">
          <h4 className="text-[#FF0404] font-bold mb-1">Warning: Irreversible Action</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            This will permanently delete your account and all associated data. 
            This action cannot be undone. Please enter your password to confirm.
          </p>
        </div>

        {/* Input field */}
        <Input
          type="password"
          name="password"
          label="Confirm Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
        />

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {/* Cancel Action */}
          <Button
            type="button"
            onClick={handleClose}
            className="order-2 sm:order-1 flex-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-4 py-3 sm:py-3.5 font-bold cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            Cancel
          </Button>

          {/* Delete Action (Danger Style) */}
          <Button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className={`order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-all border ${
              isSubmitting || !password.trim()
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "text-[#FF0404] border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Deleting..." : "Delete Permanently"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}