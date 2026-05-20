import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";
import { RiDeleteBin6Line } from "react-icons/ri";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteLog } from "../../services/logServices";

export default function DeleteLogModal({
  logId,
  isOpen,
  onClose,
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleDeleteLog(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const result= await deleteLog(logId);
                toast.success("Log deleted successfully!");
                onClose();
                navigate("/home");
        }catch(error){
            console.error("Network error:", error);
            toast.error("Network error. Please check your connection and try again.");
        }finally{
            setIsSubmitting(false);
        }
    }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      icon={RiDeleteBin6Line}
      title={t("modals.delete-log.title")}
    >
      <form onSubmit={handleDeleteLog} className="space-y-6">
        {/* Warning Message */}
        <div className="bg-[#FF0404]/5 border-l-4 border-[#FF0404] p-4 rounded-r-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("modals.delete-log.description")}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {/* Cancel Button - Subtle Style */}
          <Button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-4 py-3 sm:py-3.5 font-bold cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            {t("modals.delete-log.cancel")}
          </Button>

          {/* Delete Button - Danger Style */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-all border ${
              isSubmitting
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "text-[#FF0404] border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 cursor-pointer"
            }`}
          >
            {isSubmitting ? t("modals.delete-log.submitting") : t("modals.delete-log.delete")}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
