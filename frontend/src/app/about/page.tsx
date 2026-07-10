'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ExternalLink } from 'lucide-react';
import { fallbackData } from '@/services/apiService';
import { useCms } from '@/context/CmsContext';

export default function About() {
  const { cms, getContent } = useCms();
  const page = getContent<{
    heroImage?: string;
    heading?: string;
    bio?: string[];
    stats?: { value: string; label: string }[];
    experienceHeading?: string;
    experienceIntro?: string;
    educationHeading?: string;
    certificatesHeading?: string;
    ctaLabel?: string;
  }>('about.page');
  const settings = cms.settings as Record<string, string>;

  const experiences = (cms.experiences as typeof fallbackData.experiences).length
    ? (cms.experiences as typeof fallbackData.experiences)
    : fallbackData.experiences;
  const certificates = (cms.certificates as typeof fallbackData.certificates).length
    ? (cms.certificates as typeof fallbackData.certificates)
    : fallbackData.certificates;
  const education = (cms.education as { degree: string; school: string; duration: string }[]).length
    ? (cms.education as { degree: string; school: string; duration: string }[])
    : [
        { degree: 'Bachelor of Science in Information Technology', school: 'University of Education', duration: '2021 – 2025' },
        { degree: 'Intermediate – Computer Science (ICS)', school: 'Punjab Group of Colleges', duration: '2019 – 2021' },
        { degree: 'Matriculation – Computer Science', school: 'Ali Public School', duration: '2017 – 2019' },
      ];

  const bioParagraphs = Array.isArray(page.bio) ? page.bio : [
    "I am a creative, detail-oriented UI/UX Designer based in Lahore, Pakistan. Holding a Bachelor's degree in Information Technology, I fuse visual design with a technical understanding of the front-end layer.",
    'With experience in Figma prototyping and content design, I focus on constructing unified design languages and bridging the design-to-development handoff smoothly.',
  ];
  const stats = page.stats || [
    { value: '2+', label: 'Years' },
    { value: '4', label: 'Projects' },
    { value: '2+', label: 'Clients' },
  ];

  return (
    <div className="bg-theme theme-transition pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <section className="mb-24 grid gap-16 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
            <Image src={page.heroImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'} alt={settings.brandName || 'Portrait'} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <div>
            <h1 className="brand-heading mb-6">{page.heading || 'About me'}</h1>
            {bioParagraphs.map((para, i) => (
              <p key={i} className={`${i === 0 ? 'mb-6 text-lg leading-relaxed text-[#444]' : 'mb-10 text-[var(--muted-foreground)]'}`}>{para}</p>
            ))}
            <div className="grid grid-cols-3 gap-6 border-y border-[var(--border)] py-8">
              {stats.map((s) => (
                <div key={s.label}><p className="portavia-stat">{s.value}</p><p className="mt-1 text-sm text-[var(--muted-foreground)]">{s.label}</p></div>
              ))}
            </div>
            <div className="mt-8 space-y-2 text-sm">
              <p><span className="text-[#999]">Email:</span> <a href={`mailto:${settings.contactEmail}`} className="hover:underline">{settings.contactEmail}</a></p>
              <p><span className="text-[#999]">Phone:</span> <a href={`tel:${settings.contactPhone?.replace(/\s/g, '')}`} className="hover:underline">{settings.contactPhone}</a></p>
            </div>
          </div>
        </section>

        <section className="mb-24 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="brand-heading mb-4">{page.experienceHeading || 'Experience & Journey'}</h2>
            <p className="text-[var(--muted-foreground)]">{page.experienceIntro || 'A chronicle of my professional work and educational milestones.'}</p>
          </div>
          <div className="lg:col-span-8 space-y-12 border-l border-[var(--border)] pl-8">
            <div>
              <div className="mb-8 flex items-center gap-2 text-sm font-medium">
                <Briefcase className="h-4 w-4" /> Work History
              </div>
              <div className="space-y-10">
                {(experiences).map((exp, idx) => (
                  <div key={exp.id || idx}>
                    <span className="text-xs text-[#999]">{exp.startDate} – {exp.endDate || 'Present'}</span>
                    <h4 className="mt-1 text-lg font-semibold">{exp.role}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">{exp.company} · {exp.location}</p>
                    <ul className="mt-4 list-disc space-y-1 pl-4 text-sm text-[var(--muted-foreground)]">
                      {exp.responsibilities.slice(0, 3).map((r: string, i: number) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-[var(--border)] pt-12">
              <div className="mb-8 flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="h-4 w-4" /> Education
              </div>
              <div className="space-y-8">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <span className="text-xs text-[#999]">{edu.duration}</span>
                    <h4 className="mt-1 font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="brand-heading mb-12">{page.certificatesHeading || 'Certificates & Training'}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="relative aspect-[3/2] bg-[var(--surface-muted)]">
                  <Image src={cert.image || 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&q=80'} alt={cert.title} fill className="object-cover transition group-hover:scale-105" sizes="25vw" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-[#999]">{cert.issueDate}</span>
                  <h3 className="mt-1 text-sm font-semibold">{cert.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{cert.issuer}</p>
                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-medium hover:underline">
                      Verify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="mt-20 text-center">
          <Link href="/contact" className="btn-primary px-8 py-3.5 text-sm">{page.ctaLabel || "Let's work together"}</Link>
        </div>
      </div>
    </div>
  );
}
