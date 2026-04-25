import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // Added this

import HomeHeader from "../../components/home/HomeHeader";

export default function Home() {
  const [params] = useSearchParams();
  const { t } = useTranslation(); // Initialize translation

  useEffect(() => {
    if (params.get("login") === "success") {
      // Using the new path we added to the JSON
      toast.success(t("homePage.alerts.loginSuccess"));
    }
  }, [params, t]); // Added t to dependency array

  return (
    <main>
      <HomeHeader />
    </main>
  );
}