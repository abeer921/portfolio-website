'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Award, GraduationCap, Briefcase, ExternalLink, Heart, Shield, Zap, Sparkles } from 'lucide-react';
import { apiService, fallbackData } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';

export default function About() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const [expData, certData] = await Promise.all([
          apiService.getExperiences(),
          apiService.getCertificates(),
        ]);
        setExperiences(expData);
        setCertificates(certData);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAboutData();
  }, []);

  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'University of Education',
      location: 'Lahore, Pakistan',
      duration: '2021 – 2025',
    },
    {
      degree: 'Intermediate – Computer Science (ICS)',
      school: 'Punjab Group of Colleges',
      location: 'Lahore, Pakistan',
      duration: '2019 – 2021',
    },
    {
      degree: 'Matriculation – Computer Science',
      school: 'Ali Public School',
      location: 'Lahore, Pakistan',
      duration: '2017 – 2019',
    },
  ];

  const values = [
    {
      title: 'Precision Focus',
      description: 'Detail-oriented alignment, structured design system tokens, and grids that guarantee pixel-perfect layout implementation.',
      icon: Zap,
    },
    {
      title: 'User-Centered',
      description: 'Empathy first. Crafting wireframes and flows by testing prototypes and analyzing client feedback to optimize friction.',
      icon: Heart,
    },
    {
      title: 'Ethical Integrity',
      description: 'Clear documentation, honest timelines, collaborative communication, and building clean interfaces.',
      icon: Shield,
    },
    {
      title: 'Luxury Aesthetics',
      description: 'Clean whitespace, elegant typography scale, smooth animations, and high contrast styling that make interfaces feel premium.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Glow highlight */}
      <div className="glow-spot top-[15%] right-[10%] opacity-30" />
      <div className="glow-spot bottom-[15%] left-[5%] opacity-20" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Professional Introduction */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">BIO MATRIX</span>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-8">
                About Abeer Nisar<span className="text-[#d4af37]">.</span>
              </h1>
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                I am a creative, detail-oriented UI/UX Designer and Content Creator based in Lahore, Pakistan. Holding a Bachelor’s degree in Information Technology, I fuse visual design methodologies with a technical understanding of the front-end layer.
              </p>
              <p className="text-zinc-500 text-base leading-relaxed mb-8">
                With a background editing content and building interactive prototypes in Figma, I focus on constructing unified design languages. I bridge the design-to-development handoff smoothly, helping engineering teams implement visual logic cleanly.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-zinc-900 pt-8 mt-12">
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Located In</span>
                  <span className="text-white text-sm font-medium">Lahore, Pakistan</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Education</span>
                  <span className="text-white text-sm font-medium">BS Information Technology</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Availability</span>
                  <span className="text-white text-sm font-medium">Remote & Relocation</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 relative aspect-square md:aspect-[3/4] bg-zinc-950 border border-zinc-900 rounded-2xl p-3 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Abeer Nisar Portrait"
                fill
                className="object-cover rounded-xl grayscale filter saturate-50 opacity-80"
                sizes="(max-w-1024px) 100vw, 33vw"
              />
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">HISTORY TRACKER</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight mb-6">Experience & Journey</h2>
            <p className="text-zinc-500 leading-relaxed max-w-md">
              A comprehensive chronicle of my professional work in design departments and educational milestones at university.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-12 relative border-l border-zinc-900 pl-8 ml-4">
            
            {/* Professional Experiences */}
            <div className="relative">
              <div className="absolute top-[-30px] left-[-42px] w-6 h-6 rounded-full bg-zinc-950 border border-[#d4af37] flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-[#d4af37]" />
              </div>
              <h3 className="text-[#d4af37] text-xs font-semibold tracking-widest uppercase mb-8">Work History</h3>
              
              <div className="space-y-12">
                {(experiences.length > 0 ? experiences : fallbackData.experiences).map((exp, idx) => (
                  <div key={exp.id || idx} className="group relative">
                    <div className="absolute top-1.5 left-[-40px] w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-[#d4af37] transition-colors duration-300" />
                    
                    <span className="text-zinc-500 font-mono text-xs block mb-1">{exp.startDate} – {exp.endDate || 'Present'}</span>
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors duration-300">
                      {exp.role}
                    </h4>
                    <span className="text-zinc-400 text-sm font-medium block mb-4">{exp.company} &bull; {exp.location}</span>
                    
                    <ul className="space-y-2 list-disc list-outside pl-4 text-zinc-500 text-sm leading-relaxed mb-4">
                      {exp.responsibilities.map((resp: string, i: number) => (
                        <li key={i} className="group-hover:text-zinc-400 transition-colors duration-200">{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic History */}
            <div className="relative pt-8 border-t border-zinc-900">
              <div className="absolute top-[8px] left-[-42px] w-6 h-6 rounded-full bg-zinc-950 border border-[#d4af37] flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5 text-[#d4af37]" />
              </div>
              <h3 className="text-[#d4af37] text-xs font-semibold tracking-widest uppercase mb-8">Education</h3>
              
              <div className="space-y-10">
                {education.map((edu, idx) => (
                  <div key={idx} className="group relative">
                    <div className="absolute top-1.5 left-[-40px] w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-[#d4af37] transition-colors duration-300" />
                    <span className="text-zinc-500 font-mono text-xs block mb-1">{edu.duration}</span>
                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors duration-300">
                      {edu.degree}
                    </h4>
                    <span className="text-zinc-500 text-xs font-medium block">{edu.school} &bull; {edu.location}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Values Block */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">GUIDING LIGHTS</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">Core Design Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-3">{v.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certificates & Achievements Grid */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">ACHIEVEMENTS BOARD</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">Certificates & Training</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(certificates.length > 0 ? certificates : fallbackData.certificates).map((cert, idx) => (
              <div key={cert.id || idx} className="group relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900 shadow-xl">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={cert.image || 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&q=80'}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    sizes="(max-w-720px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={cert.credentialUrl || '#'} target="_blank" rel="noopener noreferrer">
                      <MagneticButton className="px-4 py-2 bg-[#d4af37] text-black text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg">
                        Verify Credentials
                        <ExternalLink className="w-3.5 h-3.5" />
                      </MagneticButton>
                    </a>
                  </div>
                </div>
                
                <div className="p-5">
                  <span className="text-zinc-500 font-mono text-[10px] block mb-1">{cert.issueDate}</span>
                  <h3 className="font-bold text-sm text-white mb-2 leading-snug group-hover:text-[#d4af37] transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <span className="text-zinc-500 text-xs block">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
