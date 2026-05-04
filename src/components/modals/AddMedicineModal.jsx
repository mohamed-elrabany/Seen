import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast"; 


import { MdMedication } from "react-icons/md";

// UI Components
import BaseModal from "../ui/BaseModal";
import Input from "../ui/Input";
import Button from "../ui/Button";



// Services
import { addMedicine } from "../../services/reminderServices";

export default function AddMedicineModal({ isOpen, onClose, formRef }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [medicationName, setMedicationName] = useState("");

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Extract data from the form
    const formData = new FormData(e.currentTarget);
    const medicineName = formData.get("medicineName");

    // Simple validation
    if (!medicineName?.trim()) {
      return toast.error("Please enter a medicine name");
    }

    setIsSubmitting(true);

    try {
      await addMedicine({ medicineName });
      toast.success("Medicine added successfully");
      
      // Reset the form using the ref passed from the parent
      formRef.current?.reset();
      
      // Close the modal
      onClose();
    } catch (error) {
      toast.error("Failed to add medicine");
      console.error("Error adding medicine:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Medicine"
      icon={MdMedication}
    >
      <form 
        ref={formRef} 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Input
          name="medicineName"
          id="medicineName"
          label="Medicine Name"
          placeholder="Enter medicine name"
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
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !medicationName.trim()}
            className={`cursor-pointer order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-colors ${
              isSubmitting || !medicationName.trim()
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-[#6976EB] text-white hover:bg-[#2B3695] shadow-lg shadow-[#6976EB]/20"
            }`}
          >
            {isSubmitting ? "Adding..." : "Add Medicine"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}