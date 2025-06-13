"use client";

import { ChevronLeft, ChevronRight, Calendar, SquarePen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Project, Team } from "../data/mockData";
import MultiTeamSelect from "./MultiteamSelection";
import { useState } from "react";

interface FilterBarProps {
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedTeam: string;
  setSelectedTeam: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  projects: Project[];
  teams: Team[];
  setSelectedTeams: (value: string[]) => void;
}

const FilterBar = ({
  selectedProject,
  setSelectedProject,
  selectedTeam,
  setSelectedTeam,
  selectedDate,
  setSelectedDate,
  projects,
  teams,
  setSelectedTeams,
}: FilterBarProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const changeDate = (direction: "prev" | "next") => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);

    if (direction === "prev") {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }

    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  const filteredTeams = selectedProject
    ? teams.filter((team) => {
        if (selectedProject === "all") return true;
        return team.projectId === selectedProject;
      })
    : teams;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-center gap-4">
        <div className="flex  items-end sm:flex-row gap-3">
          {/* Project Selector */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Project</label>
            {/* <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <select
                    onChange={() => setSelectedProject(project.id)}
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </select>
                ))}
              </SelectContent>
            </Select> */}
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
              }}
            >
              <option value="">Select</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Team Selector */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Team</label>
            {/* <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>

                {filteredTeams.map((team) => (
                  <select
                    onChange={() => setSelectedTeam(team.id)}
                    key={team.id}
                    value={team.id}
                  >
                    {team.name}
                  </select>
                ))}
              </SelectContent>
            </Select> */}
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedTeam}
              onChange={(e) => {
                setSelectedTeam(e.target.value);
              }}
            >
              <option value="">Select</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="p-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              onClick={() => setIsTooltipVisible(true)}
            >
              <SquarePen />
            </button>
            {isTooltipVisible && (
              <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-md w-full">
                  <MultiTeamSelect
                    toggle={setIsTooltipVisible}
                    teams={teams}
                    setSelected={setSelectedTeams}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date Navigation */}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => changeDate("prev")}
          className="p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white min-w-32 justify-center">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">
            {formatDate(selectedDate)}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => changeDate("next")}
          className="p-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
