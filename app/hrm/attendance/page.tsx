import AttendanceSidebar from "./components/AttendanceSidebar";
import AttendanceContent from "./components/AttendanceContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AttendanceSidebar />
      <AttendanceContent />
    </div>
  );
};

export default Index;
