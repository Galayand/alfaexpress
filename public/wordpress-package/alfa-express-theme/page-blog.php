<?php
/**
 * Template Name: المدونة (Blog)
 * Template Post Type: page
 */
get_header();


if ( class_exists( '\Elementor\Plugin' ) && \Elementor\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) {
    echo '<div class="alfa-elementor-content" style="width:100%;">';
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    echo '</div>';
    get_footer();
    exit;
}

// Show edit notice if admin
if ( current_user_can('edit_posts') ) {
    echo '<div style="background:#e30613; color:#fff; padding:15px; text-align:center; font-family:sans-serif; margin-top:20px;">
            <strong>ملاحظة للمدير:</strong> هذه الصفحة تستخدم القالب الافتراضي. لتعديل المحتوى بحرية عبر Elementor، قم بالضغط على "التحرير بواسطة Elementor" من الأعلى واستخدم عناصر (Widgets) الخاصة بقالب ألفا.
          </div>';
}
$args = array(
    'post_type'      => 'post',
    'posts_per_page' => 12,
    'paged'          => get_query_var('paged') ? get_query_var('paged') : 1,
);
$blog_query = new WP_Query($args);
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh;">
    <div class="alfa-container">
        
        <!-- Header Banner -->
        <div style="text-align:center; max-width:750px; margin:0 auto 4rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:1rem;">دليل الشحن واللوائح الجمركية</div>
            <h1 style="font-size:clamp(2rem, 4vw, 3rem); font-weight:900; color:#fff; margin:0 0 1rem;">
                المدونة <span style="color:#e30613;">اللوجستية</span>
            </h1>
            <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.8;">
                إرشادات ونصائح عملية لشحن الأجهزة، الأثاث، وحساب الرسوم الجمركية بين المملكة العربية السعودية ومصر.
            </p>
        </div>

        <!-- Posts Grid -->
        <?php if ($blog_query->have_posts()): ?>
            <div class="alfa-grid-3" style="gap:2rem; margin-bottom:3rem;">
                <?php while ($blog_query->have_posts()): $blog_query->the_post(); ?>
                    <article class="alfa-card" style="display:flex; flex-direction:column; justify-content:space-between; padding:1.75rem;">
                        <div>
                            <?php if (has_post_thumbnail()): ?>
                                <div style="border-radius:1rem; overflow:hidden; margin-bottom:1.25rem; max-height:180px;">
                                    <?php the_post_thumbnail('medium', array('style' => 'width:100%; height:auto; object-fit:cover;')); ?>
                                </div>
                            <?php endif; ?>

                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; font-size:0.75rem;">
                                <span style="color:#ff6b6b; background:rgba(227,6,19,0.12); padding:2px 8px; border-radius:6px; font-weight:bold;">
                                    <?php
                                    $categories = get_the_category();
                                    echo !empty($categories) ? esc_html($categories[0]->name) : 'دليل لوجستي';
                                    ?>
                                </span>
                                <span style="color:#64748b;"><?php echo get_the_date('Y/m/d'); ?></span>
                            </div>

                            <h2 style="font-size:1.15rem; font-weight:900; color:#fff; margin:0 0 0.75rem; line-height:1.5;">
                                <a href="<?php the_permalink(); ?>" style="color:#fff; text-decoration:none;">
                                    <?php the_title(); ?>
                                </a>
                            </h2>

                            <p style="font-size:0.85rem; color:#94a3b8; line-height:1.6; margin-bottom:1.5rem;">
                                <?php echo wp_trim_words(get_the_excerpt(), 18); ?>
                            </p>
                        </div>

                        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1rem; display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:0.75rem; color:#64748b;">⏱ 5 دقائق قراءة</span>
                            <a href="<?php the_permalink(); ?>" style="color:#e30613; font-weight:bold; font-size:0.85rem;">
                                قراءة المقال &larr;
                            </a>
                        </div>
                    </article>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        <?php else: ?>
            <div class="alfa-card" style="text-align:center; padding:3rem;">
                <p style="color:#cbd5e1; font-size:1.1rem; margin:0 0 1rem;">لا توجد مقالات حالياً.</p>
                <p style="color:#64748b; font-size:0.9rem;">يمكنك تشغيل المستورد الشامل من لوحة التحكم لإضافة المقالات التلقائية.</p>
            </div>
        <?php endif; ?>

    </div>
</div>

<?php get_footer(); ?>
