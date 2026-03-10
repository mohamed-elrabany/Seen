import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Dashboard() {
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("login") === "success") {
      toast.success("تم تسجيل الدخول بنجاح");
    }
  }, []);

  return <div>Dashboard</div>;
}