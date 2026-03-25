

export default function Button({className, children, ...props}){
    return(
        <button 
        {...props}
        className={`
        w-auto flex-center gap-2 text-lg font-bold rounded-xl transition-all
        ${className}
        `}>
            {children}
        </button>
    )
}