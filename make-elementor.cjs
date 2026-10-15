const fs = require('fs');
const path = require('path');

// 1. Wrap templates
const templates = [
    'front-page.php',
    'page-services.php',
    'page-branches.php',
    'page-quote.php',
    'page-faq.php',
    'page-tracking.php',
    'page-blog.php'
];

templates.forEach(file => {
    const filePath = path.join('./public/wordpress-package/alfa-express-theme', file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<!-- Elementor Compatibility Area -->[\s\S]*?(?=<\?php get_footer\(\); \?>)/g, '');

    const headerMatch = content.match(/(get_header\(\);\s*\?>)/);
    const footerMatch = content.match(/(<\?php\s+get_footer\(\);\s*\?>)/);

    if (headerMatch && footerMatch) {
        const headerEnd = headerMatch.index + headerMatch[0].length;
        const footerStart = footerMatch.index;

        const middleContent = content.substring(headerEnd, footerStart);

        const wrappedContent = `
<?php if ( class_exists( '\\Elementor\\Plugin' ) && \\Elementor\\Plugin::instance()->db->is_built_with_elementor( get_the_ID() ) ) : ?>
    <div class="alfa-elementor-content">
        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
<?php else : ?>
${middleContent}
    <div class="alfa-standard-content" style="display:none;">
        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
<?php endif; ?>
`;
        const finalContent = content.substring(0, headerEnd) + wrappedContent + content.substring(footerStart);
        fs.writeFileSync(filePath, finalContent);
        console.log("Wrapped: " + file);
    }
});

