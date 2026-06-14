/*
   THE LITTLE WINGS PLAY SCHOOL - Application Logic
   Features: Dynamic Milestone Finder, Testimonials Slider, Mobile Menu, Sticky Nav, Validations, Scroll Reveals
*/

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMilestoneFinder();
  initTestimonialsCarousel();
  initContactForm();
  initScrollEffects();
  initDraggableLogo();
  initAiCallWidget();
});

/* ==========================================
   1. NAVIGATION & MOBILE MENU
   ========================================== */
function initNavigation() {
  const header = document.querySelector('header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');
  const backToTop = document.querySelector('.back-to-top');

  // Sticky Header & Back to Top visibility on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    
    updateActiveNavLink();
  });

  // Back to Top functionality
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mobile Burger Toggle
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu on clicking nav link and smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Close menu
      mobileToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section link highlighter on scroll
  function updateActiveNavLink() {
    let fromTop = window.scrollY + 120;
    
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          navLinks.forEach(item => item.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
}

/* ==========================================
   2. DYNAMIC MILESTONE FINDER DATA & LOGIC
   ========================================== */
const milestoneData = {
  toddler: {
    ageGroup: 'Toddlers Wing',
    ageRange: '1.5 to 3.0 Years',
    milestones: [
      'Begins basic speech, mimicry, and walks/climbs steps',
      'Explores physical shapes, textures, and sensory tools',
      'Feeds self and handles simple toys independently',
      'Starts parallel play and basic social interactions'
    ],
    curriculum: [
      'Sensory and tactile learning activities',
      'Nursery rhymes, storytelling, and music',
      'Gross motor play (crawling, rolling, balancing)',
      'Basic vocabulary, speech development, and potty training'
    ],
    routine: [
      { time: '09:00 AM', act: 'Welcome & Gentle Circle Time' },
      { time: '09:30 AM', act: 'Sensory Exploration & Play' },
      { time: '10:30 AM', act: 'Healthy Snack & Milk Break' },
      { time: '11:00 AM', act: 'Motor Skills / Music & Movement' },
      { time: '12:00 PM', act: 'Nap Time & Rest' },
      { time: '01:00 PM', act: 'Lunch Break & Healthy Habits' },
      { time: '01:45 PM', act: 'Nursery Rhymes & Soft Songs' },
      { time: '02:30 PM', act: 'Free Play & Sensory Bins' },
      { time: '03:00 PM', act: 'Storytime & Warm Dismissal' }
    ]
  },
  nursery: {
    ageGroup: 'Nursery Wing',
    ageRange: '3.0 to 4.0 Years',
    milestones: [
      'Expresses feelings and speaks in full sentences',
      'Draws basic lines/shapes and sorts colors and sizes',
      'Follows simple instructions and handles small tasks',
      'Shares toys and makes friends enthusiastically'
    ],
    curriculum: [
      'Interactive phonics and early letter sounds',
      'Introduction to writing, shapes, and numbers',
      'Art exploration, finger painting, and clay play',
      'Social etiquettes, sharing, and self-care skills'
    ],
    routine: [
      { time: '09:00 AM', act: 'Circle Time & Morning Assembly' },
      { time: '09:40 AM', act: 'Creative Arts & Messy Play' },
      { time: '10:40 AM', act: 'Nutritious Snack & Sharing Time' },
      { time: '11:15 AM', act: 'Indoor Games & Interactive Puzzles' },
      { time: '12:30 PM', act: 'Storytelling & Language Fun' },
      { time: '01:00 PM', act: 'Lunch Break & Relaxation' },
      { time: '01:45 PM', act: 'Art Exploration & Clay Play' },
      { time: '02:30 PM', act: 'Rhymes Recap & Good-bye Circle' },
      { time: '03:00 PM', act: 'Warm Dismissal' }
    ]
  },
  lkg: {
    ageGroup: 'Lower Kindergarten',
    ageRange: '4.0 to 5.0 Years',
    milestones: [
      'Asks curious questions and speaks very fluently',
      'Draws circles/squares and handles safety scissors',
      'Identifies alphabets and associates numbers with quantities',
      'Cooperates with friends and follows classroom routines'
    ],
    curriculum: [
      'English phonics, tracing, and pre-reading skills',
      'Math readiness: counting to 50, basic addition patterns',
      'General awareness: environment, animals, community helpers',
      'Vocal performance, dramatic role-play, and team games'
    ],
    routine: [
      { time: '09:00 AM', act: 'Pledge, Assembly & Theme Discussion' },
      { time: '09:30 AM', act: 'Phonics & Pre-Writing Lab' },
      { time: '10:30 AM', act: 'Healthy Meal & Social Skills Drill' },
      { time: '11:00 AM', act: 'Playground Fun / Physical Activities' },
      { time: '12:00 PM', act: 'Logical Thinking & Puzzle Solvers' },
      { time: '01:00 PM', act: 'Lunch Break & Relaxation' },
      { time: '01:45 PM', act: 'General Awareness & Story Craft' },
      { time: '02:30 PM', act: 'Gardening / Role-Play Activities' },
      { time: '03:15 PM', act: 'Reflection & Warm Dismissal' }
    ]
  },
  ukg: {
    ageGroup: 'Upper Kindergarten',
    ageRange: '5.0 to 6.0 Years',
    milestones: [
      'Reads simple words and writes complete sentences/digits',
      'Skips, hops, and maintains advanced physical balance',
      'Understands sequence, time concepts, and basic logic',
      'Demonstrates leadership, empathy, and solves tiny conflicts'
    ],
    curriculum: [
      'Sight words reading, fluent writing, and creative speech',
      'Addition, subtraction, and advanced math sorting patterns',
      'EVS: Solar system, plants, water cycle, and human body',
      'Introductory computer games and logic building blocks'
    ],
    routine: [
      { time: '09:00 AM', act: 'General Assembly & News Sharing' },
      { time: '09:30 AM', act: 'Literacy Lab (Reading & Writing)' },
      { time: '10:30 AM', act: 'Numeracy Worksheets & Logic Puzzles' },
      { time: '11:15 AM', act: 'Snack Break & Mindful Conversations' },
      { time: '11:45 AM', act: 'Outdoor Sports / Team Building Games' },
      { time: '12:30 PM', act: 'General Awareness / Science Showcase' },
      { time: '01:00 PM', act: 'Lunch Break & Relaxation' },
      { time: '01:45 PM', act: 'Computer Games & Coding Blocks' },
      { time: '02:30 PM', act: 'EVS Projects / Creative Writing' },
      { time: '03:15 PM', act: 'Reflection Time & Home Assembly' }
    ]
  }
};

function initMilestoneFinder() {
  const ageBtns = document.querySelectorAll('.age-btn');
  const detailsBox = document.getElementById('milestone-details');
  const routineBox = document.getElementById('milestone-routine');
  const ageRangeText = document.getElementById('milestone-age-range');
  const groupText = document.getElementById('milestone-group-title');

  let activeIndex = 0;
  let progressInterval;
  let progress = 0;
  const progressLine = document.getElementById('milestone-progress-line');

  const startAutoplay = () => {
    progress = 0;
    if (progressLine) progressLine.style.width = '0%';
    
    // Clear any existing intervals
    clearInterval(progressInterval);

    const tickRate = 30; // 30ms for smooth transitions
    const totalDuration = 3000; // 3 seconds (3000ms)

    progressInterval = setInterval(() => {
      progress += (tickRate / totalDuration) * 100;
      if (progress >= 100) {
        progress = 0;
        if (progressLine) progressLine.style.width = '0%';
        activeIndex = (activeIndex + 1) % ageBtns.length;
        switchTab(activeIndex);
      } else {
        if (progressLine) progressLine.style.width = `${progress}%`;
      }
    }, tickRate);
  };

  const resetAutoplay = () => {
    clearInterval(progressInterval);
    startAutoplay();
  };

  const switchTab = (index) => {
    const btn = ageBtns[index];
    
    // Toggle active classes
    ageBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const dataKey = btn.dataset.age;
    const data = milestoneData[dataKey];

    if (data) {
      // Fade out animation transition
      const contentBox = document.querySelector('.milestone-content-box');
      contentBox.style.opacity = '0';
      contentBox.style.transform = 'translateY(10px)';

      setTimeout(() => {
        // Update texts
        groupText.textContent = data.ageGroup;
        ageRangeText.textContent = `Target Age: ${data.ageRange}`;

        // Update Milestones & Curriculum
        let milestonesHtml = `
          <h4><span>👶</span> Core Milestones</h4>
          <ul>
            ${data.milestones.map(m => `<li>${m}</li>`).join('')}
          </ul>
          <h4 style="margin-top: 1.5rem; color: var(--primary-coral);"><span>🎨</span> Program Focus</h4>
          <ul>
            ${data.curriculum.map(c => `<li>${c}</li>`).join('')}
          </ul>
        `;
        detailsBox.innerHTML = milestonesHtml;

        // Update Routine Timeline
        let routineHtml = `
          <h4><span>⏰</span> Sample Daily Routine</h4>
          <div class="routine-timeline">
            ${data.routine.map(r => `
              <div class="routine-item">
                <div class="routine-time">${r.time}</div>
                <div class="routine-activity">${r.act}</div>
              </div>
            `).join('')}
          </div>
        `;
        routineBox.innerHTML = routineHtml;

        // Fade back in
        contentBox.style.opacity = '1';
        contentBox.style.transform = 'translateY(0)';
      }, 300);
    }
  };

  ageBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      activeIndex = index;
      switchTab(index);
      resetAutoplay(); // Reset timer on manual click
    });
  });

  // Start the 3s autoplay and progress line initially
  startAutoplay();
}

