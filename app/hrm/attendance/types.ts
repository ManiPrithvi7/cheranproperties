export interface Project {
    id: string;
    projectName: string;
    prjectTeams: Team[];
}
export interface Team {
    id: string;
    teamName: string;
    projectId: string;
    teamMembers: TeamMember[];
}
export interface TeamMember {
    id: string;
    name: string;
    shifts: Shift[];
}
export interface Shift {
    id: string;
    date: string;
    status: boolean;
    periodic?: Periodic;
}

export interface Periodic {
    slot: string,
    status: boolean
}


// More specific types
export type AttendanceStatus = boolean;
export interface AttendanceAction {
    labourId: string;
    teamId: string;
    projectId: string;
    status: AttendanceStatus;
}

export type TeamFilterType = "team" | "project";
export interface TeamFilter {
    type: TeamFilterType;
    projectId?: string;
    teamIds?: string | string[];
}

export interface ShiftProps {
    userId: string;
    time: string;
    projectId: string;
}
export interface ProjectsContextType {
    setDate: (data: string) => void
    currentTeam: Team[];
    setCurrentTeam: (data: Team[]) => void;
    projects: Project[];
    filteredTeams: Team[];
    workingTeams: (Team | null)[];
    notWorkingTeams: (Team | null)[];
    updateAttendance: (action: AttendanceAction) => void;
    filterTeams: (filter: TeamFilter) => void;
    resetTeamsFilter: () => void;
}
