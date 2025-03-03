import CardStatistics from "../interfaces/card-statistics-interface";

export default function CardStatisticsComponent ({ title, subtitle, Icon } : CardStatistics) {
    return (
        <div className="flex items-center justify-between w-full md:w-1/2 lg:w-1/4 p-6 bg-[#2d68a2] border border-gray-200 rounded-lg shadow-lg">
            <div className="">
                <dt className="mb-2 text-3xl font-extrabold text-white">{title}</dt>
                <dd className="text-gray-500 text-white">{subtitle}</dd>
            </div>
            <Icon className="text-white fill-white w-10 h-10"/>
        </div>
    )
}