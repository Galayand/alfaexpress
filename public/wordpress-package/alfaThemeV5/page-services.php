<?php
/**
 * Template Name: خدمات الشحن (Services)
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

$services = alfa_get_services();
$whatsapp_num = get_option('alfa_whatsapp', '966501653999');
$main_phone = get_option('alfa_main_phone', '0501653999');

function alfa_get_service_icon_svg($icon) {
    switch ($icon) {
        case 'Truck':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>';
        case 'Box':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>';
        case 'PackageCheck':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>';
        case 'ShieldCheck':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>';
        case 'Zap':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>';
        case 'FileCheck2':
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3 15 2 2 4-4"/></svg>';
        default:
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>';
    }
}
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh; position:relative; overflow:hidden;">
    <!-- Decorative Glow -->
    <div style="position:absolute; top:20px; left:50%; transform:translateX(-50%); width:100%; max-width:1100px; height:320px; background:radial-gradient(circle, rgba(227,6,19,0.12) 0%, transparent 70%); pointer-events:none; z-index:0;"></div>

    <div class="alfa-container" style="position:relative; z-index:1;">
        
        <!-- Breadcrumb Navigation -->
        <nav style="display:flex; align-items:center; gap:0.5rem; font-size:0.75rem; color:#94a3b8; margin-bottom:2rem;" aria-label="مسار التنقل">
            <a href="<?php echo esc_url(home_url('/')); ?>" style="color:#cbd5e1; text-decoration:none;">الرئيسية</a>
            <span>/</span>
            <span style="color:#e30613; font-weight:bold;">خدمات الشحن البري الدولي</span>
        </nav>

        <!-- Header Banner -->
        <div style="text-align:center; max-width:850px; margin:0 auto 3rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:1rem; display:inline-flex; align-items:center; gap:0.4rem;">
                <span>🚚</span>
                <span>أسطول الشحن البري المتكامل</span>
            </div>
            <h1 style="font-size:clamp(2rem, 4.5vw, 3.2rem); font-weight:900; color:#fff; margin:0 0 1rem; line-height:1.2;">
                خدمات الشحن البري <span style="color:#e30613;">من السعودية إلى مصر</span>
            </h1>
            <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.8; margin-bottom:1.5rem;">
                حلول شحن بري متخصصة لنقل الأثاث والعفش المنزلي، الأغراض الشخصية، البضائع التجارية، والأجهزة الكهربائية بأعلى درجات الأمان والالتزام بالمواعيد من الباب للباب.
            </p>
            
            <!-- Trust Ribbon -->
            <div style="display:inline-flex; flex-wrap:wrap; justify-content:center; gap:0.75rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:999px; padding:0.5rem 1.25rem; font-size:0.75rem; color:#cbd5e1;">
                <span style="color:#34d399;">✓ أسطول شاحنات مبطنة وتريلات</span>
                <span style="color:rgba(255,255,255,0.2);">|</span>
                <span style="color:#34d399;">✓ فك وتغليف وتركيب شامل</span>
                <span style="color:rgba(255,255,255,0.2);">|</span>
                <span style="color:#34d399;">✓ تسليم لكافة قرى ومحافظات مصر</span>
                <span style="color:rgba(255,255,255,0.2);">|</span>
                <span style="color:#34d399;">✓ تخليص بميناء ضبا وسفاجا</span>
            </div>
        </div>

        <!-- Services Detailed Grid -->
        <div class="alfa-grid-3" style="gap:2rem; margin-bottom:4rem;">
            <?php foreach ($services as $srv): ?>
                <div class="alfa-card" style="display:flex; flex-direction:column; justify-content:space-between; border-radius:1.5rem; padding:1.75rem; background:rgba(15,23,42,0.85); border:1px solid rgba(255,255,255,0.1); box-shadow:0 15px 30px rgba(0,0,0,0.3); transition:all 0.3s ease;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
                            <div style="width:48px; height:48px; border-radius:14px; background:linear-gradient(135deg, #e30613 0%, #b8000b 100%); color:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 16px rgba(227,6,19,0.35);">
                                <?php echo alfa_get_service_icon_svg(isset($srv['icon']) ? $srv['icon'] : 'Truck'); ?>
                            </div>
                            <?php if (!empty($srv['badge'])): ?>
                                <span style="font-size:0.7rem; font-weight:bold; background:rgba(245,158,11,0.15); color:#fbbf24; border:1px solid rgba(245,158,11,0.3); border-radius:999px; padding:0.25rem 0.65rem;">
                                    <?php echo esc_html($srv['badge']); ?>
                                </span>
                            <?php endif; ?>
                        </div>

                        <h2 style="font-size:1.25rem; font-weight:900; color:#fff; margin:0 0 0.35rem; line-height:1.4;">
                            <?php echo esc_html($srv['title']); ?>
                        </h2>
                        <?php if (!empty($srv['subtitle'])): ?>
                            <span style="font-size:0.75rem; color:#f87171; font-weight:bold; display:block; margin-bottom:0.75rem;">
                                <?php echo esc_html($srv['subtitle']); ?>
                            </span>
                        <?php endif; ?>

                        <p style="font-size:0.85rem; color:#cbd5e1; line-height:1.7; margin-bottom:1.25rem;">
                            <?php echo esc_html($srv['desc']); ?>
                        </p>
                        
                        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1rem; margin-bottom:1.5rem;">
                            <strong style="color:#fff; font-size:0.8rem; display:block; margin-bottom:0.5rem;">أبرز مزايا الشحن البري:</strong>
                            <ul style="list-style:none; padding:0; margin:0; font-size:0.75rem; color:#cbd5e1; line-height:1.9;">
                                <?php foreach ($srv['features'] as $feat): ?>
                                    <li style="display:flex; align-items:center; gap:0.4rem;">
                                        <span style="color:#10b981; font-weight:bold;">✔</span>
                                        <span><?php echo esc_html($feat); ?></span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>

                    <div style="display:flex; gap:0.5rem; align-items:center;">
                        <a href="<?php echo esc_url(home_url('/quote?service=' . rawurlencode($srv['title']))); ?>" class="alfa-btn alfa-btn-primary" style="flex:1; font-size:0.8rem; padding:0.65rem 0.75rem; text-align:center; text-decoration:none;">
                            طلب تسعيرة &larr;
                        </a>
                        <a href="https://wa.me/<?php echo esc_attr($whatsapp_num); ?>?text=<?php echo rawurlencode('السلام عليكم، أود الاستفسار عن خدمة (' . $srv['title'] . ') للشحن البري إلى مصر'); ?>" target="_blank" rel="noopener noreferrer" class="alfa-btn alfa-btn-whatsapp" style="padding:0.65rem 0.85rem; font-size:0.8rem; display:flex; align-items:center; justify-content:center;" title="استفسار واتساب فوري">
                            💬 واتساب
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Call to Action Banner -->
        <div style="background:linear-gradient(135deg, #0b1429 0%, #16223f 100%); border:1px solid rgba(255,255,255,0.12); border-radius:1.75rem; padding:2.5rem 2rem; display:flex; flex-direction:column; sm:flex-direction:row; align-items:center; justify-content:space-between; gap:1.5rem; text-align:center;">
            <div style="max-width:650px; text-align:right;">
                <h3 style="font-size:1.4rem; font-weight:900; color:#fff; margin:0 0 0.5rem;">هل لديك استفسار خاص عن شحنتك البرية؟</h3>
                <p style="color:#cbd5e1; font-size:0.85rem; line-height:1.7; margin:0;">
                    فريقنا اللوجستي جاهز للرد على كافة استفساراتكم المتعلقة بحجم الشاحنات، أساليب التغليف، وتفاصيل التخليص الجمركي على مدار الساعة.
                </p>
            </div>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center;">
                <a href="tel:<?php echo esc_attr($main_phone); ?>" class="alfa-btn alfa-btn-outline" dir="ltr" style="font-size:0.85rem; padding:0.65rem 1.25rem;">
                    📞 <?php echo esc_html($main_phone); ?>
                </a>
                <a href="https://wa.me/<?php echo esc_attr($whatsapp_num); ?>?text=<?php echo rawurlencode('السلام عليكم، أود استشارة لوجستية للشحن البري من السعودية إلى مصر'); ?>" target="_blank" rel="noopener noreferrer" class="alfa-btn alfa-btn-whatsapp" style="font-size:0.85rem; padding:0.65rem 1.25rem;">
                    💬 واتساب مباشر
                </a>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>

