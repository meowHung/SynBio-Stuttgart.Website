/**
 * SynBio Stuttgart - Interactive Features & Wireframe System
 * Project Discography, Instant Sponsor Explorer, WIP Manager, Dropdowns, Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initWipSystem();
  initMobileNav();
  initNavDropdowns();
  initProjectDiscography();
  initSponsorExplorer();
  initScrollAnimations();
});

/* ==========================================================================
   1. Theme Management (Light / Dark with Orbital Sun & Moon Animation)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const rootEl = document.documentElement;

  function applyTheme(theme) {
    rootEl.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
      themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  // Initial theme check
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {}
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = rootEl.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      applyTheme(next);
    });
  }
}

/* ==========================================================================
   2. Work In Progress (WIP) System & Status Modal
   ========================================================================== */
function initWipSystem() {
  const wipBar = document.getElementById('wipBar');
  const wipBarClose = document.getElementById('wipBarClose');
  const wipModal = document.getElementById('wipModal');
  const wipModalClose = document.getElementById('wipModalClose');
  const openWipModalBtns = document.querySelectorAll('.open-wip-modal');
  const floatingPill = document.getElementById('wipFloatingPill');

  const STORAGE_KEY = 'synbio_wip_bar_dismissed';
  let isDismissed = false;
  try {
    isDismissed = localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (e) {}

  if (wipBar && isDismissed) {
    wipBar.classList.add('is-hidden');
    if (floatingPill) floatingPill.style.display = 'inline-flex';
  }

  if (wipBarClose && wipBar) {
    wipBarClose.addEventListener('click', () => {
      wipBar.classList.add('is-hidden');
      if (floatingPill) floatingPill.style.display = 'inline-flex';
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch (e) {}
    });
  }

  // Open WIP Modal
  openWipModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (wipModal) wipModal.classList.add('is-open');
    });
  });

  // Close WIP Modal
  if (wipModalClose && wipModal) {
    wipModalClose.addEventListener('click', () => {
      wipModal.classList.remove('is-open');
    });

    wipModal.addEventListener('click', (e) => {
      if (e.target === wipModal) {
        wipModal.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wipModal.classList.contains('is-open')) {
        wipModal.classList.remove('is-open');
      }
    });
  }

  if (floatingPill) {
    floatingPill.addEventListener('click', () => {
      if (wipModal) wipModal.classList.add('is-open');
    });
  }
}

/* ==========================================================================
   3. Mobile Navigation Drawer & Dropdowns
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById('mobileNavToggle') || document.getElementById('navToggle');
  // Support new split-nav structure
  const navLeft = document.querySelector('.nav-links-left');
  const navRight = document.querySelector('.nav-right');
  const navWrap = document.getElementById('navWrap') || document.getElementById('siteNav');

  if (!navToggle) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('is-active', isOpen);

    // Toggle new split structure
    if (navLeft) navLeft.classList.toggle('is-open', isOpen);
    if (navRight) navRight.classList.toggle('is-open', isOpen);

    // Fallback for old nav-wrap structure
    if (navWrap && !navLeft) {
      navWrap.classList.toggle('is-open', isOpen);
    }
  });

  // Close mobile drawer when clicking regular nav links
  const allNavLinks = [navLeft, navRight, navWrap].filter(Boolean);
  allNavLinks.forEach(container => {
    container.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach((link) => {
      link.addEventListener('click', () => {
        if (navLeft) navLeft.classList.remove('is-open');
        if (navRight) navRight.classList.remove('is-open');
        if (navWrap) navWrap.classList.remove('is-open', 'open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  });
}

function initNavDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      // In mobile view, toggle the dropdown
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dd.classList.toggle('open');
      }
    });

    dd.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        dd.classList.add('open');
      }
    });

    dd.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        dd.classList.remove('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    dropdowns.forEach((dd) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   4. Project Discography (Interactive Timeline & Carousel)
   ========================================================================== */
