const fs = require('fs');

// 1. Update elementor-calculator-widget.php
const calcWidgetCode = `<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Alfa_Express_Calculator_Widget extends \\Elementor\\Widget_Base {
    public function get_name() { return 'alfa_calculator'; }
    public function get_title() { return 'Alfa Express Calculator'; }
    public function get_icon() { return 'eicon-calculator'; }
    public function get_categories() { return [ 'general' ]; }
    
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'إعدادات الحاسبة (واتساب)']);
        $this->add_control('title', ['label' => 'العنوان', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => 'اطلب تسعيرة الشحن']);
        $this->add_control('whatsapp_number', ['label' => 'رقم الواتساب', 'type' => \\Elementor\\Controls_Manager::TEXT, 'default' => '966500000000', 'description' => 'أدخل رقم الواتساب مع رمز الدولة، مثال: 966501234567']);
        $this->add_control('enable_3d_parallax', ['label' => 'تفعيل تأثير 3D', 'type' => \\Elementor\\Controls_Manager::SWITCHER, 'return_value' => 'yes', 'default' => 'yes']);
        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $parallax_class = $s['enable_3d_parallax'] === 'yes' ? 'alfa-3d-parallax-container alfa-scroll-parallax' : '';
        $parallax_inner = $s['enable_3d_parallax'] === 'yes' ? 'alfa-3d-parallax-inner' : '';
        $uid = uniqid('alfa_calc_');
        $wa_number = preg_replace('/[^0-9]/', '', $s['whatsapp_number']);
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
                                <option value="أغراض شخصية (شحن بري)">أغراض شخصية (شحن بري)</option>
                                <option value="شحن جوي مستعجل">شحن جوي مستعجل</option>
                                <option value="عفش وأثاث منزلي">عفش وأثاث منزلي (مع الفك والتغليف)</option>
                                <option value="أجهزة وشاشات">أجهزة وشاشات (مع صندوق خشبي)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display:block; font-size:0.85rem; color:#cbd5e1; margin-bottom:0.5rem;">الوزن التقديري (كجم)</label>
                            <input type="number" class="alfa-calc-weight-widget alfa-input" value="15" min="1" style="width:100%; padding:0.85rem 1rem; border-radius: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
                        </div>
                    </div>
                    <button type="button" class="alfa-calc-btn-widget alfa-btn alfa-btn-primary" style="width:100%; padding:1rem; font-size:1.1rem; border-radius: 12px; background: #25D366; color: white; border: none; cursor: pointer; transition: all 0.3s; display:flex; justify-content:center; align-items:center; gap:10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        طلب تسعيرة عبر واتساب
                    </button>
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
                var waNumber = "<?php echo esc_js($wa_number); ?>";

                btn.addEventListener("click", function() {
                    var serviceType = typeSelect.value;
                    var weight = weightInput.value || 0;
                    var text = "مرحباً ألفا إكسبريس، أود الاستفسار عن تكلفة شحن:\\n- نوع الشحنة: " + serviceType + "\\n- الوزن التقديري: " + weight + " كجم";
                    var url = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
                    window.open(url, '_blank');
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
        <style>
            #<?php echo $uid; ?> .alfa-calc-btn-widget:hover { background: #20BA56 !important; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(37, 211, 102, 0.4); }
        </style>
        <?php
    }
}
`;
fs.writeFileSync('./public/wordpress-package/alfa-express-theme/inc/elementor-calculator-widget.php', calcWidgetCode);

// 2. Update functions.php to replace alfa_calculator_shortcode
const funcPath = './public/wordpress-package/alfa-express-theme/functions.php';
let funcContent = fs.readFileSync(funcPath, 'utf8');

const newShortcode = `
// Standalone Shortcode for Calculator (With 3D parallax included)
function alfa_calculator_shortcode($atts) {
    $a = shortcode_atts(array(
        'whatsapp' => '966500000000'
    ), $atts);
    $wa_number = preg_replace('/[^0-9]/', '', $a['whatsapp']);

    ob_start();
    ?>
    <div class="alfa-calculator-widget-wrapper alfa-3d-parallax-container alfa-scroll-parallax">
        <div class="alfa-3d-parallax-inner">
            <h3 class="alfa-calc-widget-title" style="text-align:center; margin-bottom:20px; color:#fff; font-weight:800;">اطلب تسعيرة الشحن</h3>
            <div class="alfa-quote-calculator" style="background:rgba(11, 20, 41, 0.95); border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:2rem; box-shadow:0 25px 50px rgba(0,0,0,0.5); backdrop-filter:blur(10px);">
                <div style="display:grid; grid-template-columns:1fr; gap:1.5rem; margin-bottom:1.5rem;">
                    <div>
                        <label style="display:block; font-size:0.85rem; color:#cbd5e1; margin-bottom:0.5rem;">نوع الشحنة</label>
                        <select id="alfa-calc-type-shortcode" class="alfa-input" style="width:100%; padding:0.85rem 1rem; border-radius: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
                            <option value="أغراض شخصية (شحن بري)">أغراض شخصية (شحن بري)</option>
                            <option value="شحن جوي مستعجل">شحن جوي مستعجل</option>
                            <option value="عفش وأثاث منزلي">عفش وأثاث منزلي (مع الفك والتغليف)</option>
                            <option value="أجهزة وشاشات">أجهزة وشاشات (مع صندوق خشبي)</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; font-size:0.85rem; color:#cbd5e1; margin-bottom:0.5rem;">الوزن التقديري (كجم)</label>
                        <input type="number" id="alfa-calc-weight-shortcode" class="alfa-input" value="15" min="1" style="width:100%; padding:0.85rem 1rem; border-radius: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
                    </div>
                </div>
                <button type="button" id="alfa-calc-btn-shortcode" class="alfa-btn alfa-btn-primary" style="width:100%; padding:1rem; font-size:1.1rem; border-radius: 12px; background: #25D366; color: white; border: none; cursor: pointer; transition: all 0.3s; display:flex; justify-content:center; align-items:center; gap:10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    طلب تسعيرة عبر واتساب
                </button>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var btn = document.getElementById("alfa-calc-btn-shortcode");
            if(btn && !btn.dataset.initialized) {
                btn.dataset.initialized = 'true';
                btn.addEventListener("click", function() {
                    var serviceType = document.getElementById("alfa-calc-type-shortcode").value;
                    var weight = document.getElementById("alfa-calc-weight-shortcode").value || 0;
                    var waNumber = "<?php echo esc_js($wa_number); ?>";
                    var text = "مرحباً ألفا إكسبريس، أود الاستفسار عن تكلفة شحن:\\n- نوع الشحنة: " + serviceType + "\\n- الوزن التقديري: " + weight + " كجم";
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
                        inner.style.transform = \`perspective(1200px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.03)\`;
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
                            wrapper.style.transform = \`translateY(\${yOffset}px)\`;
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
`;

const regex = /\/\/ Standalone Shortcode for Calculator[\s\S]*?add_shortcode\('alfa_calculator',\s*'alfa_calculator_shortcode'\);/;
if (regex.test(funcContent)) {
    funcContent = funcContent.replace(regex, newShortcode + "\nadd_shortcode('alfa_calculator', 'alfa_calculator_shortcode');");
    fs.writeFileSync(funcPath, funcContent);
    console.log("Updated shortcode in functions.php");
} else {
    console.log("Could not find the old shortcode block to replace. Appending...");
    funcContent += "\n" + newShortcode + "\nadd_shortcode('alfa_calculator', 'alfa_calculator_shortcode');";
    fs.writeFileSync(funcPath, funcContent);
}
