/**
 * Alfa Express Logistics - Interactive 3D Hero Scene Engine (Three.js)
 * Full 3D Van, Highway, Collectibles, Particle Bursts, Depth Parallax & Game HUD
 */

(function() {
  var retryCount = 0;
  function ensureThreeAndInit() {
    var container = document.getElementById('alfa-3d-hero-container');
    if (!container) return;

    if (typeof THREE === 'undefined') {
      if (retryCount < 10) {
        retryCount++;
        // Check if script is already added
        if (!document.getElementById('alfa-three-cdn')) {
          var script = document.createElement('script');
          script.id = 'alfa-three-cdn';
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
          script.onload = function() {
            setTimeout(initAlfa3DHero, 50);
          };
          script.onerror = function() {
            var fallback = document.getElementById('alfa-3d-fallback');
            var loading = document.getElementById('alfa-3d-loading');
            if (fallback) fallback.style.display = 'flex';
            if (loading) loading.style.display = 'none';
          };
          document.head.appendChild(script);
        } else {
          setTimeout(ensureThreeAndInit, 200);
        }
        return;
      } else {
        var fallback = document.getElementById('alfa-3d-fallback');
        var loading = document.getElementById('alfa-3d-loading');
        if (fallback) fallback.style.display = 'flex';
        if (loading) loading.style.display = 'none';
        return;
      }
    }

    initAlfa3DHero();
  }

  function initAlfa3DHero() {
    var container = document.getElementById('alfa-3d-hero-container');
    if (!container) return;

    // Check WebGL availability
    function checkWebGL() {
      try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }

    if (!checkWebGL() || typeof THREE === 'undefined') {
      var fallback = document.getElementById('alfa-3d-fallback');
      if (fallback) fallback.style.display = 'flex';
      var loading = document.getElementById('alfa-3d-loading');
      if (loading) loading.style.display = 'none';
      return;
    }

    // GAME STATE & STATS
    var score = 0;
    var speed = 85;
    var combo = 1;
    var currentCityIndex = 0;
    var progressPercent = 15;
    var isBoosting = false;

    var gameStats = {
      laneX: 0,
      targetLaneX: 0,
      speedMultiplier: 1.0,
      scrollSpeedBoost: 0,
      totalDistance: 0,
      score: 0,
      combo: 1,
      mouseParallaxX: 0,
      mouseParallaxY: 0,
      currentParallaxX: 0,
      currentParallaxY: 0
    };

    var cities = [
      { name: 'الرياض', km: 0, country: '🇸🇦' },
      { name: 'مكة المكرمة', km: 850, country: '🇸🇦' },
      { name: 'جدة (التحميل)', km: 950, country: '🇸🇦' },
      { name: 'تبوك وضبا (المنفذ)', km: 1450, country: '🇸🇦' },
      { name: 'القاهرة والجيزة', km: 1850, country: '🇪🇬' },
      { name: 'الإسكندرية والمحافظات', km: 2050, country: '🇪🇬' }
    ];

    // HUD Elements
    var scoreEl = document.getElementById('alfa-hud-score');
    var speedEl = document.getElementById('alfa-hud-speed');
    var comboEl = document.getElementById('alfa-hud-combo');
    var turboEl = document.getElementById('alfa-hud-turbo');
    var progressTrackEl = document.getElementById('alfa-hud-progress-track');
    var progressTextEl = document.getElementById('alfa-hud-progress-text');
    var activeCityEl = document.getElementById('alfa-hud-active-city');
    var toastEl = document.getElementById('alfa-hud-toast');
    var resetBtn = document.getElementById('alfa-hud-reset');
    var steerLeftBtn = document.getElementById('alfa-steer-left');
    var steerRightBtn = document.getElementById('alfa-steer-right');

    function showToast(text) {
      if (!toastEl) return;
      toastEl.textContent = text;
      toastEl.style.display = 'block';
      setTimeout(function() {
        toastEl.style.display = 'none';
      }, 1800);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        gameStats.totalDistance = 0;
        gameStats.score = 0;
        gameStats.combo = 1;
        gameStats.targetLaneX = 0;
        score = 0;
        combo = 1;
        if (scoreEl) scoreEl.textContent = '0';
        if (comboEl) comboEl.style.display = 'none';
        if (progressTrackEl) progressTrackEl.style.width = '0%';
        if (progressTextEl) progressTextEl.textContent = '0% نحو مصر';
        if (activeCityEl) activeCityEl.textContent = cities[0].country + ' ' + cities[0].name;
        showToast('بدأت رحلة الشحن من جديد!');
      });
    }

    if (steerLeftBtn) {
      steerLeftBtn.addEventListener('click', function() {
        gameStats.targetLaneX = Math.max(-1.5, gameStats.targetLaneX - 1.2);
      });
    }

    if (steerRightBtn) {
      steerRightBtn.addEventListener('click', function() {
        gameStats.targetLaneX = Math.min(1.5, gameStats.targetLaneX + 1.2);
      });
    }

    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050a18, 0.04);

    var width = container.clientWidth || 600;
    var height = container.clientHeight || 520;

    var camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 120);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0.8, -4);

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';

    var mountTarget = document.getElementById('alfa-3d-canvas-mount') || container;
    mountTarget.appendChild(renderer.domElement);

    // LIGHTING
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    var mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(4, 10, 6);
    mainLight.castShadow = true;
    scene.add(mainLight);

    var redAccentLight = new THREE.PointLight(0xe30613, 3.0, 16);
    redAccentLight.position.set(0, 2, -1);
    scene.add(redAccentLight);

    var highwaySkyLight = new THREE.PointLight(0x38bdf8, 2.2, 20);
    highwaySkyLight.position.set(0, 4, -15);
    scene.add(highwaySkyLight);

    // ENDLESS HIGHWAY SYSTEM
    var ROAD_WIDTH = 5.2;
    var ROAD_LENGTH = 70;
    var roadGroup = new THREE.Group();

    var roadGeo = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH, 1, 30);
    roadGeo.rotateX(-Math.PI / 2);
    var roadMat = new THREE.MeshStandardMaterial({
      color: 0x091326,
      roughness: 0.7,
      metalness: 0.2
    });
    var roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.position.set(0, -0.01, -20);
    roadMesh.receiveShadow = true;
    roadGroup.add(roadMesh);

    // Glowing Neon Rails
    var railGeo = new THREE.BoxGeometry(0.12, 0.35, ROAD_LENGTH);
    var leftRailMat = new THREE.MeshBasicMaterial({ color: 0xe30613 });
    var rightRailMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    var leftRail = new THREE.Mesh(railGeo, leftRailMat);
    leftRail.position.set(-ROAD_WIDTH / 2, 0.15, -20);
    roadGroup.add(leftRail);

    var rightRail = new THREE.Mesh(railGeo, rightRailMat);
    rightRail.position.set(ROAD_WIDTH / 2, 0.15, -20);
    roadGroup.add(rightRail);

    // Lane Dividers
    var stripeCount = 20;
    var stripeGeo = new THREE.PlaneGeometry(0.15, 1.8);
    stripeGeo.rotateX(-Math.PI / 2);
    var stripeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });

    var stripes = [];
    for (var i = 0; i < stripeCount; i++) {
      var stripeL = new THREE.Mesh(stripeGeo, stripeMat);
      stripeL.position.set(-ROAD_WIDTH / 6, 0.01, -i * 3.5);
      roadGroup.add(stripeL);
      stripes.push(stripeL);

      var stripeR = new THREE.Mesh(stripeGeo, stripeMat);
      stripeR.position.set(ROAD_WIDTH / 6, 0.01, -i * 3.5);
      roadGroup.add(stripeR);
      stripes.push(stripeR);
    }

    scene.add(roadGroup);

    // SPEED TUNNEL ARCHES
    var archCount = 6;
    var arches = [];
    for (var a = 0; a < archCount; a++) {
      var archGroup = new THREE.Group();
      archGroup.position.set(0, 0, -a * 12 - 10);

      var torusGeo = new THREE.TorusGeometry(3.6, 0.05, 8, 32, Math.PI);
      var torusMat = new THREE.MeshBasicMaterial({
        color: a % 2 === 0 ? 0xe30613 : 0x38bdf8,
        transparent: true,
        opacity: 0.65
      });
      var archMesh = new THREE.Mesh(torusGeo, torusMat);
      archGroup.add(archMesh);
      scene.add(archGroup);
      arches.push(archGroup);
    }

    // THE LOGISTICS VAN
    var vanGroup = new THREE.Group();
    vanGroup.position.set(0, 0, 1.5);

    // Chassis
    var chassisGeo = new THREE.BoxGeometry(1.4, 0.22, 2.8);
    var chassisMat = new THREE.MeshStandardMaterial({
      color: 0x081020,
      roughness: 0.5,
      metalness: 0.8
    });
    var chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.3;
    chassis.castShadow = true;
    vanGroup.add(chassis);

    // Cargo Body (Pure White)
    var cargoGeo = new THREE.BoxGeometry(1.35, 1.1, 1.8);
    var cargoMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.2
    });
    var cargo = new THREE.Mesh(cargoGeo, cargoMat);
    cargo.position.set(0, 0.95, 0.2);
    cargo.castShadow = true;
    vanGroup.add(cargo);

    // Cabin
    var cabinGeo = new THREE.BoxGeometry(1.3, 0.85, 0.95);
    var cabinMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.25
    });
    var cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.8, -1.0);
    cabin.castShadow = true;
    vanGroup.add(cabin);

    // Windshield
    var windshieldGeo = new THREE.BoxGeometry(1.2, 0.48, 0.05);
    var glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9
    });
    var windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 0.95, -1.48);
    windshield.rotation.x = 0.24;
    vanGroup.add(windshield);

    // Alfa Red Livery Stripe
    var vanStripeGeo = new THREE.BoxGeometry(1.38, 0.22, 1.82);
    var vanStripeMat = new THREE.MeshStandardMaterial({
      color: 0xe30613,
      roughness: 0.3,
      metalness: 0.4,
      emissive: 0x99000a,
      emissiveIntensity: 0.5
    });
    var stripe = new THREE.Mesh(vanStripeGeo, vanStripeMat);
    stripe.position.set(0, 0.86, 0.2);
    vanGroup.add(stripe);

    // Taillights
    var tailLightGeo = new THREE.BoxGeometry(0.24, 0.12, 0.05);
    var tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff1e28 });
    var tailL = new THREE.Mesh(tailLightGeo, tailLightMat);
    tailL.position.set(0.5, 0.6, 1.12);
    vanGroup.add(tailL);

    var tailR = tailL.clone();
    tailR.position.set(-0.5, 0.6, 1.12);
    vanGroup.add(tailR);

    // 4 Wheels
    var wheelGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.2, 18);
    wheelGeo.rotateZ(Math.PI / 2);
    var tireMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    var rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8 });

    var wheelMeshes = [];
    var wheelPositions = [
      [-0.68, 0.26, -0.9],
      [0.68, 0.26, -0.9],
      [-0.68, 0.26, 0.7],
      [0.68, 0.26, 0.7]
    ];

    wheelPositions.forEach(function(pos) {
      var wheel = new THREE.Mesh(wheelGeo, tireMat);
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;

      var rimGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.21, 12);
      rimGeo.rotateZ(Math.PI / 2);
      var rim = new THREE.Mesh(rimGeo, rimMat);
      wheel.add(rim);

      vanGroup.add(wheel);
      wheelMeshes.push(wheel);
    });

    scene.add(vanGroup);

    // COLLECTIBLES IN LANES
    var LANES = [-1.4, 0, 1.4];
    var collectibles = [];
    var collectibleGroup = new THREE.Group();
    scene.add(collectibleGroup);

    function createParcel(laneIndex, zPos, type) {
      var group = new THREE.Group();
      var laneX = LANES[laneIndex];
      group.position.set(laneX, 0.65, zPos);

      if (type === 'package') {
        var boxGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
        var boxMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.3,
          metalness: 0.2,
          emissive: 0xd97706,
          emissiveIntensity: 0.4
        });
        var box = new THREE.Mesh(boxGeo, boxMat);
        box.castShadow = true;
        group.add(box);

        var ribGeo = new THREE.BoxGeometry(0.5, 0.12, 0.5);
        var ribMat = new THREE.MeshBasicMaterial({ color: 0xe30613 });
        var rib = new THREE.Mesh(ribGeo, ribMat);
        group.add(rib);
      } else if (type === 'golden') {
        var crateGeo = new THREE.DodecahedronGeometry(0.35);
        var crateMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          roughness: 0.1,
          metalness: 0.9,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.8
        });
        var crate = new THREE.Mesh(crateGeo, crateMat);
        group.add(crate);
      } else {
        var turboGeo = new THREE.OctahedronGeometry(0.35);
        var turboMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        var turboMesh = new THREE.Mesh(turboGeo, turboMat);
        group.add(turboMesh);
      }

      var ringGeo = new THREE.RingGeometry(0.25, 0.35, 16);
      ringGeo.rotateX(-Math.PI / 2);
      var ringMat = new THREE.MeshBasicMaterial({
        color: type === 'golden' ? 0xf59e0b : type === 'turbo' ? 0x38bdf8 : 0xe30613,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      var ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = -0.55;
      group.add(ring);

      collectibleGroup.add(group);

      return {
        mesh: group,
        active: true,
        type: type,
        points: type === 'golden' ? 50 : type === 'turbo' ? 30 : 15,
        lane: laneIndex,
        z: zPos
      };
    }

    for (var c = 0; c < 9; c++) {
      var laneIdx = Math.floor(Math.random() * 3);
      var typeChoice = c % 4 === 0 ? 'golden' : c % 3 === 0 ? 'turbo' : 'package';
      collectibles.push(createParcel(laneIdx, -10 - c * 6.5, typeChoice));
    }

    // PARTICLE BURSTS
    var particleBursts = [];
    function triggerCollectionBurst(x, y, z, colorHex) {
      var count = 18;
      var positions = new Float32Array(count * 3);
      var velocities = [];

      for (var p = 0; p < count; p++) {
        positions[p * 3] = x;
        positions[p * 3 + 1] = y;
        positions[p * 3 + 2] = z;

        velocities.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.12,
            Math.random() * 0.14 + 0.04,
            (Math.random() - 0.5) * 0.12
          )
        );
      }

      var pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      var pMat = new THREE.PointsMaterial({
        color: colorHex,
        size: 0.1,
        transparent: true,
        opacity: 1
      });

      var pSystem = new THREE.Points(pGeo, pMat);
      scene.add(pSystem);

      particleBursts.push({
        points: pSystem,
        velocities: velocities,
        lifetime: 0,
        maxLifetime: 35
      });
    }

    // SCROLL INTERACTION
    var lastScrollY = window.scrollY;
    var scrollTimeout;

    window.addEventListener('scroll', function() {
      var currentScrollY = window.scrollY;
      var deltaY = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      gameStats.scrollSpeedBoost = Math.min(2.5, deltaY * 0.04);
      if (turboEl) turboEl.style.display = 'inline-block';

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        gameStats.scrollSpeedBoost = 0;
        if (turboEl) turboEl.style.display = 'none';
      }, 250);
    }, { passive: true });

    // POINTER / MOUSE / TOUCH STEERING
    var isPointerDown = false;
    function getRelativeX(clientX) {
      var rect = container.getBoundingClientRect();
      var normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      return Math.max(-1.5, Math.min(1.5, normX * 1.6));
    }

    function handlePointerDown(e) {
      isPointerDown = true;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      gameStats.targetLaneX = getRelativeX(clientX);
      if (renderer.domElement) renderer.domElement.style.cursor = 'grabbing';
    }

    function handlePointerMove(e) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;

      var rect = container.getBoundingClientRect();
      var rawParallaxX = ((clientX - rect.left) / rect.width) * 2 - 1;
      var rawParallaxY = ((clientY - rect.top) / rect.height) * 2 - 1;
      gameStats.mouseParallaxX = Math.max(-1, Math.min(1, rawParallaxX));
      gameStats.mouseParallaxY = Math.max(-1, Math.min(1, rawParallaxY));

      if (isPointerDown || !e.touches) {
        gameStats.targetLaneX = getRelativeX(clientX);
      }
    }

    function handlePointerUp() {
      isPointerDown = false;
      if (renderer.domElement) renderer.domElement.style.cursor = 'grab';
    }

    function handlePointerLeave() {
      gameStats.mouseParallaxX = 0;
      gameStats.mouseParallaxY = 0;
    }

    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // RESIZE OBSERVER
    function handleResize() {
      if (!container) return;
      var w = container.clientWidth;
      var h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize);

    // HIDE LOADING SPINNER
    var loadingEl = document.getElementById('alfa-3d-loading');
    if (loadingEl) loadingEl.style.display = 'none';

    // ANIMATION LOOP
    var clock = new THREE.Clock();
    var hudCounter = 0;

    function animate() {
      requestAnimationFrame(animate);

      var delta = clock.getDelta();
      var elapsedTime = clock.getElapsedTime();

      var baseSpeed = 0.38;
      var scrollBoost = gameStats.scrollSpeedBoost;
      var effectiveSpeed = (baseSpeed + scrollBoost) * gameStats.speedMultiplier;

      // Distance & Milestones
      gameStats.totalDistance += effectiveSpeed * 35;
      var totalKm = 2050;
      var currentKm = Math.min(totalKm, Math.floor(gameStats.totalDistance));

      // Lane Steering & Body Roll
      gameStats.laneX += (gameStats.targetLaneX - gameStats.laneX) * 0.14;
      vanGroup.position.x = gameStats.laneX;

      var steeringDelta = gameStats.targetLaneX - gameStats.laneX;
      vanGroup.rotation.z = -steeringDelta * 0.25;
      vanGroup.rotation.y = Math.PI + steeringDelta * 0.2;

      // Suspension & Wheels
      vanGroup.position.y = Math.sin(elapsedTime * (14 + scrollBoost * 15)) * 0.02 + 0.02;
      wheelMeshes.forEach(function(w) {
        w.rotation.x += (0.15 + scrollBoost * 0.2);
      });

      // Mouse Parallax Physics
      gameStats.currentParallaxX += (gameStats.mouseParallaxX - gameStats.currentParallaxX) * 0.08;
      gameStats.currentParallaxY += (gameStats.mouseParallaxY - gameStats.currentParallaxY) * 0.08;
      var pX = gameStats.currentParallaxX;
      var pY = gameStats.currentParallaxY;

      camera.position.x = gameStats.laneX * 0.45 + pX * 0.55;
      camera.position.y = 3.2 + Math.sin(elapsedTime * 8) * 0.01 - pY * 0.35;
      camera.fov = 48 + scrollBoost * 8;
      camera.updateProjectionMatrix();

      camera.lookAt(
        gameStats.laneX * 0.2 - pX * 0.4,
        0.85 + pY * 0.3,
        -4.5
      );

      roadGroup.rotation.z = -pX * 0.035;
      roadGroup.rotation.x = pY * 0.025;

      // Move Road Stripes
      stripes.forEach(function(stripe) {
        stripe.position.z += effectiveSpeed;
        if (stripe.position.z > 5) {
          stripe.position.z -= stripeCount * 1.75;
        }
      });

      // Move Arches
      arches.forEach(function(arch) {
        arch.position.z += effectiveSpeed;
        if (arch.position.z > 6) {
          arch.position.z -= archCount * 12;
        }
      });

      // Move Collectibles
      collectibles.forEach(function(item) {
        if (!item.active) return;

        item.mesh.position.z += effectiveSpeed;
        item.mesh.rotation.y += 0.04;
        item.mesh.rotation.x = Math.sin(elapsedTime * 3) * 0.1;

        var distZ = Math.abs(item.mesh.position.z - vanGroup.position.z);
        var distX = Math.abs(item.mesh.position.x - vanGroup.position.x);

        if (distZ < 1.2 && distX < 0.75) {
          item.active = false;
          item.mesh.visible = false;

          var burstColor = item.type === 'golden' ? 0xf59e0b : item.type === 'turbo' ? 0x38bdf8 : 0xe30613;
          triggerCollectionBurst(item.mesh.position.x, 0.7, item.mesh.position.z, burstColor);

          gameStats.score += item.points * gameStats.combo;
          gameStats.combo = Math.min(5, gameStats.combo + 1);

          if (scoreEl) scoreEl.textContent = gameStats.score;
          if (comboEl) {
            comboEl.textContent = gameStats.combo + 'x كومبو!';
            comboEl.style.display = gameStats.combo > 1 ? 'inline-block' : 'none';
          }

          var toastText =
            item.type === 'golden'
              ? '👑 شحنة ذهبية خاصة! +50'
              : item.type === 'turbo'
              ? '⚡ توربو فائق! +30'
              : '📦 استلام طرد معتمد! +15';
          showToast(toastText);

          setTimeout(function() {
            item.active = true;
            item.mesh.visible = true;
            item.lane = Math.floor(Math.random() * 3);
            item.mesh.position.x = LANES[item.lane];
            item.mesh.position.z = -55 - Math.random() * 20;
          }, 800);
        }

        if (item.mesh.position.z > 6) {
          item.lane = Math.floor(Math.random() * 3);
          item.mesh.position.x = LANES[item.lane];
          item.mesh.position.z = -55 - Math.random() * 15;
        }
      });

      // Particle Bursts update
      for (var b = particleBursts.length - 1; b >= 0; b--) {
        var burst = particleBursts[b];
        burst.lifetime++;
        var posAttr = burst.points.geometry.getAttribute('position');
        var array = posAttr.array;

        for (var j = 0; j < burst.velocities.length; j++) {
          array[j * 3] += burst.velocities[j].x;
          array[j * 3 + 1] += burst.velocities[j].y;
          array[j * 3 + 2] += burst.velocities[j].z;
          burst.velocities[j].y -= 0.003;
        }
        posAttr.needsUpdate = true;

        if (burst.lifetime >= burst.maxLifetime) {
          scene.remove(burst.points);
          burst.points.geometry.dispose();
          if (burst.points.material) burst.points.material.dispose();
          particleBursts.splice(b, 1);
        }
      }

      // Throttle HUD update
      hudCounter++;
      if (hudCounter % 6 === 0) {
        var currentSpeed = Math.floor(80 + scrollBoost * 55 + (effectiveSpeed > 0.4 ? 15 : 0));
        if (speedEl) speedEl.textContent = currentSpeed;

        var progress = Math.min(100, Math.floor((currentKm / totalKm) * 100));
        if (progressTrackEl) progressTrackEl.style.width = progress + '%';
        if (progressTextEl) progressTextEl.textContent = progress + '% نحو مصر';

        var activeIdx = 0;
        for (var k = cities.length - 1; k >= 0; k--) {
          if (currentKm >= cities[k].km) {
            activeIdx = k;
            break;
          }
        }
        if (activeCityEl) {
          activeCityEl.textContent = cities[activeIdx].country + ' ' + cities[activeIdx].name;
        }
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureThreeAndInit);
  } else {
    ensureThreeAndInit();
  }
})();
