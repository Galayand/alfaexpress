<?php
/**
 * Alfa Express Logistics - Fallback Index Template
 */
get_header();
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh;">
    <div class="alfa-container">
        <?php if (have_posts()): ?>
            <div class="alfa-grid-3" style="gap:2rem;">
                <?php while (have_posts()): the_post(); ?>
                    <article class="alfa-card">
                        <h2 style="font-size:1.25rem; font-weight:900; color:#fff; margin:0 0 0.75rem;">
                            <a href="<?php the_permalink(); ?>" style="color:#fff; text-decoration:none;">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <p style="font-size:0.9rem; color:#94a3b8; line-height:1.7; margin-bottom:1.5rem;">
                            <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                        </p>
                        <a href="<?php the_permalink(); ?>" style="color:#e30613; font-weight:bold; font-size:0.85rem;">
                            قراءة المزيد &larr;
                        </a>
                    </article>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
