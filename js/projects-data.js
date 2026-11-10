/**
 * projects-data.js
 * Project showcase data for Methun Raj A's Portfolio
 */

const portfolioProjects = [
  {
    id: "rib-fracture-detection",
    title: "Rib Fracture Detection Using Deep Learning",
    subtitle: "ORF-Netv2 Omni-Supervised CT Scan Diagnostics",
    category: "ai",
    categoryLabel: "AI & Deep Learning",
    badge: "Research & Healthcare AI",
    image: "assets/ribfracture-detection.png",
    architectureImage: "assets/ribfracture-architecture.png",
    description: "Developed a cutting-edge deep learning model (ORF-Netv2) to accurately detect and segment rib fractures from CT scan imaging using omni-supervised learning and dynamic label assignment.",
    tags: ["Python", "TensorFlow", "OpenCV", "Streamlit", "Deep Learning", "Computer Vision"],
    stats: [
      { label: "Accuracy Gain", value: "+25%" },
      { label: "Supervision", value: "Omni-Supervised" },
      { label: "Input Modality", value: "3D CT Scans" }
    ],
    highlights: [
      "Engineered ORF-Netv2 deep learning architecture tailored for sparse medical CT scan datasets.",
      "Implemented omni-supervised learning combining bounding box, segmentation mask, dot prompts, and unlabeled scans.",
      "Achieved a 25% accuracy improvement over standard detection baselines via dynamic label assignment & co-training.",
      "Built an end-to-end interactive Streamlit web dashboard for clinical scan upload, visualization, and reporting."
    ],
    fullDetails: `
      <h3>Project Overview</h3>
      <p>Rib fractures are among the most frequent thoracic injuries encountered in emergency trauma, yet minor or non-displaced fractures are frequently missed in high-volume CT workflows. This project introduces <strong>ORF-Netv2</strong>, a robust deep learning framework engineered to detect and localize rib fractures with exceptional sensitivity.</p>
      
      <h3>Key Engineering & Algorithmic Achievements</h3>
      <ul>
        <li><strong>Omni-Supervised Learning Framework:</strong> Tackled the acute scarcity of fully segmented medical imaging by leveraging heterogeneous annotations — bounding boxes, precise masks, point annotations, and abundant unlabeled CT slices.</li>
        <li><strong>Dynamic Label Assignment (DLA):</strong> Dynamically calibrated positive and negative sample allocations during training, mitigating false alarms triggered by anatomical bone variations.</li>
        <li><strong>Co-Training Mechanism:</strong> Coupled two complementary network streams that cross-examine predictions, boosting validation accuracy by 25%.</li>
        <li><strong>Clinical Diagnostic Dashboard:</strong> Integrated with Streamlit and OpenCV to deliver instant bounding overlays, fracture probability scores, and multi-slice navigation for healthcare practitioners.</li>
      </ul>

      <h3>Tech Stack & Tools</h3>
      <p><strong>Languages & Frameworks:</strong> Python 3.10+, TensorFlow / Keras, OpenCV, NumPy, Pandas, Streamlit, Matplotlib.</p>
    `
  },
  {
    id: "resume-builder",
    title: "Smart Dynamic Resume Builder",
    subtitle: "Real-Time ATS-Compliant Resume Engineering Platform",
    category: "web",
    categoryLabel: "Front-End Engineering",
    badge: "Web Application",
    image: null,
    icon: "fa-solid fa-file-invoice",
    description: "An intuitive, responsive single-page web app built with React.js that enables job seekers to compose, customize, and export high-impact ATS-optimized resumes with live synchronized preview.",
    tags: ["React.js", "JavaScript (ES6+)", "CSS3 Modules", "LocalStorage", "Client-Side PDF"],
    stats: [
      { label: "Live Preview", value: "Synchronous" },
      { label: "Storage", value: "Local Zero-Cloud" },
      { label: "Format", value: "ATS-Ready" }
    ],
    highlights: [
      "Engineered responsive two-column interface with real-time reactive state synchronization between editor and preview.",
      "Crafted flexible resume sections: Experience, Education, Projects, Skills, and Custom Accreditations.",
      "Built client-side data persistence with LocalStorage plus JSON import/export for seamless portability.",
      "Implemented pixel-perfect CSS print stylesheets for crisp one-click PDF generation."
    ],
    fullDetails: `
      <h3>Project Overview</h3>
      <p>Built during front-end development internship at Vault of Codes, this application eliminates the hassle of rigid formatting in word processors. Users can focus entirely on impactful phrasing while the engine formats their resume cleanly according to modern ATS guidelines.</p>

      <h3>Architecture & Features</h3>
      <ul>
        <li><strong>Modular Component Structure:</strong> Organized into decoupled, reusable form controls and live rendering cards using React hooks (useState, useEffect, useReducer).</li>
        <li><strong>Instant Preview Engine:</strong> Dynamic bindings ensure that every keystroke in experience bullet points or project tags reflects instantaneously in the document viewport.</li>
        <li><strong>Template Variations:</strong> Switch between classic, modern, and compact engineering layouts on the fly without losing user content.</li>
        <li><strong>Zero-Server Privacy:</strong> All candidate data remains 100% on the user's client machine with browser storage persistence.</li>
      </ul>
    `
  },
  {
    id: "recipe-explorer",
    title: "Interactive Culinary & Recipe Explorer",
    subtitle: "Dynamic Food Discovery & Nutritional Breakdown Platform",
    category: "web",
    categoryLabel: "Front-End Engineering",
    badge: "API-Driven Web App",
    image: null,
    icon: "fa-solid fa-utensils",
    description: "A fast, interactive culinary search engine featuring instant keyword lookups, meal categorization, animated recipe cards, and nutritional breakdowns powered by REST APIs.",
    tags: ["JavaScript (ES6+)", "Fetch API", "HTML5", "CSS Grid & Flexbox", "Async/Await"],
    stats: [
      { label: "API Calls", value: "RESTful" },
      { label: "Animation", value: "CSS3 Transitions" },
      { label: "Layout", value: "CSS Grid" }
    ],
    highlights: [
      "Integrated external recipe REST APIs using modern asynchronous Fetch API with request debouncing.",
      "Designed interactive 3D-effect recipe cards with ingredient lists, cooking time badges, and step-by-step guides.",
      "Implemented client-side filtering by cuisine, dietary restrictions, and meal type.",
      "Ensured flawless responsive performance across smartphones, tablets, and large displays."
    ],
    fullDetails: `
      <h3>Project Overview</h3>
      <p>Developed to demonstrate best practices in modern asynchronous JavaScript, clean UI/UX states (loading skeletons, error boundaries, empty states), and resilient API consumption.</p>

      <h3>Key Highlights</h3>
      <ul>
        <li><strong>Debounced Real-Time Search:</strong> Prevents unnecessary API rate exhaustion while delivering a fluid, responsive typing experience.</li>
        <li><strong>Interactive Modal Details:</strong> Users can inspect exact measurements, caloric estimates, and preparation checklists in an accessible modal dialog.</li>
        <li><strong>Pure Vanilla & Modular CSS:</strong> Built with clean semantic markup, CSS custom properties, and grid arrangements without heavyweight UI dependencies.</li>
      </ul>
    `
  },
  {
    id: "dynamic-forms-system",
    title: "Enterprise Dynamic Forms & UI System",
    subtitle: "Accessible Multi-Step Validation Architecture",
    category: "web",
    categoryLabel: "Front-End Engineering",
    badge: "Enterprise Component Suite",
    image: null,
    icon: "fa-solid fa-list-check",
    description: "A robust front-end form validation system featuring dynamic schema rendering, progressive step-by-step wizard navigation, live field feedback, and accessible UI controls.",
    tags: ["React.js", "TypeScript", "Bootstrap", "Form Validation", "WCAG 2.1"],
    stats: [
      { label: "Validation", value: "Real-Time" },
      { label: "Accessibility", value: "WCAG 2.1" },
      { label: "Pattern", value: "Wizard Stepper" }
    ],
    highlights: [
      "Engineered multi-stage wizard flow with persistent step history and animated slide transitions.",
      "Implemented granular field-level validation (regex patterns, asynchronous availability checks, custom matchers).",
      "Built dynamic form generator that renders input widgets directly from JSON configuration objects.",
      "Integrated full keyboard navigation and screen-reader compliant ARIA attributes."
    ],
    fullDetails: `
      <h3>Project Overview</h3>
      <p>Developed during front-end internship work at Vault of Codes to resolve complex data onboarding workflows. Ensures clean user inputs, minimizes submission drop-offs, and provides immediate visual reassurance.</p>

      <h3>Key Capabilities</h3>
      <ul>
        <li>Dynamic schema parsing allowing product teams to spin up new registration flows without touching core UI code.</li>
        <li>Live error feedback with inline hints and color-coded status indicators.</li>
        <li>Mobile-friendly touch targets and auto-formatting masks for phone numbers, dates, and currency fields.</li>
      </ul>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { portfolioProjects };
}
