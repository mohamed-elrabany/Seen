import { useState, useRef } from "react";
import { Form, useNavigation, redirect } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// Assets & Icons
import emptyImg from "../../assets/empty-add-reminder.svg";
import GlucoseIcon from "../../components/ui/GlucoseIcon";
import { BiSolidInjection } from "react-icons/bi";
import { BsForkKnife } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { RiAddLargeLine } from "react-icons/ri";
import { MdNotificationAdd } from "react-icons/md";

// Components
import RadioButton from "../../components/ui/RadioButton";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ReminderHeader from "../../components/reminders/Header";
import AddMedicineModal from "../../components/modals/AddMedicineModal";
import IconHeader from "../../components/ui/IconHeader";

// Services
import { addReminder } from "../../services/reminderServices";

const medicationNames = [
  "Insulin Glargine (Lantus)",
  "Metformin",
  "Semaglutide (Ozempic)",
  "Empagliflozin (Jardiance)",
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 260, damping: 20 } 
  },
};

export default function AddReminder() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [reminderType, setReminderType] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [medication, setMedication] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const handleReminderTypeChange = (e) => {
    setReminderType(e.target.value);
  };

  const isFormInvalid =
    !reminderType ||
    !title ||
    !time ||
    (reminderType === "medication" && !medication);

  return (
    <div className="space-y-8">
      <IconHeader icon={MdNotificationAdd} title="Add Reminder" />
      <Form method="post" className="space-y-8 max-w-5xl mx-auto">
        {/* Radio Group with Micro-interactions */}
        <div className="grid grid-cols-3 gap-4 items-center justify-center">
          <RadioButton
            name="reminderType"
            value="glucose"
            isChecked={reminderType === "glucose"}
            onChange={handleReminderTypeChange}
          >
            <motion.div animate={{ scale: reminderType === "glucose" ? 1.1 : 1 }}>
              <GlucoseIcon className="w-8 h-8" />
            </motion.div>
            <p className="text-xs md:text-base">Glucose Check</p>
          </RadioButton>
          
          <RadioButton
            name="reminderType"
            value="medication"
            isChecked={reminderType === "medication"}
            onChange={handleReminderTypeChange}
          >
            <motion.div animate={{ scale: reminderType === "medication" ? 1.1 : 1 }}>
              <BiSolidInjection className="w-8 h-8" />
            </motion.div>
            <p className="text-xs md:text-base">Medication</p>
          </RadioButton>
          
          <RadioButton
            name="reminderType"
            value="meal"
            isChecked={reminderType === "meal"}
            onChange={handleReminderTypeChange}
          >
            <motion.div animate={{ scale: reminderType === "meal" ? 1.1 : 1 }}>
              <BsForkKnife className="w-8 h-8" />
            </motion.div>
            <p className="text-xs md:text-base">Meal</p>
          </RadioButton>
        </div>

        <AnimatePresence mode="wait">
          {reminderType === "" && (
            <motion.div
              key="empty"
              className="space-y-4 w-full h-full flex flex-col items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <img src={emptyImg} alt="No reminders available" />
              <div className="text-center">
                <h4>Select a reminder type</h4>
                <p className="meta-text">
                  Please select a reminder type to get started.
                </p>
              </div>
            </motion.div>
          )}

          {/* Combined Form Logic with Staggered Children */}
          {reminderType && (
            <motion.div
              key={reminderType}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-7xl space-y-4"
            >
              <motion.div variants={itemVariants}>
                <Input
                  name="title"
                  type="text"
                  label="Title"
                  placeholder="Reminder title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Input
                  label="Time"
                  name="time"
                  placeholder="Select time"
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={(e) => setTime(e.target.value)}
                />
              </motion.div>

              {reminderType === "medication" && (
                <motion.div variants={itemVariants} className="grid grid-cols-5 gap-4 items-end justify-center">
                  <div className="flex flex-col gap-2 w-full col-span-4">
                    <label
                      htmlFor="medication"
                      className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
                    >
                      Medication
                    </label>
                    <select
                      name="medication"
                      id="medication"
                      onChange={(e) => setMedication(e.target.value)}
                      className="w-full text-base text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 border-2 border-[#D9D9D9]/30 focus:border-[#6976EB] outline-none transition-all bg-transparent cursor-pointer appearance-none"
                    >
                      <option value="" disabled selected className="text-[#808080]">
                        Select medication...
                      </option>
                      {medicationNames.map((name) => (
                        <option
                          key={name}
                          value={name}
                          className="bg-white dark:bg-[#1a1e4d] text-[#161A41] dark:text-white"
                        >
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Desktop Button */}
                  <motion.button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 sm:py-3.5 font-bold cursor-pointer col-span-1 w-full bg-[#6976EB] text-white rounded-lg hidden md:flex items-center justify-center shadow-md"
                  >
                    Add Medication
                  </motion.button>
                  
                  {/* Mobile Button */}
                  <motion.button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-3.5 font-bold cursor-pointer col-span-1 w-full bg-[#6976EB] text-white rounded-lg flex md:hidden items-center justify-center shadow-md"
                  >
                    <RiAddLargeLine className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button with Smooth Content Switch */}
        <Button
          disabled={isFormInvalid || isSubmitting}
          type="submit"
          className={`w-full mt-8 px-6 py-4 transition-all flex items-center justify-center gap-2 ${
            isFormInvalid || isSubmitting
              ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
              : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4 items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <CgSpinner className="text-white w-8 h-8" />
                </motion.div>
                <p>Adding Reminder</p>
              </motion.div>
            ) : (
              <motion.p
                key="static"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Add Reminder
              </motion.p>
            )}
          </AnimatePresence>
        </Button>
      </Form>

      <AddMedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formRef={modalRef}
      />
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    title: formData.get("title"),
    time: formData.get("time"),
    reminderType: formData.get("reminderType"),
    medication: formData.get("medication") || null,
  };

  try {
    await addReminder(data);
    toast.success("Reminder added successfully!");
    return redirect("/home");
  } catch (error) {
    toast.error("Failed to add reminder. Please try again.");
    console.error("Error adding reminder:", error);
    return { error: true };
  }
}