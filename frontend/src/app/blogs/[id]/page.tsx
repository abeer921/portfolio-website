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
      const newComment = await apiService.submitBlogComment(id, { authorName, authorEmail, content });
      setBlog((prev: any) => ({ ...prev, comments: [newComment, ...(prev.comments || [])] }));
      toast.success('Comment posted successfully');
      setAuthorName(''); setAuthorEmail(''); setContent('');
    } catch {
      toast.error('Failed to post comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-theme theme-transition">
        <span className="text-sm text-[var(--muted-foreground)]">Loading article...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-theme theme-transition">
        <span className="text-sm text-[var(--muted-foreground)]">Article not found.</span>
        <Link href="/blogs" className="btn-secondary px-6 py-3 text-sm">Back to blogs</Link>
      </div>
    );
  }

  return (
    <div className="bg-theme theme-transition pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Link href="/blogs" className="mb-12 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>

        <div className="mb-6 flex items-center gap-3 text-xs text-[#999]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span>{blog.category}</span>
          <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{blog.views}</span>
        </div>

        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">{blog.title}</h1>

        <div className="relative mt-8 aspect-[21/10] overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
          <Image
            src={blog.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <article className="my-12 whitespace-pre-line text-base leading-relaxed text-[#444] md:text-lg">
          {blog.content}
        </article>

        <section className="border-t border-[var(--border)] pt-12">
          <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold">
            <MessageSquare className="h-5 w-5" /> Comments ({blog.comments?.length || 0})
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Your name" className="rounded-xl border border-[var(--border)] bg-theme theme-transition px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)]" required />
              <input type="email" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} placeholder="Your email" className="rounded-xl border border-[var(--border)] bg-theme theme-transition px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)]" required />
            </div>
            <textarea rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Your comment" className="mb-4 w-full resize-none rounded-xl border border-[var(--border)] bg-theme theme-transition px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
            <MagneticButton type="submit" disabled={submittingComment} className="btn-primary px-6 py-3 text-sm">
              {submittingComment ? 'Submitting...' : 'Post Comment'} <Send className="h-3.5 w-3.5" />
            </MagneticButton>
          </form>

          <div className="space-y-4">
            {blog.comments?.length > 0 ? blog.comments.map((comment: any) => (
              <div key={comment.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold">{comment.authorName}</span>
                  <span className="text-xs text-[#999]">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">{comment.content}</p>
              </div>
            )) : (
              <p className="py-8 text-center text-sm text-[#999]">No comments yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