// Ordered oldest -> newest so the discography reads left (lowest) to right (highest)
const PROJECTS_DATA = [
  {
    year: '2017',
    title: 'LOTP',
    subtitle: 'Light of the Pipe',
    desc: 'Environmentally safe microbial breakdown of fats, oils, and greases in plumbing systems, eliminating chemical drain cleaners.',
    link: 'projects/LOTP/index_LOTP.html',
    icon: '🧪',
    badge: 'iGEM 2017'
  },
  {
    year: '2018',
    title: 'TAGC',
    subtitle: 'Anti-Germ Bio Coating',
    desc: 'Bio-active coatings that naturally inhibit bacterial colonization, engineered for clinical environments and hospital equipment.',
    link: 'projects/TAGC/index_TAGC.html',
    icon: '🛡️',
    badge: 'iGEM 2018'
  },
  {
    year: '2019',
    title: 'PhyCoVi',
    subtitle: 'PhyCoVi',
    desc: 'Accelerating molecular cloning workflows by utilizing Vibrio natriegens as a super-fast synthetic biology chassis with optimized metabolic pathways.',
    link: 'projects/PhyCoVi/index_PhyCoVi.html',
    icon: '🧬',
    badge: 'iGEM 2019'
  },
  {
    year: '2020',
    title: 'LAC-MAN',
    subtitle: 'Enzymatic Micropollutant Breakdown',
    desc: 'Purification and genetic optimization of bacterial laccases to neutralize endocrine disruptors and pharmaceutical residues in modern municipal wastewater systems.',
    link: 'projects/lac-man/index_lac-man.html',
    icon: '💧',
    badge: 'iGEM 2020'
  },
  {
    year: '2021',
    title: 'TARDISUN',
    subtitle: 'UV & Radiation Cellular Defense',
    desc: 'Harnessing the tardigrade damage suppressor protein (Dsup) to protect human cells and bio-systems against intense ultraviolet exposure and ionizing radiation.',
    link: 'projects/tardisun/index_tardisun.html',
    icon: '☀️',
    badge: 'iGEM 2021'
  },
  {
    year: '2023',
    title: 'DENTOZYM',
    subtitle: 'Oral Health Enzymatic Therapy',
    desc: 'iGEM is an international not-for-profit organization dedicated to advancing the field of synthetic biology and building the global synbio workforce through education and competition, while cultivating an open, collaborative and cooperative community.',
    link: 'projects/dentozym/index_dentozym.html',
    icon: '🦷',
    badge: 'iGEM 2023'
  },
  {
    year: '2025',
    title: 'ARALEX',
    subtitle: 'Advanced Biosensing Platform',
    desc: 'Synthetic cellular circuitry engineered for ultra-sensitive biochemical diagnostics, environmental toxin detection, and real-time cellular response measurement.',
    link: 'projects/aralex/index_aralex.html',
    icon: '⚡',
    badge: 'Diagnostic Tools'
  },
  {
    year: '2027',
    title: 'brobiotics',
    subtitle: 'Current Research Project',
    desc: 'iGEM is an international not-for-profit organization dedicated to advancing synthetic biology. Brobiotics focuses on engineered gut microbiome therapeutics and synthetic microbial consortia.',
    link: 'projects/brobiotics/index_brobiotics.html',
    icon: '🦠',
    badge: 'Active Research'
  }
];

