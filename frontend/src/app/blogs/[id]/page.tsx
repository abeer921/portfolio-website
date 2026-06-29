'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Calendar, Eye, MessageSquare, ArrowLeft, Send } from 'lucide-react';
import { apiService } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Comment Form States
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadBlog = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBlog(id);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) {
      toast.error('All comment fields are required');
      return;
    }

    try {
      setSubmittingComment(true);
      const newComment = await apiService.submitBlogComment(id, {
        authorName,
        authorEmail,
        content,
      });

      // Update state locally
      setBlog((prev: any) => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])],
      }));

      toast.success('Comment posted successfully');
      setAuthorName('');
      setAuthorEmail('');
      setContent('');
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
        <span className="text-zinc-500 text-sm tracking-wider uppercase font-medium animate-pulse">Loading article...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center gap-6">
        <span className="text-zinc-500 text-sm">Article not found.</span>
        <Link href="/blogs">
          <button className="px-5 py-2.5 rounded-full border border-zinc-800 hover:border-white text-xs font-semibold uppercase text-white transition-colors duration-200">
            Back to blogs
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Background glow spots */}
      <div className="glow-spot top-[15%] left-[20%] opacity-20" />
      <div className="glow-spot bottom-[15%] right-[10%] opacity-20" />

      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-bg opacity-30 z-0 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 md:px-12 relative z-10">
        
        {/* Back Link */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-200 text-sm mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Articles
        </Link>

        {/* ==========================================
            ARTICLE HEADER
            ========================================== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-6 font-mono">
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
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {blog.views} views
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1] mb-8">
            {blog.title}
          </h1>

          <div className="relative aspect-[21/10] w-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900 shadow-2xl">
            <Image
              src={blog.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </section>

        {/* ==========================================
            ARTICLE BODY CONTENT
            ========================================== */}
        <article className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed text-base md:text-lg mb-20 border-b border-zinc-900 pb-16 whitespace-pre-line">
          {blog.content}
        </article>

        {/* ==========================================
            COMMENTS SECTION
            ========================================== */}
        <section className="mb-20">
          <h2 className="font-display font-bold text-2xl text-white mb-8 flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-[#d4af37]" />
            Comments ({blog.comments?.length || 0})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 mb-12">
            <h3 className="font-bold text-sm text-white mb-6 uppercase tracking-wider">Leave a Comment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-zinc-500 text-xs font-semibold mb-2 uppercase">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-850 text-zinc-300 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[#d4af37] transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-500 text-xs font-semibold mb-2 uppercase">Your Email</label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-850 text-zinc-300 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-[#d4af37] transition-colors duration-200"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-zinc-500 text-xs font-semibold mb-2 uppercase">Comment</label>
              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-850 text-zinc-300 px-4 py-3 rounded-xl text-sm outline-none focus:border-[#d4af37] transition-colors duration-200 resize-none"
                required
              />
            </div>

            <MagneticButton
              type="submit"
              disabled={submittingComment}
              className="px-6 py-3 bg-[#d4af37] hover:bg-[#bda02b] text-black text-xs font-bold uppercase rounded-full flex items-center gap-2 transition-colors duration-300"
            >
              {submittingComment ? 'Submitting...' : 'Post Comment'}
              <Send className="w-3.5 h-3.5" />
            </MagneticButton>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment: any) => (
                <div key={comment.id} className="p-6 rounded-xl bg-zinc-950/40 border border-zinc-900/50">
                  <div className="flex justify-between items-center gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">{comment.authorName}</span>
                    <span className="text-zinc-600 font-mono text-[10px]">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{comment.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border border-dashed border-zinc-900 rounded-xl">
                <span className="text-zinc-600 text-xs">No comments posted yet. Be the first!</span>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
