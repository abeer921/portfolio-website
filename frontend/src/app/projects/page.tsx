'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, ArrowUpRight } from 'lucide-react';
import { apiService, fallbackData } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';

const categories = ['All', 'UI/UX Design', 'Web Design', 'Mobile Design', 'Full Stack Development'];

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiService.getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    let result = projects;

    if (activeCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase().trim() === activeCategory.toLowerCase().trim()
      );
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.techStack.some((tech: string) => tech.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

  return (
    <div className="relative pt-32 pb-24 overflow-hidden min-h-screen">
      {/* Decorative Radial glow spots */}
      <div className="glow-spot top-[10%] left-[20%] opacity-20" />
      <div className="glow-spot bottom-[10%] right-[10%] opacity-30" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <section className="mb-16">
          <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">PROJECT MATRIX</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-6">
            Selected Works<span className="text-[#d4af37]">.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
            A handpicked selection of digital products, client dashboards, interactive prototypes, and web design architectures.
          </p>
        </section>

        {/* Filters & Search Control Bar */}
        <section className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-12 p-4 bg-zinc-950/40 border border-zinc-900/50 rounded-2xl backdrop-blur-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                    : 'text-zinc-500 hover:text-white bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative flex items-center max-w-md w-full md:w-80">
            <Search className="absolute left-4 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project or tech stack..."
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-300 pl-11 pr-4 py-2.5 rounded-full text-sm outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-all duration-300 placeholder:text-zinc-600"
            />
          </div>
        </section>

        {/* Grid List */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="rounded-2xl border border-zinc-900 bg-zinc-950/40 h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    key={project.id}
                    className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900 shadow-xl"
                  >
                    {/* Media Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={project.images[0] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700 brightness-90 group-hover:brightness-100"
                        sizes="(max-w-720px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link href={`/projects/${project.id}`}>
                          <MagneticButton className="px-6 py-3 bg-[#d4af37] text-black text-xs font-semibold rounded-full flex items-center gap-2 shadow-lg">
                            Read Case Study
                            <Eye className="w-3.5 h-3.5" />
                          </MagneticButton>
                        </Link>
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-8">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase block">{project.category}</span>
                        {project.duration && (
                          <span className="text-zinc-600 font-mono text-[10px] tracking-wide uppercase">{project.duration}</span>
                        )}
                      </div>
                      
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2">
                          {project.title}
                          <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </h3>
                      </Link>
                      
                      <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900/50">
                        {project.techStack.map((tech: string, i: number) => (
                          <span key={i} className="text-[10px] tracking-wider uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-zinc-950/20 border border-zinc-900 rounded-2xl">
              <span className="text-zinc-600 text-sm">No projects matching your search criteria were found.</span>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
