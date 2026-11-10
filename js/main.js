/**
 * main.js (v2.0)
 * High-performance, dynamic interactive logic for Methun Raj A's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initTheme();
  initTypewriter();
  initNavbar();
  initProjects();
  initSkillsFilter();
  initTerminal();
  initResumeModal();
  initCounters();
  initClipboardActions();
  initContactForm();
  initBackToTop();
  initMobileMenu();
  initAos();
});

/* ==========================================================================
   SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   THEME TOGGLE SYSTEM (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('methun_portfolio_theme');
  
  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('methun_portfolio_theme', 'dark');
        showToast('Switched to Dark Theme', 'fa-moon');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('methun_portfolio_theme', 'light');
        showToast('Switched to Light Theme', 'fa-sun');
      }
    });
  }
}

/* ==========================================================================
   TYPEWRITER EFFECT FOR HERO ROLES
   ========================================================================== */
function initTypewriter() {
  const roleElement = document.getElementById('typewriter-text');
  if (!roleElement) return;

  const roles = [
    "Front-End Developer",
    "React.js & TypeScript Engineer",
    "Deep Learning & AI Explorer",
    "Computer Science Scholar @ SJIT",
    "Full-Stack Web Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (mobileNav.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ==========================================================================
   DYNAMIC PROJECT SHOWCASE, SEARCH & FILTER
   ========================================================================== */
let activeCategory = 'all';
let searchKeyword = '';

function initProjects() {
  const container = document.getElementById('projects-container');
  const searchInput = document.getElementById('project-search');
  const searchCounter = document.getElementById('search-counter');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!container || typeof portfolioProjects === 'undefined') return;

  function renderFilteredProjects() {
    const q = searchKeyword.trim().toLowerCase();

    const filtered = portfolioProjects.filter(project => {
      const matchesCategory = (activeCategory === 'all' || project.category === activeCategory);
      if (!matchesCategory) return false;

      if (!q) return true;

      const titleMatch = project.title.toLowerCase().includes(q);
      const subtitleMatch = (project.subtitle || '').toLowerCase().includes(q);
      const descMatch = (project.description || '').toLowerCase().includes(q);
      const tagMatch = project.tags.some(t => t.toLowerCase().includes(q));

      return titleMatch || subtitleMatch || descMatch || tagMatch;
    });

    if (searchCounter) {
      searchCounter.textContent = `${filtered.length} of ${portfolioProjects.length} Projects`;
    }

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">No matching projects found</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem;">Try another keyword like "React", "Python", "Deep Learning", or clear the search.</p>
          <button id="reset-search-btn" class="btn btn-secondary btn-sm"><i class="fa-solid fa-arrow-rotate-left"></i> Reset Filter</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-search-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          searchKeyword = '';
          activeCategory = 'all';
          filterButtons.forEach(b => b.classList.remove('active'));
          const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
          if (allBtn) allBtn.classList.add('active');
          renderFilteredProjects();
        });
      }
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-category', project.category);

      const thumbnailHtml = project.image 
        ? `<div class="project-thumbnail">
             <img src="${project.image}" alt="${project.title}" loading="lazy">
             <span class="project-badge-top">${project.badge}</span>
           </div>`
        : `<div class="project-thumbnail">
             <div class="project-placeholder-preview">
               <i class="${project.icon || 'fa-solid fa-code'}"></i>
               <span>${project.categoryLabel}</span>
             </div>
             <span class="project-badge-top">${project.badge}</span>
           </div>`;

      const tagsHtml = project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
      const highlightsHtml = project.highlights.slice(0, 2).map(h => `<li><i class="fa-solid fa-check"></i> <span>${h}</span></li>`).join('');

      card.innerHTML = `
        ${thumbnailHtml}
        <div class="project-body">
          <span class="project-category">${project.categoryLabel}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <ul class="project-highlights">
            ${highlightsHtml}
          </ul>
          <div class="project-tags">
            ${tagsHtml}
          </div>
          <div class="project-footer">
            <button class="btn btn-primary btn-sm view-project-btn" data-project-id="${project.id}">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Case Study
            </button>
            <div class="project-links">
              <a href="https://github.com/Methun-raj" target="_blank" rel="noopener noreferrer" class="btn-icon" title="View Source Code">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#contact" class="btn-icon" title="Discuss Project">
                <i class="fa-solid fa-comments"></i>
              </a>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll('.view-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-project-id');
        openProjectModal(pId);
      });
    });
  }

  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      renderFilteredProjects();
    });
  });

  // Search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value;
      renderFilteredProjects();
    });
  }

  // Initial render
  renderFilteredProjects();
  setupProjectModal();
}

/* ==========================================================================
   DYNAMIC SKILLS CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!tabBtns.length || !skillCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetGroup = btn.getAttribute('data-skill-group');

      skillCards.forEach(card => {
        const group = card.getAttribute('data-skill-group');
        if (targetGroup === 'all' || group === targetGroup) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   INTERACTIVE DEVELOPER TERMINAL
   ========================================================================== */
function initTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const quickPills = document.querySelectorAll('.term-pill');

  if (!terminalBody || !terminalInput) return;

  const commandResponses = {
    help: `Available commands:
