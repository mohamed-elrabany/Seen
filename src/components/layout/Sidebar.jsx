import { NavLink } from "react-router-dom";
import { IoPerson, IoChatbubbleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { LuChartColumn } from "react-icons/lu";
import { RiRobot3Line } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { themeActions } from "../../store/slices/themeSlice";
import { motion, AnimatePresence } from "framer-motion";
import i18next from "i18next";

import logo from "/logo.svg";
import Button from "../ui/Button";


export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  const dispatch = useDispatch();
  const { toggleTheme } = themeActions;


useEffect(() => {
  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenMenu(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpenMenu(false);
    }
  };

  document.body.style.overflow = openMenu ? "hidden" : "auto";

  if (openMenu) {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
  }

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [openMenu]);


  const baseNavStyle =
    "w-full flex items-center gap-4 p-4 rounded-xl font-medium transition-all";

  const getNavClass = (isActive) =>
    `${baseNavStyle} ${
      isActive
        ? "bg-gradient-to-b from-[#6976EB] to-[#2B3695] text-white shadow-lg"
        : "text-[#3B3D53] hover:bg-[#6976EB]/20 dark:text-[#D1D5DC]"
    }`;

  const links = [
    { to: "/home", label: "الرئيسية", icon: <GoHome className="w-5 h-5" /> },
    {
      to: "/reports",
      label: "التقارير",
      icon: <LuChartColumn className="w-5 h-5" />,
    },
    {
      to: "/community",
      label: "المجتمع",
      icon: <LuChartColumn className="w-5 h-5" />,
    },
    {
      to: "/chats",
      label: "المحادثات",
      icon: <IoChatbubbleOutline className="w-5 h-5" />,
    },
    {
      to: "/assistant",
      label: "المساعد الذكي",
      icon: <RiRobot3Line className="w-5 h-5" />,
    },
    {
      to: "/profile",
      label: "الملف الشخصي",
      icon: <BsPerson className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Sidebar navigation */}
      <aside className="hidden w-1/3 lg:w-1/4 h-screen overflow-y-auto sticky top-0 shadow-2xl lg:flex flex-col gap-6 from-[#FFFFFF] via-[#FFFFFF] to-[#FFFFFF] bg-gradient-to-b  dark:from-[#1F1A5F] dark:via-[#161A41] dark:to-[#0A0E27]">
        {/* Header */}
        <div className="w-full">
          <div className="border-b border-[#D9D9D9]/30 p-6">
            <img src={logo} alt="Seen logo" className="h-12 w-auto" />
          </div>

          {/* User Info */}
          <div className="border-b border-[#D9D9D9]/30 p-6 flex-start gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg border-2 border-[#6976EB]">
              <IoPerson className="w-6 h-6 text-[#6976EB]" />
            </div>

            <div>
              <h4 className="text-[#161A41] text-lg font-bold">أهلاً منتصر</h4>
              <p className="text-[#808080] text-sm">مستوى السكر اليوم</p>
              <p className="text-[#808080] text-sm">
                <span className="text-[#6976EB] text-lg font-bold">128</span>{" "}
                mg/dL
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="w-full py-4 ps-4 pe-8 flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => getNavClass(isActive)}
            >
              {link.icon}
              <p>{link.label}</p>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#D9D9D9]/30 p-4 flex flex-col gap-2">
          <Button
          onClick={ () => dispatch(toggleTheme()) }
            className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
        text-[#808080] bg-[#F8F9FF] hover:bg-[#6976EB]/10
        dark:bg-white/10 dark:text-[#D1D5DC] dark:hover:bg-white/20"
          >
            <MdOutlineDarkMode className="w-5 h-5" />
            <p>الوضع الداكن</p>
          </Button>

          <Button
            className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
        text-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20
        dark:text-[#FF6467] dark:bg-[#FF0404]/20 dark:hover:bg-[#FF0404]/30"
          >
            <MdOutlineLogout className="w-5 h-5" />
            <p>تسجيل الخروج</p>
          </Button>
        </div>
      </aside>

      {/* Top nav */}
      <nav className={`flex justify-between ${i18next.language === 'ar' && 'flex-row-reverse'} items-center lg:hidden fixed top-0 z-40 w-full bg-white p-8 shadow-md`}>
        {/* profile */}
        <div className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg border-2 border-[#6976EB]">
          <IoPerson className="w-6 h-6 text-[#6976EB]" />
        </div>

        {/* logo */}
        <img src={logo} alt="Seen logo" className="h-12 w-auto" />

        {/* Menu Icon */}
        <Button
          onClick={() => setOpenMenu(true)}
          className="hover:bg-[#6976EB]/20 p-4 rounded-lg cursor-pointer transition-all"
        >
          <IoMdMenu className="w-6 h-6" />
        </Button>
      </nav>

      <AnimatePresence>
        {openMenu && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
            />

            {/* Mobile Sidebar */}
            <motion.aside
              key="sidebar"
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-2/3 h-screen shadow-2xl flex flex-col lg:hidden gap-6 
              fixed top-0 right-0 z-50 overflow-y-auto
              from-[#FFFFFF] via-[#FFFFFF] to-[#FFFFFF] bg-gradient-to-b  
              dark:from-[#1F1A5F] dark:via-[#161A41] dark:to-[#0A0E27]"
            >
              {/* Header */}
              <div className="w-full">
                <div className="border-b border-[#D9D9D9]/30 p-6">
                  <img src={logo} alt="Seen logo" className="h-12 w-auto" />
                </div>

                {/* User Info */}
                <div className="border-b border-[#D9D9D9]/30 p-6 flex-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg border-2 border-[#6976EB]">
                    <IoPerson className="w-6 h-6 text-[#6976EB]" />
                  </div>

                  <div>
                    <h4 className="text-[#161A41] text-lg font-bold">
                      أهلاً منتصر
                    </h4>
                    <p className="text-[#808080] text-sm">مستوى السكر اليوم</p>
                    <p className="text-[#808080] text-sm">
                      <span className="text-[#6976EB] text-lg font-bold">
                        128
                      </span>{" "}
                      mg/dL
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="w-full py-4 ps-4 pe-8 flex flex-col gap-2">
                {links.map((link) => (
                  <NavLink
                    onClick={ () => setOpenMenu(false) }
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => getNavClass(isActive)}
                  >
                    {link.icon}
                    <p>{link.label}</p>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto border-t border-[#D9D9D9]/30 p-4 flex flex-col gap-2">
                <Button
                onClick={ () => dispatch(toggleTheme()) }
                  className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
        text-[#808080] bg-[#F8F9FF] hover:bg-[#6976EB]/10
        dark:bg-white/10 dark:text-[#D1D5DC] dark:hover:bg-white/20"
                >
                  <MdOutlineDarkMode className="w-5 h-5" />
                  <p>الوضع الداكن</p>
                </Button>

                <Button
                  className="w-full flex-start gap-4 p-4 rounded-xl cursor-pointer
        text-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20
        dark:text-[#FF6467] dark:bg-[#FF0404]/20 dark:hover:bg-[#FF0404]/30"
                >
                  <MdOutlineLogout className="w-5 h-5" />
                  <p>تسجيل الخروج</p>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
