<?php
/**
 * @file front-page.php
 * @project Alfa Express Logistics - Standalone WordPress Theme
 * @author Jenova Media (https://jenova.media)
 * @version 5.8.0
 *
 * Template Name: Alfa Front Page (الرئيسية)
 *
 * @description Comprehensive Front Page Template for Alfa Express Logistics.
 * Engineered by Jenova Media. Integrates:
 * - 3D Interactive Hero Canvas & Particle Simulation.
 * - Key Performance Trust Metrics (15+ Years, 50,000+ Tons).
 * - Specialized Land Freight Focus (Saudi Arabia to Egypt).
 * - Interactive Overland Route Map with City Modals.
 * - 6 Core Specialized Logistics Services.
 * - 8-Step Overland Shipping Workflow.
 * - Live Tracking Box connected to Alfa Unified Tracking Gateway.
 * - Verified Customer Reviews with High-Res Screenshot Carousels.
 * - 8 Verified Saudi Branches (Jeddah, Makkah, Riyadh) with Google Maps & Calling.
 * - Volumetric CBM Calculator with Live Estimates and WhatsApp Dispatch.
 * - 12 Logistical FAQs & Recent Blog Knowledge Base Articles.
 *
 * @package AlfaExpress
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

$branches = alfa_get_branches();
$services = alfa_get_services();
$faqs = alfa_get_faqs();
$reviews = alfa_get_reviews();
?>

<!-- 1. 3D INTERACTIVE HERO SECTION -->
<section id="hero" style="position:relative; min-height:92vh; padding:6.5rem 0 4rem; overflow:hidden; background:radial-gradient(ellipse at top, #0d1a38 0%, #070d1d 75%); display:flex; align-items:center;">
    
    <!-- Ambient Logistics Glow Circles -->
    <div style="position:absolute; top:20%; right:-100px; width:450px; height:450px; background:rgba(227,6,19,0.12); border-radius:50%; filter:blur(90px); pointer-events:none;"></div>
    <div style="position:absolute; bottom:10%; left:-100px; width:400px; height:400px; background:rgba(56,189,248,0.08); border-radius:50%; filter:blur(90px); pointer-events:none;"></div>

    <div class="alfa-container" style="position:relative; z-index:10; width:100%;">
        <div style="display:grid; grid-template-columns:1fr; gap:2.5rem; align-items:center;" class="alfa-hero-main-grid">
            
            <!-- RIGHT COLUMN: HEADLINE, OFFERS & ACTION BUTTONS -->
            <div>
                <!-- Top Verified Experience Tag -->
                <div class="alfa-badge alfa-badge-red" style="margin-bottom:1.25rem; gap:8px;">
                    <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#e30613; box-shadow:0 0 10px #e30613;"></span>
                    <span>الشحن البري الدولي المتخصص • خبرة <?php echo esc_html(get_option('alfa_years_exp', '15')); ?> عاماً</span>
                    <span style="background:rgba(227,6,19,0.25); color:#ff8a8a; padding:1px 8px; border-radius:999px; font-size:11px;">من <?php echo esc_html(get_option('alfa_starting_price_sar', '150')); ?> ريال</span>
                </div>

                <h1 class="alfa-hero-heading" style="font-weight:900; line-height:1.2; color:#ffffff; margin:0 0 1.25rem; letter-spacing:-0.5px;">
                    <?php echo esc_html(get_option('alfa_hero_tagline', 'رواد الشحن البري الدولي')); ?> <span style="background:linear-gradient(135deg, #ff414d 0%, #e30613 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">من الباب للباب</span> من السعودية إلى كافة محافظات مصر
                </h1>

                <p style="color:#cbd5e1; line-height:1.8; margin-bottom:1.75rem; max-width:580px;">
                    <?php echo esc_html(get_option('alfa_hero_subtagline', 'أسطول شاحنات مبطنة وتريلات مجهزة لنقل العفش المنزلي، الأغراض والطرود، الأجهزة الكهربائية، والبضائع التجارية مع الفك والتغليف والتخليص الجمركي والتسليم لباب بيتك.')); ?>
                </p>

                <!-- Transport Modes Chips -->
                <div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-bottom:2rem;">
                    <span class="alfa-badge" style="background:#0f1d3a; border-color:rgba(227,6,19,0.3); color:#ff6b6b;">🚛 أسطول شاحنات مبطنة وتريلات مجهزة</span>
                    <span class="alfa-badge" style="background:#0f1d3a; border-color:rgba(56,189,248,0.3); color:#38bdf8;">🛡️ تغليف هندسي وصناديق خشبية للشاشات</span>
                    <span class="alfa-badge" style="background:#0f1d3a; border-color:rgba(245,158,11,0.3); color:#fbbf24;">📍 توصيل وتسليم لباب بيتك في مصر</span>
                </div>

                <!-- Action Buttons -->
                <div style="display:flex; flex-wrap:wrap; gap:0.9rem; margin-bottom:2.25rem;">
                    <a href="#quote" class="alfa-btn alfa-btn-primary" style="padding:0.9rem 1.85rem; font-size:1rem;">
                        <span><?php echo esc_html(get_option('alfa_hero_cta_text', 'طلب تسعيرة شحن بري')); ?></span>
                        <span>&larr;</span>
                    </a>

                    <a href="<?php echo esc_url(home_url('/tracking')); ?>" class="alfa-btn alfa-btn-outline" style="padding:0.9rem 1.5rem; font-size:1rem;">
                        <span>🔍 تتبع الشحنة البرية</span>
                    </a>

                    <a href="https://wa.me/<?php echo esc_attr(get_option('alfa_whatsapp', '966501653999')); ?>" target="_blank" class="alfa-btn alfa-btn-whatsapp" style="padding:0.9rem 1.4rem; font-size:1rem;">
                        <span>💬 واتساب الفروع</span>
                    </a>
                </div>

                <!-- Quick Guarantee Stats Strip -->
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:1.25rem;">
                    <div>
                        <span style="font-size:1.4rem; font-weight:900; color:#fff; display:block;">15+ عاماً</span>
                        <span style="font-size:0.75rem; color:#94a3b8;">خبرة لوجستية موثقة</span>
                    </div>
                    <div>
                        <span style="font-size:1.4rem; font-weight:900; color:#e30613; display:block;">8 فروع</span>
                        <span style="font-size:0.75rem; color:#94a3b8;">جدة • مكة • الرياض</span>
                    </div>
                    <div>
                        <span style="font-size:1.4rem; font-weight:900; color:#22c55e; display:block;">100%</span>
                        <span style="font-size:0.75rem; color:#94a3b8;">تغطية لكافة مدن مصر</span>
                    </div>
                </div>
            </div>

            <!-- LEFT COLUMN: FULL 3D INTERACTIVE HERO GAME & CANVAS -->
            <div>
                <div id="alfa-3d-hero-container" style="position:relative; width:100%; height:460px; min-height:460px; border-radius:1.75rem; overflow:hidden; border:1px solid rgba(255,255,255,0.15); background:radial-gradient(ellipse at center, #0a1733 0%, #030712 100%); box-shadow:0 0 50px -10px rgba(227,6,19,0.35); user-select:none;">
                    
                    <!-- TOP GAME HUD BAR -->
                    <div style="position:absolute; top:12px; left:12px; right:12px; z-index:20; display:flex; justify-content:space-between; align-items:center; gap:8px; pointer-events:auto;">
                        
                        <!-- Speedometer -->
                        <div style="display:flex; align-items:center; gap:6px;">
                            <div style="padding:6px 12px; border-radius:14px; background:rgba(0,0,0,0.65); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(8px); display:flex; align-items:center; gap:8px;">
                                <span style="color:#38bdf8; font-size:14px;">⚡</span>
                                <div style="text-align:right;">
                                    <span style="display:block; font-size:9px; color:#94a3b8; font-weight:bold;">السرعة اللوجستية</span>
                                    <span style="font-size:12px; font-weight:900; color:#fff; font-family:monospace;">
                                        <span id="alfa-hud-speed">85</span> <span style="font-size:8px; color:#cbd5e1;">كم/س</span>
                                    </span>
                                </div>
                                <span id="alfa-hud-turbo" style="display:none; font-size:8px; font-weight:900; padding:2px 6px; border-radius:4px; background:#e30613; color:#fff;">TURBO</span>
                            </div>

                            <!-- Combo Multiplier -->
                            <div id="alfa-hud-combo" style="display:none; padding:6px 10px; border-radius:14px; background:linear-gradient(to right, #f59e0b, #e30613); color:#fff; font-size:11px; font-weight:900;">
                                2x كومبو!
                            </div>
                        </div>

                        <!-- Score & Reset -->
                        <div style="display:flex; align-items:center; gap:6px;">
                            <div style="padding:6px 12px; border-radius:14px; background:rgba(0,0,0,0.65); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(8px); display:flex; align-items:center; gap:6px;">
                                <span style="color:#fbbf24; font-size:13px;">🏆</span>
                                <div style="text-align:right;">
                                    <span style="display:block; font-size:9px; color:#94a3b8; font-weight:bold;">نقاط الشحنات</span>
                                    <span id="alfa-hud-score" style="font-size:12px; font-weight:900; color:#fde047; font-family:monospace;">0</span>
                                </div>
                            </div>

                            <button id="alfa-hud-reset" type="button" title="إعادة تشغيل الرحلة" style="padding:6px 10px; border-radius:14px; background:rgba(0,0,0,0.65); border:1px solid rgba(255,255,255,0.15); color:#cbd5e1; cursor:pointer; font-size:12px;">
                                🔄
                            </button>
                        </div>
                    </div>

                    <!-- FLOATING TOAST -->
                    <div id="alfa-hud-toast" style="display:none; position:absolute; top:65px; left:50%; transform:translateX(-50%); z-index:30; pointer-events:none; padding:6px 16px; border-radius:999px; background:linear-gradient(to right, #e30613, #f59e0b); color:#fff; font-size:11px; font-weight:900; box-shadow:0 10px 20px rgba(227,6,19,0.5); border:1px solid rgba(255,255,255,0.3); backdrop-filter:blur(8px);">
                    </div>

                    <!-- 3D CANVAS MOUNT -->
                    <div id="alfa-3d-canvas-mount" style="width:100%; height:100%; position:relative; cursor:grab;"></div>

                    <!-- LOADING STATE -->
                    <div id="alfa-3d-loading" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#070d1d; z-index:25; gap:10px;">
                        <div style="width:36px; height:36px; border:3px solid #e30613; border-top-color:transparent; border-radius:50%; animation:alfa-spin 1s linear infinite;"></div>
                        <span style="font-size:11px; color:#94a3b8;">جاري إطلاق محرك الشاحنات ثلاثي الأبعاد...</span>
                    </div>

                    <!-- 2D FALLBACK -->
                    <div id="alfa-3d-fallback" style="display:none; position:absolute; inset:0; align-items:center; justify-content:center; background:#070d1d; z-index:15; padding:20px; text-align:center;">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/alfa-car.png" alt="أسطول ألفا إكسبريس" style="max-width:280px; filter:drop-shadow(0 15px 25px rgba(0,0,0,0.8));">
                    </div>

                    <!-- BOTTOM ROUTE PROGRESS HUD (Saudi -> Egypt) -->
                    <div style="position:absolute; bottom:10px; left:10px; right:10px; z-index:20; display:flex; flex-direction:column; gap:6px; pointer-events:auto;">
                        
                        <div style="padding:8px 14px; border-radius:14px; background:rgba(0,0,0,0.75); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(10px);">
                            <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; font-weight:bold; color:#fff; margin-bottom:5px;">
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <span style="color:#e30613;">🧭</span>
                                    <span>المحطة اللوجستية:</span>
                                    <span id="alfa-hud-active-city" style="color:#f59e0b;">🇸🇦 الرياض</span>
                                </div>
                                <span id="alfa-hud-progress-text" style="color:#94a3b8; font-family:monospace;">15% نحو مصر</span>
                            </div>

                            <!-- Progress Track -->
                            <div style="width:100%; height:6px; border-radius:999px; background:rgba(255,255,255,0.1); overflow:hidden;">
                                <div id="alfa-hud-progress-track" style="width:15%; height:100%; border-radius:999px; background:linear-gradient(to right, #e30613, #f59e0b, #22c55e); transition:width 0.3s;"></div>
                            </div>

                            <!-- City Milestones -->
                            <div style="display:flex; justify-content:space-between; font-size:8px; color:#94a3b8; padding-top:4px;">
                                <span>الرياض</span>
                                <span>مكة</span>
                                <span>جدة (التحميل)</span>
                                <span>تبوك وضبا</span>
                                <span>القاهرة</span>
                                <span>الإسكندرية</span>
                            </div>
                        </div>

                        <!-- Steer Helper Bar & Mobile Controls -->
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 10px; border-radius:10px; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); font-size:9px; color:#cbd5e1; backdrop-filter:blur(6px);">
                            <div style="display:flex; gap:6px;">
                                <button id="alfa-steer-left" type="button" style="padding:2px 8px; border-radius:6px; background:rgba(255,255,255,0.15); color:#fff; font-weight:bold; border:none; cursor:pointer;">◀ يسار</button>
                                <button id="alfa-steer-right" type="button" style="padding:2px 8px; border-radius:6px; background:rgba(255,255,255,0.15); color:#fff; font-weight:bold; border:none; cursor:pointer;">يمين ▶</button>
                            </div>
                            <span style="color:#94a3b8;">🎮 اسحب بالماوس أو الإصبع لتوجيه الشاحنة وجمع الشحنات!</span>
                            <span style="color:#e30613; font-weight:bold;">مرر للتسريع ▼</span>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>
</section>

<style>
@keyframes alfa-spin {
    to { transform: rotate(360deg); }
}
@media(min-width: 1024px) {
    .alfa-hero-main-grid {
        grid-template-columns: 1.15fr 1fr !important;
    }
}
</style>

<!-- 2. TRUST STATS BAR -->
<section style="background:#0b1429; border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); padding:2.5rem 0;">
    <div class="alfa-container">
        <div class="alfa-grid-4" style="text-align:center;">
            <div>
                <span style="font-size:2.5rem; font-weight:900; color:#fff; display:block; line-height:1;">15+</span>
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:700;">عاماً من الخبرة اللوجستية</span>
            </div>
            <div>
                <span style="font-size:2.5rem; font-weight:900; color:#e30613; display:block; line-height:1;">45,000+</span>
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:700;">شحنة منجزة بنجاح</span>
            </div>
            <div>
                <span style="font-size:2.5rem; font-weight:900; color:#fff; display:block; line-height:1;">8</span>
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:700;">فروع معتمدة بجدة ومكة والرياض</span>
            </div>
            <div>
                <span style="font-size:2.5rem; font-weight:900; color:#38bdf8; display:block; line-height:1;">99.8%</span>
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:700;">نسبة الالتزام بالمواعيد وسلامة الطرود</span>
            </div>
        </div>
    </div>
</section>

<!-- 3. ABOUT COMPANY & LOGISTICS GUARANTEE (MATCHING SCREENSHOT 12) -->
<section id="about" style="padding:6rem 0; background:#0b1429; position:relative; overflow:hidden;">
    <div style="position:absolute; top:50%; left:0; width:380px; height:380px; background:rgba(227,6,19,0.1); border-radius:50%; filter:blur(100px); pointer-events:none;"></div>
    
    <div class="alfa-container" style="position:relative; z-index:10;">
        <div style="display:grid; grid-template-columns:1fr; gap:3.5rem; align-items:center;" class="alfa-about-grid">
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:3.5rem; align-items:center;">
                
                <!-- RIGHT: TEXT & 4 PILLARS -->
                <div>
                    <div class="alfa-badge alfa-badge-red" style="margin-bottom:1rem; display:inline-flex; align-items:center; gap:8px;">
                        <span style="width:8px; height:8px; border-radius:50%; background:#e30613; display:inline-block; box-shadow:0 0 8px #e30613;"></span>
                        <span>عن شركة ألفا إكسبريس</span>
                    </div>
                    
                    <h2 style="font-size:2.6rem; font-weight:900; color:#fff; margin:0 0 1.25rem; line-height:1.2;">
                        ألفا إكسبريس … <span style="color:#e30613;">نقل ذكي</span> بثقة عالية
                    </h2>
                    
                    <p style="font-size:1.05rem; color:#cbd5e1; font-weight:500; line-height:1.8; margin-bottom:1rem;">
                        شركة رائدة في مجال الشحن والخدمات اللوجستية، بخبرة تزيد عن 15 عامًا في السوق السعودي، نقدم خدمات شحن احترافية للأفراد والشركات مع التزام كامل بالأمان، السرعة، والدقة في كل مرحلة من مراحل الشحن.
                    </p>
                    
                    <p style="font-size:0.9rem; color:#cbd5e1; line-height:1.8; margin-bottom:2rem;">
                        نعتمد على أنظمة تشغيل مرنة وشبكة فروع متكاملة وفريق عمل مدرّب لتقديم خدمات شحن دقيقة، آمنة، وسريعة. نربط جميع مدن المملكة العربية السعودية بجميع محافظات جمهورية مصر العربية عبر أسطول شاحنات مبطنة وتريلات برية مجهزة، تضمن وصول شحنتك بأعلى درجات الأمان والسرعة والتسليم لباب البيت مع التخليص الجمركي الفوري.
                    </p>

                    <!-- 4 Core Pillars 2x2 Grid -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:2.25rem;">
                        
                        <div style="background:rgba(15,23,42,0.7); border:1px solid rgba(255,255,255,0.1); border-radius:1rem; padding:1.25rem; display:flex; gap:12px; align-items:flex-start;">
                            <span style="color:#34d399; font-size:1.35rem; line-height:1; flex-shrink:0; margin-top:2px;">✔</span>
                            <div>
                                <h3 style="font-size:0.95rem; font-weight:900; color:#fff; margin:0 0 4px;">تغطية واسعة شاملة</h3>
                                <p style="font-size:0.75rem; color:#94a3b8; line-height:1.6; margin:0;">من جميع مدن المملكة إلى كل محافظات جمهورية مصر العربية عبر شبكة تشغيل قوية.</p>
                            </div>
                        </div>

                        <div style="background:rgba(15,23,42,0.7); border:1px solid rgba(255,255,255,0.1); border-radius:1rem; padding:1.25rem; display:flex; gap:12px; align-items:flex-start;">
                            <span style="color:#e30613; font-size:1.35rem; line-height:1; flex-shrink:0; margin-top:2px;">✔</span>
                            <div>
                                <h3 style="font-size:0.95rem; font-weight:900; color:#fff; margin:0 0 4px;">خدمة شحن متكاملة</h3>
                                <p style="font-size:0.75rem; color:#94a3b8; line-height:1.6; margin:0;">حلول شاملة مصممة خصيصًا لتلبية احتياجات الأفراد والشركات من الاستلام حتى التسليم.</p>
                            </div>
                        </div>

                        <div style="background:rgba(15,23,42,0.7); border:1px solid rgba(255,255,255,0.1); border-radius:1rem; padding:1.25rem; display:flex; gap:12px; align-items:flex-start;">
                            <span style="color:#38bdf8; font-size:1.35rem; line-height:1; flex-shrink:0; margin-top:2px;">✔</span>
                            <div>
                                <h3 style="font-size:0.95rem; font-weight:900; color:#fff; margin:0 0 4px;">رؤيتنا المستقبلية</h3>
                                <p style="font-size:0.75rem; color:#94a3b8; line-height:1.6; margin:0;">أن نكون الشريك اللوجستي الأول والأكثر ثقة في المنطقة عبر تقديم حلول شحن متطورة.</p>
                            </div>
                        </div>

                        <div style="background:rgba(15,23,42,0.7); border:1px solid rgba(255,255,255,0.1); border-radius:1rem; padding:1.25rem; display:flex; gap:12px; align-items:flex-start;">
                            <span style="color:#f59e0b; font-size:1.35rem; line-height:1; flex-shrink:0; margin-top:2px;">✔</span>
                            <div>
                                <h3 style="font-size:0.95rem; font-weight:900; color:#fff; margin:0 0 4px;">رسالتنا في العمل</h3>
                                <p style="font-size:0.75rem; color:#94a3b8; line-height:1.6; margin:0;">خدمات شحن احترافية قائمة على الخبرة، الموثوقية، وسرعة الإنجاز مع ضمان رضا العميل.</p>
                            </div>
                        </div>

                    </div>

                    <div>
                        <a href="#quote" class="alfa-btn alfa-btn-primary" style="padding:0.85rem 2rem; font-size:0.95rem;">
                            <span>تواصل مع مستشاري الشحن</span>
                            <span style="font-size:1.1rem; margin-right:6px;">←</span>
                        </a>
                    </div>
                </div>

                <!-- LEFT: 3D SPRINTER VAN WITH 4 FLOATING BADGES (SCREENSHOT 12) -->
                <div style="position:relative; padding:1.5rem 0;">
                    
                    <div style="background:radial-gradient(circle at center, #111e3b 0%, #070d1d 100%); border:1px solid rgba(255,255,255,0.15); border-radius:2rem; padding:2.5rem 1.5rem 1.5rem; box-shadow:0 30px 60px rgba(0,0,0,0.6); position:relative; overflow:hidden; text-align:center;">
                        
                        <div style="position:absolute; inset:0; background:radial-gradient(circle at top, rgba(227,6,19,0.2), transparent 70%); pointer-events:none;"></div>

                        <!-- VAN IMAGE -->
                        <div style="width:100%; height:260px; display:flex; align-items:center; justify-content:center; position:relative; z-index:5;">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/alfa-car.png" alt="أسطول ألفا إكسبريس" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 25px 35px rgba(0,0,0,0.9)); transition:transform 0.5s ease;" class="alfa-van-hero-img">
                        </div>

                        <!-- BOTTOM STRIP -->
                        <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:#cbd5e1; position:relative; z-index:5;">
                            <span style="color:#fff; font-weight:bold; display:flex; align-items:center; gap:6px;">
                                <span style="color:#e30613;">🚚</span>
                                <span>أسطول نقل دولي مجهز</span>
                            </span>
                            <span style="color:#f59e0b; font-weight:bold; font-size:0.75rem;">
                                السعودية ⟵ مصر
                            </span>
                        </div>

                    </div>

                    <!-- 4 FLOATING BADGES AROUND VAN -->
                    <div class="alfa-van-float-badge" style="position:absolute; top:0; right:10px; z-index:20; background:rgba(11,22,46,0.92); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(10px); padding:8px 14px; border-radius:1rem; display:flex; align-items:center; gap:8px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                        <span style="font-size:1rem;">🚚</span>
                        <span style="font-size:0.75rem; font-weight:bold; color:#fff; white-space:nowrap;">استلام فوري</span>
                    </div>

                    <div class="alfa-van-float-badge" style="position:absolute; top:35%; left:-10px; z-index:20; background:rgba(11,22,46,0.92); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(10px); padding:8px 14px; border-radius:1rem; display:flex; align-items:center; gap:8px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                        <span style="font-size:1rem;">📦</span>
                        <span style="font-size:0.75rem; font-weight:bold; color:#fff; white-space:nowrap;">تغليف احترافي</span>
                    </div>

                    <div class="alfa-van-float-badge" style="position:absolute; bottom:25%; right:-10px; z-index:20; background:rgba(11,22,46,0.92); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(10px); padding:8px 14px; border-radius:1rem; display:flex; align-items:center; gap:8px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                        <span style="font-size:1rem;">🛡️</span>
                        <span style="font-size:0.75rem; font-weight:bold; color:#fff; white-space:nowrap;">شحن آمن</span>
                    </div>

                    <div class="alfa-van-float-badge" style="position:absolute; bottom:0; left:25%; z-index:20; background:rgba(11,22,46,0.92); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(10px); padding:8px 14px; border-radius:1rem; display:flex; align-items:center; gap:8px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                        <span style="font-size:1rem;">📋</span>
                        <span style="font-size:0.75rem; font-weight:bold; color:#fff; white-space:nowrap;">تخليص جمركي</span>
                    </div>

                </div>

            </div>

        </div>
    </div>
</section>

<!-- 4. INTERACTIVE SAUDI-EGYPT EXPRESS ROUTE MAP -->
<section id="map-route" style="padding:5.5rem 0; background:#070d1d; position:relative; overflow:hidden;">
    <div style="position:absolute; inset:0; opacity:0.12; background-image:radial-gradient(#e30613 1px, transparent 1px); background-size:24px 24px; pointer-events:none;"></div>

    <div class="alfa-container" style="position:relative; z-index:10;">
        
        <div style="text-align:center; max-width:750px; margin:0 auto 3.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">
                🧭 الربط اللوجستي الجغرافي المباشر
            </div>
            <h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                خريطة المسار التفاعلي: <span style="color:#e30613;">السعودية ⟵ مصر</span>
            </h2>
            <p style="color:#cbd5e1; font-size:0.95rem; margin:0; line-height:1.7;">
                خريطة جغرافية حقيقية توضح تضاريس البحر الأحمر ونهر النيل ومسارات الشحن المعتمدة. اضغط على أي مدينة لتسليط أضواء الملاحة ومسارات الشحن الخاصة بها.
            </p>
        </div>

        <!-- Geographic Interactive Layout -->
        <div style="display:grid; grid-template-columns:1fr; gap:2rem; align-items:center;" class="alfa-map-grid-wrap">
            
            <!-- MAP & HUD CONTAINER -->
            <div id="alfa-map-container-box" style="background:#0b162e; border:1px solid rgba(227,6,19,0.35); border-radius:1.75rem; padding:1.5rem; box-shadow:0 0 50px -10px rgba(227,6,19,0.35); transition:all 0.4s ease;">
                
                <!-- TOP HUD BAR -->
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:1rem; padding:0.6rem 1rem; margin-bottom:1rem; font-size:0.8rem;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="width:10px; height:10px; border-radius:50%; background:#e30613; display:inline-block; box-shadow:0 0 8px #e30613;" id="alfa-map-hud-dot"></span>
                        <strong style="color:#fff;">المحطة المضاءة: <span id="alfa-map-hud-city-name" style="color:#e30613;">جدة (المقر الرئيسي)</span></strong>
                    </div>
                    <span style="color:#94a3b8; font-size:0.75rem;">✨ إضاءة ديناميكية متغيرة للمسار وموانئ الوصول</span>
                </div>

                <!-- FULL GEOGRAPHIC SVG MAP (Geographically Accurate: Red Sea, Nile River & Delta, Sinai, Saudi Arabia, Mediterranean, Arabian Gulf) -->
                <div style="width:100%; border-radius:1.25rem; background:#081024; overflow:hidden; border:1px solid rgba(255,255,255,0.08); position:relative;">
                    <svg viewBox="0 0 880 620" style="width:100%; height:auto; display:block; user-select:none;" id="alfa-geographic-svg-map">
                        <defs>
                            <filter id="alfaRouteGlow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            
                            <linearGradient id="alfaEgyptFill" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#1e293b" />
                                <stop offset="60%" stop-color="#172236" />
                                <stop offset="100%" stop-color="#0f172a" />
                            </linearGradient>

                            <linearGradient id="alfaSinaiFill" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#1e293b" />
                                <stop offset="100%" stop-color="#141d2e" />
                            </linearGradient>

                            <linearGradient id="alfaKsaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#1e293b" />
                                <stop offset="60%" stop-color="#172236" />
                                <stop offset="100%" stop-color="#0f172a" />
                            </linearGradient>

                            <linearGradient id="alfaRedSeaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#032b5f" stop-opacity="0.4" />
                                <stop offset="50%" stop-color="#0284c7" stop-opacity="0.25" />
                                <stop offset="100%" stop-color="#032b5f" stop-opacity="0.35" />
                            </linearGradient>

                            <linearGradient id="alfaSeaRouteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#e30613" />
                                <stop offset="50%" stop-color="#06b6d4" />
                                <stop offset="100%" stop-color="#38bdf8" />
                            </linearGradient>
                        </defs>

                        <!-- 1. WATER BODIES -->
                        <!-- Mediterranean Sea -->
                        <path d="M 60 40 L 400 40 L 400 130 Q 340 140 280 135 Q 240 120 200 130 Q 150 140 60 145 Z" fill="#0369a1" fill-opacity="0.18" />
                        <text x="180" y="80" fill="#0284c7" font-size="13" font-weight="bold" opacity="0.5" letter-spacing="2">البحر الأبيض المتوسط</text>

                        <!-- Red Sea Channel -->
                        <path d="M 270 190 Q 285 240 310 270 L 335 220 L 348 225 Q 365 270 395 330 Q 425 385 458 430 Q 490 480 535 550 L 470 560 Q 420 500 375 425 Q 340 355 315 285 L 270 190 Z" fill="url(#alfaRedSeaFill)" stroke="#0284c7" stroke-width="0.8" stroke-opacity="0.3" />
                        <text x="385" y="380" fill="#38bdf8" font-size="14" font-weight="bold" opacity="0.55" transform="rotate(50, 385, 380)" letter-spacing="3">البحر الأحمر</text>

                        <text x="270" y="240" fill="#38bdf8" font-size="9" opacity="0.5" transform="rotate(65, 270, 240)">خليج السويس</text>
                        <text x="335" y="245" fill="#38bdf8" font-size="9" opacity="0.5" transform="rotate(70, 335, 245)">خليج العقبة</text>

                        <!-- Arabian Gulf -->
                        <path d="M 730 240 Q 755 285 770 330 Q 780 390 775 430 L 830 430 L 830 240 Z" fill="#0369a1" fill-opacity="0.15" />
                        <text x="770" y="270" fill="#0284c7" font-size="11" font-weight="bold" opacity="0.5">الخليج العربي</text>

                        <!-- 2. LANDMASSES -->
                        <!-- Egypt Mainland -->
                        <path d="M 70 145 Q 130 140 190 135 L 204 140 Q 235 155 245 185 L 268 188 Q 285 240 310 270 Q 330 330 365 400 Q 395 460 425 520 L 70 520 Z" fill="url(#alfaEgyptFill)" stroke="#334155" stroke-width="1.5" />

                        <!-- Sinai Peninsula -->
                        <path d="M 270 188 L 335 150 L 345 205 L 335 220 L 310 270 Q 290 230 270 188 Z" fill="url(#alfaSinaiFill)" stroke="#475569" stroke-width="1.2" />
                        <text x="312" y="210" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">سيناء</text>

                        <!-- Nile Delta -->
                        <path d="M 204 140 Q 240 125 275 145 L 268 188 L 238 192 Z" fill="#064e3b" fill-opacity="0.45" stroke="#10b981" stroke-width="0.8" stroke-opacity="0.4" />

                        <!-- Nile River Flow -->
                        <path d="M 330 520 Q 320 480 310 440 Q 315 410 295 380 Q 275 350 260 310 Q 250 260 245 220 L 238 192" stroke="#0284c7" stroke-width="2.5" stroke-opacity="0.75" fill="none" />
                        <path d="M 238 192 Q 220 165 204 140 M 238 192 Q 260 165 275 145" stroke="#0284c7" stroke-width="1.8" stroke-opacity="0.75" fill="none" />
                        <text x="285" y="360" fill="#38bdf8" font-size="10" opacity="0.6" transform="rotate(-70, 285, 360)">نهر النيل</text>
                        <text x="140" y="340" fill="#94a3b8" font-size="22" font-weight="900" opacity="0.4" text-anchor="middle">مـصـر</text>

                        <!-- Saudi Arabia Mainland -->
                        <path d="M 345 205 Q 365 245 385 295 Q 415 350 435 390 L 462 432 Q 490 480 535 550 L 730 540 L 775 430 Q 770 350 760 300 Q 740 250 680 200 L 520 180 L 410 185 L 345 205 Z" fill="url(#alfaKsaFill)" stroke="#334155" stroke-width="1.5" />
                        <text x="610" y="270" fill="#94a3b8" font-size="22" font-weight="900" opacity="0.4" text-anchor="middle">المملكة العربية السعودية</text>
                        <text x="445" y="345" fill="#64748b" font-size="10" opacity="0.5" transform="rotate(50, 445, 345)">ساحل الحجاز</text>
                        <text x="660" y="385" fill="#64748b" font-size="11" opacity="0.5" text-anchor="middle">هضبة نجد</text>

                        <!-- 3. ACTIVE LOGISTICS CORRIDORS -->
                        <!-- Sea Route (Jeddah Port -> Red Sea -> Suez -> Alex) -->
                        <path id="alfa-route-sea" d="M 462 432 Q 380 350 310 270 Q 285 220 270 188 Q 235 155 204 140" stroke="url(#alfaSeaRouteGrad)" stroke-width="4.5" stroke-dasharray="8 4" stroke-opacity="1" filter="url(#alfaRouteGlow)" class="alfa-map-route-active" />

                        <!-- Air Corridor (Jeddah/Riyadh -> Cairo) -->
                        <path id="alfa-route-air" d="M 462 432 Q 350 280 238 192" stroke="#e30613" stroke-width="4" stroke-dasharray="10 5" stroke-opacity="0.9" filter="url(#alfaRouteGlow)" />

                        <!-- Saudi Expressway (Riyadh -> Makkah -> Jeddah) -->
                        <path id="alfa-route-road" d="M 660 350 Q 560 390 494 440 L 462 432" stroke="#38bdf8" stroke-width="3.5" stroke-dasharray="8 4" stroke-opacity="0.9" filter="url(#alfaRouteGlow)" />

                        <!-- Direct Riyadh -> Cairo Air Corridor -->
                        <path id="alfa-route-riyadh-cairo" d="M 660 350 Q 450 220 238 192" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 4" stroke-opacity="0.4" />

                        <!-- Delta Inland Route (Cairo -> Alex) -->
                        <path id="alfa-route-delta" d="M 238 192 Q 220 165 204 140" stroke="#10b981" stroke-width="3.5" stroke-dasharray="4 3" stroke-opacity="0.9" />

                        <!-- 4. TRANSPORT ICONS -->
                        <!-- Cargo Ship on Red Sea -->
                        <g transform="translate(360, 310)">
                            <circle cx="0" cy="0" r="14" fill="#070d1d" stroke="#e30613" stroke-width="2" />
                            <text x="0" y="5" fill="#ffffff" font-size="11" text-anchor="middle">🚢</text>
                        </g>

                        <!-- Cargo Plane on Air Bridge -->
                        <g transform="translate(330, 260)">
                            <circle cx="0" cy="0" r="14" fill="#070d1d" stroke="#38bdf8" stroke-width="2" />
                            <text x="0" y="5" fill="#ffffff" font-size="11" text-anchor="middle">✈️</text>
                        </g>

                        <!-- Cargo Truck on Saudi Highway -->
                        <g transform="translate(565, 395)">
                            <circle cx="0" cy="0" r="14" fill="#070d1d" stroke="#f59e0b" stroke-width="2" />
                            <text x="0" y="5" fill="#ffffff" font-size="11" text-anchor="middle">🚚</text>
                        </g>

                        <!-- 5. INTERACTIVE CITY BEACONS -->
                        <!-- Alexandria -->
                        <g class="alfa-svg-city-node" data-city="alexandria" style="cursor:pointer;" transform="translate(0,0)">
                            <circle cx="204" cy="140" r="22" fill="#06b6d4" fill-opacity="0.2" class="alfa-map-beacon-ping" />
                            <circle cx="204" cy="140" r="7" fill="#06b6d4" stroke="#ffffff" stroke-width="2" />
                            <rect x="145" y="100" width="118" height="26" rx="8" fill="#0b162e" stroke="#06b6d4" stroke-width="1.2" />
                            <text x="204" y="117" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🌊 الإسكندرية (الميناء)</text>
                        </g>

                        <!-- Cairo -->
                        <g class="alfa-svg-city-node" data-city="cairo" style="cursor:pointer;">
                            <circle cx="238" cy="192" r="24" fill="#10b981" fill-opacity="0.2" class="alfa-map-beacon-ping" />
                            <circle cx="238" cy="192" r="8" fill="#10b981" stroke="#ffffff" stroke-width="2" />
                            <rect x="165" y="198" width="146" height="26" rx="8" fill="#0b162e" stroke="#10b981" stroke-width="1.2" />
                            <text x="238" y="215" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🇪🇬 القاهرة (المطار والفرز)</text>
                        </g>

                        <!-- Makkah -->
                        <g class="alfa-svg-city-node" data-city="makkah" style="cursor:pointer;">
                            <circle cx="494" cy="440" r="20" fill="#f59e0b" fill-opacity="0.2" class="alfa-map-beacon-ping" />
                            <circle cx="494" cy="440" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="2" />
                            <rect x="498" y="446" width="115" height="26" rx="8" fill="#0b162e" stroke="#f59e0b" stroke-width="1.2" />
                            <text x="555" y="463" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🕋 مكة المكرمة</text>
                        </g>

                        <!-- Jeddah (HQ) -->
                        <g class="alfa-svg-city-node" data-city="jeddah" style="cursor:pointer;">
                            <circle cx="462" cy="432" r="28" fill="#e30613" fill-opacity="0.3" class="alfa-map-beacon-ping" />
                            <circle cx="462" cy="432" r="9" fill="#e30613" stroke="#ffffff" stroke-width="2.5" />
                            <rect x="330" y="445" width="128" height="26" rx="8" fill="#0b162e" stroke="#e30613" stroke-width="1.5" />
                            <text x="394" y="462" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">⚓ جدة (المقر الرئيسي)</text>
                        </g>

                        <!-- Riyadh -->
                        <g class="alfa-svg-city-node" data-city="riyadh" style="cursor:pointer;">
                            <circle cx="660" cy="350" r="24" fill="#38bdf8" fill-opacity="0.2" class="alfa-map-beacon-ping" />
                            <circle cx="660" cy="350" r="8" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
                            <rect x="668" y="325" width="145" height="26" rx="8" fill="#0b162e" stroke="#38bdf8" stroke-width="1.2" />
                            <text x="740" y="342" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🇸🇦 الرياض (الوسطى - فرعان)</text>
                        </g>
                    </svg>
                </div>

            </div>

            <!-- CONTROLS & ACTIVE TELEMETRY CARD -->
            <div style="background:#0b1429; border:1px solid rgba(255,255,255,0.12); border-radius:1.75rem; padding:2rem; box-shadow:0 20px 45px rgba(0,0,0,0.4);">
                
                <!-- City Selector Buttons -->
                <div style="display:flex; flex-wrap:wrap; gap:0.6rem; justify-content:center; margin-bottom:1.5rem;" id="alfa-map-city-buttons">
                    <button type="button" class="alfa-btn alfa-map-btn active" data-city="jeddah" style="padding:0.55rem 1.1rem; font-size:0.85rem; border-radius:999px; background:#e30613; color:#fff; border:none; cursor:pointer; font-weight:bold;">
                        ⚓ جدة (المقر الرئيسي)
                    </button>
                    <button type="button" class="alfa-btn alfa-map-btn" data-city="riyadh" style="padding:0.55rem 1.1rem; font-size:0.85rem; border-radius:999px; background:#0f1d3a; color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:bold;">
                        🇸🇦 الرياض (فرعان)
                    </button>
                    <button type="button" class="alfa-btn alfa-map-btn" data-city="makkah" style="padding:0.55rem 1.1rem; font-size:0.85rem; border-radius:999px; background:#0f1d3a; color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:bold;">
                        🕋 مكة المكرمة
                    </button>
                    <button type="button" class="alfa-btn alfa-map-btn" data-city="cairo" style="padding:0.55rem 1.1rem; font-size:0.85rem; border-radius:999px; background:#0f1d3a; color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:bold;">
                        🇪🇬 القاهرة والجيزة
                    </button>
                    <button type="button" class="alfa-btn alfa-map-btn" data-city="alexandria" style="padding:0.55rem 1.1rem; font-size:0.85rem; border-radius:999px; background:#0f1d3a; color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:bold;">
                        🌊 الإسكندرية والساحل
                    </button>
                </div>

                <!-- Active Hub Card Box -->
                <div id="alfa-map-active-info" style="background:#070d1d; border:1px solid rgba(227,6,19,0.3); border-radius:1.25rem; padding:1.75rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.5rem; align-items:center;">
                    <div>
                        <span id="alfa-map-city-tag" style="background:rgba(227,6,19,0.15); color:#ff6b6b; padding:3px 10px; border-radius:999px; font-size:0.75rem; font-weight:bold; display:inline-block; margin-bottom:0.5rem;">المقر اللوجستي ومحطة التحميل البري الكبرى</span>
                        <h3 id="alfa-map-city-title" style="font-size:1.35rem; font-weight:900; color:#fff; margin:0 0 0.5rem;">جدة (المقر الرئيسي)</h3>
                        <p id="alfa-map-city-desc" style="font-size:0.85rem; color:#cbd5e1; line-height:1.7; margin:0 0 0.75rem;">
                            المركز اللوجستي الأكبر والشريان البري الذي تنطلق منه يومياً قوافل الشاحنات والتريلات عبر المنافذ والمعابر البرية إلى كافة محافظات مصر.
                        </p>
                        <span id="alfa-map-city-branches" style="font-size:0.8rem; color:#38bdf8; font-weight:bold; display:block;">
                            📍 5 فروع بجدة (الفيصلية، السلامة، البوادي، الشرفية، الربوة)
                        </span>
                    </div>

                    <div style="border-right:1px solid rgba(255,255,255,0.08); padding-right:1.5rem;">
                        <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.85rem;">
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:#94a3b8;">🚛 أسطول الشحن البري:</span>
                                <strong id="alfa-map-transit-air" style="color:#38bdf8;">شاحنات مبطنة وتريلات مجهزة</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:#94a3b8;">⏱️ مدة الرحلة البرية:</span>
                                <strong id="alfa-map-transit-sea" style="color:#4ade80;">10 - 15 يوماً (لباب بيتك)</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between;">
                                <span style="color:#94a3b8;">📞 التواصل والمتابعة:</span>
                                <strong id="alfa-map-phone" style="color:#fff;" dir="ltr">0501653999</strong>
                            </div>
                        </div>

                        <div style="margin-top:1.25rem;">
                            <a href="#quote" class="alfa-btn alfa-btn-primary" style="width:100%; font-size:0.85rem; padding:0.65rem;">
                                حجز موعد استلام من هذا الفرع &larr;
                            </a>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</section>

<!-- 5. SERVICES SECTION -->
<section id="services" style="padding:5.5rem 0; background:#070d1d;">
    <div class="alfa-container">
        
        <div style="text-align:center; max-width:750px; margin:0 auto 3.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">حلول الشحن البري المتكاملة</div>
            <h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                خدمات الشحن البري <span style="color:#e30613;">من السعودية إلى مصر</span>
            </h2>
            <p style="color:#cbd5e1; font-size:0.95rem; line-height:1.7; margin:0;">
                أسطول شاحنات مبطنة وتريلات مجهزة لنقل العفش، الأغراض، البضائع، والأجهزة بأعلى معايير الحماية والتسليم لباب البيت في كافة المحافظات.
            </p>
        </div>

        <div class="alfa-grid-3">
            <?php foreach ($services as $srv): ?>
                <div class="alfa-card" style="display:flex; flex-direction:column; justify-content:space-between; border-radius:1.5rem; padding:1.75rem; background:rgba(15,23,42,0.85); border:1px solid rgba(255,255,255,0.1); box-shadow:0 15px 30px rgba(0,0,0,0.3); transition:all 0.3s ease;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
                            <h3 style="font-size:1.25rem; font-weight:900; color:#fff; margin:0; line-height:1.4;"><?php echo esc_html($srv['title']); ?></h3>
                            <?php if (!empty($srv['badge'])): ?>
                                <span style="font-size:0.7rem; color:#fbbf24; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); padding:2px 8px; border-radius:999px; font-weight:bold; white-space:nowrap; margin-right:8px;"><?php echo esc_html($srv['badge']); ?></span>
                            <?php endif; ?>
                        </div>
                        <?php if (!empty($srv['subtitle'])): ?>
                            <span style="font-size:0.75rem; color:#f87171; font-weight:bold; display:block; margin-bottom:0.75rem;"><?php echo esc_html($srv['subtitle']); ?></span>
                        <?php endif; ?>
                        <p style="font-size:0.85rem; color:#cbd5e1; line-height:1.7; margin:0 0 1.25rem;"><?php echo esc_html($srv['desc']); ?></p>
                        <ul style="list-style:none; padding:0; margin:0 0 1.5rem; font-size:0.8rem; color:#cbd5e1; line-height:2;">
                            <?php foreach ($srv['features'] as $f): ?>
                                <li style="display:flex; align-items:center; gap:0.4rem;">
                                    <span style="color:#10b981; font-weight:bold;">✔</span>
                                    <span><?php echo esc_html($f); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <div style="display:flex; gap:0.5rem; align-items:center;">
                        <a href="<?php echo esc_url(home_url('/quote?service=' . rawurlencode($srv['title']))); ?>" class="alfa-btn alfa-btn-primary" style="flex:1; font-size:0.8rem; padding:0.65rem 0.75rem; text-align:center; text-decoration:none;">
                            طلب تسعيرة &larr;
                        </a>
                        <a href="https://wa.me/<?php echo esc_attr(get_option('alfa_whatsapp', '966501653999')); ?>?text=<?php echo rawurlencode('السلام عليكم، أود الاستفسار عن خدمة (' . $srv['title'] . ') للشحن البري إلى مصر'); ?>" target="_blank" rel="noopener noreferrer" class="alfa-btn alfa-btn-whatsapp" style="padding:0.65rem 0.85rem; font-size:0.8rem; display:flex; align-items:center; justify-content:center;" title="استفسار فوري">
                            💬 واتساب
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>

<!-- 6. 8-STEP SHIPPING WORKFLOW (MATCHING SCREENSHOT 13) -->
<section id="journey" style="padding:6rem 0; background:#0b1429; position:relative; overflow:hidden;">
    <span id="process" style="position:absolute; top:-80px; left:0; pointer-events:none;"></span>
    <div class="alfa-container" style="position:relative; z-index:10;">
        
        <!-- SECTION HEADER -->
        <div style="text-align:center; max-width:750px; margin:0 auto 3.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem; display:inline-flex; align-items:center; gap:8px;">
                <span style="width:8px; height:8px; border-radius:50%; background:#e30613; display:inline-block;"></span>
                <span>خطوات العمل المنظمة</span>
            </div>
            <h2 style="font-size:2.5rem; font-weight:900; color:#fff; margin:0 0 1rem; line-height:1.25;">
                كيف نعمل؟ <span style="color:#e30613;">رحلة شحنتك خطوة بخطوة</span>
            </h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.7; margin:0;">
                من أول مكالمة واستلام وحتى وصول الشحنة بسلام لباب منزلك في مصر، منظومة متكاملة من 8 خطوات مدروسة.
            </p>
        </div>

        <!-- 8 INTERACTIVE STEP BUTTONS (HORIZONTAL GRID) -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:0.5rem; margin-bottom:2rem;" id="alfa-process-step-nav">
            
            <button type="button" class="alfa-process-tab-btn active" data-step="1" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:#e30613; border:1px solid #ef4444; color:#fff; cursor:pointer; text-align:center; transition:all 0.3s; transform:scale(1.03); z-index:2; box-shadow:0 10px 20px rgba(227,6,19,0.3);">
                <div style="width:28px; height:28px; border-radius:8px; background:#fff; color:#e30613; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">1</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">طلب الخدمة والتواصل</span>
            </button>

            <button type="button" class="alfa-process-tab-btn" data-step="2" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; cursor:pointer; text-align:center; transition:all 0.3s;">
                <div style="width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.06); color:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">2</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">المعاينة والاستلام</span>
            </button>

            <button type="button" class="alfa-process-tab-btn" data-step="3" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; cursor:pointer; text-align:center; transition:all 0.3s;">
                <div style="width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.06); color:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">3</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">التغليف الهندسي</span>
            </button>

            <button type="button" class="alfa-process-tab-btn" data-step="4" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; cursor:pointer; text-align:center; transition:all 0.3s;">
                <div style="width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.06); color:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">4</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">التحميل بالشاحنة</span>
            </button>

            <button type="button" class="alfa-process-tab-btn" data-step="5" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; cursor:pointer; text-align:center; transition:all 0.3s;">
                <div style="width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.06); color:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">5</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">إصدار البوليصة والتتبع</span>
            </button>

            <button type="button" class="alfa-process-tab-btn" data-step="6" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; cursor:pointer; text-align:center; transition:all 0.3s;">
                <div style="width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.06); color:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">6</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">انطلاق الشاحنة والعبور</span>
            </button>

            <button type="button" class="alfa-process-tab-btn" data-step="7" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; cursor:pointer; text-align:center; transition:all 0.3s;">
                <div style="width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.06); color:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">7</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">التخليص الجمركي</span>
            </button>

            <button type="button" class="alfa-process-tab-btn" data-step="8" style="display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; border-radius:1rem; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); color:#94a3b8; cursor:pointer; text-align:center; transition:all 0.3s;">
                <div style="width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.06); color:#cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:900; margin-bottom:6px;">8</div>
                <span style="font-size:0.75rem; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">التسليم لباب البيت</span>
            </button>

        </div>

        <!-- ACTIVE STEP SPOTLIGHT CARD (SCREENSHOT 13) -->
        <div id="alfa-active-process-card" style="border-radius:1.75rem; background:linear-gradient(135deg, #070d1d 0%, #111e3b 50%, #070d1d 100%); border:1px solid rgba(255,255,255,0.15); padding:2.5rem 3rem; box-shadow:0 30px 60px rgba(0,0,0,0.6); position:relative; overflow:hidden;">
            
            <div style="position:absolute; top:0; right:0; width:280px; height:280px; background:rgba(227,6,19,0.12); border-radius:50%; filter:blur(80px); pointer-events:none;"></div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:2.5rem; align-items:center; position:relative; z-index:10;">
                
                <!-- RIGHT: STEP TEXT INFO -->
                <div style="text-align:right;">
                    <div style="display:inline-flex; align-items:center; gap:6px; padding:4px 12px; border-radius:999px; background:rgba(255,255,255,0.1); font-size:0.75rem; font-weight:bold; color:#fbbf24; margin-bottom:1rem;">
                        <span id="alfa-process-step-badge">المرحلة 1 من 8</span>
                    </div>

                    <h3 id="alfa-process-step-title" style="font-size:1.85rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                        طلب الخدمة والتواصل
                    </h3>

                    <p id="alfa-process-step-desc" style="font-size:1.05rem; color:#cbd5e1; line-height:1.8; margin-bottom:2rem;">
                        اتصل بنا أو تواصل عبر واتساب أو زُر أحد فروعنا الـ 8 في جدة ومكة والرياض لحجز موعد استلام شحنتك البرية وتحديد نوع الأثاث أو البضائع.
                    </p>

                    <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
                        <a href="#quote" class="alfa-btn alfa-btn-primary" style="padding:0.75rem 1.75rem; font-size:0.85rem;">
                            <span>ابدأ المرحلة الآن</span>
                            <span>&larr;</span>
                        </a>
                        <button type="button" id="alfa-process-next-btn" class="alfa-btn alfa-btn-outline" style="padding:0.75rem 1.5rem; font-size:0.85rem;">
                            الخطوة التالية ↻
                        </button>
                    </div>
                </div>

                <!-- LEFT: STEP ICON 3D ACCENT -->
                <div style="display:flex; justify-content:center; align-items:center;">
                    <div style="width:200px; height:200px; border-radius:2rem; background:rgba(227,6,19,0.1); border:1px solid rgba(227,6,19,0.3); display:flex; align-items:center; justify-content:center; box-shadow:0 0 50px rgba(227,6,19,0.25);">
                        <span id="alfa-process-icon-box" style="font-size:5rem; filter:drop-shadow(0 15px 25px rgba(0,0,0,0.7));">📞</span>
                    </div>
                </div>

            </div>

        </div>

    </div>
</section>

<!-- 7. LIVE TRACKING TEASER SECTION -->
<section id="track" style="padding:4rem 0; background:#070d1d; border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); position:relative;">
    <span id="tracking" style="position:absolute; top:-80px; left:0; pointer-events:none;"></span>
    <div class="alfa-container">
        <div style="background:linear-gradient(135deg, #0e1d3d 0%, #11244d 50%, #0e1d3d 100%); border:1px solid rgba(255,255,255,0.15); border-radius:1.75rem; padding:2.5rem; box-shadow:0 25px 50px rgba(0,0,0,0.4);">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:2rem; align-items:center;">
                
                <div>
                    <div class="alfa-badge alfa-badge-blue" style="margin-bottom:0.75rem;">💬 إشعارات المتابعة والتتبع اللحظي</div>
                    <h3 style="font-size:1.85rem; font-weight:900; color:#fff; margin:0 0 0.75rem;">
                        سنرسل لك رسالة بجميع التحديثات
                    </h3>
                    <p style="font-size:0.9rem; color:#cbd5e1; line-height:1.7; margin:0;">
                        يقوم نظامنا بإرسال رسائل دورية وإشعارات فورية بكل تحرك لشحنتك، أو يمكنك تتبعها بنفسك في أي وقت عبر رابط البوابة الرسمية المباشرة.
                    </p>
                </div>

                <div>
                    <form action="https://alfaexpress-ksa.com/track" method="GET" target="_blank" style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                        <input type="text" name="code" placeholder="أدخل رقم البوليصة أو الجوال (مثال: ALF-9921)" dir="ltr" class="alfa-input" style="flex:1; min-width:200px; padding:0.85rem 1.25rem;">
                        <button type="submit" class="alfa-btn alfa-btn-primary" style="padding:0.85rem 1.75rem; white-space:nowrap;">
                            🔍 تتبع الشحنة الآن
                        </button>
                    </form>
                    <div style="font-size:0.75rem; color:#94a3b8; margin-top:0.75rem; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                        <span>✓ إشعارات SMS وواتساب</span>
                        <span>✓ تتبع ذاتي 24/7</span>
                        <a href="https://alfaexpress-ksa.com/track" target="_blank" style="color:#38bdf8; text-decoration:underline;" dir="ltr">alfaexpress-ksa.com/track &larr;</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- 8. VERIFIED CUSTOMER REVIEWS (6 AUTHENTIC TESTIMONIALS) -->
<section id="reviews" style="padding:5.5rem 0; background:#070d1d;">
    <div class="alfa-container">
        
        <div style="text-align:center; max-width:700px; margin:0 auto 3.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">تجارب حقيقية موثقة</div>
            <h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                ماذا يقول عملاؤنا <span style="color:#e30613;">عن خدمات الشحن والتسليم؟</span>
            </h2>
            <p style="color:#94a3b8; font-size:0.95rem; margin:0;">
                نفخر بثقة آلاف العملاء في السعودية ومصر وتقييماتهم الإيجابية الموثقة مع صور الشحنات المستلمة.
            </p>
        </div>

        <div class="alfa-grid-3">
            <?php foreach ($reviews as $rev): ?>
                <div class="alfa-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <!-- Header & Route Badge -->
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                            <span style="font-size:0.75rem; color:#38bdf8; background:rgba(56,189,248,0.1); padding:2px 8px; border-radius:6px; font-weight:bold;">
                                <?php echo esc_html($rev['city']); ?>
                            </span>
                            <div style="color:#f59e0b; font-size:0.9rem;">★★★★★</div>
                        </div>

                        <!-- Review Image Screenshot Preview -->
                        <div style="margin-bottom:1rem; border-radius:0.75rem; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:#020617;">
                            <img src="<?php echo esc_url(!empty($rev['image_url']) ? $rev['image_url'] : get_template_directory_uri() . '/assets/images/' . $rev['image']); ?>" alt="<?php echo esc_attr($rev['name']); ?>" style="width:100%; height:180px; object-fit:cover; display:block;" onerror="this.style.display='none';">
                        </div>

                        <!-- Quote Text -->
                        <p style="font-size:0.85rem; color:#cbd5e1; line-height:1.7; margin:0 0 1rem;">
                            "<?php echo esc_html($rev['comment']); ?>"
                        </p>
                    </div>

                    <!-- Author Details -->
                    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <strong style="color:#fff; font-size:0.9rem; display:block;"><?php echo esc_html($rev['name']); ?></strong>
                            <span style="font-size:0.7rem; color:#94a3b8;"><?php echo esc_html($rev['branch']); ?></span>
                        </div>
                        <span style="font-size:0.7rem; color:#22c55e; background:rgba(34,197,94,0.1); padding:2px 6px; border-radius:4px; font-weight:bold;">✓ عميل موثق</span>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>

<!-- 9. 8 VERIFIED BRANCHES (WITH INTERACTIVE CITY FILTER) -->
<section id="branches" style="padding:5.5rem 0; background:#0b1429; border-top:1px solid rgba(255,255,255,0.08);">
    <div class="alfa-container">
        
        <div style="text-align:center; max-width:700px; margin:0 auto 2.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">شبكة فروعنا بالمملكة</div>
            <h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                8 فروع في <span style="color:#e30613;">جدة، مكة المكرمة، والرياض</span>
            </h2>
            <p style="color:#94a3b8; font-size:0.95rem; margin:0;">
                تفضل بزيارة أقرب فرع إليك أو تواصل معنا للاستلام المباشر من باب منزلك أو مستودعك.
            </p>
        </div>

        <!-- Branch City Filter Tabs -->
        <div style="display:flex; justify-content:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:2.5rem;">
            <button type="button" class="alfa-btn alfa-branch-filter-btn active" data-filter="all" style="padding:0.5rem 1.25rem; font-size:0.8rem; border-radius:999px; background:#e30613; color:#fff; border:none; cursor:pointer; font-weight:bold;">
                جميع الفروع (8)
            </button>
            <button type="button" class="alfa-btn alfa-branch-filter-btn" data-filter="جدة" style="padding:0.5rem 1.25rem; font-size:0.8rem; border-radius:999px; background:#0f1d3a; color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:bold;">
                جدة (5 فروع)
            </button>
            <button type="button" class="alfa-btn alfa-branch-filter-btn" data-filter="مكة" style="padding:0.5rem 1.25rem; font-size:0.8rem; border-radius:999px; background:#0f1d3a; color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:bold;">
                مكة المكرمة (فرع 1)
            </button>
            <button type="button" class="alfa-btn alfa-branch-filter-btn" data-filter="الرياض" style="padding:0.5rem 1.25rem; font-size:0.8rem; border-radius:999px; background:#0f1d3a; color:#cbd5e1; border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-weight:bold;">
                الرياض (فرعان)
            </button>
        </div>

        <div class="alfa-grid-4" id="alfa-branches-grid">
            <?php foreach ($branches as $b): ?>
                <div class="alfa-branch-card" data-city="<?php echo esc_attr($b['city']); ?>" style="background:#070d1d; border:1px solid rgba(255,255,255,0.08); border-radius:1.25rem; padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(227,6,19,0.4)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
                    <div>
                        <span style="font-size:0.7rem; background:rgba(227,6,19,0.15); color:#ff6b6b; padding:2px 8px; border-radius:6px; font-weight:bold; display:inline-block; margin-bottom:0.5rem;">
                            <?php echo esc_html($b['city']); ?>
                        </span>
                        <h4 style="font-size:1rem; font-weight:800; color:#fff; margin:0 0 0.5rem;"><?php echo esc_html($b['name']); ?></h4>
                        <p style="font-size:0.75rem; color:#94a3b8; line-height:1.6; margin:0 0 1rem;"><?php echo esc_html($b['address']); ?></p>
                    </div>
                    <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
                        <a href="tel:<?php echo esc_attr($b['phone']); ?>" style="color:#fff; font-size:0.85rem; font-weight:bold; font-family:monospace;" dir="ltr"><?php echo esc_html($b['phone']); ?></a>
                        <a href="https://wa.me/966<?php echo substr($b['phone'], 1); ?>" target="_blank" class="alfa-btn alfa-btn-whatsapp" style="padding:0.35rem 0.75rem; font-size:0.7rem;">واتساب</a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>

<!-- 10. INSTANT QUOTE CALCULATOR -->
<section id="quote" style="padding:5.5rem 0; background:#070d1d; border-top:1px solid rgba(255,255,255,0.08); position:relative;">
    <span id="cbm-calculator" style="position:absolute; top:-80px; left:0; pointer-events:none;"></span>
    <div class="alfa-container" style="max-width:850px;">
        
        <div style="text-align:center; margin-bottom:3rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">حاسبة الشحن التفاعلية بالحجم</div>
            <h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                احسب حجم شحنتك بالمتر المكعب <span style="color:#e30613;">(CBM) وأرسل الطلب فوراً</span>
            </h2>
            <p style="color:#94a3b8; font-size:0.9rem; margin:0;">
                في الشحن البري يتم احتساب التكلفة وفق المساحة والحجم المشغول بالشاحنة لضمان أفضل سعر وسلامة للمنقولات.
            </p>
        </div>

        <div class="alfa-card" style="padding:2.5rem;">
            <form id="alfa-quote-form">
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.25rem; margin-bottom:1.25rem;">
                    <div>
                        <label style="display:block; font-size:0.8rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">مدينة الشحن (السعودية):</label>
                        <select id="alfa-origin" class="alfa-select">
                            <option value="جدة">جدة (فروعنا الرئيسية 5)</option>
                            <option value="مكة المكرمة">مكة المكرمة</option>
                            <option value="الرياض">الرياض (العزيزية / الملز)</option>
                            <option value="الدمام / الشرقية">الدمام / الشرقية</option>
                            <option value="المدينة المنورة">المدينة المنورة</option>
                            <option value="الطائف">الطائف</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; font-size:0.8rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">محافظة الوصول (مصر):</label>
                        <select id="alfa-destination" class="alfa-select">
                            <option value="القاهرة والجيزة">القاهرة والجيزة</option>
                            <option value="الإسكندرية والبحيرة">الإسكندرية والبحيرة</option>
                            <option value="الدلتا (المنصورة / طنطا / الزقازيق)">محافظات الدلتا</option>
                            <option value="الصعيد (أسيوط / سوهاج / قنا / الأقصر)">محافظات الصعيد</option>
                            <option value="القناة (السويس / الإسماعيلية / بورسعيد)">محافظات القناة</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom:1.25rem;">
                    <label style="display:block; font-size:0.8rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">نوع الشحنة البرية:</label>
                    <select id="alfa-service-type" class="alfa-select">
                        <option value="عفش وأثاث منزلي">عفش وأثاث منزلي كامل (فك وتغليف نجارين)</option>
                        <option value="أغراض شخصية وحقائب">أغراض شخصية وحقائب وكراتين</option>
                        <option value="أجهزة كهربائية وشاشات">أجهزة كهربائية وشاشات (صناديق خشبية واقية)</option>
                        <option value="بضائع ومعدات تجارية">بضائع تجارية ومعدات مصانع</option>
                    </select>
                </div>

                <!-- Dimensions & Volume Input -->
                <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.1); border-radius:1rem; padding:1.25rem; margin-bottom:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <span style="font-size:0.85rem; font-weight:bold; color:#f59e0b;">أبعاد الشحنة وحساب المتر المكعب (CBM):</span>
                        <span style="font-size:0.75rem; color:#94a3b8;">الطول × العرض × الارتفاع سم</span>
                    </div>

                    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.75rem; margin-bottom:0.75rem;">
                        <div>
                            <label style="display:block; font-size:0.75rem; color:#cbd5e1; margin-bottom:0.25rem;">الطول (سم)</label>
                            <input type="number" id="alfa-dim-length" class="alfa-input" value="100" min="10" max="1200" style="text-align:center;">
                        </div>
                        <div>
                            <label style="display:block; font-size:0.75rem; color:#cbd5e1; margin-bottom:0.25rem;">العرض (سم)</label>
                            <input type="number" id="alfa-dim-width" class="alfa-input" value="80" min="10" max="300" style="text-align:center;">
                        </div>
                        <div>
                            <label style="display:block; font-size:0.75rem; color:#cbd5e1; margin-bottom:0.25rem;">الارتفاع (سم)</label>
                            <input type="number" id="alfa-dim-height" class="alfa-input" value="60" min="10" max="300" style="text-align:center;">
                        </div>
                        <div>
                            <label style="display:block; font-size:0.75rem; color:#cbd5e1; margin-bottom:0.25rem;">عدد القطع</label>
                            <input type="number" id="alfa-dim-qty" class="alfa-input" value="1" min="1" max="500" style="text-align:center;">
                        </div>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(227,6,19,0.12); border:1px solid rgba(227,6,19,0.3); border-radius:0.75rem; padding:0.6rem 1rem; margin-bottom:0.75rem;">
                        <span style="font-size:0.8rem; color:#cbd5e1;">الحجم الإجمالي المحسوب:</span>
                        <strong id="alfa-cbm-live-badge" style="font-size:1.15rem; color:#fff; font-family:monospace;">0.48 م³ (CBM)</strong>
                    </div>

                    <!-- Truck Capacity Quick Indicators -->
                    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem; text-align:center;">
                        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.4rem;">
                            <span style="display:block; font-size:0.65rem; color:#94a3b8;">شاحنة مبطنة</span>
                            <strong style="font-size:0.75rem; color:#38bdf8;">حتى 16 م³</strong>
                        </div>
                        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.4rem;">
                            <span style="display:block; font-size:0.65rem; color:#94a3b8;">شاحنة سيكس</span>
                            <strong style="font-size:0.75rem; color:#f59e0b;">حتى 45 م³</strong>
                        </div>
                        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.4rem;">
                            <span style="display:block; font-size:0.65rem; color:#94a3b8;">تريلا دولية</span>
                            <strong style="font-size:0.75rem; color:#22c55e;">حتى 90 م³</strong>
                        </div>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">
                    <div>
                        <label style="display:block; font-size:0.8rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">اسمك الكريم:</label>
                        <input type="text" id="alfa-sender-name" class="alfa-input" placeholder="مثال: أحمد محمد" required>
                    </div>
                    <div>
                        <label style="display:block; font-size:0.8rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">رقم الجوال:</label>
                        <input type="tel" id="alfa-sender-phone" class="alfa-input" placeholder="05xxxxxxxx" required>
                    </div>
                </div>

                <button type="submit" class="alfa-btn alfa-btn-primary" style="width:100%; padding:0.9rem; font-size:1rem;">
                    احسب التكلفة وأرسل عبر واتساب
                </button>
            </form>

            <!-- Result Box -->
            <div id="alfa-calc-result" style="display:none; margin-top:1.5rem; background:rgba(227,6,19,0.08); border:1px solid rgba(227,6,19,0.3); border-radius:1.25rem; padding:1.5rem; text-align:center;">
                <span style="font-size:0.8rem; color:#94a3b8; display:block; margin-bottom:0.25rem;">التكلفة التقديرية للشحنة:</span>
                <span id="alfa-estimated-price" style="font-size:1.75rem; font-weight:900; color:#fff; display:block; margin-bottom:0.5rem;"></span>
                <span style="font-size:0.85rem; color:#38bdf8; display:block; margin-bottom:1.25rem;">مدة التوصيل المقدرة: <strong id="alfa-estimated-duration"></strong></span>
                <a id="alfa-send-whatsapp-btn" href="#" target="_blank" class="alfa-btn alfa-btn-whatsapp" style="font-size:0.95rem; padding:0.75rem 1.75rem;">
                    💬 تأكيد الطلب وحجز موعد استلام عبر واتساب
                </a>
            </div>

        </div>

    </div>
</section>

<!-- 11. FAQS SECTION -->
<section id="faq" style="padding:5.5rem 0; background:#0b1429; border-top:1px solid rgba(255,255,255,0.08);">
    <div class="alfa-container" style="max-width:850px;">
        
        <div style="text-align:center; margin-bottom:3.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.75rem;">إجابات واضحة وشفافة</div>
            <h2 style="font-size:2.35rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                الأسئلة <span style="color:#e30613;">الشائعة</span>
            </h2>
            <p style="color:#94a3b8; font-size:0.95rem; margin:0;">
                أهم التساؤلات حول مواعيد الشحن، التغليف، الأوراق المطلوبة، وإجراءات التخليص الجمركي.
            </p>
        </div>

        <div>
            <?php foreach ($faqs as $faq): ?>
                <details class="alfa-faq-item">
                    <summary>
                        <span><?php echo esc_html($faq['q']); ?></span>
                        <span style="color:#e30613; font-size:1.25rem;">+</span>
                    </summary>
                    <div class="alfa-faq-content">
                        <?php echo esc_html($faq['a']); ?>
                    </div>
                </details>
            <?php endforeach; ?>
        </div>

        <div style="text-align:center; margin-top:2.5rem;">
            <a href="<?php echo esc_url(home_url('/faq')); ?>" class="alfa-btn alfa-btn-outline">
                عرض جميع الأسئلة ومركز المساعدة الشامل &larr;
            </a>
        </div>

    </div>
</section>

<!-- 12. LATEST LOGISTICS GUIDES & BLOG -->
<section id="blog" style="padding:5.5rem 0; background:#070d1d; border-top:1px solid rgba(255,255,255,0.08);">
    <div class="alfa-container">
        
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:3rem; flex-wrap:wrap; gap:1rem;">
            <div>
                <div class="alfa-badge alfa-badge-red" style="margin-bottom:0.5rem;">دليل الشحن والجمارك</div>
                <h2 style="font-size:2.25rem; font-weight:900; color:#fff; margin:0;">
                    أحدث <span style="color:#e30613;">المقالات والإرشادات</span>
                </h2>
            </div>
            <a href="<?php echo esc_url(home_url('/blog')); ?>" class="alfa-btn alfa-btn-outline" style="font-size:0.85rem; padding:0.6rem 1.25rem;">
                تصفح كافة المقالات &larr;
            </a>
        </div>

        <?php
        $recent_posts = new WP_Query(array(
            'posts_per_page' => 3,
            'post_status'    => 'publish',
        ));
        ?>

        <div class="alfa-grid-3">
            <?php if ($recent_posts->have_posts()): ?>
                <?php while ($recent_posts->have_posts()): $recent_posts->the_post(); ?>
                    <article class="alfa-card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <?php if (has_post_thumbnail()): ?>
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium_large', array('style' => 'width:100%; height:200px; object-fit:cover; display:block;')); ?>
                                </a>
                            <?php else: ?>
                                <div style="height:200px; background:#0f1d3a; display:flex; align-items:center; justify-content:center; color:#38bdf8; font-size:2.5rem;">
                                    📦
                                </div>
                            <?php endif; ?>
                            <div style="padding:1.5rem;">
                                <span style="font-size:0.75rem; color:#e30613; font-weight:bold; display:block; margin-bottom:0.5rem;">
                                    <?php echo get_the_date(); ?>
                                </span>
                                <h3 style="font-size:1.15rem; font-weight:800; color:#fff; margin:0 0 0.75rem;">
                                    <a href="<?php the_permalink(); ?>" style="color:#fff; text-decoration:none;">
                                        <?php the_title(); ?>
                                    </a>
                                </h3>
                                <p style="font-size:0.85rem; color:#94a3b8; line-height:1.7; margin:0;">
                                    <?php echo wp_trim_words(get_the_excerpt(), 18); ?>
                                </p>
                            </div>
                        </div>
                        <div style="padding:0 1.5rem 1.5rem;">
                            <a href="<?php the_permalink(); ?>" style="color:#e30613; font-weight:bold; font-size:0.85rem; text-decoration:none;">
                                قراءة المقال كاملاً &larr;
                            </a>
                        </div>
                    </article>
                <?php endwhile; wp_reset_postdata(); ?>
            <?php else: ?>
                <!-- Static Fallback Cards if blog posts not seeded yet -->
                <div class="alfa-card">
                    <span style="font-size:0.75rem; color:#e30613; font-weight:bold; display:block; margin-bottom:0.5rem;">إرشادات الجمارك</span>
                    <h3 style="font-size:1.15rem; font-weight:800; color:#fff; margin:0 0 0.75rem;">دليل التخليص الجمركي للشحنات من السعودية إلى مصر 2026</h3>
                    <p style="font-size:0.85rem; color:#94a3b8; line-height:1.7; margin:0 0 1rem;">تعرف على الأوراق المطلوبة وقائمة الأجهزة المسموحة والإعفاءات الجمركية للأغراض الشخصية.</p>
                    <a href="<?php echo esc_url(home_url('/blog')); ?>" style="color:#e30613; font-weight:bold; font-size:0.85rem;">قراءة المزيد &larr;</a>
                </div>
                <div class="alfa-card">
                    <span style="font-size:0.75rem; color:#e30613; font-weight:bold; display:block; margin-bottom:0.5rem;">نصائح التغليف</span>
                    <h3 style="font-size:1.15rem; font-weight:800; color:#fff; margin:0 0 0.75rem;">كيف تغلف الشاشات والأجهزة الكهربائية بأمان تام للشحن الدولي؟</h3>
                    <p style="font-size:0.85rem; color:#94a3b8; line-height:1.7; margin:0 0 1rem;">أهمية الصناديق الخشبية المبطنة وطبقات البابلز لحماية الشاشات الذكية من الصدمات.</p>
                    <a href="<?php echo esc_url(home_url('/blog')); ?>" style="color:#e30613; font-weight:bold; font-size:0.85rem;">قراءة المزيد &larr;</a>
                </div>
                <div class="alfa-card">
                    <span style="font-size:0.75rem; color:#e30613; font-weight:bold; display:block; margin-bottom:0.5rem;">شحن العفش والأثاث</span>
                    <h3 style="font-size:1.15rem; font-weight:800; color:#fff; margin:0 0 0.75rem;">خطوات نقل الأثاث المنزلي من جدة والرياض إلى المحافظات المصرية</h3>
                    <p style="font-size:0.85rem; color:#94a3b8; line-height:1.7; margin:0 0 1rem;">من التفكيك والترقيم والتغليف حتى التركيب في باب منزلك بمصر مع الضمان الشامل.</p>
                    <a href="<?php echo esc_url(home_url('/blog')); ?>" style="color:#e30613; font-weight:bold; font-size:0.85rem;">قراءة المزيد &larr;</a>
                </div>
            <?php endif; ?>
        </div>

    </div>
</section>

<?php get_footer(); ?>
