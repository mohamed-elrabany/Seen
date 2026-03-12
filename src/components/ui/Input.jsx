export default function Input({
  id,
  label,
  className,
  children,
  ...props
}) {
  return (
    <div className="flex-col-start gap-2">
      {label && (
        <label
          className="text-[#161A41] font-bold text-lg cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`w-full text-[#161A41] font-bold rounded-lg px-4 py-3 pr-12 border-2 border-[#D9D9D9]/30 text-md text-start
        outline-none focus:border-[#6976EB] focus:text-[#6976EB] transition-all
        ${className}`}
        {...props}
      />
    </div>
  );
}