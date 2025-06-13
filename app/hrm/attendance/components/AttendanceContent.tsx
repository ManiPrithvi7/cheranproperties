"use client";

import { useState, useEffect } from "react";
import FilterBar from "./Filterbar";
import SummaryCards from "./SummaryCard";
import AttendanceTabs from "./AttendanceTabs";
import TeamSection from "./TeamSelection";
import { mockData, AttendanceState, Labour, Team } from "../data/mockData";

interface ExtendedAttendanceState {
  [date: string]: {
    attendees: string[];
    absentees: string[];
    shiftTimes: { [labourId: string]: string };
    shiftHours: { [labourId: string]: string };
  };
}

const AttendanceContent = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedTeams, setSelectedTeams] = useState<string[]>([""]);
  const [activeTab, setActiveTab] = useState("pending");
  const [attendanceState, setAttendanceState] =
    useState<ExtendedAttendanceState>({});

  // Initialize attendance state for current date
  useEffect(() => {
    if (!attendanceState[selectedDate]) {
      setAttendanceState((prev) => ({
        ...prev,
        [selectedDate]: {
          attendees: [],
          absentees: [],
          shiftTimes: {},
          shiftHours: {},
        },
      }));
    }
  }, [selectedDate, attendanceState]);

  const getFilteredTeams = (): Team[] => {
    let teams = mockData.teams;

    if (selectedProject) {
      teams = teams.filter((team) => team.projectId === selectedProject);
    }

    if (selectedTeam) {
      teams = teams.filter((team) => team.id === selectedTeam);
    }

    if (selectedTeams.length > 0 && !selectedTeams.includes("")) {
      teams = teams.filter((team) => selectedTeams.includes(team.id));
    }
    return teams;
  };

  const getLaboursByStatus = (status: string): Labour[] => {
    const currentState = attendanceState[selectedDate];
    if (!currentState) return [];

    const filteredTeams = getFilteredTeams();
    const allLabours = filteredTeams.flatMap((team) => team.labours);

    switch (status) {
      case "pending":
        return allLabours.filter(
          (labour) =>
            !currentState.attendees.includes(labour.id) &&
            !currentState.absentees.includes(labour.id)
        );
      case "atWork":
        return allLabours.filter((labour) =>
          currentState.attendees.includes(labour.id)
        );
      case "marked":
        return allLabours.filter(
          (labour) =>
            currentState.attendees.includes(labour.id) ||
            currentState.absentees.includes(labour.id)
        );
      default:
        return allLabours;
    }
  };

  const markAttendance = (labourId: string, status: "present" | "absent") => {
    const currentDate = selectedDate;

    setAttendanceState((prev) => {
      const currentState = prev[currentDate] || {
        attendees: [],
        absentees: [],
        shiftTimes: {},
        shiftHours: {},
      };

      // Remove from both arrays first
      const newAttendees = currentState.attendees.filter(
        (id) => id !== labourId
      );
      const newAbsentees = currentState.absentees.filter(
        (id) => id !== labourId
      );
      const newShiftTimes = { ...currentState.shiftTimes };
      const newShiftHours = { ...currentState.shiftHours };

      // Add to appropriate array and set shift time if present
      if (status === "present") {
        newAttendees.push(labourId);
        // Set shift time when marking present (if not already set)
        if (!newShiftTimes[labourId]) {
          newShiftTimes[labourId] = new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }
        // Initialize shift hours to 0.25 if not set
        if (!newShiftHours[labourId]) {
          newShiftHours[labourId] = "0.25";
        }
      } else {
        newAbsentees.push(labourId);
        // Remove shift time and hours when marking absent
        delete newShiftTimes[labourId];
        delete newShiftHours[labourId];
      }

      return {
        ...prev,
        [currentDate]: {
          attendees: newAttendees,
          absentees: newAbsentees,
          shiftTimes: newShiftTimes,
          shiftHours: newShiftHours,
        },
      };
    });
  };

  const updateShiftHours = (labourId: string, hours: string) => {
    const currentDate = selectedDate;

    setAttendanceState((prev) => {
      const currentState = prev[currentDate] || {
        attendees: [],
        absentees: [],
        shiftTimes: {},
        shiftHours: {},
      };

      return {
        ...prev,
        [currentDate]: {
          ...currentState,
          shiftHours: {
            ...currentState.shiftHours,
            [labourId]: hours,
          },
        },
      };
    });
  };

  const revokeAttendance = (labourId: string) => {
    const currentDate = selectedDate;

    setAttendanceState((prev) => {
      const currentState = prev[currentDate] || {
        attendees: [],
        absentees: [],
        shiftTimes: {},
        shiftHours: {},
      };

      // Remove from both arrays, shift times, and shift hours
      const newAttendees = currentState.attendees.filter(
        (id) => id !== labourId
      );
      const newAbsentees = currentState.absentees.filter(
        (id) => id !== labourId
      );
      const newShiftTimes = { ...currentState.shiftTimes };
      const newShiftHours = { ...currentState.shiftHours };
      delete newShiftTimes[labourId];
      delete newShiftHours[labourId];

      return {
        ...prev,
        [currentDate]: {
          attendees: newAttendees,
          absentees: newAbsentees,
          shiftTimes: newShiftTimes,
          shiftHours: newShiftHours,
        },
      };
    });
  };

  const getSummaryCounts = () => {
    const filteredTeams = getFilteredTeams();
    const totalLabours = filteredTeams.reduce(
      (sum, team) => sum + team.labours.length,
      0
    );
    const currentState = attendanceState[selectedDate];

    if (!currentState) {
      return {
        total: totalLabours,
        atWork: 0,
        shifts: 0,
        absent: 0,
      };
    }

    return {
      total: totalLabours,
      atWork: currentState.attendees.length,
      shifts: currentState.attendees.length, // Assuming shifts = at work
      absent: currentState.absentees.length,
    };
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto w-full xl:w-[70%] mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Labour Attendance
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <FilterBar
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            projects={mockData.projects}
            teams={mockData.teams}
            setSelectedTeams={setSelectedTeams}
          />

          <SummaryCards counts={getSummaryCounts()} />

          <AttendanceTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={{
              pending: getLaboursByStatus("pending").length,
              atWork: getLaboursByStatus("atWork").length,
              marked: getLaboursByStatus("marked").length,
            }}
          />

          <TeamSection
            teams={getFilteredTeams()}
            activeTab={activeTab}
            attendanceState={attendanceState[selectedDate]}
            onMarkAttendance={markAttendance}
            onRevokeAttendance={revokeAttendance}
            onUpdateShiftHours={updateShiftHours}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceContent;
