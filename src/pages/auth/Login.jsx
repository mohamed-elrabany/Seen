import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

import { store } from "../../store/store";
import { userActions } from "../../store/slices/userSlice";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { login } from "../../services/authService";

import { IoIosArrowRoundBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import IncrementalCounter from "../../components/ui/IncrementalCounter";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});

  const navigation = useNavigation();
  const actionData = useActionData();
  const { t, i18n } = useTranslation();
  const isLtr = i18n.language === "en";

  const isSubmitting = navigation.state === "submitting";

  // Logic for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div
        className="flex-1 flex items-center justify-center p-8 
      bg-gradient-to-br from-[#F8F9FF] via-[#FAFAFF] to-[#F0F2FF] 
      dark:from-[#0A0E27] dark:via-[#161A41] dark:to-[#1F1A5F]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 w-full max-w-md"
        >
          <Link to={"/"}>
            <img src="/logo.svg" alt="Seen Logo" className="w-48 h-48" />
          </Link>

          <h2>{t("common.welcome")}</h2>
          <p className="description-text">{t("loginPage.loginToContinue")}</p>

          <Form action="/login" method="post" className="space-y-4">
            <Input
              id="email"
              label={t("loginPage.email")}
              type="email"
              name="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              error={
                touched.email &&
                (!email
                  ? "ادخل البريد الإلكتروني"
                  : !isEmailValid && "البريد الإلكتروني غير صالح")
              }
            />

            <Input
              id="password"
              label={t("loginPage.password")}
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={
                touched.password &&
                (!password
                  ? "ادخل كلمة المرور"
                  : !isPasswordValid &&
                    "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
              }
            />

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer text-[#808080] dark:text-gray-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-[#D9D9D9] focus:ring-[#6976EB]"
                />
                {t("loginPage.remember")}
              </label>

              <Link
                to="/forget-password"
                className="text-[#6976EB] hover:text-[#2B3695] dark:hover:text-[#6976EB] transition-colors text-sm"
              >
                {t("loginPage.forgotPassword")}
              </Link>
            </div>

            {actionData?.error && (
              <p className="text-red-500 text-center font-medium">
                {actionData.error}
              </p>
            )}

            <Button
              disabled={isSubmitting || !isFormValid}
              type="submit"
              className={`w-full px-6 py-3 transition-all flex items-center justify-center gap-2 ${
                !isFormValid
                  ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
                  : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
              }`}
            >
              <p className="text-white">
                {isSubmitting ? `${t("common.login")}...` : t("common.login")}
              </p>
              <IoIosArrowRoundBack
                className={`text-white w-8 h-8 ${isLtr && "rotate-180"}`}
              />
            </Button>

            <div className="flex justify-center items-center my-4">
              <div className="w-full border-t border-[#D9D9D9] dark:border-[#D9D9D9]/20"></div>
              <div className="relative flex items-center justify-center text-md px-4 text-[#808080]">
                {t("loginPage.or")}
              </div>
              <div className="w-full border-t border-[#D9D9D9] dark:border-[#D9D9D9]/20"></div>
            </div>

            <Button
              type="button"
              className="bg-transparent text-[#161A41] dark:text-white dark:bg-white/10 
    hover:bg-[#6976EB] hover:text-white hover:border-[#6976EB] 
    border-2 border-[#D9D9D9]/40 dark:border-[#D9D9D9]/15 
    w-full px-6 py-3 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <FcGoogle className="w-8 h-8" />
              {/* Using text-inherit allows the p tag to take the color from the button's hover state */}
              <p className="text-inherit font-bold">{t("loginPage.google")}</p>
            </Button>

            <p className="text-[#808080] dark:text-gray-400 text-center mt-4">
              {t("loginPage.noAccount")}{" "}
              <Link
                to="/register"
                className="text-[#6976EB] font-bold hover:text-[#2B3695] dark:hover:text-[#6976EB] transition-colors"
              >
                {t("loginPage.createAccount")}
              </Link>
            </p>
          </Form>
        </motion.div>
      </div>

      {/* Right Side - Stats / Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#6976EB] to-[#2B3695] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-white text-center max-w-xl"
        >
          <h1 className="text-white text-4xl mb-4 font-bold">
            {t("loginPage.start")}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-8">
            {t("loginPage.sentence")}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: 50000, suffix: "K+", label: t("loginPage.user") },
              { value: 1000000, suffix: "M+", label: t("loginPage.log") },
              { value: 10000, suffix: "K+", label: t("loginPage.post") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <p className="text-3xl font-bold mb-2">
                  <IncrementalCounter target={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const user = await login(formData.get("email"), formData.get("password"));
    store.dispatch(userActions.setUser(user));
    return redirect("/home?login=success");
  } catch (err) {
    return {
      error: err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول",
    };
  }
}
