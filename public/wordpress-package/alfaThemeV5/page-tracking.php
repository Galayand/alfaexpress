<?php
/**
 * Template Name: تتبع الشحنة (Tracking)
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
$tracking_url = get_option('alfa_tracking_url', 'https://alfaexpress-ksa.com/track');
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh; position:relative; overflow:hidden;">
    <!-- Background Glow -->
    <div style="position:absolute; top:5%; left:50%; transform:translateX(-50%); width:600px; height:300px; background:radial-gradient(circle, rgba(227,6,19,0.12) 0%, transparent 70%); pointer-events:none; z-index:0;"></div>

    <div class="alfa-container" style="max-width:820px; position:relative; z-index:1;">
        
        <!-- Header Banner -->
        <div style="text-align:center; margin-bottom:3rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:1rem;">بوابة الاستعلام والمتابعة المباشرة</div>
            <h1 style="font-size:clamp(2rem, 4vw, 3rem); font-weight:900; color:#fff; margin:0 0 1rem;">
                تتبع <span style="color:#e30613;">شحنتك المباشر</span>
            </h1>
            <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.8; max-width:620px; margin:0 auto;">
                نحرص على إبقائك على اطلاع دائم بموقع وحالة شحنتك منذ استلامها من الفرع وحتى تسليمها لباب المستلم.
            </p>
        </div>

        <!-- NOTIFICATION & SELF-TRACKING DUAL NOTICE (USER REQUIREMENT) -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
            
            <!-- Notice 1: We will send you updates via message -->
            <div style="background:linear-gradient(135deg, #0e1f3d 0%, #0a152b 100%); border:1px solid rgba(56,189,248,0.35); border-radius:1.5rem; padding:1.75rem; text-align:right;">
                <div style="width:42px; height:42px; border-radius:12px; background:rgba(56,189,248,0.15); border:1px solid rgba(56,189,248,0.3); color:#38bdf8; display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:0.85rem;">
                    💬
                </div>
                <h3 style="color:#fff; font-size:1.15rem; font-weight:800; margin:0 0 0.5rem; display:flex; align-items:center; gap:8px;">
                    <span>سنرسل لك رسالة بجميع التحديثات</span>
                </h3>
                <p style="color:#cbd5e1; font-size:0.875rem; line-height:1.7; margin:0;">
                    يقوم نظامنا بإرسال رسائل نصية (SMS) وإشعارات تلقائية عبر الواتساب لإبلاغك فورياً بأي تحديث يطرأ على شحنتك أثناء النقل والتخليص الجمركي وموعد التسليم.
                </p>
            </div>

            <!-- Notice 2: Track it yourself directly via link -->
            <div style="background:linear-gradient(135deg, #1a0f1d 0%, #120a15 100%); border:1px solid rgba(227,6,19,0.35); border-radius:1.5rem; padding:1.75rem; text-align:right; display:flex; flex-col; justify-content:space-between; flex-direction:column;">
                <div>
                    <div style="width:42px; height:42px; border-radius:12px; background:rgba(227,6,19,0.15); border:1px solid rgba(227,6,19,0.3); color:#e30613; display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:0.85rem;">
                        📱
                    </div>
                    <h3 style="color:#fff; font-size:1.15rem; font-weight:800; margin:0 0 0.5rem;">
                        أو تتبعها بنفسك من خلال هذا الرابط
                    </h3>
                    <p style="color:#cbd5e1; font-size:0.875rem; line-height:1.7; margin:0 0 1.25rem;">
                        يمكنك تتبع شحنتك ذاتياً في أي وقت والدخول المباشر إلى سيرفرات البوابة الرقمية:
                    </p>
                </div>
                <a href="<?php echo esc_url($tracking_url); ?>" target="_blank" rel="noopener noreferrer" class="alfa-btn alfa-btn-primary" style="font-size:0.9rem; padding:0.75rem 1.25rem; display:flex; align-items:center; justify-content:space-between; text-decoration:none;">
                    <span>🔍 alfaexpress-ksa.com/track</span>
                    <span>↗</span>
                </a>
            </div>

        </div>

        <!-- Tracking Form Card -->
        <div class="alfa-card" style="padding:2.5rem; margin-bottom:2rem;">
            <form id="alfa-tracking-form" action="<?php echo esc_url($tracking_url); ?>" method="GET" target="_blank">
                <label style="display:block; font-size:0.9rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.75rem;">
                    أدخل رقم بوليصة الشحن أو كود الاستعلام (Waybill No.):
                </label>
                <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                    <input type="text" name="code" id="alfa-tracking-code" class="alfa-input" placeholder="مثال: ALF-2026-8890 أو رقم الجوال" dir="ltr" style="flex:1; min-width:220px;" required>
                    <button type="submit" class="alfa-btn alfa-btn-primary" style="padding:0.85rem 1.75rem; white-space:nowrap;">
                        🔍 تتبع الشحنة الآن
                    </button>
                </div>
            </form>

            <div id="alfa-tracking-result" style="display:none;"></div>
        </div>

        <!-- Direct Tracking System CTA Card -->
        <div style="background:#0b1429; border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:1.75rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1.25rem;">
            <div style="display:flex; align-items:center; gap:1rem;">
                <div style="width:40px; height:40px; border-radius:10px; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); color:#10b981; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                    ✓
                </div>
                <div>
                    <strong style="color:#fff; font-size:1rem; display:block; margin-bottom:0.25rem;">رابط البوابة الرسمية المعتمدة للتتبع الذاتي</strong>
                    <a href="<?php echo esc_url($tracking_url); ?>" target="_blank" style="color:#38bdf8; font-size:0.85rem; text-decoration:underline;" dir="ltr"><?php echo esc_html($tracking_url); ?></a>
                </div>
            </div>
            <a href="<?php echo esc_url($tracking_url); ?>" target="_blank" rel="noopener noreferrer" class="alfa-btn alfa-btn-outline" style="font-size:0.85rem; white-space:nowrap;">
                الانتقال للرابط المباشر ↗
            </a>
        </div>

    </div>
</div>

<?php get_footer(); ?>