• <span style="color: #67e8f9;">bio</span> - About Methun Raj
• <span style="color: #67e8f9;">skills</span> - Core technical competencies
• <span style="color: #67e8f9;">experience</span> - Industry internships
• <span style="color: #67e8f9;">projects</span> - Featured engineering builds
• <span style="color: #67e8f9;">contact</span> - Direct phone & email
• <span style="color: #67e8f9;">clear</span> - Clear terminal output`,

    bio: `<strong>Methun Raj A</strong>
B.E. Computer Science @ St. Joseph's Institute of Technology, Chennai (CGPA: 7.9/10).
Specialized in building responsive, component-driven web architectures (React.js, TypeScript) and deep learning medical vision (ORF-Netv2 CT rib fracture diagnostics).`,

    skills: `<strong>Technical Skills Stack:</strong>
• <strong>Frontend:</strong> React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3/SCSS, Bootstrap
• <strong>Languages:</strong> Java, Python, C, SQL, NoSQL
• <strong>Backend & DB:</strong> Node.js, Express, Spring Boot, MongoDB, MySQL, Supabase
• <strong>Tools & AI:</strong> Git/GitHub, Docker, Postman, TensorFlow, OpenCV, Streamlit, Figma`,

    experience: `<strong>Professional Experience:</strong>
1. <strong>Vault of Codes, Chennai</strong> (June 2025 - July 2025)
   Front End Developer Intern • React.js, Forms, Recipe Cards, Resume Builder
2. <strong>TechSonix, Chennai</strong> (May 2025 - June 2025)
   Front End Developer Intern • HTML5/CSS3, JavaScript, Bootstrap UI/UX`,

    projects: `<strong>Featured Builds:</strong>
• <strong>Rib Fracture Detection:</strong> Deep learning ORF-Netv2 (+25% accuracy gain, omni-supervised)
• <strong>Smart Resume Builder:</strong> React-based live ATS resume crafting tool
• <strong>Recipe & Nutrition Explorer:</strong> Asynchronous REST API food discovery engine
• <strong>Dynamic Form System:</strong> Enterprise multi-step validated form wizard`,

    contact: `<strong>Get In Touch:</strong>
• Email: <a href="mailto:methunraj793@gmail.com" style="color: #38bdf8;">methunraj793@gmail.com</a>
• Phone: <a href="tel:+917200631896" style="color: #38bdf8;">+91 72006 31896</a>
• Location: Chennai, Tamil Nadu, India
• Available for Software Engineering Roles & Internships!`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      terminalBody.innerHTML = `<div>Type <span style="color: var(--accent-secondary);">'help'</span> or click the pills above to inspect interactive profiles.</div>`;
      return;
    }

    const commandEntry = document.createElement('div');
    commandEntry.style.marginTop = '0.5rem';
    commandEntry.innerHTML = `<span style="color: var(--accent-success);">visitor@methun-portfolio:~$</span> <span style="color: #ffffff;">${cmd}</span>`;
    terminalBody.appendChild(commandEntry);

    const responseEntry = document.createElement('div');
    responseEntry.style.margin = '0.35rem 0 0.8rem 0';

    if (commandResponses[cmd]) {
      responseEntry.innerHTML = commandResponses[cmd].replace(/\n/g, '<br>');
    } else {
      responseEntry.innerHTML = `<span style="color: #f87171;">Command not found: "${cmd}". Type <span style="color: var(--accent-secondary);">'help'</span> for available commands.</span>`;
    }

    terminalBody.appendChild(responseEntry);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
}

/* ==========================================================================
   ATS RESUME MODAL & PRINT HANDLER
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-close-btn');
  const printBtn = document.getElementById('print-resume-btn');
  const copyPlainBtn = document.getElementById('copy-plain-resume-btn');
  const triggers = document.querySelectorAll('.view-resume-trigger');

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach(t => t.addEventListener('click', openResume));
  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyPlainBtn) {
    copyPlainBtn.addEventListener('click', () => {
      const plainText = `METHUN RAJ A
Chennai, Tamil Nadu, India | methunraj793@gmail.com | +91 72006 31896

EDUCATION
• St. Joseph's Institute of Technology: BE in Computer Science (Sept 2023 – Present) | CGPA: 7.9/10.0
• St Ann's Matric Hr Sec School (Sept 2022 – 2023) | HSC: 75.83%

