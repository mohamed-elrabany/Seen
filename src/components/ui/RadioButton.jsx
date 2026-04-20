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
    <label className={`text-white flex-col-center gap-2 cursor-pointer shadow-md ${isChecked ? "bg-[#6976EB]" : 'bg-[#ADB4F3] dark:bg-white/10'} hover:bg-[#6976EB] font-bold rounded-lg p-6 text-md text-start transition-all`}>
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