import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  Check,
  Tag,
  BookOpen,
  MessageCircle,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { motion } from 'motion/react';
import { verifiedBlogPosts } from '../data/companyData';
import { CompanyConfig, BlogPost } from '../types';

interface BlogPostPageProps {
  config: CompanyConfig;
  onOpenQuote: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ config, onOpenQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Find matching post by slug or id
  const post: BlogPost | undefined = verifiedBlogPosts.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!post) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#070d1d] text-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">المقال غير موجود</h2>
          <p className="text-xs text-slate-400 mb-6">
            عذراً، لم نتمكن من العثور على المقال المطلوب. قد يكون تم نقله أو تغييره.
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-xl bg-[#e30613] hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى المدونة</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related posts
  const relatedPosts = verifiedBlogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${post.title}\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  // Structured Data Schema for Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: '2026-01-15T08:00:00+03:00',
    dateModified: '2026-02-20T10:00:00+03:00',
    author: {
      '@type': 'Organization',
      name: post.author || 'ألفا إكسبريس للخدمات اللوجستية',
    },
    publisher: {
      '@type': 'Organization',
      name: 'شركة الفاء السريع للخدمات اللوجستية',
      logo: {
        '@type': 'ImageObject',
        url: 'https://alfaexpressco.com/assets/brand/alfa-logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.href,
    },
  };

  return (
    <div className="pt-28 pb-20 bg-[#070d1d] min-h-screen text-slate-100 relative">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8" aria-label="مسار التنقل">
          <Link to="/" className="hover:text-white transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-white transition-colors">
            المدونة
          </Link>
          <span>/</span>
          <span className="text-slate-300 truncate max-w-xs">{post.category}</span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لجميع المقالات</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 text-right">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#e30613]/20 border border-[#e30613]/30 text-red-400 text-xs font-bold">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug tracking-tight mb-6">
            {post.title}
          </h1>

          {post.author && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-bold text-white shadow-md">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">{post.author}</span>
                <span className="text-[11px] text-slate-400">مستشار لوجستي - شركة الفاء السريع</span>
              </div>
            </div>
          )}

          {/* Lead Excerpt Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border-r-4 border-r-[#e30613] border border-white/10 text-slate-200 text-sm leading-relaxed">
            <p className="font-semibold">{post.excerpt}</p>
          </div>
        </header>

        {/* Social Share Bar */}
        <div className="py-3 px-4 rounded-2xl bg-slate-900/60 border border-white/10 mb-10 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-[#e30613]" />
            <span>مشاركة المقال:</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </button>

            <button
              type="button"
              onClick={handleShareTwitter}
              className="px-3 py-1.5 rounded-xl bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>X (تويتر)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
              <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-loose space-y-6 mb-12">
          {post.content ? (
            <div className="space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="text-xl sm:text-2xl font-black text-white pt-4 pb-1 border-b border-white/10"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} className="border-white/10 my-6" />;
                }
                if (paragraph.includes('|')) {
                  return (
                    <div key={index} className="overflow-x-auto my-4">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-300 font-mono">
                        {paragraph}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter((l) => l.startsWith('- '));
                  return (
                    <ul key={index} className="space-y-2 list-disc list-inside text-slate-300 pr-2">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('1. ')) {
                  const items = paragraph.split('\n').filter((l) => /^\d+\./.test(l));
                  return (
                    <ol key={index} className="space-y-2 list-decimal list-inside text-slate-300 pr-2">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-relaxed">
                          {item.replace(/^\d+\.\s*/, '')}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={index} className="text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          ) : (
            <p>{post.excerpt}</p>
          )}

          {/* Tags */}
          {post.tags && (
            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-bold text-slate-400 block mb-3">الوسوم والكلمات المفتاحية:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs"
                  >
                    <Tag className="w-3 h-3 text-[#e30613]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* CTA Quote & Dispatch Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/40 text-right mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>شحن آمن وموثق مع بوليصة رسمية</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                جاهز لشحن أثاثك أو أجهزتك بأمان إلى مصر؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                فريقنا في فروع جدة ومكة والرياض يقدم لك فحصاً وتغليفاً مجانياً مع استلام من باب البيت.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs transition-all text-center shadow-lg shadow-red-950/50"
              >
                احسب تكلفة شحنتك فوراً
              </Link>
              <a
                href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(`السلام عليكم، قرأت مقال "${post.title}" وأود الاستفسار عن الشحن.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white">مقالات ذات صلة قد تهمك:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  to={`/blog/${rPost.slug}`}
                  className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-[#e30613]/40 transition-all group block"
                >
                  <span className="text-[11px] font-bold text-red-400 mb-1 block">
                    {rPost.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-2">
                    {rPost.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    <span>{rPost.readTime}</span>
                    <span className="text-[#e30613] flex items-center gap-1 font-semibold group-hover:gap-1.5 transition-all">
                      قراءة المقال <ChevronLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
