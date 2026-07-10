'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { apiService } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';

const FigmaIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);


export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadProject = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProject(id);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project detail:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
        <span className="text-zinc-500 text-sm tracking-wider uppercase font-medium animate-pulse">Loading case study...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center gap-6">
        <span className="text-zinc-500 text-sm">Case study not found.</span>
        <Link href="/projects">
          <button className="px-5 py-2.5 rounded-full border border-zinc-800 hover:border-white text-xs font-semibold uppercase text-white transition-colors duration-200">
            Back to projects
          </button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: 'easeOut' }} className="relative pt-32 pb-24 overflow-hidden">
      {/* Glow Highlight */}
      <div className="glow-spot top-[15%] left-[20%] opacity-20" />
      <div className="glow-spot bottom-[15%] right-[10%] opacity-20" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Back Button */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-200 text-sm mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Projects
        </Link>

        {/* ==========================================
            HERO COVER & TITLE
            ========================================== */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-[#8B5CF6] text-xs font-semibold tracking-wider uppercase mb-2 block">{project.category}</span>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
                {project.title}
              </h1>
            </div>
            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3">
              {project.liveDemo && project.liveDemo !== '#' && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <MagneticButton className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#C084FC] text-black text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-md">
                    Live Demo
                    <Globe className="w-3.5 h-3.5" />
                  </MagneticButton>
                </a>
              )}
              {project.figma && (
                <a href={project.figma} target="_blank" rel="noopener noreferrer">
                  <MagneticButton className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white text-xs font-medium rounded-full flex items-center gap-1.5">
                    Figma Mockup
                    <FigmaIcon className="w-3.5 h-3.5 text-pink-500" />
                  </MagneticButton>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <MagneticButton className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white text-xs font-medium rounded-full flex items-center gap-1.5">
                    GitHub Repo
                    <GithubIcon className="w-3.5 h-3.5" />
                  </MagneticButton>
                </a>
              )}
            </div>
          </div>

          {/* Banner cover aspect-ratio */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900 shadow-2xl">
            <Image
              src={project.images[0] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </section>

        {/* ==========================================
            METADATA TABLE CARD
            ========================================== */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-zinc-950 border border-zinc-900 mb-20">
          <div>
            <span className="text-zinc-500 text-[10px] tracking-wider uppercase block mb-1">CLIENT</span>
            <span className="text-white text-sm font-semibold">{project.client || 'Personal Project'}</span>
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] tracking-wider uppercase block mb-1">DURATION</span>
            <span className="text-white text-sm font-semibold">{project.duration || 'N/A'}</span>
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] tracking-wider uppercase block mb-1">STATUS</span>
            <span className="text-white text-sm font-semibold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
              {project.status || 'Completed'}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] tracking-wider uppercase block mb-1">TECH STACK</span>
            <span className="text-white text-xs font-semibold leading-relaxed flex flex-wrap gap-1">
              {project.techStack.join(', ')}
            </span>
          </div>
        </section>

        {/* ==========================================
            PROBLEM & SOLUTION
            ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 border-b border-zinc-900 pb-16">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">The Problem</h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              {project.problem || 'Define the target metrics, user pain points, or requirements that initiated this project.'}
            </p>
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">The Solution</h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              {project.solution || 'Detail how the visual structure, interactive prototype, or code resolved the user challenges.'}
            </p>
          </div>
        </section>

        {/* ==========================================
            CASE STUDY CONTENT & PROCESS
            ========================================== */}
        {(project.caseStudy || project.designProcess) && (
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <span className="text-[#8B5CF6] text-xs font-semibold tracking-wider uppercase mb-2 block">METHODOLOGY</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">Design & Code Process</h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Breaking down the visual and structural roadmap implemented, from competitive analysis to the final screens.
                </p>
                {project.techStack.map((tech: string, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 text-zinc-400 text-xs py-2 border-b border-zinc-900">
                    <CheckCircle className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    {tech}
                  </div>
                ))}
              </div>
              <div className="lg:col-span-8 space-y-12">
                {project.designProcess && (
                  <div>
                    <h3 className="font-bold text-lg text-white mb-4">Design Process</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{project.designProcess}</p>
                  </div>
                )}
                {project.caseStudy && (
                  <div>
                    <h3 className="font-bold text-lg text-white mb-4">Full Case Narrative</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{project.caseStudy}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            MEDIA GALLERY
            ========================================== */}
        {project.images.length > 1 && (
          <section className="mb-24">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-12">Product Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.slice(1).map((imgUrl: string, idx: number) => (
                <div key={idx} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950">
                  <Image src={imgUrl} alt={`Gallery ${idx + 1}`} fill className="object-cover" sizes="(max-w-720px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================
            PREV / NEXT PROJECT NAVIGATION
            ========================================== */}
        {project.navigation && (project.navigation.prev || project.navigation.next) && (
          <section className="border-t border-zinc-900 pt-16 flex justify-between items-center">
            {project.navigation.prev ? (
              <button
                onClick={() => router.push(`/projects/${project.navigation.prev.id}`)}
                className="group flex flex-col items-start gap-2 text-left"
              >
                <span className="text-zinc-600 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" /> PREVIOUS PROJECT
                </span>
                <span className="text-white text-sm md:text-base font-bold group-hover:text-[#8B5CF6] transition-colors duration-200">
                  {project.navigation.prev.title}
                </span>
              </button>
            ) : (
              <div />
            )}

            {project.navigation.next ? (
              <button
                onClick={() => router.push(`/projects/${project.navigation.next.id}`)}
                className="group flex flex-col items-end gap-2 text-right"
              >
                <span className="text-zinc-600 text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1">
                  NEXT PROJECT <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-white text-sm md:text-base font-bold group-hover:text-[#8B5CF6] transition-colors duration-200">
                  {project.navigation.next.title}
                </span>
              </button>
            ) : (
              <div />
            )}
          </section>
        )}

      </div>
    </motion.div>
  );
}
