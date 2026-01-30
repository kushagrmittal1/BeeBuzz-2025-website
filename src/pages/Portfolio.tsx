import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSplitText from "../components/AnimatedSplitText";
import SEO from "../components/SEO";
import { ImagePreviewModal } from "../components/ImagePreviewModal";
import {
  PROJECTS_DATA,
  PREPROCESSED_PROJECTS_DATA,
  fetchVideoDetails,
  getProjectWithOrientation,
  type Project,
} from "../data/projectsData";
// Removed GSAP imports as animations are no longer used

const MAIN_CATEGORIES = [
  {
    name: "All Things Content",
    subcategories: [
      "Brand Campaigns",
      "Podcasts",
      "Explainer Videos",
      "Documentary Videos",
      "Short-Form Campaigns",
      "Performance Marketing Campaigns",
      "Product Explainer Films"
      // "Design Statics",
    ],
  },
  {
    name: "3D Films",
    subcategories: [
      // "Product Brand Films",
      // "3D Statics",
    ],
  },
  {
    name: "AI-Led Videos",
    subcategories: [],
  },
  {
    name: "Design",
    subcategories: ["3D Statics", "Statics",],
  },
];

// Cache for video details to avoid repeated API calls
const videoDetailsCache = new Map<string, any>();

export const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>(
    MAIN_CATEGORIES[0].name
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();

  const PROJECTS_PER_PAGE = 24;

  // Skeleton component for loading states
  const ProjectSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-lg mb-4 aspect-video"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
        <div className="h-3 bg-gray-800 rounded w-2/3"></div>
      </div>
    </div>
  );

  // Design skeleton component
  const DesignSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-lg aspect-square"></div>
    </div>
  );

  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Filter by main category
      if (selectedMainCategory && project.category !== selectedMainCategory)
        return false;

      // Filter by subcategory (only if one is selected)
      if (selectedSubCategory && project.subcategory !== selectedSubCategory)
        return false;

      return true;
    });
  }, [projects, selectedMainCategory, selectedSubCategory]);

  // Paginated projects for display with skeleton loading
  const displayedProjects = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * PROJECTS_PER_PAGE;
    const projects = filteredProjects.slice(startIndex, endIndex);

    // Add skeleton items when loading more
    if (loadingMore) {
      const skeletonCount = 6;
      const skeletonItems = Array.from({ length: skeletonCount }, (_, index) => ({
        id: `skeleton-${index}`,
        isSkeleton: true,
        category: selectedMainCategory,
        thumbnail: '',
        title: '',
        description: '',
        videoOrientation: 'horizontal' as const,
      }));
      return [...projects, ...skeletonItems];
    }

    return projects;
  }, [filteredProjects, currentPage, loadingMore, selectedMainCategory]);

  // Only show Load More when there are more filtered projects to display
  const hasMore = useMemo(
    () => currentPage * PROJECTS_PER_PAGE < filteredProjects.length,
    [currentPage, filteredProjects.length]
  );

  // Optimized project loading with caching and batch processing
  const loadProjects = useCallback(async () => {
    setLoading(true);
    const results: Project[] = [];

    // Start with pre-processed data for immediate display
    setProjects(PREPROCESSED_PROJECTS_DATA);
    setLoading(false);

    // Process projects in batches to avoid overwhelming the API
    const batchSize = 10;
    const totalBatches = Math.ceil(PROJECTS_DATA.length / batchSize);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * batchSize;
      const endIndex = Math.min(startIndex + batchSize, PROJECTS_DATA.length);
      const batch = PROJECTS_DATA.slice(startIndex, endIndex);

      // Process batch concurrently
      const batchPromises = batch.map(async (project) => {
        try {
          // Skip API call if project already has a title or if we have cached data
          if (project.title || !project.videoUrl) {
            return getProjectWithOrientation(project);
          }

          // Check cache first
          if (videoDetailsCache.has(project.videoUrl)) {
            const cachedData = videoDetailsCache.get(project.videoUrl);
            return getProjectWithOrientation({
              ...project,
              title: cachedData.title,
            });
          }

          // Fetch video details only if needed
          const videoData = await fetchVideoDetails(project.videoUrl);
          if (videoData) {
            // Cache the result
            videoDetailsCache.set(project.videoUrl, videoData);
            return getProjectWithOrientation({
              ...project,
              title: videoData.title,
            });
          } else {
            return getProjectWithOrientation(project);
          }
        } catch (error) {
          console.error("Failed to fetch video details:", error);
          return getProjectWithOrientation(project);
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Update projects with enhanced data (titles from API)
      setProjects(prev => {
        const updated = [...prev];
        batchResults.forEach((enhancedProject, index) => {
          const originalIndex = startIndex + index;
          if (originalIndex < updated.length) {
            updated[originalIndex] = enhancedProject;
          }
        });
        return updated;
      });

      // Small delay between batches to prevent API rate limiting
      if (batchIndex < totalBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Reset subcategory and pagination when main category changes
  useEffect(() => {
    setSelectedSubCategory(null);
    setCurrentPage(1);
    setLoadingMore(false);
  }, [selectedMainCategory]);

  // Reset pagination when subcategory changes
  useEffect(() => {
    setCurrentPage(1);
    setLoadingMore(false);
  }, [selectedSubCategory]);

  // Load more projects function with better UX
  const loadMoreProjects = useCallback(async () => {
    if (hasMore && !loading && !loadingMore) {
      setLoadingMore(true);

      // Simulate a small delay for better UX (optional)
      await new Promise(resolve => setTimeout(resolve, 300));

      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }
  }, [hasMore, loading, loadingMore]);

  // Handle image preview for design projects
  const handleImageClick = (projectIndex: number) => {
    setSelectedImageIndex(projectIndex);
    setIsImageModalOpen(true);
  };

  // Get images for the modal (only design projects)
  const getDesignImages = useCallback(() => {
    return displayedProjects
      .filter((project) => project.category === "Design" && !('isSkeleton' in project))
      .map((project) => ({
        original: project.thumbnail,
        thumbnail: project.thumbnail,
        description: project.title || `Design Project ${project.id}`,
      }));
  }, [displayedProjects]);

  // Removed GSAP animations for immediate project display

  return (
    <div className="min-h-screen mt-20 bg-black text-white">
      <SEO
        title="Our Work | BeeBuzz"
        description="Explore our portfolio of video production projects including post-production, 3D films, and AI-led videos. See how we help brands create compelling visual content that drives conversions."
        keywords="portfolio, video projects, post production portfolio, 3D animation portfolio, AI video portfolio, brand videos, creative work, BeeBuzz portfolio"
        url="https://beebuzz.co.in/work"
      />
      {/* Hero Section */}
      <div className="relative py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSplitText
              className="max-w-4xl mx-auto text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.2]"
              type="lines"
              stagger={0.02}
              duration={1}
              tag="h1"
            >
              Our Work
            </AnimatedSplitText>
          </div>

          {/* Main Category Filter with Subcategories below */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 relative z-10">
            {MAIN_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedMainCategory(cat.name);
                  setSelectedSubCategory(null);
                }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${selectedMainCategory === cat.name
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20"
                  }`}
                type="button"
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Subcategories for selected main category */}
          {(() => {
            const selectedCat = MAIN_CATEGORIES.find(
              (cat) => cat.name === selectedMainCategory
            );
            if (selectedCat && selectedCat.subcategories.length > 0) {
              return (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <button
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${selectedSubCategory === null
                      ? "bg-orange-500/80 text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
                      }`}
                    onClick={() => setSelectedSubCategory(null)}
                  >
                    All
                  </button>
                  {selectedCat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${selectedSubCategory === sub
                        ? "bg-orange-500/80 text-white"
                        : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
                        }`}
                      onClick={() => setSelectedSubCategory(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              );
            }
            return <div className="mb-8" />; // keep spacing consistent
          })()}

          {/* Show selected subcategory as a pill if any */}
          {/* {selectedSubCategory && (
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center bg-orange-500/80 text-white px-4 py-2 rounded-full text-xs font-medium">
                {selectedSubCategory}
                <button
                  className="ml-2 text-white/80 hover:text-white"
                  onClick={() => setSelectedSubCategory(null)}
                  aria-label="Clear subcategory"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            </div>
          )} */}

          {/* Projects Grid */}
          {loading ? (
            <div
              className={`grid gap-8 ${selectedMainCategory === "Design"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={`initial-skeleton-${index}`}>
                  {selectedMainCategory === "Design" ? (
                    <DesignSkeleton />
                  ) : (
                    <ProjectSkeleton />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              key={`${selectedMainCategory}-${selectedSubCategory}-${currentPage}`}
              className={`grid gap-8 ${selectedMainCategory === "Design"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
            >
              {displayedProjects.map((project, index) => {
                // Render skeleton for loading state
                if ('isSkeleton' in project && project.isSkeleton) {
                  return (
                    <div key={project.id}>
                      {selectedMainCategory === "Design" ? (
                        <DesignSkeleton />
                      ) : (
                        <ProjectSkeleton />
                      )}
                    </div>
                  );
                }

                // Render actual project (type assertion for TypeScript)
                const actualProject = project as Project;
                return (
                  <div
                    key={project.id}
                    className={`project-card cursor-pointer group ${actualProject.videoOrientation === "vertical"
                      ? "sm:col-span-1 lg:col-span-1"
                      : ""
                      }`}
                    onClick={() => {
                      if (actualProject.category === "Design") {
                        handleImageClick(index);
                      } else {
                        navigate(`/project/${actualProject.id}`);
                      }
                    }}
                  >
                    <div
                      className={`relative overflow-hidden rounded-lg mb-4 ${selectedMainCategory === "Design" ? "aspect-square" : ""
                        }`}
                    >
                      <img
                        src={actualProject.thumbnail}
                        alt={actualProject.title || `Project ${actualProject.id}`}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${selectedMainCategory === "Design" ? "h-full" : "h-60"
                          }`}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/20 rounded-full p-4">
                          {actualProject.category === "Design" ? (
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path d="M8 5V19L19 12L8 5Z" fill="white" />
                            </svg>
                          )}
                        </div>
                      </div>
                      {/* Only show badges for non-design projects */}
                      {/* {project.category !== "Design" && (
                        <>
                          <div className="absolute top-4 left-4">
                            <span className="bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                              {project.category}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
                              {project.duration}
                            </span>
                          </div>
                        </>
                      )} */}
                      {/* Vertical video indicator */}
                      {/* {project.videoOrientation === "vertical" && (
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Vertical
                          </span>
                        </div>
                      )} */}
                    </div>
                    {/* Only show text content for non-design projects */}
                    {actualProject.category !== "Design" && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold group-hover:text-orange-400 transition-colors line-clamp-2">
                          {actualProject.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-3">
                          {actualProject.description}
                        </p>
                        {/* <div className="flex items-center justify-between text-xs text-white/50">
                          <div className="flex items-center gap-1">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M8 1L10.5 5.5L15.5 6.5L12 10L12.5 15L8 12.5L3.5 15L4 10L0.5 6.5L5.5 5.5L8 1Z"
                                stroke="currentColor"
                                fill="currentColor"
                              />
                            </svg>
                            <span>{project.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="7"
                                stroke="currentColor"
                              />
                              <path
                                d="M8 4V8L11 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span>{project.year}</span>
                          </div>
                        </div> */}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More Button with Loading State */}
          {!loading && hasMore && filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={loadMoreProjects}
                disabled={loadingMore}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 mx-auto ${loadingMore
                  ? "bg-orange-500/70 text-white/70 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white hover:scale-105"
                  }`}
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading More...
                  </>
                ) : (
                  "Load More Projects"
                )}
              </button>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-white/50 text-lg mb-4">
                No projects found in this category
              </div>
              <button
                onClick={() => {
                  setSelectedMainCategory(MAIN_CATEGORIES[0].name);
                  setSelectedSubCategory(null);
                }}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                View all projects
              </button>
            </div>
          )}

          {/* Stats Section */}
          {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                {projects.length}+
              </div>
              <div className="text-white/70">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                {MAIN_CATEGORIES.length}
              </div>
              <div className="text-white/70">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                100%
              </div>
              <div className="text-white/70">Client Satisfaction</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={getDesignImages()}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
};
