<?php
/**
 * Alfa Express - 1-Click All-in-One Importer
 * Automatically imports all media assets, generates all 7 core pages with templates,
 * seeds blog posts with categories, builds navigation menus, and configures site permalinks.
 */

if (!defined('ABSPATH')) exit;

class Alfa_Express_One_Time_Importer {

    public function __construct() {
        add_action('admin_menu', array($this, 'register_admin_menu'));
        add_action('admin_notices', array($this, 'show_activation_notice'));
        add_action('wp_ajax_alfa_run_one_time_import', array($this, 'ajax_run_one_time_import'));
    }

    public function register_admin_menu() {
        add_menu_page(
            'ألفا إكسبريس | الاستيراد الشامل',
            'ألفا إكسبريس',
            'manage_options',
            'alfa-one-time-importer',
            array($this, 'render_importer_page'),
            'dashicons-airplane',
            2
        );

        add_submenu_page(
            'alfa-one-time-importer',
            'استيراد الموقع بالكامل',
            'استيراد الموقع والأصول (1-Click)',
            'manage_options',
            'alfa-one-time-importer',
            array($this, 'render_importer_page')
        );
    }

    public function show_activation_notice() {
        $screen = get_current_screen();
        if ($screen && $screen->id === 'toplevel_page_alfa-one-time-importer') return;

        $imported = get_option('alfa_one_time_import_completed', false);
        if (!$imported) {
            ?>
            <div class="notice notice-warning is-dismissible" style="border-right-color:#e30613; padding:15px 20px; direction:rtl; text-align:right;">
                <h3 style="margin:0 0 8px; color:#e30613; font-weight:900;">🚀 مرحباً بك في قالب ألفا إكسبريس اللوجستي المستقل!</h3>
                <p style="margin:0 0 12px; font-size:14px; color:#334155;">
                    لتهيئة موقعك بالكامل (إنشاء كافة الصفحات، استيراد الصور والوسائط، إعداد حاسبة الأسعار، ونظام التتبع، والفروع، والقوائم بضغطة واحدة):
                </p>
                <a href="<?php echo admin_url('admin.php?page=alfa-one-time-importer'); ?>" class="button button-primary" style="background:#e30613; border-color:#b8000b; font-weight:bold; padding:4px 16px;">
                    تشغيل مستورد الموقع الشامل بنقرة واحدة &larr;
                </a>
            </div>
            <?php
        }
    }

