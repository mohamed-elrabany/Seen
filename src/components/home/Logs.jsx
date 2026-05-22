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
      <div className="w-full flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-start lg:justify-between">
        <div className="space-y-2 text-start">
          <h3>{t("logs.home.display.title")}</h3>
          <p className="card-text">{formatDisplayedDate(date)}</p>
        </div>
        <Button
        onClick={() => navigate("/add-log")}
        className="w-full lg:w-auto p-3 bg-[#6976EB] cursor-pointer rounded-xl text-white hover:bg-[#5a61d8] transition-colors"
      >
        <RiAddLargeLine className="w-5 h-5" />
        <p className="w-auto">{t("logs.home.display.button")}</p>
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
            <h4>{t("logs.empty.title")}</h4>
            <p className="meta-text">{t("logs.empty.description")}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
