"use client";

import { useState } from "react";
import { Plus, Zap, User, RotateCcw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team, Labour } from "../data/mockData";

interface TeamSectionProps {
  teams: Team[];
  activeTab: string;
  attendanceState?: {
    attendees: string[];
    absentees: string[];
    shiftTimes?: { [labourId: string]: string };
    shiftHours?: { [labourId: string]: string };
  };
  onMarkAttendance: (labourId: string, status: "present" | "absent") => void;
  onRevokeAttendance?: (labourId: string) => void;
  onUpdateShiftHours?: (labourId: string, hours: string) => void;
}

const shiftHours = ["0.25", "0.5", "0.75", "1.25", "1.5", "1.75", "2"];

const TeamSection = ({
  teams,
  activeTab,
  attendanceState,
  onMarkAttendance,
  onRevokeAttendance,
  onUpdateShiftHours,
}: TeamSectionProps) => {
  const [activeAddOptionsId, setActiveAddOptionsId] = useState<string | null>(
    null
  );
  const toggleAddOptions = (labourId: string) => {
    setActiveAddOptionsId((prev) => (prev === labourId ? null : labourId));
  };

  const getFilteredLabours = (teamLabours: Labour[]): Labour[] => {
    if (
      !attendanceState ||
      (!attendanceState.attendees.length && !attendanceState.absentees.length)
    ) {
      // If no attendance state or no attendance marked yet, show all for pending
      return activeTab === "pending" ? teamLabours : [];
    }

    switch (activeTab) {
      case "pending":
        return teamLabours.filter(
          (labour) =>
            !attendanceState.attendees.includes(labour.id) &&
            !attendanceState.absentees.includes(labour.id)
        );
      case "atWork":
        return teamLabours.filter((labour) =>
          attendanceState.attendees.includes(labour.id)
        );
      case "marked":
        return teamLabours.filter(
          (labour) =>
            attendanceState.attendees.includes(labour.id) ||
            attendanceState.absentees.includes(labour.id)
        );
      default:
        return teamLabours;
    }
  };

  const getPresentLabours = (teamLabours: Labour[]): Labour[] => {
    if (!attendanceState) return [];
    return teamLabours.filter((labour) =>
      attendanceState.attendees.includes(labour.id)
    );
  };

  const getAbsentLabours = (teamLabours: Labour[]): Labour[] => {
    if (!attendanceState) return [];
    return teamLabours.filter((labour) =>
      attendanceState.absentees.includes(labour.id)
    );
  };

  const getLabourStatus = (
    labourId: string
  ): "present" | "absent" | "pending" => {
    if (!attendanceState) return "pending";

    if (attendanceState.attendees.includes(labourId)) return "present";
    if (attendanceState.absentees.includes(labourId)) return "absent";
    return "pending";
  };

  const getShiftTime = (labourId: string): string => {
    if (!attendanceState?.shiftTimes?.[labourId]) {
      return new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    return attendanceState.shiftTimes[labourId];
  };

  const getShiftHours = (labourId: string): string => {
    return attendanceState?.shiftHours?.[labourId] || "";
  };

  const handleRevokeAttendance = (labourId: string) => {
    if (onRevokeAttendance) {
      onRevokeAttendance(labourId);
    }
  };

  const handleShiftHoursChange = (labourId: string, hours: string) => {
    if (onUpdateShiftHours) {
      onUpdateShiftHours(labourId, hours);
    }
  };

  const renderLabourItem = (
    labour: Labour,
    showButtons: boolean = true,
    showShiftTime: boolean = false,
    showShiftHours: boolean = false
  ) => {
    const status = getLabourStatus(labour.id);
    const shiftTime = getShiftTime(labour.id);
    const currentShiftHours = getShiftHours(labour.id);

    return (
      <div
        key={labour.id}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <span className="font-medium text-gray-800">{labour.name}</span>
            {showShiftTime && status === "present" && (
              <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3" />
                <span>Started: {shiftTime}</span>
              </div>
            )}
            {showShiftHours && status === "present" && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-600">Shift Hours:</span>

                {shiftHours.map((hour) => {
                  return (
                    <button
                      key={hour}
                      className={` text-black p-2  rounded-xl ${
                        hour == currentShiftHours
                          ? "bg-gray-600 "
                          : "bg-gray-400"
                      } `}
                      onClick={() => handleShiftHoursChange(labour.id, hour)}
                    >
                      {hour}
                    </button>
                  );
                })}
                {/* <Select
                  value={currentShiftHours}
                  onValueChange={(value) =>
                    handleShiftHoursChange(labour.id, value)
                  }
                >
                  <SelectTrigger className="w-20 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftHours.map((hours) => (
                      <SelectItem key={hours} value={hours} className="text-xs">
                        {hours}h
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>
            )}
          </div>
          {activeTab === "marked" && (
            <span className="text-sm text-gray-500">
              ({status === "present" ? "Present" : "Absent"})
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          {showButtons && (
            <>
              <Button
                size="sm"
                variant={status === "present" ? "default" : "outline"}
                onClick={() => onMarkAttendance(labour.id, "present")}
                className={`px-4 py-1 text-xs ${
                  status === "present"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "text-green-600 border-green-300 hover:bg-green-50"
                }`}
              >
                Present
              </Button>
              <Button
                size="sm"
                variant={status === "absent" ? "default" : "outline"}
                onClick={() => onMarkAttendance(labour.id, "absent")}
                className={`px-4 py-1 text-xs ${
                  status === "absent"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "text-red-600 border-red-300 hover:bg-red-50"
                }`}
              >
                Absent
              </Button>
            </>
          )}

          {(activeTab === "atWork" || activeTab === "marked") &&
            status !== "pending" &&
            onRevokeAttendance && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleRevokeAttendance(labour.id)}
                className="px-3 py-1 text-xs text-orange-600 border-orange-300 hover:bg-orange-50"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Revoke
              </Button>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 ">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3"></div>

      {/* Teams */}
      {teams.map((team) => {
        const filteredLabours = getFilteredLabours(team.labours);
        const presentLabours = getPresentLabours(team.labours);
        const absentLabours = getAbsentLabours(team.labours);

        // Determine if team should be shown based on active tab
        let shouldShowTeam = false;

        if (activeTab === "pending") {
          shouldShowTeam = filteredLabours.length > 0;
        } else if (activeTab === "atWork") {
          shouldShowTeam = presentLabours.length > 0;
        } else if (activeTab === "marked") {
          shouldShowTeam =
            presentLabours.length > 0 || absentLabours.length > 0;
        }

        if (!shouldShowTeam) return null;

        return (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200  "
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-blue-600">
                  {team.name}
                </h3>
                <div className="relative">
                  <Button
                    onClick={() => toggleAddOptions(team.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>

                  {activeAddOptionsId === team.id && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm">
                        <User className="w-4 h-4" />
                        New Labour
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4" />
                        Auto Generate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              {activeTab === "pending" && (
                <div className="space-y-3">
                  {filteredLabours.map((labour) =>
                    renderLabourItem(labour, true, false, false)
                  )}
                </div>
              )}

              {activeTab === "atWork" && (
                <div className="space-y-4">
                  {presentLabours.length > 0 && (
                    <div>
                      <div className="bg-green-500 text-white px-4 py-2 rounded-t-lg font-medium text-center">
                        Present ({presentLabours.length})
                      </div>
                      <div className="space-y-3 p-4 bg-green-50 rounded-b-lg">
                        {presentLabours.map((labour) =>
                          renderLabourItem(labour, false, true, true)
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "marked" && (
                <div className="space-y-4">
                  {presentLabours.length > 0 && (
                    <div>
                      <div className="bg-green-500 text-white px-4 py-2 rounded-t-lg font-medium text-center">
                        Present ({presentLabours.length})
                      </div>
                      <div className="space-y-3 p-4 bg-green-50 rounded-b-lg">
                        {presentLabours.map((labour) =>
                          renderLabourItem(labour, false, false, false)
                        )}
                      </div>
                    </div>
                  )}

                  {absentLabours.length > 0 && (
                    <div>
                      <div className="bg-red-500 text-white px-4 py-2 rounded-t-lg font-medium text-center">
                        Absent ({absentLabours.length})
                      </div>
                      <div className="space-y-3 p-4 bg-red-50 rounded-b-lg">
                        {absentLabours.map((labour) =>
                          renderLabourItem(labour, false, false, false)
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {teams.every((team) => {
        const filteredLabours = getFilteredLabours(team.labours);
        const presentLabours = getPresentLabours(team.labours);
        const absentLabours = getAbsentLabours(team.labours);

        let shouldShowTeam = false;

        if (activeTab === "pending") {
          shouldShowTeam = filteredLabours.length > 0;
        } else if (activeTab === "atWork") {
          shouldShowTeam = presentLabours.length > 0;
        } else if (activeTab === "marked") {
          shouldShowTeam =
            presentLabours.length > 0 || absentLabours.length > 0;
        }

        return !shouldShowTeam;
      }) && (
        <div className="text-center py-8 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>
            {activeTab === "pending" && "All labours have been marked"}
            {activeTab === "atWork" && "No labours are currently at work"}
            {activeTab === "marked" && "No attendance has been marked yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamSection;
