

export default function Button({className, children}){
    return(
        <button className={`
        w-auto flex-center gap-2 cursor-pointer text-lg font-bold rounded-xl transition-all
        ${className}
        `}>
            {children}
        </button>
    )
}