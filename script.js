/* =============================================
   DATA
   ============================================= */
const INSTRUCTORS = [
  {
    id: 'rob-lester',
    initials: 'RL',
    name: 'Rob Lester',
    title: 'Professional Driving Instructor',
    location: "Melbourne's Eastern Suburbs",
    experience: '20+ years',
    customQS: true,
    lessonFees: [
      { duration: '60 min', price: '$135' },
      { duration: '90 min', price: '$180' },
    ],
    vehicles: [
      { type: 'Auto',   car: 'Toyota Corolla Cross' },
      { type: 'Manual', car: 'Toyota Corolla' },
    ],
    availability: 'Weekdays',
    photo: 'rob-lester.jpg',
    email: 'rob@example.com',
    phone: '0415 678 901',
    bio: "Rob is a professional driving instructor based in Melbourne's Eastern Suburbs with over 20 years of experience helping learner drivers build confidence and pass their driving test safely and efficiently. His calm, structured approach has helped thousands of students become safe, independent drivers.",
  },
  {
    id: 'john-stevens',
    initials: 'JS',
    name: 'John Stevens',
    title: 'Professional Driving Instructor',
    location: 'Melbourne East',
    transmission: 'Manual & Automatic',
    experience: '12+ years',
    fee: 'From $90–$120/hr',
    availability: 'Weekdays / Weekends',
    photo: 'john-stevens.jpg',
    email: 'john@example.com',
    phone: '0412 345 678',
    bio: "John is a professional driving instructor based in Melbourne's east with over 12 years of experience helping learner drivers build confidence and pass their driving test safely and efficiently. His calm, structured approach has helped hundreds of students become safe, independent drivers.",
  },
  {
    id: 'lisa-wong',
    initials: 'LW',
    name: 'Lisa Wong',
    title: 'Professional Driving Instructor',
    location: 'Melbourne CBD',
    transmission: 'Automatic',
    experience: '8+ years',
    fee: 'From $95–$115/hr',
    availability: 'Weekdays / Saturdays',
    photo: 'lisa-wong.jpg',
    email: 'lisa@example.com',
    phone: '0413 456 789',
    bio: "Lisa is an experienced automatic driving instructor operating in Melbourne's CBD and inner suburbs. With 8 years of experience, she specialises in building confidence in busy urban environments, helping students master parallel parking, roundabouts, and city traffic with ease.",
  },
  {
    id: 'mark-harris',
    initials: 'MH',
    name: 'Mark Harris',
    title: 'Professional Driving Instructor',
    location: 'Melbourne West',
    transmission: 'Manual & Automatic',
    experience: '15+ years',
    fee: 'From $95–$125/hr',
    availability: 'Weekdays / Weekends',
    photo: 'mark-harris.jpg',
    email: 'mark@example.com',
    phone: '0414 567 890',
    bio: "Mark brings over 15 years of driving instruction experience to Melbourne's western suburbs. Known for his patient, structured teaching style, Mark has helped learners of all ages — from nervous first-timers to experienced drivers seeking to improve — become safe, confident road users.",
  }
];

/* =============================================
   SVG ICONS
   ============================================= */
const ICONS = {
  shield:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  document:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  phone:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 0 0 0 .82 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  user:       `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  pin:        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  car:        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  clock:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  dollar:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  users:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  award:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  star:       `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  mail:       `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  phoneSmall: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 0 0 0 .82 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  check:      `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38a169" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  info:       `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
};

/* =============================================
   DISCLAIMER  (profile page footer)
   ============================================= */
const PROFILE_DISCLAIMER = `
  <div class="profile-disclaimer">
    <div class="profile-disclaimer-inner">
      <span class="disclaimer-icon">${ICONS.info}</span>
      <p>All instructor information is provided by individual instructors. The Professional Driving Instructors Network does not independently verify or guarantee qualifications, insurance, or compliance. Information is subject to change and should be confirmed directly with the instructor.</p>
    </div>
  </div>
`;

/* =============================================
   INSTRUCTOR CARD  (price hidden — visible on profile only)
   ============================================= */
