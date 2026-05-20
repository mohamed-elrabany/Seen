import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast"; 


import { MdMedication } from "react-icons/md";

// UI Components
import BaseModal from "../ui/BaseModal";
import Input from "../ui/Input";
import Button from "../ui/Button";



// Services
import { addMedications } from "../../services/medicationServices";

export default function AddMedicineModal({ isOpen, onClose, formRef, setRefreshMedications }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [medicationName, setMedicationName] = useState("");

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const medicineName = formData.get("medication_name");
    console.log("Form submitted with medication name:", medicineName);

    setIsSubmitting(true);

     try {
      // Simulate API call delay
      const result = await addMedications(medicationName);
      console.log("API response:", result);
        toast.success(t("modals.medicine.alert.success"));
        onClose();
        setRefreshMedications((prev) => prev + 1);
    } catch (error) {
      toast.error(t("modals.medicine.alert.error"));
    } finally {
      setIsSubmitting(false);
    }
    }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("modals.medicine.title")}
      icon={MdMedication}
    >
      <form 
        ref={formRef} 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Input
          name="medication_name"
          id="medication_name"
          label={t("modals.medicine.input-title")}
          placeholder={t("modals.medicine.input-placeholder")}
          onChange={(e) => setMedicationName(e.target.value)}
          required
          autoFocus
        />

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-4 py-3 sm:py-3.5 font-bold cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            {t("modals.medicine.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !medicationName.trim()}
            className={`order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-colors ${
              isSubmitting || !medicationName.trim()
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-[#6976EB] text-white hover:bg-[#2B3695] shadow-lg shadow-[#6976EB]/20 cursor-pointer"
            }`}
          >
            {isSubmitting ? t("modals.medicine.submit") : t("modals.medicine.add")}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}