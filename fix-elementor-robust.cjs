const fs = require('fs');
const path = require('path');

const templates = [
    'front-page.php',
    'page-services.php',
    'page-branches.php',
    'page-quote.php',
    'page-faq.php',
    'page-tracking.php',
    'page-blog.php'
];

const basePath = './public/wordpress-package/alfa-express-theme';

templates.forEach(file => {
    const filePath = path.join(basePath, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any previous Elementor logic I tried to add
    content = content.replace(/<\?php if \( class_exists.*?<div class="alfa-standard-content">/s, '');
    content = content.replace(/<\/div>\s*<\?php endif; \?>\s*<\?php\s+get_footer\(\);\s*\?>/s, '<?php get_footer(); ?>');
    content = content.replace(/<!-- Elementor Compatibility Area -->[\s\S]*?(?=<\?php get_footer\(\); \?>)/g, '');

    // Now, insert the early-exit Elementor handler right after get_header();
    const headerRegex = /(get_header\(\);\s*)/;
    if (content.match(headerRegex)) {
        const insertion = `
if ( class_exists( '\\Elementor\\Plugin' ) && \\Elementor\\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) {
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
    echo '<div style="background:#e30613; color:#fff; padding:15px; text-align:center; font-family:sans-serif; margin-top:20px;">
            <strong>ملاحظة للمدير:</strong> هذه الصفحة تستخدم القالب الافتراضي. لتعديل المحتوى بحرية عبر Elementor، قم بالضغط على "التحرير بواسطة Elementor" من الأعلى واستخدم عناصر (Widgets) الخاصة بقالب ألفا.
          </div>';
}
`;
        content = content.replace(headerRegex, `$1${insertion}`);
        fs.writeFileSync(filePath, content);
        console.log("Applied robust Elementor override to: " + file);
    }
});
