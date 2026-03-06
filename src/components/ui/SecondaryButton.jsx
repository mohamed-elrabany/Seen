

export default function SecondaryButton({children}){
    return(
        <button className="
        w-auto text-[#6976EB]
        flex-center bg-transparent border-2 border-[#6976EB] hover:bg-[#6976EB] hover:text-white transition-all text-lg 
        font-bold rounded-xl px-6 py-3 gap-2 cursor-pointer">
            {children}
        </button>
    )
}