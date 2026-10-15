<?php
/**
 * @file header.php
 * @project Alfa Express Logistics - Standalone WordPress Theme
 * @author Jenova Media (https://jenova.media)
 * @description Theme header template: injects HTML head, flicker-free dark/light theme initializer,
 * dynamic reading scroll progress bar, desktop navigation, and mobile drawer.
 *
 * @package AlfaExpress
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <!-- Immediate Theme Initialization Script to prevent flicker -->
    <script>
        (function() {
            try {
                var saved = localStorage.getItem('alfa_theme');
                if (saved === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.add('light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.classList.remove('light');
                }
            } catch(e) {}
        })();
    </script>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- TOP DYNAMIC SCROLL PROGRESS BAR -->
<div id="alfa-scroll-progress-bar" style="position:fixed; top:0; left:0; right:0; height:3.5px; background:linear-gradient(to right, #e30613, #f59e0b, #38bdf8); width:0%; z-index:99999; pointer-events:none; transition:width 0.08s ease-out; box-shadow:0 0 10px rgba(227,6,19,0.7);"></div>

<!-- MAIN HEADER -->
<header id="alfa-main-header" class="alfa-header">
    <div class="alfa-container">
        <div class="alfa-header-inner">
            
            <!-- LOGO & BRAND -->
            <div style="display:flex; align-items:center; flex-shrink:0;">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="alfa-brand-logo-wrap" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
                    <?php
                    $custom_logo_id = get_theme_mod('custom_logo');
                    $logo_url = $custom_logo_id ? wp_get_attachment_image_url($custom_logo_id, 'medium') : get_template_directory_uri() . '/assets/images/alfa-logo.webp';
                    ?>
                    <div class="alfa-logo-box" style="border-radius:10px; padding:3px; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0;">
                        <img src="<?php echo esc_url($logo_url); ?>" alt="<?php bloginfo('name'); ?>" class="alfa-brand-logo-img" style="max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; display:block;">
                    </div>
                    <div>
                        <span class="alfa-brand-title" style="font-weight:900; display:flex; align-items:center; gap:6px; line-height:1.2;">
                            ألفا إكسبريس
                            <span style="font-size:0.65rem; background:#e30613; color:#fff; padding:2px 6px; border-radius:4px; font-weight:800; text-transform:uppercase;">
                                Logistics
                            </span>
                        </span>
                        <span class="alfa-brand-subtitle" style="font-size:0.75rem; display:block; margin-top:2px;">
                            <?php echo esc_html(get_option('alfa_legal_name', 'شركة ألفا لنقل العفش والشحن الدولي')); ?>
                        </span>
                    </div>
                </a>
            </div>

            <!-- DESKTOP NAVIGATION WITH FULL SECTIONS -->
            <nav class="alfa-desktop-nav" aria-label="القائمة الرئيسية">
                <?php
                $has_custom_menu = false;
                if (has_nav_menu('primary')) {
                    $menu_output = wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'container'      => false,
                        'menu_class'     => 'alfa-nav-list',
                        'echo'           => false,
                        'fallback_cb'    => false,
                    ));
                    if (!empty($menu_output) && strpos($menu_output, '<li') !== false) {
                        echo $menu_output;
                        $has_custom_menu = true;
                    }
                }
                
                if (!$has_custom_menu) {
                    ?>
                    <ul class="alfa-nav-list">
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/')); ?>">الرئيسية</a></li>
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/#services')); ?>">خدماتنا</a></li>
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/#cbm-calculator')); ?>">حاسبة CBM</a></li>
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/#process')); ?>">مراحل النقل</a></li>
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/#branches')); ?>">فروعنا (8)</a></li>
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/#reviews')); ?>">آراء العملاء</a></li>
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/#faq')); ?>">الأسئلة الشائعة</a></li>
                        <li class="alfa-nav-item"><a href="<?php echo esc_url(home_url('/#tracking')); ?>">تتبع الشحنة</a></li>
                    </ul>
                    <?php
                }
                ?>
            </nav>

            <!-- HEADER ACTIONS -->
            <div class="alfa-header-actions" style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                <!-- Theme Switcher (Dark / Light Mode Toggle) -->
                <button id="alfa-theme-toggle" class="alfa-theme-toggle-btn alfa-btn alfa-btn-outline" style="padding:0.45rem 0.65rem; font-size:1.05rem; display:inline-flex; align-items:center; justify-content:center; border-radius:10px; line-height:1; min-width:40px; min-height:40px; cursor:pointer;" aria-label="تبديل المظهر النهاري والليلي" title="تبديل المظهر (نهاري / ليلي)">
                    <span class="alfa-theme-icon-light" style="display:none;">☀️</span>
                    <span class="alfa-theme-icon-dark" style="display:inline;">🌙</span>
                </button>

                <!-- Call Direct -->
                <a href="tel:<?php echo esc_attr(get_option('alfa_main_phone', '0501653999')); ?>" class="alfa-btn alfa-btn-outline alfa-hide-mobile" style="padding:0.5rem 0.85rem; font-size:0.8rem;" dir="ltr">
                    📞 <?php echo esc_html(get_option('alfa_main_phone', '0501653999')); ?>
                </a>

                <!-- Quick Quote CTA -->
                <?php $alfa_quote_url = is_front_page() ? '#quote' : esc_url(home_url('/quote')); ?>
                <a href="<?php echo esc_url($alfa_quote_url); ?>" class="alfa-btn alfa-btn-primary" style="padding:0.55rem 1.15rem; font-size:0.8rem;">
                    اطلب عرض سعر
                </a>

                <!-- Mobile Menu Toggle Button -->
                <button id="alfa-menu-toggle" class="alfa-mobile-toggle-btn alfa-btn alfa-btn-outline" style="padding:0.5rem 0.75rem; font-size:1.1rem; cursor:pointer;" aria-label="فتح القائمة">
                    ☰
                </button>
            </div>

        </div>

        <!-- MOBILE MENU DRAWER WITH FULL SECTIONS -->
        <div id="alfa-mobile-drawer" style="display:none; padding:1.25rem; margin-top:0.5rem; border-radius:1.25rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.1);">
            <ul style="list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
                <li><a href="<?php echo esc_url(home_url('/')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">الرئيسية</a></li>
                <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">خدمات الشحن</a></li>
                <li><a href="<?php echo esc_url(home_url('/#cbm-calculator')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">حاسبة الأبعاد CBM</a></li>
                <li><a href="<?php echo esc_url(home_url('/#process')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">مراحل النقل</a></li>
                <li><a href="<?php echo esc_url(home_url('/#branches')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">فروع المملكة (8)</a></li>
                <li><a href="<?php echo esc_url(home_url('/#reviews')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">آراء العملاء</a></li>
                <li><a href="<?php echo esc_url(home_url('/#faq')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">الأسئلة الشائعة</a></li>
                <li><a href="<?php echo esc_url(home_url('/#tracking')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">تتبع الشحنة</a></li>
                <li><a href="<?php echo esc_url(home_url('/blog')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">المدونة اللوجستية</a></li>
                <li><a href="<?php echo esc_url(home_url('/services')); ?>" class="alfa-mobile-link" style="display:block; padding:0.65rem; border-radius:0.5rem; text-align:center; font-weight:bold; font-size:0.85rem; text-decoration:none;">كل الخدمات</a></li>
                <li style="grid-column:1 / -1; margin-top:0.25rem;">
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.85rem; border-radius:0.5rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);">
                        <span id="alfa-mobile-theme-label" style="font-size:0.85rem; font-weight:bold;">🌙 الوضع الليلي (Dark)</span>
                        <button type="button" id="alfa-mobile-theme-toggle" class="alfa-btn alfa-btn-outline" style="padding:0.3rem 0.75rem; font-size:0.75rem; font-weight:bold; border-radius:6px; cursor:pointer;">تبديل المظهر</button>
                    </div>
                </li>
                <li style="grid-column:1 / -1;"><a href="<?php echo esc_url($alfa_quote_url); ?>" style="display:block; padding:0.75rem; border-radius:0.5rem; background:#e30613; text-align:center; font-weight:bold; font-size:0.9rem; color:#fff; text-decoration:none;">طلب عرض سعر فوري</a></li>
            </ul>
        </div>
    </div>
</header>

