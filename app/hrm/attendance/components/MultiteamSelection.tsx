"use client";
import { useState } from "react";

import { Team } from "../data/mockData";

interface Selectprop {
  toggle: (data: boolean) => void;
  teams: Team[];
  setSelected: (value: string[]) => void;
}
const MultiTeamSelect = ({ toggle, teams, setSelected }: Selectprop) => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  const toggleTeamSelection = (team: Team) => {
    setSelectedTeams((prev) =>
      prev.some((t) => t.id === team.id)
        ? prev.filter((t) => t.id !== team.id)
        : [...prev, team]
    );
  };

  const handleApply = () => {
    console.log("Selected Teams:", selectedTeams);

    const teamsIds = selectedTeams.map((team) => team.id);
    setSelected(teamsIds);
    toggle(false);
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md text-gray-900">
      <div className=" flex justify-between">
        <h2 className="text-lg font-semibold mb-4">Select Teams</h2>
        <button
          onClick={() => toggle(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Selected teams preview */}
      <div className="mb-3 min-h-10 border-b pb-2">
        {selectedTeams.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedTeams.map((team) => (
              <span
                key={team.id}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {team.name}
                <button
                  onClick={() => toggleTeamSelection(team)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No teams selected yet</p>
        )}
      </div>

      {/* Team list always visible */}
      <div className="grid gap-2 max-h-80 overflow-y-auto">
        <h1 className="text-lg font-bold">Particular</h1>
        {teams.map((team) => (
          <div
            key={team.id}
            className={`p-3 border rounded-md flex justify-between items-center cursor-pointer ${
              selectedTeams.some((t) => t.id === team.id)
                ? "bg-blue-50 border-blue-300"
                : "hover:bg-gray-50"
            }`}
            onClick={() => toggleTeamSelection(team)}
          >
            <div>
              <p className="font-medium">{team.name}</p>
              {/* <p className="text-sm text-gray-600">{team.specialty}</p> */}
            </div>
            <input
              type="checkbox"
              checked={selectedTeams.some((t) => t.id === team.id)}
              readOnly
              className="h-4 w-4 text-blue-600 rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      <button
        className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleApply}
        disabled={selectedTeams.length === 0}
      >
        Apply
      </button>
    </div>
  );
};

export default MultiTeamSelect;
