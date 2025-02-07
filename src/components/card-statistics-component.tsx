import CardStatistics from "../interfaces/card-statistics-interface";

export default function CardStatisticsComponent ({ title, subtitle, Icon } : CardStatistics) {
    return (
        <div className="flex items-center justify-between w-full p-6 bg-[#2d68a2] border border-gray-200 rounded-lg shadow-lg">
            <div className="">
                <dt className="mb-2 text-3xl font-extrabold text-white">{title}</dt>
                <dd className="text-gray-500 dark:text-gray-400 text-white">{subtitle}</dd>
            </div>
            <Icon className="text-white fill-transparent w-10 h-10"/>
        </div>
    )
}