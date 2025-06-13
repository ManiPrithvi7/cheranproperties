"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Users,
  UserCheck,
  Clock,
  LogOut,
} from "lucide-react";

const AttendanceSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    staffAttendance: false,
    myAttendance: false,
    labourAttendance: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800">HRM</span>
        </div>
        <h2 className="text-sm text-gray-600 mt-2">Labour Attendance</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Staff Attendance */}
        <div>
          <button
            onClick={() => toggleSection("staffAttendance")}
            className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Staff Attendance</span>
            </div>
            {expandedSections.staffAttendance ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* My Attendance */}
        <div>
          <button
            onClick={() => toggleSection("myAttendance")}
            className="w-full flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <span className="text-sm">My Attendance</span>
            </div>
            {expandedSections.myAttendance ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Labour Attendance */}
        <div>
          <button
            onClick={() => toggleSection("labourAttendance")}
            className="w-full flex items-center justify-between p-2 text-blue-600 bg-blue-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Labour Attendance</span>
            </div>
            {expandedSections.labourAttendance ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {expandedSections.labourAttendance && (
            <div className="ml-6 mt-2 space-y-1">
              <button className="w-full flex items-center space-x-2 p-2 text-blue-600 bg-blue-50 rounded-lg text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Attendance</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                <UserCheck className="w-4 h-4" />
                <span>Approve Attendance</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                <Clock className="w-4 h-4" />
                <span>Clock In (All +s)</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Clock Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AttendanceSidebar;