function instructorCardHTML(inst) {
  const photoEl = inst.photo
    ? `<img src="${inst.photo}" alt="${inst.name}" class="card-photo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="avatar-initials" style="display:none">${inst.initials}</div>`
    : `<div class="avatar-initials">${inst.initials}</div>`;

  const vehicleRow = inst.customQS
    ? inst.vehicles.map(v => `<div class="card-meta-row">${ICONS.car} ${v.type} — ${v.car}</div>`).join('')
    : `<div class="card-meta-row">${ICONS.car} ${inst.transmission}</div>`;

  return `
    <div class="card" data-action="profile" data-id="${inst.id}">
      <div class="card-photo-wrap">${photoEl}</div>
      <div class="card-body">
        <div class="card-name">${inst.name}</div>
        <div class="card-meta-row">${ICONS.pin} ${inst.location}</div>
        ${vehicleRow}
        <div class="card-meta-row">${ICONS.clock} ${inst.experience}</div>
        <button class="btn btn-navy btn-full" data-action="profile" data-id="${inst.id}">View Profile</button>
      </div>
    </div>
  `;
}

/* =============================================
   PAGES
   ============================================= */
function renderHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <h1>Find a Professional Driving Instructor Near You</h1>
        <p>A network of experienced, independent driving instructors who take pride in quality, safety, and results.</p>
        <div class="hero-btns">
          <button class="btn btn-navy btn-lg" data-action="nav" data-page="find">Browse Instructors</button>
          <button class="btn btn-navy-outline btn-lg" data-action="nav" data-page="join">Join the Network</button>
        </div>
      </div>
    </section>

    <section class="section why-section">
      <div class="container">
        <h2 class="section-title">Why Choose The Professional Driving Instructors Network?</h2>
        <div class="why-grid reveal">
          <div class="why-card">
            <div class="icon-circle">${ICONS.shield}</div>
            <h3>Experienced Instructors</h3>
            <p>Professionals with years of experience helping learners succeed</p>
          </div>
          <div class="why-card">
            <div class="icon-circle">${ICONS.document}</div>
            <h3>No Commission Platforms</h3>
            <p>Instructors keep 100% of their lesson fees</p>
          </div>
          <div class="why-card">
            <div class="icon-circle">${ICONS.phone}</div>
            <h3>Direct Contact</h3>
            <p>Connect directly with your instructor — no middleman</p>
          </div>
          <div class="why-card">
            <div class="icon-circle">${ICONS.user}</div>
            <h3>Professional Standards</h3>
            <p>Quality-focused instructors who take pride in their work</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section featured-section">
      <div class="container">
        <h2 class="section-title reveal">Featured Instructors</h2>
        <div class="instructor-grid">
          ${INSTRUCTORS.map(i => instructorCardHTML(i)).join('')}
        </div>
      </div>
    </section>

    <section class="section-sm location-section">
      <div class="container">
        <h2 class="section-title">Find Instructors by Location</h2>
        <div class="location-tabs">
          <button class="location-tab active" data-action="nav" data-page="find">Melbourne</button>
          <button class="location-tab coming-soon">Sydney (Coming Soon)</button>
          <button class="location-tab coming-soon">Brisbane (Coming Soon)</button>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content reveal">
        <h2>Are you a professional driving instructor?</h2>
        <button class="btn btn-gold btn-lg" data-action="nav" data-page="join">Join the Network</button>
      </div>
    </section>
  `;
}

function renderFind() {
  return `
    <div class="navy-banner">
      <h1>Driving Instructors in Melbourne</h1>
      <p>Looking for a professional driving instructor in Melbourne? The Professional Driving Instructors Network connects you with experienced, independent instructors across Melbourne's suburbs.</p>
    </div>
    <div class="container">
      <div class="find-grid">
        ${INSTRUCTORS.map(i => instructorCardHTML(i)).join('')}
      </div>
    </div>
  `;
}

function renderProfile(id) {
  const inst = INSTRUCTORS.find(i => i.id === id) || INSTRUCTORS[0];

  const avatarEl = inst.photo
    ? `<img src="${inst.photo}" alt="${inst.name}" class="profile-photo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="profile-avatar-circle" style="display:none">${inst.initials}</div>`
    : `<div class="profile-avatar-circle">${inst.initials}</div>`;

  let qsRows = '';
  if (inst.customQS) {
    const feesHTML    = inst.lessonFees.map(f => `<div class="qs-item-value">${f.duration} — ${f.price}</div>`).join('');
    const vehiclesHTML = inst.vehicles.map(v => `<div class="qs-item-value">${v.type} — ${v.car}</div>`).join('');
    qsRows = `
      <div><div class="qs-item-label">Experience</div><div class="qs-item-value">${inst.experience}</div></div>
      <div><div class="qs-item-label">Lesson Fees</div>${feesHTML}</div>
      <div><div class="qs-item-label">Vehicles</div>${vehiclesHTML}</div>
      <div><div class="qs-item-label">Availability</div><div class="qs-item-value">${inst.availability}</div></div>
    `;
  } else {
    qsRows = `
      <div><div class="qs-item-label">Experience</div><div class="qs-item-value">${inst.experience}</div></div>
      <div><div class="qs-item-label">Lesson Fee</div><div class="qs-item-value">${inst.fee}</div></div>
      <div><div class="qs-item-label">Transmission</div><div class="qs-item-value">${inst.transmission}</div></div>
      <div><div class="qs-item-label">Availability</div><div class="qs-item-value">${inst.availability}</div></div>
    `;
  }

  return `
    <div class="profile-hero">
      <div class="profile-hero-inner">
        <div class="profile-avatar-wrap">
          ${avatarEl}
          <div>
            <div class="profile-name">${inst.name}</div>
            <div class="profile-title">${inst.title}</div>
            <div class="profile-location">${ICONS.pin} ${inst.location}</div>
          </div>
        </div>
        <div class="quick-summary">
          <div class="qs-title">Quick Summary</div>
          <div class="qs-grid">${qsRows}</div>
          <div class="qs-btns">
            <a href="tel:${inst.phone}" class="btn btn-navy">${ICONS.phoneSmall} Call Instructor</a>
            <a href="mailto:${inst.email}" class="btn btn-gold">${ICONS.mail} Send Enquiry</a>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-about">
      <div class="profile-about-inner">
        <h2>About ${inst.name}</h2>
        <p>${inst.bio}</p>
      </div>
    </div>

    ${PROFILE_DISCLAIMER}
  `;
}

