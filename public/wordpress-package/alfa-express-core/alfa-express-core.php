<?php
/**
 * Plugin Name: Alfa Express Core Logistics
 * Plugin URI: https://alfaexpressco.com/
 * Description: الملحق الأساسي لشركة ألفا إكسبريس لإدارة الفروع الـ 8، أرقام التواصل، حاسبة التسعير، وبيانات Schema.org
 * Version: 2.0.0
 * Author: Alfa Express Engineering
 * Text Domain: alfa-express-core
 */

if (!defined('ABSPATH')) exit;

// Include shortcodes and widgets
require_once plugin_dir_path(__FILE__) . 'includes/class-alfa-shortcodes.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-alfa-asset-importer.php';

// Register Settings Menu
add_action('admin_menu', 'alfa_register_custom_admin_menu');
function alfa_register_custom_admin_menu() {
    add_menu_page(
        'إعدادات ألفا إكسبريس',
        'ألفا إكسبريس',
        'manage_options',
        'alfa-settings',
        'alfa_render_admin_settings',
        'dashicons-location-alt',
        25
    );
}

function alfa_render_admin_settings() {
    if (isset($_POST['alfa_save_settings']) && check_admin_referer('alfa_settings_nonce')) {
        update_option('alfa_main_phone', sanitize_text_field($_POST['alfa_main_phone']));
        update_option('alfa_whatsapp', sanitize_text_field($_POST['alfa_whatsapp']));
        update_option('alfa_years_experience', intval($_POST['alfa_years_experience']));
        update_option('alfa_starting_price', intval($_POST['alfa_starting_price']));
        update_option('alfa_tracking_url', esc_url_raw($_POST['alfa_tracking_url']));
        echo '<div class="notice notice-success is-dismissible"><p>تم حفظ الإعدادات بنجاح.</p></div>';
    }

    if (isset($_GET['imported'])) {
        $count = intval($_GET['imported']);
        echo '<div class="notice notice-success is-dismissible"><p><strong>تهانينا!</strong> تم استيراد ' . $count . ' من وسائط وأصول ألفا إكسبريس بنجاح إلى مكتبة وسائط ووردبريس ومزامنة الشعار الرسمي للشركة.</p></div>';
    }

    $phone = get_option('alfa_main_phone', '0501653999');
    $whatsapp = get_option('alfa_whatsapp', '966501653999');
    $exp = get_option('alfa_years_experience', 15);
    $price = get_option('alfa_starting_price', 150);
    $tracking = get_option('alfa_tracking_url', 'https://alfaexpress-ksa.com/track');
    $last_imported = get_option('alfa_assets_imported_time', '');
    $imported_count = get_option('alfa_imported_count', 0);
    ?>
    <div class="wrap" dir="rtl">
        <h1>إعدادات شركة ألفا إكسبريس للخدمات اللوجستية</h1>
        
        <!-- Asset Importer Banner Box -->
        <div style="background:#fff; border-right:4px solid #e30613; padding:20px; margin:20px 0; box-shadow:0 1px 3px rgba(0,0,0,0.1); border-radius:8px;">
            <h2 style="margin-top:0; color:#0b1429; display:flex; align-items:center; gap:8px;">
                <span class="dashicons dashicons-upload" style="font-size:24px; width:24px; height:24px; color:#e30613;"></span>
                استيراد جميع الوسائط والأصول إلى ووردبريس (One-Click Asset Importer)
            </h2>
            <p style="font-size:14px; color:#475569; max-width:850px; line-height:1.7;">
                يقوم هذا الخيار بنقل واستيراد كافة الوسائط المعتمدة للشركة مباشرة إلى <strong>مكتبة الوسائط (Media Library)</strong> في موقعك، بما في ذلك:
            </p>
            <ul style="list-style:disc; margin-right:25px; color:#334155; font-size:13px; line-height:1.8;">
                <li><strong>شعار الشركة الرسمي عالي الجودة:</strong> (Alfa-Logo.webp) مع تعيينه كشعار رئيسي للموقع تلقائياً.</li>
                <li><strong>صورة أسطول الشاحنات:</strong> (alfa-car.png) بدقة واضحة وبخلفية مفرغة.</li>
                <li><strong>شهادات ومراجعات العملاء الموثقة:</strong> (6 تقييمات موثقة من Google Reviews لجدة والرياض ومكة).</li>
                <li><strong>تهيئة بيانات الفروع والأسعار:</strong> حفظ كافة أرقام الفروع الثمانية وبوابة التتبع الرسمية.</li>
            </ul>

            <?php if ($last_imported): ?>
                <p style="color:#16a34a; font-weight:bold; font-size:13px; margin:12px 0;">
                    ✓ تم استيراد <?php echo esc_html($imported_count); ?> أصلاً سابقاً بتاريخ <?php echo esc_html($last_imported); ?>.
                </p>
            <?php endif; ?>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="margin-top:15px;">
                <input type="hidden" name="action" value="alfa_import_assets" />
                <?php wp_nonce_field('alfa_import_assets_action', 'alfa_import_nonce'); ?>
                <button type="submit" class="button button-primary" style="background:#e30613; border-color:#b90510; font-size:14px; height:38px; padding:0 18px; font-weight:bold;">
                    <?php echo $last_imported ? 'إعادة استيراد وتحديث كافة الأصول الآن' : 'استيراد جميع الأصول إلى ووردبريس الآن (بنقرة واحدة)'; ?>
                </button>
            </form>
        </div>

        <!-- General Settings Form -->
        <form method="post">
            <?php wp_nonce_field('alfa_settings_nonce'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">الهاتف الموحد:</th>
                    <td><input type="text" name="alfa_main_phone" value="<?php echo esc_attr($phone); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th scope="row">رقم الواتساب:</th>
                    <td><input type="text" name="alfa_whatsapp" value="<?php echo esc_attr($whatsapp); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th scope="row">رابط بوابة التتبع الرسمي:</th>
                    <td><input type="url" name="alfa_tracking_url" value="<?php echo esc_attr($tracking); ?>" class="large-text" /></td>
                </tr>
                <tr>
                    <th scope="row">سنوات الخبرة (المثبتة):</th>
                    <td><input type="number" name="alfa_years_experience" value="<?php echo esc_attr($exp); ?>" class="small-text" /> سنة</td>
                </tr>
                <tr>
                    <th scope="row">الأسعار تبدأ من:</th>
                    <td><input type="number" name="alfa_starting_price" value="<?php echo esc_attr($price); ?>" class="small-text" /> ريال</td>
                </tr>
            </table>
            <p class="submit"><input type="submit" name="alfa_save_settings" class="button button-primary" value="حفظ التعديلات" /></p>
        </form>
    </div>
    <?php
}

// Inject Organization & LocalBusiness JSON-LD Schema
add_action('wp_head', 'alfa_inject_structured_schema');
function alfa_inject_structured_schema() {
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'LogisticsService',
        'name' => 'ألفا إكسبريس للخدمات اللوجستية والشحن الدولي',
        'legalName' => 'شركة الفاء السريع للخدمات اللوجستية',
        'url' => 'https://alfaexpressco.com/',
        'logo' => 'https://alfaexpressco.com/wp-content/uploads/2026/05/Alfa-Logo.webp',
        'telephone' => '+966501653999',
        'priceRange' => '150 SAR - 5000 SAR',
        'address' => array(
            '@type' => 'PostalAddress',
            'streetAddress' => '4275 الروضة - حي الفيصلية',
            'addressLocality' => 'Jeddah',
            'addressCountry' => 'SA'
        ),
        'areaServed' => array('Saudi Arabia', 'Egypt'),
    );
    echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_UNICODE) . '</script>';
}
