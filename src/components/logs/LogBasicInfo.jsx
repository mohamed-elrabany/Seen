import Input from "../ui/Input";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { formatForDateTimeInput } from "../../util/formatDiplayedDate";

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
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function LogBasicInfo({ logData, setLogData }) {
  const { t } = useTranslation();

  const logDate = formatForDateTimeInput(logData?.logged_at);
  function handleInputChange(e) {
    let value = e.target.value;

    if (e.target.name === "logged_at") {
      value = value.replace("T", " ") + ":00";
    }

    setLogData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }

  const maxDateTime = (() => {
    const now = new Date();
    // For UTC+3, this converts minutes to milliseconds correctly without inversion
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 16);
  })();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Input
          autoFocus={true}
          name="log_title"
          type="text"
          label={t("logs.add-edit-log.logDetails.title")}
          placeholder={t("logs.add-edit-log.logDetails.titlePlaceholder")}
          value={logData.log_title || ""}
          onChange={(e) => handleInputChange(e)}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label={t("logs.add-edit-log.logDetails.description")}
          name={"log_description"}
          type={"text"}
          placeholder={t("logs.add-edit-log.logDetails.descriptionPlaceholder")}
          value={logData.log_description || ""}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label={t("logs.add-edit-log.logDetails.date")}
          name={"logged_at"}
          type="datetime-local"
          placeholder={"Select log time"}
          max={maxDateTime}
          value={logDate}
          onChange={(e) => handleInputChange(e)}
        />
      </motion.div>
    </motion.div>
  );
}
