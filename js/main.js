/**
 * Lithish Kumar G - Interactive Portfolio JavaScript Engine
 * Handcrafted vanilla ES6+ for performance & recruiter engagement
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initSkillsFilter();
  initPlayground();
  initCaseStudyModal();
});

/* ==========================================================================
   1. Navbar & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy active indicator
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. Dynamic Role Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typing-role');
  if (!target) return;

  const roles = [
    'React.js Frontend Engineer',
    'Python & Django Full-Stack Developer',
    'REST API & Relational Database Builder',
    'MCA Candidate & Problem Solver'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Recruiter Fast-Track Toggle
   ========================================================================== */
function toggleRecruiterSnapshot() {
  const card = document.getElementById('recruiter-snapshot');
  const btn = document.getElementById('recruiter-toggle-btn');
  if (!card) return;

  const isVisible = card.classList.toggle('visible');

  if (isVisible) {
    if (btn) btn.textContent = '⚡ Hide Recruiter Snapshot';
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Recruiter Snapshot unlocked! 📋');
  } else {
    if (btn) btn.textContent = '⚡ Recruiter Snapshot';
  }
}

/* ==========================================================================
   4. Skills Category Filter
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Developer Playground (API Inspector & SQL Runner)
   ========================================================================== */
const API_ENDPOINTS = {
  'certihire-gigs': {
    method: 'GET',
    url: '/api/v1/gigs/search?category=FullStack&min_rating=4.5',
    latency: '16ms',
    data: {
      status: "success",
      query_params: { category: "FullStack", min_rating: 4.5 },
      results_count: 2,
      data: [
        {
          id: "gig_108",
          title: "Full-Stack Django & React Web Application with REST APIs",
          seller: {
            username: "lithish_dev",
            badge: "Verified Skill Certified (Python/Django 96%)",
            rating: 5.0,
            reviews_count: 18
          },
          packages: {
            basic: { name: "Starter", price_inr: 4999, delivery_days: 3 },
            standard: { name: "Pro Stack", price_inr: 12999, delivery_days: 7 },
            premium: { name: "Enterprise + Realtime", price_inr: 24999, delivery_days: 14 }
          },
          features: ["Django 5.1", "React UI", "REST API", "Database Migration", "Docker Ready"]
        },
        {
          id: "gig_109",
          title: "Custom React Dashboard Components with Reusable Custom Hooks",
          seller: {
            username: "lithish_dev",
            badge: "Verified Skill Certified (React.js 94%)",
            rating: 4.9,
            reviews_count: 12
          },
          packages: {
            basic: { name: "Component Unit", price_inr: 2999, delivery_days: 2 }
          }
        }
      ]
    }
  },
  'hotel-availability': {
    method: 'POST',
    url: '/api/v1/rooms/check-availability',
    latency: '22ms',
    data: {
      status: "success",
      request_payload: {
        hotel: "The Grand Red Castle (Goa Resort)",
        check_in: "2026-11-10",
        check_out: "2026-11-14",
        guests: 2
      },
      availability: {
        total_available_rooms: 4,
        room_options: [
          {
            room_number: "Deluxe-204",
            room_type: "Deluxe Ocean Facing",
            packages: {
              room_only: { rate_per_night: 3500, total_amount: 14000 },
              with_breakfast: { rate_per_night: 4200, total_amount: 16800 },
              with_breakfast_dinner: { rate_per_night: 5200, total_amount: 20800 }
            },
            status: "AVAILABLE",
            overlap_conflicts_detected: 0
          }
        ],
        instant_booking_eligible: true,
        payment_gateways: ["Razorpay", "Cashfree Sandbox"]
      }
    }
  },
  'order-status': {
    method: 'GET',
    url: '/api/v1/orders/ORD-88219/status',
    latency: '12ms',
    data: {
      status: "success",
      order_id: "ORD-88219",
      buyer: "InnovateTech Pvt Ltd",
      seller: "Lithish Kumar G",
      gig: "Full-Stack Web App Development",
      escrow_status: "FUNDS_HELD_IN_ESCROW",
      current_state: "DELIVERED_PENDING_CLIENT_APPROVAL",
      milestones: [
        { step: 1, name: "Order Created & Requirements Provided", done: true, timestamp: "2026-10-18T10:00:00Z" },
        { step: 2, name: "Database Schema & API Design", done: true, timestamp: "2026-10-20T14:30:00Z" },
        { step: 3, name: "Frontend React Integration & Testing", done: true, timestamp: "2026-10-24T18:00:00Z" },
        { step: 4, name: "Deliverables Uploaded", done: true, timestamp: "2026-10-26T16:45:00Z" },
        { step: 5, name: "Client Acceptance & Fund Release", done: false, timestamp: null }
      ]
    }
  }
};

