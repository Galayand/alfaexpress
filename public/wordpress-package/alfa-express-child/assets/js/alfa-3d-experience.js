/**
 * Alfa Express 3D Truck & Logistics Highway Animation Script
 * Standalone pure Vanilla Three.js script for WordPress front page
 * Compatible with Elementor, Beaver Builder, Divi, or standard WP templates.
 */
(function() {
    'use strict';

    function initAlfa3D() {
        const container = document.getElementById('alfa-3d-hero-canvas') || document.querySelector('.alfa-3d-hero-container');
        if (!container || typeof THREE === 'undefined') return;

        // Ensure container is styled correctly
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = container.clientHeight > 200 ? container.clientHeight + 'px' : '550px';

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x070d1d);
        scene.fog = new THREE.FogExp2(0x070d1d, 0.035);

        const camera = new THREE.PerspectiveCamera(48, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 3.2, 7.2);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
        dirLight.position.set(5, 12, 6);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const redAccentLight = new THREE.PointLight(0xe30613, 3, 20);
        redAccentLight.position.set(0, 1.5, 2);
        scene.add(redAccentLight);

        // Road Highway
        const roadGeo = new THREE.PlaneGeometry(8, 80);
        const roadMat = new THREE.MeshStandardMaterial({ color: 0x091024, roughness: 0.8 });
        const road = new THREE.Mesh(roadGeo, roadMat);
        road.rotation.x = -Math.PI / 2;
        road.receiveShadow = true;
        scene.add(road);

        // Road stripes
        const stripeGeo = new THREE.PlaneGeometry(0.2, 2.5);
        const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const stripes = [];
        for (let i = -35; i <= 35; i += 5) {
            const stripe = new THREE.Mesh(stripeGeo, stripeMat);
            stripe.rotation.x = -Math.PI / 2;
            stripe.position.set(0, 0.01, i);
            scene.add(stripe);
            stripes.push(stripe);
        }

        // 3D Alfa Express Truck Group
        const truck = new THREE.Group();

        // Cabin
        const cabinGeo = new THREE.BoxGeometry(1.6, 1.4, 1.6);
        const brandMat = new THREE.MeshStandardMaterial({ color: 0xe30613, metalness: 0.3, roughness: 0.4 });
        const cabin = new THREE.Mesh(cabinGeo, brandMat);
        cabin.position.set(0, 1.2, 0.8);
        cabin.castShadow = true;
        truck.add(cabin);

        // Windshield
        const glassGeo = new THREE.BoxGeometry(1.4, 0.6, 0.1);
        const glassMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.1, metalness: 0.9 });
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(0, 1.4, 1.6);
        truck.add(glass);

        // Cargo Container (Box)
        const containerGeo = new THREE.BoxGeometry(1.8, 1.9, 3.8);
        const containerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.2 });
        const cargoBox = new THREE.Mesh(containerGeo, containerMat);
        cargoBox.position.set(0, 1.5, -1.8);
        cargoBox.castShadow = true;
        truck.add(cargoBox);

        // Wheels
        const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 24);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
        const wheelPositions = [
            [-0.9, 0.35, 1.1], [0.9, 0.35, 1.1],
            [-0.95, 0.35, -1.2], [0.95, 0.35, -1.2],
            [-0.95, 0.35, -3.0], [0.95, 0.35, -3.0]
        ];
        wheelPositions.forEach(function(pos) {
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(pos[0], pos[1], pos[2]);
            wheel.castShadow = true;
            truck.add(wheel);
        });

        scene.add(truck);

        // Parallax state
        let mouseX = 0;
        let mouseY = 0;
        let targetLaneX = 0;
        let currentLaneX = 0;

        function onMouseMove(e) {
            const rect = container.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX = Math.max(-0.5, Math.min(0.5, relX));
            mouseY = Math.max(-0.5, Math.min(0.5, relY));
            targetLaneX = mouseX * 2.2;
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Resize handler
        function onWindowResize() {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight || 550;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
        window.addEventListener('resize', onWindowResize);

        // Animation Loop
        let clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            // Smooth lane shifting
            currentLaneX += (targetLaneX - currentLaneX) * 0.08;
            truck.position.x = currentLaneX;
            truck.rotation.y = (targetLaneX - currentLaneX) * 0.25;
            truck.rotation.z = -(targetLaneX - currentLaneX) * 0.15;
            truck.position.y = Math.sin(elapsed * 8) * 0.02;

            // Parallax camera
            camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
            camera.position.y += (3.2 - mouseY * 0.8 - camera.position.y) * 0.05;
            camera.lookAt(truck.position.x * 0.4, 1.2, -1.0);

            // Move road stripes for motion illusion
            stripes.forEach(function(st) {
                st.position.z += 0.35;
                if (st.position.z > 15) {
                    st.position.z -= 70;
                }
            });

            renderer.render(scene, camera);
        }
        animate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAlfa3D);
    } else {
        initAlfa3D();
    }
})();
