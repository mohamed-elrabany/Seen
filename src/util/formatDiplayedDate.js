import { t } from "i18next";
export function formatDisplayedDate(dateStr){
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = t(`profilePage.personalInfo.months.${d.getMonth()}`);
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };