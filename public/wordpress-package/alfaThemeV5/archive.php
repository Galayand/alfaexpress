<?php
/**
 * Alfa Express Logistics - Archive Template
 */
get_header();
?>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh;">
    <div class="alfa-container">
        
        <div style="text-align:center; max-width:700px; margin:0 auto 3.5rem;">
            <h1 style="font-size:2.25rem; font-weight:900; color:#fff; margin:0 0 1rem;">
                <?php the_archive_title(); ?>
            </h1>
            <div style="color:#94a3b8; font-size:0.95rem;">
                <?php the_archive_description(); ?>
            </div>
        </div>

        <?php if (have_posts()): ?>
            <div class="alfa-grid-3" style="gap:2rem;">
                <?php while (have_posts()): the_post(); ?>
                    <article class="alfa-card" style="display:flex; flex-direction:column; justify-content:space-between; padding:1.75rem;">
                        <div>
                            <?php if (has_post_thumbnail()): ?>
                                <div style="border-radius:1rem; overflow:hidden; margin-bottom:1.25rem; max-height:180px;">
                                    <?php the_post_thumbnail('medium', array('style' => 'width:100%; height:auto; object-fit:cover;')); ?>
                                </div>
                            <?php endif; ?>

                            <h2 style="font-size:1.15rem; font-weight:900; color:#fff; margin:0 0 0.75rem;">
                                <a href="<?php the_permalink(); ?>" style="color:#fff; text-decoration:none;">
                                    <?php the_title(); ?>
                                </a>
                            </h2>

                            <p style="font-size:0.85rem; color:#94a3b8; line-height:1.6; margin-bottom:1.5rem;">
                                <?php echo wp_trim_words(get_the_excerpt(), 18); ?>
                            </p>
                        </div>

                        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1rem;">
                            <a href="<?php the_permalink(); ?>" style="color:#e30613; font-weight:bold; font-size:0.85rem;">
                                قراءة المقال &larr;
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>

    </div>
</div>

<?php get_footer(); ?>
