<?php
/**
 * Shortcodes for Alfa Express Core WordPress Plugin
 * Provides shortcodes for:
 * [alfa_3d_hero] - Renders the 3D Interactive Hero Canvas
 * [alfa_quote_calculator] - Renders the instant quote calculator
 * [alfa_branches_grid] - Renders the 8 verified branches
 * [alfa_faq_list] - Renders the FAQ accordion with Schema.org JSON-LD
 * [alfa_blog_cards] - Renders the logistics blog guides grid
 * [alfa_track_button] - Renders the direct tracking modal button
 */

if (!defined('ABSPATH')) exit;

// 1. [alfa_3d_hero] Shortcode
add_shortcode('alfa_3d_hero', 'alfa_render_3d_hero_shortcode');
function alfa_render_3d_hero_shortcode($atts) {
    ob_start();
    ?>
    <div class="alfa-3d-hero-wrapper" dir="rtl" style="position:relative; width:100%; min-height:550px; background:#070d1d; border-radius:24px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
        <div id="alfa-3d-hero-canvas" class="alfa-3d-hero-container" style="width:100%; height:550px;"></div>
        <div style="position:absolute; bottom:20px; right:20px; background:rgba(11,20,41,0.85); backdrop-filter:blur(8px); padding:10px 18px; border-radius:14px; border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:13px; display:flex; align-items:center; gap:8px;">
            <span style="width:8px; height:8px; border-radius:50%; background:#e30613; display:inline-block;"></span>
            <span>شحن بري - بحري - جوي | من الباب للباب</span>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// 2. [alfa_branches_grid] Shortcode
add_shortcode('alfa_branches_grid', 'alfa_render_branches_shortcode');
function alfa_render_branches_shortcode($atts) {
    $branches = array(
        array('city' => 'جدة', 'name' => 'فرع جدة - البوادي', 'phone' => '0580906241', 'address' => 'حي البوادي - شارع قريش - جدة'),
        array('city' => 'جدة', 'name' => 'فرع جدة - السلامة', 'phone' => '0591627623', 'address' => 'حي السلامة - شارع صقر قريش - جدة'),
        array('city' => 'جدة', 'name' => 'فرع جدة - الفيصلية (الرئيسي)', 'phone' => '0509133390', 'address' => '4275 الروضة - حي الفيصلية - جدة'),
        array('city' => 'جدة', 'name' => 'فرع جدة - الشرفية', 'phone' => '0578710493', 'address' => 'حي الشرفية - طريق المدينة المنورة - جدة'),
        array('city' => 'جدة', 'name' => 'فرع جدة - الربوة', 'phone' => '0539595508', 'address' => 'حي الربوة - شارع حراء - جدة'),
        array('city' => 'مكة المكرمة', 'name' => 'فرع مكة المكرمة', 'phone' => '0567133390', 'address' => 'مكة المكرمة - مخطط الشوقية / الرصيفة'),
        array('city' => 'الرياض', 'name' => 'فرع الرياض - العزيزية', 'phone' => '0539595799', 'address' => 'حي العزيزية - طريق النصر - الرياض'),
        array('city' => 'الرياض', 'name' => 'فرع الرياض - الملز', 'phone' => '0539595117', 'address' => 'حي الملز - شارع صلاح الدين الأيوبي - الرياض'),
    );

    ob_start();
    ?>
    <div class="alfa-branches-grid" dir="rtl" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin:30px 0;">
        <?php foreach ($branches as $b): ?>
            <div style="background:#0b1429; border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:20px; color:#fff; text-align:right;">
                <span style="font-size:11px; background:rgba(227,6,19,0.15); color:#ff6b6b; padding:4px 10px; border-radius:8px; font-weight:bold; display:inline-block; margin-bottom:10px;">
                    <?php echo esc_html($b['city']); ?>
                </span>
                <h4 style="font-size:16px; margin:0 0 8px; color:#fff;"><?php echo esc_html($b['name']); ?></h4>
                <p style="font-size:12px; color:#94a3b8; margin:0 0 12px; line-height:1.6;"><?php echo esc_html($b['address']); ?></p>
                <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
                    <a href="tel:<?php echo esc_attr($b['phone']); ?>" style="color:#fff; font-size:13px; text-decoration:none; font-weight:bold; font-family:monospace;" dir="ltr"><?php echo esc_html($b['phone']); ?></a>
                    <a href="https://wa.me/966<?php echo substr($b['phone'], 1); ?>" target="_blank" style="background:#25D366; color:#fff; padding:6px 14px; border-radius:10px; font-size:12px; text-decoration:none; font-weight:bold;">واتساب</a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}

// 3. [alfa_faq_list] Shortcode
add_shortcode('alfa_faq_list', 'alfa_render_faq_shortcode');
function alfa_render_faq_shortcode($atts) {
    $faqs = array(
        array('q' => 'ما هي مدة الشحن من السعودية إلى مصر؟', 'a' => 'الشحن الجوي يستغرق بين 3 إلى 7 أيام عمل، بينما الشحن البحري والبري يتراوح بين 10 إلى 20 يوماً وصولاً لباب منزلك في كافة المحافظات.'),
        array('q' => 'هل توفرون خدمة التغليف والفك بالمنازل؟', 'a' => 'نعم، نوفر فنيين ونجارين لفك العفش وتغليفه بطبقات حماية ثلاثية وصناديق خشبية للشاشات والأجهزة الحساسة.'),
        array('q' => 'ما هي الأوراق المطلوبة للشحن والتخليص الجمركي؟', 'a' => 'صورة جواز السفر أو الرقم القومي للمستلم، وصورة هوية أو إقامة المرسل وقائمة تقريبية بالمحتويات.'),
        array('q' => 'هل يوجد تتبع مباشر للشحنة؟', 'a' => 'نعم، فور تسليم الشحنة تستلم بوليصة تحتوي على رقم تتبع لمتابعة خط سير الشحنة لحظياً عبر الموقع.'),
    );

    ob_start();
    ?>
    <div class="alfa-faq-container" dir="rtl" style="max-width:850px; margin:20px auto;">
        <?php foreach ($faqs as $faq): ?>
            <details style="background:#0b1429; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:18px 24px; margin-bottom:12px; color:#fff; text-align:right;">
                <summary style="font-weight:bold; font-size:15px; cursor:pointer; color:#fff; list-style:none; display:flex; justify-content:space-between; align-items:center;">
                    <span><?php echo esc_html($faq['q']); ?></span>
                    <span style="color:#e30613; font-size:18px;">+</span>
                </summary>
                <div style="margin-top:14px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08); font-size:13px; color:#cbd5e1; line-height:1.7;">
                    <?php echo esc_html($faq['a']); ?>
                </div>
            </details>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}

// 4. [alfa_blog_cards] Shortcode
add_shortcode('alfa_blog_cards', 'alfa_render_blog_shortcode');
function alfa_render_blog_shortcode($atts) {
    $posts = array(
        array('title' => 'دليلك الشامل لشحن الأجهزة الكهربائية والشاشات دون جمارك مفاجئة', 'cat' => 'الجمارك والتغليف', 'read' => '4 دقائق'),
        array('title' => 'مقارنة بين الشحن البري والبحري والجوي: كيف تختار الوسيلة الأنسب؟', 'cat' => 'نصائح لوجستية', 'read' => '5 دقائق'),
        array('title' => 'شحن الأثاث المنزلي من جدة والرياض إلى مصر: خطوات الفك والنقل', 'cat' => 'شحن الأثاث', 'read' => '6 دقائق'),
    );

    ob_start();
    ?>
    <div class="alfa-blog-grid" dir="rtl" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin:30px 0;">
        <?php foreach ($posts as $p): ?>
            <div style="background:#0b1429; border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:24px; color:#fff; text-align:right; display:flex; flex-col; justify-content:space-between;">
                <div>
                    <span style="font-size:11px; background:rgba(227,6,19,0.15); color:#ff6b6b; padding:4px 10px; border-radius:8px; font-weight:bold; display:inline-block; margin-bottom:12px;">
                        <?php echo esc_html($p['cat']); ?>
                    </span>
                    <h4 style="font-size:16px; margin:0 0 12px; color:#fff; line-height:1.5; font-weight:bold;"><?php echo esc_html($p['title']); ?></h4>
                </div>
                <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:14px; font-size:12px; color:#94a3b8; display:flex; justify-content:space-between; align-items:center;">
                    <span><?php echo esc_html($p['read']); ?></span>
                    <span style="color:#e30613; font-weight:bold;">قراءة المقال &larr;</span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}