const SQL_PRESETS = {
  'window-rank': {
    sql: `-- Rank Top 3 Performing Product Sub-Categories by Profit within Each Region
WITH RankedSubCategories AS (
    SELECT 
        Region,
        Sub_Category,
        ROUND(SUM(Sales), 2) AS SubCategory_Sales,
        ROUND(SUM(Profit), 2) AS SubCategory_Profit,
        DENSE_RANK() OVER (
            PARTITION BY Region 
            ORDER BY SUM(Profit) DESC
        ) AS Profit_Rank_In_Region
    FROM superstore_sales
    GROUP BY Region, Sub_Category
)
SELECT Region, Sub_Category, SubCategory_Sales, SubCategory_Profit, Profit_Rank_In_Region
FROM RankedSubCategories
WHERE Profit_Rank_In_Region <= 3
ORDER BY Region, Profit_Rank_In_Region;`,
    headers: ['Region', 'Sub-Category', 'Sales ($)', 'Profit ($)', 'Rank'],
    rows: [
      ['Central', 'Copiers', '37,259.57', '15,608.82', '1'],
      ['Central', 'Phones', '72,403.28', '12,324.81', '2'],
      ['Central', 'Accessories', '31,989.27', '7,251.63', '3'],
      ['East', 'Copiers', '53,219.46', '17,022.88', '1'],
      ['East', 'Phones', '100,614.98', '12,314.68', '2'],
      ['East', 'Storage', '71,612.58', '9,126.93', '3'],
      ['South', 'Phones', '58,304.42', '10,767.70', '1'],
      ['South', 'Machines', '53,890.96', '8,229.41', '2'],
      ['South', 'Accessories', '27,276.75', '7,004.54', '3'],
      ['West', 'Copiers', '62,899.39', '19,327.25', '1'],
      ['West', 'Accessories', '61,114.10', '16,484.62', '2'],
      ['West', 'Paper', '26,663.74', '12,119.42', '3']
    ]
  },
  'segment-discount': {
    sql: `-- Customer Segment Profitability & Discount Thresholds
SELECT 
    Segment,
    Discount_Tier,
    COUNT(Order_ID) AS Total_Orders,
    ROUND(SUM(Sales), 2) AS Total_Sales,
    ROUND(SUM(Profit), 2) AS Total_Profit,
    ROUND(AVG(Discount) * 100, 1) AS Avg_Discount_Pct
FROM (
    SELECT 
        Order_ID,
        Segment,
        Sales,
        Profit,
        Discount,
        CASE 
            WHEN Discount = 0 THEN '0% (Full Price)'
            WHEN Discount <= 0.20 THEN '1% - 20% (Low)'
            WHEN Discount <= 0.50 THEN '21% - 50% (Moderate)'
            ELSE '> 50% (Heavy)'
        END AS Discount_Tier
    FROM superstore_sales
) AS Seg
GROUP BY Segment, Discount_Tier
ORDER BY Segment, Total_Profit DESC;`,
    headers: ['Segment', 'Discount Tier', 'Orders', 'Total Sales ($)', 'Total Profit ($)', 'Avg Discount %'],
    rows: [
      ['Consumer', '0% (Full Price)', '2,340', '584,210.40', '142,390.10', '0.0%'],
      ['Consumer', '1% - 20% (Low)', '1,780', '412,650.00', '68,430.50', '14.2%'],
      ['Consumer', '21% - 50% (Moderate)', '820', '145,210.80', '-18,240.20', '32.5%'],
      ['Consumer', '> 50% (Heavy)', '250', '26,800.00', '-58,410.90', '68.0%'],
      ['Corporate', '0% (Full Price)', '1,420', '389,120.00', '98,710.20', '0.0%'],
      ['Corporate', '1% - 20% (Low)', '990', '241,500.20', '44,230.10', '13.8%'],
      ['Corporate', '> 50% (Heavy)', '140', '18,200.00', '-31,250.00', '70.0%']
    ]
  },
  'loss-subcategories': {
    sql: `-- Identifying Chronic Loss-Making Sub-Categories Despite High Volume
SELECT 
    Category,
    Sub_Category,
    ROUND(SUM(Sales), 2) AS Gross_Sales,
    ROUND(SUM(Profit), 2) AS Net_Loss,
    ROUND(AVG(Discount) * 100, 1) AS Avg_Discount_Pct
FROM superstore_sales
GROUP BY Category, Sub_Category
HAVING SUM(Profit) < 0
ORDER BY Net_Loss ASC;`,
    headers: ['Category', 'Sub-Category', 'Gross Sales ($)', 'Net Loss ($)', 'Avg Discount %'],
    rows: [
      ['Furniture', 'Tables', '206,965.53', '-17,725.48', '26.1%'],
      ['Furniture', 'Bookcases', '114,879.97', '-3,472.56', '21.1%'],
      ['Office Supplies', 'Supplies', '46,673.54', '-1,189.10', '7.6%']
    ]
  }
};

