/**
 * Alfa Express Logistics - Standalone Interactive Frontend Engine
 * Handles Mobile Nav, Back to Top, Map City Switching, Branch City Filtering,
 * Quote Calculator with instant WhatsApp dispatch, Live Tracking, & FAQ Search.
 *
 * @package AlfaExpress
 * @version 3.1.0
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // 0. THEME SWITCHER (DARK / LIGHT MODE WITH LOCALSTORAGE PERSISTENCE)
  const THEME_STORAGE_KEY = 'alfa_theme';
  
  function applyTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (isLight) {
      document.documentElement.classList.add('light');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light-theme');
    }

    const iconLight = document.querySelector('.alfa-theme-icon-light');
    const iconDark = document.querySelector('.alfa-theme-icon-dark');
    const mobileThemeLabel = document.getElementById('alfa-mobile-theme-label');

    if (iconLight && iconDark) {
      iconLight.style.display = isLight ? 'inline' : 'none';
      iconDark.style.display = isLight ? 'none' : 'inline';
    }

    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = isLight ? '☀️ الوضع النهاري (Light)' : '🌙 الوضع الليلي (Dark)';
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {}
  }

  let currentTheme = 'dark';
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      currentTheme = savedTheme;
    }
  } catch (e) {}
  applyTheme(currentTheme);

  const themeToggle = document.getElementById('alfa-theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  const mobileThemeToggle = document.getElementById('alfa-mobile-theme-toggle');
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', function() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  // 1. MOBILE DRAWER NAVIGATION & AUTO-CLOSE
  const menuToggle = document.getElementById('alfa-menu-toggle');
  const mobileDrawer = document.getElementById('alfa-mobile-drawer');
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', function() {
      const isVisible = mobileDrawer.style.display === 'block';
      mobileDrawer.style.display = isVisible ? 'none' : 'block';
    });

    mobileDrawer.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileDrawer.style.display = 'none';
      });
    });
  }

  // 2. TOP DYNAMIC SCROLL PROGRESS TRACKER, VERTICAL WAYFINDER & BACK TO TOP
  const scrollProgressBar = document.getElementById('alfa-scroll-progress-bar');
  const backToTopBtn = document.getElementById('alfa-back-to-top');
  const verticalTrackFill = document.getElementById('alfa-vertical-track-fill');
  const wayfinderPercent = document.getElementById('alfa-wayfinder-percent');
  const nodeSa = document.getElementById('alfa-node-sa');
  const nodeTransit = document.getElementById('alfa-node-transit');
  const nodeEg = document.getElementById('alfa-node-eg');

  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const roundedPercent = Math.min(100, Math.max(0, Math.round(scrollPercent)));

    if (scrollProgressBar) {
      scrollProgressBar.style.width = roundedPercent + '%';
    }

    if (verticalTrackFill) {
      verticalTrackFill.style.height = roundedPercent + '%';
    }

    if (wayfinderPercent) {
      wayfinderPercent.textContent = roundedPercent + '%';
    }

    // Highlight wayfinder milestone nodes based on position
    if (nodeSa && nodeTransit && nodeEg) {
      if (roundedPercent < 35) {
        nodeSa.style.background = '#e30613';
        nodeSa.style.boxShadow = '0 0 10px rgba(227,6,19,0.7)';
        nodeTransit.style.background = 'rgba(15,23,42,0.8)';
        nodeTransit.style.boxShadow = 'none';
        nodeEg.style.background = 'rgba(15,23,42,0.8)';
        nodeEg.style.boxShadow = 'none';
      } else if (roundedPercent < 75) {
        nodeSa.style.background = 'rgba(15,23,42,0.8)';
        nodeSa.style.boxShadow = 'none';
        nodeTransit.style.background = '#f59e0b';
        nodeTransit.style.boxShadow = '0 0 10px rgba(245,158,11,0.7)';
        nodeEg.style.background = 'rgba(15,23,42,0.8)';
        nodeEg.style.boxShadow = 'none';
      } else {
        nodeSa.style.background = 'rgba(15,23,42,0.8)';
        nodeSa.style.boxShadow = 'none';
        nodeTransit.style.background = 'rgba(15,23,42,0.8)';
        nodeTransit.style.boxShadow = 'none';
        nodeEg.style.background = '#10b981';
        nodeEg.style.boxShadow = '0 0 10px rgba(16,185,129,0.7)';
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll('.alfa-card, .alfa-faq-item, .alfa-reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.classList.add('alfa-reveal');
      revealObserver.observe(el);
    });
  }

  // 4. INTERACTIVE SAUDI-EGYPT ROUTE MAP CITY SWITCHER & SVG HIGHLIGHTS
  const cityData = {
    jeddah: {
      tag: 'المقر اللوجستي ومحطة التحميل البري الكبرى',
      title: 'جدة (المقر الرئيسي)',
      desc: 'المركز اللوجستي الأكبر والشريان البري الذي تنطلق منه يومياً قوافل الشاحنات والتريلات المجهزة عبر المعابر البرية إلى كافة محافظات مصر.',
      branches: '📍 5 فروع بجدة (الفيصلية، السلامة، البوادي، الشرفية، الربوة)',
      transitAir: 'شاحنات مبطنة وتريلات مجهزة',
      transitSea: '10 - 15 يوماً (لباب بيتك)',
      phone: '0501653999',
      color: '#e30613',
      shadow: '0 0 50px -10px rgba(227,6,19,0.35)',
      border: 'rgba(227,6,19,0.35)'
    },
    riyadh: {
      tag: 'محطة الشحن البري والفرز للمنطقة الوسطى',
      title: 'الرياض (المنطقة الوسطى)',
      desc: 'محطة الشحن والفرز الرئيسية للمنطقة الوسطى، توفر نقل بري مباشر للشاحنات عبر شبكة الطرق السريعة ومنافذ العبور لمصر.',
      branches: '📍 فرعان بالرياض (فرع حي العزيزية، فرع حي الملز)',
      transitAir: 'شاحنات برية مغلقة ومجهزة',
      transitSea: '10 - 15 يوماً (من الباب للباب)',
      phone: '0539595799',
      color: '#38bdf8',
      shadow: '0 0 50px -10px rgba(56,189,248,0.35)',
      border: 'rgba(56,189,248,0.35)'
    },
    makkah: {
      tag: 'خدمة العاصمة المقدسة ونقل الأثاث',
      title: 'مكة المكرمة (العاصمة المقدسة)',
      desc: 'فرع مخصص لخدمة أهالي ومعتمري مكة المكرمة مع خدمة استلام فوري من المنازل والفنادق وتحميل بري مباشر لمصر.',
      branches: '📍 فرع الشوقية / الرصيفة - مكة المكرمة',
      transitAir: 'نقل بري مجهز مع تغليف هندسي',
      transitSea: '10 - 15 يوماً (من الباب للباب)',
      phone: '0567133390',
      color: '#f59e0b',
      shadow: '0 0 50px -10px rgba(245,158,11,0.35)',
      border: 'rgba(245,158,11,0.35)'
    },
    cairo: {
      tag: 'محور التوزيع البري والتسليم لكافة المحافظات',
      title: 'القاهرة الكبرى والجيزة',
      desc: 'بوابة الوصول الكبرى ومحور التوزيع البري لكافة المحافظات، مع إنهاء إجراءات التخليص الجمركي والتسليم لباب البيت.',
      branches: '📍 مراكز توزيع مركزية وتوصيل منزلي شامل لكافة أحياء القاهرة والجيزة',
      transitAir: 'توزيع بري وسيارات تسليم من الباب للباب',
      transitSea: 'تسليم فوري بعد الإفراج الجمركي',
      phone: 'متابعة عبر خدمة العملاء الموحدة',
      color: '#10b981',
      shadow: '0 0 50px -10px rgba(16,185,129,0.35)',
      border: 'rgba(16,185,129,0.35)'
    },
    alexandria: {
      tag: 'محطة التوزيع للساحل والدلتا',
      title: 'الإسكندرية والوجه البحري',
      desc: 'محطة الوصول والتوزيع للشحنات البرية المتجهة إلى الإسكندرية والبحيرة ومطروح ومحافظات الدلتا مع خدمة التوصيل المنزلي والتركيب.',
      branches: '📍 تغطية شاملة لعروس البحر المتوسط والمدن الساحلية ومحافظات الدلتا',
      transitAir: 'سيارات نقل وتوزيع محلي مجهزة لباب المنزل',
      transitSea: 'تسليم لباب البيت مع فنيين متخصصين',
      phone: 'متابعة عبر خدمة العملاء الموحدة',
      color: '#06b6d4',
      shadow: '0 0 50px -10px rgba(6,182,212,0.35)',
      border: 'rgba(6,182,212,0.35)'
    }
  };

  const mapButtons = document.querySelectorAll('.alfa-map-btn');
  const svgCityNodes = document.querySelectorAll('.alfa-svg-city-node');
  const mapTag = document.getElementById('alfa-map-city-tag');
  const mapTitle = document.getElementById('alfa-map-city-title');
  const mapDesc = document.getElementById('alfa-map-city-desc');
  const mapBranches = document.getElementById('alfa-map-city-branches');
  const mapTransitAir = document.getElementById('alfa-map-transit-air');
  const mapTransitSea = document.getElementById('alfa-map-transit-sea');
  const mapPhone = document.getElementById('alfa-map-phone');
  const mapBox = document.getElementById('alfa-map-container-box');
  const hudDot = document.getElementById('alfa-map-hud-dot');
  const hudCityName = document.getElementById('alfa-map-hud-city-name');

  function selectMapCity(cityKey) {
    if (!cityData[cityKey]) return;
    const info = cityData[cityKey];

    // Update Buttons
    mapButtons.forEach(b => {
      if (b.getAttribute('data-city') === cityKey) {
        b.style.background = info.color;
        b.style.color = '#fff';
        b.style.border = 'none';
      } else {
        b.style.background = '#0f1d3a';
        b.style.color = '#cbd5e1';
        b.style.border = '1px solid rgba(255,255,255,0.1)';
      }
    });

    // Update Telemetry Info
    if (mapTag) mapTag.textContent = info.tag;
    if (mapTitle) mapTitle.textContent = info.title;
    if (mapDesc) mapDesc.textContent = info.desc;
    if (mapBranches) mapBranches.textContent = info.branches;
    if (mapTransitAir) mapTransitAir.textContent = info.transitAir;
    if (mapTransitSea) mapTransitSea.textContent = info.transitSea;
    if (mapPhone) mapPhone.textContent = info.phone;

    // Update Container & HUD Lighting
    if (mapBox) {
      mapBox.style.boxShadow = info.shadow;
      mapBox.style.borderColor = info.border;
    }
    if (hudDot) {
      hudDot.style.background = info.color;
      hudDot.style.boxShadow = `0 0 10px ${info.color}`;
    }
    if (hudCityName) {
      hudCityName.textContent = info.title;
      hudCityName.style.color = info.color;
    }

    // Dynamic Route Corridors Lighting
    const routeSea = document.getElementById('alfa-route-sea');
    const routeAir = document.getElementById('alfa-route-air');
    const routeRoad = document.getElementById('alfa-route-road');
    const routeRiyadhCairo = document.getElementById('alfa-route-riyadh-cairo');

    if (routeSea) {
      routeSea.style.strokeOpacity = (cityKey === 'jeddah' || cityKey === 'alexandria') ? '1' : '0.25';
    }
    if (routeAir) {
      routeAir.style.strokeOpacity = (cityKey === 'cairo' || cityKey === 'jeddah') ? '1' : '0.25';
    }
    if (routeRoad) {
      routeRoad.style.strokeOpacity = (cityKey === 'riyadh' || cityKey === 'makkah' || cityKey === 'jeddah') ? '1' : '0.25';
    }
    if (routeRiyadhCairo) {
      routeRiyadhCairo.style.strokeOpacity = (cityKey === 'riyadh') ? '1' : '0.15';
    }
  }

  mapButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const cityKey = this.getAttribute('data-city');
      selectMapCity(cityKey);
    });
  });

  svgCityNodes.forEach(node => {
    node.addEventListener('click', function() {
      const cityKey = this.getAttribute('data-city');
      selectMapCity(cityKey);
    });
  });

  // 4. BRANCHES CITY FILTER TABS
  const filterBtns = document.querySelectorAll('.alfa-branch-filter-btn');
  const branchCards = document.querySelectorAll('.alfa-branch-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.style.background = '#0f1d3a';
        b.style.color = '#cbd5e1';
        b.style.border = '1px solid rgba(255,255,255,0.1)';
      });

      this.style.background = '#e30613';
      this.style.color = '#fff';
      this.style.border = 'none';

      branchCards.forEach(card => {
        const city = card.getAttribute('data-city') || '';
        if (filter === 'all' || city.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. QUOTE CALCULATOR & WHATSAPP DISPATCH (Volumetric CBM Engine)
  const quoteForm = document.getElementById('alfa-quote-form');
  if (quoteForm) {
    const calcResultBox = document.getElementById('alfa-calc-result');
    const estPriceEl = document.getElementById('alfa-estimated-price');
    const estDurationEl = document.getElementById('alfa-estimated-duration');
    const whatsappBtn = document.getElementById('alfa-send-whatsapp-btn');
    const lengthInput = document.getElementById('alfa-dim-length');
    const widthInput = document.getElementById('alfa-dim-width');
    const heightInput = document.getElementById('alfa-dim-height');
    const qtyInput = document.getElementById('alfa-dim-qty');
    const liveCbmBadge = document.getElementById('alfa-cbm-live-badge');

    function calculateLiveCbm() {
      const l = parseFloat(lengthInput ? lengthInput.value : 100) || 100;
      const w = parseFloat(widthInput ? widthInput.value : 80) || 80;
      const h = parseFloat(heightInput ? heightInput.value : 60) || 60;
      const qty = parseFloat(qtyInput ? qtyInput.value : 1) || 1;
      const cbm = Math.round(((l * w * h) / 1000000) * qty * 100) / 100;
      if (liveCbmBadge) {
        liveCbmBadge.textContent = cbm + ' م³ (CBM)';
      }
      return { cbm: Math.max(0.1, cbm), l, w, h, qty };
    }

    [lengthInput, widthInput, heightInput, qtyInput].forEach(inp => {
      if (inp) inp.addEventListener('input', calculateLiveCbm);
    });
    calculateLiveCbm();

    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const origin = document.getElementById('alfa-origin')?.value || 'جدة';
      const destination = document.getElementById('alfa-destination')?.value || 'القاهرة والجيزة';
      const serviceType = document.getElementById('alfa-service-type')?.value || 'عفش وأثاث منزلي';
      const senderName = document.getElementById('alfa-sender-name')?.value || 'عميل ألفا إكسبريس';
      const senderPhone = document.getElementById('alfa-sender-phone')?.value || '';
      
      const vol = calculateLiveCbm();
      const cbm = vol.cbm;

      let ratePerCbm = 300;
      let minFee = 250;
      let estDays = '10 - 15 يوم عمل';

      // Land Freight Volume Pricing by CBM
      if (serviceType.includes('أثاث') || serviceType.includes('عفش')) {
        ratePerCbm = 280;
        minFee = 400;
        estDays = '10 - 16 يوم عمل (شامل فك وتغليف النجارين)';
      } else if (serviceType.includes('أجهزة') || serviceType.includes('شاشات')) {
        ratePerCbm = 350;
        minFee = 350;
        estDays = '8 - 14 يوم عمل (شامل الصندوق الخشبي)';
      } else if (serviceType.includes('بضائع') || serviceType.includes('تجارية')) {
        ratePerCbm = 260;
        minFee = 500;
        estDays = '7 - 12 يوم عمل (شاحنة مخصصة)';
      } else {
        ratePerCbm = 300;
        minFee = 200;
        estDays = '8 - 12 يوم عمل';
      }

      const totalEstimated = Math.max(minFee, Math.round(cbm * ratePerCbm));

      if (estPriceEl) estPriceEl.textContent = totalEstimated + ' ريال سعودي تقريباً (' + cbm + ' م³)';
      if (estDurationEl) estDurationEl.textContent = estDays;
      if (calcResultBox) {
        calcResultBox.style.display = 'block';
        try {
          calcResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (err) {}
      }

      const waNumber = (window.alfaThemeConfig && window.alfaThemeConfig.whatsapp) ? window.alfaThemeConfig.whatsapp : '966501653999';
      const msg = `السلام عليكم ورحمة الله وبركاته\nأود تأكيد طلب تسعيرة شحن بري بالحجم (CBM) - ألفا إكسبريس:\n\n` +
        `👤 الاسم: ${senderName}\n` +
        `📞 الجوال: ${senderPhone}\n` +
        `📦 نوع الشحنة: ${serviceType}\n` +
        `📍 من: ${origin} (السعودية)\n` +
        `🏁 إلى: ${destination} (مصر)\n` +
        `📐 الأبعاد: ${vol.l} × ${vol.w} × ${vol.h} سم (عدد: ${vol.qty})\n` +
        `📊 الحجم الإجمالي: ${cbm} متر مكعب (CBM)\n` +
        `💰 التكلفة المقدرة: ~${totalEstimated} ريال سعودي\n\n` +
        `يرجى تأكيد الحجز وتحديد موعد المعاينة والاستلام من الباب.`;

      if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
      }
    });

    // Auto-select service from URL query param if present
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const srvParam = urlParams.get('service');
      if (srvParam) {
        const srvSelect = document.getElementById('alfa-service-type');
        if (srvSelect) {
          for (let i = 0; i < srvSelect.options.length; i++) {
            if (srvSelect.options[i].value.includes(srvParam) || srvParam.includes(srvSelect.options[i].value)) {
              srvSelect.selectedIndex = i;
              break;
            }
          }
        }
      }
    } catch (err) {}
  }

  // 6. LIVE TRACKING FORM
  const trackForm = document.getElementById('alfa-tracking-form');
  if (trackForm) {
    const trackResult = document.getElementById('alfa-tracking-result');
    const trackCodeInput = document.getElementById('alfa-tracking-code');

    trackForm.addEventListener('submit', function(e) {
      const code = (trackCodeInput ? trackCodeInput.value.trim() : '');
      const trackingUrl = (window.alfaThemeConfig && window.alfaThemeConfig.trackingUrl) ? window.alfaThemeConfig.trackingUrl : 'https://alfaexpress-ksa.com/track';

      // If user submitted without ajax prevention or with it, open official portal in new tab
      if (code) {
        window.open(trackingUrl + '?code=' + encodeURIComponent(code), '_blank');
      } else {
        window.open(trackingUrl, '_blank');
      }

      if (trackResult) {
        trackResult.innerHTML = `
          <div style="background:#0b1429; border:1px solid rgba(227,6,19,0.3); border-radius:1.25rem; padding:1.5rem; margin-top:1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:1rem;">
              <div>
                <span style="font-size:0.75rem; color:#94a3b8; display:block;">رقم البوليصة المستعلم عنها:</span>
                <span style="font-size:1.1rem; font-weight:800; color:#fff;" dir="ltr">${code || 'ALF-ONLINE'}</span>
              </div>
              <span class="alfa-badge alfa-badge-red">تم فتح البوابة الرسمية</span>
            </div>
            <div style="background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.25); border-radius:12px; padding:1rem; margin-bottom:1rem; text-align:right;">
              <p style="color:#38bdf8; font-size:0.85rem; font-weight:bold; margin:0 0 4px;">💬 إشعار التحديثات:</p>
              <p style="color:#cbd5e1; font-size:0.8rem; margin:0;">سنقوم بإرسال رسائل نصية وإشعارات واتساب فورية بكل تحديث يطرأ على شحنتك حتى التسليم.</p>
            </div>
            <div class="alfa-timeline">
              <div class="alfa-timeline-item">
                <div class="alfa-timeline-dot"></div>
                <h5 style="color:#fff; margin:0 0 4px; font-size:0.95rem;">تم استلام الشحنة بمستودع جدة المركزي</h5>
                <p style="color:#94a3b8; margin:0; font-size:0.8rem;">تم الفحص والتغليف الأمني وإصدار البوليصة</p>
              </div>
              <div class="alfa-timeline-item">
                <div class="alfa-timeline-dot"></div>
                <h5 style="color:#fff; margin:0 0 4px; font-size:0.95rem;">إنهاء إجراءات التخليص الجمركي المسبق</h5>
                <p style="color:#94a3b8; margin:0; font-size:0.8rem;">عبر جسر الشحن الدولي</p>
              </div>
              <div class="alfa-timeline-item">
                <div class="alfa-timeline-dot" style="background:#38bdf8;"></div>
                <h5 style="color:#38bdf8; margin:0 0 4px; font-size:0.95rem;">جاري التوزيع والتسليم لباب المستلم</h5>
                <p style="color:#94a3b8; margin:0; font-size:0.8rem;">مندوب ألفا إكسبريس يتواصل معك فوراً</p>
              </div>
            </div>
            <div style="margin-top:1.25rem; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
              <a href="${trackingUrl}" target="_blank" class="alfa-btn alfa-btn-primary" style="font-size:0.8rem; padding:0.6rem 1.2rem;">
                رابط التتبع: ${trackingUrl} ↗
              </a>
              <a href="https://wa.me/${(window.alfaThemeConfig && window.alfaThemeConfig.whatsapp) ? window.alfaThemeConfig.whatsapp : '966501653999'}?text=${encodeURIComponent('استفسار عن الشحنة رقم ' + code)}" target="_blank" class="alfa-btn alfa-btn-whatsapp" style="font-size:0.8rem; padding:0.6rem 1.2rem;">
                واتساب خدمة العملاء
              </a>
            </div>
          </div>
        `;
        trackResult.style.display = 'block';
      }
    });
  }

  // 8. 8-STEP INTERACTIVE WORKFLOW PROCESS SWITCHER
  const processTabs = document.querySelectorAll('.alfa-process-tab-btn');
  const stepBadge = document.getElementById('alfa-process-step-badge');
  const stepTitle = document.getElementById('alfa-process-step-title');
  const stepDesc = document.getElementById('alfa-process-step-desc');
  const iconBox = document.getElementById('alfa-process-icon-box');
  const nextStepBtn = document.getElementById('alfa-process-next-btn');

  const processStepsData = [
    {
      step: 1,
      title: 'طلب الخدمة والتواصل',
      desc: 'اتصل بنا أو تواصل عبر واتساب أو زُر أحد فروعنا الـ 8 في جدة ومكة والرياض لحجز موعد استلام شحنتك البرية وتحديد نوع الأثاث أو البضائع.',
      icon: '📞'
    },
    {
      step: 2,
      title: 'المعاينة والاستلام من الباب',
      desc: 'فريقنا وفنيو المعاينة يصلون لباب بيتك لتقدير الحجم بالمتر المكعب (CBM) وفحص الطرود واستلام الشحنة بأعلى معايير الدقة.',
      icon: '⚖️'
    },
    {
      step: 3,
      title: 'التغليف الهندسي للشحن البري',
      desc: 'فك العفش وتغليف ثلاثي متين (كرتون 5 طبقات، فوم، بابلز هوائي، وصناديق خشبية مبطنة للشاشات) لتحمل مسار الطريق البري.',
      icon: '📦'
    },
    {
      step: 4,
      title: 'التحميل والرص المتوازن بالشاحنة',
      desc: 'تحميل الشحنات داخل شاحنات مبطنة وتريلات مجهزة بنظام رص محكم يمنع الاحتكاك والانزلاق أثناء الرحلة الدولية.',
      icon: '🚛'
    },
    {
      step: 5,
      title: 'إصدار بوليصة الشحن ورقم التتبع',
      desc: 'توثيق بيانات الشحنة والمرسل والمستلم رسمياً وتزويدك برقم بوليصة لتتبع حركة الشاحنة البرية أولاً بأول.',
      icon: '📋'
    },
    {
      step: 6,
      title: 'انطلاق الرحلة البرية والعبور',
      desc: 'انطلاق الشاحنة عبر المسار البري الدولي باتجاه منفذ العبور (ميناء ضبا وسفاجا) مع تتبع GPS ومراقبة مستمرة.',
      icon: '🚚'
    },
    {
      step: 7,
      title: 'التخليص الجمركي السريع بالمنفذ',
      desc: 'إنهاء كافة المعاملات والإفراج الجمركي بالمنفذ البري بواسطة مخلصينا المعتمدين لضمان سرعة العبور وبدون رسوم مفاجئة.',
      icon: '🛡️'
    },
    {
      step: 8,
      title: 'التسليم لباب البيت في مصر',
      desc: 'توصيل العفش والطرود والأجهزة حتى باب منزلك في القاهرة، الإسكندرية، الدلتا، والصعيد مع خدمة التركيب وإعادة التجميع.',
      icon: '🏡'
    }
  ];

  let currentProcessStep = 1;

  function updateProcessStep(stepNum) {
    currentProcessStep = stepNum;
    const stepData = processStepsData.find(s => s.step === stepNum) || processStepsData[0];

    // Update Tab Buttons UI
    processTabs.forEach(tab => {
      const tStep = parseInt(tab.getAttribute('data-step'), 10);
      const numBadge = tab.querySelector('div');

      if (tStep === stepNum) {
        tab.style.background = '#e30613';
        tab.style.borderColor = '#ef4444';
        tab.style.color = '#fff';
        tab.style.transform = 'scale(1.05)';
        tab.style.boxShadow = '0 10px 20px rgba(227,6,19,0.35)';
        if (numBadge) {
          numBadge.style.background = '#fff';
          numBadge.style.color = '#e30613';
          numBadge.textContent = tStep;
        }
      } else if (tStep < stepNum) {
        tab.style.background = 'rgba(15,23,42,0.9)';
        tab.style.borderColor = 'rgba(52,211,153,0.4)';
        tab.style.color = '#34d399';
        tab.style.transform = 'scale(1)';
        tab.style.boxShadow = 'none';
        if (numBadge) {
          numBadge.style.background = 'rgba(52,211,153,0.2)';
          numBadge.style.color = '#34d399';
          numBadge.textContent = '✔';
        }
      } else {
        tab.style.background = 'rgba(15,23,42,0.8)';
        tab.style.borderColor = 'rgba(255,255,255,0.1)';
        tab.style.color = '#94a3b8';
        tab.style.transform = 'scale(1)';
        tab.style.boxShadow = 'none';
        if (numBadge) {
          numBadge.style.background = 'rgba(255,255,255,0.06)';
          numBadge.style.color = '#cbd5e1';
          numBadge.textContent = tStep;
        }
      }
    });

    // Update Active Card Details
    if (stepBadge) stepBadge.textContent = `المرحلة ${stepData.step} من 8`;
    if (stepTitle) stepTitle.textContent = stepData.title;
    if (stepDesc) stepDesc.textContent = stepData.desc;
    if (iconBox) {
      iconBox.textContent = stepData.icon;
      iconBox.style.transform = 'scale(1.15) rotate(5deg)';
      setTimeout(() => {
        iconBox.style.transform = 'scale(1) rotate(0deg)';
      }, 250);
    }

    if (nextStepBtn) {
      if (stepNum >= 8) {
        nextStepBtn.style.display = 'none';
      } else {
        nextStepBtn.style.display = 'inline-block';
      }
    }
  }

  processTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const step = parseInt(this.getAttribute('data-step'), 10);
      updateProcessStep(step);
    });
  });

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', function() {
      if (currentProcessStep < 8) {
        updateProcessStep(currentProcessStep + 1);
      }
    });
  }
});
