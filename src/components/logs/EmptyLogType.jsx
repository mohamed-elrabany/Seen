import { motion } from "framer-motion";
import emptyImg from "../../assets/empty-add-logs.svg";

export default function EmptyLogType() {
  return (
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
  );
}
