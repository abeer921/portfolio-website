'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { API_BASE_URL, apiService } from '@/services/apiService';
import MagneticButton from '@/components/ui/MagneticButton';
import ReorderList from '@/components/admin/ReorderList';
import ImageUpload from '@/components/admin/ImageUpload';
import { reorderItems } from '@/services/adminService';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({
    title: '',
    category: 'SaaS Product Design',
    description: '',
    techStack: [],
    problem: '',
    solution: '',
    caseStudy: '',
    designProcess: '',
    images: [''],
    liveDemo: '',
    figma: '',
    github: '',
    client: '',
    duration: '',
    status: 'Completed',
    featured: false,
  });

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleEditClick = (project: any) => {
    setCurrentProject({
      ...project,
      techStack: Array.isArray(project.techStack) ? project.techStack : [],
      images: Array.isArray(project.images) ? project.images : [''],
    });
    setIsEditing(true);
  };

  const handleNewClick = () => {
    setCurrentProject({
      title: '',
      category: 'SaaS Product Design',
      description: '',
      techStack: [],
      problem: '',
      solution: '',
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'],
      liveDemo: '',
      figma: '',
      github: '',
      client: '',
      duration: '',
      status: 'Completed',
      featured: false,
    });
    setIsEditing(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('admin_token');
    const method = currentProject.id ? 'PUT' : 'POST';
    const url = currentProject.id 
      ? `${API_BASE_URL}/projects/${currentProject.id}` 
      : `${API_BASE_URL}/projects`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentProject),
      });

      if (!res.ok) throw new Error();

      toast.success(currentProject.id ? 'Project updated successfully' : 'Project created successfully');
      setIsEditing(false);
      loadProjects();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      toast.success('Project deleted successfully');
      loadProjects();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const handleReorder = async (ordered: any[]) => {
    setProjects(ordered);
    try {
      await reorderItems('projects', ordered.map((p, i) => ({ id: p.id, position: i })));
      toast.success('Project order saved');
    } catch {
      toast.error('Failed to save order');
      loadProjects();
    }
  };

  const addImage = () => {
    setCurrentProject({ ...currentProject, images: [...(currentProject.images || []), ''] });
  };

  const updateImage = (index: number, url: string) => {
    const images = [...(currentProject.images || [])];
    images[index] = url;
    setCurrentProject({ ...currentProject, images });
  };

  const removeImage = (index: number) => {
    const images = (currentProject.images || []).filter((_: string, i: number) => i !== index);
    setCurrentProject({ ...currentProject, images: images.length ? images : [''] });
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <h3 className="font-display font-bold text-white text-base">Manage Projects</h3>
        <MagneticButton
          onClick={handleNewClick}
          className="px-4 py-2 bg-[#8B5CF6] text-black text-xs font-bold uppercase rounded-full flex items-center gap-1.5 shadow-md shadow-[#8B5CF6]/15"
        >
          <Plus className="w-4 h-4" /> Add Project
        </MagneticButton>
      </div>

      {/* Projects List with drag reorder */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl">
        {loading ? (
          <div className="text-center py-10 text-zinc-500 animate-pulse text-xs uppercase">Loading projects...</div>
        ) : (
          <ReorderList
            items={projects}
            onReorder={handleReorder}
            renderItem={(proj) => (
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{proj.title}</p>
                  <p className="text-xs text-zinc-500">{proj.category} · {proj.client || 'Personal'}{proj.featured ? ' · Featured' : ''}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEditClick(proj)} className="p-2 rounded-lg bg-zinc-900 hover:bg-[#8B5CF6]/20 hover:text-[#8B5CF6] text-zinc-400"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(proj.id)} className="p-2 rounded-lg bg-zinc-900 hover:bg-rose-500/20 hover:text-rose-500 text-zinc-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            )}
          />
        )}
      </div>

      {/* Edit/Create Side Drawer/Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-[#09090b] border-l border-zinc-900 h-screen overflow-y-auto p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-6">
                <h4 className="font-display font-bold text-white text-base">
                  {currentProject.id ? 'Edit Project' : 'Create New Project'}
                </h4>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Project Title</label>
                    <input
                      type="text"
                      value={currentProject.title}
                      onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Category</label>
                    <select
                      value={currentProject.category}
                      onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    >
                      <option>SaaS Product Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 font-semibold mb-2 uppercase">Project Description</label>
                  <textarea
                    rows={3}
                    value={currentProject.description}
                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8B5CF6] font-semibold mb-2 uppercase">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(currentProject.techStack) ? currentProject.techStack.join(', ') : ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, techStack: e.target.value.split(',').map((t: string) => t.trim()) })}
                      placeholder="Figma, React, Node"
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Duration (e.g. 2 Months)</label>
                    <input
                      type="text"
                      value={currentProject.duration || ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, duration: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Client Name</label>
                    <input
                      type="text"
                      value={currentProject.client || ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Development Status</label>
                    <select
                      value={currentProject.status}
                      onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    >
                      <option>Completed</option>
                      <option>In Progress</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Figma Link</label>
                    <input
                      type="text"
                      value={currentProject.figma || ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, figma: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">GitHub Link</label>
                    <input
                      type="text"
                      value={currentProject.github || ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Live Demo Link</label>
                    <input
                      type="text"
                      value={currentProject.liveDemo || ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, liveDemo: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-zinc-900 pt-5">
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Problem Description</label>
                    <textarea
                      rows={3}
                      value={currentProject.problem || ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, problem: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 font-semibold mb-2 uppercase">Solution Description</label>
                    <textarea
                      rows={3}
                      value={currentProject.solution || ''}
                      onChange={(e) => setCurrentProject({ ...currentProject, solution: e.target.value })}
                      className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 font-semibold mb-2 uppercase">Case Study</label>
                  <textarea
                    rows={4}
                    value={currentProject.caseStudy || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, caseStudy: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 font-semibold mb-2 uppercase">Design Process</label>
                  <textarea
                    rows={3}
                    value={currentProject.designProcess || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, designProcess: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] transition-all resize-none"
                  />
                </div>

                <div className="border-t border-zinc-900 pt-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-zinc-500 font-semibold uppercase">Project Images</label>
                    <button type="button" onClick={addImage} className="text-[#8B5CF6] text-[10px] font-bold uppercase">+ Add Image</button>
                  </div>
                  {(currentProject.images || ['']).map((img: string, idx: number) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <ImageUpload value={img} onChange={(url) => updateImage(idx, url)} label={`Image ${idx + 1}`} />
                      </div>
                      {(currentProject.images || []).length > 1 && (
                        <button type="button" onClick={() => removeImage(idx)} className="mt-6 p-2 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-zinc-900 pt-5">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={currentProject.featured}
                    onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-zinc-850 text-[#8B5CF6] bg-zinc-900 focus:ring-[#8B5CF6]"
                  />
                  <label htmlFor="featured" className="text-white font-semibold uppercase">Feature on Home Page</label>
                </div>
              </form>
            </div>

            <div className="border-t border-zinc-900 pt-6 mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 font-bold uppercase text-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#C084FC] text-black font-bold uppercase text-[10px] flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
