<?php
/**
 * Template Name: فروعنا (Branches)
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
$branches = alfa_get_branches();
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh;">
    <div class="alfa-container">
        
        <!-- Header Banner -->
        <div style="text-align:center; max-width:750px; margin:0 auto 4rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:1rem;">شبكة فروع ألفا إكسبريس الرسمية</div>
            <h1 style="font-size:clamp(2rem, 4vw, 3rem); font-weight:900; color:#fff; margin:0 0 1rem;">
                فروعنا في <span style="color:#e30613;">المملكة العربية السعودية (8)</span>
            </h1>
            <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.8;">
                نغطي أهم المدن والمحافظات السعودية من خلال 8 فروع مجهزة لاستقبال الشحنات وتقديم خدمات الفك والتغليف والتوصيل الفوري.
            </p>
        </div>

        <!-- 8 Branches Grid -->
        <div class="alfa-grid-4" style="gap:1.5rem; margin-bottom:4rem;">
            <?php foreach ($branches as $b): ?>
                <div class="alfa-card" style="display:flex; flex-direction:column; justify-content:space-between; padding:1.5rem;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                            <span style="font-size:0.75rem; background:rgba(227,6,19,0.15); color:#ff6b6b; padding:3px 10px; border-radius:8px; font-weight:bold;">
                                <?php echo esc_html($b['city']); ?>
                            </span>
                            <span style="font-size:0.75rem; color:#64748b;">مفتوح يومياً</span>
                        </div>

                        <h3 style="font-size:1.1rem; font-weight:900; color:#fff; margin:0 0 0.5rem;"><?php echo esc_html($b['name']); ?></h3>
                        <p style="font-size:0.8rem; color:#94a3b8; line-height:1.6; margin:0 0 1.25rem;"><?php echo esc_html($b['address']); ?></p>
                    </div>

                    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1rem; display:flex; flex-direction:column; gap:0.5rem;">
                        <a href="tel:<?php echo esc_attr($b['phone']); ?>" class="alfa-btn alfa-btn-outline" style="width:100%; font-size:0.8rem; padding:0.5rem;" dir="ltr">
                            📞 <?php echo esc_html($b['phone']); ?>
                        </a>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
                            <a href="https://wa.me/966<?php echo substr($b['phone'], 1); ?>" target="_blank" class="alfa-btn alfa-btn-whatsapp" style="font-size:0.75rem; padding:0.45rem;">
                                واتساب
                            </a>
                            <a href="<?php echo esc_url($b['maps']); ?>" target="_blank" class="alfa-btn alfa-btn-outline" style="font-size:0.75rem; padding:0.45rem;">
                                الموقع ↗
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
</div>

<?php get_footer(); ?>
