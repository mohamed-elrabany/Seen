export default function HeaderCards({icon, value, label}){
    const Icon= icon;
    return(
        <div className="flex-col-start gap-4 bg-white/10 border border-white/20 dark:bg-white/5 dark:border-white/10 rounded-xl p-4">
            <Icon className='w-6 h-6 text-white mb-2' />
            <h4 className="font-bold text-2xl text-white mb-1">{value}</h4>
            <p className="text-white/70">{label}</p>
        </div>
    )
}