<?php
/**
 * Alfa Express Core - Automated Media & Asset Importer
 * Handles one-click importation of brand logos, truck photos, and review images into the WordPress Media Library.
 */

if (!defined('ABSPATH')) exit;

class Alfa_Asset_Importer {

    public static function init() {
        add_action('admin_post_alfa_import_assets', array(__CLASS__, 'handle_asset_import'));
    }

    /**
     * Handle the POST request from WP Admin to import all bundled assets
     */
    public static function handle_asset_import() {
        if (!current_user_can('manage_options') || !current_user_can('upload_files')) {
            wp_die(__('ليس لديك صلاحيات كافية لاستيراد الوسائط.', 'alfa-express-core'));
        }

        check_admin_referer('alfa_import_assets_action', 'alfa_import_nonce');

        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        $plugin_dir = plugin_dir_path(dirname(__FILE__));
        $assets_dir = $plugin_dir . 'assets/';
        $wp_upload_dir = wp_upload_dir();

        $imported_count = 0;
        $imported_items = array();

        // Assets definition
        $assets_to_import = array(
            array(
                'rel_path' => 'brand/alfa-logo.webp',
                'title'    => 'شعار شركة الفاء السريع للخدمات اللوجستية',
                'alt'      => 'شعار شركة الفاء السريع للخدمات اللوجستية والشحن الدولي',
                'is_logo'  => true,
            ),
            array(
                'rel_path' => 'brand/alfa-car.png',
                'title'    => 'أسطول شاحنات وسيارات الفاء السريع',
                'alt'      => 'أسطول شاحنات وسيارات الفاء السريع للخدمات اللوجستية',
                'is_logo'  => false,
            ),
            array(
                'rel_path' => 'reviews/review-1.jpeg',
                'title'    => 'تقييم عميل معتمد 1 - الفاء السريع',
                'alt'      => 'تقييم عميل معتمد - شركة الفاء السريع للشحن',
                'is_logo'  => false,
            ),
            array(
                'rel_path' => 'reviews/review-2.jpeg',
                'title'    => 'تقييم عميل معتمد 2 - الفاء السريع',
                'alt'      => 'تقييم عميل معتمد - شركة الفاء السريع للشحن',
                'is_logo'  => false,
            ),
            array(
                'rel_path' => 'reviews/review-3.jpeg',
                'title'    => 'تقييم عميل معتمد 3 - الفاء السريع',
                'alt'      => 'تقييم عميل معتمد - شركة الفاء السريع للشحن',
                'is_logo'  => false,
            ),
            array(
                'rel_path' => 'reviews/review-4.jpeg',
                'title'    => 'تقييم عميل معتمد 4 - الفاء السريع',
                'alt'      => 'تقييم عميل معتمد - شركة الفاء السريع للشحن',
                'is_logo'  => false,
            ),
            array(
                'rel_path' => 'reviews/review-5.jpeg',
                'title'    => 'تقييم عميل معتمد 5 - الفاء السريع',
                'alt'      => 'تقييم عميل معتمد - شركة الفاء السريع للشحن',
                'is_logo'  => false,
            ),
            array(
                'rel_path' => 'reviews/review-6.jpeg',
                'title'    => 'تقييم عميل معتمد 6 - الفاء السريع',
                'alt'      => 'تقييم عميل معتمد - شركة الفاء السريع للشحن',
                'is_logo'  => false,
            ),
        );

        foreach ($assets_to_import as $asset) {
            $source_file = $assets_dir . $asset['rel_path'];
            if (!file_exists($source_file)) {
                continue;
            }

            $filename = basename($source_file);
            $destination = $wp_upload_dir['path'] . '/' . $filename;

            // Copy file to uploads directory
            if (@copy($source_file, $destination)) {
                $filetype = wp_check_filetype($filename, null);

                // Prepare attachment data
                $attachment = array(
                    'guid'           => $wp_upload_dir['url'] . '/' . $filename,
                    'post_mime_type' => $filetype['type'],
                    'post_title'     => sanitize_text_field($asset['title']),
                    'post_content'   => '',
                    'post_status'    => 'inherit'
                );

                // Insert into WordPress Media Library
                $attach_id = wp_insert_attachment($attachment, $destination);

                if (!is_wp_error($attach_id)) {
                    // Generate metadata (thumbnails, sizes)
                    $attach_data = wp_generate_attachment_metadata($attach_id, $destination);
                    wp_update_attachment_metadata($attach_id, $attach_data);

                    // Set Alt text
                    update_post_meta($attach_id, '_wp_attachment_image_alt', sanitize_text_field($asset['alt']));

                    // If it's the logo, optionally set as WordPress Custom Logo
                    if (!empty($asset['is_logo'])) {
                        set_theme_mod('custom_logo', $attach_id);
                        update_option('alfa_custom_logo_id', $attach_id);
                    }

                    $imported_count++;
                    $imported_items[] = $asset['title'];
                }
            }
        }

        // Also ensure default branch and company options are seeded
        update_option('alfa_main_phone', '0501653999');
        update_option('alfa_whatsapp', '966501653999');
        update_option('alfa_years_experience', 15);
        update_option('alfa_starting_price', 150);
        update_option('alfa_tracking_url', 'https://alfaexpress-ksa.com/track');
        update_option('alfa_assets_imported_time', current_time('mysql'));
        update_option('alfa_imported_count', $imported_count);

        // Redirect back with success message
        wp_safe_redirect(add_query_arg(
            array(
                'page'     => 'alfa-settings',
                'imported' => $imported_count,
            ),
            admin_url('admin.php')
        ));
        exit;
    }
}

Alfa_Asset_Importer::init();
