export default function Input({
  id,
  label,
  className,
  error = false, // <-- new prop
  children,
  ...props
}) {
  return (
    <div className="flex-col-start gap-2">
      {label && (
        <label
          className="text-[#161A41] font-bold text-sm sm:text-base cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`w-full text-[#161A41] font-semibold rounded-lg px-4 py-2.5 sm:py-3 border-2
    ${error ? "border-red-700 focus:border-red-500" : "border-[#D9D9D9]/30 focus:border-[#6976EB]"}
    text-sm sm:text-base outline-none transition-all
    ${className}`}
        {...props}
      />
    </div>
  );
}
