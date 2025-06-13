export interface Labour {
    id: string;
    name: string;
}

export interface Team {
    id: string;
    name: string;
    projectId: string;
    labours: Labour[];
}

export interface Project {
    id: string;
    name: string;
}

export interface AttendanceState {
    [date: string]: {
        attendees: string[];
        absentees: string[];

    };
}

export const mockData = {
    projects: [
        { id: 'project1', name: 'Construction Site A' },
        { id: 'project2', name: 'Infrastructure Project B' },
        { id: 'project3', name: 'Residential Complex C' }
    ],

    teams: [
        {
            id: 'team1',
            name: 'Sakthivel Team (Mason)',
            projectId: 'project1',
            labours: [
                { id: 'labour1', name: 'Labour 1' },
                { id: 'labour2', name: 'Labour 2' },
                { id: 'labour3', name: 'Labour 3' },
                { id: 'labour4', name: 'Labour 4' }
            ]
        },
        {
            id: 'team2',
            name: 'Gokul Team (Painter)',
            projectId: 'project1',
            labours: [
                { id: 'labour5', name: 'Labour 1' },
                { id: 'labour6', name: 'Labour 2' },
                { id: 'labour7', name: 'Labour 3' }
            ]
        },
        {
            id: 'team3',
            name: 'Krish Team (Tiles)',
            projectId: 'project2',
            labours: [
                { id: 'labour8', name: 'Labour 1' }
            ]
        },
        {
            id: 'team4',
            name: 'Steel Fixers Team',
            projectId: 'project2',
            labours: [
                { id: 'labour9', name: 'Labour 1' },
                { id: 'labour10', name: 'Labour 2' },
                { id: 'labour11', name: 'Labour 3' },
                { id: 'labour12', name: 'Labour 4' },
                { id: 'labour13', name: 'Labour 5' }
            ]
        },
        {
            id: 'team5',
            name: 'Electrical Team',
            projectId: 'project3',
            labours: [
                { id: 'labour14', name: 'Labour 1' },
                { id: 'labour15', name: 'Labour 2' }
            ]
        }
    ]
};