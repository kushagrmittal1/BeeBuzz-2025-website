import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import AnimatedSplitText from "../components/AnimatedSplitText";
import SEO from "../components/SEO";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS_DATA, fetchVideoDetails, getProjectWithOrientation, type Project } from "../data/projectsData";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  videoOrientation?: 'horizontal' | 'vertical';
}

const VideoModal = ({ isOpen, onClose, videoUrl, title, videoOrientation = 'horizontal' }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`relative w-full mx-4 bg-black rounded-lg overflow-hidden ${
          videoOrientation === 'vertical' 
            ? 'max-w-md' // Narrower for vertical videos
            : 'max-w-6xl' // Wider for horizontal videos
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <div className={videoOrientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'}>
          <ReactPlayer
            src={videoUrl}
            width="100%"
            height="100%"
            controls={true}
            playing={isOpen}
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (id) {
        setLoading(true);
        const foundProject = PROJECTS_DATA.find(p => p.id === id);
        if (foundProject) {
          // Fetch real YouTube video data to get actual title
          try {
            const videoData = await fetchVideoDetails(foundProject.videoUrl);
            if (videoData) {
              // Update project with real YouTube title and video orientation
              const updatedProject = {
                ...foundProject,
                title: videoData.title
              };
              setProject(getProjectWithOrientation(updatedProject));
            } else {
              setProject(getProjectWithOrientation(foundProject));
            }
          } catch (error) {
            console.error("Failed to fetch video details:", error);
            setProject(getProjectWithOrientation(foundProject));
          }
          
          // Find related projects from the same client (excluding current project)
          const related = PROJECTS_DATA.filter(p => 
            p.client === foundProject.client && p.id !== foundProject.id
          ).map(p => getProjectWithOrientation(p));
          setRelatedProjects(related);
        } else {
          navigate("/");
        }
        setLoading(false);
      }
    };

    loadProject();
  }, [id, navigate]);

  useGSAP(() => {
    if (project && heroRef.current && contentRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
      
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [project]);

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <div className="text-white">Loading project...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title={`${project.title} - Project | BeeBuzz`}
        description={project.description}
        keywords={`${project.title}, ${project.category}, ${project.client}, video production, BeeBuzz project, ${project.subcategory || ''}`}
        url={`https://beebuzz.co.in/project/${project.id}`}
        image={project.thumbnail}
      />
      {/* Hero Section with Background Video */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <ReactPlayer
            src={project.videoUrl}
            width="100%"
            height="100%"
            playing={true}
            muted={true}
            loop={true}
            controls={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 1,
              opacity: .7,
              objectFit: project.videoOrientation === 'vertical' ? 'cover' : 'cover'
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-8">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium border border-orange-500/30">
                {project.category}
              </span>
            </div>
            
            <AnimatedSplitText
              className="text-2xl md:text-4xl font-bold mb-6 leading-tight"
              type="lines"
              stagger={0.02}
              duration={1}
              tag="h1"
            >
              {project.title}
            </AnimatedSplitText>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {project.description}
            </p>

            {/* <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L10.5 5.5L15.5 6.5L12 10L12.5 15L8 12.5L3.5 15L4 10L0.5 6.5L5.5 5.5L8 1Z" stroke="currentColor" fill="currentColor"/>
                </svg>
                <span>{project.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor"/>
                  <path d="M8 4V8L11 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1C11.866 1 15 4.134 15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1Z" stroke="currentColor"/>
                  <path d="M8 4V8L11 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{project.year}</span>
              </div>
            </div> */}

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.25 4.375L13.75 10L6.25 15.625V4.375Z" fill="currentColor"/>
              </svg>
              Play Full Video
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <div ref={contentRef} className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <AnimatedSplitText
                className="text-2xl md:text-4xl font-bold mb-4"
                type="lines"
                stagger={0.02}
                duration={1}
                tag="h2"
              >
                {`More from ${project.client}`}
              </AnimatedSplitText>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Explore other projects we've created for {project.client}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <div
                  key={relatedProject.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/project/${relatedProject.id}`)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={relatedProject.thumbnail}
                      alt={relatedProject.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        relatedProject.videoOrientation === 'vertical' 
                          ? 'h-80 sm:h-96' // Taller for vertical videos
                          : 'h-64' // Standard height for horizontal videos
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 rounded-full p-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {relatedProject.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {relatedProject.duration}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold group-hover:text-orange-400 transition-colors line-clamp-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-3">
                      {relatedProject.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L10.5 5.5L15.5 6.5L12 10L12.5 15L8 12.5L3.5 15L4 10L0.5 6.5L5.5 5.5L8 1Z" stroke="currentColor" fill="currentColor"/>
                        </svg>
                        <span>{relatedProject.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="currentColor"/>
                          <path d="M8 4V8L11 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>{relatedProject.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Portfolio Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/work')}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors border border-white/20"
              >
                View All Projects
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={project.videoUrl}
        title={project.title}
        videoOrientation={project.videoOrientation}
      />
    </div>
  );
}

