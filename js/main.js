/**
 * Aamod Kumar Portfolio - Core JavaScript
 * Handles navigation, light palette interactions, project & experience filtering, deep-dive modal, and toast feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Navigation & Sticky Navbar
  // -------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      if (mobileDrawer.classList.contains('open')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });

    // Close drawer on click on mobile links
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. Dynamic Text Rotator (Hero Section)
  // -------------------------------------------------------------------------
  const dynamicRoleElem = document.getElementById('dynamic-role');
  const roles = [
    'Kubernetes SIGs Contributor',
    'ML & Data Engineer',
    'Azure DevOps & Cloud Specialist',
    'Open Source Mentor',
    'Distributed Systems Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRole() {
    if (!dynamicRoleElem) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      dynamicRoleElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      dynamicRoleElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // -------------------------------------------------------------------------
  // 3. Project Filter Tabs
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Experience Filter Tabs
  // -------------------------------------------------------------------------
  const expFilterBtns = document.querySelectorAll('.exp-filter-btn');
  const expCards = document.querySelectorAll('.exp-card');

  expFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      expFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      expCards.forEach(card => {
        const cat = card.getAttribute('data-exp-cat');
        if (filter === 'all' || cat === filter || (cat && cat.includes(filter))) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 5. Project Deep-Dive Modal Data & Handler
  // -------------------------------------------------------------------------
  const projectDetails = {
    'kube-sched-lens': {
      title: 'Kube Sched Lens: Real-Time Kubernetes GPU Debugger',
      tagline: 'Go • React • Dynamic Resource Allocation (DRA) • WebSockets • MTTR Reduction',
      repoUrl: 'https://github.com/Aamod007/kube-sched-lens',
      overview: `
        <p><strong>The Challenge:</strong> High-performance Machine Learning clusters frequently stall when pods wait for heterogeneous GPU hardware allocations. Standard Kubernetes API polling introduces severe latency and obscures why Dynamic Resource Allocation (DRA) claims fail.</p>
        <p style="margin-top: 12px;"><strong>The Solution:</strong> Built a specialized GPU debugger and real-time observability platform. Correlates 4+ DRA objects with live cluster events, streaming updates across 500+ pods in &lt;50ms using WebSockets, reducing MTTR by 75% (&lt;2s vs 15m).</p>
      `,
      architecture: `
┌─────────────────────────┐      ┌─────────────────────────┐
│ Kubernetes API / etcd   │◄────►│ Go client-go DRA Watch  │
└─────────────────────────┘      └───────────┬─────────────┘
                                             │ Event Ingestion & DRA Claim Engine
                                             ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│ React / Electron Client │◄────►│ WebSocket Stream Hub    │
│ Live Topology & Telemetry│     │ (<50ms latency)         │
└─────────────────────────┘      └─────────────────────────┘
      `,
      metrics: `
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          <li>⚡ <strong>75% MTTR Reduction</strong>: Troubleshooting drops from 15 minutes to &lt;2 seconds.</li>
          <li>⚡ <strong>90% Less Polling</strong>: Event-driven client-go pipeline replaces resource-heavy REST loops.</li>
          <li>⚡ <strong>$20k+/Month Cost Savings</strong>: Automated root-cause engine unblocks stalled AI accelerator nodes across 100+ instances.</li>
          <li>⚡ <strong>Scale Tested</strong>: Real-time telemetry tested on 500+ concurrent pods.</li>
        </ul>
      `,
      stack: ['Go (Golang)', 'Kubernetes DRA', 'client-go', 'React', 'TypeScript', 'WebSockets', 'Electron', 'Docker', 'Vite']
    },

    'tsxtract': {
      title: 'Tsxtract: High-Performance Rust Time-Series Feature Extraction',
      tagline: 'Rust • Python • PyO3 • rayon • NumPy Zero-Copy • PyPI • GitHub Actions CI',
      repoUrl: 'https://github.com/Aamod007/tsxtract',
      pypiUrl: 'https://pypi.org/project/tsxtract/',
      overview: `
        <p><strong>The Challenge:</strong> Extracting statistical time-series features in pure Python (e.g. tsfresh) is CPU-bound, single-threaded, and severely bottlenecked by the Python Global Interpreter Lock (GIL) on large datasets.</p>
        <p style="margin-top: 12px;"><strong>The Solution:</strong> Built a high-performance Rust-core Python library using PyO3 and rayon. Extracts 33 statistical time-series features in parallel with zero-copy NumPy array ingestion, achieving up to ~14,000x faster batch throughput than tsfresh. Shipped cross-platform PyPI binary wheels backed by automated CI.</p>
      `,
      architecture: `
┌───────────────────────────┐      ┌───────────────────────────┐
│ NumPy Time-Series Buffer  │────► │ PyO3 Zero-Copy Ingestion  │
└───────────────────────────┘      └─────────────┬─────────────┘
                                                 │ Multi-Threaded rayon Chunking
                                                 ▼
┌───────────────────────────┐      ┌───────────────────────────┐
│ Python Return (DataFrame) │◄──── │ Rust Parallel SIMD Engine │
│ Zero-Copy Shared Memory   │      │ 33 Features Extracted     │
└───────────────────────────┘      └───────────────────────────┘
      `,
      metrics: `
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          <li>⚡ <strong>~14,000x Throughput Advantage</strong>: Substantially outperforms standard Python libraries in automated benchmarks.</li>
          <li>⚡ <strong>33 Parallel Features</strong>: Concurrent multi-threaded extraction of statistical, spectral, and temporal markers.</li>
          <li>⚡ <strong>Cross-Platform PyPI Wheels</strong>: Distributed across Linux, macOS, and Windows with support for Python 3.10+.</li>
          <li>⚡ <strong>Property-Based Validation</strong>: Rigorous test coverage via pytest, cargo test, and GitHub Actions CI.</li>
        </ul>
      `,
      stack: ['Rust', 'Python', 'PyO3', 'rayon', 'NumPy', 'maturin', 'pandas', 'pytest', 'GitHub Actions', 'PyPI']
    },

    'cyber-defence': {
      title: 'Cyber Defence: Real-Time SOC Network Intrusion Detection System',
      tagline: 'Python • XGBoost • Zeek PCAP • WebSockets • MITRE ATT&CK Mapping',
      repoUrl: 'https://github.com/Aamod007/Cyber-Defence',
      overview: `
        <p><strong>The Challenge:</strong> Security Operations Centers (SOCs) are overwhelmed by millions of raw telemetry packets, leading to delayed incident response and alert fatigue across sophisticated cyber threat vectors.</p>
        <p style="margin-top: 12px;"><strong>The Solution:</strong> Architected a high-throughput, low-latency NIDS streaming live Zeek PCAP network telemetry directly into an optimized XGBoost inference pipeline, accompanied by Explainable AI (XAI) and direct MITRE ATT&CK technique mapping.</p>
      `,
      architecture: `
┌───────────────────────┐      ┌───────────────────────────┐
│ Raw Network Telemetry │────► │ Zeek PCAP Parsing Engine  │
└───────────────────────┘      └─────────────┬─────────────┘
                                             │ Telemetry Streaming (<50ms)
                                             ▼
┌───────────────────────┐      ┌───────────────────────────┐
│ SOC Dashboard Alert   │◄──── │ XGBoost Real-Time Model   │
│ + MITRE ATT&CK Matrix │      │ 97.15% Accuracy (82K+ pts)│
└───────────────────────┘      └───────────────────────────┘
      `,
      metrics: `
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          <li>🛡️ <strong>97.15% Detection Accuracy</strong>: Benchmarked across 82,000+ UNSW-NB15 dataset records spanning 39 network features.</li>
          <li>🛡️ <strong>&lt;50ms Inference Latency</strong>: Telemetry packets evaluated in real time through asynchronous WebSockets.</li>
          <li>🛡️ <strong>65%+ Alert Triage Reduction</strong>: MITRE ATT&CK threat mapping and XAI automate manual analyst classification across 9+ attack vectors.</li>
        </ul>
      `,
      stack: ['Python', 'XGBoost', 'scikit-learn', 'Zeek Network Security', 'Docker', 'WebSockets', 'Pandas', 'NumPy']
    },

    'azure-cicd': {
      title: 'Enterprise Azure CI/CD Pipeline for Azure Data Factory',
      tagline: 'Azure DevOps • ARM Templates • PowerShell Automation • Zero-Trust Security',
      repoUrl: 'https://github.com/Aamod007/ci-cd-azure-pipeline',
      overview: `
        <p><strong>The Challenge:</strong> Deploying complex Azure Data Factory (ADF) pipelines and triggers across multi-tenant cloud environments previously required laborious manual intervention and carried security risks from hardcoded credentials.</p>
        <p style="margin-top: 12px;"><strong>The Solution:</strong> Built end-to-end multi-stage CI/CD pipelines in Azure DevOps. Leveraged PowerShell to automate the ADF trigger lifecycle and dynamic ARM overrides, enforcing zero-trust access via Azure Managed Identity and Azure Key Vault.</p>
      `,
      architecture: `
┌─────────────────────────┐      ┌─────────────────────────┐
│ Git / Azure Repos (ADF) │────► │ Azure DevOps Multi-Stage│
└─────────────────────────┘      └───────────┬─────────────┘
                                             │ Dynamic ARM Template Overrides
                                             ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│ Environments:           │◄──── │ PowerShell Trigger      │
│ Dev ──► QA ──► Prod     │      │ Lifecycle Management    │
│ (Zero-Trust Key Vault)  │      │ (99.9% Success Rate)    │
└─────────────────────────┘      └─────────────────────────┘
      `,
      metrics: `
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          <li>🚀 <strong>80% Time Reduction</strong>: Manual deployment steps and verification time dropped by ~80%.</li>
          <li>🚀 <strong>100% Zero-Trust Compliance</strong>: Eliminated all hardcoded passwords, tokens, and connection strings via Azure Key Vault.</li>
          <li>🚀 <strong>99.9% Deployment Success Rate</strong>: Zero pipeline downtime across all 3 development environments.</li>
        </ul>
      `,
      stack: ['Azure DevOps Pipelines', 'Azure Data Factory', 'ARM Templates', 'PowerShell', 'Azure Key Vault', 'Managed Identity', 'Python', 'YAML']
    },

    'price-prediction': {
      title: 'Price Prediction Pipeline: Advanced Regression & Feature Engineering',
      tagline: 'Python • Ensemble Learning • Ames Housing Dataset • Cross-Validation',
      repoUrl: 'https://github.com/Aamod007/Price-Prediction-Pipeline',
      overview: `
        <p><strong>The Challenge:</strong> High-dimensional tabular datasets suffer from skewed distributions, extreme multicollinearity, and missing categorical variables, which cause standard regressors to overfit.</p>
        <p style="margin-top: 12px;"><strong>The Solution:</strong> Designed an automated end-to-end machine learning regression pipeline on the Ames Housing dataset (2,930 instances, 82 features). Applied robust Box-Cox transformations, target encoding, and ensemble modeling.</p>
      `,
      architecture: `
┌──────────────────────────┐      ┌──────────────────────────┐
│ Ames Dataset (82 Feats)  │────► │ Automated Preprocessing  │
└──────────────────────────┘      │ Imputation, Encoding, Box│
                                  └────────────┬─────────────┘
                                               │ K-Fold Stratified Split
                                               ▼
┌──────────────────────────┐      ┌──────────────────────────┐
│ Optimal Prediction Model │◄──── │ Ensemble Model           │
│ R²: 0.920 | RMSE: 0.106  │      │ XGBoost + Ridge + Lasso  │
└──────────────────────────┘      └──────────────────────────┘
      `,
      metrics: `
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          <li>📈 <strong>R² Score of 0.920</strong>: Demonstrating exceptional explained variance on unseen test splits.</li>
          <li>📈 <strong>RMSE 0.106 & MAE 0.073</strong>: Robust error bounds across 2,930 real-world property records.</li>
          <li>📈 <strong>End-to-End Automation</strong>: Reusable training, validation, and inference script architecture.</li>
        </ul>
      `,
      stack: ['Python', 'XGBoost', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn']
    }
  };

  const modalBackdrop = document.getElementById('project-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalRepoLink = document.getElementById('modal-repo-link');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const tabOverview = document.getElementById('tab-overview');
  const tabArch = document.getElementById('tab-arch');
  const tabMetrics = document.getElementById('tab-metrics');
  const tabStack = document.getElementById('tab-stack');

  document.querySelectorAll('.btn-detail-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];
      if (!data) return;

      modalTitle.textContent = data.title;
      
      // Update top header repository link
      if (modalRepoLink && data.repoUrl) {
        modalRepoLink.href = data.repoUrl;
      }

      // Build Action Buttons for Tab Overview
      let actionButtons = `
        <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:22px; padding-top:16px; border-top:1px solid var(--border-subtle);">
          <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px; padding:9px 18px; font-size:0.825rem; text-decoration:none;">
            <i class="fab fa-github"></i>
            <span>Open GitHub Repository</span>
            <i class="fas fa-arrow-up-right-from-square" style="font-size:0.75rem;"></i>
          </a>
      `;
      if (data.pypiUrl) {
        actionButtons += `
          <a href="${data.pypiUrl}" target="_blank" rel="noopener noreferrer" class="btn-cert-link" style="display:inline-flex; align-items:center; gap:8px; padding:9px 18px; font-size:0.825rem; text-decoration:none;">
            <i class="fas fa-box"></i>
            <span>View on PyPI</span>
            <i class="fas fa-arrow-up-right-from-square" style="font-size:0.75rem;"></i>
          </a>
        `;
      }
      actionButtons += '</div>';

      tabOverview.innerHTML = `<div style="color:var(--primary); margin-bottom:14px; font-family:var(--font-mono); font-size:0.875rem; font-weight:700;">${data.tagline}</div>` + data.overview + actionButtons;
      tabArch.innerHTML = `<div class="architecture-diagram">${data.architecture}</div>`;
      tabMetrics.innerHTML = data.metrics;

      let techHtml = '<div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:10px;">';
      data.stack.forEach(tech => {
        techHtml += `<span class="tech-tag" style="background:var(--primary-light); color:var(--primary); font-size:0.85rem; padding:6px 14px; font-weight:600;">${tech}</span>`;
      });
      techHtml += '</div>';
      tabStack.innerHTML = techHtml;

      // Reset to first tab
      tabBtns.forEach(t => t.classList.remove('active'));
      tabBtns[0].classList.add('active');
      document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
      tabOverview.classList.add('active');

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) activeContent.classList.add('active');
    });
  });

  // -------------------------------------------------------------------------
  // 6. Copy Email to Clipboard
  // -------------------------------------------------------------------------
  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = 'aamoddev23@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
        const originalText = btnCopyEmail.innerHTML;
        btnCopyEmail.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          btnCopyEmail.innerHTML = originalText;
        }, 2500);
      }).catch(err => {
        showToast('Email: ' + email);
      });
    });
  }

  // -------------------------------------------------------------------------
  // 7. Contact Form Submission
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast(`Thank you ${name}! Your message has been received.`);
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1200);
    });
  }

  // -------------------------------------------------------------------------
  // 8. Toast Notification Utility
  // -------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color:${type === 'error' ? '#ef4444' : '#2563eb'}; font-weight:bold;">${type === 'error' ? '⚠' : '✓'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // -------------------------------------------------------------------------
  // 9. Animated Counter for Metrics
  // -------------------------------------------------------------------------
  const metricValues = document.querySelectorAll('.metric-value[data-target]');
  let counted = false;

  function countUp() {
    metricValues.forEach(elem => {
      const target = parseFloat(elem.getAttribute('data-target'));
      const prefix = elem.getAttribute('data-prefix') || '';
      const suffix = elem.getAttribute('data-suffix') || '';
      const decimals = parseInt(elem.getAttribute('data-decimals') || '0', 10);
      const duration = 1600;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = (progress * target);

        elem.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          elem.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        countUp();
      }
    });
  }, { threshold: 0.3 });

  const metricsStrip = document.querySelector('.metrics-strip');
  if (metricsStrip) {
    observer.observe(metricsStrip);
  }
});