function renderJoin() {
  return `
    <div class="join-hero">
      <h1>Join the Network</h1>
      <p>Are you a professional driving instructor who takes pride in your work? Apply to join our network.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="join-benefits">
          <div class="benefit-card"><div class="icon-circle">${ICONS.dollar}</div><h3>Keep 100% of Your Fees</h3><p>No commissions, no percentage cuts, no hidden charges.</p></div>
          <div class="benefit-card"><div class="icon-circle">${ICONS.users}</div><h3>Free Exposure to New Students</h3><p>Get discovered by learners actively searching for quality instructors.</p></div>
          <div class="benefit-card"><div class="icon-circle">${ICONS.award}</div><h3>Professional Branding</h3><p>Be presented as a professional, not a commodity listing.</p></div>
          <div class="benefit-card"><div class="icon-circle">${ICONS.star}</div><h3>Founding Member Offer</h3><p>Join now as a founding member and lock in benefits as the network grows.</p></div>
        </div>
      </div>
    </section>
    <div class="apply-form-wrap">
      <div class="apply-form-box" id="join-form-box">
        <div class="apply-form-title">Apply to Join</div>
        <div class="form-group"><label class="form-label">Full Name <span>*</span></label><input type="text" class="form-input" placeholder="Your full name" id="join-name" /></div>
        <div class="form-group"><label class="form-label">Email <span>*</span></label><input type="email" class="form-input" placeholder="your@email.com" id="join-email" /></div>
        <div class="form-group"><label class="form-label">Phone</label><input type="tel" class="form-input" placeholder="0412 345 678" id="join-phone" /></div>
        <div class="form-group"><label class="form-label">Location / Suburbs Covered</label><input type="text" class="form-input" placeholder="e.g. Melbourne East" id="join-location" /></div>
        <div class="form-group"><label class="form-label">Years of Experience</label><input type="text" class="form-input" placeholder="e.g. 10+" id="join-exp" /></div>
        <div class="form-group"><label class="form-label">Tell us about yourself</label><textarea class="form-input" placeholder="Brief overview of your experience and teaching style" id="join-bio"></textarea></div>
        <button class="btn btn-navy btn-full btn-lg" id="join-submit">Apply to Join</button>
      </div>
    </div>
  `;
}

