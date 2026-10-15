import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Trophy, Zap, Compass, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface Alfa3DHeroSceneProps {
  reducedMotion?: boolean;
}

interface CollectibleItem {
  mesh: THREE.Group;
  active: boolean;
  type: 'package' | 'turbo' | 'golden';
  points: number;
  lane: number; // -1: left, 0: center, 1: right
  z: number;
}

interface ParticleBurst {
  points: THREE.Points;
  velocities: THREE.Vector3[];
  lifetime: number;
  maxLifetime: number;
}

export const Alfa3DHeroScene: React.FC<Alfa3DHeroSceneProps> = ({ reducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDayMode, setIsDayMode] = useState<boolean>(false);
  const [useStaticFallback, setUseStaticFallback] = useState<boolean>(false);

  // GAME HUD STATES
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(85);
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(15);
  const [lastCollectedToast, setLastCollectedToast] = useState<string | null>(null);
  const [combo, setCombo] = useState<number>(1);
  const [isBoosting, setIsBoosting] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);

  // Refs for interactive loop communication
  const gameStatsRef = useRef({
    laneX: 0,            // -1.4 (left), 0 (mid), 1.4 (right)
    targetLaneX: 0,
    speedMultiplier: 1.0,
    scrollSpeedBoost: 0,
    totalDistance: 0,
    score: 0,
    combo: 1,
    // Depth-based mouse parallax coordinates (-1 to 1 normalized)
    mouseParallaxX: 0,
    mouseParallaxY: 0,
    currentParallaxX: 0,
    currentParallaxY: 0,
  });

  const cities = [
    { name: 'الرياض', km: 0, country: '🇸🇦' },
    { name: 'مكة المكرمة', km: 850, country: '🇸🇦' },
    { name: 'جدة (الميناء)', km: 950, country: '🇸🇦' },
    { name: 'البحر الأحمر', km: 1350, country: '🌊' },
    { name: 'القاهرة', km: 1850, country: '🇪🇬' },
    { name: 'الإسكندرية', km: 2050, country: '🇪🇬' },
  ];

  const handleResetGame = useCallback(() => {
    gameStatsRef.current.totalDistance = 0;
    gameStatsRef.current.score = 0;
    gameStatsRef.current.combo = 1;
    gameStatsRef.current.targetLaneX = 0;
    setScore(0);
    setCombo(1);
    setProgressPercent(0);
    setCurrentCityIndex(0);
    setLastCollectedToast('بدأت الرحلة من جديد!');
    setTimeout(() => setLastCollectedToast(null), 2000);
  }, []);

  const steerLeft = useCallback(() => {
    gameStatsRef.current.targetLaneX = Math.max(-1.5, gameStatsRef.current.targetLaneX - 1.2);
  }, []);

  const steerRight = useCallback(() => {
    gameStatsRef.current.targetLaneX = Math.min(1.5, gameStatsRef.current.targetLaneX + 1.2);
  }, []);

  useEffect(() => {
    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!checkWebGL() || reducedMotion) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDayMode ? 0x0a162f : 0x050a18, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 120);
    // Chase camera view behind and slightly above the logistics van
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0.8, -4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Style the canvas for smooth gaming and touch responsiveness
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.outline = 'none';
    renderer.domElement.style.cursor = 'grab';

    container.appendChild(renderer.domElement);

    // DISPOSAL TRACKER
    const disposables: { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] }[] = [];
    const registerDisposable = (obj: { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] }) => {
      if (obj.geometry) disposables.push({ geometry: obj.geometry });
      if (obj.material) disposables.push({ material: obj.material });
    };

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, isDayMode ? 1.5 : 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, isDayMode ? 2.3 : 1.7);
    mainLight.position.set(4, 10, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const redAccentLight = new THREE.PointLight(0xe30613, 3.0, 16);
    redAccentLight.position.set(0, 2, -1);
    scene.add(redAccentLight);

    const highwaySkyLight = new THREE.PointLight(0x38bdf8, 2.2, 20);
    highwaySkyLight.position.set(0, 4, -15);
    scene.add(highwaySkyLight);

    // ENDLESS HIGHWAY SYSTEM (Saudi-Egypt Express Way)
    const ROAD_WIDTH = 5.2;
    const ROAD_LENGTH = 70;
    const roadGroup = new THREE.Group();

    // Road asphalt plane
    const roadGeo = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH, 1, 30);
    roadGeo.rotateX(-Math.PI / 2);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x091326,
      roughness: 0.7,
      metalness: 0.2,
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.position.set(0, -0.01, -20);
    roadMesh.receiveShadow = true;
    roadGroup.add(roadMesh);
    registerDisposable(roadMesh);

    // Glowing Neon Guard Rails (Left & Right)
    const railGeo = new THREE.BoxGeometry(0.12, 0.35, ROAD_LENGTH);
    const leftRailMat = new THREE.MeshBasicMaterial({ color: 0xe30613 });
    const rightRailMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    const leftRail = new THREE.Mesh(railGeo, leftRailMat);
    leftRail.position.set(-ROAD_WIDTH / 2, 0.15, -20);
    roadGroup.add(leftRail);
    registerDisposable(leftRail);

    const rightRail = new THREE.Mesh(railGeo, rightRailMat);
    rightRail.position.set(ROAD_WIDTH / 2, 0.15, -20);
    roadGroup.add(rightRail);
    registerDisposable(rightRail);

    // Lane dividers (moving stripes)
    const stripeCount = 20;
    const stripeGeo = new THREE.PlaneGeometry(0.15, 1.8);
    stripeGeo.rotateX(-Math.PI / 2);
    const stripeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });

    const stripes: THREE.Mesh[] = [];
    for (let i = 0; i < stripeCount; i++) {
      // Left lane divider
      const stripeL = new THREE.Mesh(stripeGeo, stripeMat);
      stripeL.position.set(-ROAD_WIDTH / 6, 0.01, -i * 3.5);
      roadGroup.add(stripeL);
      stripes.push(stripeL);

      // Right lane divider
      const stripeR = new THREE.Mesh(stripeGeo, stripeMat);
      stripeR.position.set(ROAD_WIDTH / 6, 0.01, -i * 3.5);
      roadGroup.add(stripeR);
      stripes.push(stripeR);
    }

    scene.add(roadGroup);

    // SPEED TUNNEL / HORIZON ARCHES (Red Sea Maritime & Bridge arches)
    const archCount = 6;
    const arches: THREE.Group[] = [];
    for (let i = 0; i < archCount; i++) {
      const archGroup = new THREE.Group();
      archGroup.position.set(0, 0, -i * 12 - 10);

      const torusGeo = new THREE.TorusGeometry(3.6, 0.05, 8, 32, Math.PI);
      const torusMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xe30613 : 0x38bdf8,
        transparent: true,
        opacity: 0.65,
      });
      const archMesh = new THREE.Mesh(torusGeo, torusMat);
      archMesh.position.y = 0;
      archGroup.add(archMesh);
      registerDisposable(archMesh);

      scene.add(archGroup);
      arches.push(archGroup);
    }

    // THE PLAYER: STYLIZED ALFA EXPRESS LOGISTICS VAN
    const vanGroup = new THREE.Group();
    vanGroup.position.set(0, 0, 1.5);

    // Van Chassis
    const chassisGeo = new THREE.BoxGeometry(1.4, 0.22, 2.8);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x081020,
      roughness: 0.5,
      metalness: 0.8,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.3;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    vanGroup.add(chassis);
    registerDisposable(chassis);

    // Cargo Body (Pure White with Alfa Express Livery)
    const cargoGeo = new THREE.BoxGeometry(1.35, 1.1, 1.8);
    const cargoMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.2,
    });
    const cargo = new THREE.Mesh(cargoGeo, cargoMat);
    cargo.position.set(0, 0.95, 0.2);
    cargo.castShadow = true;
    vanGroup.add(cargo);
    registerDisposable(cargo);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(1.3, 0.85, 0.95);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.25,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.8, -1.0);
    cabin.castShadow = true;
    vanGroup.add(cabin);
    registerDisposable(cabin);

    // Windshield
    const windshieldGeo = new THREE.BoxGeometry(1.2, 0.48, 0.05);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9,
    });
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 0.95, -1.48);
    windshield.rotation.x = 0.24;
    vanGroup.add(windshield);
    registerDisposable(windshield);

    // Alfa Red Accent Stripe
    const vanStripeGeo = new THREE.BoxGeometry(1.38, 0.22, 1.82);
    const vanStripeMat = new THREE.MeshStandardMaterial({
      color: 0xe30613,
      roughness: 0.3,
      metalness: 0.4,
      emissive: 0x99000a,
      emissiveIntensity: 0.5,
    });
    const stripe = new THREE.Mesh(vanStripeGeo, vanStripeMat);
    stripe.position.set(0, 0.86, 0.2);
    vanGroup.add(stripe);
    registerDisposable(stripe);

    // Taillights (Visible to player from chase cam)
    const tailLightGeo = new THREE.BoxGeometry(0.24, 0.12, 0.05);
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff1e28 });
    const tailL = new THREE.Mesh(tailLightGeo, tailLightMat);
    tailL.position.set(0.5, 0.6, 1.12);
    vanGroup.add(tailL);

    const tailR = tailL.clone();
    tailR.position.set(-0.5, 0.6, 1.12);
    vanGroup.add(tailR);

    // Turbo light cones behind van
    const exhaustLightL = new THREE.PointLight(0xe30613, 2.0, 4);
    exhaustLightL.position.set(0.5, 0.4, 1.3);
    vanGroup.add(exhaustLightL);

    const exhaustLightR = new THREE.PointLight(0xe30613, 2.0, 4);
    exhaustLightR.position.set(-0.5, 0.4, 1.3);
    vanGroup.add(exhaustLightR);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.2, 18);
    wheelGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8 });

    const wheelMeshes: THREE.Mesh[] = [];
    const wheelPositions = [
      [-0.68, 0.26, -0.9],
      [0.68, 0.26, -0.9],
      [-0.68, 0.26, 0.7],
      [0.68, 0.26, 0.7],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, tireMat);
      wheel.position.set(x, y, z);
      wheel.castShadow = true;

      const rimGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.21, 12);
      rimGeo.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      wheel.add(rim);

      vanGroup.add(wheel);
      wheelMeshes.push(wheel);
    });

    scene.add(vanGroup);

    // COLLECTIBLE CARGO ITEMS IN LANES
    const LANES = [-1.4, 0, 1.4]; // Left, Center, Right lanes
    const collectibles: CollectibleItem[] = [];
    const collectibleGroup = new THREE.Group();
    scene.add(collectibleGroup);

    const createParcel = (laneIndex: number, zPos: number, type: 'package' | 'turbo' | 'golden'): CollectibleItem => {
      const group = new THREE.Group();
      const laneX = LANES[laneIndex];
      group.position.set(laneX, 0.65, zPos);

      if (type === 'package') {
        // Standard Alfa Box
        const boxGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
        const boxMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.3,
          metalness: 0.2,
          emissive: 0xd97706,
          emissiveIntensity: 0.4,
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.castShadow = true;
        group.add(box);
        registerDisposable(box);

        // Ribbon
        const ribGeo = new THREE.BoxGeometry(0.5, 0.12, 0.5);
        const ribMat = new THREE.MeshBasicMaterial({ color: 0xe30613 });
        const rib = new THREE.Mesh(ribGeo, ribMat);
        group.add(rib);
        registerDisposable(rib);
      } else if (type === 'golden') {
        // Golden Express VIP Crate
        const crateGeo = new THREE.DodecahedronGeometry(0.35);
        const crateMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          roughness: 0.1,
          metalness: 0.9,
          emissive: 0xf59e0b,
          emissiveIntensity: 0.8,
        });
        const crate = new THREE.Mesh(crateGeo, crateMat);
        group.add(crate);
        registerDisposable(crate);
      } else {
        // Turbo Bolt
        const turboGeo = new THREE.OctahedronGeometry(0.35);
        const turboMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const turboMesh = new THREE.Mesh(turboGeo, turboMat);
        group.add(turboMesh);
        registerDisposable(turboMesh);
      }

      // Floating Glow Ring under parcel
      const ringGeo = new THREE.RingGeometry(0.25, 0.35, 16);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: type === 'golden' ? 0xf59e0b : type === 'turbo' ? 0x38bdf8 : 0xe30613,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = -0.55;
      group.add(ring);
      registerDisposable(ring);

      collectibleGroup.add(group);

      return {
        mesh: group,
        active: true,
        type,
        points: type === 'golden' ? 50 : type === 'turbo' ? 30 : 15,
        lane: laneIndex,
        z: zPos,
      };
    };

    // Seed initial 10 collectibles staggered along the highway
    for (let i = 0; i < 9; i++) {
      const laneIdx = Math.floor(Math.random() * 3);
      const typeChoice: 'package' | 'golden' | 'turbo' = i % 4 === 0 ? 'golden' : i % 3 === 0 ? 'turbo' : 'package';
      collectibles.push(createParcel(laneIdx, -10 - i * 6.5, typeChoice));
    }

    // SPARK / PARTICLE BURSTS SYSTEM (on collection)
    const particleBursts: ParticleBurst[] = [];
    const triggerCollectionBurst = (x: number, y: number, z: number, colorHex: number) => {
      const count = 18;
      const positions = new Float32Array(count * 3);
      const velocities: THREE.Vector3[] = [];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        velocities.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.12,
            Math.random() * 0.14 + 0.04,
            (Math.random() - 0.5) * 0.12
          )
        );
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: colorHex,
        size: 0.1,
        transparent: true,
        opacity: 1,
      });

      const pSystem = new THREE.Points(pGeo, pMat);
      scene.add(pSystem);
      registerDisposable(pSystem);

      particleBursts.push({
        points: pSystem,
        velocities,
        lifetime: 0,
        maxLifetime: 35,
      });
    };

    // SCROLL INTERACTION (Scrolling down accelerates the van and drives forward)
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Add dynamic turbo boost based on scroll speed
      gameStatsRef.current.scrollSpeedBoost = Math.min(2.5, deltaY * 0.04);
      setIsBoosting(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gameStatsRef.current.scrollSpeedBoost = 0;
        setIsBoosting(false);
      }, 250);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // MOUSE & TOUCH DRAGGING INTERACTION (Steering the van across lanes)
    let isPointerDown = false;
    let startPointerX = 0;

    const getRelativeX = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      return Math.max(-1.5, Math.min(1.5, normX * 1.6));
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      startPointerX = clientX;
      gameStatsRef.current.targetLaneX = getRelativeX(clientX);
      if (renderer.domElement) {
        renderer.domElement.style.cursor = 'grabbing';
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Update depth parallax target coordinates (-1 to 1)
      const rect = container.getBoundingClientRect();
      const rawParallaxX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const rawParallaxY = ((clientY - rect.top) / rect.height) * 2 - 1;
      gameStatsRef.current.mouseParallaxX = Math.max(-1, Math.min(1, rawParallaxX));
      gameStatsRef.current.mouseParallaxY = Math.max(-1, Math.min(1, rawParallaxY));

      if (isPointerDown || !('touches' in e)) {
        gameStatsRef.current.targetLaneX = getRelativeX(clientX);
      }
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      if (renderer.domElement) {
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handlePointerLeave = () => {
      // Smoothly return parallax towards center when pointer leaves container
      gameStatsRef.current.mouseParallaxX = 0;
      gameStatsRef.current.mouseParallaxY = 0;
    };

    // Attach pointer/mouse/touch listeners to container
    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // INTERSECTION OBSERVER & RESIZE
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // GAME LOOP
    let clock = new THREE.Clock();
    setIsLoaded(true);
    let hudUpdateCounter = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Dynamic Speed Calculation
      const baseSpeed = 0.38;
      const scrollBoost = gameStatsRef.current.scrollSpeedBoost;
      const effectiveSpeed = (baseSpeed + scrollBoost) * gameStatsRef.current.speedMultiplier;

      // Update Total Distance along the route
      gameStatsRef.current.totalDistance += effectiveSpeed * 35;
      const totalKm = 2050; // Total distance from Riyadh to Alexandria
      const currentKm = Math.min(totalKm, Math.floor(gameStatsRef.current.totalDistance));

      // Lane Steering Physics (Smooth interpolation)
      gameStatsRef.current.laneX += (gameStatsRef.current.targetLaneX - gameStatsRef.current.laneX) * 0.14;
      vanGroup.position.x = gameStatsRef.current.laneX;

      // Realistic Steering Body Roll & Yaw
      const steeringDelta = gameStatsRef.current.targetLaneX - gameStatsRef.current.laneX;
      vanGroup.rotation.z = -steeringDelta * 0.25; // Body roll
      vanGroup.rotation.y = Math.PI + steeringDelta * 0.2; // Slight yaw into turn

      // Suspension bounce & Wheel rotation
      vanGroup.position.y = Math.sin(elapsedTime * (14 + scrollBoost * 15)) * 0.02 + 0.02;
      wheelMeshes.forEach((w) => {
        w.rotation.x += (0.15 + scrollBoost * 0.2);
      });

      // Smooth Mouse Parallax Physics (Depth response with damping)
      gameStatsRef.current.currentParallaxX += (gameStatsRef.current.mouseParallaxX - gameStatsRef.current.currentParallaxX) * 0.08;
      gameStatsRef.current.currentParallaxY += (gameStatsRef.current.mouseParallaxY - gameStatsRef.current.currentParallaxY) * 0.08;
      const parallaxX = gameStatsRef.current.currentParallaxX;
      const parallaxY = gameStatsRef.current.currentParallaxY;

      // Camera dynamic follow with slight lag, speed FOV effect, and subtle 3D mouse parallax
      // Near layer reacts with subtle shift, keeping the horizon anchored
      camera.position.x = gameStatsRef.current.laneX * 0.45 + parallaxX * 0.55;
      camera.position.y = 3.2 + Math.sin(elapsedTime * 8) * 0.01 - parallaxY * 0.35;
      camera.fov = 48 + scrollBoost * 8;
      camera.updateProjectionMatrix();

      // Dynamic look target: tilts subtly opposite to mouse for true optical depth parallax
      camera.lookAt(
        gameStatsRef.current.laneX * 0.2 - parallaxX * 0.4,
        0.85 + parallaxY * 0.3,
        -4.5
      );

      // Parallax depth tilt on highway road & neon guardrails (foreground/midground depth)
      roadGroup.rotation.z = -parallaxX * 0.035;
      roadGroup.rotation.x = parallaxY * 0.025;

      // Parallax on highway lighting for reactive ambient sheen
      mainLight.position.x = 4 + parallaxX * 1.5;
      mainLight.position.y = 10 - parallaxY * 1.0;
      redAccentLight.position.x = parallaxX * 0.8;

      // Move Road Stripes (Simulate forward motion)
      stripes.forEach((stripe) => {
        stripe.position.z += effectiveSpeed;
        if (stripe.position.z > 5) {
          stripe.position.z -= stripeCount * 1.75;
        }
      });

      // Move Tunnel Arches
      arches.forEach((arch) => {
        arch.position.z += effectiveSpeed;
        if (arch.position.z > 6) {
          arch.position.z -= archCount * 12;
        }
      });

      // Move Collectibles & Check Collisions
      collectibles.forEach((item) => {
        if (!item.active) return;

        item.mesh.position.z += effectiveSpeed;
        item.mesh.rotation.y += 0.04;
        item.mesh.rotation.x = Math.sin(elapsedTime * 3) * 0.1;

        // Collision Check with Van
        const distZ = Math.abs(item.mesh.position.z - vanGroup.position.z);
        const distX = Math.abs(item.mesh.position.x - vanGroup.position.x);

        if (distZ < 1.2 && distX < 0.75) {
          // HIT! Collect item!
          item.active = false;
          item.mesh.visible = false;

          // Trigger particle burst
          const burstColor = item.type === 'golden' ? 0xf59e0b : item.type === 'turbo' ? 0x38bdf8 : 0xe30613;
          triggerCollectionBurst(item.mesh.position.x, 0.7, item.mesh.position.z, burstColor);

          // Update Score & Combo
          gameStatsRef.current.score += item.points * gameStatsRef.current.combo;
          gameStatsRef.current.combo = Math.min(5, gameStatsRef.current.combo + 1);

          setScore(gameStatsRef.current.score);
          setCombo(gameStatsRef.current.combo);

          const toastText =
            item.type === 'golden'
              ? '👑 شحنة ذهبية خاصة! +50'
              : item.type === 'turbo'
              ? '⚡ توربو فائق! +30'
              : '📦 استلام طرد معتمد! +15';
          setLastCollectedToast(toastText);
          setTimeout(() => setLastCollectedToast(null), 1500);

          // Respawn parcel far ahead
          setTimeout(() => {
            item.active = true;
            item.mesh.visible = true;
            item.lane = Math.floor(Math.random() * 3);
            item.mesh.position.x = LANES[item.lane];
            item.mesh.position.z = -55 - Math.random() * 20;
          }, 800);
        }

        // Passed behind camera, recycle ahead
        if (item.mesh.position.z > 6) {
          item.lane = Math.floor(Math.random() * 3);
          item.mesh.position.x = LANES[item.lane];
          item.mesh.position.z = -55 - Math.random() * 15;
        }
      });

      // Update Particle Bursts
      for (let i = particleBursts.length - 1; i >= 0; i--) {
        const burst = particleBursts[i];
        burst.lifetime++;
        const posAttr = burst.points.geometry.getAttribute('position') as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;

        for (let j = 0; j < burst.velocities.length; j++) {
          array[j * 3] += burst.velocities[j].x;
          array[j * 3 + 1] += burst.velocities[j].y;
          array[j * 3 + 2] += burst.velocities[j].z;
          burst.velocities[j].y -= 0.003; // gravity
        }
        posAttr.needsUpdate = true;

        if (burst.lifetime >= burst.maxLifetime) {
          scene.remove(burst.points);
          burst.points.geometry.dispose();
          if (Array.isArray(burst.points.material)) {
            burst.points.material.forEach((m) => m.dispose());
          } else {
            burst.points.material.dispose();
          }
          particleBursts.splice(i, 1);
        }
      }

      // Throttle React State updates to 10 FPS for max performance
      hudUpdateCounter++;
      if (hudUpdateCounter % 6 === 0) {
        const calculatedSpeed = Math.floor(80 + scrollBoost * 55 + (effectiveSpeed > 0.4 ? 15 : 0));
        setSpeed(calculatedSpeed);

        const progress = Math.min(100, Math.floor((currentKm / totalKm) * 100));
        setProgressPercent(progress);

        // Find active milestone city
        let activeIdx = 0;
        for (let c = cities.length - 1; c >= 0; c--) {
          if (currentKm >= cities[c].km) {
            activeIdx = c;
            break;
          }
        }
        setCurrentCityIndex(activeIdx);
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleWindowScroll);
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      disposables.forEach((item) => {
        if (item.geometry) item.geometry.dispose();
        if (item.material) {
          if (Array.isArray(item.material)) {
            item.material.forEach((m) => m.dispose());
          } else {
            item.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion, isDayMode]);

  // FALLBACK 2D
  if (!webglSupported || useStaticFallback || reducedMotion) {
    return (
      <div className="relative w-full h-[450px] md:h-[580px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1a38] to-[#070d1d] border border-white/10 p-6">
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
          <img
            src="/assets/brand/alfa-car.png"
            alt="سيارة ألفا إكسبريس"
            className="w-72 md:w-96 mb-4 filter drop-shadow-2xl"
          />
          <p className="text-xs text-slate-400">وضع العرض المستقر ثنائي الأبعاد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[460px] md:h-[600px] select-none rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#081226] via-[#050b18] to-[#02050e] shadow-[0_0_50px_-10px_rgba(227,6,19,0.35)]">
      
      {/* TOP GAME HUD BAR: Score, Speedometer & Turbo Status */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-auto">
        
        {/* Left: Speedometer & Turbo Indicator */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center gap-2 shadow-lg">
            <Zap className={`w-4 h-4 ${isBoosting ? 'text-amber-400 animate-bounce' : 'text-sky-400'}`} />
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-medium">السرعة اللوجستية</span>
              <span className="text-xs font-black text-white font-mono">
                {speed} <span className="text-[9px] text-slate-300 font-normal">كم/س</span>
              </span>
            </div>
            {isBoosting && (
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
                TURBO
              </span>
            )}
          </div>

          {/* Combo Multiplier */}
          {combo > 1 && (
            <div className="px-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 text-white font-black text-xs shadow-md animate-pulse">
              {combo}x كومبو!
            </div>
          )}
        </div>

        {/* Right: Score & Parcels Collected */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center gap-2 shadow-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-medium">نقاط الشحنات</span>
              <span className="text-xs font-black text-amber-300 font-mono">{score}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetGame}
            title="إعادة تشغيل الرحلة"
            className="p-2 rounded-2xl bg-black/60 hover:bg-slate-800/80 border border-white/15 text-slate-300 hover:text-white transition-all shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* FLOATING TOAST UPON COLLECTING ITEM */}
      {lastCollectedToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#e30613] to-amber-500 text-white text-xs font-black shadow-xl shadow-red-900/50 border border-white/30 backdrop-blur-md">
            {lastCollectedToast}
          </div>
        </div>
      )}

      {/* 3D CANVAS MOUNT CONTAINER (CSS Selector 1) */}
      <div
        ref={containerRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
      />

      {/* LOADING SPINNER */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#070d1d] z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#e30613] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-400 font-medium">جاري إطلاق لعبة الشحن التفاعلية...</span>
          </div>
        </div>
      )}

      {/* BOTTOM HUD: ROUTE PROGRESS MILESTONE BAR (Saudi Arabia -> Egypt) */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-2 pointer-events-auto">
        
        {/* Milestone Progress Track */}
        <div className="px-3.5 py-2 rounded-2xl bg-black/75 border border-white/15 backdrop-blur-md shadow-2xl flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-white">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#e30613] animate-spin" style={{ animationDuration: '8s' }} />
              <span>المحطة الحالية:</span>
              <span className="text-amber-400">{cities[currentCityIndex].country} {cities[currentCityIndex].name}</span>
            </div>
            <span className="text-[10px] text-slate-300 font-mono">{progressPercent}% نحو مصر</span>
          </div>

          {/* Progress track bar */}
          <div className="relative w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#e30613] via-amber-400 to-emerald-400 transition-all duration-300 shadow-[0_0_12px_rgba(227,6,19,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* City milestones labels */}
          <div className="flex justify-between items-center text-[9px] text-slate-400 pt-0.5">
            {cities.map((city, idx) => (
              <span
                key={city.name}
                className={`${idx === currentCityIndex ? 'text-white font-bold' : 'text-slate-500'}`}
              >
                {city.name.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* TOUCH & DESKTOP CONTROLS HELPER BAR */}
        <div className="flex items-center justify-between gap-2 px-3 py-1 rounded-xl bg-black/50 border border-white/10 text-[10px] text-slate-300 backdrop-blur-md">
          {/* Mobile on-screen steer arrows */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={steerLeft}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:bg-red-600 text-white font-bold"
            >
              ◀ يسار
            </button>
            <button
              type="button"
              onClick={steerRight}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:bg-red-600 text-white font-bold"
            >
              يمين ▶
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span className="text-amber-400 font-bold">🎮 طريقة اللعب:</span>
            <span>حرّك الماوس أو اسحب بإصبعك لتوجيه الشاحنة وجمع الطرود • مرر الصفحة للأسفل لتسريع الشحن!</span>
          </div>

          <div className="text-[10px] text-slate-400">
            مرر للأسفل <span className="text-[#e30613] font-bold">▼</span> للتسريع
          </div>
        </div>

      </div>

    </div>
  );
};
