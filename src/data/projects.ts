export type ProjectData =  {
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
}

export const projects = [
    
    {
        title: "Discover Streetart",
        description:
            "A fullstack Webapp to discover and upload streetart in your area",
        tags: [
            "Java",
            "Spring boot",
            "Docker",
            "javascript",
            "css",
            "security",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/DiscoverStreetArtWebsite",
    }
    ,
    {
        title: "Vtrace a small ANN hnsw libary",
        description:
            "Implementation and benchmarking of the ANN HNSW algorithm for compact usage and RAG systems",
        tags: [
            "C/C++",
            "Algorithms",
            "Performance",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/VtraceHnswLibary",
    },
    {
        title: "LC-3 virtual machine",
        description:
            "a virtual machine for the LC-3 Cpu architecture",
        tags: [
            "C++",
            "vm",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/LC-3-architecture-VM",
    },
     {
        title: "xv6 extensions",
        description:
            "extension of the systemcalls for xv6: symlink(),clone(),lseek(), started upgrading the filesystem",
        tags: [
            "C",
            "C++",
            "xv6",
            "Kernel",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/xv_6",
    },
    {
        title: "Interactive Portfolio",
        description:
            "A custom Canvas environment with procedural tree generation, autonomous ravens and exclusive perch allocation.",
        tags: [
            "TypeScript",
            "Canvas",
            "Simulation",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/2d-canvasEngine-personalWebsite-",
    },
] satisfies ProjectData[];