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
            "A full-stack web application for discovering and uploading street art in the user’s area. The project combines a Spring Boot backend with a browser-based frontend, containerized development and security-related application concerns.",
        tags: [
            "Java",
            "Spring Boot",
            "Docker",
            "javascript",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/DiscoverStreetArtWebsite",
    },
    {
        title: "Vtrace a small ANN hnsw libary",
        description:
            "A compact implementation of the Hierarchical Navigable Small World algorithm for approximate nearest-neighbour search, developed and benchmarked as part of my bachelor’s thesis. The project explores graph-based vector search, implementation trade-offs and potential use in local retrieval and RAG systems.",
        tags: [
            "C/C++",
            "Performance",
            "HNSW",
            "ANN",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/VtraceHnswLibary",
    },
    {
        title: "Interactive Portfolio",
        description:
            "An interactive portfolio built around a custom HTML Canvas environment. It features procedural tree generation, animated ravens, state machines, responsive world geometry and a registry that coordinates the reservation and occupation of branches.",
        tags: [
            "TypeScript",
            "Canvas",
            "Simulation",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/2d-canvasEngine-personalWebsite-",
    },
    {
        title: "LC-3 virtual machine",
        description:
            "A virtual machine for the educational LC-3 computer architecture, implemented in C++. It loads and executes LC-3 programs by emulating memory, registers, instruction decoding, condition flags and system-level trap routines.",
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
            "Extended the xv6 operating system with additional system calls, including symlink(), lseek() and clone(), alongside initial filesystem modifications. The project gave me practical experience with process management, filesystem internals and the boundaries between user space and the kernel.",
        tags: [
            "C",
            "xv6",
            "Kernel",
        ],
        githubUrl:
            "https://github.com/sowashieristjaschoninteressant/xv_6",
    },
] satisfies ProjectData[];