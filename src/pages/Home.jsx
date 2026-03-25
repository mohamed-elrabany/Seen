import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { headerCardsContent as cards } from "../util/content";
import { motion } from "framer-motion";

import Header from "../components/layout/Header";
import HeaderCards from "../components/ui/HeaderCards";

export default function Home() {
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("login") === "success") {
      toast.success("تم تسجيل الدخول بنجاح");
    }
  }, []);

  return (
    <>
      <Header className="flex-col-between">
        <div className="w-full flex-col-start gap-4 mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            مرحباً بك، منتصر 👋
          </h1>
          <p className="text-white">إليك ملخص صحتك اليوم</p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <HeaderCards
                icon={card.icon}
                value={card.value}
                label={card.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </Header>
    </>
  );
}
