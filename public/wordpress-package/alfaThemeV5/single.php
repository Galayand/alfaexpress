<?php
/**
 * Alfa Express Logistics - Single Post Template
 */
get_header();
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh;">
    <div class="alfa-container" style="max-width:850px;">
        
        <?php while (have_posts()): the_post(); ?>
            <article>
                
                <!-- Category & Date Meta -->
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:1.25rem;">
                    <span style="font-size:0.8rem; background:rgba(227,6,19,0.15); color:#ff6b6b; padding:4px 12px; border-radius:8px; font-weight:bold;">
                        <?php
                        $categories = get_the_category();
                        echo !empty($categories) ? esc_html($categories[0]->name) : 'دليل لوجستي';
                        ?>
                    </span>
                    <span style="font-size:0.8rem; color:#64748b;">نُشر في <?php echo get_the_date('Y/m/d'); ?></span>
                </div>

                <!-- Post Title -->
                <h1 style="font-size:clamp(1.75rem, 4vw, 2.5rem); font-weight:900; color:#fff; line-height:1.4; margin:0 0 1.5rem;">
                    <?php the_title(); ?>
                </h1>

                <!-- Featured Image -->
                <?php if (has_post_thumbnail()): ?>
                    <div style="border-radius:1.5rem; overflow:hidden; margin-bottom:2.5rem; border:1px solid rgba(255,255,255,0.1);">
                        <?php the_post_thumbnail('large', array('style' => 'width:100%; height:auto; display:block;')); ?>
                    </div>
                <?php endif; ?>

                <!-- Post Content -->
                <div style="background:#0b1429; border:1px solid rgba(255,255,255,0.08); border-radius:1.5rem; padding:2.5rem; color:#cbd5e1; font-size:1.05rem; line-height:1.9;">
                    <?php the_content(); ?>
                </div>

                <!-- Share & WhatsApp Dispatch Box -->
                <div style="margin-top:2.5rem; background:rgba(227,6,19,0.08); border:1px solid rgba(227,6,19,0.25); border-radius:1.5rem; padding:2rem; text-align:center;">
                    <h3 style="color:#fff; font-size:1.25rem; font-weight:800; margin:0 0 0.5rem;">هل تخطط لشحن مقتنياتك إلى مصر قريباً؟</h3>
                    <p style="color:#cbd5e1; font-size:0.9rem; margin:0 0 1.5rem;">تواصل مع فريق ألفا إكسبريس في الرياض وجدة ومكة للحصول على أفضل سعر واستلام فوري من الباب.</p>
                    <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
                        <a href="<?php echo esc_url(home_url('/quote')); ?>" class="alfa-btn alfa-btn-primary">
                            طلب عرض سعر فوري
                        </a>
                        <a href="https://wa.me/<?php echo esc_attr(get_option('alfa_whatsapp', '966501653999')); ?>" target="_blank" class="alfa-btn alfa-btn-whatsapp">
                            استشارة عبر واتساب
                        </a>
                    </div>
                </div>

            </article>
        <?php endwhile; ?>

    </div>
</div>

<?php get_footer(); ?>
