'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Calendar, Eye, MessageSquare, ArrowUpRight } from 'lucide-react';
import { apiService } from '@/services/apiService';

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await apiService.getBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const categories = ['All', ...Array.from(new Set(blogs.map((b) => b.category)))];

  useEffect(() => {
    let result = blogs;
    if (activeCategory !== 'All') result = result.filter((b) => b.category === activeCategory);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((b) =>
        b.title.toLowerCase().includes(query) ||
        b.content.toLowerCase().includes(query) ||
        b.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }
    setFilteredBlogs(result);
  }, [activeCategory, searchQuery, blogs]);

  return (
    <div className="min-h-screen bg-theme theme-transition pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <section className="mb-16">
          <h1 className="brand-heading mb-4">Design Insights & Ideas</h1>
          <p className="max-w-2xl text-[var(--muted-foreground)]">
            Writing about interface psychology, design workflows, and bridging design with development.
          </p>
        </section>

        <section className="mb-12 flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === cat ? 'bg-[var(--foreground)] text-[var(--background)]' : 'text-[var(--muted-foreground)] hover:bg-[var(--input)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full border border-[var(--border)] bg-theme theme-transition py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
        </section>

        <section>
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {Array(2).fill(0).map((_, i) => <div key={i} className="h-96 animate-pulse rounded-2xl bg-[var(--surface-muted)]" />)}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <Link href={`/blogs/${blog.id}`}>
                    <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
                      <Image
                        src={blog.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#999]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span>{blog.category}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold group-hover:underline">{blog.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm text-[var(--muted-foreground)]">{blog.content}</p>
                  </Link>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#999]">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{blog.views}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{blog._count?.comments || 0}</span>
                    </div>
                    <Link href={`/blogs/${blog.id}`} className="flex items-center gap-1 font-medium text-[var(--foreground)]">
                      Read <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!loading && filteredBlogs.length === 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-20 text-center text-sm text-[var(--muted-foreground)]">
              No blog posts found.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
