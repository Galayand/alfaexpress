<?php
/**
 * @file page-quote.php
 * @project Alfa Express Logistics - Standalone WordPress Theme
 * @author Jenova Media (https://jenova.media)
 *
 * Template Name: طلب عرض سعر (Quote)
 * Template Post Type: page
 *
 * @description Dedicated quotation and volumetric CBM calculator template.
 * Allows customers to calculate shipment volume in cubic meters (L x W x H x Qty / 1,000,000)
 * and submit instant bookings to Alfa Express WhatsApp dispatchers.
 * Fully compatible with Elementor editing override.
 *
 * @package AlfaExpress
 */
get_header();

// Elementor compatibility: If edited in Elementor, render elementor content directly
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
    echo '<div style="background:#e30613; color:#fff; padding:12px 20px; text-align:center; font-family:sans-serif; font-size:14px;">
            <strong>ملاحظة للمدير:</strong> هذه الصفحة تستخدم القالب الافتراضي لحاسبة الأسعار (CBM). لتعديل المحتوى بحرية عبر Elementor، قم بالضغط على "التحرير بواسطة Elementor" من الأعلى واستخدم عناصر (Widgets) الخاصة بقالب ألفا.
          </div>';
}

$selected_service = isset($_GET['service']) ? sanitize_text_field(wp_unslash($_GET['service'])) : '';
$whatsapp_num = get_option('alfa_whatsapp', '966501653999');
$main_phone = get_option('alfa_main_phone', '0501653999');
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh; position:relative; overflow:hidden;">
    <!-- Background Glow -->
    <div style="position:absolute; top:5%; left:50%; transform:translateX(-50%); width:650px; height:320px; background:radial-gradient(circle, rgba(227,6,19,0.12) 0%, transparent 70%); pointer-events:none; z-index:0;"></div>

    <div class="alfa-container" style="max-width:850px; position:relative; z-index:1;">
        
        <!-- Breadcrumb Navigation -->
        <nav style="display:flex; align-items:center; gap:0.5rem; font-size:0.75rem; color:#94a3b8; margin-bottom:2rem;" aria-label="مسار التنقل">
            <a href="<?php echo esc_url(home_url('/')); ?>" style="color:#cbd5e1; text-decoration:none;">الرئيسية</a>
            <span>/</span>
            <span style="color:#e30613; font-weight:bold;">طلب عرض سعر وحاسبة CBM</span>
        </nav>

        <!-- Header Banner -->
        <div style="text-align:center; margin-bottom:3.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:1rem;">حاسبة الأسعار الفورية بالحجم</div>
            <h1 style="font-size:clamp(2rem, 4vw, 3rem); font-weight:900; color:#fff; margin:0 0 1rem;">
                طلب عرض سعر <span style="color:#e30613;">وحساب تكلفة الشحن البري</span>
            </h1>
            <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.8; max-width:680px; margin:0 auto;">
                في الشحن البري الدولي، يتم احتساب التكلفة وفق الحجم المشغول بالشاحنة بالمتر المكعب (CBM) لضمان أدق تسعيرة وأعلى درجات الأمان لمنقولاتك.
            </p>
        </div>

        <!-- Calculator Form Card -->
        <div class="alfa-card" style="padding:2.5rem; margin-bottom:3rem;">
            <form id="alfa-quote-form">
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1.25rem; margin-bottom:1.25rem;">
                    <div>
                        <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">مدينة الاستلام (السعودية):</label>
                        <select id="alfa-origin" class="alfa-select">
                            <option value="جدة">جدة (فروعنا الرئيسية 5)</option>
                            <option value="مكة المكرمة">مكة المكرمة</option>
                            <option value="الرياض">الرياض (العزيزية / الملز)</option>
                            <option value="الدمام والخبر">الدمام والخبر (المنطقة الشرقية)</option>
                            <option value="المدينة المنورة">المدينة المنورة</option>
                            <option value="الطائف">الطائف</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">محافظة التسليم (مصر):</label>
                        <select id="alfa-destination" class="alfa-select">
                            <option value="القاهرة والجيزة">القاهرة والجيزة</option>
                            <option value="الإسكندرية والبحيرة">الإسكندرية والبحيرة</option>
                            <option value="محافظات الدلتا">محافظات الدلتا (المنصورة / طنطا / الشرقية)</option>
                            <option value="محافظات الصعيد">محافظات الصعيد (أسيوط / سوهاج / قنا / الأقصر)</option>
                            <option value="مدن القناة">مدن القناة (السويس / الإسماعيلية / بورسعيد)</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom:1.25rem;">
                    <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">نوع الشحنة البرية:</label>
                    <select id="alfa-service-type" class="alfa-select">
                        <option value="عفش وأثاث منزلي" <?php selected(strpos($selected_service, 'أثاث') !== false || strpos($selected_service, 'عفش') !== false); ?>>عفش وأثاث منزلي كامل (غرف نوم / صالونات / فك وتغليف نجارين)</option>
                        <option value="أغراض شخصية وحقائب" <?php selected(strpos($selected_service, 'شخصية') !== false || strpos($selected_service, 'طرود') !== false); ?>>أغراض شخصية وحقائب وكراتين ملابس</option>
                        <option value="شاشات وأجهزة كهربائية" <?php selected(strpos($selected_service, 'شاشات') !== false || strpos($selected_service, 'أجهزة') !== false); ?>>شاشات وأجهزة كهربائية (صناديق خشبية خاصة مبطنة)</option>
                        <option value="بضائع تجارية وطرود" <?php selected(strpos($selected_service, 'تجارية') !== false || strpos($selected_service, 'بضائع') !== false); ?>>بضائع تجارية ومعدات مصانع للشركات</option>
                    </select>
                </div>

                <!-- Dimensions & Volume Input -->
                <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.1); border-radius:1rem; padding:1.25rem; margin-bottom:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
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

                    <!-- Truck Capacity Reference -->
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

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">
                    <div>
                        <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">الاسم الكريم:</label>
                        <input type="text" id="alfa-sender-name" class="alfa-input" placeholder="مثال: أحمد محمد" required>
                    </div>
                    <div>
                        <label style="display:block; font-size:0.85rem; font-weight:bold; color:#cbd5e1; margin-bottom:0.4rem;">رقم الجوال:</label>
                        <input type="tel" id="alfa-sender-phone" class="alfa-input" placeholder="05xxxxxxxx" required>
                    </div>
                </div>

                <button type="submit" class="alfa-btn alfa-btn-primary" style="width:100%; padding:1rem; font-size:1.05rem; cursor:pointer;">
                    احسب التكلفة التقديرية بالحجم وأرسل الطلب
                </button>
            </form>

            <!-- Result Box -->
            <div id="alfa-calc-result" style="display:none; margin-top:2rem; background:rgba(227,6,19,0.08); border:1px solid rgba(227,6,19,0.3); border-radius:1.5rem; padding:2rem; text-align:center;">
                <span style="font-size:0.85rem; color:#94a3b8; display:block; margin-bottom:0.25rem;">التكلفة التقديرية للشحن:</span>
                <span id="alfa-estimated-price" style="font-size:2rem; font-weight:900; color:#fff; display:block; margin-bottom:0.5rem;"></span>
                <span style="font-size:0.9rem; color:#38bdf8; display:block; margin-bottom:1.5rem;">المدة المقدرة للوصول والتسليم: <strong id="alfa-estimated-duration"></strong></span>
                <a id="alfa-send-whatsapp-btn" href="#" target="_blank" class="alfa-btn alfa-btn-whatsapp" style="font-size:1rem; padding:0.85rem 2rem; display:inline-block; text-decoration:none;">
                    💬 تأكيد الطلب وحجز موعد عبر واتساب
                </a>
            </div>

        </div>

        <!-- Value Added Guarantees -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.25rem; margin-bottom:3rem;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:1rem; padding:1.25rem; text-align:right;">
                <div style="font-size:1.5rem; margin-bottom:0.5rem;">🏡</div>
                <strong style="color:#fff; font-size:0.95rem; display:block; margin-bottom:0.25rem;">توصيل من الباب إلى الباب</strong>
                <p style="color:#94a3b8; font-size:0.8rem; margin:0; line-height:1.6;">استلام من باب منزلك بالسعودية وتسليم لباب الشقة في كافة محافظات مصر.</p>
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:1rem; padding:1.25rem; text-align:right;">
                <div style="font-size:1.5rem; margin-bottom:0.5rem;">🛡️</div>
                <strong style="color:#fff; font-size:0.95rem; display:block; margin-bottom:0.25rem;">تأمين شامل وصناديق خشبية</strong>
                <p style="color:#94a3b8; font-size:0.8rem; margin:0; line-height:1.6;">صناديق خشبية مبطنة للشاشات الحساسة وتغليف هيدروليكي ضد الاهتزازات.</p>
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:1rem; padding:1.25rem; text-align:right;">
                <div style="font-size:1.5rem; margin-bottom:0.5rem;">⚖️</div>
                <strong style="color:#fff; font-size:0.95rem; display:block; margin-bottom:0.25rem;">الوزن مفتوح والحساب بالحجم</strong>
                <p style="color:#94a3b8; font-size:0.8rem; margin:0; line-height:1.6;">شحن العفش والكراتين بدون قيود الوزن بناءً على المتر المكعب الفعلي CBM.</p>
            </div>
        </div>

        <!-- Direct Contact Footer CTA -->
        <div style="background:linear-gradient(135deg, #0b1429 0%, #16223f 100%); border:1px solid rgba(255,255,255,0.12); border-radius:1.5rem; padding:2rem; text-align:center;">
            <h3 style="color:#fff; font-size:1.25rem; font-weight:800; margin:0 0 0.5rem;">هل تود الاستفسار المباشر عبر الهاتف؟</h3>
            <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 1.25rem;">مستشارو الشحن البري متواجدون لمساعدتك في قياس الأبعاد وتحديد السعر الأمثل.</p>
            <div style="display:flex; justify-content:center; gap:0.75rem; flex-wrap:wrap;">
                <a href="tel:<?php echo esc_attr($main_phone); ?>" class="alfa-btn alfa-btn-outline" dir="ltr">
                    📞 <?php echo esc_html($main_phone); ?>
                </a>
                <a href="https://wa.me/<?php echo esc_attr($whatsapp_num); ?>?text=<?php echo rawurlencode('السلام عليكم، أود استشارة لوجستية وحساب تكلفة شحن عفش/أغراض لمصر'); ?>" target="_blank" rel="noopener noreferrer" class="alfa-btn alfa-btn-whatsapp">
                    💬 تواصل واتساب فوري
                </a>
            </div>
        </div>

    </div>
</div>

<div class="alfa-standard-content" style="display:none;">
    <?php
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    ?>
</div>

<?php get_footer(); ?>
