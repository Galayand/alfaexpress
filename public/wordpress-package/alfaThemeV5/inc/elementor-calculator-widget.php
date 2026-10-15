<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Alfa_Express_Calculator_Widget extends \Elementor\Widget_Base {
    public function get_name() { return 'alfa_calculator'; }
    public function get_title() { return 'حاسبة الشحن البري بالحجم (CBM) - ألفا إكسبريس'; }
    public function get_icon() { return 'eicon-calculator'; }
    public function get_categories() { return [ 'general' ]; }
    
    protected function register_controls() {
        $this->start_controls_section('content', ['label' => 'إعدادات حاسبة الشحن بالحجم']);
        $this->add_control('title', ['label' => 'العنوان الرئيسي', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'احسب حجم شحنتك بالمتر المكعب (CBM)']);
        $this->add_control('subtitle', ['label' => 'الوصف التوضيحي', 'type' => \Elementor\Controls_Manager::TEXTAREA, 'default' => 'في الشحن البري يتم احتساب التكلفة وفق الحجم المشغول في الشاحنة لضمان أفضل سعر وأمان تام للمنقولات']);
        $this->add_control('whatsapp_number', ['label' => 'رقم الواتساب', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => '966501653999', 'description' => 'أدخل رقم الواتساب مع رمز الدولة، مثال: 966501653999']);
        $this->add_control('button_text', ['label' => 'نص الزر', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'إرسال تفاصيل الحجم إلى واتساب ألفا']);
        $this->add_control('enable_3d_parallax', ['label' => 'تفعيل تأثير 3D التفاعلي', 'type' => \Elementor\Controls_Manager::SWITCHER, 'return_value' => 'yes', 'default' => 'yes']);
        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $parallax_class = $s['enable_3d_parallax'] === 'yes' ? 'alfa-3d-parallax-container alfa-scroll-parallax' : '';
        $parallax_inner = $s['enable_3d_parallax'] === 'yes' ? 'alfa-3d-parallax-inner' : '';
        $uid = uniqid('alfa_calc_');
        $wa_number = preg_replace('/[^0-9]/', '', !empty($s['whatsapp_number']) ? $s['whatsapp_number'] : '966501653999');
        ?>
        <div class="alfa-calculator-widget-wrapper <?php echo esc_attr($parallax_class); ?>" id="<?php echo $uid; ?>">
            <div class="<?php echo esc_attr($parallax_inner); ?>">
                <?php if (!empty($s['title'])) : ?>
                    <h3 class="alfa-calc-widget-title" style="text-align:center; margin-bottom:8px; color:#fff; font-weight:800; font-size:1.5rem;"><?php echo esc_html($s['title']); ?></h3>
                <?php endif; ?>
                <?php if (!empty($s['subtitle'])) : ?>
                    <p style="text-align:center; margin-bottom:20px; color:#94a3b8; font-size:0.9rem;"><?php echo esc_html($s['subtitle']); ?></p>
                <?php endif; ?>

                <div class="alfa-quote-calculator" style="background:rgba(11, 20, 41, 0.95); border:1px solid rgba(255,255,255,0.12); border-radius:1.5rem; padding:1.75rem; box-shadow:0 25px 50px rgba(0,0,0,0.5); backdrop-filter:blur(10px);">
                    <div style="display:grid; grid-template-columns:1fr; gap:1.25rem; margin-bottom:1.25rem;">
                        <div>
                            <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">نوع الشحنة البرية</label>
                            <select class="alfa-calc-type-widget alfa-input" style="width:100%; padding:0.85rem 1rem; border-radius:12px; background:rgba(15, 23, 42, 0.9); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:0.9rem;">
                                <option value="عفش وأثاث منزلي كامل مع الفك والتركيب">عفش وأثاث منزلي كامل (مع الفك والتركيب)</option>
                                <option value="أغراض شخصية وشنط وكراتين">أغراض شخصية وشنط وكراتين (شحن بري)</option>
                                <option value="أجهزة كهربائية وشاشات (تغليف خشبي خاص)">أجهزة كهربائية وشاشات (تغليف خشبي خاص)</option>
                                <option value="بضائع ومعدات تجارية">بضائع ومعدات تجارية (شاحنة مخصصة)</option>
                            </select>
                        </div>

                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                            <div>
                                <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">مدينة الاستلام (السعودية)</label>
                                <select class="alfa-calc-origin-widget alfa-input" style="width:100%; padding:0.85rem 1rem; border-radius:12px; background:rgba(15, 23, 42, 0.9); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:0.9rem;">
                                    <option value="جدة">جدة (المقر الرئيسي)</option>
                                    <option value="الرياض">الرياض</option>
                                    <option value="مكة المكرمة">مكة المكرمة</option>
                                    <option value="المدينة المنورة">المدينة المنورة</option>
                                    <option value="الدمام / الخبر">الدمام والخبر</option>
                                    <option value="مدينة أخرى">مدينة أخرى بالمملكة</option>
                                </select>
                            </div>
                            <div>
                                <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">محافظة التسليم (مصر)</label>
                                <select class="alfa-calc-dest-widget alfa-input" style="width:100%; padding:0.85rem 1rem; border-radius:12px; background:rgba(15, 23, 42, 0.9); border:1px solid rgba(255,255,255,0.15); color:#fff; font-size:0.9rem;">
                                    <option value="القاهرة">القاهرة</option>
                                    <option value="الجيزة">الجيزة</option>
                                    <option value="الإسكندرية">الإسكندرية</option>
                                    <option value="الدقهلية / المنصورة">الدقهلية (المنصورة)</option>
                                    <option value="الغربية / طنطا">الغربية (طنطا)</option>
                                    <option value="الشرقية / الزقازيق">الشرقية</option>
                                    <option value="المنوفية / القليوبية">المنوفية والقليوبية</option>
                                    <option value="محافظات الصعيد (أسيوط/سوهاج/قنا)">محافظات الصعيد</option>
                                    <option value="محافظة أخرى">محافظة أخرى بمصر</option>
                                </select>
                            </div>
                        </div>

                        <!-- Volumetric Calculator Dimensions & CBM -->
                        <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:1rem;">
                            <label style="display:block; font-size:0.85rem; font-weight:bold; color:#f59e0b; margin-bottom:0.6rem;">أبعاد الشحنة لحساب الحجم (سم)</label>
                            
                            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.5rem; margin-bottom:0.75rem;">
                                <div>
                                    <span style="display:block; font-size:0.75rem; color:#94a3b8;">الطول (سم)</span>
                                    <input type="number" class="alfa-dim-l" value="100" min="10" style="width:100%; padding:0.5rem; border-radius:8px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                                </div>
                                <div>
                                    <span style="display:block; font-size:0.75rem; color:#94a3b8;">العرض (سم)</span>
                                    <input type="number" class="alfa-dim-w" value="80" min="10" style="width:100%; padding:0.5rem; border-radius:8px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                                </div>
                                <div>
                                    <span style="display:block; font-size:0.75rem; color:#94a3b8;">الارتفاع (سم)</span>
                                    <input type="number" class="alfa-dim-h" value="60" min="10" style="width:100%; padding:0.5rem; border-radius:8px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                                </div>
                                <div>
                                    <span style="display:block; font-size:0.75rem; color:#94a3b8;">العدد</span>
                                    <input type="number" class="alfa-dim-qty" value="1" min="1" style="width:100%; padding:0.5rem; border-radius:8px; background:#070d1d; border:1px solid rgba(255,255,255,0.2); color:#fff; text-align:center;">
                                </div>
                            </div>

                            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(227,6,19,0.15); border:1px solid rgba(227,6,19,0.3); border-radius:8px; padding:0.5rem 0.75rem;">
                                <span style="font-size:0.8rem; color:#cbd5e1;">الحجم الإجمالي المقدر:</span>
                                <strong class="alfa-calculated-cbm" style="font-size:1.1rem; color:#fff; font-family:monospace;">0.48 م³ (CBM)</strong>
                            </div>
                        </div>

                    </div>

                    <button type="button" class="alfa-calc-btn-widget alfa-btn" style="width:100%; padding:1rem; font-size:1rem; font-weight:bold; border-radius:12px; background:#25D366; color:white; border:none; cursor:pointer; transition:all 0.3s; display:flex; justify-content:center; align-items:center; gap:10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        <?php echo esc_html(!empty($s['button_text']) ? $s['button_text'] : 'إرسال تفاصيل الحجم إلى واتساب ألفا'); ?>
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
                var originSelect = wrapper.querySelector(".alfa-calc-origin-widget");
                var destSelect = wrapper.querySelector(".alfa-calc-dest-widget");
                
                var lInput = wrapper.querySelector(".alfa-dim-l");
                var wInput = wrapper.querySelector(".alfa-dim-w");
                var hInput = wrapper.querySelector(".alfa-dim-h");
                var qtyInput = wrapper.querySelector(".alfa-dim-qty");
                var cbmBadge = wrapper.querySelector(".alfa-calculated-cbm");

                var waNumber = "<?php echo esc_js($wa_number); ?>";

                function updateCbm() {
                    var l = parseFloat(lInput ? lInput.value : 100) || 100;
                    var w = parseFloat(wInput ? wInput.value : 80) || 80;
                    var h = parseFloat(hInput ? hInput.value : 60) || 60;
                    var q = parseFloat(qtyInput ? qtyInput.value : 1) || 1;

                    var cbm = ((l * w * h) / 1000000) * q;
                    cbm = Math.round(cbm * 100) / 100;
                    if(cbmBadge) {
                        cbmBadge.textContent = cbm + " م³ (CBM)";
                    }
                    return cbm;
                }

                [lInput, wInput, hInput, qtyInput].forEach(function(inp) {
                    if(inp) inp.addEventListener('input', updateCbm);
                });
                updateCbm();

                btn.addEventListener("click", function() {
                    var serviceType = typeSelect ? typeSelect.value : "شحن بري";
                    var origin = originSelect ? originSelect.value : "السعودية";
                    var dest = destSelect ? destSelect.value : "مصر";
                    var cbm = updateCbm();
                    var l = lInput ? lInput.value : 100;
                    var w = wInput ? wInput.value : 80;
                    var h = hInput ? hInput.value : 60;
                    var q = qtyInput ? qtyInput.value : 1;
                    
                    var text = "السلام عليكم ورحمة الله وبركاته\nأود طلب تسعيرة شحن بري بالحجم (CBM) - ألفا إكسبريس:\n- نوع الشحنة: " + serviceType + "\n- من (السعودية): " + origin + "\n- إلى (مصر): " + dest + "\n- الأبعاد: " + l + "×" + w + "×" + h + " سم (عدد " + q + ")\n- الحجم الإجمالي: " + cbm + " متر مكعب (CBM)\n\nيرجى تزويدي بأفضل تسعيرة وحجز موعد المعاينة والاستلام.";
                    var url = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
                    window.open(url, '_blank');
                });

                // 3D Tilt Experience
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
                            var rotateX = ((y - centerY) / centerY) * -10; 
                            var rotateY = ((x - centerX) / centerX) * 10;
                            inner.style.transform = "perspective(1200px) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg) scale(1.02)";
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

