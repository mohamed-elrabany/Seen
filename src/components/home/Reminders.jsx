import ReminderCard from "../ui/ReminderCard";
import emptyReminders from "../../assets/empty-reminders.svg";
import Button from "../ui/Button";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
 
import { RiAddLargeLine } from "react-icons/ri";
import { getReminders, deleteReminder } from "../../services/reminderServices";
import toast from "react-hot-toast";

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
];

export default function Reminders() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchReminders = async () => {
      try {
        const remindersList = await getReminders();
        console.log("Fetched reminders:", remindersList);
        setReminders(remindersList);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  async function handleDelete(reminderId) {
    const snapshot = reminders;
    setReminders(reminders.filter(r => r.id !== reminderId));
    try{
      await deleteReminder(reminderId);
      toast.success("Reminder deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete reminder. Please try again.");
      setReminders(snapshot);
    }
  }

  return (
    <div
      className="w-full h-full shadow-lg space-y-8 border p-4 md:p-6 rounded-2xl
      flex flex-col justify-between items-center
        bg-white bg-none dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] border-[#D9D9D9]/30 dark:border-white/10"
    >
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-2 text-start">
          <h3>{t("reminder.home.title")}</h3>
          <p className="card-text">{t("reminder.home.description")}</p>
        </div>
        <Button
          onClick={() => navigate("/add-reminder")}
          className="bg-[#6976EB] p-3 cursor-pointer rounded-xl text-white hover:bg-[#5a61d8] transition-colors"
        >
          <RiAddLargeLine className="w-5 h-5" />
          <p>{t("reminder.home.addButton")}</p>
        </Button>
      </div>
      

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p>{t("reminder.home.loading")}</p>
        </div>
      ) : reminders.length > 0 ? (
        <motion.div
          className="space-y-4 w-full h-full flex flex-col justify-start items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {reminders.map((reminder) => (
            <ReminderCard key={reminder.id} reminderData={reminder} onDelete={() => handleDelete(reminder.id)} />
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
            <h4>{t("reminder.empty.title")}</h4>
            <p className="meta-text">
              {t("reminder.empty.description")}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