EXPERIENCE
• Front End Developer Intern @ Vault of Codes, Chennai (June 2025 – July 2025)
  - React.js, responsive applications, dynamic forms, recipe cards, resume builder.
• Front End Developer Intern @ TechSonix, Chennai (May 2025 – June 2025)
  - HTML, CSS, JavaScript, Bootstrap, responsive design, API integration.

PROJECTS
• Rib Fracture Detection using Deep Learning (ORF-Netv2, Python, TensorFlow, Streamlit)
  - Omni-supervised CT rib fracture detection, +25% accuracy gain.
• Smart Dynamic Resume Builder (React.js, LocalStorage, Print PDF)
• Interactive Culinary & Recipe Explorer (JavaScript, REST APIs, CSS Grid)

TECHNICAL SKILLS
• Languages: Java, JavaScript, TypeScript, Python, C, SQL
• Frontend: React.js, HTML5, CSS3, Bootstrap, Tailwind
• Backend & DB: Node.js, Express, Spring Boot, MongoDB, MySQL, Supabase
• Tools: Git, GitHub, Docker, Postman, VS Code, Streamlit

CERTIFICATIONS
• Meta - Introduction to Front-End Development
• MongoDB - Associate Developer
• NPTEL - Python For Data Science & DBMS
• Infosys - Programming using Java`;

      navigator.clipboard.writeText(plainText).then(() => {
        showToast('ATS Plaintext resume copied to clipboard!', 'fa-clipboard-check');
      });
    });
  }
}

/* ==========================================================================
   PROJECT DETAIL MODAL
   ========================================================================== */
function setupProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalBackdrop) return;

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const modalBackdrop = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');

  if (!modalBackdrop || !modalBody || typeof portfolioProjects === 'undefined') return;

  const project = portfolioProjects.find(p => p.id === projectId);
  if (!project) return;

  let statsHtml = '';
  if (project.stats && project.stats.length > 0) {
    statsHtml = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin: 1.5rem 0; padding: 1.25rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        ${project.stats.map(s => `
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">${s.label}</div>
            <div style="font-size: 1.35rem; font-weight: 800; color: var(--accent-primary);">${s.value}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  let imagesHtml = '';
  if (project.architectureImage) {
    imagesHtml += `
      <div style="margin: 1.5rem 0;">
        <h4 style="margin-bottom: 0.75rem; font-size: 1.05rem;">Model Architecture & Methodology</h4>
        <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color); background: #000;">
          <img src="${project.architectureImage}" alt="Architecture Diagram" style="width: 100%; height: auto;">
        </div>
      </div>
    `;
  }

  const tagsHtml = project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

  modalBody.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <span class="section-tag" style="margin-bottom: 0.5rem;"><i class="fa-solid fa-code"></i> ${project.categoryLabel}</span>
      <h2 style="font-size: 1.85rem; margin-bottom: 0.4rem;">${project.title}</h2>
      <p style="color: var(--accent-secondary); font-weight: 600; font-size: 1.05rem;">${project.subtitle}</p>
    </div>

    ${statsHtml}

    <div style="margin: 1.5rem 0; font-size: 0.98rem; line-height: 1.7; color: var(--text-secondary);">
      ${project.fullDetails}
    </div>

    ${imagesHtml}

    <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
      <h4 style="margin-bottom: 0.75rem; font-size: 0.95rem;">Technologies Used</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${tagsHtml}
      </div>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="#contact" onclick="document.getElementById('project-modal').classList.remove('open'); document.body.style.overflow='';" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-envelope"></i> Inquire About This Project
        </a>
        <a href="https://github.com/Methun-raj" target="_blank" class="btn btn-secondary btn-sm">
          <i class="fa-brands fa-github"></i> Repository
        </a>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   ANIMATED STATS COUNTER
   ========================================================================== */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statNumbers.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let count = 0;
          const duration = 1400;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isDecimal ? count.toFixed(1) : Math.round(count)) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.35 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   CLIPBOARD ACTIONS & NOTIFICATIONS
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied to clipboard';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(label, 'fa-circle-check');
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });
}

function fallbackCopyText(text, label) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(label, 'fa-circle-check');
  } catch (err) {
    showToast('Failed to copy', 'fa-triangle-exclamation');
  }
  document.body.removeChild(textArea);
}

function showToast(message, iconClass = 'fa-circle-check') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3000);
}

/* ==========================================================================
   CONTACT FORM HANDLER WITH LIVE VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'fa-triangle-exclamation');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'fa-circle-exclamation');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Preparing Email...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      const mailtoUrl = `mailto:methunraj793@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
      
      window.location.href = mailtoUrl;

      showToast(`Thank you, ${name}! Email draft created.`, 'fa-paper-plane');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 700);
  });
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL / AOS HELPER
   ========================================================================== */
function initAos() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}