function initProjectDiscography() {
  const container = document.getElementById('projectDiscography');
  if (!container) return;

  const nodesList = document.getElementById('discoNodes');
  const boxesWrap = document.getElementById('discoBoxes');
  const prevBtn = document.getElementById('discoPrev');
  const nextBtn = document.getElementById('discoNext');

  const activeCard = document.getElementById('discoActiveCard');
  const cardInner = document.getElementById('discoCardInner');
  const cardTitle = document.getElementById('discoTitle');
  const cardDesc = document.getElementById('discoDesc');

  // Build one timeline node and one grey box per project (oldest left, newest right)
  const nodes = [];
  const boxes = [];
  PROJECTS_DATA.forEach((project, idx) => {
    const li = document.createElement('li');
    li.className = 'disco-node';
    li.innerHTML = `
      <button type="button" class="timeline-node-btn" role="tab" data-year="${project.year}">
        <span class="timeline-node-circle"></span>
        <span class="timeline-node-year">${project.year}</span>
      </button>`;
    li.querySelector('button').addEventListener('click', () => updateDiscography(idx));
    nodesList.appendChild(li);
    nodes.push(li);

    const box = document.createElement('div');
    box.className = 'disco-box';
    box.setAttribute('aria-label', `${project.year} ${project.title}`);
    box.addEventListener('click', () => updateDiscography(idx));
    boxesWrap.appendChild(box);
    boxes.push(box);
  });

  // Keep the card height fixed: stack an invisible copy of the longest description under the real one
  if (cardDesc) {
    const longest = PROJECTS_DATA.reduce((a, p) => (p.desc.length > a.length ? p.desc : a), '');
    const descWrap = document.createElement('div');
    descWrap.className = 'purple-card-desc-wrap';
    const sizer = document.createElement('p');
    sizer.className = 'purple-card-desc purple-card-desc-sizer';
    sizer.setAttribute('aria-hidden', 'true');
    sizer.textContent = longest;
    cardDesc.replaceWith(descWrap);
    descWrap.append(cardDesc, sizer);
  }

  // Wireframe defaults to 2023 (DentoZym)
  let currentIndex = PROJECTS_DATA.findIndex(p => p.year === '2023');
  if (currentIndex === -1) currentIndex = 0;
  let cardTimer = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateDiscography(index, animate = true) {
    index = Math.max(0, Math.min(PROJECTS_DATA.length - 1, index));
    if (animate && index === currentIndex) return;
    // Newer project -> content leaves to the left and the next one comes in from the right
    const direction = index > currentIndex ? 1 : -1;
    currentIndex = index;
    const project = PROJECTS_DATA[currentIndex];

    // Position every node/box by its distance from the active project (CSS clamps to +-3)
    [nodes, boxes].forEach((items) => {
      items.forEach((el, idx) => {
        const offset = Math.max(-3, Math.min(3, idx - currentIndex));
        el.setAttribute('data-offset', offset);
      });
    });
    nodes.forEach((li, idx) => {
      li.querySelector('button').setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
    });

    const fillCard = () => {
      if (cardTitle) cardTitle.textContent = project.title;
      if (cardDesc) cardDesc.textContent = project.desc;
    };
    clearTimeout(cardTimer);
    if (!animate || reduceMotion || !activeCard || !cardInner) {
      fillCard();
      return updateArrows();
    }

    // 1. Shrink the card and slide the current content out
    activeCard.classList.add('is-switching');
    cardInner.classList.remove('is-out-left', 'is-out-right');
    cardInner.classList.add(direction > 0 ? 'is-out-left' : 'is-out-right');

    cardTimer = setTimeout(() => {
      // 2. Swap content (the card keeps its height, see the sizer above)
      fillCard();

      // 3. Grow the card back and bring the new content in from the opposite side
      activeCard.classList.remove('is-switching');
      cardInner.style.transition = 'none';
      cardInner.classList.remove('is-out-left', 'is-out-right');
      cardInner.classList.add(direction > 0 ? 'is-out-right' : 'is-out-left');
      void cardInner.offsetWidth;
      cardInner.style.transition = '';
      cardInner.classList.remove('is-out-left', 'is-out-right');
    }, 220);

    updateArrows();
  }

  function updateArrows() {
    if (prevBtn) prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    if (nextBtn) nextBtn.style.visibility = currentIndex < PROJECTS_DATA.length - 1 ? 'visible' : 'hidden';
  }

  if (prevBtn) prevBtn.addEventListener('click', () => updateDiscography(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateDiscography(currentIndex + 1));

  // Keyboard navigation when focused
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') updateDiscography(currentIndex - 1);
    else if (e.key === 'ArrowRight') updateDiscography(currentIndex + 1);
  });

  // Initial load: place everything without the glide, then turn transitions back on
  container.classList.add('is-instant');
  updateDiscography(currentIndex, false);
  void container.offsetWidth;
  container.classList.remove('is-instant');
}

/* ==========================================================================
   5. Instant Sponsor Explorer with Filter Tabs, Live Search & Smooth Fades
   ========================================================================== */
function initSponsorExplorer() {
  const tabBtns = document.querySelectorAll('.sponsor-tab-btn');
  const searchInput = document.getElementById('sponsorSearchInput');
  const cards = document.querySelectorAll('.sponsor-card');
  const emptyState = document.getElementById('sponsorsEmptyState');
  const resetBtn = document.getElementById('btnResetSponsors');

  if (!cards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';
  const hideTimeouts = new Map();

  function filterSponsors() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = (card.getAttribute('data-category') || '').toLowerCase();
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();

      const matchesCat = activeCategory === 'all' || category.includes(activeCategory);
      const matchesSearch = !searchQuery || 
                            name.includes(searchQuery) || 
                            keywords.includes(searchQuery);

      if (hideTimeouts.has(card)) {
        clearTimeout(hideTimeouts.get(card));
        hideTimeouts.delete(card);
      }

      if (matchesCat && matchesSearch) {
        visibleCount++;
        card.classList.remove('is-hidden');
        requestAnimationFrame(() => {
          card.classList.remove('is-fading-out');
        });
      } else {
        card.classList.add('is-fading-out');
        const timer = setTimeout(() => {
          if (card.classList.contains('is-fading-out')) {
            card.classList.add('is-hidden');
          }
          hideTimeouts.delete(card);
        }, 300);
        hideTimeouts.set(card, timer);
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
        requestAnimationFrame(() => {
          emptyState.style.opacity = '1';
        });
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  // Category Tabs
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      activeCategory = (btn.getAttribute('data-filter') || 'all').toLowerCase();
      filterSponsors();
    });
  });

  // Search Input (Real-time live search)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterSponsors();
    });
  }

  // Reset Filters button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      tabBtns.forEach(b => {
        const isAll = (b.getAttribute('data-filter') || '') === 'all';
        b.classList.toggle('is-active', isAll);
        b.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });
      filterSponsors();
    });
  }
}

/* ==========================================================================
   6. Scroll Reveal Micro-Animations
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
