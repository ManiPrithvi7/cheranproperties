import { Users, UserCheck, Clock, UserX } from "lucide-react";

interface SummaryCardsProps {
  counts: {
    total: number;
    atWork: number;
    shifts: number;
    absent: number;
  };
}

const SummaryCards = ({ counts }: SummaryCardsProps) => {
  const cards = [
    {
      title: "Labours",
      count: counts.total,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      icon: Users,
    },
    {
      title: "At Work",
      count: counts.atWork,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      icon: UserCheck,
    },
    {
      title: "Shifts",
      count: counts.shifts,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      icon: Clock,
    },
    {
      title: "Absent",
      count: counts.absent,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      icon: UserX,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className={`${card.bgColor} rounded-lg p-4 border border-gray-100`}
          >
            <div className="flex justify-center items-center space-x-3">
              {/* <div className={`${card.color} rounded-lg p-2`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div> */}
              <div className=" flex items-center gap-3">
                <p className="text-md text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">
                  ({card.count})
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
