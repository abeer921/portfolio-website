'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, Award, Briefcase, Users, Star } from 'lucide-react';
import { apiService, fallbackData } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';
import Marquee from '@/components/ui/Marquee';

export default function Home() {
  const [settings, setSettings] = useState(fallbackData.settings);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [settData, projData, skillData, testData] = await Promise.all([
          apiService.getSettings(),
          apiService.getProjects({ featured: true }),
          apiService.getSkills(),
          apiService.getTestimonials(),
        ]);
        setSettings(settData);
        setProjects(projData.slice(0, 3));
        setSkills(skillData.filter((s) => s.category === 'UI UX').slice(0, 5));
        setTestimonials(testData.slice(0, 2));
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const stats = [
    { number: '6+', label: 'Months Experience', icon: Briefcase },
    { number: '15+', label: 'Successful Projects', icon: Award },
    { number: '10+', label: 'Happy Clients', icon: Users },
  ];

  return (
    <div className="relative pt-32 pb-16 overflow-hidden">
      {/* Decorative Radial Ambient Glows */}
      <div className="glow-spot top-[10%] left-[10%] opacity-40 animate-pulse" />
      <div className="glow-spot bottom-[30%] right-[5%] opacity-30" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-40 z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="min-h-[70vh] flex flex-col justify-center items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 border border-zinc-900 text-xs text-[#d4af37] font-semibold mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
            UI/UX DESIGNER & DEVELOPER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[1.05] text-white max-w-5xl mb-8"
          >
            {settings.heroTitle.split(' ').map((word, i) => {
              const isGold = word.toLowerCase().includes('experiences') || word.toLowerCase().includes('interfaces') || word.toLowerCase().includes('matter.');
              return (
                <span key={i} className={isGold ? 'text-[#d4af37]' : 'text-white'}>
                  {word}{' '}
                </span>
              );
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed mb-12"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/projects">
              <MagneticButton className="px-8 py-4 bg-[#d4af37] hover:bg-[#bda02b] text-black font-semibold rounded-full flex items-center gap-3 transition-colors duration-300 shadow-lg shadow-[#d4af37]/10">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>

            <a href={settings.resumeUrl || '#'} target="_blank" rel="noopener noreferrer">
              <MagneticButton className="px-8 py-4 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white font-medium rounded-full flex items-center gap-3 transition-colors duration-300">
                Download CV
                <Download className="w-4 h-4 text-zinc-400" />
              </MagneticButton>
            </a>
          </motion.div>
        </section>

        {/* ==========================================
            STATS SECTION
            ========================================== */}
        <section className="py-12 border-y border-zinc-900 mb-32 bg-black/20 rounded-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center p-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center mb-4 text-[#d4af37] group-hover:border-[#d4af37] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-display font-black text-5xl text-white mb-2">{stat.number}</span>
                  <span className="text-zinc-500 text-xs tracking-wider uppercase font-medium">{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            FEATURED PROJECTS PREVIEW
            ========================================== */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">SELECTED CREATIVES</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">Latest Work</h2>
            </div>
            <Link href="/projects" className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors duration-200 mt-4 md:mt-0 group">
              Explore All Projects
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900 shadow-xl"
                >
                  {/* Aspect-ratio helper for Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={project.images[0] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      sizes="(max-w-720px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/projects/${project.id}`}>
                        <MagneticButton className="w-12 h-12 rounded-full bg-[#d4af37] text-black flex items-center justify-center">
                          <Eye className="w-5 h-5" />
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-zinc-500 text-xs tracking-wider uppercase font-semibold block mb-2">{project.category}</span>
                    <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech: string, i: number) => (
                        <span key={i} className="text-[10px] tracking-wider uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Loading fallback skeleton
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="rounded-2xl border border-zinc-900 bg-zinc-950/40 h-96 animate-pulse" />
              ))
            )}
          </div>
        </section>

        {/* ==========================================
            SKILLS & EXPERIENCE PREVIEW
            ========================================== */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">TECHNICAL ARSENAL</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight mb-8">Expertise Highlights</h2>
            <p className="text-zinc-400 leading-relaxed mb-10">
              Proficient in wireframing, creating high-fidelity prototypes, and constructing modern, scalable design systems. I combine aesthetic elegance with engineering discipline to construct pixel-perfect experiences.
            </p>

            <div className="space-y-6">
              {(skills.length > 0 ? skills : fallbackData.skills.filter(s => s.category === 'UI UX').slice(0, 4)).map((skill, idx) => (
                <div key={skill.id || idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-zinc-500">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#d4af37] to-white rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/about">
              <MagneticButton className="mt-12 px-6 py-3 border border-zinc-800 hover:border-white text-white rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-300">
                View All Skills
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-950 border border-zinc-900 p-2">
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
              alt="Creative Space"
              fill
              className="object-cover rounded-xl opacity-70 filter saturate-[0.1]"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-[#d4af37] text-2xl font-display font-black tracking-tight mb-2">Abeer Nisar</span>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ==========================================
          SCROLLING MARQUEE
          ========================================== */}
      <section className="mb-32 w-full">
        <Marquee items={['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Web Layouts', 'Visual Hierarchy']} speed="medium" />
      </section>

      {/* ==========================================
          TESTIMONIALS PREVIEW
          ========================================== */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">CLIENT FEEDBACK</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">Kind Words</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(testimonials.length > 0 ? testimonials : fallbackData.testimonials).map((t, idx) => (
              <motion.div
                key={t.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6 text-[#d4af37]">
                    {Array(t.rating || 5).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed mb-8 italic">
                    "{t.review}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-zinc-900/50 pt-6">
                  {t.clientPhoto && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                      <Image src={t.clientPhoto} alt={t.clientName} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-white block text-sm">{t.clientName}</span>
                    <span className="text-zinc-500 text-xs">{t.clientRole}, {t.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
