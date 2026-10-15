const fs = require('fs');

// 1. Calculator Widget (with dynamic Elementor controls for variables)
const calcWidgetCode = `<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Alfa_Express_Calculator_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_calculator'; }
    public function get_title() { return 'Alfa Express Calculator'; }
    public function get_icon() { return 'eicon-calculator'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Calculator Settings']);
        $this->add_control('title', ['label' => 'Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'حاسبة الشحن التقديرية']);
        $this->add_control('enable_3d_parallax', ['label' => 'Enable 3D Parallax', 'type' => \\Elementor\\Controls_Manager::SWITCHER, 'return_value' => 'yes', 'default' => 'yes']);
        $this->end_controls_section();

        // Personal Rates
        $this->start_controls_section('personal', ['label' => 'أغراض شخصية (بري)']);
        $this->add_control('personal_rate', ['label' => 'سعر الكيلو', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 12]);
        $this->add_control('personal_min', ['label' => 'الحد الأدنى', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 150]);
        $this->add_control('personal_days', ['label' => 'مدة التوصيل', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '10 - 15 يوم عمل']);
        $this->end_controls_section();

        // Air Rates
        $this->start_controls_section('air', ['label' => 'شحن جوي مستعجل']);
        $this->add_control('air_rate', ['label' => 'سعر الكيلو', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 24]);
        $this->add_control('air_min', ['label' => 'الحد الأدنى', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 250]);
        $this->add_control('air_days', ['label' => 'مدة التوصيل', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '3 - 7 أيام عمل']);
        $this->end_controls_section();

        // Furniture Rates
        $this->start_controls_section('furniture', ['label' => 'عفش وأثاث منزلي']);
        $this->add_control('furniture_rate', ['label' => 'سعر الكيلو', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 9]);
        $this->add_control('furniture_min', ['label' => 'الحد الأدنى', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 500]);
        $this->add_control('furniture_days', ['label' => 'مدة التوصيل', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '12 - 18 يوم عمل']);
        $this->end_controls_section();

        // Electronics Rates
        $this->start_controls_section('electronics', ['label' => 'أجهزة وشاشات']);
        $this->add_control('electronics_rate', ['label' => 'سعر الكيلو', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 15]);
        $this->add_control('electronics_min', ['label' => 'الحد الأدنى', 'type' => \\Elementor\\Controls_Manager::NUMBER, 'default' => 350]);
        $this->add_control('electronics_days', ['label' => 'مدة التوصيل', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '8 - 14 يوم عمل (شامل الصندوق الخشبي)']);
        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $parallax_class = $s['enable_3d_parallax'] === 'yes' ? 'alfa-3d-parallax-container alfa-scroll-parallax' : '';
        $parallax_inner = $s['enable_3d_parallax'] === 'yes' ? 'alfa-3d-parallax-inner' : '';
        $uid = uniqid('alfa_calc_');
        ?>
        <div class="alfa-calculator-widget-wrapper <?php echo esc_attr($parallax_class); ?>" id="<?php echo $uid; ?>">
            <div class="<?php echo esc_attr($parallax_inner); ?>">
                <?php if (!empty($s['title'])) : ?>
                    <h3 class="alfa-calc-widget-title" style="text-align:center; margin-bottom:20px; color:#fff; font-weight:800;"><?php echo esc_html($s['title']); ?></h3>
                <?php endif; ?>
                <div class="alfa-quote-calculator" style="background:rgba(11, 20, 41, 0.95); border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:2rem; box-shadow:0 25px 50px rgba(0,0,0,0.5); backdrop-filter:blur(10px);">
                    <div style="display:grid; grid-template-columns:1fr; gap:1.5rem; margin-bottom:1.5rem;">
                        <div>
                            <label style="display:block; font-size:0.85rem; color:#cbd5e1; margin-bottom:0.5rem;">نوع الشحنة</label>
                            <select class="alfa-calc-type-widget alfa-input" style="width:100%; padding:0.85rem 1rem; border-radius: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
                                <option value="personal">أغراض شخصية (شحن بري)</option>
                                <option value="air">شحن جوي مستعجل</option>
                                <option value="furniture">عفش وأثاث منزلي (مع الفك والتغليف)</option>
                                <option value="electronics">أجهزة وشاشات (مع صندوق خشبي)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display:block; font-size:0.85rem; color:#cbd5e1; margin-bottom:0.5rem;">الوزن التقديري (كجم)</label>
                            <input type="number" class="alfa-calc-weight-widget alfa-input" value="15" min="1" style="width:100%; padding:0.85rem 1rem; border-radius: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
                        </div>
                    </div>
                    <button type="button" class="alfa-calc-btn-widget alfa-btn alfa-btn-primary" style="width:100%; padding:1rem; font-size:1.1rem; border-radius: 12px; background: #e30613; color: white; border: none; cursor: pointer; transition: all 0.3s;">
                        احسب التكلفة التقديرية
                    </button>
                    <div class="alfa-calc-result-widget" style="display:none; margin-top:1.5rem; background:rgba(227, 6, 19, 0.1); border:1px solid rgba(227, 6, 19, 0.3); border-radius:1rem; padding:1.25rem; text-align:center;">
                        <div style="font-size:0.85rem; color:#cbd5e1; margin-bottom:0.5rem;">التكلفة الإجمالية التقديرية</div>
                        <div style="font-size:2.5rem; font-weight:900; color:#fff; line-height:1;" dir="ltr">
                            <span class="alfa-calc-total-widget">0</span> <span style="font-size:1rem; color:#e30613;">SAR</span>
                        </div>
                        <div style="margin-top:0.75rem; font-size:0.8rem; color:#94a3b8; display:flex; justify-content:center; gap:10px;">
                            <span title="مدة التوصيل">⏱ <span class="alfa-calc-days-widget"></span></span>
                            <span>|</span>
                            <span title="شامل التخليص">✓ شامل التخليص الجمركي</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            (function() {
                var wrapper = document.getElementById("<?php echo $uid; ?>");
                if(!wrapper) return;
                var btn = wrapper.querySelector(".alfa-calc-btn-widget");
                var typeSelect = wrapper.querySelector(".alfa-calc-type-widget");
                var weightInput = wrapper.querySelector(".alfa-calc-weight-widget");
                var resultDiv = wrapper.querySelector(".alfa-calc-result-widget");
                var totalSpan = wrapper.querySelector(".alfa-calc-total-widget");
                var daysSpan = wrapper.querySelector(".alfa-calc-days-widget");

                var pricing = {
                    personal: { rate: <?php echo floatval($s['personal_rate']); ?>, min: <?php echo floatval($s['personal_min']); ?>, days: "<?php echo esc_js($s['personal_days']); ?>" },
                    air: { rate: <?php echo floatval($s['air_rate']); ?>, min: <?php echo floatval($s['air_min']); ?>, days: "<?php echo esc_js($s['air_days']); ?>" },
                    furniture: { rate: <?php echo floatval($s['furniture_rate']); ?>, min: <?php echo floatval($s['furniture_min']); ?>, days: "<?php echo esc_js($s['furniture_days']); ?>" },
                    electronics: { rate: <?php echo floatval($s['electronics_rate']); ?>, min: <?php echo floatval($s['electronics_min']); ?>, days: "<?php echo esc_js($s['electronics_days']); ?>" }
                };

                btn.addEventListener("click", function() {
                    var serviceType = typeSelect.value;
                    var weight = parseFloat(weightInput.value) || 0;
                    var config = pricing[serviceType] || pricing.personal;

                    var totalEstimated = Math.max(config.min, Math.round(weight * config.rate));
                    totalSpan.innerText = totalEstimated.toLocaleString();
                    daysSpan.innerText = config.days;
                    resultDiv.style.display = "block";
                });

                // Parallax Init
                if (!wrapper.dataset.parallaxInit && wrapper.classList.contains("alfa-3d-parallax-container")) {
                    wrapper.dataset.parallaxInit = 'true';
                    var inner = wrapper.querySelector(".alfa-3d-parallax-inner");
                    if(inner) {
                        wrapper.addEventListener("mousemove", function(e) {
                            var rect = wrapper.getBoundingClientRect();
                            var x = e.clientX - rect.left; 
                            var y = e.clientY - rect.top;
                            var centerX = rect.width / 2;
                            var centerY = rect.height / 2;
                            var rotateX = ((y - centerY) / centerY) * -12; 
                            var rotateY = ((x - centerX) / centerX) * 12;
                            inner.style.transform = "perspective(1200px) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg) scale(1.03)";
                            inner.style.transition = "transform 0.1s ease-out";
                        });
                        wrapper.addEventListener("mouseleave", function() {
                            inner.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
                            inner.style.transition = "transform 0.5s ease-out";
                        });
                    }
                }
            })();
        </script>
        <?php
    }
}
`;
fs.writeFileSync('./public/wordpress-package/alfa-express-theme/inc/elementor-calculator-widget.php', calcWidgetCode);

