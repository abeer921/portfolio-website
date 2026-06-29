'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Calendar, Eye, MessageSquare, ArrowRight } from 'lucide-react';
import { apiService, fallbackData } from '@/services/apiService';

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

    if (activeCategory !== 'All') {
      result = result.filter((b) => b.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.content.toLowerCase().includes(query) ||
          b.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredBlogs(result);
  }, [activeCategory, searchQuery, blogs]);

  return (
    <div className="relative pt-32 pb-24 overflow-hidden min-h-screen">
      {/* Background glow spots */}
      <div className="glow-spot top-[10%] right-[10%] opacity-20" />
      <div className="glow-spot bottom-[10%] left-[10%] opacity-20" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <section className="mb-16">
          <span className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase mb-2 block">ARTICLES AND IDEAS</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-6">
            Insights & Musings<span className="text-[#d4af37]">.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
            Writing about interface psychology, design workflows, variable tokens, and bridging design with development.
          </p>
        </section>

        {/* Filters and search bar */}
        <section className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-12 p-4 bg-zinc-950/40 border border-zinc-900/50 rounded-2xl backdrop-blur-sm">
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

          <div className="relative flex items-center w-full md:w-80 max-w-md">
            <Search className="absolute left-4 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-300 pl-11 pr-4 py-2.5 rounded-full text-sm outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-all duration-300 placeholder:text-zinc-600"
            />
          </div>
        </section>

        {/* Blogs Grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array(2).fill(0).map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-zinc-950/40 border border-zinc-900 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={blog.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500 brightness-95"
                        sizes="(max-w-720px) 100vw, 50vw"
                      />
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <span className="text-[#d4af37] font-semibold uppercase">{blog.category}</span>
                      </div>

                      <Link href={`/blogs/${blog.id}`}>
                        <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-[#d4af37] transition-colors duration-300 leading-snug">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                        {blog.content}
                      </p>
                    </div>
                  </div>

                  <div className="px-8 pb-8 flex items-center justify-between border-t border-zinc-900/50 pt-6">
                    <div className="flex items-center gap-4 text-zinc-600 text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {blog.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {blog._count?.comments || 0} comments
                      </span>
                    </div>

                    <Link href={`/blogs/${blog.id}`} className="text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 group-hover:text-[#d4af37] transition-colors duration-200">
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredBlogs.length === 0 && (
            <div className="text-center py-20 bg-zinc-950/20 border border-zinc-900 rounded-2xl">
              <span className="text-zinc-600 text-sm">No blog posts found matching your filters.</span>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
