export type Project = {
    title: string;
    organization: string;
    location: string;
    period: string;
    details: string[];
    tech: string[];
    githubLink?: string;
};

export type Job = {
    title: string;
    organization: string;
    location: string;
    period: string;
    icon: string;
    bullets?: string[];
    tags?: string[];
};

export type Degree = {
    title: string;
    degree: string;
    school: string;
    location: string;
    period: string;
    icon: string;
    gpa?: string;
    details?: string[];
    coursework?: string[];
};
