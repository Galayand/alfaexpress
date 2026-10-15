<?php
/**
 * Alfa Express Logistics - 404 Error Page
 */
get_header();
?>

<div style="padding:6rem 0 8rem; background:#070d1d; min-height:80vh; display:flex; align-items:center;">
    <div class="alfa-container" style="max-width:650px; text-align:center;">
        
        <div style="font-size:5rem; font-weight:900; color:#e30613; line-height:1; margin-bottom:1rem;">404</div>
        <h1 style="font-size:2rem; font-weight:900; color:#fff; margin:0 0 1rem;">الصفحة المطلوبة غير موجودة</h1>
        <p style="color:#94a3b8; font-size:1rem; line-height:1.7; margin-bottom:2.5rem;">
            عذراً، الرابط الذي تحاول الوصول إليه غير متوفر أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية أو تتبع شحنتك مباشرة.
        </p>

        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="alfa-btn alfa-btn-primary">
                العودة للرئيسية
            </a>
            <a href="<?php echo esc_url(home_url('/tracking')); ?>" class="alfa-btn alfa-btn-outline">
                تتبع شحنتك
            </a>
            <a href="<?php echo esc_url(home_url('/branches')); ?>" class="alfa-btn alfa-btn-outline">
                فروعنا (8)
            </a>
        </div>

    </div>
</div>

<?php get_footer(); ?>
