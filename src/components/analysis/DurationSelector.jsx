import Button from "../ui/Button";
import Input from "../ui/Input";

import { motion, AnimatePresence } from "framer-motion";


const BUTTONS_CONFIG = [
    { id: "weekly", label: "أسبوعي" },
    { id: "monthly", label: "شهري" },
    { id: "custom", label: "مخصص" }
];

export default function DurationSelector({ duration, setDuration, range, setRange }) {
    return (
        <div className="w-full space-y-4">
            <div className="w-full grid grid-cols-3 justify-center items-center gap-4">
                {BUTTONS_CONFIG.map((btn) => {
                    // Boolean that activates the selection when condition is met
                    const isSelected = duration === btn.id;

                    return (
                        <Button
                            key={btn.id}
                            onClick={() => setDuration(btn.id)}
                            className={`
                                w-full cursor-pointer p-4 rounded-md transition-colors duration-300 border border-transparent
                                ${isSelected 
                                    ? "bg-[#6976EB] text-white" 
                                    : "bg-[#6976EB]/10 text-[#6976EB] border-[#6976EB]/10 dark:bg-white/10 dark:text-white dark:border-white/10"
                                }
                            `}
                        >
                            {btn.label}
                        </Button>
                    );
                })}
            </div>
            <AnimatePresence mode="wait">
                {duration === "custom" && (
                    <motion.div
                        key="custom-range"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full py-4 grid grid-cols-2 gap-4 items-center justify-center"
                    >
                        <Input
                        label="من"
                        type="date"
                        value={range.start || ""}
                        min={range.end ? new Date(range.end) : undefined}
                        onChange={(e) => setRange({ ...range, start: e.target.value })}
                         />
                        <Input
                        label="إلى"
                        type="date"
                        value={range.end || ""}
                        max={range.start ? new Date(range.start) : undefined}
                        onChange={(e) => setRange({ ...range, end: e.target.value })}
                         />

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}