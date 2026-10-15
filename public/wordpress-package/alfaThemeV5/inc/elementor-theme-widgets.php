<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Alfa_Hero_Widget extends \Elementor\Widget_Base {
    public function get_name() { return 'alfa_hero'; }
    public function get_title() { return 'Alfa Hero Section'; }
    public function get_icon() { return 'eicon-image-rollover'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Hero Content']);
        $this->add_control('title', ['label' => 'Title', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'شحن دولي من السعودية إلى']);
        $this->add_control('highlight', ['label' => 'Highlight Text', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'مصر']);
        $this->add_control('desc', ['label' => 'Description', 'type' => \Elementor\Controls_Manager::TEXTAREA, 'default' => 'نقل بري وجوي آمن وموثوق بخبرة تفوق 15 عاماً...']);
        $this->add_control('btn1', ['label' => 'Button 1 Text', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'احسب تكلفة شحنتك']);
        $this->add_control('btn2', ['label' => 'Button 2 Text', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'تتبع شحنتك']);
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

class Alfa_Services_Widget extends \Elementor\Widget_Base {
    public function get_name() { return 'alfa_services'; }
    public function get_title() { return 'Alfa Services Grid'; }
    public function get_icon() { return 'eicon-info-box'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Content']);
        $this->add_control('title', ['label' => 'Section Title', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'خدماتنا اللوجستية']);
        $repeater = new \Elementor\Repeater();
        $repeater->add_control('icon', ['label' => 'Icon Emoji', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => '📦']);
        $repeater->add_control('title', ['label' => 'Title', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'شحن بري']);
        $repeater->add_control('desc', ['label' => 'Description', 'type' => \Elementor\Controls_Manager::TEXTAREA, 'default' => 'وصف الخدمة']);
        $this->add_control('services', ['label' => 'Services List', 'type' => \Elementor\Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'default' => [
            ['icon' => '📦', 'title' => 'شحن عفش وأثاث', 'desc' => 'فك وتغليف ونقل آمن عبر أسطول حديث.'],
            ['icon' => '⚡', 'title' => 'شحن أجهزة وإلكترونيات', 'desc' => 'تغليف آمن في صناديق خشبية مخصصة ضد الكسر.'],
            ['icon' => '🚛', 'title' => 'شحن بري بشاحنات مبطنة وتريلات', 'desc' => 'أسطول شاحنات مجهزة لنقل العفش والبضائع بأعلى معايير الأمان.'],
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

class Alfa_Tracking_Teaser_Widget extends \Elementor\Widget_Base {
    public function get_name() { return 'alfa_tracking_teaser'; }
    public function get_title() { return 'Alfa Tracking Notice'; }
    public function get_icon() { return 'eicon-search'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Content']);
        $this->add_control('title', ['label' => 'Title', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'سنرسل لك رسالة بجميع التحديثات']);
        $this->add_control('desc', ['label' => 'Description', 'type' => \Elementor\Controls_Manager::TEXTAREA, 'default' => 'يقوم نظامنا بإرسال رسائل دورية وإشعارات فورية بكل تحرك لشحنتك...']);
        $this->add_control('btn', ['label' => 'Button Text', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'تتبع الشحنة الآن']);
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

class Alfa_Reviews_Widget extends \Elementor\Widget_Base {
    public function get_name() { return 'alfa_reviews'; }
    public function get_title() { return 'Alfa Testimonials'; }
    public function get_icon() { return 'eicon-testimonial'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Alfa Testimonials Content']);
        $this->add_control('title', ['label' => 'Section Title', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'ماذا يقول عملاؤنا عن خدمات الشحن والتسليم؟']);
        $this->add_control('subtitle', ['label' => 'Subtitle / Badge', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'تجارب حقيقية موثقة']);
        
        $this->add_control('source_type', [
            'label'   => 'مصدر التقييمات والصور (Data Source)',
            'type'    => \Elementor\Controls_Manager::SELECT,
            'default' => 'customizer',
            'options' => [
                'customizer' => 'استخدام صور وبيانات التخصيص (Theme Customizer)',
                'custom'     => 'تخصيص يدوي داخل Elementor (Manual Items)',
            ],
            'description' => 'عند اختيار Theme Customizer، يتم جلب الصور والنصوص المحددة في (المظهر > تخصيص > إعدادات ألفا إكسبريس > آراء وتجارب العملاء).'
        ]);

        $repeater = new \Elementor\Repeater();
        $repeater->add_control('image', [
            'label'   => 'صورة الشحنة / العميل (Photo)',
            'type'    => \Elementor\Controls_Manager::MEDIA,
            'default' => [
                'url' => '',
            ],
        ]);
        $repeater->add_control('name', ['label' => 'اسم العميل', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'اسم العميل']);
        $repeater->add_control('city', ['label' => 'المسار / المدينة', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'الرياض -> القاهرة']);
        $repeater->add_control('branch', ['label' => 'الفرع', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'فرع العزيزية - الرياض']);
        $repeater->add_control('review', ['label' => 'نص التقييم', 'type' => \Elementor\Controls_Manager::TEXTAREA, 'default' => 'تجربة ممتازة جداً مع ألفا إكسبريس. تم شحن الأغراض ووصلت بحالة ممتازة.']);
        
        $this->add_control('reviews', [
            'label'       => 'قائمة الآراء المخصصة',
            'type'        => \Elementor\Controls_Manager::REPEATER,
            'fields'      => $repeater->get_controls(),
            'condition'   => ['source_type' => 'custom'],
            'default'     => [
                ['name' => 'م. إبراهيم عبد العزيز', 'city' => 'الرياض -> القاهرة', 'branch' => 'فرع العزيزية - الرياض', 'review' => 'تجربة ممتازة جداً مع ألفا إكسبريس. تم شحن الأغراض ووصلت بحالة الوكالة.'],
                ['name' => 'أحمد جمال', 'city' => 'جدة -> الإسكندرية', 'branch' => 'فرع الفيصلية - جدة', 'review' => 'أفضل شركة تعاملت معها من حيث سرعة الإنجاز والمصداقية في مواعيد التسليم.'],
                ['name' => 'د. سارة فؤاد', 'city' => 'مكة -> أسيوط', 'branch' => 'فرع مكة المكرمة', 'review' => 'تغليف احترافي جداً للأجهزة الكهربائية والشاشات.'],
            ]
        ]);

        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        
        $reviews_data = [];
        if (($s['source_type'] ?? 'customizer') === 'customizer' || empty($s['reviews'])) {
            if (function_exists('alfa_get_reviews')) {
                $reviews_data = alfa_get_reviews();
            }
        } else {
            $index = 1;
            foreach ($s['reviews'] as $item) {
                $img_url = !empty($item['image']['url']) ? $item['image']['url'] : '';
                if (empty($img_url) && function_exists('get_template_directory_uri')) {
                    $img_url = get_template_directory_uri() . '/assets/images/review-' . (($index % 6) + 1) . '.jpeg';
                }
                $reviews_data[] = [
                    'id'        => $index,
                    'name'      => $item['name'] ?? '',
                    'city'      => $item['city'] ?? '',
                    'branch'    => $item['branch'] ?? '',
                    'rating'    => 5,
                    'image_url' => $img_url,
                    'comment'   => $item['review'] ?? '',
                ];
                $index++;
            }
        }

        echo '<section style="padding:5.5rem 0; background:#070d1d;">
            <div class="alfa-container">
                <div style="text-align:center; max-width:700px; margin:0 auto 3.5rem;">';
        if (!empty($s['subtitle'])) {
            echo '<div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">' . esc_html($s['subtitle']) . '</div>';
        }
        echo '<h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">' . esc_html($s['title']) . '</h2>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:2rem;">';
        if (!empty($reviews_data)) {
            foreach($reviews_data as $rev) {
                $img_src = !empty($rev['image_url']) ? $rev['image_url'] : (isset($rev['image']) && function_exists('get_template_directory_uri') ? get_template_directory_uri() . '/assets/images/' . $rev['image'] : '');
                echo '<div class="alfa-card" style="background:#0b1429; border-radius:1.5rem; padding:1.75rem; border:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                            <span style="font-size:0.75rem; color:#38bdf8; background:rgba(56,189,248,0.1); padding:2px 8px; border-radius:6px; font-weight:bold;">' . esc_html($rev['city'] ?? '') . '</span>
                            <div style="color:#f59e0b; font-size:0.9rem;">★★★★★</div>
                        </div>';
                if (!empty($img_src)) {
                    echo '<div style="margin-bottom:1rem; border-radius:0.75rem; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:#020617;">
                            <img src="' . esc_url($img_src) . '" alt="' . esc_attr($rev['name'] ?? '') . '" style="width:100%; height:180px; object-fit:cover; display:block;" onerror="this.style.display=\'none\';">
                          </div>';
                }
                echo '<p style="color:#cbd5e1; line-height:1.7; margin:0 0 1rem; font-size:0.88rem;">"' . esc_html($rev['comment'] ?? $rev['review'] ?? '') . '"</p>
                    </div>
                    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <strong style="color:#fff; font-size:0.9rem; display:block;">' . esc_html($rev['name'] ?? '') . '</strong>
                            <span style="font-size:0.7rem; color:#94a3b8;">' . esc_html($rev['branch'] ?? '') . '</span>
                        </div>
                        <span style="font-size:0.7rem; color:#22c55e; background:rgba(34,197,94,0.1); padding:2px 6px; border-radius:4px; font-weight:bold;">✓ عميل موثق</span>
                    </div>
                </div>';
            }
        }
        echo '</div></div></section>';
    }
}

class Alfa_FAQ_Widget extends \Elementor\Widget_Base {
    public function get_name() { return 'alfa_faqs'; }
    public function get_title() { return 'Alfa FAQ Accordion'; }
    public function get_icon() { return 'eicon-help-o'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'FAQ Content']);
        $this->add_control('title', ['label' => 'Section Title', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'دليل الأسئلة الشائعة والمعلومات الخدمية']);
        $this->add_control('subtitle', ['label' => 'Subtitle', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'إجابات رسمية ومعتمدة']);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        $faqs = function_exists('alfa_get_faqs') ? alfa_get_faqs() : [];

        echo '<section style="padding:5rem 0; background:#070d1d;">
            <div class="alfa-container" style="max-width:850px;">
                <div style="text-align:center; margin-bottom:3rem;">';
        if (!empty($s['subtitle'])) {
            echo '<div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">' . esc_html($s['subtitle']) . '</div>';
        }
        echo '<h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">' . esc_html($s['title']) . '</h2>
                </div>
                <div id="alfa-faq-list" style="display:flex; flex-direction:column; gap:1rem;">';
        foreach ($faqs as $i => $faq) {
            echo '<details class="alfa-faq-item" style="background:#0b1429; border:1px solid rgba(255,255,255,0.08); border-radius:1rem; padding:1.25rem;">
                <summary style="display:flex; align-items:center; justify-content:space-between; gap:1rem; cursor:pointer; color:#fff; font-weight:bold; font-size:1.05rem;">
                    <span style="display:flex; align-items:center; gap:0.75rem;">
                        <span style="width:26px; height:26px; border-radius:8px; background:rgba(227,6,19,0.15); color:#e30613; font-weight:bold; display:inline-flex; align-items:center; justify-content:center; font-size:0.8rem; shrink:0; flex-shrink:0;">' . ($i + 1) . '</span>
                        <span>' . esc_html($faq['q']) . '</span>
                    </span>
                    <span style="color:#e30613; font-size:1.25rem; font-weight:bold;">+</span>
                </summary>
                <div class="alfa-faq-content" style="color:#cbd5e1; line-height:1.8; margin-top:1rem; padding-top:0.75rem; border-top:1px solid rgba(255,255,255,0.06); font-size:0.95rem;">
                    ' . nl2br(esc_html($faq['a'])) . '
                </div>
            </details>';
        }
        echo '</div></div></section>';
    }
}
