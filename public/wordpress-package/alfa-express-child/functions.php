<?php
/**
 * Alfa Express Child Theme Functions
 * Preserves existing Elementor widgets, forms, schema, and enqueue scripts.
 */

if (!defined('ABSPATH')) exit;

function alfa_express_child_enqueue() {
    // Enqueue Parent styles
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('child-style', get_stylesheet_uri(), array('parent-style'), '2.0.0');

    // Google Fonts: Cairo & Tajawal
    wp_enqueue_style('alfa-fonts', 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;700&display=swap', array(), null);

    // Enqueue 3D on front page only
    if (is_front_page()) {
        wp_enqueue_script('three-js', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', array(), '0.128.0', true);
        wp_enqueue_script('alfa-3d-experience', get_stylesheet_directory_uri() . '/assets/js/alfa-3d-experience.js', array('three-js'), '2.0.0', true);

        wp_localize_script('alfa-3d-experience', 'AlfaSettings', array(
            'brandColor' => '#E30613',
            'phone' => get_option('alfa_main_phone', '0501653999'),
            'trackingUrl' => get_option('alfa_tracking_url', 'https://alfaexpress-ksa.com/track'),
        ));
    }
}
add_action('wp_enqueue_scripts', 'alfa_express_child_enqueue');
