import { t } from "i18next";
import i18n from "i18next";

export function formatDisplayedDate(dateStr) {
  if (!dateStr) return "";

  // Strip 'Z' and swap spaces for 'T' to guarantee local time interpretation
  const standardizedStr = dateStr.replace("Z", "").replace(" ", "T");

  const d = new Date(standardizedStr);

  // Safety fallback if the string is corrupted
  if (isNaN(d.getTime())) return "";

  // Uses the browser's built-in internationalization engine to translate the month
  return d.toLocaleDateString(i18n.language, {
    day: "numeric",
    month: "long", // "long" gives "May", "short" gives "May" (or "Jan"/"January" depending on the month)
    year: "numeric",
    numberingSystem: "latn", // Ensures 1, 2, 3 digits regardless of locale
  });
}

export function formatDisplayedTime(timeStr) {
  if (!timeStr) return "";

  // 1. Remove 'Z' if present, and replace spaces with 'T'
  // Removing 'Z' forces the browser to parse it as Local Time instead of UTC
  const standardizedStr = timeStr.replace("Z", "").replace(" ", "T");

  const date = new Date(standardizedStr);

  // Fallback check to keep the UI from crashing if data is corrupted
  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString(i18n.language, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    numberingSystem: "latn",
  });
}

export function formatDateTimeString(timeStr){
  if (!timeStr) return "Time not recorded";

  // Strip 'Z' to force local time interpretation, and swap spaces for 'T'
  const standardizedStr = timeStr.replace("Z", "").replace(" ", "T");

  const date = new Date(standardizedStr);

  // Fallback if the date string is malformed or corrupted
  if (isNaN(date.getTime())) return "Time not recorded";

  return date.toLocaleString(i18n.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    numberingSystem: "latn",
  });
};

export function formatForDateTimeInput(dateStr) {
  if (!dateStr) return "";

  // 1. Strip 'Z' and swap spaces for 'T' to force local time
  const standardizedStr = dateStr
    .replace("Z", "")
    .replace(" ", "T");

  const d = new Date(standardizedStr);

  // Safety fallback if the date is invalid
  if (isNaN(d.getTime())) return "";

  // 2. Manually construct YYYY-MM-DDTHH:mm using local time methods
  const year = d.getFullYear();
  
  // Pad with a leading zero if the month/day/hour/minute is a single digit
  const month = String(d.getMonth() + 1).padStart(2, "0"); 
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  // Returns the exact string format <input type="datetime-local"> needs
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatForBackendDateTime(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}