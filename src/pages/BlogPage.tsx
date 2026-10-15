import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Calendar, Clock, ArrowLeft, Tag, User, Sparkles, Send, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { verifiedBlogPosts } from '../data/companyData';
import { BlogPost, CompanyConfig } from '../types';

interface BlogPageProps {
  config: CompanyConfig;
}

export const BlogPage: React.FC<BlogPageProps> = ({ config }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsletterPhone, setNewsletterPhone] = useState('');
  const [subscribedNotice, setSubscribedNotice] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    verifiedBlogPosts.forEach((post) => {
      if (post.category) set.add(post.category);
    });
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return verifiedBlogPosts.filter((post) => {
      const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = verifiedBlogPosts[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterPhone) return;
    setSubscribedNotice(true);
    setTimeout(() => {
      setSubscribedNotice(false);
      setNewsletterPhone('');
    }, 3000);
  };

  return (
    <div className="pt-28 pb-20 bg-[#070d1d] min-h-screen text-slate-100 relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8" aria-label="مسار التنقل">
          <Link to="/" className="hover:text-white transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#e30613] font-bold">المدونة اللوجستية</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#e30613] text-xs font-bold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>المعرفة اللوجستية واللوائح الجمركية</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            مدونة <span className="text-[#e30613]">ألفا إكسبريس للشحن البري</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            مقالات حصرية، نصائح تغليف العفش المنزلي، إرشادات المنافذ البرية والتخليص الجمركي، ودليلك لتوفير تكاليف شحن الأثاث والأجهزة من السعودية إلى مصر.
          </p>
        </div>

        {/* Featured Post Spotlight Banner */}
        {featuredPost && selectedCategory === 'all' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 overflow-hidden shadow-2xl p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#e30613] text-white text-xs font-black shadow-md shadow-red-900/50">
                    مقال مميز
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="hover:text-red-400 transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {featuredPost.tags && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-400"
                      >
                        <Tag className="w-3 h-3 text-[#e30613]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{featuredPost.readTime}</span>
                    {featuredPost.author && <span>• بقلم: {featuredPost.author}</span>}
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-[#e30613] hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-950/50 group"
                  >
                    <span>اقرأ المقال الكامل</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-xs aspect-video sm:aspect-square rounded-2xl bg-slate-950/80 border border-white/10 p-6 flex items-center justify-center">
                  <img
                    src={featuredPost.imageUrl || '/assets/brand/alfa-car.png'}
                    alt={featuredPost.title}
                    className="max-h-40 w-auto object-contain drop-shadow-[0_15px_30px_rgba(227,6,19,0.3)] hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/40'
                    : 'bg-slate-900/80 text-slate-300 border border-white/10 hover:border-white/20'
                }`}
              >
                {cat === 'all' ? 'جميع المقالات' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#e30613]"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post: BlogPost, idx: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl bg-slate-900/70 border border-white/10 hover:border-[#e30613]/50 p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-[#e30613]/10 text-red-400 font-bold border border-[#e30613]/20">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors leading-snug mb-3">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {post.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#e30613] hover:text-red-300 flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <span>قراءة المقال</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-white/10 mb-16">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">لا توجد مقالات مطابقة</h3>
            <p className="text-xs text-slate-400 mb-4">
              لم نعثر على نتائج لبحثك "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
            >
              عرض جميع المقالات
            </button>
          </div>
        )}

        {/* WhatsApp & Newsletter Updates Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/15 text-right flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#e30613] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>نشرة التحديثات الجمركية</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              ابقَ على اطلاع بأحدث قرارات الشحن ومواعيد الرحلات
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              أرسل رقم هاتفك لنوافيك بأهم التنبيهات الجمركية وتحديثات أسعار الشحن الموسمي أولاً بأول.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
            <input
              type="tel"
              value={newsletterPhone}
              onChange={(e) => setNewsletterPhone(e.target.value)}
              placeholder="رقم الواتساب (05xxxxxxxx)"
              dir="ltr"
              className="px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-xs text-right placeholder-slate-500 focus:outline-none focus:border-[#e30613]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#e30613] hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
            >
              {subscribedNotice ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>تم الاشتراك!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>اشتراك مجاني</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
