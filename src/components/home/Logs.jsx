import LogCard from "../ui/LogCard";
import Button from "../ui/Button";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { formatDisplayedDate } from "../../util/formatDiplayedDate";

import { RiAddLargeLine } from "react-icons/ri";

import emptyLogs from "../../assets/empty-logs.svg";
import { getLogs } from "../../services/logServices";

const logsData = [
  {
    log_id: 1,
    log_title: "Breakfast & Meds",
    log_description: "Standard morning routine with glucose check.",
    log_time: "2026-05-03T08:00:00Z", // User-selected time
    created_at: "2026-05-03T09:00:00Z",
    recordGlucose: {
      reading_id: 101,
      glucose_level: 115.0,
      reading_type: "Before Meal",
    },
    recordMeal: {
      meal_id: 201,
      meal_name: "Oatmeal and Berries",
      meal_type: "Breakfast",
    },
    medication: {
      medication_id: 301,
      medication_name: "Metformin",
    },
  },
  {
    log_id: 2,
    log_title: "Quick Snack",
    log_description: "Just a small afternoon snack.",
    log_time: "2026-05-03T14:45:00Z", // User-selected time
    created_at: "2026-05-03T15:00:00Z",
    recordGlucose: null,
    recordMeal: {
      meal_id: 202,
      meal_name: "Apple",
      meal_type: "Snack",
    },
    medication: null,
  },
  {
    log_id: 3,
    log_title: "Hypoglycemia Check",
    log_description: "Feeling shaky and dizzy. Checking levels.",
    log_time: "2026-05-03T17:30:00Z", // User-selected time
    created_at: "2026-05-03T17:35:00Z",
    recordGlucose: {
      reading_id: 102,
      glucose_level: 62.0, // Low glucose level (< 70)
      reading_type: "Random",
    },
    recordMeal: null,
    medication: null,
  },
  {
    log_id: 4,
    log_title: "Nightly Meds",
    log_description: "Medication before bed.",
    log_time: "2026-05-03T22:15:00Z", // User-selected time
    created_at: "2026-05-03T22:30:00Z",
    recordGlucose: null,
    recordMeal: null,
    medication: {
      medication_id: 303,
      medication_name: "Atorvastatin",
    },
  },
];

export default function Logs({ date }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchLogs = async () => {
      try{
        const data = await getLogs(date);
        console.log("Fetched logs:", data);
        setLogs(data);
      }catch(error){
        console.error("Error fetching logs:", error);
        toast.error("Failed to fetch logs. Please try again later.");
        setLogs([]);
      }finally{
        setIsLoading(false);
      }
    };
    fetchLogs();
  },[date]);

  useEffect(() => {
    console.log("Logs updated:", logs);
  }, [logs]);


  return (
    <div
      className="w-full h-full shadow-lg space-y-8 border p-4 md:p-6 rounded-2xl
      flex flex-col justify-between items-center
        bg-white bg-none dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] border-[#D9D9D9]/30 dark:border-white/10"
    >
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-2 text-start">
          <h3>Logs</h3>
          <p className="card-text">{formatDisplayedDate(date)}</p>
        </div>
        <Button
        onClick={() => navigate("/add-log")}
        className=" p-3 bg-[#6976EB] cursor-pointer rounded-xl text-white hover:bg-[#5a61d8] transition-colors"
      >
        <RiAddLargeLine className="w-5 h-5" />
        <p className="w-auto">Add Log</p>
      </Button>
      </div>
      

      {logs.length > 0 ? (
        <motion.div
          className="space-y-4 w-full h-full flex flex-col justify-start items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {logs.map((log) => (
            <Link to={`/logs/${log.log_id}`} key={log.log_id} className="w-full">
              <LogCard key={log.log_id} logData={log} />
            </Link>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4 w-full h-full flex flex-col items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img src={emptyLogs} alt="No logs available" />
          <div className="text-center">
            <h4>No logs available</h4>
            <p className="meta-text">Please add some logs to see them here.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