// 2. Extra Elementor Theme Widgets for the rest of the sections
const themeWidgetsCode = `<?php
if ( ! defined( 'ABSPATH' ) ) exit;

// HERO WIDGET
class Alfa_Hero_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_hero'; }
    public function get_title() { return 'Alfa Hero Section'; }
    public function get_icon() { return 'eicon-image-rollover'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Hero Content']);
        $this->add_control('title', ['label' => 'Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'شحن دولي من السعودية إلى']);
        $this->add_control('highlight', ['label' => 'Highlight Text', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'مصر']);
        $this->add_control('desc', ['label' => 'Description', 'type' => \\Elementor\\Controls_Manager::TEXTAREA, 'default' => 'نقل بري وجوي آمن وموثوق بخبرة تفوق 15 عاماً.']);
        $this->add_control('btn1', ['label' => 'Button 1', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'احسب تكلفة شحنتك']);
        $this->add_control('btn2', ['label' => 'Button 2', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'تتبع شحنتك']);
        $this->add_control('image', ['label' => 'Background Image URL', 'type' => \\Elementor\\Controls_Manager::MEDIA]);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        $bg = !empty($s['image']['url']) ? $s['image']['url'] : get_template_directory_uri() . '/assets/images/alfa-car.png';
        echo '<section style="position:relative; padding:6rem 0; overflow:hidden; background:#070d1d; min-height:80vh; display:flex; align-items:center;">
            <div style="position:absolute; inset:0; opacity:0.3; background:url(' . esc_url($bg) . ') center/cover;"></div>
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

// SERVICES WIDGET
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

// TRACKING WIDGET
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

// REVIEWS WIDGET
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
            ['name' => 'أحمد جمال', 'review' => 'أفضل شركة تعاملت معها من حيث سرعة الإنجاز والمصداقية.'],
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

// TRUST STATS WIDGET
class Alfa_Trust_Stats_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_trust_stats'; }
    public function get_title() { return 'Alfa Trust Stats'; }
    public function get_icon() { return 'eicon-counter'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Stats']);
        $repeater = new \\Elementor\\Repeater();
        $repeater->add_control('number', ['label' => 'Number', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '15+']);
        $repeater->add_control('label', ['label' => 'Label', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'عام من الخبرة']);
        $this->add_control('stats', ['label' => 'Stats', 'type' => \\Elementor\\Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'default' => [
            ['number' => '15+', 'label' => 'عام من الخبرة'],
            ['number' => '25K+', 'label' => 'شحنة ناجحة'],
            ['number' => '4+', 'label' => 'فروع بالمملكة ومصر'],
        ]]);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        echo '<section style="padding:4rem 0; background:#0b1429; border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05);">
            <div class="alfa-container">
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:2rem; text-align:center;">';
        if (!empty($s['stats'])) {
            foreach($s['stats'] as $stat) {
                echo '<div>
                    <div style="font-size:3rem; font-weight:900; color:#e30613; line-height:1;">' . esc_html($stat['number']) . '</div>
                    <div style="color:#94a3b8; margin-top:0.5rem; font-size:1.1rem;">' . esc_html($stat['label']) . '</div>
                </div>';
            }
        }
        echo '</div></div></section>';
    }
}

// HOW IT WORKS WIDGET
class Alfa_How_It_Works_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_how_it_works'; }
    public function get_title() { return 'Alfa How It Works'; }
    public function get_icon() { return 'eicon-time-line'; }
    public function get_categories() { return [ 'general' ]; }
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'Steps']);
        $this->add_control('title', ['label' => 'Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'كيف نعمل؟']);
        $repeater = new \\Elementor\\Repeater();
        $repeater->add_control('step_num', ['label' => 'Step Number', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '1']);
        $repeater->add_control('title', ['label' => 'Title', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'استلام الشحنة']);
        $repeater->add_control('desc', ['label' => 'Description', 'type' => \\Elementor\\Controls_Manager::TEXTAREA, 'default' => 'نستلم الشحنة من باب بيتك']);
        $this->add_control('steps', ['label' => 'Steps', 'type' => \\Elementor\\Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'default' => [
            ['step_num' => '1', 'title' => 'استلام الشحنة', 'desc' => 'نستلم الشحنة من باب بيتك أو في فرعنا.'],
            ['step_num' => '2', 'title' => 'التغليف والتجهيز', 'desc' => 'تغليف احترافي لضمان السلامة.'],
            ['step_num' => '3', 'title' => 'الشحن والتخليص', 'desc' => 'نقوم بكافة الإجراءات الجمركية.'],
            ['step_num' => '4', 'title' => 'التسليم للمستلم', 'desc' => 'توصيل لباب المستلم في مصر.'],
        ]]);
        $this->end_controls_section();
    }
    protected function render() {
        $s = $this->get_settings_for_display();
        echo '<section style="padding:6rem 0; background:#070d1d;">
            <div class="alfa-container">
                <h2 style="text-align:center; font-size:2.5rem; font-weight:900; color:#fff; margin-bottom:4rem;">' . esc_html($s['title']) . '</h2>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:2rem;">';
        if (!empty($s['steps'])) {
            foreach($s['steps'] as $step) {
                echo '<div style="position:relative; text-align:center; padding:2rem; background:#0b1429; border-radius:1.5rem; border:1px solid rgba(255,255,255,0.05);">
                    <div style="width:3rem; height:3rem; background:#e30613; color:#fff; font-weight:bold; font-size:1.5rem; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; border:4px solid #070d1d; position:relative; z-index:2; top:-3rem;">' . esc_html($step['step_num']) . '</div>
                    <h3 style="color:#fff; font-size:1.3rem; margin-bottom:1rem; margin-top:-2rem;">' . esc_html($step['title']) . '</h3>
                    <p style="color:#94a3b8; line-height:1.6;">' . esc_html($step['desc']) . '</p>
                </div>';
            }
        }
        echo '</div></div></section>';
    }
}
`;
fs.writeFileSync('./public/wordpress-package/alfa-express-theme/inc/elementor-theme-widgets.php', themeWidgetsCode);

