import Input from "../ui/Input";
import { motion } from "framer-motion";

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
          label="Title"
          placeholder="Enter log title"
          value={logData.log_title || ""}
          onChange={(e) => handleInputChange(e)}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label={"Description"}
          name={"log_description"}
          type={"text"}
          placeholder={"Enter log description"}
          value={logData.log_description || ""}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          label={"Time"}
          name={"logged_at"}
          type="datetime-local"
          placeholder={"Select log time"}
          max={new Date().toISOString().slice(0, 16)}
          value={logData.logged_at || ""}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </motion.div>
    </motion.div>
  );
}
