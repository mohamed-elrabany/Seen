import LogCard from "../ui/LogCard";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";


import emptyLogs from "../../assets/empty-logs.svg";

const logsData = [
  {
    log_id: 1,
    log_title: "Breakfast & Meds",
    log_description: "Standard morning routine with glucose check.",
    created_at: "2026-05-03T09:00:00Z",

    recordGlucose: {
      reading_id: 101,
      glucose_level: 115.0,
      reading_time: "2026-05-03T08:00:00Z",
      reading_type: "Before Meal"
    },
    recordMeal: {
      meal_id: 201,
      meal_name: "Oatmeal and Berries",
      meal_time: "2026-05-03T08:15:00Z",
      meal_type: "Breakfast"
    },
    medication: {
      medication_id: 301,
      medication_name: "Metformin",
      medication_time: "2026-05-03T08:20:00Z"
    }
  },
  {
    log_id: 2,
    log_title: "Quick Snack",
    log_description: "Just a small afternoon snack.",
    created_at: "2026-05-03T15:00:00Z",
    recordGlucose: null,
    recordMeal: {
      meal_id: 202,
      meal_name: "Apple",
      meal_time: "2026-05-03T14:45:00Z",
      meal_type: "Snack"
    },
    medication: null
  },
  {
    log_id: 3,
    log_title: "Corrective Dose",
    log_description: "Took medication due to high reading.",
    created_at: "2026-05-03T19:00:00Z",
    recordGlucose: {
      reading_id: 102,
      glucose_level: 190.0,
      reading_time: "2026-05-03T18:45:00Z",
      reading_type: "Random"
    },
    recordMeal: null,
    medication: {
      medication_id: 302,
      medication_name: "Insulin",
      medication_time: "2026-05-03T18:50:00Z"
    }
  },
  {
    log_id: 4,
    log_title: "Nightly Meds",
    log_description: "Medication before bed.",
    created_at: "2026-05-03T22:30:00Z",
    recordGlucose: null,
    recordMeal: null,
    medication: {
      medication_id: 303,
      medication_name: "Atorvastatin",
      medication_time: "2026-05-03T22:15:00Z"
    }
  }
];

export default function Logs() {
    const { t } = useTranslation();

    return(
        <div className="w-full shadow-lg gap-8 border p-4 md:p-6 rounded-2xl
        bg-white bg-none dark:bg-gradient-to-br dark:from-[#1F1A5F] dark:to-[#161A41] border-[#D9D9D9]/30 dark:border-white/10">
            <h3>Logs</h3>
            <p className="card-text">This is the logs section.</p>
            {logsData.length > 0
            ? (<motion.div
                className="space-y-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {logsData.map((log) => (
                    <LogCard key={log.log_id} logData={log} />
                ))}
            </motion.div>)
            : (<motion.div
                className="space-y-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-4 mt-8"
            >
                <img src={emptyLogs} alt="No logs available" />
                <div className="text-center">
                    <h4>No logs available</h4>
                    <p className="meta-text">Please add some logs to see them here.</p>
                </div>
            </motion.div>)}
        </div>
    );
}