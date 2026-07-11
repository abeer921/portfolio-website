'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fallbackData } from '@/services/apiService';
import FeaturedProjectsStack from '@/components/shared/FeaturedProjectsStack';
import { useCms } from '@/context/CmsContext';

const categories = ['All', 'SaaS Product Design'];

export default function Projects() {
  const { cms, loading: cmsLoading } = useCms();
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = (cms.projects as typeof fallbackData.projects).length
    ? (cms.projects as typeof fallbackData.projects)
    : fallbackData.projects;

  useEffect(() => {
    let result = projects;
    if (activeCategory !== 'All') {
      result = result.filter(
        (p) => p.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim()
      );
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.techStack?.some((tech: string) => tech.toLowerCase().includes(query))
      );
    }
    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

  return (
    <div className="min-h-screen theme-transition">
      <div className="mx-auto max-w-7xl px-6 pt-32 sm:px-8 lg:px-12">
        <section className="mb-10">
          <h1 className="featured-stack-heading">All Projects</h1>
          <p className="featured-stack-intro !mb-0">
            A curated selection of SaaS product design work — dashboards, workflows, and
            analytics platforms scroll through as stacked case studies.
          </p>
        </section>

        <section className="mb-6 flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`interactive-cursor rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[var(--foreground)] text-[var(--background)]'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--input)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-[var(--border)] bg-theme py-2.5 pl-11 pr-4 text-sm outline-none theme-transition focus:border-[var(--accent)]"
            />
          </div>
        </section>
      </div>

      {cmsLoading ? (
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <div className="h-[min(62vh,520px)] animate-pulse rounded-[1.75rem] bg-[var(--surface-muted)]" />
        </div>
      ) : filteredProjects.length > 0 ? (
        <FeaturedProjectsStack
          projects={filteredProjects}
          title=""
          intro=""
          showBrowseAll={false}
          className="!border-t-0"
        />
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-20 text-center">
            <span className="text-sm text-[var(--muted-foreground)]">
              No projects matching your search were found.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
