export default function RadioButton({
  id,
  name,
  value,
  isChecked,
  onChange,
  children,
  ...props
}) {
  return (
    <label className={`text-[#6976EB] flex-col-center gap-2 cursor-pointer shadow-md ${isChecked ? "bg-[#6976EB] text-white" : 'bg-[#6976EB]/20 dark:bg-white/10 dark:text-white'} hover:bg-[#6976EB] hover:text-white font-bold rounded-lg p-4 text-md text-center transition-all`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
        className="hidden"
        {...props}
      />
        {children}   
    </label>
  );
}