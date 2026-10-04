/* global THREE */
/**
 * DHRUV · FoodSafe — 2D + 3D Hybrid Atmospheric Engine (scene.js)
 * Renders lightweight 3D pure-water droplets, glowing emerald/aqua vitality orbs,
 * subtle mouse parallax, and smooth upward scroll-slide on the monumental "D H R U V" title.
 */
(function () {
  'use strict';

  const canvas = document.getElementById('kage-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 18);

  // ==========================================================================
  // 1. CLEAN AQUA & EMERALD 3D LIGHTING
  // ==========================================================================
  const ambientLight = new THREE.AmbientLight(0x99f6e4, 1.4);
  scene.add(ambientLight);

  const emeraldLight = new THREE.DirectionalLight(0x10b981, 2.4);
  emeraldLight.position.set(10, 14, 12);
  scene.add(emeraldLight);

  const aquaLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
  aquaLight.position.set(-12, -8, 10);
  scene.add(aquaLight);

  // ==========================================================================
  // 2. FLOATING 3D PURE-WATER DROPLETS & VITALITY MICRO-SPHERES (INSTANCED)
  // ==========================================================================
  const DROPLET_COUNT = 65;
  const dropletGeo = new THREE.SphereGeometry(0.16, 20, 20);
  const dropletMat = new THREE.MeshPhysicalMaterial({
    color: 0x6ee7b7,
    emissive: 0x059669,
    emissiveIntensity: 0.25,
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.42,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const dropletsInstanced = new THREE.InstancedMesh(dropletGeo, dropletMat, DROPLET_COUNT);
  scene.add(dropletsInstanced);

  const dummy = new THREE.Object3D();
  const dropletStates = [];

  for (let i = 0; i < DROPLET_COUNT; i++) {
    const scale = 0.45 + Math.random() * 1.35;
    dropletStates.push({
      x: (Math.random() - 0.5) * 32,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 14 - 2,
      scale,
      speedY: 0.006 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
    });
  }

  // Subtle 3D Wireframe Molecular Hygiene Rings in the far background
  const ringGroup = new THREE.Group();
  scene.add(ringGroup);

  const ringGeo = new THREE.TorusGeometry(3.6, 0.025, 16, 90);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.16,
  });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.position.set(7.5, 2.8, -6);
  ring1.rotation.set(0.5, 0.4, 0);
  ringGroup.add(ring1);

  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.14,
  });
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.02, 16, 72), ring2Mat);
  ring2.position.set(-8.2, -2.5, -5);
  ring2.rotation.set(-0.4, 0.6, 0.2);
  ringGroup.add(ring2);

  // ==========================================================================
  // 3. SCROLL & PARALLAX INTERACTION ("D H R U V" SLIDES UP ON SCROLL)
  // ==========================================================================
  const dhruvMonumentEl = document.getElementById('dhruv-monument');
  const dhruvChars = document.querySelectorAll('.dhruv-char');
  const backdropPhotoEl = document.getElementById('backdrop-2d-photo');
  const hudGateEl = document.getElementById('hud-gate');
  const hudModeEl = document.getElementById('hud-mode');
  const navLinks = document.querySelectorAll('.nav-link');
  const trackedSections = document.querySelectorAll('[data-nav-idx]');

  let pointerX = 0;
  let pointerY = 0;
  let smoothPointerX = 0;
  let smoothPointerY = 0;
  let currentScrollY = window.scrollY;

  const SECTION_NAMES = [
    'OVERVIEW & WHO BURDEN',
    'THE FOOD SAFETY CHAIN',
    'WHO FIVE KEYS TO SAFER FOOD',
    'NCSC RESEARCH METHODOLOGY',
    '3-LEVEL GUIDE & STORYBOARDS',
    'HEALTH MAP & EVERYDAY SETTINGS',
    '11-QUESTION QUIZ & MYTH/FACT',
    'LIVE NCSC SURVEY DASHBOARD',
    '7-DAY CHALLENGE & POSTER STUDIO',
  ];

  function handleScroll() {
    currentScrollY = window.scrollY;

    // 1. Slide the monumental "D H R U V" header smoothly upward as user scrolls down
    if (dhruvMonumentEl) {
      const heroProgress = Math.min(1, currentScrollY / 520);
      const slideUpPx = currentScrollY * 0.28;
      const opacity = Math.max(0.12, 1 - heroProgress * 0.85);
      dhruvMonumentEl.style.transform = `translate3d(0, ${-slideUpPx.toFixed(1)}px, 0)`;
      dhruvMonumentEl.style.opacity = opacity.toFixed(3);
    }

    // 2. Highlight active navbar item & update bottom HUD
    let activeNavIdx = 0;
    const viewportMid = currentScrollY + window.innerHeight * 0.36;
    trackedSections.forEach((sec) => {
      if (viewportMid >= sec.offsetTop) {
        activeNavIdx = parseInt(sec.getAttribute('data-nav-idx'), 10) || 0;
      }
    });

    navLinks.forEach((link) => {
      const secIdx = parseInt(link.getAttribute('data-section'), 10);
      link.classList.toggle('is-active', secIdx === activeNavIdx);
    });

    if (hudGateEl) {
      hudGateEl.textContent = `SECTION 0${activeNavIdx + 1} / 09`;
    }
    if (hudModeEl) {
      hudModeEl.textContent = SECTION_NAMES[activeNavIdx] || 'FOOD & HYGIENE AWARENESS';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  window.addEventListener('pointermove', (e) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animated WHO Burden Counters
  const statElements = document.querySelectorAll('.stat-value [data-count], .stat-value[data-count]');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-count'), 10);
        const padLen = parseInt(el.getAttribute('data-pad') || '2', 10);
        const duration = 1100;
        const startTime = performance.now();

        function tick(now) {
          const p = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const current = Math.round(targetVal * eased);
          el.textContent = String(current).padStart(padLen, '0');
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statsObserver.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );
  statElements.forEach((el) => statsObserver.observe(el));

  // ==========================================================================
  // 4. ANIMATION LOOP (LIGHTWEIGHT 2D + 3D HYBRID)
  // ==========================================================================
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    smoothPointerX += (pointerX - smoothPointerX) * 0.06;
    smoothPointerY += (pointerY - smoothPointerY) * 0.06;

    // Subtle 2D backdrop parallax
    if (backdropPhotoEl) {
      backdropPhotoEl.style.transform = `scale(1.05) translate3d(${(-smoothPointerX * 10).toFixed(1)}px, ${(-smoothPointerY * 8).toFixed(1)}px, 0)`;
    }

    // Subtle 3D camera shift with mouse & scroll
    camera.position.x = smoothPointerX * 0.9;
    camera.position.y = -smoothPointerY * 0.6 - (currentScrollY * 0.0015);
    camera.lookAt(0, -(currentScrollY * 0.0015), 0);

    // Rotate subtle 3D hygiene rings
    ring1.rotation.z = elapsed * 0.12;
    ring1.rotation.x = 0.5 + Math.sin(elapsed * 0.4) * 0.1;
    ring2.rotation.z = -elapsed * 0.15;
    ring2.rotation.y = 0.6 + Math.cos(elapsed * 0.35) * 0.1;

    // Animate floating 3D pure-water droplets
    for (let i = 0; i < DROPLET_COUNT; i++) {
      const s = dropletStates[i];
      s.y += s.speedY;
      if (s.y > 11) s.y = -11;

      const waveX = s.x + Math.sin(elapsed * 0.8 + s.phase) * 0.35;
      dummy.position.set(waveX, s.y, s.z);
      dummy.scale.set(s.scale, s.scale * 1.08, s.scale);
      dummy.updateMatrix();
      dropletsInstanced.setMatrixAt(i, dummy.matrix);
    }
    dropletsInstanced.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
  }

  handleScroll();
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  });
})();
