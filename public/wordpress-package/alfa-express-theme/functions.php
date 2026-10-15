<?php
/**
 * @file functions.php
 * @project Alfa Express Logistics - Standalone WordPress Theme
 * @author Jenova Media (https://jenova.media)
 * @version 5.8.0
 * @description Master functions and definitions file for the Alfa Express theme.
 * Orchestrates:
 * 1. Theme setup, navigation menus, and HTML5 features.
 * 2. Asset enqueues (Cairo & Tajawal fonts, scoped alfa-theme.css, alfa-theme.js).
 * 3. WordPress Customizer API controls (phone, whatsapp, CBM rates, legal name).
 * 4. Custom Elementor widgets and shortcodes ([alfa_cbm_calculator], [alfa_branches_grid]).
 * 5. Structured Data JSON-LD schemas (LocalBusiness, LogisticsService, FAQPage).
 * 6. Native logistics data provider functions (branches, services, customer reviews, FAQs).
 * 7. Automated 1-click page generator on theme activation.
 * 8. Intelligent 404 fallback routing engine for dedicated page templates.
 *
 * @package AlfaExpress
 */

if (!defined('ABSPATH')) exit;

// 1. THEME SETUP
function alfa_theme_setup() {
    // Add default title tag support
    add_theme_support('title-tag');

    // Add support for Post Thumbnails / Featured Images
    add_theme_support('post-thumbnails');

    // Add support for Custom Logo
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // HTML5 markup support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Elementor & Page Builder Support
    add_theme_support('elementor');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');

    // Register Navigation Menus
    register_nav_menus(array(
        'primary' => __('القائمة الرئيسية (Header Menu)', 'alfa-express'),
        'footer'  => __('قائمة روابط الفوتر (Footer Menu)', 'alfa-express'),
    ));
}
add_action('after_setup_theme', 'alfa_theme_setup');