    public function render_importer_page() {
        $imported = get_option('alfa_one_time_import_completed', false);
        $import_date = get_option('alfa_one_time_import_date', '');
        ?>
        <div class="wrap" style="direction:rtl; text-align:right; max-width:1100px; margin:20px auto; font-family:'Cairo', system-ui, sans-serif;">
            
            <div style="background:linear-gradient(135deg, #070d1d 0%, #0b1429 100%); color:#fff; border-radius:24px; padding:35px 40px; margin-bottom:25px; border:1px solid rgba(255,255,255,0.1); box-shadow:0 20px 40px rgba(0,0,0,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; margin-bottom:15px;">
                    <div style="display:flex; align-items:center; gap:15px;">
                        <span style="background:#e30613; color:#fff; padding:10px 16px; border-radius:16px; font-size:24px; display:inline-block;">⚡</span>
                        <div>
                            <h1 style="color:#fff; margin:0; font-size:26px; font-weight:900;">مستورد موقع ألفا إكسبريس الشامل (One-Time Importer)</h1>
                            <p style="color:#94a3b8; margin:5px 0 0; font-size:13px;">استيراد كافة الصفحات، الصور، الأكواد، التدوينات، والقوائم بضغطة زر واحدة دون أي تبعيات خارجية.</p>
                        </div>
                    </div>
                    <?php if ($imported): ?>
                        <span style="background:rgba(34,197,94,0.15); border:1px solid #22c55e; color:#4ade80; padding:6px 14px; border-radius:999px; font-size:12px; font-weight:bold;">
                            ✓ تم الاستيراد بنجاح (<?php echo esc_html($import_date); ?>)
                        </span>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Main Importer Action Card -->
            <div style="background:#fff; border-radius:20px; padding:30px; box-shadow:0 4px 20px rgba(0,0,0,0.06); border:1px solid #e2e8f0; margin-bottom:25px;">
                <h3 style="margin-top:0; color:#0f172a; font-size:18px; font-weight:800; border-bottom:1px solid #e2e8f0; padding-bottom:12px;">
                    📦 ما الذي سيقوم المستورد بتهيئته تلقائياً؟
                </h3>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:15px; margin:20px 0;">
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:16px;">
                        <strong style="color:#e30613; display:block; margin-bottom:4px;">1. استيراد الصور والوسائط</strong>
                        <span style="font-size:12px; color:#64748b;">الشعار الرسمي، ريندر سيارات الشحن، وصور آراء وتقييمات العملاء الموثقة لمكتبة وسائط ووردبريس.</span>
                    </div>

                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:16px;">
                        <strong style="color:#e30613; display:block; margin-bottom:4px;">2. إنشاء كافة الصفحات (7)</strong>
                        <span style="font-size:12px; color:#64748b;">الرئيسية، الخدمات، الفروع (8)، الأسئلة الشائعة، المدونة، التتبع المباشر، وحاسبة الأسعار مع قوالبها.</span>
                    </div>

                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:16px;">
                        <strong style="color:#e30613; display:block; margin-bottom:4px;">3. مقالات المدونة والتصنيفات</strong>
                        <span style="font-size:12px; color:#64748b;">4 مقالات إرشادية شاملة حول الجمارك، التغليف، شحن الأجهزة، والمقارنة اللوجستية مع الصور البارزة.</span>
                    </div>

                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:16px;">
                        <strong style="color:#e30613; display:block; margin-bottom:4px;">4. القوائم والروابط الدائمة</strong>
                        <span style="font-size:12px; color:#64748b;">بناء القائمة الرئيسية وتعيينها للهيدر، وضبط الروابط الدائمة Permalinks على /%postname%/.</span>
                    </div>
                </div>

                <div style="margin-top:25px; padding-top:20px; border-top:1px solid #e2e8f0; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:15px;">
                    <div>
                        <button id="alfa-start-import-btn" type="button" class="button button-primary" style="background:#e30613; border-color:#b8000b; font-size:15px; font-weight:bold; padding:8px 24px; border-radius:12px; cursor:pointer;">
                            🚀 بدء الاستيراد الشامل بضغطة واحدة (One-Click Import)
                        </button>
                        <span id="alfa-import-spinner" style="display:none; margin-right:15px; vertical-align:middle;">
                            <span class="spinner is-active" style="float:none; margin:0;"></span>
                            <span style="font-size:13px; color:#64748b; font-weight:bold;">جاري إنشاء الصفحات واستيراد الوسائط...</span>
                        </span>
                    </div>

                    <?php if ($imported): ?>
                        <a href="<?php echo home_url('/'); ?>" target="_blank" class="button" style="border-radius:10px; font-weight:bold;">
                            معاينة الموقع المباشر ↗
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Log Output Box -->
                <div id="alfa-import-logs" style="display:none; margin-top:25px; background:#070d1d; color:#e2e8f0; border-radius:14px; padding:20px; font-family:monospace; font-size:12px; line-height:1.7; max-height:280px; overflow-y:auto; border:1px solid #334155;">
                </div>
            </div>

        </div>

        <script>
        jQuery(document).ready(function($) {
            $('#alfa-start-import-btn').on('click', function(e) {
                e.preventDefault();
                if (!confirm('هل أنت متأكد من رغبتك في تشغيل الاستيراد الشامل؟ سيتم إنشاء الصفحات والوسائط والقوائم تلقائياً.')) {
                    return;
                }

                var $btn = $(this);
                var $spinner = $('#alfa-import-spinner');
                var $logs = $('#alfa-import-logs');

                $btn.prop('disabled', true).text('جاري الاستيراد...');
                $spinner.show();
                $logs.show().html('<p style="color:#38bdf8;">[1/5] بدء عملية التهيئة الشاملة واستيراد الوسائط...</p>');

                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'alfa_run_one_time_import',
                        nonce: '<?php echo wp_create_nonce("alfa_importer_nonce"); ?>'
                    },
                    success: function(response) {
                        $spinner.hide();
                        $btn.prop('disabled', false).text('✓ تم الاستيراد بنجاح');
                        if (response.success) {
                            $logs.append('<p style="color:#4ade80;">[2/5] تم استيراد جميع ملفات الوسائط والصور إلى Media Library.</p>');
                            $logs.append('<p style="color:#4ade80;">[3/5] تم إنشاء 7 صفحات مع قوالبها وتعيين الصفحة الرئيسية الثابتة.</p>');
                            $logs.append('<p style="color:#4ade80;">[4/5] تم إنشاء 4 مقالات لوجستية وتعيين التصنيفات.</p>');
                            $logs.append('<p style="color:#4ade80;">[5/5] تم بناء القائمة الرئيسية وضبط الروابط الدائمة بنجاح!</p>');
                            $logs.append('<p style="color:#f59e0b; font-weight:bold;">🎉 اكتملت التهيئة بالكامل بنجاح 100%!</p>');
                            setTimeout(function() {
                                window.location.reload();
                            }, 1800);
                        } else {
                            $logs.append('<p style="color:#ef4444;">خطأ: ' + (response.data || 'حدث خطأ أثناء الاستيراد') + '</p>');
                        }
                    },
                    error: function() {
                        $spinner.hide();
                        $btn.prop('disabled', false).text('إعادة المحاولة');
                        $logs.append('<p style="color:#ef4444;">تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى.</p>');
                    }
                });
            });
        });
        </script>
        <?php
    }

    public function ajax_run_one_time_import() {
        check_ajax_referer('alfa_importer_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error('غير مصرح لك بتنفيذ هذه العملية.');
        }

        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        // 1. IMPORT MEDIA ASSETS
        $theme_dir = get_template_directory();
        $images_dir = $theme_dir . '/assets/images';
        $imported_media = array();

        if (is_dir($images_dir)) {
            $files = scandir($images_dir);
            $upload_dir = wp_upload_dir();

            foreach ($files as $file) {
                if (in_array($file, array('.', '..'))) continue;
                $file_path = $images_dir . '/' . $file;
                if (!is_file($file_path)) continue;

                $filename = basename($file_path);
                $upload_file = $upload_dir['path'] . '/' . $filename;

                if (!file_exists($upload_file)) {
                    copy($file_path, $upload_file);
                }

                $wp_filetype = wp_check_filetype($filename, null);
                $attachment = array(
                    'post_mime_type' => $wp_filetype['type'],
                    'post_title'     => sanitize_file_name(pathinfo($filename, PATHINFO_FILENAME)),
                    'post_content'   => '',
                    'post_status'    => 'inherit'
                );

                $attach_id = wp_insert_attachment($attachment, $upload_file);
                if (!is_wp_error($attach_id)) {
                    $attach_data = wp_generate_attachment_metadata($attach_id, $upload_file);
                    wp_update_attachment_metadata($attach_id, $attach_data);
                    $imported_media[$filename] = $attach_id;

                    if ($filename === 'alfa-logo.webp' || $filename === 'alfa-logo.png') {
                        set_theme_mod('custom_logo', $attach_id);
                    }

                    // Map review images to Theme Customizer options
                    for ($rev_idx = 1; $rev_idx <= 6; $rev_idx++) {
                        if ($filename === "review-{$rev_idx}.jpeg" || $filename === "review-{$rev_idx}.jpg" || $filename === "review-{$rev_idx}.png") {
                            update_option("alfa_review_photo_{$rev_idx}", wp_get_attachment_url($attach_id));
                        }
                    }
                }
            }
        }

        // 2. CREATE ALL 7 CORE PAGES WITH TEMPLATES
        $pages = array(
            'home' => array(
                'title'    => 'الرئيسية',
                'slug'     => 'home',
                'template' => 'front-page.php',
                'content'  => '<!-- الصفحة الرئيسية لقالب ألفا إكسبريس اللوجستي -->'
            ),
            'services' => array(
                'title'    => 'خدمات الشحن اللوجستية',
                'slug'     => 'services',
                'template' => 'page-services.php',
                'content'  => '<!-- صفحة خدمات الشحن الشاملة -->'
            ),
            'branches' => array(
                'title'    => 'فروعنا في المملكة (8)',
                'slug'     => 'branches',
                'template' => 'page-branches.php',
                'content'  => '<!-- صفحة فروع ألفا إكسبريس في جدة ومكة والرياض -->'
            ),
            'faq' => array(
                'title'    => 'الأسئلة الشائعة ومركز المساعدة',
                'slug'     => 'faq',
                'template' => 'page-faq.php',
                'content'  => '<!-- صفحة الأسئلة الشائعة مع محرك البحث و JSON-LD Schema -->'
            ),
            'blog' => array(
                'title'    => 'المدونة اللوجستية ودليل الشحن',
                'slug'     => 'blog',
                'template' => 'page-blog.php',
                'content'  => '<!-- صفحة المدونة اللوجستية -->'
            ),
            'tracking' => array(
                'title'    => 'تتبع الشحنة المباشر',
                'slug'     => 'tracking',
                'template' => 'page-tracking.php',
                'content'  => '<!-- صفحة تتبع الشحنات المباشر -->'
            ),
            'quote' => array(
                'title'    => 'طلب عرض سعر وحاسبة الشحن',
                'slug'     => 'quote',
                'template' => 'page-quote.php',
                'content'  => '<!-- صفحة حاسبة الأسعار والواتساب -->'
            ),
        );

        $created_page_ids = array();
        foreach ($pages as $key => $p) {
            $existing_page = get_page_by_path($p['slug']);
            if ($existing_page) {
                $page_id = $existing_page->ID;
                update_post_meta($page_id, '_wp_page_template', $p['template']);
            } else {
                $page_id = wp_insert_post(array(
                    'post_title'     => $p['title'],
                    'post_name'      => $p['slug'],
                    'post_content'   => $p['content'],
                    'post_status'    => 'publish',
                    'post_type'      => 'page',
                    'comment_status' => 'closed',
                ));
                if (!is_wp_error($page_id)) {
                    update_post_meta($page_id, '_wp_page_template', $p['template']);
                }
            }
            $created_page_ids[$key] = $page_id;
        }

        // Set static front page
        if (!empty($created_page_ids['home'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $created_page_ids['home']);
        }
        if (!empty($created_page_ids['blog'])) {
            update_option('page_for_posts', $created_page_ids['blog']);
        }

        // 3. CREATE BLOG POSTS & CATEGORIES
        $cat_customs = wp_create_category('الجمارك والتغليف');
        $cat_tips = wp_create_category('نصائح لوجستية');
        $cat_furniture = wp_create_category('شحن الأثاث والعفش');

        $sample_posts = array(
            array(
                'title'   => 'دليلك الشامل لشحن الأجهزة الكهربائية والشاشات دون جمارك مفاجئة من السعودية لمصر',
                'content' => 'نقدم لك في هذا الدليل كافة اللوائح الجمركية المصرية وطرق التغليف الآمن في صناديق خشبية مبطنة للشاشات الذكية والأجهزة المنزلية لضمان وصولها بأعلى معايير الأمان.',
                'cat'     => $cat_customs,
                'tags'    => array('شحن شاشات', 'جمارك مصر', 'تغليف آمن')
            ),
            array(
                'title'   => 'مميزات الشحن البري الدولي المباشر بالشاحنات المبطنة والتريلات لنقل الأثاث والبضائع إلى مصر',
                'content' => 'تعرف على الفروقات الجوهرية ومميزات الشحن البري المتخصص للأثاث والأوزان الكبيرة، مع جدول حساب الحجم بالمتر المكعب CBM وأسعار النقل من الباب للباب.',
                'cat'     => $cat_tips,
                'tags'    => array('شحن بري', 'نقل عفش', 'شاحنات مبطنة', 'متر مكعب')
            ),
            array(
                'title'   => 'شحن الأثاث والعفش المنزلي من جدة والرياض إلى مصر: خطوات الفك والتغليف والنقل من الباب للباب',
                'content' => 'خطوات عملية لفك الأثاث وغرف النوم بواسطة فنيين ونجارين محترفين، وتغليفه بالبابلز والكرتون المقوى، وشحنه إلى باب منزلك في القاهرة أو الصعيد أو الإسكندرية.',
                'cat'     => $cat_furniture,
                'tags'    => array('نقل عفش', 'شحن أثاث', 'فروع جدة')
            ),
            array(
                'title'   => 'قائمة الممنوعات والمواد المحظورة في الشحن الدولي بين المملكة العربية السعودية ومصر',
                'content' => 'احرص على مراجعة قائمة المواد الممنوع شحنها قانونياً لتفادي أي تأخيرات في المنافذ الجمركية، مع إرشادات البدائل المسموحة.',
                'cat'     => $cat_customs,
                'tags'    => array('الممنوعات', 'لوائح جمركية')
            )
        );

        foreach ($sample_posts as $sp) {
            $existing_post = get_page_by_title($sp['title'], OBJECT, 'post');
            if (!$existing_post) {
                $post_id = wp_insert_post(array(
                    'post_title'    => $sp['title'],
                    'post_content'  => $sp['content'],
                    'post_status'   => 'publish',
                    'post_type'     => 'post',
                    'post_category' => array($sp['cat']),
                    'tags_input'    => $sp['tags'],
                ));

                // Assign featured image if car or logo exists
                if (!empty($imported_media['alfa-car.png'])) {
                    set_post_thumbnail($post_id, $imported_media['alfa-car.png']);
                }
            }
        }

        // 4. BUILD & ASSIGN PRIMARY MENU
        $menu_name = 'القائمة الرئيسية';
        $menu_obj = wp_get_nav_menu_object($menu_name);
        $menu_id = $menu_obj ? $menu_obj->term_id : wp_create_nav_menu($menu_name);

        if ($menu_id && !is_wp_error($menu_id)) {
            // If new or empty menu, populate items
            $existing_items = wp_get_nav_menu_items($menu_id);
            if (empty($existing_items)) {
                $menu_items = array(
                    array('title' => 'الرئيسية', 'id' => $created_page_ids['home']),
                    array('title' => 'خدماتنا', 'id' => $created_page_ids['services']),
                    array('title' => 'فروعنا (8)', 'id' => $created_page_ids['branches']),
                    array('title' => 'الأسئلة الشائعة', 'id' => $created_page_ids['faq']),
                    array('title' => 'المدونة', 'id' => $created_page_ids['blog']),
                    array('title' => 'تتبع الشحنة', 'id' => $created_page_ids['tracking']),
                    array('title' => 'طلب عرض سعر', 'id' => $created_page_ids['quote']),
                );

                $order = 1;
                foreach ($menu_items as $item) {
                    if (!empty($item['id'])) {
                        wp_update_nav_menu_item($menu_id, 0, array(
                            'menu-item-title'     => $item['title'],
                            'menu-item-object'    => 'page',
                            'menu-item-object-id' => $item['id'],
                            'menu-item-type'      => 'post_type',
                            'menu-item-status'    => 'publish',
                            'menu-item-position'  => $order++
                        ));
                    }
                }
            }

            // Always assign to 'primary' theme location
            $locations = get_theme_mod('nav_menu_locations');
            if (!is_array($locations)) $locations = array();
            $locations['primary'] = $menu_id;
            set_theme_mod('nav_menu_locations', $locations);
        }

        // 5. CONFIGURE SITE OPTIONS & PERMALINKS
        global $wp_rewrite;
        $wp_rewrite->set_permalink_structure('/%postname%/');
        $wp_rewrite->flush_rules();

        update_option('alfa_main_phone', '0501653999');
        update_option('alfa_whatsapp', '966501653999');
        update_option('alfa_legal_name', 'شركة ألفا لنقل العفش والشحن البري الدولي');
        update_option('alfa_main_address', '4275 الروضة - حي الفيصلية - جدة - المملكة العربية السعودية');

        update_option('alfa_one_time_import_completed', true);
        update_option('alfa_one_time_import_date', current_time('mysql'));

        wp_send_json_success(array('message' => 'تم استيراد الموقع بالكامل بنجاح'));
    }
}

new Alfa_Express_One_Time_Importer();
