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
          className="text-[#161A41] font-bold text-lg cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`w-full text-[#161A41] font-bold rounded-lg px-4 py-3 pr-12 border-2
          ${error ? 'border-red-700 focus:border-red-500' : 'border-[#D9D9D9]/30 focus:border-[#6976EB]'}
          text-md text-start outline-none transition-all
          ${className}`}
        {...props}
      />
    </div>
  );
}