/* ==========================================
   3. TESTIMONIALS CAROUSEL
   ========================================== */
function initTestimonialsCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  let autoPlayTimer;

  // Create dot indicators
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function goToSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    
    track.style.transform = `translateX(-${index * 100}%)`;
    dots[currentIndex].classList.remove('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  // Prev / Next Listeners
  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoPlay();
  });

  // Autoplay
  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  startAutoPlay();
}

/* ==========================================
   4. CONTACT FORM VALIDATION & INTERACTION
   ========================================== */
function initContactForm() {
  const form = document.getElementById('playschool-contact-form');
  const feedback = document.getElementById('form-feedback-message');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const parentName = document.getElementById('parentName').value.trim();
      const studentName = document.getElementById('studentName').value.trim();
      const childAge = document.getElementById('childAge').value;
      const phone = document.getElementById('phone').value.trim();

      // Basic front-end validations
      if (!parentName || !studentName || !phone || !childAge) {
        showFeedback('Please fill out all required fields marked with *.', 'error');
        return;
      }

      // Phone check
      const phonePattern = /^[0-9\-\+\s]{10,15}$/;
      if (!phonePattern.test(phone)) {
        showFeedback('Please enter a valid phone number (at least 10 digits).', 'error');
        return;
      }

      // Map child's age to standard friendly text
      const ageLabels = {
        toddler: '1.5 to 3.0 years (Toddlers Wing)',
        nursery: '3.0 to 4.0 years (Nursery Wing)',
        lkg: '4.0 to 5.0 years (Lower Kindergarten)',
        ukg: '5.0 to 6.0 years (Upper Kindergarten)'
      };
      const childAgeText = ageLabels[childAge] || childAge;

      // Generate Enquiry ID
      const rand = Math.floor(1000 + Math.random() * 9000);
      const enqId = `LW-2026-${rand}`;

      // Payload for Google Sheets
      const payload = {
        enquiryId: enqId,
        type: 'Campus Visit Request',
        parentName: parentName,
        phone: phone,
        childName: studentName,
        childAge: childAgeText,
        program: childAgeText
      };

      // Show sending feedback
      showFeedback('Saving details & connecting to WhatsApp... 🚀', 'success');

      // Send to Google Sheets Webhook in background
      const webhookUrl = "https://script.google.com/macros/s/AKfycbxiQRhBS2mU2Jmzgyhw7ktInBblJzIOiJt8AUoTaGD_3pGVrV49SkeVLIvPbnTQXthh/exec";
      
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Avoid CORS preflight blocks
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(() => {
        console.log("Synced to Google Sheets successfully!");
      })
      .catch((err) => {
        console.error("Sheets sync error:", err);
      });

      // Format WhatsApp Message using professional layout
      const waMessage = 
        `🎈 *Little Wings Visit Request* 🎈\n` +
        `---------------------------------\n` +
        `*Enquiry ID*: ${enqId}\n` +
        `I would like to schedule a campus visit and enquire about admissions.\n\n` +
        `*Parent Name*: ${parentName}\n` +
        `*Student Name*: ${studentName}\n` +
        `*Child's Age*: ${childAgeText}\n` +
        `*Phone*: ${phone}\n` +
        `---------------------------------\n` +
        `Please confirm my visit. Thank you!`;

      // Open WhatsApp after a short delay so the user understands what is happening
      setTimeout(() => {
        const waUrl = `https://wa.me/917995554105?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');
        showFeedback(`Request saved! Enquiry ID: ${enqId}. WhatsApp opened. 📲`, 'success');
        form.reset();
      }, 1200);
    });
  }

  function showFeedback(text, status) {
    feedback.textContent = text;
    feedback.className = `form-feedback ${status}`;
    
    // Automatically hide success alert after 8s
    if (status === 'success' && !text.includes('Sending')) {
      setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
          feedback.className = 'form-feedback';
          feedback.style.opacity = '1';
        }, 400);
      }, 8000);
    }
  }
}

/* ==========================================
   5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================== */
function initScrollEffects() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once shown
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================
   6. DRAGGABLE FLOATING LOGO
   ========================================== */
function initDraggableLogo() {
  const logo = document.getElementById('draggable-floating-logo');
  if (!logo) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;

  // Touch start or mouse down
  const dragStart = (e) => {
    // Only drag with left click
    if (e.type === 'mousedown' && e.button !== 0) return;

    // Determine event coordinates
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    isDragging = true;
    startX = clientX;
    startY = clientY;

    // Get current coordinates
    const rect = logo.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;

    logo.style.transition = 'none'; // Disable transition during drag
    logo.style.bottom = 'auto'; // Break from CSS default bottom/right properties
    logo.style.right = 'auto';
    logo.style.left = `${initialX}px`;
    logo.style.top = `${initialY}px`;
  };

  const dragMove = (e) => {
    if (!isDragging) return;

    // Prevent default scroll behaviors on mobile while dragging
    if (e.cancelable) e.preventDefault();

    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    let newX = initialX + dx;
    let newY = initialY + dy;

    // Limit position inside visible viewport boundaries
    const logoWidth = logo.offsetWidth;
    const logoHeight = logo.offsetHeight;
    const maxX = window.innerWidth - logoWidth - 10;
    const maxY = window.innerHeight - logoHeight - 10;

    newX = Math.max(10, Math.min(newX, maxX));
    newY = Math.max(10, Math.min(newY, maxY));

    logo.style.left = `${newX}px`;
    logo.style.top = `${newY}px`;
  };

  const dragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    logo.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
  };

  // Mouse drag listeners
  logo.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);

  // Touch drag listeners (mobile & tablet support)
  logo.addEventListener('touchstart', dragStart, { passive: false });
  document.addEventListener('touchmove', dragMove, { passive: false });
  document.addEventListener('touchend', dragEnd);
}

/* ==========================================
   7. AI RECEPTIONIST INTERACTIVE CALL WIDGET
   ========================================== */
function initAiCallWidget() {
  const callBtn = document.getElementById('ai-call-btn');
  const modal = document.getElementById('ai-call-modal');
  const endBtn = document.getElementById('call-end-btn');
  const muteBtn = document.getElementById('call-mute-btn');
  const speakerBtn = document.getElementById('call-speaker-btn');
  const soundWave = document.getElementById('sound-wave');
  const conversationLog = document.getElementById('ai-conversation-log');
  const textInput = document.getElementById('ai-text-input');
  const sendBtn = document.getElementById('ai-send-btn');
  const callStatus = document.getElementById('call-status');
  const callTimer = document.getElementById('call-timer');
  const langBtnEn = document.getElementById('lang-btn-en');
  const langBtnTe = document.getElementById('lang-btn-te');

  if (!callBtn || !modal) return;

  let isCallActive = false;
  let isMuted = false;
  let isSpeakerOn = true;
  let timerInterval = null;
  let secondsElapsed = 0;
  
  let currentLanguage = 'en'; 
  let currentConversationState = 0;
  let leadData = { parentName: '', childWing: '', phone: '' };
  
  let activeUtterance = null; // Prevent Chrome garbage-collection bugs with Web Speech API
  let wrapUpTimeout = null;  // Reference to clear final wrap-up timers

  const voiceScripts = {
    en: {
      state0: "Hello! Welcome to The Little Wings Play School. I'm Mia, your interactive AI receptionist. I can help you register for a school visit. May I please know your name?",
      state1: (name) => `Nice to meet you, ${name}! What program or age group are you looking for? We offer Toddlers Wing, Nursery, Lower Kindergarten, and Upper Kindergarten.`,
      state2: (wing) => `Excellent choice! Our ${wing} is a highly designed, premium environment. To complete your campus visit request, what is your WhatsApp mobile number?`,
      state3: (name) => `Thank you, ${name}! I have successfully captured your visit request. I will now open WhatsApp to complete your booking with our team. Have a magical day!`,
      retryPhone: "Please provide a valid 10-digit mobile number so we can contact you.",
      statusConnecting: "Connecting...",
      statusConnected: "Connected",
      statusListening: "Listening...",
      statusSpeaking: "Mia is speaking...",
      statusMuted: "Muted",
      statusCompleted: "Call completed!",
      alertWhatsApp: "Would you like to send the captured visit details to the school WhatsApp?"
    },
    te: {
      state0: "నమస్తే! ద లిటిల్ వింగ్స్ ప్లే స్కూల్‌కు స్వాగతం. నేను మీ ఏఐ రిసెప్షనిస్ట్ మియాను. స్కూల్ సందర్శనను బుక్ చేసుకోవడానికి నేను మీకు సహాయం చేస్తాను. దయచేసి మీ పేరు చెప్పండి?",
      state1: (name) => `మిమ్మల్ని కలవడం చాలా సంతోషంగా ఉంది, ${name} గారు! మీ బాబు లేదా పాప వయస్సు ఎంత, లేదా ఏ క్లాస్ కోసం చూస్తున్నారు? మా దగ్గర టాడ్లర్స్ వింగ్, నర్సరీ, లోయర్ కేజీ మరియు అప్పర్ కేజీ ఉన్నాయి.`,
      state2: (wing) => `చాలా మంచిది! మా దగ్గర చాలా ఉత్తమమైన వాతావరణం ఉంది. మీ సందర్శనను బుక్ చేయడానికి, దయచేసి మీ వాట్సాప్ మొబైల్ నంబర్ చెప్పండి?`,
      state3: (name) => `ధన్యవాదాలు, ${name} గారు! మీ వివరాలు నమోదయ్యాయి. బుకింగ్ పూర్తి చేయడానికి నేను ఇప్పుడు వాట్సాప్ ఓపెన్ చేస్తున్నాను. మీకు మంచి రోజు అవ్వాలని కోరుకుంటున్నాను!`,
      retryPhone: "దయచేసి మీ సరైన 10-అంకెల మొబైల్ నంబర్‌ను చెప్పండి, తద్వారా మేము మిమ్మల్ని సంప్రదించగలము.",
      statusConnecting: "కనెక్ట్ అవుతోంది...",
      statusConnected: "కనెక్ట్ అయింది",
      statusListening: "వింటోంది...",
      statusSpeaking: "మియా మాట్లాడుతోంది...",
      statusMuted: "మ్యూట్ చేయబడింది",
      statusCompleted: "కాల్ పూర్తయింది!",
      alertWhatsApp: "నమోదు చేసిన సందర్శన వివరాలను స్కూల్ వాట్సాప్‌కు పంపాలనుకుంటున్నారా?"
    }
  };

  // TTS Setup
  let femaleVoiceEn = null;
  let femaleVoiceTe = null;
  
  const setupVoice = () => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        femaleVoiceEn = voices.find(v => 
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Hazel') || v.name.includes('Female')) && 
          v.lang.startsWith('en')
        ) || voices.find(v => v.lang.startsWith('en'));
        
        femaleVoiceTe = voices.find(v => 
          v.lang.startsWith('te') || v.lang.includes('Telugu')
        ) || femaleVoiceEn;
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  };
  setupVoice();

  // TTS Speak
  const speak = (text) => {
    if (!isSpeakerOn) {
      soundWave.classList.remove('active');
      if (isCallActive && currentConversationState < 4) {
        callStatus.textContent = voiceScripts[currentLanguage].statusListening;
        startListening();
      }
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      activeUtterance = utterance; // Keep a reference to prevent garbage collection
      
      if (currentLanguage === 'te') {
        utterance.voice = femaleVoiceTe;
        utterance.lang = 'te-IN';
      } else {
        utterance.voice = femaleVoiceEn;
        utterance.lang = 'en-IN';
      }
      
      utterance.rate = currentLanguage === 'te' ? 0.90 : 0.95;
      utterance.pitch = 1.05;
      
      utterance.onstart = () => {
        soundWave.classList.add('active');
        callStatus.textContent = voiceScripts[currentLanguage].statusSpeaking;
      };

      utterance.onend = () => {
        soundWave.classList.remove('active');
        if (isCallActive && currentConversationState < 4) {
          callStatus.textContent = voiceScripts[currentLanguage].statusListening;
          startListening();
        } else if (currentConversationState === 4) {
          callStatus.textContent = voiceScripts[currentLanguage].statusCompleted;
          // Clear any pending safety timeout
          if (wrapUpTimeout) {
            clearTimeout(wrapUpTimeout);
            wrapUpTimeout = null;
          }
          // Wrap up call 1.5 seconds after final speech ends
          wrapUpTimeout = setTimeout(() => {
            if (isCallActive) {
              endCall(true);
            }
          }, 1500);
        }
      };

      utterance.onerror = (e) => {
        console.error("Speech Synthesis Error:", e);
        soundWave.classList.remove('active');
        if (isCallActive) {
          if (currentConversationState === 4) {
            endCall(true);
          } else {
            callStatus.textContent = voiceScripts[currentLanguage].statusListening;
            startListening();
          }
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (isCallActive) {
        if (currentConversationState === 4) {
          endCall(true);
        } else {
          callStatus.textContent = voiceScripts[currentLanguage].statusListening;
          startListening();
        }
      }
    }
  };

  // Speech Recognition
  let recognition = null;
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      if (isMuted || !isCallActive) {
        recognition.stop();
        return;
      }
      soundWave.classList.add('active');
      callStatus.textContent = voiceScripts[currentLanguage].statusListening;
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      addChatMessage(speechToText, 'user');
      processUserResponse(speechToText);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      soundWave.classList.remove('active');
    };

    recognition.onend = () => {
      soundWave.classList.remove('active');
      if (isCallActive && callStatus.textContent === voiceScripts[currentLanguage].statusListening) {
        callStatus.textContent = voiceScripts[currentLanguage].statusConnected;
      }
    };
  }

  const startListening = () => {
    if (recognition && !isMuted && isCallActive) {
      recognition.lang = currentLanguage === 'en' ? 'en-IN' : 'te-IN';
      try {
        recognition.start();
      } catch (e) {
        // Already running
      }
    }
  };

  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        // Ignore
      }
    }
  };

  const addChatMessage = (text, sender) => {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    bubble.textContent = text;
    conversationLog.appendChild(bubble);
    conversationLog.scrollTop = conversationLog.scrollHeight;
  };

  const startTimer = () => {
    secondsElapsed = 0;
    timerInterval = setInterval(() => {
      secondsElapsed++;
      const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
      const secs = (secondsElapsed % 60).toString().padStart(2, '0');
      callTimer.textContent = `${mins}:${secs}`;
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    callTimer.textContent = '00:00';
  };

  const startCall = () => {
    if (isCallActive) return;
    isCallActive = true;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    currentLanguage = 'en';
    langBtnEn.classList.add('active');
    langBtnTe.classList.remove('active');
    
    callStatus.textContent = voiceScripts[currentLanguage].statusConnecting;
    conversationLog.innerHTML = '';
    leadData = { parentName: '', childWing: '', phone: '' };
    currentConversationState = 0;
    
    isMuted = false;
    muteBtn.classList.remove('active');
    isSpeakerOn = true;
    speakerBtn.classList.add('active');

    setTimeout(() => {
      callStatus.textContent = voiceScripts[currentLanguage].statusConnected;
      startTimer();
      triggerConversationState();
    }, 1200);
  };

  const endCall = (isAutomatic = false) => {
    if (!isCallActive) return;
    isCallActive = false;
    stopTimer();
    stopListening();
    
    if (wrapUpTimeout) {
      clearTimeout(wrapUpTimeout);
      wrapUpTimeout = null;
    }
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    soundWave.classList.remove('active');

    if ((leadData.parentName || leadData.phone) && isAutomatic) {
      sendWhatsAppLead();
    } else if (leadData.parentName || leadData.phone) {
      if (confirm(voiceScripts[currentLanguage].alertWhatsApp)) {
        sendWhatsAppLead();
      }
    }
  };

  const sendWhatsAppLead = () => {
    const parent = leadData.parentName || 'Parent';
    const wing = leadData.childWing || 'Not Specified';
    const phoneNum = leadData.phone || 'Not Specified';

    const rand = Math.floor(1000 + Math.random() * 9000);
    const enqId = `LW-VOICE-${rand}`;

    // Payload for Google Sheets Webhook
    const payload = {
      enquiryId: enqId,
      type: 'AI Call Lead',
      parentName: parent,
      phone: phoneNum,
      childName: '',
      childAge: wing,
      program: wing,
      comments: 'Captured via AI Voice Receptionist'
    };

    // Send to Google Sheets Webhook
    const webhookUrl = "https://script.google.com/macros/s/AKfycbxiQRhBS2mU2Jmzgyhw7ktInBblJzIOiJt8AUoTaGD_3pGVrV49SkeVLIvPbnTQXthh/exec";
    
    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      console.log("Call Lead Synced successfully!");
    })
    .catch((err) => {
      console.error("Call Lead Sync error:", err);
    });

    // Send WhatsApp message to 7995554105
    const waMessage = 
      `🤖 *Lead Captured by AI Receptionist Mia* 🎈\n` +
      `---------------------------------\n` +
      `*Enquiry ID*: ${enqId}\n` +
      `I just spoke to Mia on the website and would like to confirm my school visit!\n\n` +
      `*Parent Name*: ${parent}\n` +
      `*Child's Wing*: ${wing}\n` +
      `*WhatsApp Phone*: ${phoneNum}\n` +
      `---------------------------------\n` +
      `Please confirm my visit date and time. Thank you!`;

    const waUrl = `https://wa.me/917995554105?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
  };

  const triggerConversationState = () => {
    let responseText = '';
    const script = voiceScripts[currentLanguage];
    
    switch (currentConversationState) {
      case 0:
        responseText = script.state0;
        addChatMessage(responseText, 'ai');
        speak(responseText);
        break;

      case 1:
        responseText = script.state1(leadData.parentName);
        addChatMessage(responseText, 'ai');
        speak(responseText);
        break;

      case 2:
        responseText = script.state2(leadData.childWing);
        addChatMessage(responseText, 'ai');
        speak(responseText);
        break;

      case 3:
        responseText = script.state3(leadData.parentName);
        addChatMessage(responseText, 'ai');
        speak(responseText);
        currentConversationState = 4;
        
        // Safety fallback timeout: wait 12s if speaking, or 3s if speaker is off
        if (wrapUpTimeout) {
          clearTimeout(wrapUpTimeout);
        }
        wrapUpTimeout = setTimeout(() => {
          if (isCallActive) {
            endCall(true);
          }
        }, isSpeakerOn ? 12000 : 3000);
        break;
    }
  };

  const processUserResponse = (text) => {
    text = text.trim();
    if (!text) return;

    stopListening();

    switch (currentConversationState) {
      case 0:
        leadData.parentName = text;
        currentConversationState = 1;
        setTimeout(triggerConversationState, 600);
        break;

      case 1:
        const lowerText = text.toLowerCase();
        if (lowerText.includes('toddler') || lowerText.includes('టాడ్లర్')) {
          leadData.childWing = 'Toddlers Wing (1.5 - 3.0 Years)';
        } else if (lowerText.includes('nursery') || lowerText.includes('నర్సరీ')) {
          leadData.childWing = 'Nursery Wing (3.0 - 4.0 Years)';
        } else if (lowerText.includes('lower') || lowerText.includes('lkg') || lowerText.includes('l.k.g') || lowerText.includes('లోయర్')) {
          leadData.childWing = 'Lower Kindergarten (4.0 - 5.0 Years)';
        } else if (lowerText.includes('upper') || lowerText.includes('ukg') || lowerText.includes('u.k.g') || lowerText.includes('అప్పర్') || lowerText.includes('kindergarten')) {
          leadData.childWing = 'Upper Kindergarten (5.0 - 6.0 Years)';
        } else {
          leadData.childWing = text;
        }
        
        currentConversationState = 2;
        setTimeout(triggerConversationState, 600);
        break;

      case 2:
        const digits = text.replace(/\D/g, '');
        if (digits.length >= 10) {
          leadData.phone = digits;
          currentConversationState = 3;
          setTimeout(triggerConversationState, 600);
        } else {
          const retryMessage = voiceScripts[currentLanguage].retryPhone;
          addChatMessage(retryMessage, 'ai');
          speak(retryMessage);
        }
        break;
    }
  };

  const handleTextInput = () => {
    const text = textInput.value.trim();
    if (!text) return;

    addChatMessage(text, 'user');
    textInput.value = '';
    processUserResponse(text);
  };

  const changeLanguage = (lang) => {
    if (currentLanguage === lang) return;
    currentLanguage = lang;
    
    if (lang === 'en') {
      langBtnEn.classList.add('active');
      langBtnTe.classList.remove('active');
    } else {
      langBtnTe.classList.add('active');
      langBtnEn.classList.remove('active');
    }
    
    if (recognition) {
      recognition.lang = lang === 'en' ? 'en-IN' : 'te-IN';
    }
    
    if (isCallActive) {
      triggerConversationState();
    }
  };

  langBtnEn.addEventListener('click', () => changeLanguage('en'));
  langBtnTe.addEventListener('click', () => changeLanguage('te'));

  callBtn.addEventListener('click', startCall);
  endBtn.addEventListener('click', () => endCall(false));
  
  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.classList.toggle('active', isMuted);
    if (isMuted) {
      stopListening();
      callStatus.textContent = voiceScripts[currentLanguage].statusMuted;
      soundWave.classList.remove('active');
    } else {
      callStatus.textContent = voiceScripts[currentLanguage].statusListening;
      startListening();
    }
  });

  speakerBtn.addEventListener('click', () => {
    isSpeakerOn = !isSpeakerOn;
    speakerBtn.classList.toggle('active', isSpeakerOn);
    if (!isSpeakerOn) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      soundWave.classList.remove('active');
    } else {
      if (callStatus.textContent === voiceScripts[currentLanguage].statusSpeaking) {
        soundWave.classList.add('active');
      }
    }
  });

  sendBtn.addEventListener('click', handleTextInput);
  textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleTextInput();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      endCall(false);
    }
  });
}
