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

    // Remove any previous wrapping to avoid duplication
    content = content.replace(/<\?php if \( class_exists.*?<div class="alfa-standard-content">/s, '');
    content = content.replace(/<\/div>\s*<\?php endif; \?>\s*<\?php\s+get_footer\(\);\s*\?>/s, '<?php get_footer(); ?>');

    // Also remove the old inline wrapper if it was added slightly differently
    content = content.replace(/<\?php if \( class_exists\( '\\\\Elementor\\\\Plugin' \)[\s\S]*?<div class="alfa-standard-content"[^>]*>/, '');

    const headerMatch = content.match(/(get_header\(\);\s*\?>)/);
    const footerMatch = content.match(/(<\?php\s+get_footer\(\);\s*\?>)/);

    if (headerMatch && footerMatch) {
        const headerEnd = headerMatch.index + headerMatch[0].length;
        const footerStart = footerMatch.index;

        const middleContent = content.substring(headerEnd, footerStart);

        // We wrap the middle content so that if Elementor is active ON THIS PAGE, the hardcoded stuff hides.
        const wrappedContent = `
<?php if ( class_exists( '\\Elementor\\Plugin' ) && \\Elementor\\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) : ?>
    <div class="alfa-elementor-content">
        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
<?php else : ?>
    <div class="alfa-standard-content">
        <?php 
        // Show an edit notice if admin
        if ( current_user_can('edit_posts') ) : 
        ?>
            <div style="background:#e30613; color:#fff; padding:15px; text-align:center; font-family:sans-serif;">
                <strong>ملاحظة للمدير:</strong> هذه الصفحة تستخدم القالب الافتراضي. لتعديل المحتوى بحرية عبر Elementor، قم بالضغط على "التحرير بواسطة Elementor" من الأعلى.
            </div>
        <?php endif; ?>
${middleContent}
    </div>
<?php endif; ?>
`;
        const finalContent = content.substring(0, headerEnd) + wrappedContent + content.substring(footerStart);
        fs.writeFileSync(filePath, finalContent);
        console.log("Wrapped: " + file);
    }
});
