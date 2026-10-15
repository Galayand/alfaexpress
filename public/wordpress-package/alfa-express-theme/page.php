<?php
/**
 * Alfa Express Logistics - Standard Page Template
 */
get_header();
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh;">
    <div class="alfa-container" style="max-width:900px;">
        <?php while (have_posts()): the_post(); ?>
            <article class="alfa-card" style="padding:3rem;">
                <h1 style="font-size:2.25rem; font-weight:900; color:#fff; margin:0 0 1.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem;">
                    <?php the_title(); ?>
                </h1>
                <div style="color:#cbd5e1; line-height:1.9; font-size:1rem;">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>

<?php get_footer(); ?>