function renderAbout() {
  return `
    <div class="about-hero"><h1>About Us</h1></div>
    <section class="about-content">
      <div class="container-narrow">
        <p>The Professional Driving Instructors Network was created to support experienced instructors who take pride in their work and want to operate independently, without being forced to compete on price.</p>
        <p>Too often, talented instructors are listed alongside underqualified newcomers on discount-driven platforms that erode trust, lower standards, and devalue the profession. We believe there's a better way.</p>
        <p>Our network is built on a simple principle: <strong>quality instruction deserves quality presentation</strong>. We carefully list our instructors and position our members as the professionals they are.</p>
        <p>For learners, this means confidence. You're choosing from a network of experienced professionals selected for their commitment to quality and safety.</p>
        <p>For instructors, this means respect. No commission fees. No race to the bottom on pricing. No algorithm deciding your visibility. Just a professional platform that presents your business the way it deserves to be presented.</p>
        <p>We're starting in Melbourne, with plans to expand to Sydney and Brisbane. If you're a professional instructor who shares our values, we'd love to hear from you.</p>
      </div>
    </section>
  `;
}

function renderPricing() {
  return `
    <div class="pricing-hero"><h1>Pricing</h1><p>Transparent, fair pricing with no hidden fees or commissions.</p></div>
    <section class="pricing-content">
      <div class="container-narrow">
        <h2>Why We Don't Compete on Price</h2>
        <p>Many platforms focus on the cheapest lesson available. We don't.</p>
        <p>Lower prices often lead to rushed lessons, inexperienced instruction, inconsistent quality, and instructors needing to overbook to survive.</p>
        <p>Instead, we focus on <strong>quality instruction, better outcomes, and safer drivers</strong>.</p>
        <hr class="pricing-divider" />
        <h2>Independent Instructor Pricing</h2>
        <p>All instructors on this platform are independent professionals. They set their own pricing, reflecting their experience and expertise.</p>
        <p>Typical lesson pricing across the network generally falls within:</p>
        <div class="price-highlight">$90 – $135 per hour <span>(guide only)</span></div>
        <p>Some instructors may charge more or less depending on experience level, vehicle type, lesson type, and location.</p>
        <hr class="pricing-divider" />
        <h2>No Commission Model</h2>
        <p>Unlike many booking platforms, we do not take a percentage of lesson fees. This means instructors keep 100% of their earnings, pricing is not inflated to cover platform fees, and no hidden charges are passed onto learners.</p>
        <hr class="pricing-divider" />
        <h2>Network Membership (For Instructors)</h2>
        <p>Instructors pay a flat annual listing fee to be featured on the network. There are no commissions, no per-booking fees, and no lock-in contracts.</p>
        <p>As a founding member, early joiners lock in introductory pricing as the network grows. <a href="#" data-action="nav" data-page="join" style="color:var(--navy);font-weight:600;text-decoration:underline;">Apply to join</a> to find out more.</p>
      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <div class="contact-hero"><h1>Contact Us</h1><p>Have a question? We'd love to hear from you.</p></div>
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <p>Whether you're a learner looking for more information, or an instructor interested in joining the network, reach out and we'll get back to you promptly.</p>
            <div class="contact-detail">${ICONS.mail}<span>hello@professionaldrivinginstructors.com.au</span></div>
            <div class="contact-detail">${ICONS.phoneSmall}<span>1800 DRIVE IN (1800 374 833)</span></div>
            <div class="contact-detail">${ICONS.pin}<span>Melbourne, Victoria, Australia</span></div>
          </div>
          <div id="contact-form-wrap">
            <div class="form-group"><label class="form-label">Full Name <span style="color:#e53e3e">*</span></label><input type="text" class="form-input" placeholder="Your full name" id="c-name" /></div>
            <div class="form-group"><label class="form-label">Email <span style="color:#e53e3e">*</span></label><input type="email" class="form-input" placeholder="your@email.com" id="c-email" /></div>
            <div class="form-group"><label class="form-label">Subject</label><input type="text" class="form-input" placeholder="How can we help?" id="c-subject" /></div>
            <div class="form-group"><label class="form-label">Message <span style="color:#e53e3e">*</span></label><textarea class="form-input" placeholder="Your message..." id="c-message" style="min-height:140px"></textarea></div>
            <button class="btn btn-navy btn-full btn-lg" id="contact-submit">Send Message</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* =============================================
   ROUTER — with History API for Back button
   ============================================= */
function getPageContent(page, extra) {
  switch (page) {
    case 'find':    return renderFind();
    case 'profile': return renderProfile(extra);
    case 'join':    return renderJoin();
    case 'about':   return renderAbout();
    case 'pricing': return renderPricing();
    case 'contact': return renderContact();
    default:        return renderHome();
  }
}

function navigate(page, extra, pushState = true) {
  const app = document.getElementById('app');
  app.innerHTML = getPageContent(page, extra);
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update active links in both desktop and mobile nav
  updateActiveLinks(page);

  // Close mobile dropdown
  closeMenu();

  // Push to browser history so Back/Forward work
  if (pushState) {
    const state = { page, extra: extra || null };
    const url   = extra ? `#${page}/${extra}` : `#${page}`;
    history.pushState(state, '', url);
  }

  bindPageEvents();

  // Init scroll reveal for new page content
  setTimeout(initReveal, 50);
}

