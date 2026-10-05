/**
 * FoodSafe · KAGE — Interactive NCSC Food & Hygiene Sanctuary Lab (app.js)
 * Wires up all interactive features across Act I (WHO 5 Golden Rules Bento)
 * and Act II (5-Module Interactive FoodSafe Sanctuary Lab).
 */
(function () {
  'use strict';

  // ==========================================================================
  // 1. ACT I : WHO 5 GOLDEN RULES INTERACTIVE WIDGET (#who-rules-widget)
  // ==========================================================================
  const WHO_RULES = [
    {
      num: 'RULE 01 / WHO FIVE KEYS',
      icon: '🧼',
      title: 'KEEP CLEAN',
      why: 'Wash hands and keep surfaces and utensils clean so microbes do not transfer to food.',
      example: 'Wash hands with soap for 20s before preparing food and after handling raw meat.',
      action: 'Make handwashing a fixed routine before every meal and every cooking session.',
    },
    {
      num: 'RULE 02 / WHO FIVE KEYS',
      icon: '🔪',
      title: 'SEPARATE RAW & COOKED',
      why: 'Prevent cross-contamination between raw and ready-to-eat food.',
      example: 'Use separate cutting boards and knives for raw meat and fresh vegetables.',
      action: 'Store raw foods below cooked foods in the refrigerator so juices never drip down.',
    },
    {
      num: 'RULE 03 / WHO FIVE KEYS',
      icon: '🔥',
      title: 'COOK THOROUGHLY',
      why: 'Proper cooking kills almost all dangerous microorganisms.',
      example: 'Cook meat, poultry, and eggs until steaming hot throughout with no pink inside.',
      action: 'Reheat cooked leftovers until steaming hot all the way through before serving.',
    },
    {
      num: 'RULE 04 / WHO FIVE KEYS',
      icon: '❄️',
      title: 'KEEP FOOD AT SAFE TEMPERATURES',
      why: 'Microbes multiply fastest in the thermal danger zone between 5°C and 60°C.',
      example: 'Refrigerate all cooked and perishable food promptly within two hours.',
      action: 'Keep hot food hot (>60°C) and cold food cold (<5°C) — never thaw at room temperature.',
    },
    {
      num: 'RULE 05 / WHO FIVE KEYS',
      icon: '🚰',
      title: 'USE SAFE WATER & RAW MATERIALS',
      why: 'Safe water and unspoiled raw materials are the foundation of safe food preparation.',
      example: 'Use clean, treated, or boiled water for cooking, washing produce, and making drinks.',
      action: 'Choose fresh, undamaged produce, wash fruits/vegetables under running water, and check expiry dates.',
    },
  ];

  const whoTabs = document.querySelectorAll('.who-tab');
  const whoIconEl = document.getElementById('who-rule-icon');
  const whoNumEl = document.getElementById('who-rule-num');
  const whoTitleEl = document.getElementById('who-rule-title');
  const whoWhyEl = document.getElementById('who-rule-why');
  const whoExampleEl = document.getElementById('who-rule-example');
  const whoActionEl = document.getElementById('who-rule-action');

  whoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-rule'), 10);
      const r = WHO_RULES[idx];
      if (!r) return;

      whoTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      if (whoIconEl) whoIconEl.textContent = r.icon;
      if (whoNumEl) whoNumEl.textContent = r.num;
      if (whoTitleEl) whoTitleEl.textContent = r.title;
      if (whoWhyEl) whoWhyEl.textContent = r.why;
      if (whoExampleEl) whoExampleEl.textContent = r.example;
      if (whoActionEl) whoActionEl.textContent = r.action;
    });
  });

  // ==========================================================================
  // 2. LAB MODULE 01A : "DO YOU KNOW? 🤔" 6-FACT INTERACTIVE CAROUSEL
  // ==========================================================================
  const FACTS = [
    {
      fact: 'Food can look completely normal and still be contaminated.',
      why: 'Harmful microbes often do not change the smell, taste or appearance of food.',
      do: "Don't judge safety by looks alone — follow safe handling, storage and time limits.",
    },
    {
      fact: 'Raw and cooked food should be kept separate.',
      why: 'Juices from raw meat can carry microbes onto ready-to-eat food (cross-contamination).',
      do: 'Use separate boards, knives and containers for raw and cooked items.',
    },
    {
      fact: 'Food should be protected from dust and insects.',
      why: 'Flies, dust and pests can transfer microbes onto exposed food.',
      do: 'Keep food covered and store it properly, especially in warm weather.',
    },
    {
      fact: 'Checking expiry / use-by information matters.',
      why: 'Dates reflect safety and quality limits set by the manufacturer.',
      do: "Read labels before buying and eating; don't rely only on appearance.",
    },
    {
      fact: 'Safe water is an important part of food hygiene.',
      why: 'Water is used in washing, cooking and drinks — unsafe water can contaminate food.',
      do: 'Use clean, safe water for preparation, washing and drinking.',
    },
    {
      fact: 'Clean hands are only one part of food safety.',
      why: 'Hygiene also includes surfaces, utensils, storage, temperature and sourcing.',
      do: 'Practice all-round hygiene, not just handwashing, at every step.',
    },
  ];

  let currentFactIdx = 0;
  const factCounterEl = document.getElementById('fact-counter');
  const factTitleEl = document.getElementById('fact-title');
  const factWhyEl = document.getElementById('fact-why');
  const factDoEl = document.getElementById('fact-do');
  const factDotsEl = document.getElementById('fact-dots');
  const factPrevBtn = document.getElementById('fact-prev');
  const factNextBtn = document.getElementById('fact-next');

  function renderFactCarousel() {
    const item = FACTS[currentFactIdx];
    if (!item) return;

    if (factCounterEl) {
      factCounterEl.textContent = `FACT 0${currentFactIdx + 1} / 0${FACTS.length}`;
    }
    if (factTitleEl) factTitleEl.textContent = item.fact;
    if (factWhyEl) factWhyEl.textContent = item.why;
    if (factDoEl) factDoEl.textContent = item.do;

    if (factDotsEl) {
      factDotsEl.innerHTML = '';
      FACTS.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `carousel-dot ${idx === currentFactIdx ? 'is-active' : ''}`;
        dot.setAttribute('aria-label', `Go to Fact ${idx + 1}`);
        dot.addEventListener('click', () => {
          currentFactIdx = idx;
          renderFactCarousel();
        });
        factDotsEl.appendChild(dot);
      });
    }
  }

  if (factPrevBtn) {
    factPrevBtn.addEventListener('click', () => {
      currentFactIdx = (currentFactIdx - 1 + FACTS.length) % FACTS.length;
      renderFactCarousel();
    });
  }
  if (factNextBtn) {
    factNextBtn.addEventListener('click', () => {
      currentFactIdx = (currentFactIdx + 1) % FACTS.length;
      renderFactCarousel();
    });
  }
  renderFactCarousel();

  // ==========================================================================
  // 3. LAB MODULE 01B : 🎬 WATCH & LEARN — 5 ANIMATED STORYBOARDS
  // ==========================================================================
  const STORYBOARDS = [
    {
      title: 'The Journey of a Germ',
      takeaway: 'A single unwashed hand can carry microbes all the way to your meal.',
      frames: ['🖐️', '🦠', '🍎', '🤢'],
      labels: ['Unwashed Hand', 'Microbe Transfer', 'Touched Fruit', 'Stomach Illness'],
    },
    {
      title: 'Wash Your Hands — The Right Habit',
      takeaway: 'Lather with soap for at least 20 seconds, covering every part of your hands.',
      frames: ['💧', '🧼', '👐', '✨'],
      labels: ['Clean Water', 'Apply Soap', '20s Scrub', 'Germ-Free'],
    },
    {
      title: 'Raw vs Cooked — Keep Them Separate',
      takeaway: 'Separate boards and knives stop microbes moving from raw to ready-to-eat food.',
      frames: ['🍗', '🔪', '🪵', '🍲'],
      labels: ['Raw Meat', 'Separate Knife', 'Separate Board', 'Protected Meal'],
    },
    {
      title: 'From Market to Kitchen',
      takeaway: 'Safe handling from purchase to storage keeps food safe at every step.',
      frames: ['🛒', '🚶', '🧺', '🧊'],
      labels: ['Inspect Fresh', 'Safe Transport', 'Rinse Produce', 'Chill Promptly'],
    },
    {
      title: 'Is Your Street Food Safe?',
      takeaway: 'Look for covered food, clean utensils and hygienic handling before you eat.',
      frames: ['🛍️', '🤔', '🧼', '✅'],
      labels: ['Street Stall', 'Check Hygiene', 'Clean Utensils', 'Safe Choice'],
    },
  ];

  let playingStoryboardIdx = 0; // First storyboard plays by default
  const storyboardListEl = document.getElementById('storyboard-list');

  function renderStoryboards() {
    if (!storyboardListEl) return;
    storyboardListEl.innerHTML = '';

    STORYBOARDS.forEach((sb, idx) => {
      const isPlaying = playingStoryboardIdx === idx;
      const item = document.createElement('div');
      item.className = `storyboard-card ${isPlaying ? 'is-playing' : ''}`;

      const framesHtml = sb.frames
        .map(
          (emoji, fIdx) => `
          <div class="sb-frame" style="animation-delay: ${fIdx * 0.28}s">
            <span class="sb-emoji">${emoji}</span>
            <span class="sb-frame-lbl">${sb.labels[fIdx]}</span>
          </div>
          ${fIdx < sb.frames.length - 1 ? '<span class="sb-arrow">→</span>' : ''}
        `
        )
        .join('');

      item.innerHTML = `
        <div class="sb-card-head">
          <div>
            <span class="sb-num">STORYBOARD 0${idx + 1} · 30–60S</span>
            <h4 class="sb-title">${sb.title}</h4>
          </div>
          <button type="button" class="sb-play-btn" aria-label="Toggle storyboard animation">
            ${isPlaying ? '⏸ PLAYING' : '▶ PLAY'}
          </button>
        </div>
        <div class="sb-stage">
          ${framesHtml}
        </div>
        <p class="sb-takeaway">💡 ${sb.takeaway}</p>
      `;

      item.querySelector('.sb-play-btn').addEventListener('click', () => {
        playingStoryboardIdx = isPlaying ? null : idx;
        renderStoryboards();
      });

      storyboardListEl.appendChild(item);
    });
  }
  renderStoryboards();

  // ==========================================================================
  // 4. LAB MODULE 01C : 3-LEVEL UNLOCKABLE FOOD HYGIENE GUIDE
  // ==========================================================================
  const GUIDE_LEVELS = [
    {
      level: 1,
      name: 'Level 01 — Basic Everyday Habits',
      jp: 'FOUNDATIONAL HABITS',
      items: [
        {
          icon: '🧼',
          title: 'Wash Your Hands (20 Seconds)',
          body: 'Wash hands with soap before cooking, before eating, after using the toilet, and after handling raw food. Lather for at least 20 seconds, covering palms, backs, nails and wrists.',
        },
        {
          icon: '🥕',
          title: 'Wash Fruits & Vegetables',
          body: 'Rinse produce under clean running water to remove soil, dust and surface residues. Peel or scrub firm items. Avoid using soap or harsh detergents on food.',
        },
        {
          icon: '🍽️',
          title: 'Clean Utensils & Cloths',
          body: 'Wash knives, cutting boards, plates and prep surfaces with clean water and detergent. Keep kitchen cloths clean and dry — damp cloths spread microbes rapidly.',
        },
        {
          icon: '🫙',
          title: 'Cover Food Promptly',
          body: 'Cover cooked and stored food to protect it from dust, flies and insects. Use lids, mesh covers or food-grade wraps — never leave food exposed.',
        },
      ],
    },
    {
      level: 2,
      name: 'Level 02 — Intermediate Kitchen Control',
      jp: 'STORAGE & COOKING',
      items: [
        {
          icon: '❄️',
          title: 'Safe Food Storage (5°C–60°C)',
          body: "Store perishable food in the refrigerator (<5°C). Don't leave cooked food at room temperature for more than 2 hours — microbes multiply fastest between 5°C and 60°C.",
        },
        {
          icon: '📅',
          title: 'Check Expiry & Use-By Dates',
          body: "Read expiry and use-by dates before buying and eating. 'Use by' indicates food safety limits; 'Best before' indicates peak quality.",
        },
        {
          icon: '🍗',
          title: 'Separate Raw & Cooked',
          body: 'Keep raw meat, poultry and seafood separated from ready-to-eat foods in shopping bags, during preparation, and inside the fridge (store raw below cooked).',
        },
        {
          icon: '🔥',
          title: 'Cook Thoroughly',
          body: 'Cook food — especially meat, poultry, eggs and seafood — until steaming hot throughout. Proper thermal cooking kills harmful bacteria and viruses.',
        },
      ],
    },
    {
      level: 3,
      name: 'Level 03 — Advanced Smart Consumer',
      jp: 'ADVANCED PREVENTION',
      items: [
        {
          icon: '🦠',
          title: 'Cross-Contamination Chain',
          body: 'Microbes transfer invisibly: Raw Food → Knife → Cutting Board → Cooked Meal. Break the chain by using dedicated boards and washing hands between steps.',
          chain: ['🍗 Raw Food', '🔪 Knife', '🪵 Cutting Board', '🍲 Cooked Meal'],
        },
        {
          icon: '🌡️',
          title: 'Thermal Danger Zone Mastery',
          body: 'Keep hot food above 60°C and cold food below 5°C. Never thaw frozen meat on the kitchen counter — thaw safely inside the refrigerator or microwave.',
        },
        {
          icon: '🚰',
          title: 'Safe Water & Ice Hygiene',
          body: 'Use safe, potable water for cooking, washing produce, and making ice or beverages. Remember that freezing does not kill bacteria in contaminated ice.',
        },
        {
          icon: '🛒',
          title: 'Smart Consumer Behaviour',
          body: 'Before eating outside or buying street food, inspect food covering, vendor hand hygiene, utensil washing water, and surface cleanliness.',
        },
      ],
    },
  ];

  let unlockedLevel = 1;
  let activeGuideLevel = 1;
  const guideContainerEl = document.getElementById('guide-levels-container');
  const levelPills = document.querySelectorAll('#level-pills .level-pill');

  function renderGuideLevels() {
    if (!guideContainerEl) return;

    levelPills.forEach((pill) => {
      const lvl = parseInt(pill.getAttribute('data-level'), 10);
      const isUnlocked = lvl <= unlockedLevel;
      const isActive = lvl === activeGuideLevel;
      pill.classList.toggle('is-unlocked', isUnlocked);
      pill.classList.toggle('is-active', isActive);
      const labels = ['LEVEL 01 · BASIC', 'LEVEL 02 · INTERMEDIATE', 'LEVEL 03 · ADVANCED'];
      pill.textContent = `${isUnlocked ? '✓ ' : '🔒 '}${labels[lvl - 1]}`;
    });

    const levelData = GUIDE_LEVELS.find((l) => l.level === activeGuideLevel) || GUIDE_LEVELS[0];
    const isLocked = levelData.level > unlockedLevel;

    const cardsHtml = levelData.items
      .map(
        (item) => `
        <div class="guide-item-card">
          <div class="guide-item-top">
            <span class="guide-item-icon">${item.icon}</span>
            <h4 class="guide-item-title">${item.title}</h4>
          </div>
          <p class="guide-item-body">${item.body}</p>
          ${
            item.chain
              ? `<div class="guide-chain-strip">
                  ${item.chain.map((c, idx) => `<span>${c}</span>${idx < item.chain.length - 1 ? '<span class="text-crimson">→</span>' : ''}`).join('')}
                 </div>`
              : ''
          }
        </div>
      `
      )
      .join('');

    let actionFooterHtml = '';
    if (isLocked) {
      actionFooterHtml = `
        <div class="guide-unlock-bar">
          <span>🔒 Complete Level 0${levelData.level - 1} to unlock ${levelData.name}.</span>
          <button type="button" class="btn-vermilion-sm" data-unlock="${levelData.level}">Unlock Level 0${levelData.level} Now →</button>
        </div>
      `;
    } else if (levelData.level < 3) {
      const nextLvl = levelData.level + 1;
      actionFooterHtml = `
        <div class="guide-unlock-bar">
          <span>✅ You have mastered ${levelData.name}. Ready for the next tier?</span>
          <button type="button" class="btn-vermilion-sm" data-unlock="${nextLvl}">
            ${unlockedLevel >= nextLvl ? `Go to Level 0${nextLvl} →` : `🔓 Unlock Level 0${nextLvl} →`}
          </button>
        </div>
      `;
    } else {
      actionFooterHtml = `
        <div class="guide-unlock-bar is-complete">
          <span>🏆 All 3 Levels Unlocked! You have completed the NCSC Food Hygiene Guide.</span>
        </div>
      `;
    }

    guideContainerEl.innerHTML = `
      <div class="guide-level-stage ${isLocked ? 'is-locked' : ''}">
        <div class="guide-level-header">
          <h4>${levelData.name}</h4>
          <span class="panel-badge">${isLocked ? '🔒 LOCKED' : '✓ UNLOCKED'}</span>
        </div>
        <div class="guide-cards-grid">
          ${cardsHtml}
        </div>
        ${actionFooterHtml}
      </div>
    `;

    const unlockBtn = guideContainerEl.querySelector('[data-unlock]');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        const targetLvl = parseInt(unlockBtn.getAttribute('data-unlock'), 10);
        unlockedLevel = Math.max(unlockedLevel, targetLvl);
        activeGuideLevel = targetLvl;
        renderGuideLevels();
      });
    }
  }

  levelPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const lvl = parseInt(pill.getAttribute('data-level'), 10);
      unlockedLevel = Math.max(unlockedLevel, lvl);
      activeGuideLevel = lvl;
      renderGuideLevels();
    });
  });
  renderGuideLevels();

  // ==========================================================================
  // 5. LAB MODULE 02A : ❤️ INTERACTIVE SVG BODY MAP (#lab-health)
  // ==========================================================================
  const ORGAN_DATA = {
    body: {
      badge: 'WHOLE BODY',
      tag: 'SYSTEMIC IMPACT',
      heading: 'Whole Body (Systemic Effects)',
      desc: 'Fever, dehydration, fatigue, and systemic infection can occur depending on the foodborne pathogen (such as Salmonella, Listeria, or Hepatitis A) and the vulnerability of the individual.',
    },
    stomach: {
      badge: 'STOMACH',
      tag: 'GASTRIC SYSTEM',
      heading: 'Stomach (Upper GI Tract)',
      desc: 'Nausea, vomiting, and acute abdominal cramps frequently occur within hours of consuming contaminated food or heat-stable bacterial toxins (such as Staphylococcus aureus or Bacillus cereus).',
    },
    intestine: {
      badge: 'INTESTINE',
      tag: 'INTESTINAL TRACT',
      heading: 'Intestine (Lower GI Tract)',
      desc: 'Diarrhoeal illness and fluid loss are the most common clinical effects of foodborne infection when bacteria, viruses (Norovirus), or parasites colonize the intestinal lining.',
    },
  };

  const hotspots = document.querySelectorAll('.body-hotspot');
  const organTabs = document.querySelectorAll('.organ-tab');
  const bodyActiveBadge = document.getElementById('body-active-badge');
  const organTagEl = document.getElementById('organ-tag');
  const organHeadingEl = document.getElementById('organ-heading');
  const organDescEl = document.getElementById('organ-desc');

  function selectOrgan(organId) {
    const info = ORGAN_DATA[organId];
    if (!info) return;

    hotspots.forEach((h) => {
      h.classList.toggle('is-active', h.getAttribute('data-organ') === organId);
    });
    organTabs.forEach((t) => {
      t.classList.toggle('is-active', t.getAttribute('data-organ') === organId);
    });

    if (bodyActiveBadge) bodyActiveBadge.textContent = info.badge;
    if (organTagEl) organTagEl.textContent = info.tag;
    if (organHeadingEl) organHeadingEl.textContent = info.heading;
    if (organDescEl) organDescEl.textContent = info.desc;
  }

  hotspots.forEach((h) => {
    h.addEventListener('click', () => selectOrgan(h.getAttribute('data-organ')));
    h.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOrgan(h.getAttribute('data-organ'));
      }
    });
  });
  organTabs.forEach((t) => {
    t.addEventListener('click', () => selectOrgan(t.getAttribute('data-organ')));
  });

  // ==========================================================================
  // 6. LAB MODULE 02B : EVERYDAY SETTINGS CHECKLISTS & "WOULD YOU EAT HERE?"
  // ==========================================================================
  const SETTINGS_ITEMS = {
    home: [
      'Wash hands with soap before cooking and eating',
      'Clean cutting boards, knives, and kitchen surfaces',
      'Keep cooked food covered with lids or nets',
      'Separate raw meat from ready-to-eat items',
      'Store perishable foods safely in the refrigerator',
    ],
    school: [
      'Check school canteen surface and staff cleanliness',
      'Use filtered or verified safe drinking water',
      'Keep lunchboxes and eating areas clean',
      'Avoid uncovered or visibly unsafe food stalls outside school gates',
    ],
    outside: [
      'Is the prepared food kept covered from street dust?',
      'Are serving utensils and plates washed in clean water?',
      'Does the surrounding stall or kitchen look clean?',
      'Is food handled with clean gloves, tongs, or washed hands?',
      'Is the food protected from flies and insects?',
      'Is safe potable water used for drinks and ice?',
    ],
  };

  let activeSetting = 'home';
  const checkedSettingsState = {};
  const settingTabs = document.querySelectorAll('#setting-tabs .setting-tab');
  const settingsChecklistEl = document.getElementById('settings-checklist');

  function renderSettingsChecklist() {
    if (!settingsChecklistEl) return;
    const list = SETTINGS_ITEMS[activeSetting] || [];
    settingsChecklistEl.innerHTML = '';

    list.forEach((text) => {
      const key = `${activeSetting}:${text}`;
      const isChecked = !!checkedSettingsState[key];
      const li = document.createElement('li');
      li.innerHTML = `
        <button type="button" class="check-row-btn ${isChecked ? 'is-checked' : ''}">
          <span class="check-box">${isChecked ? '✓' : ''}</span>
          <span class="check-text">${text}</span>
        </button>
      `;
      li.querySelector('button').addEventListener('click', () => {
        checkedSettingsState[key] = !checkedSettingsState[key];
        renderSettingsChecklist();
      });
      settingsChecklistEl.appendChild(li);
    });
  }

  settingTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeSetting = tab.getAttribute('data-setting');
      settingTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      renderSettingsChecklist();
    });
  });
  renderSettingsChecklist();

  // "🤔 Would You Eat Here?" Scenario Game
  const SCENARIOS = [
    {
      text: 'A street cart where food is uncovered and flies are visible.',
      safe: false,
      explain: 'Flies and street dust transfer harmful pathogens directly onto uncovered food — avoid eating here.',
    },
    {
      text: 'A canteen with covered food, clean utensils, and a verified water filter.',
      safe: true,
      explain: 'Covered food, clean serving tools, and filtered water are key indicators of safe food hygiene.',
    },
    {
      text: 'A stall where the vendor handles cash money and food with the same unwashed hand.',
      safe: false,
      explain: 'Currency notes carry heavy microbial contamination; handling food without washing hands or using tongs is unsafe.',
    },
    {
      text: 'A restaurant that stores raw meat on the top shelf above ready-to-eat salads in the fridge.',
      safe: false,
      explain: 'Raw meat juices can drip onto ready-to-eat salads below, causing severe cross-contamination.',
    },
  ];

  let currentScenarioIdx = 0;
  const scenarioCounterEl = document.getElementById('scenario-counter');
  const scenarioPromptEl = document.getElementById('scenario-prompt');
  const scenarioActionsEl = document.getElementById('scenario-actions');
  const scenarioFeedbackEl = document.getElementById('scenario-feedback');
  const scenarioVerdictEl = document.getElementById('scenario-verdict');
  const scenarioExplainEl = document.getElementById('scenario-explain');
  const scenarioYesBtn = document.getElementById('scenario-yes');
  const scenarioNoBtn = document.getElementById('scenario-no');
  const scenarioNextBtn = document.getElementById('scenario-next');

  function renderScenario() {
    const sc = SCENARIOS[currentScenarioIdx];
    if (!sc) return;
    if (scenarioCounterEl) {
      scenarioCounterEl.textContent = `SCENARIO 0${currentScenarioIdx + 1} / 0${SCENARIOS.length}`;
    }
    if (scenarioPromptEl) scenarioPromptEl.textContent = sc.text;
    if (scenarioActionsEl) scenarioActionsEl.hidden = false;
    if (scenarioFeedbackEl) scenarioFeedbackEl.hidden = true;
  }

  function answerScenario(userSaidYes) {
    const sc = SCENARIOS[currentScenarioIdx];
    const isCorrect = userSaidYes === sc.safe;
    if (scenarioActionsEl) scenarioActionsEl.hidden = true;
    if (scenarioFeedbackEl) scenarioFeedbackEl.hidden = false;

    if (scenarioVerdictEl) {
      scenarioVerdictEl.textContent = isCorrect
        ? '✅ Good judgement! You spotted the hygiene cues.'
        : '❌ Not quite — look closely at the contamination risks.';
      scenarioVerdictEl.className = `feedback-verdict ${isCorrect ? 'is-good' : 'is-bad'}`;
    }
    if (scenarioExplainEl) {
      scenarioExplainEl.textContent = sc.explain;
    }
  }

  if (scenarioYesBtn) scenarioYesBtn.addEventListener('click', () => answerScenario(true));
  if (scenarioNoBtn) scenarioNoBtn.addEventListener('click', () => answerScenario(false));
  if (scenarioNextBtn) {
    scenarioNextBtn.addEventListener('click', () => {
      currentScenarioIdx = (currentScenarioIdx + 1) % SCENARIOS.length;
      renderScenario();
    });
  }
  renderScenario();

  // ==========================================================================
  // 7. LAB MODULE 03A : 🧠 11-QUESTION FOOD SAFETY QUIZ
  // ==========================================================================
  const QUIZ_QUESTIONS = [
    {
      q: 'What is cross-contamination?',
      options: [
        'Cooking food twice',
        'Transfer of harmful agents from one food/surface to another',
        'Washing vegetables',
        'Refrigerating food',
      ],
      answer: 1,
      why: 'Cross-contamination is the transfer of microbes from raw food or surfaces to ready-to-eat food.',
    },
    {
      q: 'For how long should you wash hands with soap?',
      options: ['5 seconds', 'At least 20 seconds', '2 minutes', 'Only with water'],
      answer: 1,
      why: 'WHO recommends thorough handwashing with soap and clean water for at least 20 seconds.',
    },
    {
      q: "Which temperature range is the 'danger zone' for microbial growth?",
      options: ['Below 0°C', '5°C to 60°C', 'Above 100°C', 'Exactly 25°C'],
      answer: 1,
      why: 'Microbes multiply fastest between 5°C and 60°C — keep perishable food out of this zone.',
    },
    {
      q: 'Food that looks and smells normal is always safe.',
      options: ['True', 'False'],
      answer: 1,
      why: 'Pathogenic contamination often cannot be detected by appearance, smell, or taste.',
    },
    {
      q: 'Raw and cooked food can be stored together safely in the same container.',
      options: ['True', 'False'],
      answer: 1,
      why: 'Keep them separate to prevent juices from raw food contaminating ready-to-eat food.',
    },
    {
      q: 'Which of the following is part of the WHO Five Keys to Safer Food?',
      options: ['Cook thoroughly', 'Add more salt', 'Eat quickly', 'Skip breakfast'],
      answer: 0,
      why: 'Cooking thoroughly is Key #3 of the WHO Five Keys to Safer Food.',
    },
    {
      q: 'Safe water is important for food preparation and washing produce.',
      options: ['True', 'False'],
      answer: 0,
      why: 'Unsafe water used in cooking, washing, or beverages can directly contaminate food.',
    },
    {
      q: 'Food safety is only the responsibility of restaurants and food vendors.',
      options: ['True', 'False'],
      answer: 1,
      why: "Food safety is everyone's responsibility — at home, at school, and when eating outside.",
    },
    {
      q: 'Why should you check expiry / use-by dates on packaged foods?',
      options: [
        'They are about price',
        'They reflect safety and quality limits',
        'They are decorative',
        "They don't matter",
      ],
      answer: 1,
      why: 'Expiry and use-by dates reflect microbial safety and quality limits set by the manufacturer.',
    },
    {
      q: 'Which habit best helps prevent physical contamination?',
      options: [
        'Leaving food uncovered',
        'Covering food and keeping prep areas clean',
        'Using dirty cloths',
        'Storing food on the floor',
      ],
      answer: 1,
      why: 'Covering food and keeping areas clean prevents dust, hair, insects, and foreign objects.',
    },
    {
      q: 'Where should raw meat be stored inside the refrigerator?',
      options: [
        'Above cooked food',
        'Below cooked and ready-to-eat food',
        'Outside the fridge',
        'Mixed with unwashed vegetables',
      ],
      answer: 1,
      why: 'Store raw meat in sealed containers below cooked food so juices never drip down.',
    },
  ];

  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  const quizProgressBadge = document.getElementById('quiz-progress-badge');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizStage = document.getElementById('quiz-stage');
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizFeedbackEl = document.getElementById('quiz-feedback');
  const quizVerdictEl = document.getElementById('quiz-verdict');
  const quizWhyEl = document.getElementById('quiz-why');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizResultStage = document.getElementById('quiz-result-stage');
  const quizFinalPercent = document.getElementById('quiz-final-percent');
  const quizFinalRank = document.getElementById('quiz-final-rank');
  const quizFinalSummary = document.getElementById('quiz-final-summary');
  const quizRestartBtn = document.getElementById('quiz-restart-btn');

  function getQuizRank(pct) {
    if (pct <= 30) return "Beginner — Let's Learn Safe Habits! 🌱";
    if (pct <= 60) return 'Getting There — Keep Practicing! 📈';
    if (pct <= 80) return 'Food Safety Aware 🛡️';
    return 'Food Safety Champion 🏆';
  }

  function renderQuizQuestion() {
    const qObj = QUIZ_QUESTIONS[quizIndex];
    if (!qObj) return;

    quizAnswered = false;
    if (quizStage) quizStage.hidden = false;
    if (quizResultStage) quizResultStage.hidden = true;
    if (quizFeedbackEl) quizFeedbackEl.hidden = true;

    const qNum = String(quizIndex + 1).padStart(2, '0');
    if (quizProgressBadge) {
      quizProgressBadge.textContent = `Q ${qNum} / ${QUIZ_QUESTIONS.length} · SCORE: ${quizScore}`;
    }
    if (quizProgressFill) {
      const pct = Math.round(((quizIndex + 1) / QUIZ_QUESTIONS.length) * 100);
      quizProgressFill.style.width = `${pct}%`;
    }
    if (quizQuestionEl) quizQuestionEl.textContent = qObj.q;

    if (quizOptionsEl) {
      quizOptionsEl.innerHTML = '';
      qObj.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-opt-btn';
        btn.innerHTML = `
          <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="opt-text">${optText}</span>
        `;
        btn.addEventListener('click', () => handleQuizChoice(idx, btn));
        quizOptionsEl.appendChild(btn);
      });
    }
  }

  function handleQuizChoice(selectedIdx, clickedBtn) {
    if (quizAnswered) return;
    quizAnswered = true;

    const qObj = QUIZ_QUESTIONS[quizIndex];
    const isCorrect = selectedIdx === qObj.answer;
    if (isCorrect) quizScore++;

    const allBtns = quizOptionsEl.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === qObj.answer) {
        btn.classList.add('is-correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('is-wrong');
      }
    });

    const qNum = String(quizIndex + 1).padStart(2, '0');
    if (quizProgressBadge) {
      quizProgressBadge.textContent = `Q ${qNum} / ${QUIZ_QUESTIONS.length} · SCORE: ${quizScore}`;
    }

    if (quizFeedbackEl) quizFeedbackEl.hidden = false;
    if (quizVerdictEl) {
      quizVerdictEl.textContent = isCorrect ? '✅ Correct!' : '❌ Not quite.';
      quizVerdictEl.className = `feedback-verdict ${isCorrect ? 'is-good' : 'is-bad'}`;
    }
    if (quizWhyEl) quizWhyEl.textContent = qObj.why;
    if (quizNextBtn) {
      quizNextBtn.textContent =
        quizIndex + 1 >= QUIZ_QUESTIONS.length ? 'See My Final Score 🏆' : 'Next Question →';
    }
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (quizIndex + 1 >= QUIZ_QUESTIONS.length) {
        // Show final results
        if (quizStage) quizStage.hidden = true;
        if (quizResultStage) quizResultStage.hidden = false;
        const pct = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
        if (quizFinalPercent) quizFinalPercent.textContent = `${pct}%`;
        if (quizFinalRank) quizFinalRank.textContent = getQuizRank(pct);
        if (quizFinalSummary) {
          quizFinalSummary.textContent = `You answered ${quizScore} out of ${QUIZ_QUESTIONS.length} questions correctly.`;
        }
      } else {
        quizIndex++;
        renderQuizQuestion();
      }
    });
  }

  if (quizRestartBtn) {
    quizRestartBtn.addEventListener('click', () => {
      quizIndex = 0;
      quizScore = 0;
      renderQuizQuestion();
    });
  }
  renderQuizQuestion();

  // ==========================================================================
  // 8. LAB MODULE 03B : 🚫 MYTH OR ✅ FACT MINI-GAME
  // ==========================================================================
  const MYTH_STATEMENTS = [
    {
      statement: '“If food looks and smells normal, it must be safe.”',
      fact: false,
      explain: 'MYTH — Many harmful pathogens do not alter the smell, taste, or appearance of food.',
    },
    {
      statement: '“Washing hands with soap is a critical part of food safety.”',
      fact: true,
      explain: 'FACT — Clean hands prevent the transfer of bacteria and viruses onto food and utensils.',
    },
    {
      statement: '“Raw and cooked food can always be kept together.”',
      fact: false,
      explain: 'MYTH — Storing them together causes cross-contamination from raw juices.',
    },
    {
      statement: '“Food safety is only the responsibility of restaurants.”',
      fact: false,
      explain: "MYTH — Food safety is everyone's responsibility at home, at school, and outside.",
    },
    {
      statement: '“Safe water is essential for food preparation and washing.”',
      fact: true,
      explain: 'FACT — Unsafe water contaminates ingredients during washing, cooking, and beverage prep.',
    },
    {
      statement: '“Cooking food thoroughly kills many harmful microbes.”',
      fact: true,
      explain: 'FACT — Proper thermal cooking is one of the WHO Five Keys to Safer Food.',
    },
  ];

  let mythIndex = 0;
  let mythScore = 0;
  let mythAnswered = false;

  const mythBadgeEl = document.getElementById('myth-badge');
  const mythStatementEl = document.getElementById('myth-statement');
  const mythButtonsEl = document.getElementById('myth-buttons');
  const mythFeedbackEl = document.getElementById('myth-feedback');
  const mythVerdictEl = document.getElementById('myth-verdict');
  const mythExplainEl = document.getElementById('myth-explain');
  const btnGuessMyth = document.getElementById('btn-guess-myth');
  const btnGuessFact = document.getElementById('btn-guess-fact');
  const mythNextBtn = document.getElementById('myth-next-btn');

  function renderMythCard() {
    const item = MYTH_STATEMENTS[mythIndex];
    if (!item) return;
    mythAnswered = false;

    if (mythBadgeEl) {
      mythBadgeEl.textContent = `0${mythIndex + 1} / 0${MYTH_STATEMENTS.length} · CORRECT: ${mythScore}`;
    }
    if (mythStatementEl) mythStatementEl.textContent = item.statement;
    if (mythButtonsEl) mythButtonsEl.hidden = false;
    if (mythFeedbackEl) mythFeedbackEl.hidden = true;
  }

  function answerMyth(guessedFact) {
    if (mythAnswered) return;
    mythAnswered = true;
    const item = MYTH_STATEMENTS[mythIndex];
    const isCorrect = guessedFact === item.fact;
    if (isCorrect) mythScore++;

    if (mythBadgeEl) {
      mythBadgeEl.textContent = `0${mythIndex + 1} / 0${MYTH_STATEMENTS.length} · CORRECT: ${mythScore}`;
    }
    if (mythButtonsEl) mythButtonsEl.hidden = true;
    if (mythFeedbackEl) mythFeedbackEl.hidden = false;

    if (mythVerdictEl) {
      mythVerdictEl.textContent = isCorrect
        ? `✅ Correct! It is a ${item.fact ? 'FACT' : 'MYTH'}.`
        : `❌ Not quite — it is actually a ${item.fact ? 'FACT' : 'MYTH'}.`;
      mythVerdictEl.className = `feedback-verdict ${isCorrect ? 'is-good' : 'is-bad'}`;
    }
    if (mythExplainEl) mythExplainEl.textContent = item.explain;
  }

  if (btnGuessMyth) btnGuessMyth.addEventListener('click', () => answerMyth(false));
  if (btnGuessFact) btnGuessFact.addEventListener('click', () => answerMyth(true));
  if (mythNextBtn) {
    mythNextBtn.addEventListener('click', () => {
      mythIndex = (mythIndex + 1) % MYTH_STATEMENTS.length;
      renderMythCard();
    });
  }
  renderMythCard();

  // ==========================================================================
  // 9. LAB MODULE 03C : ✅ MY DAILY FOOD SAFETY CHECKLIST (8 ITEMS)
  // ==========================================================================
  const DAILY_HABITS = [
    'Washed hands before eating',
    'Washed fruits / vegetables',
    'Used clean utensils',
    'Kept food covered',
    'Stored food safely',
    'Checked expiry / use-by information',
    'Kept raw and cooked food separate',
    'Used safe water',
  ];

  const dailyChecked = {};
  const dailyGridEl = document.getElementById('daily-checklist-grid');
  const dailyScoreBadge = document.getElementById('daily-score-badge');
  const dailyScoreFill = document.getElementById('daily-score-fill');

  function renderDailyChecklist() {
    if (!dailyGridEl) return;
    dailyGridEl.innerHTML = '';

    let count = 0;
    DAILY_HABITS.forEach((habit, idx) => {
      const isTick = !!dailyChecked[idx];
      if (isTick) count++;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `check-row-btn ${isTick ? 'is-checked' : ''}`;
      btn.innerHTML = `
        <span class="check-box">${isTick ? '✓' : ''}</span>
        <span class="check-text">${habit}</span>
      `;
      btn.addEventListener('click', () => {
        dailyChecked[idx] = !dailyChecked[idx];
        renderDailyChecklist();
      });
      dailyGridEl.appendChild(btn);
    });

    const pct = Math.round((count / DAILY_HABITS.length) * 100);
    if (dailyScoreBadge) dailyScoreBadge.textContent = `TODAY: ${pct}% (${count}/${DAILY_HABITS.length})`;
    if (dailyScoreFill) dailyScoreFill.style.width = `${pct}%`;
  }
  renderDailyChecklist();

  // ==========================================================================
  // 10. LAB MODULE 04 : 📊 NCSC SURVEY DASHBOARD (BAR, DONUT & LIVE EDITOR)
  // ==========================================================================
  const DEFAULT_SURVEY = {
    isCustom: false,
    total: 120,
    hand: 74,
    storage: 61,
    sep: 52,
    outside: 68,
    always: 45,
    sometimes: 38,
    rarely: 17,
  };

  let surveyState = { ...DEFAULT_SURVEY };

  const kpiTotalEl = document.getElementById('kpi-total');
  const kpiHandEl = document.getElementById('kpi-hand');
  const kpiStorageEl = document.getElementById('kpi-storage');
  const kpiSepEl = document.getElementById('kpi-sep');
  const kpiOutsideEl = document.getElementById('kpi-outside');
  const surveyModePill = document.getElementById('survey-mode-pill');
  const barChartStage = document.getElementById('bar-chart-stage');
  const pieChartStage = document.getElementById('pie-chart-stage');

  const toggleEditorBtn = document.getElementById('toggle-survey-editor');
  const editorDrawer = document.getElementById('survey-editor-drawer');
  const applySurveyBtn = document.getElementById('apply-survey-data');
  const resetSurveyBtn = document.getElementById('reset-survey-data');

  function renderSurveyDashboard() {
    if (kpiTotalEl) kpiTotalEl.textContent = String(surveyState.total);
    if (kpiHandEl) kpiHandEl.textContent = `${surveyState.hand}%`;
    if (kpiStorageEl) kpiStorageEl.textContent = `${surveyState.storage}%`;
    if (kpiSepEl) kpiSepEl.textContent = `${surveyState.sep}%`;
    if (kpiOutsideEl) kpiOutsideEl.textContent = `${surveyState.outside}%`;

    if (surveyModePill) {
      surveyModePill.textContent = surveyState.isCustom
        ? `ACTUAL FIELD SURVEY DATA (N = ${surveyState.total})`
        : `DEMO / ILLUSTRATIVE DATA (N = ${surveyState.total})`;
    }

    // 1. Render Bar Chart
    if (barChartStage) {
      const bars = [
        { label: 'Hand Hygiene (Soap 20s)', val: surveyState.hand, color: '#10b981' },
        { label: 'Outside Food Inspection', val: surveyState.outside, color: '#38bdf8' },
        { label: 'Safe Food Storage (<5°C)', val: surveyState.storage, color: '#14b8a6' },
        { label: 'Raw / Cooked Separation', val: surveyState.sep, color: '#fbbf24' },
      ];

      barChartStage.innerHTML = bars
        .map(
          (b) => `
          <div class="bar-row">
            <div class="bar-meta">
              <span class="bar-lbl">${b.label}</span>
              <span class="bar-val">${b.val}%</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${b.val}%; background: ${b.color};"></div>
            </div>
          </div>
        `
        )
        .join('');
    }

    // 2. Render SVG Donut / Pie Chart
    if (pieChartStage) {
      const sum = Math.max(1, surveyState.always + surveyState.sometimes + surveyState.rarely);
      const pAlways = Math.round((surveyState.always / sum) * 100);
      const pSometimes = Math.round((surveyState.sometimes / sum) * 100);
      const pRarely = Math.max(0, 100 - pAlways - pSometimes);

      // Circle circumference for r=54 is 2 * PI * 54 ≈ 339.29
      const C = 339.29;
      const len1 = (pAlways / 100) * C;
      const len2 = (pSometimes / 100) * C;
      const len3 = (pRarely / 100) * C;

      pieChartStage.innerHTML = `
        <div class="donut-layout">
          <svg viewBox="0 0 140 140" class="donut-svg" aria-label="Practice frequency distribution chart">
            <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="16" />
            <!-- Segment 1: Always -->
            <circle cx="70" cy="70" r="54" fill="none" stroke="#10b981" stroke-width="16"
              stroke-dasharray="${len1} ${C}" stroke-dashoffset="0" transform="rotate(-90 70 70)" />
            <!-- Segment 2: Sometimes -->
            <circle cx="70" cy="70" r="54" fill="none" stroke="#38bdf8" stroke-width="16"
              stroke-dasharray="${len2} ${C}" stroke-dashoffset="${-len1}" transform="rotate(-90 70 70)" />
            <!-- Segment 3: Rarely -->
            <circle cx="70" cy="70" r="54" fill="none" stroke="#fbbf24" stroke-width="16"
              stroke-dasharray="${len3} ${C}" stroke-dashoffset="${-(len1 + len2)}" transform="rotate(-90 70 70)" />
            <text x="70" y="66" text-anchor="middle" fill="#f4fbf8" font-size="16" font-weight="700">N=${surveyState.total}</text>
            <text x="70" y="82" text-anchor="middle" fill="#c5ded6" font-size="8" letter-spacing="1">RESPONDENTS</text>
          </svg>
          <div class="donut-legend">
            <div class="legend-item">
              <span class="legend-swatch" style="background:#10b981;"></span>
              <div>
                <strong>Always Practice (${pAlways}%)</strong>
                <span>Consistent daily food safety habits</span>
              </div>
            </div>
            <div class="legend-item">
              <span class="legend-swatch" style="background:#38bdf8;"></span>
              <div>
                <strong>Sometimes Practice (${pSometimes}%)</strong>
                <span>Aware of rules but inconsistent</span>
              </div>
            </div>
            <div class="legend-item">
              <span class="legend-swatch" style="background:#fbbf24;"></span>
              <div>
                <strong>Rarely Practice (${pRarely}%)</strong>
                <span>High risk of foodborne exposure</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  if (toggleEditorBtn && editorDrawer) {
    toggleEditorBtn.addEventListener('click', () => {
      editorDrawer.hidden = !editorDrawer.hidden;
    });
  }

  if (applySurveyBtn) {
    applySurveyBtn.addEventListener('click', () => {
      const clampPct = (id, fallback) => {
        const el = document.getElementById(id);
        const v = el ? parseInt(el.value, 10) : fallback;
        return Number.isNaN(v) ? fallback : Math.min(100, Math.max(0, v));
      };
      const totalEl = document.getElementById('inp-total');
      const totalVal = totalEl ? Math.max(1, parseInt(totalEl.value, 10) || 120) : 120;

      surveyState = {
        isCustom: true,
        total: totalVal,
        hand: clampPct('inp-hand', 74),
        storage: clampPct('inp-storage', 61),
        sep: clampPct('inp-sep', 52),
        outside: clampPct('inp-outside', 68),
        always: clampPct('inp-always', 45),
        sometimes: clampPct('inp-sometimes', 38),
        rarely: clampPct('inp-rarely', 17),
      };
      renderSurveyDashboard();
      if (editorDrawer) editorDrawer.hidden = true;
    });
  }

  if (resetSurveyBtn) {
    resetSurveyBtn.addEventListener('click', () => {
      surveyState = { ...DEFAULT_SURVEY };
      const setVal = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.value = String(v);
      };
      setVal('inp-total', DEFAULT_SURVEY.total);
      setVal('inp-hand', DEFAULT_SURVEY.hand);
      setVal('inp-storage', DEFAULT_SURVEY.storage);
      setVal('inp-sep', DEFAULT_SURVEY.sep);
      setVal('inp-outside', DEFAULT_SURVEY.outside);
      setVal('inp-always', DEFAULT_SURVEY.always);
      setVal('inp-sometimes', DEFAULT_SURVEY.sometimes);
      setVal('inp-rarely', DEFAULT_SURVEY.rarely);
      renderSurveyDashboard();
    });
  }
  renderSurveyDashboard();

  // ==========================================================================
  // 11. LAB MODULE 05A : 🏆 7-DAY FOOD HYGIENE CHALLENGE TRACKER
  // ==========================================================================
  const CHALLENGE_DAYS = [
    {
      day: 1,
      title: 'Hand Hygiene',
      text: 'Wash hands with soap for 20s before every meal and after handling raw food.',
    },
    {
      day: 2,
      title: 'Clean Utensils & Surfaces',
      text: 'Wash all cutting boards, knives and prep surfaces before and after cooking.',
    },
    {
      day: 3,
      title: 'Wash Fruits & Vegetables',
      text: 'Rinse all fresh produce thoroughly under clean running water.',
    },
    {
      day: 4,
      title: 'Cover Food',
      text: 'Keep cooked meals and stored food covered from dust and flies all day.',
    },
    {
      day: 5,
      title: 'Separate Raw & Cooked',
      text: 'Use separate cutting boards and store raw meat below cooked food.',
    },
    {
      day: 6,
      title: 'Check Storage & Expiry',
      text: 'Check refrigerator storage and inspect all expiry / use-by dates.',
    },
    {
      day: 7,
      title: 'Be a Smart Consumer',
      text: 'Observe vendor hygiene, water safety and food covering before eating outside.',
    },
  ];

  const completedDays = {};
  const challengeGridEl = document.getElementById('challenge-7grid');
  const challengePctBadge = document.getElementById('challenge-pct-badge');
  const challengeProgressFill = document.getElementById('challenge-progress-fill');
  const championBanner = document.getElementById('champion-banner');
  const challengeResetBtn = document.getElementById('challenge-reset-btn');

  function renderChallenge() {
    if (!challengeGridEl) return;
    challengeGridEl.innerHTML = '';

    let doneCount = 0;
    CHALLENGE_DAYS.forEach((d) => {
      const isDone = !!completedDays[d.day];
      if (isDone) doneCount++;

      const card = document.createElement('button');
      card.type = 'button';
      card.className = `challenge-day-card ${isDone ? 'is-completed' : ''}`;
      card.innerHTML = `
        <div class="day-card-top">
          <span class="day-num">DAY 0${d.day}</span>
          <span class="check-box">${isDone ? '✓' : ''}</span>
        </div>
        <h4 class="day-title">${d.title}</h4>
        <p class="day-desc">${d.text}</p>
      `;
      card.addEventListener('click', () => {
        completedDays[d.day] = !completedDays[d.day];
        renderChallenge();
      });
      challengeGridEl.appendChild(card);
    });

    const pct = Math.round((doneCount / CHALLENGE_DAYS.length) * 100);
    if (challengePctBadge) {
      challengePctBadge.textContent = `${pct}% COMPLETED (${doneCount}/7 DAYS)`;
    }
    if (challengeProgressFill) {
      challengeProgressFill.style.width = `${pct}%`;
    }
    if (championBanner) {
      championBanner.hidden = doneCount < CHALLENGE_DAYS.length;
    }
  }

  if (challengeResetBtn) {
    challengeResetBtn.addEventListener('click', () => {
      Object.keys(completedDays).forEach((k) => delete completedDays[k]);
      renderChallenge();
    });
  }
  renderChallenge();

  // ==========================================================================
  // 12. LAB MODULE 05B : 📢 AWARENESS WALL & CUSTOM PNG POSTER STUDIO
  // ==========================================================================
  const SLOGANS = [
    { slogan: 'Clean Hands. Safe Food. Healthy Life.', tag: 'HAND HYGIENE' },
    { slogan: 'Separate Raw. Protect Cooked.', tag: 'CROSS-CONTAMINATION' },
    { slogan: 'Before You Eat — Check Your Hygiene.', tag: 'EVERYDAY HABIT' },
    { slogan: 'Food Safety Starts With You.', tag: 'PERSONAL ACTION' },
    { slogan: "Safe Food Is Everyone's Responsibility.", tag: 'COMMUNITY HEALTH' },
    { slogan: "Don't Just Know. Practice.", tag: 'NCSC PLEDGE' },
  ];

  const sloganWallGrid = document.getElementById('slogan-wall-grid');
  const posterNameInput = document.getElementById('poster-name-input');
  const posterSloganSelect = document.getElementById('poster-slogan-select');
  const posterSloganDisplay = document.getElementById('poster-slogan-display');
  const posterAuthorDisplay = document.getElementById('poster-author-display');
  const btnGeneratePoster = document.getElementById('btn-generate-poster');
  const btnDownloadPoster = document.getElementById('btn-download-poster');

  function updatePosterPreview(customSlogan) {
    const rawName = posterNameInput && posterNameInput.value.trim();
    const authorName = rawName || 'FoodSafe Steward (Class XI)';
    const chosenSlogan =
      customSlogan ||
      (posterSloganSelect ? posterSloganSelect.value : 'Food Safety Starts With Me.');

    if (posterSloganDisplay) posterSloganDisplay.textContent = `“${chosenSlogan}”`;
    if (posterAuthorDisplay) posterAuthorDisplay.textContent = `— ${authorName}`;
  }

  if (sloganWallGrid) {
    sloganWallGrid.innerHTML = '';
    SLOGANS.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'slogan-poster-card';
      card.innerHTML = `
        <div class="slogan-card-top">
          <span class="slogan-idx">POSTER 0${idx + 1}</span>
          <span class="slogan-jp">${item.tag}</span>
        </div>
        <p class="slogan-quote">“${item.slogan}”</p>
        <div class="slogan-card-foot">
          <span>FOODSAFE · LIVING HYGIENE</span>
          <span class="slogan-use-link">USE SLOGAN →</span>
        </div>
      `;
      card.addEventListener('click', () => {
        if (posterSloganSelect) {
          let found = false;
          for (let i = 0; i < posterSloganSelect.options.length; i++) {
            if (posterSloganSelect.options[i].value === item.slogan) {
              posterSloganSelect.selectedIndex = i;
              found = true;
              break;
            }
          }
          if (!found) {
            const opt = document.createElement('option');
            opt.value = item.slogan;
            opt.textContent = item.slogan;
            posterSloganSelect.appendChild(opt);
            posterSloganSelect.value = item.slogan;
          }
        }
        updatePosterPreview(item.slogan);
      });
      sloganWallGrid.appendChild(card);
    });
  }

  if (btnGeneratePoster) {
    btnGeneratePoster.addEventListener('click', () => updatePosterPreview());
  }
  if (posterNameInput) {
    posterNameInput.addEventListener('input', () => updatePosterPreview());
  }
  if (posterSloganSelect) {
    posterSloganSelect.addEventListener('change', () => updatePosterPreview());
  }

  // High-Resolution HTML5 Canvas Poster PNG Downloader
  if (btnDownloadPoster) {
    btnDownloadPoster.addEventListener('click', () => {
      const c = document.createElement('canvas');
      c.width = 1200;
      c.height = 675;
      const ctx = c.getContext('2d');

      // Sylva Living Green background gradient
      const bg = ctx.createLinearGradient(0, 0, 1200, 675);
      bg.addColorStop(0, '#23271f');
      bg.addColorStop(0.55, '#34392e');
      bg.addColorStop(1, '#44483d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1200, 675);

      // Glowing Living Green Orb in top-right background
      const orbGrad = ctx.createRadialGradient(960, 180, 10, 960, 180, 260);
      orbGrad.addColorStop(0, 'rgba(142, 201, 71, 0.36)');
      orbGrad.addColorStop(0.5, 'rgba(217, 235, 184, 0.14)');
      orbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(960, 180, 260, 0, Math.PI * 2);
      ctx.fill();

      // Border frame
      ctx.strokeStyle = 'rgba(142, 201, 71, 0.65)';
      ctx.lineWidth = 3;
      ctx.strokeRect(42, 42, 1116, 591);

      // Top Eyebrow
      ctx.fillStyle = '#8ec947';
      ctx.font = '600 18px Lexend, Inter, Arial, sans-serif';
      ctx.fillText('FOODSAFE — NCSC LIVING HYGIENE PLEDGE (2026–27)', 90, 115);

      // Slogan Text
      const sloganText = posterSloganDisplay
        ? posterSloganDisplay.textContent
        : '“Food Safety Starts With Me.”';
      ctx.fillStyle = '#ffffff';
      ctx.font = '400 44px Lexend, Inter, Arial, sans-serif';
      ctx.fillText(sloganText, 90, 310);

      // Author
      const authorText = posterAuthorDisplay
        ? posterAuthorDisplay.textContent
        : '— FoodSafe Steward (Class XI)';
      ctx.fillStyle = '#d9ebb8';
      ctx.font = '500 28px Lexend, Inter, Arial, sans-serif';
      ctx.fillText(authorText, 90, 395);

      // Footer Metadata
      ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
      ctx.font = '400 16px Lexend, Inter, Arial, sans-serif';
      ctx.fillText(
        'National Children’s Science Congress (NCSC) · Food & Hygiene Habits Study · NCSC Living Green Study',
        90,
        575
      );

      const link = document.createElement('a');
      link.download = 'FoodSafe-NCSC-Poster.png';
      link.href = c.toDataURL('image/png');
      link.click();
    });
  }
})();
