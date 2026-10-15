<?php
/**
 * Template Name: Elementor Canvas (لوحة كاملة مخصصة)
 * Template Post Type: post, page
 *
 * @package AlfaExpress
 * @version 3.2.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class('alfa-elementor-canvas'); ?>>
<?php
while (have_posts()) :
    the_post();
    the_content();
endwhile;
?>
<?php wp_footer(); ?>
</body>
</html>