function bindPageEvents() {
  document.querySelectorAll('[data-action="nav"]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); navigate(el.dataset.page); });
  });

  document.querySelectorAll('[data-action="profile"]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); navigate('profile', el.dataset.id); });
  });

  const joinSubmit = document.getElementById('join-submit');
  if (joinSubmit) {
    joinSubmit.addEventListener('click', () => {
      const name  = document.getElementById('join-name').value.trim();
      const email = document.getElementById('join-email').value.trim();
      if (!name || !email) { alert('Please fill in your full name and email address.'); return; }
      document.getElementById('join-form-box').innerHTML = `
        <div class="success-box">
          <div class="success-icon">${ICONS.check}</div>
          <h3>Application Received!</h3>
          <p>Thank you, ${name}. We'll review your application and be in touch within 2–3 business days.</p>
        </div>`;
    });
  }

  const contactSubmit = document.getElementById('contact-submit');
  if (contactSubmit) {
    contactSubmit.addEventListener('click', () => {
      const name  = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const msg   = document.getElementById('c-message').value.trim();
      if (!name || !email || !msg) { alert('Please fill in your name, email, and message.'); return; }
      document.getElementById('contact-form-wrap').innerHTML = `
        <div class="success-box">
          <div class="success-icon">${ICONS.check}</div>
          <h3>Message Sent!</h3>
          <p>Thanks ${name}, we've received your message and will get back to you shortly.</p>
        </div>`;
    });
  }
}

/* =============================================
   NAVBAR EVENTS  (desktop + mobile dropdown)
   ============================================= */
function closeMenu() {
  const hamburger = document.getElementById('hamburger');
  const dropdown  = document.getElementById('nav-dropdown');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  dropdown.classList.remove('open');
}

function bindNavEvents() {
  const hamburger = document.getElementById('hamburger');
  const dropdown  = document.getElementById('nav-dropdown');

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = dropdown.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      dropdown.classList.add('open');
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.navbar') && !e.target.closest('#nav-dropdown')) {
      closeMenu();
    }
  });

  // Desktop nav links
  document.querySelectorAll('#nav-links-desktop .nav-link').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); navigate(link.dataset.page); });
  });

  // Mobile dropdown nav links
  document.querySelectorAll('#nav-dropdown .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();
      navigate(link.dataset.page);
    });
  });

  // Logo
  document.querySelector('.nav-logo').addEventListener('click', e => { e.preventDefault(); navigate('home'); });

  // Footer links
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); navigate(link.dataset.page); });
  });

  // Navbar scroll shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* Update active nav link (both desktop and mobile) */
function updateActiveLinks(page) {
  const allLinks = document.querySelectorAll('#nav-links-desktop .nav-link, #nav-dropdown .nav-link');
  allLinks.forEach(link => {
    const isActive = link.dataset.page === page ||
                     (page === 'profile' && link.dataset.page === 'find');
    link.classList.toggle('active', isActive);
  });
}

/* =============================================
   SCROLL-REVEAL OBSERVER
   ============================================= */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* =============================================
   BROWSER BACK / FORWARD
   ============================================= */
window.addEventListener('popstate', e => {
  if (e.state) {
    navigate(e.state.page, e.state.extra || null, false);
  } else {
    navigate('home', null, false);
  }
});

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  bindNavEvents();
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const [page, extra] = hash.split('/');
    navigate(page || 'home', extra || null, false);
    history.replaceState({ page: page || 'home', extra: extra || null }, '', window.location.hash);
  } else {
    navigate('home', null, false);
    history.replaceState({ page: 'home', extra: null }, '', '#home');
  }
});
