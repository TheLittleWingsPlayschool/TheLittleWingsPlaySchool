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
    ageGroup: 'Toddler Wing',
    ageRange: '1.5 to 2.5 Years',
    milestones: [
      'Begins basic speech and mimics sounds',
      'Walks, climbs steps, and begins running',
      'Explores physical coordinates and objects',
      'Starts playing alongside other kids (parallel play)'
    ],
    curriculum: [
      'Sensory and tactile learning activities',
      'Nursery rhymes, storytelling, and soft songs',
      'Gross motor play (crawling, rolling, balancing)',
      'Basic vocabulary and object identification'
    ],
    routine: [
      { time: '09:00 AM', act: 'Welcome & Gentle Circle Time' },
      { time: '09:30 AM', act: 'Sensory Exploration & Play' },
      { time: '10:30 AM', act: 'Healthy Snack & Milk Break' },
      { time: '11:00 AM', act: 'Motor Skills / Music & Movement' },
      { time: '12:00 PM', act: 'Nap Time & Rest' },
      { time: '01:00 PM', act: 'Nursery Rhymes & Soft Songs' },
      { time: '02:00 PM', act: 'Free Play & Sensory Bins' },
      { time: '03:00 PM', act: 'Storytime & Warm Dismissal' }
    ]
  },
  playgroup: {
    ageGroup: 'Playgroup Wing',
    ageRange: '2.5 to 3.5 Years',
    milestones: [
      'Expresses feelings and short sentences clearly',
      'Jumps, catches large balls, and sorts shapes/colors',
      'Feeds self and handles simple toys independently',
      'Shares toys and makes friends enthusiastically'
    ],
    curriculum: [
      'Interactive phonics and letters sounds',
      'Fun counting, shapes and colors grouping',
      'Art exploration, finger painting, and clay play',
      'Basic social etiquettes and self-care skills'
    ],
    routine: [
      { time: '09:00 AM', act: 'Circle Time & Morning Warm-up' },
      { time: '09:40 AM', act: 'Creative Arts & Messy Play' },
      { time: '10:40 AM', act: 'Nutritious Snack & Sharing Time' },
      { time: '11:15 AM', act: 'Indoor Games & Interactive Puzzles' },
      { time: '12:30 PM', act: 'Storytelling & Language Fun' },
      { time: '01:15 PM', act: 'Lunch Break & Free Play' },
      { time: '02:00 PM', act: 'Art Exploration & Clay Play' },
      { time: '03:00 PM', act: 'Rhymes Recap & Good-bye Circle' }
    ]
  },
  nursery: {
    ageGroup: 'Nursery Wing',
    ageRange: '3.5 to 4.5 Years',
    milestones: [
      'Asks countless questions and speaks in full sentences',
      'Draws circles/squares and handles child safety scissors',
      'Identifies alphabets and associates numbers with quantities',
      'Cooperates with friends and follows classroom tasks'
    ],
    curriculum: [
      'English phonics, tracing, and pre-reading skills',
      'Math readiness: counting up to 20, basic patterns',
      'General awareness: environment, animals, community helpers',
      'Vocal performance, dramatic role-play, and gardening'
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
  kindergarten: {
    ageGroup: 'Kindergarten Wing',
    ageRange: '4.5 to 6.0 Years',
    milestones: [
      'Reads simple words and writes complete letters/digits',
      'Skips, hops, and maintains advanced balance',
      'Understands sequence, time concepts, and basic logic',
      'Demonstrates leadership, empathy, and solves tiny conflicts'
    ],
    curriculum: [
      'Sight words reading, handwriting, and short sentences',
      'Basic addition, subtraction, and sorting patterns',
      'EVS: Solar system, plants, water cycle, and human body',
      'Introductory computer games and kids coding blocks'
    ],
    routine: [
      { time: '09:00 AM', act: 'General Assembly & News Sharing' },
      { time: '09:30 AM', act: 'Literacy Lab (Reading & Writing)' },
      { time: '10:30 AM', act: 'Numeracy Worksheets & Logic Puzzles' },
      { time: '11:15 AM', act: 'Snack Break & Mindful Conversations' },
      { time: '11:45 AM', act: 'Outdoor Sports / Team Building Games' },
      { time: '12:30 PM', act: 'General Awareness / Science Showcase' },
      { time: '01:15 PM', act: 'Lunch Break & Relaxation' },
      { time: '02:00 PM', act: 'Computer Games & Coding Blocks' },
      { time: '02:45 PM', act: 'EVS Projects / Creative Writing' },
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

  ageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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
    });
  });
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
      const childAge = document.getElementById('childAge').value;
      const phone = document.getElementById('phone').value.trim();

      // Basic front-end validations
      if (!parentName || !phone || !childAge) {
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
        toddler: '1.5 to 2.5 years (Toddlers Wing)',
        playgroup: '2.5 to 3.5 years (Playgroup Wing)',
        nursery: '3.5 to 4.5 years (Nursery Wing)',
        kindergarten: '4.5 to 6.0 years (Kindergarten Wing)'
      };
      const childAgeText = ageLabels[childAge] || childAge;

      // Format WhatsApp Message using professional layout
      const waMessage = 
        `Hello The Little Wings Play School! 🎈\n` +
        `I would like to schedule a campus visit and enquire about admissions.\n\n` +
        `*Parent Name*: ${parentName}\n` +
        `*Child's Age*: ${childAgeText}\n` +
        `*Phone*: ${phone}`;

      // Show instant feedback
      showFeedback('Connecting to WhatsApp... 🚀', 'success');

      // Open WhatsApp after a short delay so the user understands what is happening
      setTimeout(() => {
        const waUrl = `https://wa.me/917995554105?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');
        showFeedback('WhatsApp opened! Please click "Send" in the WhatsApp chat to submit your enquiry. 📲', 'success');
        form.reset();
      }, 1000);
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