// 3. Make sure all widgets are registered in functions.php
let funcPath = './public/wordpress-package/alfa-express-theme/functions.php';
let funcContent = fs.readFileSync(funcPath, 'utf8');

const updatedRegisterBlock = `
// 4. ELEMENTOR WIDGET & SHORTCODE
function alfa_register_elementor_widgets( $widgets_manager ) {
    require_once get_template_directory() . '/inc/elementor-calculator-widget.php';
    $widgets_manager->register( new \\Alfa_Express_Calculator_Widget() );

    require_once get_template_directory() . '/inc/elementor-theme-widgets.php';
    $widgets_manager->register( new \\Alfa_Hero_Widget() );
    $widgets_manager->register( new \\Alfa_Services_Widget() );
    $widgets_manager->register( new \\Alfa_Tracking_Teaser_Widget() );
    $widgets_manager->register( new \\Alfa_Reviews_Widget() );
    $widgets_manager->register( new \\Alfa_Trust_Stats_Widget() );
    $widgets_manager->register( new \\Alfa_How_It_Works_Widget() );
}
add_action( 'elementor/widgets/register', 'alfa_register_elementor_widgets' );
`;

funcContent = funcContent.replace(/\/\/ 4\. ELEMENTOR WIDGET & SHORTCODE[\s\S]*?add_action\(\s*'elementor\/widgets\/register',\s*'alfa_register_elementor_widgets'\s*\);/g, updatedRegisterBlock);
fs.writeFileSync(funcPath, funcContent);