function initPlayground() {
  // Tab switching (API vs SQL)
  const tabBtns = document.querySelectorAll('.play-tab-btn');
  const panels = document.querySelectorAll('.play-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });

  // API Playground Logic
  const apiSelect = document.getElementById('api-endpoint-select');
  const apiBtn = document.getElementById('api-run-btn');
  const apiMethodBadge = document.getElementById('api-method-badge');
  const apiLatencySpan = document.getElementById('api-latency-span');
  const apiStatusSpan = document.getElementById('api-status-span');
  const apiJsonPre = document.getElementById('api-json-pre');

  function runApiSimulation() {
    const selectedKey = apiSelect.value;
    const item = API_ENDPOINTS[selectedKey];
    if (!item) return;

    apiMethodBadge.textContent = item.method;
    apiMethodBadge.className = `api-method-badge method-${item.method.toLowerCase()}`;
    apiStatusSpan.textContent = '200 OK';
    apiLatencySpan.textContent = item.latency;

    // Syntax-colorized or clean formatted JSON
    apiJsonPre.textContent = JSON.stringify(item.data, null, 2);
  }

  if (apiSelect && apiBtn) {
    apiSelect.addEventListener('change', runApiSimulation);
    apiBtn.addEventListener('click', () => {
      apiJsonPre.textContent = '// Sending HTTP Request...';
      setTimeout(runApiSimulation, 220);
    });
    runApiSimulation();
  }

  // SQL Runner Logic
  const sqlPresetBtns = document.querySelectorAll('.sql-preset-btn');
  const sqlCodeBox = document.getElementById('sql-code-box');
  const sqlTableHead = document.getElementById('sql-table-head');
  const sqlTableBody = document.getElementById('sql-table-body');
  const sqlRunBtn = document.getElementById('sql-run-btn');

  let currentSqlKey = 'window-rank';

  function renderSql(key) {
    const preset = SQL_PRESETS[key];
    if (!preset) return;

    sqlCodeBox.textContent = preset.sql;

    // Render Table Header
    sqlTableHead.innerHTML = `<tr>${preset.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;

    // Render Table Rows
    sqlTableBody.innerHTML = preset.rows.map(row => {
      return `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
    }).join('');
  }

  sqlPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sqlPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSqlKey = btn.getAttribute('data-preset');
      renderSql(currentSqlKey);
    });
  });

  if (sqlRunBtn) {
    sqlRunBtn.addEventListener('click', () => {
      sqlTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:var(--accent-cyan)">Executing query in SQLite/PostgreSQL engine...</td></tr>';
      setTimeout(() => renderSql(currentSqlKey), 250);
    });
  }

  renderSql('window-rank');
}

