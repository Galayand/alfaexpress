<?php
/**
 * Template Name: الأسئلة الشائعة (FAQ)
 * Template Post Type: page
 */
get_header();


if ( class_exists( '\Elementor\Plugin' ) && \Elementor\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) {
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
$faqs = alfa_get_faqs();

// JSON-LD Schema for Google SEO Rich Snippets
$faq_schema = array(
    '@context' => 'https://schema.org',
    '@type'    => 'FAQPage',
    'mainEntity' => array()
);

foreach ($faqs as $f) {
    $faq_schema['mainEntity'][] = array(
        '@type' => 'Question',
        'name'  => $f['q'],
        'acceptedAnswer' => array(
            '@type' => 'Answer',
            'text'  => $f['a']
        )
    );
}
?>

<script type="application/ld+json">
<?php echo json_encode($faq_schema, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
</script>

<div style="padding:4rem 0 6rem; background:#070d1d; min-height:80vh;">
    <div class="alfa-container" style="max-width:850px;">
        
        <!-- Header Banner -->
        <div style="text-align:center; margin-bottom:3.5rem;">
            <div class="alfa-badge alfa-badge-red" style="margin-bottom:1rem;">دليل الأسئلة الشائعة والمعلومات الخدمية الرسمية</div>
            <h1 style="font-size:clamp(2rem, 4vw, 3rem); font-weight:900; color:#fff; margin:0 0 1rem;">
                دليل الأسئلة الشائعة <span style="color:#e30613;">لشحن البضائع والعفش</span>
            </h1>
            <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.8;">
                إجابات تفصيلية ورسمية من شركة الفاء السريع حول مدة التوصيل، التغليف، التعويض الجمركي، التوصيل للباب، واحتساب الشحن بالحجم CBM.
            </p>
        </div>

        <!-- Live Instant Search Bar -->
        <div style="margin-bottom:1.5rem;">
            <div style="position:relative;">
                <input type="text" id="alfa-faq-search" class="alfa-input" placeholder="ابحث في الأسئلة (مثال: بري، جمارك، تغليف، مدة الشحن، أثاث، سوائل، CBM)..." style="padding:1rem 1.5rem; font-size:1rem; border-radius:1.25rem; width:100%;">
            </div>
        </div>

        <?php
        $categories = array('الكل');
        foreach ($faqs as $f) {
            $cat = !empty($f['category']) ? $f['category'] : 'عام';
            if (!in_array($cat, $categories)) {
                $categories[] = $cat;
            }
        }
        ?>

        <!-- FAQ Categories Filter Pills -->
        <div id="alfa-faq-categories" style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:2rem; justify-content:center;">
            <?php foreach ($categories as $idx => $cat): ?>
                <button type="button" class="alfa-faq-cat-btn <?php echo $idx === 0 ? 'active' : ''; ?>" data-category="<?php echo esc_attr($cat); ?>" style="padding:0.5rem 1rem; border-radius:999px; font-size:0.85rem; font-weight:bold; cursor:pointer; transition:all 0.2s; border:1px solid <?php echo $idx === 0 ? '#e30613' : 'rgba(255,255,255,0.12)'; ?>; background:<?php echo $idx === 0 ? '#e30613' : 'rgba(15,23,42,0.8)'; ?>; color:<?php echo $idx === 0 ? '#fff' : '#cbd5e1'; ?>;">
                    <?php echo esc_html($cat); ?>
                </button>
            <?php endforeach; ?>
        </div>

        <!-- FAQ Accordion List -->
        <div id="alfa-faq-list">
            <?php foreach ($faqs as $i => $faq): 
                $faq_cat = !empty($faq['category']) ? $faq['category'] : 'عام';
            ?>
                <details class="alfa-faq-item" data-category="<?php echo esc_attr($faq_cat); ?>" style="margin-bottom:1rem; border-radius:1rem; background:rgba(15,23,42,0.85); border:1px solid rgba(255,255,255,0.1); padding:1.25rem 1.5rem; transition:all 0.25s ease;">
                    <summary style="display:flex; align-items:center; justify-content:space-between; gap:1rem; cursor:pointer; list-style:none;">
                        <span style="display:flex; align-items:center; gap:0.75rem;">
                            <span style="width:28px; height:28px; border-radius:8px; background:rgba(227,6,19,0.15); color:#e30613; font-weight:bold; display:inline-flex; align-items:center; justify-content:center; font-size:0.85rem; flex-shrink:0;"><?php echo ($i + 1); ?></span>
                            <span style="color:#fff; font-size:1rem; font-weight:800;"><?php echo esc_html($faq['q']); ?></span>
                        </span>
                        <span style="display:flex; align-items:center; gap:0.5rem;">
                            <span style="font-size:0.7rem; color:#94a3b8; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:6px;"><?php echo esc_html($faq_cat); ?></span>
                            <span style="color:#e30613; font-size:1.25rem; font-weight:bold;">+</span>
                        </span>
                    </summary>
                    <div class="alfa-faq-content" style="line-height:1.8; color:#cbd5e1; padding-top:1rem; font-size:0.95rem; border-top:1px solid rgba(255,255,255,0.06); margin-top:0.75rem;">
                        <?php echo nl2br(esc_html($faq['a'])); ?>
                    </div>
                </details>
            <?php endforeach; ?>
        </div>

        <div id="alfa-faq-no-results" style="display:none; text-align:center; padding:3rem 1rem; color:#94a3b8; font-size:1rem; background:rgba(15,23,42,0.6); border-radius:1rem; border:1px dashed rgba(255,255,255,0.15); margin-top:1rem;">
            لا توجد أسئلة تطابق بحثك. تواصل معنا وسنجيبك فوراً!
        </div>

        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var searchInput = document.getElementById('alfa-faq-search');
            var catBtns = document.querySelectorAll('.alfa-faq-cat-btn');
            var faqItems = document.querySelectorAll('.alfa-faq-item');
            var noResults = document.getElementById('alfa-faq-no-results');
            var currentCat = 'الكل';

            function filterFaqs() {
                var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
                var visibleCount = 0;

                faqItems.forEach(function(item) {
                    var itemCat = item.getAttribute('data-category') || '';
                    var text = item.textContent.toLowerCase();

                    var matchesCat = (currentCat === 'الكل' || itemCat === currentCat);
                    var matchesQuery = !query || text.indexOf(query) !== -1;

                    if (matchesCat && matchesQuery) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (noResults) {
                    noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
                }
            }

            if (searchInput) {
                searchInput.addEventListener('input', filterFaqs);
            }

            catBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    catBtns.forEach(function(b) {
                        b.style.background = 'rgba(15,23,42,0.8)';
                        b.style.borderColor = 'rgba(255,255,255,0.12)';
                        b.style.color = '#cbd5e1';
                        b.classList.remove('active');
                    });
                    this.style.background = '#e30613';
                    this.style.borderColor = '#e30613';
                    this.style.color = '#fff';
                    this.classList.add('active');
                    currentCat = this.getAttribute('data-category') || 'الكل';
                    filterFaqs();
                });
            });
        });
        </script>

        <!-- Official Guide Attachments Cards -->
        <div style="margin-top:3.5rem; background:#0b1429; border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:2rem;">
            <h3 style="color:#fff; font-size:1.2rem; font-weight:800; margin:0 0 0.5rem; text-align:center;">مرفقات الخدمات والخرائط اللوجستية</h3>
            <p style="color:#94a3b8; font-size:0.85rem; text-align:center; margin:0 0 1.5rem;">روابط سريعة لأدوات الشحن والمواقع المعتمدة في المملكة</p>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
                <a href="<?php echo esc_url(home_url('/tracking')); ?>" style="display:block; padding:1.25rem; background:#070d1d; border:1px solid rgba(255,255,255,0.08); border-radius:1rem; text-decoration:none; text-align:right;">
                    <div style="font-size:1.5rem; margin-bottom:0.5rem;">📦</div>
                    <strong style="color:#fff; font-size:0.95rem; display:block; margin-bottom:0.25rem;">تتبع الشحنات المباشر</strong>
                    <span style="color:#94a3b8; font-size:0.8rem; display:block;">متابعة خط سير الشحنة برقم البوليصة</span>
                </a>
                <a href="<?php echo esc_url(home_url('/quote')); ?>" style="display:block; padding:1.25rem; background:#070d1d; border:1px solid rgba(255,255,255,0.08); border-radius:1rem; text-decoration:none; text-align:right;">
                    <div style="font-size:1.5rem; margin-bottom:0.5rem;">📐</div>
                    <strong style="color:#fff; font-size:0.95rem; display:block; margin-bottom:0.25rem;">حاسبة الحجم CBM</strong>
                    <span style="color:#94a3b8; font-size:0.8rem; display:block;">حساب تكلفة الشحن بالأبعاد بدقة</span>
                </a>
                <a href="<?php echo esc_url(home_url('/branches')); ?>" style="display:block; padding:1.25rem; background:#070d1d; border:1px solid rgba(255,255,255,0.08); border-radius:1rem; text-decoration:none; text-align:right;">
                    <div style="font-size:1.5rem; margin-bottom:0.5rem;">📍</div>
                    <strong style="color:#fff; font-size:0.95rem; display:block; margin-bottom:0.25rem;">فروعنا الـ 8 بالمملكة</strong>
                    <span style="color:#94a3b8; font-size:0.8rem; display:block;">خرائط جوجل لجدة والرياض ومكة</span>
                </a>
            </div>
        </div>

        <!-- Support Card -->
        <div style="margin-top:3.5rem; background:#0b1429; border:1px solid rgba(255,255,255,0.1); border-radius:1.5rem; padding:2rem; text-align:center;">
            <h3 style="color:#fff; font-size:1.25rem; font-weight:800; margin:0 0 0.5rem;">لم تجد إجابة لسؤالك؟</h3>
            <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 1.5rem;">تواصل مباشرة مع مستشاري الشحن والدعم اللوجستي وسنرد عليك فوراً.</p>
            <a href="https://wa.me/<?php echo esc_attr(get_option('alfa_whatsapp', '966501653999')); ?>" target="_blank" class="alfa-btn alfa-btn-whatsapp">
                💬 مراسلة الدعم الفني عبر واتساب
            </a>
        </div>

    </div>
</div>

<?php get_footer(); ?>
