<?php
/**
 * @file footer.php
 * @project Alfa Express Logistics - Standalone WordPress Theme
 * @author Jenova Media (https://jenova.media)
 * @description Theme footer template rendering 4-column brand/services/branches grid,
 * copyright notice with Jenova Media attribution, and mobile conversion dock.
 *
 * @package AlfaExpress
 */
if (!defined('ABSPATH')) exit;
?>

<!-- MAIN FOOTER -->
<footer style="background:#050a17; border-top:1px solid rgba(255,255,255,0.08); padding-top:4rem; padding-bottom:5rem; color:#94a3b8; font-size:0.875rem;">
    <div class="alfa-container">
        
        <div class="alfa-grid-4" style="margin-bottom:3rem; gap:2rem;">
            
            <!-- COL 1: BRAND INFO -->
            <div>
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:1rem;">
                    <div style="width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,0.05); padding:3px; display:flex; align-items:center; justify-content:center;">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/alfa-logo.webp" alt="Alfa Express" style="max-width:100%; max-height:100%; object-fit:contain;">
                    </div>
                    <div>
                        <span style="font-size:1.1rem; font-weight:900; color:#fff; display:block;">ألفا إكسبريس</span>
                        <span style="font-size:0.7rem; color:#64748b;"><?php echo esc_html(get_option('alfa_legal_name', 'شركة ألفا لنقل العفش والشحن الدولي')); ?></span>
                    </div>
                </div>
                <p style="font-size:0.8rem; line-height:1.7; color:#64748b; margin-bottom:1.5rem;">
                    شحن دولي متكامل من السعودية لكافة محافظات مصر. تغليف معتمد، أمان 100%، وخبرة تمتد لأكثر من 15 عاماً.
                </p>
                <div style="display:flex; gap:0.5rem;">
                    <?php $alfa_quote_url = is_front_page() ? '#quote' : esc_url(home_url('/quote')); ?>
                    <a href="<?php echo esc_url($alfa_quote_url); ?>" class="alfa-btn alfa-btn-primary" style="padding:0.5rem 1rem; font-size:0.75rem;">
                        طلب عرض سعر
                    </a>
                    <a href="<?php echo esc_url(home_url('/tracking')); ?>" class="alfa-btn alfa-btn-outline" style="padding:0.5rem 1rem; font-size:0.75rem;">
                        تتبع شحنتك
                    </a>
                </div>
            </div>

            <!-- COL 2: QUICK LINKS -->
            <div>
                <h4 style="color:#fff; font-size:1rem; font-weight:800; margin-bottom:1.25rem; display:flex; align-items:center; gap:6px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#e30613; display:inline-block;"></span>
                    <span>صفحات الموقع</span>
                </h4>
                <ul style="list-style:none; padding:0; margin:0; line-height:2.2; font-size:0.85rem;">
                    <li><a href="<?php echo home_url('/'); ?>" style="color:#94a3b8; transition:color 0.2s;">الرئيسية</a></li>
                    <li><a href="<?php echo home_url('/services'); ?>" style="color:#94a3b8; transition:color 0.2s;">خدمات الشحن</a></li>
                    <li><a href="<?php echo home_url('/branches'); ?>" style="color:#94a3b8; transition:color 0.2s;">فروعنا في المملكة (8)</a></li>
                    <li><a href="<?php echo home_url('/faq'); ?>" style="color:#94a3b8; transition:color 0.2s;">الأسئلة الشائعة</a></li>
                    <li><a href="<?php echo home_url('/blog'); ?>" style="color:#94a3b8; transition:color 0.2s;">المدونة اللوجستية</a></li>
                    <li><a href="<?php echo home_url('/tracking'); ?>" style="color:#94a3b8; transition:color 0.2s;">تتبع الشحنة</a></li>
                </ul>
            </div>

            <!-- COL 3: SHIPPING SERVICES -->
            <div>
                <h4 style="color:#fff; font-size:1rem; font-weight:800; margin-bottom:1.25rem; display:flex; align-items:center; gap:6px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#e30613; display:inline-block;"></span>
                    <span>خدماتنا المعتمدة</span>
                </h4>
                <ul style="list-style:none; padding:0; margin:0; line-height:2.2; font-size:0.85rem; color:#94a3b8;">
                    <li>شحن الأغراض الشخصية والحقائب</li>
                    <li>شحن الأثاث والعفش المنزلي</li>
                    <li>شحن الأجهزة الكهربائية والشاشات</li>
                    <li>شحن البضائع والطرود التجارية</li>
                    <li>التخليص الجمركي في الموانئ</li>
                    <li>التوصيل من الباب إلى الباب</li>
                </ul>
            </div>

            <!-- COL 4: CONTACT & BRANCHES -->
            <div>
                <h4 style="color:#fff; font-size:1rem; font-weight:800; margin-bottom:1.25rem; display:flex; align-items:center; gap:6px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#e30613; display:inline-block;"></span>
                    <span>التواصل والفروع</span>
                </h4>
                <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.85rem;">
                    <a href="tel:<?php echo esc_attr(get_option('alfa_main_phone', '0501653999')); ?>" style="display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.05); padding:10px 14px; border-radius:12px; color:#fff; font-weight:bold;" dir="ltr">
                        📞 <?php echo esc_html(get_option('alfa_main_phone', '0501653999')); ?>
                    </a>
                    <a href="https://wa.me/<?php echo esc_attr(get_option('alfa_whatsapp', '966501653999')); ?>" target="_blank" style="display:flex; align-items:center; gap:8px; background:rgba(37,211,102,0.15); padding:10px 14px; border-radius:12px; color:#4ade80; font-weight:bold;">
                        💬 واتساب خدمة العملاء
                    </a>
                    <p style="margin:0; font-size:0.75rem; color:#64748b; line-height:1.6;">
                        📍 المقر الرئيسي: <?php echo esc_html(get_option('alfa_main_address', '4275 الروضة - حي الفيصلية - جدة')); ?>
                    </p>
                </div>
            </div>

        </div>

        <!-- COPYRIGHT -->
        <div style="padding-top:2rem; border-top:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; font-size:0.75rem; color:#64748b;">
            <p style="margin:0;">
                جميع الحقوق محفوظة © <?php echo date('Y'); ?> ألفا إكسبريس - <?php echo esc_html(get_option('alfa_legal_name', 'شركة ألفا لنقل العفش والشحن الدولي')); ?>
            </p>
            <p style="margin:0;">
                تطوير وتصميم: <a href="https://jenova.media" target="_blank" rel="noopener" style="color:#e30613; font-weight:bold; text-decoration:none;">Jenova Media</a> (<a href="https://jenova.media" target="_blank" rel="noopener" style="color:inherit; text-decoration:underline;">jenova.media</a>) • قالب alfaExpressV5.8
            </p>
        </div>

    </div>
