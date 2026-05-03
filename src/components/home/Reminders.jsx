import ReminderCard from "../ui/ReminderCard";
import emptyReminders from "../../assets/empty-reminders.svg";
import Button from "../ui/Button";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { RiAddLargeLine } from "react-icons/ri";

const remindersData = [
  {
    reminder_id: 1,
    user_id: 101,
    message_type: "glucose",
    message: "Time for your fasting glucose check.",
    time: "2026-05-03T07:00:00Z",
    medication: null, // Medication is null for glucose checks
    status: "Done",
  },
  {
    reminder_id: 2,
    user_id: 101,
    message_type: "medication",
    message: "Please take your prescribed dose of Metformin.",
    time: "2026-05-03T08:30:00Z",
    medication: "Metformin",
    status: "Still",
  },
  {
    reminder_id: 3,
    user_id: 101,
    message_type: "meal",
    message: "Lunch time! Remember to log your carbs.",
    time: "2026-05-03T13:00:00Z",
    medication: null,
    status: "Skipped",
  },
  {
    reminder_id: 4,
    user_id: 101,
    message_type: "medication",
    message: "Evening dose of Atorvastatin.",
    time: "2026-05-03T20:00:00Z",
    medication: "Atorvastatin",
    status: "Still",
  },
  {
    reminder_id: 5,
    user_id: 101,
    message_type: "meal",
    message: "Post-dinner glucose reading.",
    time: "2026-05-03T21:30:00Z",
    medication: null,
    status: "Still",
  },
];

export default function Reminders() {
  const { t } = useTranslation();
  return (
    <div
      className="w-full h-full shadow-lg space-y-8 border p-4 md:p-6 rounded-2xl
      flex flex-col justify-between items-center
        bg-white bg-none dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] border-[#D9D9D9]/30 dark:border-white/10"
    >
      <div className="w-full space-y-2 text-start">
        <h3>Reminders</h3>
        <p className="card-text">This is the reminders section.</p>
      </div>

      {remindersData.length > 0 ? (
        <motion.div
          className="space-y-4 w-full h-full flex flex-col justify-start items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {remindersData.map((reminder) => (
            <ReminderCard key={reminder.reminder_id} reminderData={reminder} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4 w-full h-full flex flex-col items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img src={emptyReminders} alt="No reminders available" />
          <div className="text-center">
            <h4>No reminders available</h4>
            <p className="meta-text">
              Please add some reminders to see them here.
            </p>
          </div>
        </motion.div>
      )}

      <Button
        onClick={() => navigate("/add-reminder")}
        className="w-full mt-6 bg-[#6976EB] px-6 py-3 cursor-pointer rounded-xl text-white hover:bg-[#5a61d8] transition-colors"
      >
        <RiAddLargeLine className="w-5 h-5" />
        <p>Add Reminder</p>
      </Button>
    </div>
  );
}
