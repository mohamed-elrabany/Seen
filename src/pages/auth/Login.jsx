import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { IoIosArrowRoundBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";


export default function Login() {
    const navigation= useNavigation();
    const actionData= useActionData();
    const { t, i18n }= useTranslation();
    const isLtr= i18n.language === "en";

    const isSubmitting= navigation.state === "submitting";

    useEffect(()=>{
        if(!actionData) return;

        if(actionData?.error){
            toast.error("بيانات خاطئة");
        }
    },[actionData])

  return (
    <div className="min-h-screen flex">
        
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div 
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        viewport={{ once: true }}
        className="flex flex-col gap-6 w-full max-w-md">
          <Link to={'/'}><img src="/logo.svg" alt="Seen Logo" className="w-48 h-48" /></Link>
          
          <h1 className="text-4xl font-bold text-[#161A41] mb-3">{t("common.welcome")}</h1>
          <p className="text-[#808080] mb-8">{t("loginPage.loginToContinue")}</p>

          <Form action="/login" method="post" className="space-y-4">
            {/* Inputs */}
            <Input id='email' label={t("loginPage.email")} type="email" name="email" placeholder="example@email.com" />
            <Input id='password' label={t("loginPage.password")} type="password" name="password" placeholder="********" />

            {/* Remember + Forget Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-[#D9D9D9] focus:ring-[#6976EB]"
                />
                  {t("loginPage.remember")}
              </label>

              <Link
                to="/forget-password"
                className="text-[#6976EB] hover:text-[#2B3695]"
              >
                {t("loginPage.forgotPassword")}
              </Link>
            </div>

            {actionData && <p className="text-red text-center font-medium">{actionData.error}</p>}

            {/* Submit Button */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#6976EB] hover:bg-[#2B3695] w-full px-6 py-3 transition-all flex-center gap-2"
            >
              {isSubmitting 
              ? <p className="text-white">{t("common.login")}...</p>
            :<p className="text-white">{t("common.login")}</p>}
              <IoIosArrowRoundBack className={`text-white w-8 h-8 ${isLtr && "rotate-180"}`} />
            </Button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex-center">
                <div className="w-full border-t border-[#D9D9D9]"></div>
              </div>
              <div className="relative flex-center text-md bg-white px-4 text-[#808080]">
                {t("loginPage.or")}
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              className="bg-white hover:bg-[#6976EB]/10 border-2 border-[#808080]/40 w-full px-6 py-3 transition-all flex-center gap-2"
            >
              <FcGoogle className="w-8 h-8" />
              <p className="text-[#161A41]">{t("loginPage.google")}</p>
            </Button>

            {/* Signup Link */}
            <p className="text-[#808080] text-center mt-4">
             {t("loginPage.noAccount")}{" "}
              <Link
                to="/signup"
                className="text-[#6976EB] font-bold hover:text-[#2B3695] transition-colors"
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
          <h2 className="text-5xl font-bold mb-6">{t("loginPage.start")}</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            {t("loginPage.sentence")}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { number: "50K+", label: t("loginPage.user") },
              { number: "1M+", label: t("loginPage.log") },
              { number: "10K+", label: t("loginPage.post") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <p className="text-3xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export async function action({request}){
    const formData= await request.formData();
    const response= await fetch('https://dummyjson.com/auth/login',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password")
        })
    });

    if(!response.ok){
        return {error: 'بيانات خاطئة'}
    }

    return redirect("/?login=success");
}