</footer>

<!-- STICKY MOBILE CONVERSION DOCK -->
<div class="alfa-mobile-dock">
    <a href="tel:<?php echo esc_attr(get_option('alfa_main_phone', '0501653999')); ?>" class="alfa-btn alfa-btn-outline" style="flex:1; padding:0.6rem 0.5rem; font-size:0.75rem;">
        📞 اتصال فوري
    </a>
    <a href="https://wa.me/<?php echo esc_attr(get_option('alfa_whatsapp', '966501653999')); ?>" target="_blank" class="alfa-btn alfa-btn-whatsapp" style="flex:1; padding:0.6rem 0.5rem; font-size:0.75rem;">
        💬 واتساب
    </a>
    <a href="<?php echo esc_url($alfa_quote_url); ?>" class="alfa-btn alfa-btn-primary" style="flex:1; padding:0.6rem 0.5rem; font-size:0.75rem;">
        ⚡ اطلب تسعيرة
    </a>
</div>

<!-- VERTICAL ROUTE PROGRESS WAYFINDER (MATCHING SCREENSHOT 12 & 13) -->
<div id="alfa-vertical-wayfinder" class="alfa-hide-mobile" style="position:fixed; right:16px; top:50%; transform:translateY(-50%); z-index:9000; display:flex; flex-direction:column; align-items:center; gap:10px; padding:10px 8px; border-radius:1.25rem; background:rgba(9,19,38,0.85); border:1px solid rgba(255,255,255,0.12); backdrop-filter:blur(12px); box-shadow:0 20px 40px rgba(0,0,0,0.5);">
    <div style="display:flex; flex-direction:column; align-items:center; gap:2px; font-size:10px; font-weight:bold; color:#cbd5e1;">
        <span style="color:#e30613; font-size:12px;">🧭</span>
        <span>المسار</span>
    </div>

    <!-- Vertical Track Rail -->
    <div style="position:relative; width:4px; height:120px; border-radius:999px; background:rgba(255,255,255,0.1); overflow:hidden; margin:4px 0;">
        <div id="alfa-vertical-track-fill" style="width:100%; height:0%; background:linear-gradient(to bottom, #e30613, #f59e0b, #38bdf8); border-radius:999px; transition:height 0.1s ease-out;"></div>
    </div>

    <!-- Milestone Node 1: Saudi -->
    <button type="button" onclick="window.scrollTo({top:0, behavior:'smooth'})" id="alfa-node-sa" style="width:26px; height:26px; border-radius:50%; border:none; background:#e30613; color:#fff; font-size:11px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(227,6,19,0.5);" title="المملكة العربية السعودية">
        🇸🇦
    </button>

    <!-- Milestone Node 2: Route Map / Land Transit -->
    <button type="button" onclick="document.getElementById('map-route') ? document.getElementById('map-route').scrollIntoView({behavior:'smooth'}) : null" id="alfa-node-transit" style="width:26px; height:26px; border-radius:50%; border:none; background:rgba(15,23,42,0.8); color:#cbd5e1; font-size:11px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s;" title="خط السير البري والمعابر الحدودية">
        🚛
    </button>

    <!-- Milestone Node 3: Egypt -->
    <button type="button" onclick="document.getElementById('quote') ? document.getElementById('quote').scrollIntoView({behavior:'smooth'}) : null" id="alfa-node-eg" style="width:26px; height:26px; border-radius:50%; border:none; background:rgba(15,23,42,0.8); color:#cbd5e1; font-size:11px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s;" title="جمهورية مصر العربية والتسليم">
        🇪🇬
    </button>

    <span id="alfa-wayfinder-percent" style="font-size:9px; font-family:monospace; font-weight:bold; color:#94a3b8; margin-top:2px;">0%</span>
</div>

<!-- BACK TO TOP FLOATING BUTTON -->
<button id="alfa-back-to-top" class="alfa-back-to-top" aria-label="العودة للأعلى">
    ↑
</button>

<?php wp_footer(); ?>
</body>
</html>
