import { motion } from "framer-motion";

export default function EmptyIllustration({ imageSrc, title, description }) {
  return (
    <motion.div
      className="space-y-4 w-full h-full flex flex-col items-center justify-center gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img src={imageSrc} alt="No logs available" />
      <div className="text-center">
        <h4>{title}</h4>
        <p className="meta-text">{description}</p>
      </div>
    </motion.div>
  );
}
