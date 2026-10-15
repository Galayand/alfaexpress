import React from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { verifiedBlogPosts } from '../../data/companyData';
import { BlogPost } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const BlogSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const previewPosts = verifiedBlogPosts.slice(0, 3);

  return (
    <section id="blog" className={`relative py-24 overflow-hidden transition-colors duration-200 ${isLight ? 'bg-white' : 'bg-[#0b1429]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 ${
            isLight ? 'bg-slate-100 border border-slate-200' : 'bg-white/5 border border-white/10'
          }`}>
            <BookOpen className="w-3.5 h-3.5 text-[#e30613]" />
            <span className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>دليل الشحن والجمارك</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            مدونة <span className="text-[#e30613]">ألفا إكسبريس للشحن البري</span>
          </h2>

          <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            مقالات وإرشادات عملية لشحن الأجهزة الكهربائية، العفش والأثاث، وإجراءات المنافذ الجمركية البرية بين السعودية ومصر.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {previewPosts.map((post: BlogPost, idx: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className={`rounded-3xl border p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                isLight
                  ? 'bg-slate-50 border-slate-200 hover:border-[#e30613]/40 hover:shadow-slate-200/60'
                  : 'bg-slate-900/60 border-white/10 hover:border-[#e30613]/40'
              }`}
            >
              <div>
                <div className={`flex items-center justify-between text-xs mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span className={`px-2.5 py-1 rounded-lg font-bold border ${
                    isLight
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-[#e30613]/10 text-red-400 border-[#e30613]/20'
                  }`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className={`text-base sm:text-lg font-black transition-colors leading-snug mb-3 ${
                  isLight ? 'text-slate-900 group-hover:text-[#e30613]' : 'text-white group-hover:text-red-400'
                }`}>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className={`text-xs leading-relaxed mb-6 line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {post.excerpt}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <div className={`flex items-center gap-1 text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>{post.readTime}</span>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#e30613] hover:text-red-700 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  <span>قراءة المقال</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Blog Posts CTA */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs transition-all hover:scale-105 shadow-xl shadow-red-950/30 group"
          >
            <span>زيارة المدونة وقراءة جميع المقالات واللوائح</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
