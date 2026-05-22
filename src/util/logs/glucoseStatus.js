export function getGlucoseStatusStyles(value, isInput = false) {
  if (value === null || value === undefined || value === "") return "";
  
  const num = Number(value);
  const status = (num >= 70 && num <= 140) ? "normal" : "danger";

  const glucoseReadingTag = {
    normal: `text-[#17CE92] bg-[#17CE92]/10 ${isInput ? "border-[#17CE92] focus:border-[#17CE92]" : ""} font-semibold`,
    danger: `text-[#FB2C36] bg-[#FB2C36]/10 ${isInput ? "border-[#FB2C36] focus:border-[#FB2C36]" : ""} font-semibold`,
  };

  return glucoseReadingTag[status];
}