// 2. ENQUEUE SCRIPTS & STYLES
function alfa_theme_scripts() {
    // Google Cairo Font
    wp_enqueue_style('alfa-cairo-font', 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap', array(), null);

    // Theme main stylesheet
    wp_enqueue_style('alfa-main-style', get_stylesheet_uri(), array(), '5.7.0');

    // Custom Theme UI stylesheet
    wp_enqueue_style('alfa-custom-css', get_template_directory_uri() . '/assets/css/alfa-theme.css', array('alfa-cairo-font'), '5.7.0');

    // Three.js Engine for 3D Hero Game
    wp_enqueue_script('threejs', get_template_directory_uri() . '/assets/js/three.min.js', array(), 'r128', true);

    // Theme interactive JavaScript bundle
    wp_enqueue_script('alfa-custom-js', get_template_directory_uri() . '/assets/js/alfa-theme.js', array('jquery'), '5.7.0', true);

    // 3D Hero Scene Engine
    wp_enqueue_script('alfa-3d-hero', get_template_directory_uri() . '/assets/js/alfa-3d-hero.js', array('threejs', 'alfa-custom-js'), '5.7.0', true);

    // Localize Script with dynamic company settings
    wp_localize_script('alfa-custom-js', 'alfaThemeConfig', array(
        'ajaxurl'     => admin_url('admin-ajax.php'),
        'phone'       => get_option('alfa_main_phone', '0501653999'),
        'whatsapp'    => get_option('alfa_whatsapp', '966501653999'),
        'trackingUrl' => get_option('alfa_tracking_url', 'https://alfaexpress-ksa.com/track'),
        'homeUrl'     => home_url('/'),
        'themeUrl'    => get_template_directory_uri(),
        'calc'        => array(
            'personal' => array(
                'rate' => get_option('alfa_calc_personal_rate', 12),
                'min'  => get_option('alfa_calc_personal_min', 150),
                'days' => get_option('alfa_calc_personal_days', '10 - 15 يوم عمل'),
            ),
            'air' => array(
                'rate' => get_option('alfa_calc_air_rate', 24),
                'min'  => get_option('alfa_calc_air_min', 250),
                'days' => get_option('alfa_calc_air_days', '3 - 7 أيام عمل'),
            ),
            'furniture' => array(
                'rate' => get_option('alfa_calc_furniture_rate', 9),
                'min'  => get_option('alfa_calc_furniture_min', 500),
                'days' => get_option('alfa_calc_furniture_days', '12 - 18 يوم عمل'),
            ),
            'electronics' => array(
                'rate' => get_option('alfa_calc_electronics_rate', 15),
                'min'  => get_option('alfa_calc_electronics_min', 350),
                'days' => get_option('alfa_calc_electronics_days', '8 - 14 يوم عمل (شامل الصندوق الخشبي)'),
            )
        )
    ));
}
add_action('wp_enqueue_scripts', 'alfa_theme_scripts');

// 2.5 THEME CUSTOMIZER
function alfa_customize_register($wp_customize) {
    // Panel
    $wp_customize->add_panel('alfa_theme_settings', array(
        'title'       => __('إعدادات ألفا إكسبريس', 'alfa-express'),
        'description' => 'إعدادات الشركة وحاسبة الأسعار',
        'priority'    => 10,
    ));

    // General Contact Section
    $wp_customize->add_section('alfa_contact_settings', array(
        'title'    => __('أرقام التواصل والتتبع', 'alfa-express'),
        'panel'    => 'alfa_theme_settings',
    ));

    // Main Phone
    $wp_customize->add_setting('alfa_main_phone', array('default' => '0501653999', 'type' => 'option'));
    $wp_customize->add_control('alfa_main_phone', array(
        'label'   => __('الهاتف الموحد', 'alfa-express'),
        'section' => 'alfa_contact_settings',
        'type'    => 'text',
    ));

    // WhatsApp
    $wp_customize->add_setting('alfa_whatsapp', array('default' => '966501653999', 'type' => 'option'));
    $wp_customize->add_control('alfa_whatsapp', array(
        'label'   => __('رقم الواتساب الدولي (مثال: 966501653999)', 'alfa-express'),
        'section' => 'alfa_contact_settings',
        'type'    => 'text',
    ));

    // Tracking URL
    $wp_customize->add_setting('alfa_tracking_url', array('default' => 'https://alfaexpress-ksa.com/track', 'type' => 'option'));
    $wp_customize->add_control('alfa_tracking_url', array(
        'label'   => __('رابط بوابة التتبع الرسمي', 'alfa-express'),
        'section' => 'alfa_contact_settings',
        'type'    => 'url',
    ));

    // Calculator Section
    $wp_customize->add_section('alfa_calc_settings', array(
        'title'    => __('أسعار حاسبة الشحن', 'alfa-express'),
        'panel'    => 'alfa_theme_settings',
    ));

    // Personal
    $wp_customize->add_setting('alfa_calc_personal_rate', array('default' => 12, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_personal_rate', array('label' => 'سعر الكيلو (أغراض شخصية)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_personal_min', array('default' => 150, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_personal_min', array('label' => 'الحد الأدنى (أغراض شخصية)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_personal_days', array('default' => '10 - 15 يوم عمل', 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_personal_days', array('label' => 'مدة التوصيل (أغراض شخصية)', 'section' => 'alfa_calc_settings', 'type' => 'text'));

    // Land Dina Dedicated
    $wp_customize->add_setting('alfa_calc_dina_rate', array('default' => 280, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_dina_rate', array('label' => 'سعر المتر المكعب (شاحنة مبطنة مخصصة)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_dina_min', array('default' => 450, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_dina_min', array('label' => 'الحد الأدنى (شاحنة مبطنة مخصصة)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_dina_days', array('default' => '8 - 14 يوم عمل', 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_dina_days', array('label' => 'مدة التوصيل (شاحنة مبطنة مخصصة)', 'section' => 'alfa_calc_settings', 'type' => 'text'));

    // Furniture
    $wp_customize->add_setting('alfa_calc_furniture_rate', array('default' => 9, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_furniture_rate', array('label' => 'سعر الكيلو (عفش وأثاث)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_furniture_min', array('default' => 500, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_furniture_min', array('label' => 'الحد الأدنى (عفش وأثاث)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_furniture_days', array('default' => '12 - 18 يوم عمل', 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_furniture_days', array('label' => 'مدة التوصيل (عفش وأثاث)', 'section' => 'alfa_calc_settings', 'type' => 'text'));

    // Electronics
    $wp_customize->add_setting('alfa_calc_electronics_rate', array('default' => 15, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_electronics_rate', array('label' => 'سعر الكيلو (أجهزة وشاشات)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_electronics_min', array('default' => 350, 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_electronics_min', array('label' => 'الحد الأدنى (أجهزة وشاشات)', 'section' => 'alfa_calc_settings', 'type' => 'number'));
    $wp_customize->add_setting('alfa_calc_electronics_days', array('default' => '8 - 14 يوم عمل (شامل الصندوق الخشبي)', 'type' => 'option'));
    $wp_customize->add_control('alfa_calc_electronics_days', array('label' => 'مدة التوصيل (أجهزة وشاشات)', 'section' => 'alfa_calc_settings', 'type' => 'text'));

    // Testimonials & Reviews Section (Customizer Photos & Content)
    $wp_customize->add_section('alfa_testimonials_settings', array(
        'title'       => __('آراء وتجارب العملاء (Testimonials Photos & Content)', 'alfa-express'),
        'description' => __('يمكنك من هنا تغيير صور العملاء الموثقة، الأسماء، مسارات الشحن، ونصوص التقييم لجميع آراء العملاء (Alfa Testimonials)', 'alfa-express'),
        'panel'       => 'alfa_theme_settings',
        'priority'    => 20,
    ));

    $default_reviews_meta = array(
        1 => array('name' => 'م. إبراهيم عبد العزيز', 'city' => 'الرياض -> القاهرة', 'comment' => 'تجربة ممتازة جداً مع ألفا إكسبريس. تم شحن غرفة نوم وشاشتين 65 بوصة في صناديق خشبية مبطنة، ووصلت بحالة الوكالة لباب المنزل في مصر.'),
        2 => array('name' => 'د. سارة محمود', 'city' => 'جدة -> الإسكندرية', 'comment' => 'شحن سريع والتزام مذهل بالمواعيد. استلموا الحقائب والصناديق من باب شقتي بجدة، والتسليم كان في سموحة بالإسكندرية خلال 12 يوماً فقط.'),
        3 => array('name' => 'أ. طارق عبد العليم', 'city' => 'جدة -> المنصورة (الدلتا)', 'comment' => 'أفضل شركة شحن تعاملت معها على الإطلاق. التغليف بصناديق خشبية للشاشات والأجهزة يعطيك راحة بال تامة.'),
        4 => array('name' => 'أ. حسام الدين عبد الرحمن', 'city' => 'مكة المكرمة -> أسيوط', 'comment' => 'شحنت عفش بيتي بالكامل من مكة إلى أسيوط. فريق النجارين فكوا العفش ورقموا القطع بحرفية، وتم التوصيل والتسليم حتى باب البيت.'),
        5 => array('name' => 'م. وائل النجار', 'city' => 'الرياض -> الجيزة (أكتوبر)', 'comment' => 'خدمة الشحن الجوي سريعة جداً ووصلت خلال 4 أيام عمل لمطار القاهرة ومنها لمدينة 6 أكتوبر.'),
        6 => array('name' => 'أ. محمد فهمي', 'city' => 'جدة -> السويس والقناة', 'comment' => 'أسعارهم واضحة ومنافسة وموظف الاستلام جاء على الموعد بالضبط وقام بوزن الطرود أمامي. بوليصة التتبع واضحة ومحدثة.'),
    );

    for ($i = 1; $i <= 6; $i++) {
        $meta = isset($default_reviews_meta[$i]) ? $default_reviews_meta[$i] : array('name' => '', 'city' => '', 'comment' => '');

        // 1. Photo Control (WP_Customize_Image_Control)
        $wp_customize->add_setting("alfa_review_photo_{$i}", array(
            'default'   => '',
            'type'      => 'option',
            'transport' => 'refresh',
        ));
        $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, "alfa_review_photo_{$i}", array(
            'label'       => sprintf(__('صورة الشحنة / العميل للرأي رقم %d', 'alfa-express'), $i),
            'description' => sprintf(__('اختر أو ارفع صورة الرأي رقم %d (صورة شحنة أو أثاث أو فاتورة أو صورة العميل)', 'alfa-express'), $i),
            'section'     => 'alfa_testimonials_settings',
            'settings'    => "alfa_review_photo_{$i}",
        )));

        // 2. Author Name
        $wp_customize->add_setting("alfa_review_name_{$i}", array(
            'default'   => $meta['name'],
            'type'      => 'option',
            'transport' => 'refresh',
        ));
        $wp_customize->add_control("alfa_review_name_{$i}", array(
            'label'    => sprintf(__('اسم العميل (%d)', 'alfa-express'), $i),
            'section'  => 'alfa_testimonials_settings',
            'type'     => 'text',
        ));

        // 3. Route / City
        $wp_customize->add_setting("alfa_review_city_{$i}", array(
            'default'   => $meta['city'],
            'type'      => 'option',
            'transport' => 'refresh',
        ));
        $wp_customize->add_control("alfa_review_city_{$i}", array(
            'label'    => sprintf(__('مسار الشحن والمدينة (%d)', 'alfa-express'), $i),
            'section'  => 'alfa_testimonials_settings',
            'type'     => 'text',
        ));

        // 4. Comment Text
        $wp_customize->add_setting("alfa_review_comment_{$i}", array(
            'default'   => $meta['comment'],
            'type'      => 'option',
            'transport' => 'refresh',
        ));
        $wp_customize->add_control("alfa_review_comment_{$i}", array(
            'label'    => sprintf(__('نص التقييم والتجربة (%d)', 'alfa-express'), $i),
            'section'  => 'alfa_testimonials_settings',
            'type'     => 'textarea',
        ));
    }

    // Typography & Sizing Section
    $wp_customize->add_section('alfa_typography_settings', array(
        'title'       => __('إعدادات الخطوط وحجم العناوين (Typography & Sizing)', 'alfa-express'),
        'description' => __('تحكم في أحجام نصوص الهيد لاين والفقرات في جميع صفحات القالب', 'alfa-express'),
        'panel'       => 'alfa_theme_settings',
        'priority'    => 15,
    ));

    // Hero Heading Size
    $wp_customize->add_setting('alfa_hero_heading_size', array(
        'default'   => 'large',
        'type'      => 'option',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('alfa_hero_heading_size', array(
        'label'    => __('حجم عنوان الهيرو الرئيسي (Hero Heading Size)', 'alfa-express'),
        'section'  => 'alfa_typography_settings',
        'type'     => 'select',
        'choices'  => array(
            'normal' => __('عادي متوازن (Normal 36px - 48px)', 'alfa-express'),
            'large'  => __('افتراضي مميز (Large 48px - 60px)', 'alfa-express'),
            'huge'   => __('عملاق بارز (Huge 60px - 72px)', 'alfa-express'),
        ),
    ));

    // Body Font Size
    $wp_customize->add_setting('alfa_body_font_size', array(
        'default'   => 'base',
        'type'      => 'option',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('alfa_body_font_size', array(
        'label'    => __('حجم الخط العام للنصوص والفقرات (Body Font Size)', 'alfa-express'),
        'section'  => 'alfa_typography_settings',
        'type'     => 'select',
        'choices'  => array(
            'sm'   => __('مضغوط صغير (Small 14px)', 'alfa-express'),
            'base' => __('افتراضي قياسي (Base 16px)', 'alfa-express'),
            'lg'   => __('كبير ومقروء للمسنين (Large 18px)', 'alfa-express'),
        ),
    ));

    // Content Customizer Section
    $wp_customize->add_section('alfa_content_customizer', array(
        'title'       => __('تخصيص نصوص وأزرار واجهة الموقع (Content Customizer)', 'alfa-express'),
        'panel'       => 'alfa_theme_settings',
        'priority'    => 16,
    ));

    // Hero Tagline
    $wp_customize->add_setting('alfa_hero_tagline', array(
        'default'   => 'رواد الشحن البري الدولي من الباب للباب',
        'type'      => 'option',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('alfa_hero_tagline', array(
        'label'   => __('العنوان الرئيسي للهيرو (Hero Headline)', 'alfa-express'),
        'section' => 'alfa_content_customizer',
        'type'    => 'text',
    ));

    // Hero Sub-tagline
    $wp_customize->add_setting('alfa_hero_subtagline', array(
        'default'   => 'أسطول شاحنات مبطنة وتريلات مجهزة لنقل العفش المنزلي، الأغراض والطرود، الأجهزة الكهربائية، والبضائع التجارية مع الفك والتغليف والتخليص الجمركي والتسليم لباب بيتك.',
        'type'      => 'option',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('alfa_hero_subtagline', array(
        'label'   => __('الوصف التوضيحي للهيرو (Sub-Tagline)', 'alfa-express'),
        'section' => 'alfa_content_customizer',
        'type'    => 'textarea',
    ));

    // Hero CTA Button Text
    $wp_customize->add_setting('alfa_hero_cta_text', array(
        'default'   => 'طلب تسعيرة شحن بري',
        'type'      => 'option',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('alfa_hero_cta_text', array(
        'label'   => __('نص زر الإجراء في الهيرو (Hero CTA Text)', 'alfa-express'),
        'section' => 'alfa_content_customizer',
        'type'    => 'text',
    ));

    // Starting Price SAR
    $wp_customize->add_setting('alfa_starting_price_sar', array(
        'default'   => 150,
        'type'      => 'option',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('alfa_starting_price_sar', array(
        'label'   => __('سعر الشحن المبدئي بالريال السعودي', 'alfa-express'),
        'section' => 'alfa_content_customizer',
        'type'    => 'number',
    ));
}
add_action('customize_register', 'alfa_customize_register');

// 2.6 DYNAMIC TYPOGRAPHY INJECTION
function alfa_custom_typography_css() {
    $heading_size = get_option('alfa_hero_heading_size', 'large');
    $body_size = get_option('alfa_body_font_size', 'base');

    $h1_clamp = 'clamp(2.3rem, 4.8vw, 3.6rem)';
    if ($heading_size === 'huge') {
        $h1_clamp = 'clamp(2.7rem, 6vw, 4.4rem)';
    } elseif ($heading_size === 'normal') {
        $h1_clamp = 'clamp(1.8rem, 3.5vw, 2.7rem)';
    }

    $body_rem = '1rem';
    if ($body_size === 'lg') {
        $body_rem = '1.125rem';
    } elseif ($body_size === 'sm') {
        $body_rem = '0.875rem';
    }

    echo "<style id='alfa-dynamic-typography'>
        :root {
            --alfa-hero-h1-size: {$h1_clamp};
            --alfa-body-font-size: {$body_rem};
        }
        body { font-size: var(--alfa-body-font-size); }
        .alfa-hero-heading { font-size: var(--alfa-hero-h1-size) !important; }
    </style>\n";
}
add_action('wp_head', 'alfa_custom_typography_css', 100);

// 3. LOAD ONE-TIME ALL-IN-ONE IMPORTER
if (is_admin()) {
    require_once get_template_directory() . '/admin/class-alfa-one-time-importer.php';
}

// 4. ELEMENTOR WIDGET & SHORTCODE
function alfa_register_elementor_widgets( $widgets_manager ) {
    require_once get_template_directory() . '/inc/elementor-calculator-widget.php';
    $widgets_manager->register( new \Alfa_Express_Calculator_Widget() );
    require_once get_template_directory() . '/inc/elementor-theme-widgets.php';
    $widgets_manager->register( new \Alfa_Hero_Widget() );
    $widgets_manager->register( new \Alfa_Services_Widget() );
    $widgets_manager->register( new \Alfa_Tracking_Teaser_Widget() );
    $widgets_manager->register( new \Alfa_Reviews_Widget() );
    $widgets_manager->register( new \Alfa_FAQ_Widget() );

}
add_action( 'elementor/widgets/register', 'alfa_register_elementor_widgets' );


// Standalone Shortcode for Calculator (With 3D parallax included)
function alfa_calculator_shortcode($atts) {
    $a = shortcode_atts(array(
        'whatsapp' => '966501653999'
    ), $atts);
    $wa_number = preg_replace('/[^0-9]/', '', $a['whatsapp']);

    ob_start();
    ?>
    <div class="alfa-calculator-widget-wrapper alfa-3d-parallax-container alfa-scroll-parallax">
        <div class="alfa-3d-parallax-inner">
            <h3 class="alfa-calc-widget-title" style="text-align:center; margin-bottom:15px; color:#fff; font-weight:800; font-size:1.4rem;">حاسبة الشحن البري بالحجم (CBM)</h3>
            <div class="alfa-quote-calculator" style="background:rgba(11, 20, 41, 0.95); border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:1.75rem; box-shadow:0 25px 50px rgba(0,0,0,0.5); backdrop-filter:blur(10px);">
                <div style="display:grid; grid-template-columns:1fr; gap:1.25rem; margin-bottom:1.25rem;">
                    <div>
                        <label style="display:block; font-size:0.85rem; color:#cbd5e1; margin-bottom:0.4rem; font-weight:bold;">نوع الشحنة البرية</label>
                        <select id="alfa-calc-type-shortcode" class="alfa-input" style="width:100%; padding:0.75rem 1rem; border-radius: 10px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
                            <option value="عفش وأثاث منزلي كامل (فك وتغليف)">عفش وأثاث منزلي كامل (فك وتغليف)</option>
                            <option value="أغراض وكراتين شخصية">أغراض وكراتين شخصية</option>
                            <option value="أجهزة وشاشات كهربائية">أجهزة وشاشات كهربائية (صندوق خشب)</option>
                            <option value="بضائع ومعدات تجارية">بضائع ومعدات تجارية</option>
                        </select>
                    </div>

                    <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:1rem;">
                        <label style="display:block; font-size:0.85rem; font-weight:bold; color:#f59e0b; margin-bottom:0.5rem;">الأبعاد لحساب الحجم (سم)</label>
                        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.5rem; margin-bottom:0.6rem;">
                            <div>
                                <span style="display:block; font-size:0.7rem; color:#94a3b8;">الطول</span>
                                <input type="number" id="alfa-dim-l-sc" value="100" min="10" style="width:100%; padding:0.4rem; border-radius:6px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                            </div>
                            <div>
                                <span style="display:block; font-size:0.7rem; color:#94a3b8;">العرض</span>
                                <input type="number" id="alfa-dim-w-sc" value="80" min="10" style="width:100%; padding:0.4rem; border-radius:6px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                            </div>
                            <div>
                                <span style="display:block; font-size:0.7rem; color:#94a3b8;">الارتفاع</span>
                                <input type="number" id="alfa-dim-h-sc" value="60" min="10" style="width:100%; padding:0.4rem; border-radius:6px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                            </div>
                            <div>
                                <span style="display:block; font-size:0.7rem; color:#94a3b8;">العدد</span>
                                <input type="number" id="alfa-dim-qty-sc" value="1" min="1" style="width:100%; padding:0.4rem; border-radius:6px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                            </div>
                        </div>

                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(227,6,19,0.15); border:1px solid rgba(227,6,19,0.3); border-radius:8px; padding:0.4rem 0.6rem;">
                            <span style="font-size:0.75rem; color:#cbd5e1;">الحجم المقدر:</span>
                            <strong id="alfa-sc-cbm-result" style="font-size:1rem; color:#fff; font-family:monospace;">0.48 م³ (CBM)</strong>
                        </div>
                    </div>
                </div>

                <button type="button" id="alfa-calc-btn-shortcode" class="alfa-btn alfa-btn-primary" style="width:100%; padding:0.9rem; font-size:1rem; font-weight:bold; border-radius: 12px; background: #25D366; color: white; border: none; cursor: pointer; transition: all 0.3s; display:flex; justify-content:center; align-items:center; gap:10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    طلب تسعيرة بالحجم عبر واتساب
                </button>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var btn = document.getElementById("alfa-calc-btn-shortcode");
            var lInp = document.getElementById("alfa-dim-l-sc");
            var wInp = document.getElementById("alfa-dim-w-sc");
            var hInp = document.getElementById("alfa-dim-h-sc");
            var qInp = document.getElementById("alfa-dim-qty-sc");
            var resBadge = document.getElementById("alfa-sc-cbm-result");

            function calcCbmSc() {
                var l = parseFloat(lInp ? lInp.value : 100) || 100;
                var w = parseFloat(wInp ? wInp.value : 80) || 80;
                var h = parseFloat(hInp ? hInp.value : 60) || 60;
                var q = parseFloat(qInp ? qInp.value : 1) || 1;
                var cbm = Math.round(((l * w * h) / 1000000) * q * 100) / 100;
                if(resBadge) resBadge.textContent = cbm + " م³ (CBM)";
                return { cbm: cbm, l: l, w: w, h: h, q: q };
            }

            [lInp, wInp, hInp, qInp].forEach(function(el) {
                if(el) el.addEventListener('input', calcCbmSc);
            });

            if(btn && !btn.dataset.initialized) {
                btn.dataset.initialized = 'true';
                btn.addEventListener("click", function() {
                    var serviceType = document.getElementById("alfa-calc-type-shortcode").value;
                    var data = calcCbmSc();
                    var waNumber = "<?php echo esc_js($wa_number); ?>";
                    var text = "السلام عليكم ورحمة الله وبركاته\nأود الاستفسار عن تسعيرة شحن بري بالحجم (CBM) - ألفا إكسبريس:\n- نوع الشحنة: " + serviceType + "\n- الأبعاد: " + data.l + "×" + data.w + "×" + data.h + " سم (عدد " + data.q + ")\n- الحجم الإجمالي: " + data.cbm + " م³ (CBM)\n\nيرجى تزويدي بالتسعيرة وحجز موعد المعاينة.";
                    var url = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
                    window.open(url, '_blank');
                });
            }

            // 3D & Parallax Scrolling Script for shortcode
            const wrappers = document.querySelectorAll(".alfa-3d-parallax-container");
            wrappers.forEach(wrapper => {
                if (wrapper.dataset.parallaxInit) return;
                wrapper.dataset.parallaxInit = 'true';
                
                const inner = wrapper.querySelector(".alfa-3d-parallax-inner");
                if(inner) {
                    wrapper.addEventListener("mousemove", (e) => {
                        const rect = wrapper.getBoundingClientRect();
                        const x = e.clientX - rect.left; 
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * -12; 
                        const rotateY = ((x - centerX) / centerX) * 12;
                        inner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
                        inner.style.transition = "transform 0.1s ease-out";
                    });
                    
                    wrapper.addEventListener("mouseleave", () => {
                        inner.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
                        inner.style.transition = "transform 0.5s ease-out";
                    });

                    window.addEventListener("scroll", () => {
                        if (!wrapper.classList.contains('alfa-scroll-parallax')) return;
                        const rect = wrapper.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        if (rect.top < windowHeight && rect.bottom > 0) {
                            const scrollProgress = 1 - (rect.top / windowHeight);
                            const yOffset = (1 - scrollProgress) * 50;
                            const opacity = Math.min(1, scrollProgress * 1.5);
                            wrapper.style.transform = `translateY(${yOffset}px)`;
                            wrapper.style.opacity = opacity;
                        }
                    }, { passive: true });
                    window.dispatchEvent(new Event('scroll'));
                }
            });
        });
    </script>
    <style>
        .alfa-3d-parallax-container { perspective: 1200px; padding: 10px; transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease; }
        .alfa-scroll-parallax { opacity: 0; transform: translateY(50px); }
        .alfa-3d-parallax-inner { transform-style: preserve-3d; will-change: transform; }
        #alfa-calc-btn-shortcode:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(37, 211, 102, 0.4); }
    </style>
    <?php
    return ob_get_clean();
}

add_shortcode('alfa_calculator', 'alfa_calculator_shortcode');

// 4. HELPER DATA FUNCTIONS
function alfa_get_reviews() {
    $defaults = array(
        1 => array(
            'id' => 1,
            'name' => 'م. إبراهيم عبد العزيز',
            'city' => 'الرياض -> القاهرة',
            'branch' => 'فرع العزيزية - الرياض',
            'rating' => 5,
            'image' => 'review-1.jpeg',
            'type' => 'شحن عفش وأجهزة كهربائية',
            'comment' => 'تجربة ممتازة جداً مع ألفا إكسبريس. تم شحن غرفة نوم وشاشتين 65 بوصة في صناديق خشبية مبطنة، ووصلت بحالة الوكالة لباب المنزل في مصر دون أي خدش أو مصاريف جمركية مفاجئة.'
        ),
        2 => array(
            'id' => 2,
            'name' => 'د. سارة محمود',
            'city' => 'جدة -> الإسكندرية',
            'branch' => 'فرع الفيصلية (الرئيسي) - جدة',
            'rating' => 5,
            'image' => 'review-2.jpeg',
            'type' => 'أغراض شخصية وكتب طبية',
            'comment' => 'شحن سريع والتزام مذهل بالمواعيد. استلموا الحقائب والصناديق من باب شقتي بجدة، والتسليم كان في سموحة بالإسكندرية خلال 12 يوماً فقط مع التغليف المحكم.'
        ),
        3 => array(
            'id' => 3,
            'name' => 'أ. طارق عبد العليم',
            'city' => 'جدة -> المنصورة (الدلتا)',
            'branch' => 'فرع البوادي - شارع قريش',
            'rating' => 5,
            'image' => 'review-3.jpeg',
            'type' => 'شاشات ذكية وغسالة أوتوماتيك',
            'comment' => 'أفضل شركة شحن تعاملت معها على الإطلاق. التغليف بصناديق خشبية للشاشات والأجهزة يعطيك راحة بال تامة، وموظفي خدمة العملاء في قمة الاحترام والمتابعة.'
        ),
        4 => array(
            'id' => 4,
            'name' => 'أ. حسام الدين عبد الرحمن',
            'city' => 'مكة المكرمة -> أسيوط',
            'branch' => 'فرع مكة المكرمة (الشوقية)',
            'rating' => 5,
            'image' => 'review-4.jpeg',
            'type' => 'عفش وأثاث منزلي متكامل',
            'comment' => 'شحنت عفش بيتي بالكامل من مكة إلى أسيوط. فريق النجارين فكوا العفش ورقموا القطع بحرفية، وتم التوصيل والتسليم حتى باب البيت في الصعيد مع بوليصة رسمية وتتبع دقيق.'
        ),
        5 => array(
            'id' => 5,
            'name' => 'م. وائل النجار',
            'city' => 'الرياض -> الجيزة (أكتوبر)',
            'branch' => 'فرع الملز - الرياض',
            'rating' => 5,
            'image' => 'review-5.jpeg',
            'type' => 'شحن بري سريع بشاحنة مبطنة لأجهزة وشاشات',
            'comment' => 'خدمة الشحن البري بالشاحنة المبطنة سريعة وممتازة جداً، وصلت خلال 10 أيام لباب المنزل في مدينة 6 أكتوبر مع الصناديق الخشبية المبطنة للشاشات ودون أي رسوم جمركية مفاجئة. شكراً لفريق ألفا إكسبريس.'
        ),
        6 => array(
            'id' => 6,
            'name' => 'أ. محمد فهمي',
            'city' => 'جدة -> السويس والقناة',
            'branch' => 'فرع السلامة - صقر قريش',
            'rating' => 5,
            'image' => 'review-6.jpeg',
            'type' => 'أجهزة مطبخ وشاشات',
            'comment' => 'أسعارهم واضحة ومنافسة وموظف الاستلام جاء على الموعد بالضبط وقام بوزن الطرود أمامي. بوليصة التتبع واضحة ومحدثة أولاً بأول. بارك الله فيكم.'
        ),
    );

    $reviews = array();
    foreach ($defaults as $i => $item) {
        $custom_photo = get_option('alfa_review_photo_' . $i, '');
        $custom_name = get_option('alfa_review_name_' . $i, '');
        $custom_city = get_option('alfa_review_city_' . $i, '');
        $custom_comment = get_option('alfa_review_comment_' . $i, '');

        $photo_url = '';
        if (!empty($custom_photo)) {
            if (is_numeric($custom_photo)) {
                $photo_url = wp_get_attachment_url((int)$custom_photo);
            } else {
                $photo_url = esc_url_raw($custom_photo);
            }
        }
        if (empty($photo_url)) {
            $photo_url = get_template_directory_uri() . '/assets/images/' . $item['image'];
        }

        $reviews[] = array(
            'id' => $item['id'],
            'name' => !empty($custom_name) ? $custom_name : $item['name'],
            'city' => !empty($custom_city) ? $custom_city : $item['city'],
            'branch' => $item['branch'],
            'rating' => $item['rating'],
            'image' => $item['image'],
            'image_url' => $photo_url,
            'type' => $item['type'],
            'comment' => !empty($custom_comment) ? $custom_comment : $item['comment']
        );
    }

    return $reviews;
}

// 4. HELPER DATA FUNCTIONS
function alfa_get_branches() {
    return array(
        array('city' => 'جدة', 'name' => 'فرع جدة - البوادي (محطة تحميل بري)', 'phone' => '0580906241', 'whatsapp' => '966580906241', 'address' => 'حي البوادي - شارع قريش - جدة', 'maps' => 'https://maps.google.com/?q=Jeddah+Al+Bawadi'),
        array('city' => 'جدة', 'name' => 'فرع جدة - السلامة', 'phone' => '0591627623', 'whatsapp' => '966591627623', 'address' => 'حي السلامة - شارع صقر قريش - جدة', 'maps' => 'https://maps.google.com/?q=Jeddah+Al+Salamah'),
        array('city' => 'جدة', 'name' => 'فرع جدة - الفيصلية (المقر الرئيسي للشحن البري)', 'phone' => '0509133390', 'whatsapp' => '966509133390', 'address' => '4275 الروضة - حي الفيصلية - جدة', 'maps' => 'https://maps.google.com/?q=4275+Al+Rawdah+Al+Faisaliyah+Jeddah'),
        array('city' => 'جدة', 'name' => 'فرع جدة - الشرفية', 'phone' => '0578710493', 'whatsapp' => '966578710493', 'address' => 'حي الشرفية - طريق المدينة المنورة - جدة', 'maps' => 'https://maps.google.com/?q=Jeddah+Al+Sharafiyah'),
        array('city' => 'جدة', 'name' => 'فرع جدة - الربوة', 'phone' => '0539595508', 'whatsapp' => '966539595508', 'address' => 'حي الربوة - شارع حراء - جدة', 'maps' => 'https://maps.google.com/?q=Jeddah+Al+Rabwah'),
        array('city' => 'مكة المكرمة', 'name' => 'فرع مكة المكرمة - محطة الشحن', 'phone' => '0567133390', 'whatsapp' => '966567133390', 'address' => 'مكة المكرمة - مخطط الشوقية / الرصيفة', 'maps' => 'https://maps.google.com/?q=Makkah+Al+Mukarramah'),
        array('city' => 'الرياض', 'name' => 'فرع الرياض - العزيزية (مركز الشحن البري)', 'phone' => '0539595799', 'whatsapp' => '966539595799', 'address' => 'حي العزيزية - طريق النصر - الرياض', 'maps' => 'https://maps.google.com/?q=Riyadh+Al+Aziziyah'),
        array('city' => 'الرياض', 'name' => 'فرع الرياض - الملز', 'phone' => '0539595117', 'whatsapp' => '966539595117', 'address' => 'حي الملز - شارع صلاح الدين الأيوبي - الرياض', 'maps' => 'https://maps.google.com/?q=Riyadh+Al+Malaz'),
    );
}

function alfa_get_services() {
    return array(
        array(
            'id' => 'furniture',
            'title' => 'شحن الأثاث والعفش المنزلي براً',
            'subtitle' => 'نقل غرف النوم والمجالس والمفروشات',
            'desc' => 'شاحنات وتريلات مبطنة ومجهزة مع فريق نجارين وفنيين محترفين لفك الأثاث وتغليفه بطبقات حماية ثلاثية ضد اهتزازات الطرق وإعادة تركيبه في مصر.',
            'icon' => 'Truck',
            'badge' => 'فك وتغليف وتركيب شامل',
            'features' => array(
                'تريلات وشاحنات مغلقة ومبطنة',
                'تغليف فوم وبابلز وكرتون مقوى',
                'ضمان سلامة القطع الثمينة حتى التركيب',
                'توصيل لباب المنزل في كافة محافظات مصر'
            )
        ),
        array(
            'id' => 'personal',
            'title' => 'شحن الأغراض والطرود الشخصية براً',
            'subtitle' => 'للأفراد والعائلات والمقيمين بالمملكة',
            'desc' => 'شحن بري منتظم للحقائب، الكراتين، الهدايا، والمستلزمات الشخصية من باب منزلك في أي مدينة سعودية حتى باب المستلم في كافة مدن وقرى مصر.',
            'icon' => 'Box',
            'badge' => 'خدمة الباب للباب بأسعار تبدأ من 150 ريال',
            'features' => array(
                'استلام مجاني من منزلك بالشاحنات المبطنة',
                'رحلات برية يومية وأسبوعية منتظمة',
                'تغليف مقوى ضد صدمات واهتزازات الطرق',
                'تسليم مباشر للمستلم في مصر'
            )
        ),
        array(
            'id' => 'commercial',
            'title' => 'شحن البضائع والمعدات التجارية براً',
            'subtitle' => 'للشركات والمصانع والتجار',
            'desc' => 'حلول شحن بري موثوقة بشاحنات كاملة (FTL) وحمولات جزئية (LTL) مع بوالص شحن رسمية وشهادات المنشأ وتخليص جمركي معتمد.',
            'icon' => 'PackageCheck',
            'badge' => 'شاحنات كاملة وجزئية FTL & LTL',
            'features' => array(
                'أسطول شاحنات وتريلات حديثة ومجهزة',
                'تخليص جمركي فوري بالمنافذ والموانئ البرية',
                'تأمين كامل على البضائع التجارية والمعدات',
                'أسعار خاصة ومنافسة للعقود والكميات الكبيرة'
            )
        ),
        array(
            'id' => 'electronics',
            'title' => 'شحن الأجهزة والشاشات براً',
            'subtitle' => 'الشاشات الكبيرة والثلاجات والغسالات',
            'desc' => 'صناديق خشبية مخصصة ومبطنة للشاشات الحساسة وحماية فائقة للأجهزة الكهربائية والموتورات ضد مطبات واهتزازات الطرق البرية.',
            'icon' => 'ShieldCheck',
            'badge' => 'صناديق خشبية واقية معتمدة',
            'features' => array(
                'صناديق خشبية مبطنة تفصيل خاص للشاشات',
                'حماية وتثبيت الأجهزة ضد الاهتزاز والكسر',
                'إنهاء كافة إجراءات التخليص الجمركي بمصر',
                'توصيل سليم ومضمون لباب بيتك'
            )
        ),
        array(
            'id' => 'express-land',
            'title' => 'الشحن البري السريع بالشاحنات المبطنة',
            'subtitle' => 'للشحنات العاجلة والخاصة',
            'desc' => 'خدمة شحن بري مباشر وسريع باستخدام شاحنات مبطنة مغلقة مخصصة لشحنتك دون توقف أو تجميع، مع تسليم قياسي في وقت زمني محدد.',
            'icon' => 'Zap',
            'badge' => 'رحلات برية مباشرة وسريعة',
            'features' => array(
                'شاحنة مبطنة مخصصة لشحنتك دون توقف',
                'انطلاق فوري للرحلة دون انتظار',
                'تتبع لحظي لمسار الشاحنة عبر GPS',
                'تسليم سريع ومباشر للمستلم في مصر'
            )
        ),
        array(
            'id' => 'customs',
            'title' => 'التخليص الجمركي بالمنافذ البرية',
            'subtitle' => 'إنهاء كافة الإجراءات الرسمية والإعفاءات',
            'desc' => 'فريق خبراء تخليص جمركي متواجد بالمنافذ والموانئ البرية (منفذ ضبا، ميناء سفاجا، نويبع، السويس) لإنهاء الأوراق والإفراج السريع بدون أي رسوم خفية.',
            'icon' => 'FileCheck2',
            'badge' => 'إجراءات جمركية برية سريعة',
            'features' => array(
                'خبرة بلوائح إعفاءات المغتربين والعائدين لمصر',
                'إنهاء فوري لمعاملات المنافذ البرية',
                'بيانات جمركية رسمية وفواتير ضريبية نظامية',
                'شفافية كاملة بدون أي مصاريف مفاجئة'
            )
        ),
    );
}

function alfa_get_process_steps() {
    return array(
        array(
            'step' => 1,
            'title' => 'طلب الخدمة والتواصل',
            'desc' => 'تواصل معنا عبر واتساب أو الهاتف أو زُر أقرب فرع من فروعنا الـ 8 لتحديد نوع وحجم الشحنة البرية والموعد المناسب للاستلام.',
            'icon' => '📞'
        ),
        array(
            'step' => 2,
            'title' => 'المعاينة والاستلام من الباب',
            'desc' => 'يقوم مندوبنا بالوصول لباب منزلك لمعاينة الشحنة وتحديد الوزن والحجم بدقة مع تسليمك إيصال استلام رسمي معتمد.',
            'icon' => '⚖️'
        ),
        array(
            'step' => 3,
            'title' => 'التغليف الهندسي للشحن البري',
            'desc' => 'تغليف احترافي متعدد الطبقات (فوم مبطن، بلاستيك فقاعي، كرتون مقوى 5 طبقات، صناديق خشبية) لحماية الشحنة ضد اهتزازات الطرق.',
            'icon' => '📦'
        ),
        array(
            'step' => 4,
            'title' => 'التحميل والرص المتوازن بالشاحنة',
            'desc' => 'رص الشحنة داخل أسطول الشاحنات والتريلات المبطنة وتثبيتها بأحزمة أمان خاصة لمنع أي حركة أو انزلاق أثناء السير.',
            'icon' => '🚛'
        ),
        array(
            'step' => 5,
            'title' => 'إصدار بوليصة الشحن ورقم التتبع',
            'desc' => 'توثيق بيانات الشحنة والمرسل والمستلم وتزويدك برقم بوليصة رسمي لمتابعة خط سير الشاحنة رقمياً أولاً بأول.',
            'icon' => '📋'
        ),
        array(
            'step' => 6,
            'title' => 'انطلاق الرحلة البرية والعبور',
            'desc' => 'تحرك الشاحنة عبر الخط البري الدولي (السعودية - ضبا - سفاجا / نويبع) وفق جدول رحلات برية منتظم.',
            'icon' => '🧭'
        ),
        array(
            'step' => 7,
            'title' => 'التخليص الجمركي السريع بالمنفذ',
            'desc' => 'فريق التخليص الجمركي التابع لشركتنا ينهي كافة الإجراءات الرسمية والأوراق بميناء الوصول لتسهيل خروج الشاحنة فوراً.',
            'icon' => '🛡️'
        ),
        array(
            'step' => 8,
            'title' => 'التسليم لباب البيت في مصر',
            'desc' => 'وصول الشاحنة إلى المحافظة أو المركز أو القرية المطلوبة، وتسليم الشحنة وتركيب العفش للمستلم بأعلى مستويات الرضا.',
            'icon' => '🏡'
        ),
    );
}

function alfa_get_blog_posts() {
    return array(
        array(
            'id' => 'blog-1',
            'slug' => 'land-freight-electronics-packing',
            'title' => 'دليلك الشامل لشحن الأجهزة الكهربائية والشاشات براً من السعودية إلى مصر بأمان تام',
            'excerpt' => 'تعرف على أفضل أساليب التغليف المقاوم لمطبات الطرق البرية والصناديق الخشبية الواقية لحماية الشاشات والغسالات والثلاجات.',
            'category' => 'الشحن البري والتغليف',
            'date' => '12 يناير 2026',
            'readTime' => '4 دقائق قراءة',
            'author' => 'م. أحمد الشريف - مستشار الشحن البري',
            'tags' => array('شحن بري', 'شحن الأجهزة', 'تغليف الشاشات', 'جمارك المنافذ البرية'),
            'image' => 'alfa-car.png',
            'content' => 'يعتبر الشحن البري من أكثر وسائل الشحن أماناً واقتصادية عند نقل الأجهزة المنزلية الكبيرة (مثل الشاشات الذكية، الثلاجات، الغسالات، والمكيفات) من مدن المملكة إلى مختلف المحافظات المصرية عبر شاحنات مجهزة وصناديق خشبية مبطنة.'
        ),
        array(
            'id' => 'blog-2',
            'slug' => 'land-shipping-furniture-guide',
            'title' => 'خطوات شحن العفش والأثاث المنزلي بالشاحنات المبطنة والتريلات البرية من جدة والرياض إلى محافظات مصر',
            'excerpt' => 'كيف تضمن وصول عفش منزلك ومفروشاتك سليمة 100% مع أسطول الشاحنات المبطنة وخدمات الفك والتغليف والتركيب المنزلي.',
            'category' => 'شحن العفش والأثاث',
            'date' => '20 يناير 2026',
            'readTime' => '5 دقائق قراءة',
            'author' => 'فريق عمليات الشحن البري - ألفا إكسبريس',
            'tags' => array('نقل عفش بري', 'شحن أثاث', 'تريلات مبطنة', 'فك وتركيب'),
            'image' => 'alfa-car.png',
            'content' => 'مراحل نقل الأثاث المنزلي عبر أسطول الشحن البري تبدأ من الفك والترقيم الدقيق بأيدي نجارين محترفين، ثم التغليف الثلاثي بالفوم والبابلز، والتحميل على تريلات مبطنة، حتى التوصيل والتركيب بباب المنزل بمصر.'
        ),
        array(
            'id' => 'blog-3',
            'slug' => 'land-customs-clearance-duba-safaga',
            'title' => 'كل ما تريد معرفته عن التخليص الجمركي للشاحنات البرية عبر ميناء ضبا وسفاجا ونويبع',
            'excerpt' => 'دليل مبسط لقوائم التعبئة وبوالص الشحن البري والإعفاءات الجمركية المتاحة للمغتربين والعائدين لمصر.',
            'category' => 'الجمارك والمنافذ البرية',
            'date' => '02 فبراير 2026',
            'readTime' => '6 دقائق قراءة',
            'author' => 'مستشار التخليص الجمركي البري - ألفا إكسبريس',
            'tags' => array('منفذ ضبا', 'ميناء سفاجا', 'بوليصة شحن بري', 'إعفاءات جمركية'),
            'image' => 'alfa-car.png',
            'content' => 'كيف تضمن سرعة عبور شحنتك البرية عبر المنافذ الجمركية؟ دقة كتابة بيانات المستلم والرقم القومي، وقائمة التعبئة الواضحة، والتنسيق المسبق مع فريق التخليص الجمركي التابع لشركتنا في ميناء ضبا وسفاجا.'
        ),
        array(
            'id' => 'blog-4',
            'slug' => 'door-to-door-land-freight-egypt',
            'title' => 'خدمة الشحن البري من الباب للباب: كيف تصل شحنتك إلى أدق القرى والمراكز في مصر؟',
            'excerpt' => 'استعراض لشبكة التوزيع البري لشركة ألفا إكسبريس التي تغطي جميع محافظات الوجه البحري والقبلي والصعيد.',
            'category' => 'التغطية والتوصيل',
            'date' => '18 فبراير 2026',
            'readTime' => '4 دقائق قراءة',
            'author' => 'إدارة شبكة التوزيع - ألفا إكسبريس',
            'tags' => array('توصيل من الباب للباب', 'محافظات مصر', 'شحن الصعيد', 'شحن الدلتا'),
            'image' => 'alfa-car.png',
            'content' => 'تتميز ألفا إكسبريس بأسطول سيارات توزيع محلية متصلة برحلات الشاحنات الكبرى، مما يمكننا من تسليم الشحنات والطرود والعفش مباشرة إلى باب منزلك في كافة المراكز والقرى بجميع محافظات مصر.'
        ),
    );
}

function alfa_get_faqs() {
    return array(
        array(
            'category' => 'الشحن البري والأسطول',
            'q' => 'ما هي مدة التوصيل عبر الشحن البري؟',
            'a' => 'مدة التوصيل من السعودية إلى مصر من 10 إلى 15 يوماً كحد أقصى وصولاً إلى باب منزلك في أي محافظة من محافظات مصر عبر أسطول الشاحنات والتريلات المجهزة.'
        ),
        array(
            'category' => 'الشحن البري والأسطول',
            'q' => 'ما هي مميزات الشحن البري عن الشحن البحري والجوي؟',
            'a' => 'يتميز الشحن البري بأنه يجمع بين سرعة التسليم (10-15 يوم مقابل أسابيع في البحري) والتكلفة الاقتصادية المناسبة جداً مقارنة بالجوي، مع إمكانية شحن أحجام وأوزان ضخمة ومفتوحة بدون قيود الوزن، واستلام وتسليم مباشر من الباب للباب دون المرور بإجراءات الموانئ المعقدة للعميل.'
        ),
        array(
            'category' => 'الشحن البري والأسطول',
            'q' => 'هل تقدمون شاحنات مبطنة وتريلات كاملة مخصصة لشحنة واحدة (FTL)؟',
            'a' => 'نعم، نوفر خدمة الشحن البري الكامل (Full Truck Load - FTL) بشاحنة مبطنة مغلقة أو تريلا مخصصة بالكامل لشحنتك أو عفش بيتك فقط، مع انطلاق مباشر وسريع دون أي توقف أو تجميع مع شحنات أخرى.'
        ),
        array(
            'category' => 'التغليف والحماية',
            'q' => 'ما هي طريقة تغليف الأجهزة الكهربائية والعفش المنزلي للحفاظ عليها من مطبات الطرق البرية؟',
            'a' => 'يتم تغليف الأجهزة والعفش بطبقة من اللباد الإسفنجي المانع للصدمات، وفوم مبطن متعدد الكثافات، ثم توضع الشاشات والأجهزة الحساسة داخل صندوق خشبي متين للحفاظ عليها وحمايتها أثناء سير الشاحنة على الطرق البرية. كما يتم وضع ملصق قابل للكسر (Fragile) ورص الشحنة وتثبيتها بأحزمة أمان داخل الشاحنة.'
        ),
        array(
            'category' => 'التغليف والحماية',
            'q' => 'كيف أضع أغراضي الشخصية داخل الكرتونة؟',
            'a' => 'إذا كان هناك زيوت أو منظفات أو أي سوائل داخل الكرتونة، نود التنويه إلى أن شحن السوائل يحمل احتمالية لتلف العبوات أو تسرب محتواها داخل الصندوق، مما قد يؤثر على سلامة باقي محتويات الشحنة. لذلك يرجى وضع السوائل داخل صندوق صغير ومغلق خاص بها داخل الكرتونة، مع التأكد من إحكام غلق العبوات جيداً.'
        ),
        array(
            'category' => 'التخليص الجمركي والأوراق',
            'q' => 'ماذا يحدث في حال تعرضت الشحنة للتلف أو النقص أثناء التفتيش الجمركي؟',
            'a' => 'لضمان حقوقك وتوفير أقصى حماية لشحنتك، نرجو منك تزويدنا بكامل محتويات الشحنة بالتفصيل لتسجيلها في الفاتورة. هذا الإجراء يضمن لك التعويض الفوري في حال حدوث أي تلف أو نقص أثناء التفتيش الجمركي (لا قدر الله)، حيث تتم مراجعة الفاتورة وتعويضك مباشرة عن أي عنصر متضرر طالما كان مسجلاً بها مسبقاً.'
        ),
        array(
            'category' => 'التتبع والتوصيل',
            'q' => 'كيف يمكنني تتبع شحنتي البرية؟',
            'a' => 'يمكنك متابعة حالة شحنتك خطوة بخطوة من خلال إدخال رقم التتبع (رقم البوليصة) في صفحة "تتبع الشحنات" على موقعنا للحصول على تحديثات فورية حتى وصولها للمستلم. كما نقوم بإرسال تحديثات فورية على رقم الواتساب المدون في الفاتورة مع إشعارات بانطلاق الشاحنة والعبور والتسليم.'
        ),
        array(
            'category' => 'التتبع والتوصيل',
            'q' => 'هل تقومون بالتوصيل حتى باب المنزل (Door-to-Door) في مصر؟',
            'a' => 'نعم، نوفر خدمة التوصيل من الباب إلى الباب (Door-to-Door) مباشرة من موقعك بالسعودية حتى باب بيتك أو شقتك في كافة محافظات ومراكز وقرى مصر دون الحاجة لاستلامها من مستودع.'
        ),
        array(
            'category' => 'الأسعار واحتساب CBM',
            'q' => 'هل يتم احتساب سعر الشحن بالوزن؟',
            'a' => 'لا ❌؛ الوزن مفتوح تماماً، ويتم احتساب سعر الشحنة بناءً على حجم الشحنة (المتر المكعب CBM) وليس وزنها، مما يوفر كثيراً في شحن العفش والطرود الكبيرة.'
        ),
        array(
            'category' => 'الأسعار واحتساب CBM',
            'q' => 'هل تكلفة الشحن تشمل الرسوم الجمركية والضرائب؟',
            'a' => 'نعم ✅؛ تكلفة الشحنة تشمل الرسوم الجمركية، ولا يتم احتساب أي رسوم جمركية إضافية بعد دفع تكلفة الشحنة عند استلامها من العميل.'
        ),
        array(
            'category' => 'التخليص الجمركي والأوراق',
            'q' => 'ما هي المواد الممنوع شحنها دولياً؟',
            'a' => 'التزاماً بالقوانين والأنظمة الدولية، نعتذر عن شحن بعض المواد والمنتجات المحظورة أو المقيدة، ومنها: ❌ المواد القابلة للاشتعال | ❌ الأسلحة | ❌ المواد الكيميائية الخطرة | ❌ الماركات المقلدة | ❌ بعض الأدوية | ❌ بعض المواد الغذائية سريعة التلف. يمكنك مراجعة فريقنا للاطلاع على أي قيود تفصيلية قبل الشحن.'
        ),
        array(
            'category' => 'التتبع والتوصيل',
            'q' => 'هل يمكنني تغيير عنوان التوصيل بعد إرسال الشحنة؟',
            'a' => 'نعم، يمكن تعديل عنوان التوصيل طالما أن الشحنة لم تخرج للتسليم النهائي في مصر. يرجى التواصل مع فريق خدمة العملاء في أسرع وقت لتحديث البيانات، مع العلم أن تغيير العنوان قد يؤدي إلى تعديل في الرسوم أو وقت التسليم حسب محافظة التسليم الجديدة.'
        ),
        array(
            'category' => 'خدمة العملاء والفروع',
            'q' => 'كيف يمكنني التواصل مع خدمة العملاء؟',
            'a' => 'يسعدنا الرد على استفساراتكم على مدار الساعة عبر قنوات التواصل المتعددة: 💬 رسائل الواتساب | ✉️ البريد الإلكتروني | 📞 الاتصال المباشر بأرقامنا في صفحة "اتصل بنا" أو زيارة فروعنا الـ 8 في جدة والرياض ومكة المكرمة.'
        ),
        array(
            'category' => 'التغليف والحماية',
            'q' => 'هل توفرون خدمة فك وتركيب الأثاث المنزلي بالمنازل؟',
            'a' => 'نعم، نوفر فريقاً متخصصاً من النجارين والفنيين لفك غرف النوم والمجالس والمطابخ وتغليفها باحترافية في السعودية، مع إمكانية رفع وتركيب الأثاث في منزلك بمصر.'
        ),
        array(
            'category' => 'خدمة العملاء والفروع',
            'q' => 'ما هي فروعكم الرسمية في المملكة العربية السعودية؟',
            'a' => 'لدينا 8 فروع رسمية: 5 فروع في جدة (الفيصلية، البوادي، السلامة، الشرفية، الربوة)، فرع مكة المكرمة (الشوقية/الرصيفة)، وفرعان في الرياض (العزيزية، الملز)، مع تغطية الاستلام من الباب في الدمام والقصيم وخميس مشيط وتبوك.'
        ),
        array(
            'category' => 'الشحن البري والأسطول',
            'q' => 'كيف تضمنون سلامة العفش والبضائع من الاهتزازات أثناء رحلة الشاحنة البرية؟',
            'a' => 'أسطول شاحناتنا وتريلاتنا مبطنة ومزودة بنظام تعليق هوائي يقلل الاهتزازات، بالإضافة إلى الرص الهندسي المتوازن وتثبيت الكراتين والقطع الثمينة بأحزمة شد متينة (Straps) داخل الشاحنة لضمان عدم حدوث أي انزلاق أو احتكاك طوال الرحلة البرية.'
        ),
    );
}

// 9. AUTOMATIC ROUTING & DEFAULT LOGISTICS PAGES FALLBACK
function alfa_template_routing_fallback($template) {
    if (is_404()) {
        $req_uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
        $path = trim(parse_url($req_uri, PHP_URL_PATH), '/');
        
        $routes = array(
            'quote'    => 'page-quote.php',
            'tracking' => 'page-tracking.php',
            'services' => 'page-services.php',
            'branches' => 'page-branches.php',
            'faq'      => 'page-faq.php',
            'blog'     => 'page-blog.php',
        );

        foreach ($routes as $slug => $file) {
            if ($path === $slug || substr($path, -strlen('/' . $slug)) === '/' . $slug) {
                $target = get_template_directory() . '/' . $file;
                if (file_exists($target)) {
                    global $wp_query;
                    if ($wp_query) {
                        $wp_query->is_404 = false;
                        status_header(200);
                    }
                    return $target;
                }
            }
        }
    }
    return $template;
}
add_filter('template_include', 'alfa_template_routing_fallback', 99);

// Auto create pages on theme activation
function alfa_auto_create_theme_pages() {
    $default_pages = array(
        'quote' => array(
            'title'    => 'طلب عرض سعر',
            'template' => 'page-quote.php'
        ),
        'tracking' => array(
            'title'    => 'تتبع الشحنة',
            'template' => 'page-tracking.php'
        ),
        'services' => array(
            'title'    => 'خدمات الشحن البري',
            'template' => 'page-services.php'
        ),
        'branches' => array(
            'title'    => 'فروعنا بالمملكة',
            'template' => 'page-branches.php'
        ),
        'faq' => array(
            'title'    => 'الأسئلة الشائعة',
            'template' => 'page-faq.php'
        ),
        'blog' => array(
            'title'    => 'المدونة اللوجستية',
            'template' => 'page-blog.php'
        ),
    );

    foreach ($default_pages as $slug => $pdata) {
        $existing = get_page_by_path($slug);
        if (!$existing) {
            $new_id = wp_insert_post(array(
                'post_title'     => $pdata['title'],
                'post_name'      => $slug,
                'post_status'    => 'publish',
                'post_type'      => 'page',
                'comment_status' => 'closed',
            ));
            if ($new_id && !is_wp_error($new_id) && !empty($pdata['template'])) {
                update_post_meta($new_id, '_wp_page_template', $pdata['template']);
            }
        }
    }
}
add_action('after_switch_theme', 'alfa_auto_create_theme_pages');

