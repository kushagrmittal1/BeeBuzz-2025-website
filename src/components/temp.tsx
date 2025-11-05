   {/* Content Section */}
   <div ref={contentRef} className="max-w-6xl mx-auto px-8 py-20">
  
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
     <div className="lg:col-span-2">
       <h2 className="text-3xl font-bold mb-6">About This Project</h2>
       <p className="text-white/80 text-lg leading-relaxed mb-8">
         {project.longDescription}
       </p>
       
       <div className="grid grid-cols-2 gap-6">
         <div className="bg-white/5 p-6 rounded-lg border border-white/10">
           <h3 className="font-semibold mb-2">Client</h3>
           <p className="text-white/70">{project.client}</p>
         </div>
         <div className="bg-white/5 p-6 rounded-lg border border-white/10">
           <h3 className="font-semibold mb-2">Category</h3>
           <p className="text-white/70">{project.category}</p>
         </div>
         <div className="bg-white/5 p-6 rounded-lg border border-white/10">
           <h3 className="font-semibold mb-2">Duration</h3>
           <p className="text-white/70">{project.duration}</p>
         </div>
         <div className="bg-white/5 p-6 rounded-lg border border-white/10">
           <h3 className="font-semibold mb-2">Views</h3>
           <p className="text-white/70">{project.views}</p>
         </div>
       </div>
     </div>

     <div className="lg:col-span-1">
       <div className="sticky top-8">
         <div className="bg-white/5 p-6 rounded-lg border border-white/10">
           <h3 className="font-semibold mb-4">Project Stats</h3>
           <div className="space-y-4">
             <div className="flex justify-between">
               <span className="text-white/70">Views</span>
               <span className="font-medium">{project.views}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-white/70">Duration</span>
               <span className="font-medium">{project.duration}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-white/70">Year</span>
               <span className="font-medium">{project.year}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-white/70">Category</span>
               <span className="font-medium">{project.category}</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>

   {/* Related Projects */}
   <div className="mb-20">
     <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {relatedProjects.map((relatedProject) => (
         <div
           key={relatedProject.id}
           onClick={() => navigate(`/project/${relatedProject.id}`)}
           className="group cursor-pointer"
         >
           <div className="relative overflow-hidden rounded-lg mb-4">
             <img
               src={relatedProject.thumbnail}
               alt={relatedProject.title}
               className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
             />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <div className="bg-white/20 rounded-full p-3">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                   <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                 </svg>
               </div>
             </div>
           </div>
           <h3 className="font-semibold mb-2 group-hover:text-orange-400 transition-colors">
             {relatedProject.title}
           </h3>
           <p className="text-white/70 text-sm mb-2">{relatedProject.description}</p>
           <div className="flex items-center gap-4 text-xs text-white/50">
             <span>{relatedProject.views} views</span>
             <span>{relatedProject.duration}</span>
             <span>{relatedProject.category}</span>
           </div>
         </div>
       ))}
     </div>
   </div>

   {/* Back to Portfolio */}
   <div className="text-center">
     <button
       onClick={() => navigate("/")}
       className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors border border-white/20"
     >
       Back to Portfolio
     </button>
   </div>
 </div>