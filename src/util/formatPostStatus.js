export const formatCount = (count, t) => {
  if (!count || count === 0) return "0";
  
  if (count >= 1000 && count < 1000000) {
    const value = (count / 1000).toFixed(1).replace(/\.0$/, "");
    return `${value} ${t("units.thousand")}`;
  }
  
  if (count >= 1000000) {
    const value = (count / 1000000).toFixed(1).replace(/\.0$/, "");
    return `${value} ${t("units.million")}`;
  }
  
  return count.toString();
};