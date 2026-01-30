import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedSplitText from "./AnimatedSplitText";
import { HOME_PAGE_PROJECTS, PROJECTS_DATA, fetchVideoDetails, type Project } from "../data/projectsData";

export const PortfolioNew = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load first 10 projects from PROJECTS_DATA
    const loadProjects = async () => {
      setLoading(true);
      const results: Project[] = [];

      for (const project of HOME_PAGE_PROJECTS) {
        try {
          // Fetch real YouTube video data to get actual title
          const videoData = await fetchVideoDetails(project.videoUrl);
          if (videoData) {
            // Update project with real YouTube title
            const updatedProject = {
              ...project,
              title: videoData.title
            };
            results.push(updatedProject);
          } else {
            results.push(project);
          }
        } catch (error) {
          console.error("Failed to fetch video details:", error);
          results.push(project);
        }
      }
      setProjects(results);
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12 mb-10 lg:mb-40 lg:min-h-[130svh]">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <img
          src="/assets/shapes/Grid 5.png"
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      <div className="text-center mb-16">
        <AnimatedSplitText
          className="max-w-[320px] lg:max-w-4xl mx-auto text-2xl md:text-5xl lg:text-5xl text-white tracking-tight leading-[1.2] mb-6"
          type="lines"
          stagger={0.02}
          duration={1}
          tag="h2"
        >
          Our work
        </AnimatedSplitText>
      </div>
      {loading ? (
        <div className="text-center text-white">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="block cursor-pointer shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-45 lg:h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 rounded-full p-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="white" />
                    </svg>
                  </div>
                </div>
                {/* <div className="absolute top-2 left-2">
                  <span className="bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div> */}
                {/* <div className="absolute top-4 right-4">
                  <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {project.duration}
                  </span>
                </div> */}
              </div>
              <div className="pt-2 lg:pt-4">
                <h2 className="text-xs font-medium mb-2 text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                  {project.title}
                </h2>
                <p className="text-white/70 text-xs lg:text-sm line-clamp-2 mb-2">
                  {project.description}
                </p>
                {/* <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1L10.5 5.5L15.5 6.5L12 10L12.5 15L8 12.5L3.5 15L4 10L0.5 6.5L5.5 5.5L8 1Z" stroke="currentColor" fill="currentColor"/>
                    </svg>
                    <span>{project.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor"/>
                      <path d="M8 4V8L11 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{project.year}</span>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10 lg:mt-20">
        <Link to="/work" className="text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-full border border-white/50  hover:bg-gray-200 transition-colors">
          View More
        </Link>
      </div>
    </div>
  );
};