/* ==========================================================================
   6. Case Study Modal / Architecture Deep Dive
   ========================================================================== */
const CASE_STUDIES = {
  certihire: {
    title: "CertiHire — Freelance Marketplace & Skill Assessment Platform",
    tagline: "Python 5.1 | Django Channels | SQLite / PostgreSQL | Bootstrap 5 | JavaScript",
    problem: "Traditional freelancing platforms suffer from unverified freelancer claims, leading to poor deliverable quality, frequent disputes, and buyer churn. Freelancers also lack objective benchmarks to validate their skills.",
    solution: "Built a vetted marketplace featuring an automated assessment engine. Freelancers must complete a domain test (with multiple-choice timed questions) to earn a 'Skill-Certified' badge before creating category gigs. Integrated real-time messaging, milestone-based order escrow states, and customer reviews.",
    architecture: `[Client Browser] ──(HTTP/AJAX)──► [Django WSGI / ASGI Daphne Layer]
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
  [Accounts & Auth]             [Assessment Engine]              [Orders & Escrow]
   - Multi-Role Profiles         - Timed Skill Tests              - Pending -> In-Progress
   - Seller Qualification        - Score Calculation              - Delivered -> Completed
        │                                │                                │
        └────────────────────────────────┴────────────────────────────────┘
                                         │
                                 [Relational DB]
                  (Users, Gigs, Questions, Orders, Reviews)`,
    keyChallenges: [
      "Designed atomic transaction wrappers around order placement and status transitions to prevent race conditions during delivery submissions.",
      "Implemented custom Django context processors to dynamically inject unread notification badges and message threads across all dashboard views without repetitive queries.",
      "Engineered flexible gig pricing tiers (Basic, Standard, Premium) with dynamic client-side total calculations."
    ],
    github: "https://github.com/Lithishkumar33/CertiHire"
  },
  thegrand: {
    title: "The Grand Reservations — Hotel & Vacation Booking Engine",
    tagline: "Python | Django 5.0 | Razorpay & Cashfree API | ReportLab | xhtml2pdf",
    problem: "Hotel guests and vacationers struggle with complicated multi-step booking systems that lack transparent meal plan packages, instant PDF invoices, and curated tour excursions with optional certified guides.",
    solution: "Created an integrated hotel room and guided tour reservation platform. Designed dynamic date-range availability queries using Django Q objects to eliminate double-booking, integrated sandbox payment processing (Razorpay/Cashfree), and automated on-the-fly PDF invoice generation attached to confirmation emails.",
    architecture: `[Guest Browser] ──(Datepicker / Package Select)──► [Django Frontend Views]
                                                              │
                     ┌────────────────────────────────────────┴────────────────────────────────────────┐
                     ▼                                                                                 ▼
          [Date Overlap Verifier]                                                             [Razorpay Gateway]
           - Q(check_in__lt=out) & Q(check_out__gt=in)                                        - Signature Verification
           - Filters active conflicts                                                         - Updates status to 'Paid'
                     │                                                                                 │
                     └────────────────────────────────────────┬────────────────────────────────────────┘
                                                              ▼
                                                   [Invoice & Mail Engine]
                                                    - ReportLab / xhtml2pdf
                                                    - Automated SMTP dispatch`,
    keyChallenges: [
      "Prevented concurrency double-booking issues by writing complex overlapping date queries comparing requested check-in/out ranges against active non-cancelled bookings.",
      "Engineered on-the-fly PDF invoice generation using ReportLab canvas and xhtml2pdf templates, automatically attaching the compiled PDF to guest confirmation emails.",
      "Built a secure administrative dashboard for hotel staff to manage room inventories, pricing tiers, and assign guides to incoming tour bookings."
    ],
    github: "https://github.com/Lithishkumar33/The-Grand-Reservations-Hotel-Booking"
  },
  superstore: {
    title: "Sample Superstore Sales Analytics — SQL Business Intelligence",
    tagline: "Advanced SQL | PostgreSQL / MySQL | Window Functions | CTEs | Aggregations",
    problem: "Enterprise retail leadership needed granular visibility into regional sales margins, product sub-category profitability, and the true cost of promotional discounting policies across distinct customer segments.",
    solution: "Structured and executed an advanced SQL analytical query suite leveraging Common Table Expressions (CTEs), Window Functions (DENSE_RANK, Running Totals), and conditional CASE aggregations across 9,900+ transaction records.",
    architecture: `[Raw Transactions CSV] ──► [PostgreSQL / Relational Database]
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   [Window Functions]             [Segment Analysis]            [Profitability Audits]
    - DENSE_RANK() by Region       - CASE Discount Tiers         - HAVING SUM(Profit) < 0
    - Running Sales Totals         - Consumer vs Corporate       - Margin Degradation Alerts`,
    keyChallenges: [
      "Uncovered that promotional discounts greater than 20% consistently triggered negative net margins for Furniture sub-categories (Tables and Bookcases).",
      "Constructed reusable CTEs to rank top revenue generators within regional partitions, assisting regional managers in inventory allocation.",
      "Optimized query execution plans by evaluating column indexes on high-frequency filtering fields (`Region`, `Category`, `Order_Date`)."
    ],
    github: "https://github.com/Lithishkumar33/superstore-sales-analysis"
  },
  reactbdreamz: {
    title: "React Component Ecosystem & Dynamic Workflow Engine",
    tagline: "React.js | Hooks (useState, useEffect) | REST APIs | Bootstrap 5 | Client Routing",
    problem: "Legacy client portals required disjointed multi-page reloads, suffered from inconsistent UI states, and lacked reusable components across business modules.",
    solution: "Engineered responsive, modular single-page application interfaces during my 6-month React Developer Internship at BDreamz Global Solutions. Created reusable component libraries, implemented custom hooks for data fetching, and managed unified loading, empty, and error UI states.",
    architecture: `[User Interaction] ──► [React Component Tree] ──► [Custom Hooks (useState, useEffect)]
                                                            │
                                  ┌─────────────────────────┴─────────────────────────┐
                                  ▼                                                   ▼
                         [REST API Client]                                  [Client-Side Router]
                          - Async/Await Fetch                                - Protected Views
                          - Loading & Error States                           - Form Validation`,
    keyChallenges: [
      "Eliminated redundant re-renders in nested lists by structuring component state efficiently and memoizing heavy callbacks.",
      "Built resilient REST API integration layers with standardized try/catch handling, display of user-friendly error banners, and automatic retry prompts.",
      "Created multi-step dynamic forms with client-side regex validation, reducing invalid submission errors before server delivery."
    ],
    github: "https://github.com/Lithishkumar33"
  }
};

function initCaseStudyModal() {
  const overlay = document.getElementById('case-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalArch = document.getElementById('modal-arch');
  const modalChallenges = document.getElementById('modal-challenges');
  const modalGithub = document.getElementById('modal-github');

  window.openCaseStudy = function(key) {
    const data = CASE_STUDIES[key];
    if (!data || !overlay) return;

    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalArch.textContent = data.architecture;
    modalChallenges.innerHTML = data.keyChallenges.map(c => `<li>${c}</li>`).join('');
    modalGithub.href = data.github;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   7. Copy to Clipboard & Toast Notifications
   ========================================================================== */
function copyContact(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Copy failed. Please manually select.`);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    container.appendChild(toast);
    document.body.appendChild(container);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Simulated contact form submission
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name')?.value || 'Guest';
  showToast(`Thank you, ${name}! Your message has been sent.`);
  e.target.reset();
}
