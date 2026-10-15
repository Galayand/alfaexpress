<?php
/**
 * Template Name: Elementor Full Width (عرض كامل مع الهيدر والفوتر)
 * Template Post Type: post, page
 *
 * @package AlfaExpress
 * @version 3.2.0
 */
get_header();
?>
<main id="primary" class="site-main alfa-elementor-fullwidth-content">
    <?php
    while (have_posts()) :
        the_post();
        the_content();
    endwhile;
    ?>
</main>
<?php
get_footer();
