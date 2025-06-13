import { Project } from "./types";

export const constructionProjects: Project[] = [
    {
        id: "proj-001",
        projectName: "Greenfield Highrise Tower",
        prjectTeams: [
            {
                id: "team-001",
                teamName: "Structural Engineering",
                projectId: "proj-001",
                teamMembers: [
                    {
                        id: "member-001",
                        name: "John Bridges",
                        shifts: [
                            {
                                id: "shift-001",
                                date: "2023-06-01",
                                status: true,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-002",
                teamName: "Electrical Installation",
                projectId: "proj-001",
                teamMembers: [
                    {
                        id: "member-002",
                        name: "Sarah Watts",
                        shifts: [
                            {
                                id: "shift-002",
                                date: "2023-06-01",
                                status: true,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-002",
        projectName: "Harbor Bridge Renovation",
        prjectTeams: [
            {
                id: "team-003",
                teamName: "Demolition Crew",
                projectId: "proj-002",
                teamMembers: [
                    {
                        id: "member-003",
                        name: "Mike Hammer",
                        shifts: [
                            {
                                id: "shift-003",
                                date: "2023-06-02",
                                status: false,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-004",
                teamName: "Concrete Specialists",
                projectId: "proj-002",
                teamMembers: [
                    {
                        id: "member-004",
                        name: "Lisa Mixer",
                        shifts: [
                            {
                                id: "shift-004",
                                date: "2023-06-03",
                                status: true,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-003",
        projectName: "Subway Tunnel Extension",
        prjectTeams: [
            {
                id: "team-005",
                teamName: "Tunneling Crew",
                projectId: "proj-003",
                teamMembers: [
                    {
                        id: "member-005",
                        name: "Carl Digger",
                        shifts: [
                            {
                                id: "shift-005",
                                date: "2023-06-04",
                                status: true,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-006",
                teamName: "Safety Inspectors",
                projectId: "proj-003",
                teamMembers: [
                    {
                        id: "member-006",
                        name: "Olivia Secure",
                        shifts: [
                            {
                                id: "shift-006",
                                date: "2023-06-04",
                                status: true,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-004",
        projectName: "Hospital Complex Construction",
        prjectTeams: [
            {
                id: "team-007",
                teamName: "HVAC Installation",
                projectId: "proj-004",
                teamMembers: [
                    {
                        id: "member-007",
                        name: "Alex Vent",
                        shifts: [
                            {
                                id: "shift-007",
                                date: "2023-06-05",
                                status: false,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-008",
                teamName: "Plumbing Team",
                projectId: "proj-004",
                teamMembers: [
                    {
                        id: "member-008",
                        name: "Sam Pipe",
                        shifts: [
                            {
                                id: "shift-008",
                                date: "2023-06-05",
                                status: false,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-005",
        projectName: "Shopping Mall Renovation",
        prjectTeams: [
            {
                id: "team-001", // Reusing team ID from first project
                teamName: "Structural Engineering",
                projectId: "proj-005",
                teamMembers: [
                    {
                        id: "member-001", // Same engineer working on multiple projects
                        name: "John Bridges",
                        shifts: [
                            {
                                id: "shift-009",
                                date: "2023-06-06",
                                status: false,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-006",
        projectName: "Airport Terminal Expansion",
        prjectTeams: [
            {
                id: "team-002", // Reusing team ID
                teamName: "Electrical Installation",
                projectId: "proj-006",
                teamMembers: [
                    {
                        id: "member-002", // Same electrician
                        name: "Sarah Watts",
                        shifts: [
                            {
                                id: "shift-010",
                                date: "2023-06-07",
                                status: false,

                            }
                        ]
                    },
                    {
                        id: "member-009",
                        name: "Ryan Cable",
                        shifts: [
                            {
                                id: "shift-011",
                                date: "2023-06-07",
                                status: false,

                            }
                        ]
                    }
                ]
            }
        ]
    }
];



export const sampleProjects: Project[] = [
    {
        id: "proj-001",
        projectName: "Greenfield Highrise Tower",
        prjectTeams: [
            {
                id: "team-001",
                teamName: "Structural Engineering",
                projectId: "proj-001",
                teamMembers: [
                    {
                        id: "member-001",
                        name: "John Bridges",
                        shifts: [
                            {
                                id: "shift-001",
                                date: "2023-06-01",
                                status: true,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-002",
                teamName: "Electrical Installation",
                projectId: "proj-001",
                teamMembers: [
                    {
                        id: "member-002",
                        name: "Sarah Watts",
                        shifts: [
                            {
                                id: "shift-002",
                                date: "2023-06-01",
                                status: true,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-002",
        projectName: "Harbor Bridge Renovation",
        prjectTeams: [
            {
                id: "team-003",
                teamName: "Demolition Crew",
                projectId: "proj-002",
                teamMembers: [
                    {
                        id: "member-003",
                        name: "Mike Hammer",
                        shifts: [
                            {
                                id: "shift-003",
                                date: "2023-06-02",
                                status: false,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-004",
                teamName: "Concrete Specialists",
                projectId: "proj-002",
                teamMembers: [
                    {
                        id: "member-004",
                        name: "Lisa Mixer",
                        shifts: [
                            {
                                id: "shift-004",
                                date: "2023-06-03",
                                status: true,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-003",
        projectName: "Subway Tunnel Extension",
        prjectTeams: [
            {
                id: "team-005",
                teamName: "Tunneling Crew",
                projectId: "proj-003",
                teamMembers: [
                    {
                        id: "member-005",
                        name: "Carl Digger",
                        shifts: [
                            {
                                id: "shift-005",
                                date: "2023-06-04",
                                status: true,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-006",
                teamName: "Safety Inspectors",
                projectId: "proj-003",
                teamMembers: [
                    {
                        id: "member-006",
                        name: "Olivia Secure",
                        shifts: [
                            {
                                id: "shift-006",
                                date: "2023-06-04",
                                status: true,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-004",
        projectName: "Hospital Complex Construction",
        prjectTeams: [
            {
                id: "team-007",
                teamName: "HVAC Installation",
                projectId: "proj-004",
                teamMembers: [
                    {
                        id: "member-007",
                        name: "Alex Vent",
                        shifts: [
                            {
                                id: "shift-007",
                                date: "2023-06-05",
                                status: false,

                            }
                        ]
                    }
                ]
            },
            {
                id: "team-008",
                teamName: "Plumbing Team",
                projectId: "proj-004",
                teamMembers: [
                    {
                        id: "member-008",
                        name: "Sam Pipe",
                        shifts: [
                            {
                                id: "shift-008",
                                date: "2023-06-05",
                                status: false,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-005",
        projectName: "Shopping Mall Renovation",
        prjectTeams: [
            {
                id: "team-001", // Reusing team ID from first project
                teamName: "Structural Engineering",
                projectId: "proj-005",
                teamMembers: [
                    {
                        id: "member-001", // Same engineer working on multiple projects
                        name: "John Bridges",
                        shifts: [
                            {
                                id: "shift-009",
                                date: "2023-06-06",
                                status: false,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "proj-006",
        projectName: "Airport Terminal Expansion",
        prjectTeams: [
            {
                id: "team-002", // Reusing team ID
                teamName: "Electrical Installation",
                projectId: "proj-006",
                teamMembers: [
                    {
                        id: "member-002", // Same electrician
                        name: "Sarah Watts",
                        shifts: [
                            {
                                id: "shift-010",
                                date: "2023-06-07",
                                status: false,

                            }
                        ]
                    },
                    {
                        id: "member-009",
                        name: "Ryan Cable",
                        shifts: [
                            {
                                id: "shift-011",
                                date: "2023-06-07",
                                status: false,

                            }
                        ]
                    }
                ]
            }
        ]
    }
];