// 2. Generate Elementor Theme Widgets
const widgetsCode = `<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Alfa_Hero_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_hero'; }
    public function get_title() { return 'Alfa Hero Section'; }
    public function get_icon() { return 'eicon-image-rollover'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Hero Content']);
        $this->add_control('title', ['label' => 'Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'شحن دولي من السعودية إلى']);
        $this->add_control('highlight', ['label' => 'Highlight Text', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'مصر']);
        $this->add_control('desc', ['label' => 'Description', 'type' => \\Elementor\\Controls_Manager::TEXTAREA, 'default' => 'نقل بري وجوي آمن وموثوق بخبرة تفوق 15 عاماً...']);
        $this->add_control('btn1', ['label' => 'Button 1 Text', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'احسب تكلفة شحنتك']);
        $this->add_control('btn2', ['label' => 'Button 2 Text', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'تتبع شحنتك']);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        echo '<section style="position:relative; padding:6rem 0; overflow:hidden; background:#070d1d; min-height:80vh; display:flex; align-items:center;">
            <div class="alfa-container" style="position:relative; z-index:2; width:100%;">
                <div style="display:grid; grid-template-columns:1fr; text-align:center; gap:2rem;">
                    <div>
                        <h1 style="font-size:clamp(2.5rem, 6vw, 4.5rem); font-weight:900; color:#fff; line-height:1.2; margin:0 0 1.5rem;">' . esc_html($s['title']) . ' <span style="color:#e30613;">' . esc_html($s['highlight']) . '</span></h1>
                        <p style="font-size:clamp(1rem, 2vw, 1.25rem); color:#cbd5e1; line-height:1.8; margin:0 auto 2.5rem; max-width:800px;">' . esc_html($s['desc']) . '</p>
                        <div style="display:flex; flex-wrap:wrap; gap:1rem; justify-content:center;">
                            <a href="#quote" class="alfa-btn alfa-btn-primary" style="padding:1rem 2.5rem; font-size:1.1rem;">' . esc_html($s['btn1']) . '</a>
                            <a href="#track" class="alfa-btn alfa-btn-outline" style="padding:1rem 2.5rem; font-size:1.1rem;">' . esc_html($s['btn2']) . '</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>';
    }
}

class Alfa_Services_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_services'; }
    public function get_title() { return 'Alfa Services Grid'; }
    public function get_icon() { return 'eicon-info-box'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Content']);
        $this->add_control('title', ['label' => 'Section Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'خدماتنا اللوجستية']);
        $repeater = new \\Elementor\\Repeater();
        $repeater->add_control('icon', ['label' => 'Icon Emoji', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '📦']);
        $repeater->add_control('title', ['label' => 'Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'شحن بري']);
        $repeater->add_control('desc', ['label' => 'Description', 'type' => \\Elementor\\Controls_Manager::TEXTAREA, 'default' => 'وصف الخدمة']);
        $this->add_control('services', ['label' => 'Services List', 'type' => \\Elementor\\Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'default' => [
            ['icon' => '📦', 'title' => 'شحن عفش وأثاث', 'desc' => 'فك وتغليف ونقل آمن عبر أسطول حديث.'],
            ['icon' => '⚡', 'title' => 'شحن أجهزة وإلكترونيات', 'desc' => 'تغليف آمن في صناديق خشبية مخصصة ضد الكسر.'],
            ['icon' => '✈️', 'title' => 'شحن جوي مستعجل', 'desc' => 'استلام وتسليم سريع للطرود العاجلة والهدايا.'],
        ]]);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        echo '<section style="padding:6rem 0; background:#0b1429;">
            <div class="alfa-container">
                <h2 style="text-align:center; font-size:2.5rem; font-weight:900; color:#fff; margin-bottom:3rem;">' . esc_html($s['title']) . '</h2>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:2rem;">';
        if (!empty($s['services'])) {
            foreach($s['services'] as $item) {
                echo '<div style="background:#070d1d; border:1px solid rgba(255,255,255,0.08); border-radius:1.5rem; padding:2rem; text-align:center; transition:transform 0.3s;">
                    <div style="font-size:3rem; margin-bottom:1.5rem;">' . $item['icon'] . '</div>
                    <h3 style="color:#fff; font-size:1.5rem; font-weight:800; margin-bottom:1rem;">' . esc_html($item['title']) . '</h3>
                    <p style="color:#cbd5e1; line-height:1.7; margin:0;">' . esc_html($item['desc']) . '</p>
                </div>';
            }
        }
        echo '</div></div></section>';
    }
}

class Alfa_Tracking_Teaser_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_tracking_teaser'; }
    public function get_title() { return 'Alfa Tracking Notice'; }
    public function get_icon() { return 'eicon-search'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Content']);
        $this->add_control('title', ['label' => 'Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'سنرسل لك رسالة بجميع التحديثات']);
        $this->add_control('desc', ['label' => 'Description', 'type' => \\Elementor\\Controls_Manager::TEXTAREA, 'default' => 'يقوم نظامنا بإرسال رسائل دورية وإشعارات فورية بكل تحرك لشحنتك...']);
        $this->add_control('btn', ['label' => 'Button Text', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'تتبع الشحنة الآن']);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        echo '<section style="padding:4rem 0; background:#070d1d; border-top:1px solid rgba(255,255,255,0.08);">
            <div class="alfa-container">
                <div style="background:linear-gradient(135deg, #0e1d3d 0%, #11244d 50%, #0e1d3d 100%); border-radius:1.75rem; padding:2.5rem; border:1px solid rgba(255,255,255,0.15);">
                    <h3 style="font-size:1.85rem; font-weight:900; color:#fff; margin-bottom:1rem;">💬 ' . esc_html($s['title']) . '</h3>
                    <p style="color:#cbd5e1; line-height:1.7; margin-bottom:1.5rem;">' . esc_html($s['desc']) . '</p>
                    <form action="https://alfaexpress-ksa.com/track" method="GET" target="_blank" style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                        <input type="text" name="code" placeholder="أدخل رقم البوليصة" dir="ltr" class="alfa-input" style="flex:1; min-width:200px; padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.3); color:#fff;">
                        <button type="submit" class="alfa-btn alfa-btn-primary" style="padding:0.85rem 1.75rem;">' . esc_html($s['btn']) . '</button>
                    </form>
                </div>
            </div>
        </section>';
    }
}

class Alfa_Reviews_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_reviews'; }
    public function get_title() { return 'Alfa Testimonials'; }
    public function get_icon() { return 'eicon-testimonial'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Content']);
        $this->add_control('title', ['label' => 'Section Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'تجارب عملائنا']);
        $repeater = new \\Elementor\\Repeater();
        $repeater->add_control('name', ['label' => 'Name', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'اسم العميل']);
        $repeater->add_control('review', ['label' => 'Review', 'type' => \\Elementor\\Controls_Manager::TEXTAREA, 'default' => 'التعليق...']);
        $this->add_control('reviews', ['label' => 'Reviews', 'type' => \\Elementor\\Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'default' => [
            ['name' => 'م. إبراهيم عبد العزيز', 'review' => 'تجربة ممتازة جداً مع ألفا إكسبريس. تم شحن الأغراض ووصلت بحالة الوكالة.'],
            ['name' => 'أحمد جمال', 'review' => 'أفضل شركة تعاملت معها من حيث سرعة الإنجاز والمصداقية في مواعيد التسليم.'],
            ['name' => 'د. سارة فؤاد', 'review' => 'تغليف احترافي جداً للأجهزة الكهربائية.'],
        ]]);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        echo '<section style="padding:5.5rem 0; background:#070d1d;">
            <div class="alfa-container">
                <h2 style="text-align:center; font-size:2.5rem; font-weight:900; color:#fff; margin-bottom:3rem;">' . esc_html($s['title']) . '</h2>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:2rem;">';
        if (!empty($s['reviews'])) {
            foreach($s['reviews'] as $item) {
                echo '<div style="background:#0b1429; border-radius:1.5rem; padding:2rem; border:1px solid rgba(255,255,255,0.08);">
                    <div style="color:#eab308; font-size:1.2rem; margin-bottom:1rem;">★★★★★</div>
                    <p style="color:#cbd5e1; line-height:1.7; margin-bottom:1.5rem; font-style:italic;">"' . esc_html($item['review']) . '"</p>
                    <strong style="color:#fff; display:block;">' . esc_html($item['name']) . '</strong>
                </div>';
            }
        }
        echo '</div></div></section>';
    }
}
`;
fs.writeFileSync('./public/wordpress-package/alfa-express-theme/inc/elementor-theme-widgets.php', widgetsCode);
console.log("Generated elementor-theme-widgets.php");

// 3. Update functions.php to register the new widgets
const funcPath = './public/wordpress-package/alfa-express-theme/functions.php';
let funcContent = fs.readFileSync(funcPath, 'utf8');
if (!funcContent.includes('elementor-theme-widgets.php')) {
    const repl = "$1\n    require_once get_template_directory() . '/inc/elementor-theme-widgets.php';\n    $widgets_manager->register( new \\Alfa_Hero_Widget() );\n    $widgets_manager->register( new \\Alfa_Services_Widget() );\n    $widgets_manager->register( new \\Alfa_Tracking_Teaser_Widget() );\n    $widgets_manager->register( new \\Alfa_Reviews_Widget() );\n";
    funcContent = funcContent.replace(/(\$widgets_manager->register\( new \\Alfa_Express_Calculator_Widget\(\) \);)/, repl);
    fs.writeFileSync(funcPath, funcContent);
    console.log("Updated functions.php");
}
