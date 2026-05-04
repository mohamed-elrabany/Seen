import { useState, useRef } from "react";
import { Form, useNavigation, redirect } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// Assets & Icons
import emptyImg from "../../assets/empty-add-reminder.svg";
import { BiSolidInjection } from "react-icons/bi";
import { BsForkKnife } from "react-icons/bs";
import { TbPillFilled } from "react-icons/tb";
import { CgSpinner } from "react-icons/cg";

// Components
import RadioButton from "../../components/ui/RadioButton";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ReminderHeader from "../../components/reminders/Header";
import AddMedicineModal from "../../components/modals/AddMedicineModal";

// Services
import { addReminder } from "../../services/reminderServices";

const medicationNames = [
  "Insulin Glargine (Lantus)",
  "Metformin",
  "Semaglutide (Ozempic)",
  "Empagliflozin (Jardiance)",
];

export default function AddReminder() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Form State for validation
  const [reminderType, setReminderType] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [medication, setMedication] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const handleReminderTypeChange = (e) => {
    setReminderType(e.target.value);
  };

  // Button disabled logic
  const isFormInvalid =
    !reminderType ||
    !title ||
    !time ||
    (reminderType === "medication" && !medication);

  return (
    <div className="space-y-8">
      <ReminderHeader />

      {/* Added max-w-7xl and mx-auto here to center the form */}
      <Form method="post" className="space-y-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-4 items-center justify-center">
          <RadioButton
            name="reminderType"
            value="glucose"
            isChecked={reminderType === "glucose"}
            onChange={handleReminderTypeChange}
          >
            <BiSolidInjection className="w-8 h-8" />
            <p className="text-sm md:text-base">Glucose Check</p>
          </RadioButton>
          <RadioButton
            name="reminderType"
            value="medication"
            isChecked={reminderType === "medication"}
            onChange={handleReminderTypeChange}
          >
            <TbPillFilled className="w-8 h-8" />
            <p className="text-sm md:text-base">Medication</p>
          </RadioButton>
          <RadioButton
            name="reminderType"
            value="meal"
            isChecked={reminderType === "meal"}
            onChange={handleReminderTypeChange}
          >
            <BsForkKnife className="w-8 h-8" />
            <p className="text-sm md:text-base">Meal</p>
          </RadioButton>
        </div>

        <AnimatePresence mode="wait">
          {reminderType === "" && (
            <motion.div
              key="empty"
              className="space-y-4 w-full h-full flex flex-col items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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

          {reminderType === "glucose" && (
            <motion.div
              key="glucose"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4"
            >
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Reminder title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                label="Time"
                name="time"
                placeholder="Select time"
                type="datetime-local"
                onChange={(e) => setTime(e.target.value)}
              />
            </motion.div>
          )}

          {reminderType === "medication" && (
            <motion.div
              key="medication"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-7xl space-y-4"
            >
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Reminder title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                label="Time"
                name="time"
                placeholder="Select time"
                type="datetime-local"
                onChange={(e) => setTime(e.target.value)}
              />
              <div className="grid grid-cols-5 gap-4 items-end justify-center">
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
                    <option
                      value=""
                      disabled
                      selected
                      className="text-[#808080]"
                    >
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
                <motion.button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 sm:py-3.5 font-bold cursor-pointer col-span-1 w-full bg-[#6976EB] text-white rounded-lg flex items-center justify-center shadow-md"
                >
                  Add Medication
                </motion.button>
              </div>
            </motion.div>
          )}

          {reminderType === "meal" && (
            <motion.div
              key="meal"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-7xl space-y-4"
            >
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Reminder title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                name="time"
                label="Time"
                placeholder="Select time"
                type="datetime-local"
                onChange={(e) => setTime(e.target.value)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          disabled={isFormInvalid || isSubmitting}
          type="submit"
          className={`w-full mt-8 px-6 py-3 transition-all flex items-center justify-center gap-2 ${
            isFormInvalid || isSubmitting
              ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
              : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
          }`}
        >
          {isSubmitting ? (
            <div className="flex gap-4 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <CgSpinner className="text-white w-8 h-8" />
              </motion.div>
              <p>Adding Reminder</p>
            </div>
          ) : (
            <p>Add Reminder</p>
          )}
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
