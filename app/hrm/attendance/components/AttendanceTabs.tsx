interface AttendanceTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  counts: {
    pending: number;
    atWork: number;
    marked: number;
  };
}

const AttendanceTabs = ({
  activeTab,
  setActiveTab,
  counts,
}: AttendanceTabsProps) => {
  const tabs = [
    {
      id: "pending",
      label: "Pending",
      count: counts.pending,
      color: "text-gray-600",
    },
    {
      id: "atWork",
      label: "At Work",
      count: counts.atWork,
      color: "text-green-600",
    },
    {
      id: "marked",
      label: "Marked",
      count: counts.marked,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="flex mx-auto space-x-1  bg-gray-100 p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "text-purple-600 hover:text-purple-900"
              : "bg-white shadow-sm text-gray-900"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default AttendanceTabs;
