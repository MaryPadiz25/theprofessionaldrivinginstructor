/* =============================================
   CONTACT DETAILS — OBFUSCATED
   Phone/email stored as char-code arrays so they
   are NOT readable as plain text in page source.
   Decoded only at the moment of use (click/send).
   ============================================= */
function dec(arr) { return arr.map(c => String.fromCharCode(c)).join(''); }

const CONTACT = {
  'rob-lester':  {
    p: [48,52,49,50,32,48,48,54,32,49,57,57],
    e: [105,110,102,111,64,108,101,97,114,110,50,100,114,105,118,101,46,99,111,109,46,97,117],
    svc: 'service_qmll1g9', tpl: 'template_v9nyycm',  
    unavailable: false
  },
  'john-stevens': {
    p: [48,52,49,50,32,51,52,53,32,54,55,56],
    e: [109,97,114,121,106,111,121,46,112,97,100,105,122,49,64,103,109,97,105,108,46,99,111,109],
    svc: 'maryjoy.padiz1@gmail.com', tpl: '',
    unavailable: false
  },
  'lisa-wong': {
    p: [48,52,49,51,32,52,53,54,32,55,56,57],
    e: [109,97,114,105,97,102,114,101,121,112,97,100,105,122,64,103,109,97,105,108,46,99,111,109],
    svc: null, tpl: null,   // EmailJS not yet configured — enquiry button hidden
    unavailable: true
  },
  'mark-harris': {
    p: [48,52,49,52,32,53,54,55,32,56,57,48],
    e: [109,97,114,121,106,111,121,46,112,97,100,105,122,64,111,117,116,108,111,111,107,46,99,111,109],
    svc: 'mariafreypadiz@gmail.com', tpl: 'template_vpug1fw',
    unavailable: false
  },
};

/* =============================================
   INSTRUCTOR DATA
   No phone/email stored here — use CONTACT map
   ============================================= */
const INSTRUCTORS = [
  {
    id: 'rob-lester',
    initials: 'RL',
    name: 'Rob Lester',
    title: 'Professional Driving Instructor',
    baseSuburb: 'Doncaster',
    baseLat: -37.7870, baseLng: 145.1226,
    serviceRadius: 15,
    travelBonus: true,
    travelFee: false,
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
    areasOfExpertise: [
      'Nervous & Anxious Drivers',
      'VicRoads Drive Test Preparation',
      'Defensive Driving Techniques',
      'Adult Learners & Late Starters',
      'Overseas Licence Conversion',
      'Confidence & Decision-Making Coaching',
      'Manual Driving Instruction',
      'Aviation-Inspired Driver Training',
    ],
    photo: 'rob-lester.jpg',
    bio: "Rob is a professional driving instructor based in Melbourne's Eastern Suburbs with over 20 years of experience helping learner drivers build confidence and pass their driving tests safely and efficiently. He is also a qualified commercial pilot and flight instructor, bringing an aviation-based approach to training that focuses on calm decision-making, structure, and safety. His calm, structured approach helps students become safe, independent drivers.",
  },
  {
    id: 'john-stevens',
    initials: 'JS',
    name: 'John Stevens',
    title: 'Professional Driving Instructor',
    baseSuburb: 'Box Hill',
    baseLat: -37.8198, baseLng: 145.1245,
    serviceRadius: 10,
    travelBonus: false,
    travelFee: false,
    location: 'Melbourne East',
    transmission: 'Manual & Automatic',
    experience: '12+ years',
    fee: 'From $90–$120/hr',
    availability: 'Weekdays / Weekends',
    photo: 'john-stevens.jpg',
    bio: "John is a professional driving instructor based in Melbourne's east with over 12 years of experience helping learner drivers build confidence and pass their driving test safely and efficiently. His calm, structured approach has helped hundreds of students become safe, independent drivers.",
  },
  {
    id: 'lisa-wong',
    initials: 'LW',
    name: 'Lisa Wong',
    title: 'Professional Driving Instructor',
    baseSuburb: 'Melbourne CBD',
    baseLat: -37.8136, baseLng: 144.9631,
    serviceRadius: 10,
    travelBonus: false,
    travelFee: false,
    location: 'Melbourne CBD',
    transmission: 'Automatic',
    experience: '8+ years',
    fee: 'From $95–$115/hr',
    availability: 'Weekdays / Saturdays',
    photo: 'lisa-wong.jpg',
    bio: "Lisa is an experienced automatic driving instructor operating in Melbourne's CBD and inner suburbs. With 8 years of experience, she specialises in building confidence in busy urban environments, helping students master parallel parking, roundabouts, and city traffic with ease.",
  },
  {
    id: 'mark-harris',
    initials: 'MH',
    name: 'Mark Harris',
    title: 'Professional Driving Instructor',
    baseSuburb: 'Footscray',
    baseLat: -37.8002, baseLng: 144.8996,
    serviceRadius: 15,
    travelBonus: true,
    travelFee: true,
    location: 'Melbourne West',
    transmission: 'Manual & Automatic',
    experience: '15+ years',
    fee: 'From $95–$125/hr',
    availability: 'Weekdays / Weekends',
    photo: 'mark-harris.jpg',
    bio: "Mark brings over 15 years of driving instruction experience to Melbourne's western suburbs. Known for his patient, structured teaching style, Mark has helped learners of all ages — from nervous first-timers to experienced drivers seeking to improve — become safe, confident road users.",
  }
];

/* =============================================
   ENQUIRY TRACKER (localStorage — lightweight)
   ============================================= */
const TRACKER_KEY = 'pdin_enquiries';
function trackEnquiry(instructorId, instructorName) {
  try {
    const raw  = localStorage.getItem(TRACKER_KEY);
    const data = raw ? JSON.parse(raw) : {};
    if (!data[instructorId]) data[instructorId] = { name: instructorName, count: 0, lastDate: null };
    data[instructorId].count++;
    data[instructorId].lastDate = new Date().toISOString();
    localStorage.setItem(TRACKER_KEY, JSON.stringify(data));
  } catch(e) { /* storage unavailable */ }
}

/* =============================================
   DISTANCE UTILITY (Haversine)
   ============================================= */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLng = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

/* =============================================
   SVG ICONS
   ============================================= */
const ICONS = {
  shield:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  document:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  phone:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 0 0 0 .82 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  user:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  pin:        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  car:        `<svg width="22" height="14" viewBox="0 0 42 21" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M2 17L2 15.5C1.2 15.2 1 14.6 1 13.8L1 12C1 11.2 1.5 10.5 2.3 10.2L5.5 9.2L9 5C9.8 4.1 11 3.5 12.3 3.5L29.5 3.5C31 3.5 32.4 4.3 33.2 5.6L36.5 10L38.8 10.5C40 10.9 41 12 41 13.3L41 15.5C41 16.3 40.4 17 39.5 17L38.5 17"/><path d="M30 17L14 17"/><path d="M6 17L2 17"/><path d="M11 9.5L13.5 5.2L28 5.2L32 9.5Z" stroke-width="1"/><line x1="21" y1="5.2" x2="21" y2="9.5" stroke-width="0.9"/><circle cx="10" cy="17" r="3" stroke-width="1.3"/><circle cx="10" cy="17" r="1.2" stroke-width="0.8"/><circle cx="34" cy="17" r="3" stroke-width="1.3"/><circle cx="34" cy="17" r="1.2" stroke-width="0.8"/></svg>`,
  clock:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  dollar:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  users:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  award:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  star:       `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  mail:       `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  phoneSmall: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 0 0 0 .82 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  check:      `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38a169" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  info:       `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  search:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  mapPin:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  upload:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>`,
};

/* =============================================
   DISCLAIMER
   ============================================= */
const PROFILE_DISCLAIMER = `
  <div class="profile-disclaimer">
    <div class="profile-disclaimer-inner">
      <span class="disclaimer-icon">${ICONS.info}</span>
      <p>All instructor information is provided by individual instructors. The Professional Driving Instructors Network does not independently verify or guarantee qualifications, insurance, or compliance. Information is subject to change and should be confirmed directly with the instructor.</p>
    </div>
  </div>`;

/* =============================================
   EMAILJS INIT
   ============================================= */
const EMAILJS_PUBLIC_KEY = '6h-VvWML9Chj5QA2a';
(function initEJS() {
  function tryInit() { if (typeof emailjs !== 'undefined') emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); }
  if (document.readyState === 'loading') window.addEventListener('load', tryInit);
  else tryInit();
})();

/* =============================================
   SUBURB GEOCODING (OpenStreetMap Nominatim)
   ============================================= */
async function geocodeSuburb(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=au&limit=1&q=${encodeURIComponent(query + ', VIC, Australia')}`;
  const res  = await fetch(url, { headers: { 'Accept-Language': 'en' } });
  const data = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), display: data[0].display_name.split(',')[0] };
}

function sortInstructorsByDistance(lat, lng) {
  return INSTRUCTORS
    .map(inst => {
      const km = haversineKm(lat, lng, inst.baseLat, inst.baseLng);
      const effectiveRadius = inst.travelBonus ? inst.serviceRadius + 8 : inst.serviceRadius;
      return { inst, km, inRange: km <= effectiveRadius };
    })
    .sort((a, b) => a.km - b.km);
}

/* =============================================
   INSTRUCTOR CARD HTML
   ============================================= */
function instructorCardHTML(inst, distKm) {
  const photoEl = inst.photo
    ? `<img src="${inst.photo}" alt="${inst.name}" class="card-photo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="avatar-initials" style="display:none">${inst.initials}</div>`
    : `<div class="avatar-initials">${inst.initials}</div>`;

  // Smart badge
  let badge = '';
  if (distKm !== undefined) {
    if (distKm <= inst.serviceRadius * 0.5)       badge = `<span class="card-badge badge-best">Best Match</span>`;
    else if (distKm <= inst.serviceRadius)         badge = `<span class="card-badge badge-available">Available in Your Area</span>`;
    else if (inst.travelBonus && distKm <= inst.serviceRadius + 8) badge = `<span class="card-badge badge-travel">Travels for Longer Lessons</span>`;
  }

  const distLabel = distKm !== undefined
    ? `<div class="card-dist-row">${ICONS.mapPin} ${inst.baseSuburb} &bull; <strong>${distKm.toFixed(1)} km away</strong></div>`
    : `<div class="card-meta-row">${ICONS.pin} ${inst.location}</div>`;

  let metaRows = inst.customQS
    ? `${distLabel}<div class="card-meta-row">${ICONS.car} Manual &amp; Automatic</div><div class="card-meta-row card-tagline">${ICONS.user} Patient and calm Instructor</div><div class="card-meta-row">${ICONS.clock} ${inst.experience}</div>`
    : `${distLabel}<div class="card-meta-row">${ICONS.car} ${inst.transmission}</div><div class="card-meta-row">${ICONS.clock} ${inst.experience}</div>`;

  return `
    <div class="card" data-action="profile" data-id="${inst.id}">
      <div class="card-photo-wrap">${photoEl}${badge}</div>
      <div class="card-body">
        <div class="card-name">${inst.name}</div>
        ${metaRows}
        <button class="btn btn-navy btn-full" data-action="profile" data-id="${inst.id}">View Profile</button>
      </div>
    </div>`;
}

/* =============================================
   PAGES
   ============================================= */
function renderHome() {
  return `
    <section class="hero">
      <img src="hero-bg.png" alt="Driving lesson" class="hero-bg-img" />
      <div class="hero-content">
        <h1>Find a Professional Driving Instructor Near You</h1>
        <p>A network of experienced, independent driving instructors who take pride in quality, safety, and results.</p>
        <div class="hero-search-bar">
          <div class="hero-search-inner">
            ${ICONS.search}
            <input type="text" id="hero-suburb-input" placeholder="Enter your suburb or postcode…" autocomplete="off" />
            <button class="btn btn-gold" id="hero-search-btn">Find Instructors</button>
          </div>
        </div>
        <div class="hero-btns">
          <button class="btn btn-navy-outline btn-lg" data-action="nav" data-page="find">Browse All Instructors</button>
          <button class="btn btn-navy-outline btn-lg" data-action="nav" data-page="join">Join the Network</button>
        </div>
      </div>
    </section>
    <section class="section why-section">
      <div class="container">
        <h2 class="section-title">Why Choose the Professional Driving Instructors Network?</h2>
        <div class="why-grid reveal">
          <div class="why-card"><div class="icon-circle">${ICONS.shield}</div><h3>Experienced Instructors</h3><p>Professionals with years of experience helping learners succeed</p></div>
          <div class="why-card"><div class="icon-circle">${ICONS.document}</div><h3>No Commission Platforms</h3><p>Instructors keep 100% of their lesson fees</p></div>
          <div class="why-card"><div class="icon-circle">${ICONS.phone}</div><h3>Direct Contact</h3><p>Connect directly with your instructor — no middleman</p></div>
          <div class="why-card"><div class="icon-circle">${ICONS.user}</div><h3>Professional Standards</h3><p>Quality-focused instructors who take pride in their work</p></div>
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
    </section>`;
}

function renderFind(searchLat, searchLng, searchLabel) {
  const sorted = (searchLat !== undefined)
    ? sortInstructorsByDistance(searchLat, searchLng)
    : INSTRUCTORS.map(i => ({ inst: i, km: undefined }));

  const cardsHTML = sorted.map(({ inst, km }) => instructorCardHTML(inst, km)).join('');
  const searchInfo = searchLabel
    ? `<p class="find-search-info">${ICONS.mapPin} Results near <strong>${searchLabel}</strong> — sorted by distance &nbsp;<a href="#" id="clear-search-link">Clear</a></p>`
    : '';

  return `
    <div class="navy-banner">
      <h1>Driving Instructors in Melbourne</h1>
      <p>Find an experienced, independent driving instructor near you.</p>
      <div class="find-search-bar">
        <div class="find-search-inner">
          ${ICONS.search}
          <input type="text" id="find-suburb-input" placeholder="Enter your suburb or postcode…" autocomplete="off" value="${searchLabel || ''}" />
          <button class="btn btn-gold" id="find-search-btn">Search</button>
        </div>
      </div>
    </div>
    <div class="container">
      ${searchInfo}
      <div class="find-grid" id="find-results">${cardsHTML}</div>
    </div>`;
}

function renderProfile(id) {
  const inst = INSTRUCTORS.find(i => i.id === id) || INSTRUCTORS[0];
  const effectiveRadius = inst.travelBonus ? inst.serviceRadius + 8 : inst.serviceRadius;

  const avatarEl = inst.photo
    ? `<img src="${inst.photo}" alt="${inst.name}" class="profile-photo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="profile-avatar-circle" style="display:none">${inst.initials}</div>`
    : `<div class="profile-avatar-circle">${inst.initials}</div>`;

  const serviceAreaBlock = `
    <div class="qs-block">
      <div class="qs-item-label">Service Area</div>
      <div class="qs-item-value">Based in ${inst.baseSuburb}</div>
      <div class="qs-item-value">Travel Range: ${inst.serviceRadius} km</div>
      ${inst.travelBonus ? `<div class="qs-item-value qs-travel-note">Travels up to ${effectiveRadius} km for longer lessons</div>` : ''}
      ${inst.travelFee   ? `<div class="qs-item-value qs-travel-note">May charge travel fee for outer areas</div>` : ''}
    </div>`;

  let qsRows = '';
  if (inst.customQS) {
    const expertiseHTML = inst.areasOfExpertise ? inst.areasOfExpertise.map(a => `<li>${a}</li>`).join('') : '';
    const feesHTML      = inst.lessonFees.map(f => `<div class="qs-item-value">${f.duration} — ${f.price}</div>`).join('');
    const vehiclesHTML  = inst.vehicles.map(v => `<div class="qs-item-value">${v.type} — ${v.car}</div>`).join('');
    qsRows = `
      <div class="qs-col-left">
        <div class="qs-block"><div class="qs-item-label">Experience</div><div class="qs-item-value">${inst.experience}</div></div>
        <div class="qs-block"><div class="qs-item-label">Areas of Expertise</div><ul class="qs-expertise-list">${expertiseHTML}</ul></div>
      </div>
      <div class="qs-col-right">
        <div class="qs-block"><div class="qs-item-label">Vehicles</div>${vehiclesHTML}</div>
        <div class="qs-block"><div class="qs-item-label">Availability</div><div class="qs-item-value">${inst.availability}</div></div>
        <div class="qs-block"><div class="qs-item-label">Lesson Fees</div>${feesHTML}</div>
        ${serviceAreaBlock}
      </div>`;
  } else {
    qsRows = `
      <div><div class="qs-item-label">Experience</div><div class="qs-item-value">${inst.experience}</div></div>
      <div><div class="qs-item-label">Lesson Fee</div><div class="qs-item-value">${inst.fee}</div></div>
      <div><div class="qs-item-label">Transmission</div><div class="qs-item-value">${inst.transmission}</div></div>
      <div><div class="qs-item-label">Availability</div><div class="qs-item-value">${inst.availability}</div></div>
      ${serviceAreaBlock}`;
  }

  const qsGridClass = inst.customQS ? 'qs-grid qs-grid-custom' : 'qs-grid';

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
          <div class="qs-title">Instructor Profile</div>
          <div class="${qsGridClass}">${qsRows}</div>
          <div class="qs-btns">
            <button class="btn btn-navy" id="call-instructor-btn" data-id="${inst.id}">${ICONS.phoneSmall} Call Instructor</button>
            ${(CONTACT[inst.id] && CONTACT[inst.id].unavailable)
              ? `<button class="btn btn-gold btn-unavailable" disabled title="Online enquiry not yet available for this instructor">${ICONS.mail} Enquiry Unavailable</button>`
              : `<button class="btn btn-gold" id="open-enquiry-btn" data-instructor-id="${inst.id}">${ICONS.mail} Send Enquiry</button>`
            }
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
    ${PROFILE_DISCLAIMER}`;
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

        <!-- Profile Photo Upload -->
        <div class="form-group">
          <label class="form-label">Profile Photo</label>
          <div class="photo-upload-area" id="photo-upload-area">
            <div class="photo-upload-preview" id="photo-preview-wrap">
              <div class="photo-upload-placeholder" id="photo-placeholder">
                ${ICONS.upload}
                <span>Click or drag &amp; drop to upload</span>
                <span class="photo-upload-hint">JPG or PNG, max 5 MB</span>
              </div>
              <img id="photo-preview-img" class="photo-preview-img" style="display:none" alt="Preview" />
            </div>
            <input type="file" id="join-photo" accept="image/jpeg,image/png" style="display:none" />
            <button type="button" class="btn-outline-upload" id="photo-upload-btn">Choose Photo</button>
          </div>
        </div>

        <div class="form-group"><label class="form-label">Full Name <span>*</span></label><input type="text" class="form-input" placeholder="Your full name" id="join-name" /></div>
        <div class="form-group"><label class="form-label">Email <span>*</span></label><input type="email" class="form-input" placeholder="your@email.com" id="join-email" /></div>
        <div class="form-group"><label class="form-label">Phone</label><input type="tel" class="form-input" placeholder="0412 345 678" id="join-phone" /></div>
        <div class="form-group"><label class="form-label">Years of Experience</label><input type="text" class="form-input" placeholder="e.g. 10+" id="join-exp" /></div>
        <div class="form-group"><label class="form-label">DIA Number <span>*</span></label><input type="text" class="form-input" placeholder="Your Driving Instructor Authority number" id="join-dia" /></div>
        <div class="form-group"><label class="form-label">Tell us about yourself</label><textarea class="form-input" placeholder="Brief overview of your experience and teaching style" id="join-bio"></textarea></div>

        <!-- Service Area -->
        <div class="form-section-head">Where do you provide lessons?</div>
        <div class="form-group">
          <label class="form-label">Primary Suburb <span>*</span></label>
          <input type="text" class="form-input" placeholder="e.g. Doncaster VIC" id="join-suburb" />
        </div>
        <div class="form-group">
          <label class="form-label">How far are you willing to travel?</label>
          <select class="form-input" id="join-radius">
            <option value="5">5 km — Local only</option>
            <option value="10" selected>10 km — Standard</option>
            <option value="15">15 km — Extended</option>
            <option value="20">20 km — Wide coverage</option>
          </select>
        </div>
        <div class="form-group join-toggle-group">
          <label class="join-toggle-label">
            <input type="checkbox" id="join-travel-bonus" />
            <span>I'm willing to travel further for 90-minute lessons (+5–8 km extra)</span>
          </label>
          <label class="join-toggle-label">
            <input type="checkbox" id="join-travel-fee" />
            <span>I may charge a travel fee for outer areas</span>
          </label>
        </div>

        <!-- Instructor Requirements -->
        <div class="form-group join-requirements-group">
          <div class="join-req-title">Instructor Requirements <span class="req-required">*</span></div>
          <div class="join-req-subtitle">Please tick to confirm you meet all of the following requirements:</div>
          <div class="join-req-box">
            <div class="join-req-section-head">Licensing &amp; Compliance</div>
            <ul class="join-req-list">
              <li>Current Driving Instructor Authority (VicRoads or relevant authority)</li>
              <li>Valid Working With Children Check (WWCC)</li>
            </ul>
            <div class="join-req-section-head">Vehicle Standards</div>
            <ul class="join-req-list"><li>Fully registered, roadworthy vehicle suitable for driving instruction</li></ul>
            <div class="join-req-section-head">Insurance</div>
            <ul class="join-req-list"><li>Comprehensive motor vehicle insurance that covers the use of the vehicle for paid professional driving instruction</li></ul>
          </div>
          <label class="join-req-confirm">
            <input type="checkbox" id="join-req-check" />
            <span>I confirm I meet all of the above Instructor Requirements</span>
          </label>
        </div>

        <button class="btn btn-navy btn-full btn-lg" id="join-submit">Apply to Join</button>
        <p class="join-reserve-note">Professional Driving Instructors Network reserves the right to verify credentials before approval.</p>
      </div>
    </div>`;
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
    </section>`;
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
        <div class="price-highlight">$85 – $135 per hour <span>(guide only)</span></div>
        <p>Some instructors may charge more or less depending on experience level, vehicle type, lesson type, and location.</p>
        <hr class="pricing-divider" />
        <h2>No Commission Model</h2>
        <p>Unlike many booking platforms, we do not take a percentage of lesson fees. This means instructors keep 100% of their earnings, pricing is not inflated to cover platform fees, and no hidden charges are passed onto learners.</p>
        <hr class="pricing-divider" />
        <h2>Network Membership (For Instructors)</h2>
        <p>Instructors pay a flat annual listing fee to be featured on the network. There are no commissions, no per-booking fees, and no lock-in contracts.</p>
        <p>As a founding member, early joiners lock in introductory pricing as the network grows. <a href="#" data-action="nav" data-page="join" style="color:var(--navy);font-weight:600;text-decoration:underline;">Apply to join</a> to find out more.</p>
      </div>
    </section>`;
}

function renderContact() {
  return `
    <div class="contact-hero"><h1>Contact Us</h1><p>Have a question? We'd love to hear from you.</p></div>
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <p>Whether you're a learner or an instructor interested in joining, reach out and we'll get back to you promptly.</p>
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
    </section>`;
}

/* =============================================
   ENQUIRY MODAL
   ============================================= */
function enquiryModalHTML(inst) {
  return `
  <div class="enquiry-overlay" id="enquiry-overlay" role="dialog" aria-modal="true">
    <div class="enquiry-modal" id="enquiry-modal">
      <button class="enquiry-close" id="enquiry-close">&times;</button>
      <div class="enquiry-header">
        <div class="enquiry-title">Send Enquiry to ${inst.name}</div>
        <div class="enquiry-subtitle">Your details go directly to the instructor — no middleman.</div>
      </div>
      <div id="enquiry-form-body">
        <div class="enquiry-section-label">Your Details</div>
        <div class="form-group"><label class="form-label">Full Name <span>*</span></label><input type="text" class="form-input" id="eq-name" placeholder="Your full name" /></div>
        <div class="form-group"><label class="form-label">Mobile Number <span>*</span></label><input type="tel" class="form-input" id="eq-mobile" placeholder="e.g. 0400 123 456" /></div>
        <div class="form-group"><label class="form-label">Email Address <span>*</span></label><input type="email" class="form-input" id="eq-email" placeholder="your@email.com" /></div>
        <div class="enquiry-section-label">Lesson Details</div>
        <div class="form-group"><label class="form-label">Suburb / Area <span>*</span></label><input type="text" class="form-input" id="eq-suburb" placeholder="e.g. Box Hill" /></div>
        <div class="form-group">
          <label class="form-label">Licence Stage <span>*</span></label>
          <select class="form-input" id="eq-licence">
            <option value="" disabled selected>Select licence stage…</option>
            <option>Learner (new)</option><option>Learner (some experience)</option>
            <option>Preparing for Drive Test</option><option>Overseas Licence Conversion</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Transmission Preference <span>*</span></label>
          <select class="form-input" id="eq-transmission">
            <option value="" disabled selected>Select preference…</option>
            <option>Auto</option><option>Manual</option><option>No Preference</option>
          </select>
        </div>
        <div class="enquiry-section-label">Availability</div>
        <div class="form-group">
          <label class="form-label">Preferred Days</label>
          <div class="eq-checkboxes">
            <label class="eq-check"><input type="checkbox" value="Weekdays" /> Weekdays</label>
            <label class="eq-check"><input type="checkbox" value="Weekends" /> Weekends</label>
            <label class="eq-check"><input type="checkbox" value="Evenings" /> Evenings</label>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Preferred Start Time <span class="form-label-optional">(optional)</span></label><input type="text" class="form-input" id="eq-starttime" placeholder="e.g. mornings / flexible" /></div>
        <div class="enquiry-section-label">Message</div>
        <div class="form-group"><label class="form-label">Additional Information <span class="form-label-optional">(optional)</span></label><textarea class="form-input" id="eq-message" placeholder="e.g. Test booked, nervous driver, looking for weekly lessons…"></textarea></div>
        <button class="btn btn-gold btn-full btn-lg" id="eq-submit">${ICONS.mail} Send Enquiry</button>
        <p class="eq-note">For urgent bookings, call the instructor directly.</p>
      </div>
    </div>
  </div>`;
}

function openEnquiryModal(inst) {
  const existing = document.getElementById('enquiry-overlay');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', enquiryModalHTML(inst));
  document.body.classList.add('modal-open');
  const overlay  = document.getElementById('enquiry-overlay');
  const closeBtn = document.getElementById('enquiry-close');
  requestAnimationFrame(() => overlay.classList.add('visible'));

  function closeModal() {
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.remove(); document.body.classList.remove('modal-open'); }, 260);
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', onEsc); }
  });

  document.getElementById('eq-submit').addEventListener('click', () => {
    const name         = document.getElementById('eq-name').value.trim();
    const mobile       = document.getElementById('eq-mobile').value.trim();
    const email        = document.getElementById('eq-email').value.trim();
    const suburb       = document.getElementById('eq-suburb').value.trim();
    const licence      = document.getElementById('eq-licence').value;
    const transmission = document.getElementById('eq-transmission').value;
    const starttime    = document.getElementById('eq-starttime').value.trim();
    const message      = document.getElementById('eq-message').value.trim();
    const days         = [...document.querySelectorAll('.eq-checkboxes input:checked')].map(c => c.value);

    if (!name || !mobile || !email || !suburb || !licence || !transmission) {
      showEnquiryError('Please fill in all required fields marked with *'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showEnquiryError('Please enter a valid email address.'); return;
    }
    clearEnquiryError();
    setEnquiryButtonLoading(true);

    const ct = CONTACT[inst.id] || {};
    const instEmail = ct.e ? dec(ct.e) : '';

    const templateParams = {
      instructor_name:  inst.name,
      instructor_email: instEmail,
      to_email:         instEmail,
      eq_name: name, eq_mobile: mobile, eq_email: email,
      eq_suburb: suburb, eq_licence: licence, eq_transmission: transmission,
      eq_days: days.length ? days.join(', ') : 'Not specified',
      eq_starttime: starttime || 'Not specified',
      eq_message: message || '(No message)',
      reply_to: email,
    };

    const svc = ct.svc || 'service_4kd3c2x';
    const tpl = ct.tpl || 'template_v9nyycm';

    emailjs.send(svc, tpl, templateParams)
      .then(() => {
        trackEnquiry(inst.id, inst.name);
        document.getElementById('enquiry-form-body').innerHTML = `
          <div class="success-box">
            <div class="success-icon">${ICONS.check}</div>
            <h3>Enquiry Sent!</h3>
            <p>Your enquiry has been sent directly to <strong>${inst.name}</strong>. They'll be in touch soon.</p>
            <p style="margin-top:12px;font-size:13.5px;color:var(--text-light)">For urgent bookings, call the instructor directly using the button on their profile.</p>
          </div>`;
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        setEnquiryButtonLoading(false);
        showEnquiryError('Sorry, there was a problem sending your enquiry. Please try calling the instructor directly.');
      });
  });
}

function showEnquiryError(msg) {
  let el = document.getElementById('eq-error');
  if (!el) { el = document.createElement('p'); el.id = 'eq-error'; el.className = 'eq-error-msg'; const btn = document.getElementById('eq-submit'); if (btn) btn.before(el); }
  el.textContent = msg;
}
function clearEnquiryError() { const el = document.getElementById('eq-error'); if (el) el.remove(); }
function setEnquiryButtonLoading(loading) {
  const btn = document.getElementById('eq-submit');
  if (!btn) return;
  if (loading) { btn.disabled = true; btn.innerHTML = '<span class="btn-spinner"></span> Sending…'; }
  else { btn.disabled = false; btn.innerHTML = `${ICONS.mail} Send Enquiry`; }
}

/* =============================================
   FORM HELPERS
   ============================================= */
function setButtonLoading(btnId, loading, originalText) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) { btn.disabled = true; btn.innerHTML = '<span class="btn-spinner"></span> Sending…'; }
  else { btn.disabled = false; btn.textContent = originalText; }
}
function showFormError(containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const existing = container.querySelector('.form-error-msg');
  if (existing) existing.remove();
  const err = document.createElement('p');
  err.className = 'form-error-msg';
  err.textContent = message;
  const btn = container.querySelector('button');
  if (btn) btn.before(err); else container.appendChild(err);
}

/* =============================================
   ROUTER
   ============================================= */
let _searchLat, _searchLng, _searchLabel;

function getPageContent(page, extra) {
  switch (page) {
    case 'find':    return renderFind(_searchLat, _searchLng, _searchLabel);
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
  updateActiveLinks(page);
  closeMenu();
  if (pushState) history.pushState({ page, extra: extra||null }, '', extra ? `#${page}/${extra}` : `#${page}`);
  bindPageEvents();
  setTimeout(initReveal, 50);
}

function bindPageEvents() {
  document.querySelectorAll('[data-action="nav"]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); navigate(el.dataset.page); });
  });
  document.querySelectorAll('[data-action="profile"]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); navigate('profile', el.dataset.id); });
  });

  /* Hero suburb search */
  const heroSearchBtn = document.getElementById('hero-search-btn');
  const heroInput     = document.getElementById('hero-suburb-input');
  if (heroSearchBtn && heroInput) {
    async function doHeroSearch() {
      const q = heroInput.value.trim(); if (!q) return;
      heroSearchBtn.disabled = true; heroSearchBtn.innerHTML = '<span class="btn-spinner"></span>';
      const result = await geocodeSuburb(q).catch(() => null);
      heroSearchBtn.disabled = false; heroSearchBtn.innerHTML = 'Find Instructors';
      if (result) { _searchLat = result.lat; _searchLng = result.lng; _searchLabel = result.display; navigate('find'); }
      else { heroInput.classList.add('input-error'); setTimeout(() => heroInput.classList.remove('input-error'), 2000); }
    }
    heroSearchBtn.addEventListener('click', doHeroSearch);
    heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') doHeroSearch(); });
  }

  /* Find page search */
  const findSearchBtn = document.getElementById('find-search-btn');
  const findInput     = document.getElementById('find-suburb-input');
  if (findSearchBtn && findInput) {
    async function doFindSearch() {
      const q = findInput.value.trim();
      if (!q) { _searchLat = undefined; _searchLng = undefined; _searchLabel = ''; navigate('find'); return; }
      findSearchBtn.disabled = true; findSearchBtn.innerHTML = '<span class="btn-spinner"></span>';
      const result = await geocodeSuburb(q).catch(() => null);
      findSearchBtn.disabled = false; findSearchBtn.innerHTML = 'Search';
      if (result) { _searchLat = result.lat; _searchLng = result.lng; _searchLabel = result.display; navigate('find'); }
      else { findInput.classList.add('input-error'); setTimeout(() => findInput.classList.remove('input-error'), 2000); }
    }
    findSearchBtn.addEventListener('click', doFindSearch);
    findInput.addEventListener('keydown', e => { if (e.key === 'Enter') doFindSearch(); });
    const clearLink = document.getElementById('clear-search-link');
    if (clearLink) clearLink.addEventListener('click', e => { e.preventDefault(); _searchLat = undefined; _searchLng = undefined; _searchLabel = ''; navigate('find'); });
  }

  /* Call instructor (obfuscated — decoded only on click) */
  const callBtn = document.getElementById('call-instructor-btn');
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      const ct = CONTACT[callBtn.dataset.id];
      if (ct && ct.p) window.location.href = 'tel:' + dec(ct.p).replace(/\s/g, '');
    });
  }

  /* Send enquiry modal */
  const enquiryBtn = document.getElementById('open-enquiry-btn');
  if (enquiryBtn) {
    enquiryBtn.addEventListener('click', () => {
      const inst = INSTRUCTORS.find(i => i.id === enquiryBtn.dataset.instructorId) || INSTRUCTORS[0];
      openEnquiryModal(inst);
    });
  }

  /* Photo upload */
  const photoBtn         = document.getElementById('photo-upload-btn');
  const photoInput       = document.getElementById('join-photo');
  const photoPreview     = document.getElementById('photo-preview-img');
  const photoPlaceholder = document.getElementById('photo-placeholder');
  const photoArea        = document.getElementById('photo-upload-area');
  if (photoBtn && photoInput) {
    photoBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', () => {
      const file = photoInput.files[0]; if (!file) return;
      if (file.size > 5 * 1024 * 1024) { showFormError('join-form-box', 'Photo must be under 5 MB.'); return; }
      const reader = new FileReader();
      reader.onload = e => {
        photoPreview.src = e.target.result; photoPreview.style.display = 'block';
        photoPlaceholder.style.display = 'none'; photoBtn.textContent = 'Change Photo';
      };
      reader.readAsDataURL(file);
    });
    if (photoArea) {
      photoArea.addEventListener('dragover', e => { e.preventDefault(); photoArea.classList.add('drag-over'); });
      photoArea.addEventListener('dragleave', () => photoArea.classList.remove('drag-over'));
      photoArea.addEventListener('drop', e => {
        e.preventDefault(); photoArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) { photoInput.files = e.dataTransfer.files; photoInput.dispatchEvent(new Event('change')); }
      });
    }
  }

  /* Join form */
  const joinSubmit = document.getElementById('join-submit');
  if (joinSubmit) {
    joinSubmit.addEventListener('click', () => {
      const name   = document.getElementById('join-name').value.trim();
      const email  = document.getElementById('join-email').value.trim();
      const dia    = (document.getElementById('join-dia') || {}).value?.trim() || '';
      const suburb = (document.getElementById('join-suburb') || {}).value?.trim() || '';
      const reqOK  = document.getElementById('join-req-check')?.checked || false;

      if (!name || !email)  { showFormError('join-form-box', 'Please fill in your full name and email address.'); return; }
      if (!dia)             { showFormError('join-form-box', 'Please enter your DIA number.'); return; }
      if (!suburb)          { showFormError('join-form-box', 'Please enter your primary suburb.'); return; }
      if (!reqOK)           { showFormError('join-form-box', 'Please confirm you meet all Instructor Requirements.'); return; }

      const phone  = document.getElementById('join-phone')?.value || '';
      const exp    = document.getElementById('join-exp')?.value || '';
      const bio    = document.getElementById('join-bio')?.value || '';
      const radius = document.getElementById('join-radius')?.value || '10';
      const tBonus = document.getElementById('join-travel-bonus')?.checked || false;
      const tFee   = document.getElementById('join-travel-fee')?.checked   || false;

      setButtonLoading('join-submit', true, 'Apply to Join');
      fetch('https://formspree.io/f/xnjlqawn', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'New Instructor Application — ' + name,
          form_type: 'Join the Network', Name: name, Email: email, Phone: phone,
          Primary_Suburb: suburb, Travel_Radius_km: radius + ' km',
          Travel_Bonus_Longer_Lessons: tBonus ? 'Yes' : 'No',
          Travel_Fee_Outer_Areas: tFee ? 'Yes' : 'No',
          Years_Experience: exp, DIA_Number: dia,
          Requirements_Confirmed: 'Yes — all requirements confirmed', About: bio
        })
      })
      .then(res => {
        if (res.ok) {
          document.getElementById('join-form-box').innerHTML = `
            <div class="success-box">
              <div class="success-icon">${ICONS.check}</div>
              <h3>Application Received!</h3>
              <p>Thank you, ${name}. We'll review your application and be in touch within 2–3 business days.</p>
            </div>`;
        } else { showFormError('join-form-box', 'Submission failed. Please try again.'); setButtonLoading('join-submit', false, 'Apply to Join'); }
      })
      .catch(() => { showFormError('join-form-box', 'Network error. Please try again.'); setButtonLoading('join-submit', false, 'Apply to Join'); });
    });
  }

  /* Contact form */
  const contactSubmit = document.getElementById('contact-submit');
  if (contactSubmit) {
    contactSubmit.addEventListener('click', () => {
      const name = document.getElementById('c-name').value.trim();
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
   NAVBAR
   ============================================= */
function closeMenu() {
  const h = document.getElementById('hamburger');
  const d = document.getElementById('nav-dropdown');
  if (h) { h.classList.remove('open'); h.setAttribute('aria-expanded', 'false'); }
  if (d) d.classList.remove('open');
}
function bindNavEvents() {
  const hamburger = document.getElementById('hamburger');
  const dropdown  = document.getElementById('nav-dropdown');
  hamburger.addEventListener('click', () => {
    dropdown.classList.contains('open') ? closeMenu() : (hamburger.classList.add('open'), hamburger.setAttribute('aria-expanded','true'), dropdown.classList.add('open'));
  });
  document.addEventListener('click', e => { if (!e.target.closest('.navbar') && !e.target.closest('#nav-dropdown')) closeMenu(); });
  document.querySelectorAll('#nav-links-desktop .nav-link').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); navigate(link.dataset.page); }); });
  document.querySelectorAll('#nav-dropdown .nav-link').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); closeMenu(); navigate(link.dataset.page); }); });
  document.querySelector('.nav-logo').addEventListener('click', e => { e.preventDefault(); navigate('home'); });
  document.querySelectorAll('.footer-links a').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); navigate(link.dataset.page); }); });
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });
}
function updateActiveLinks(page) {
  document.querySelectorAll('#nav-links-desktop .nav-link, #nav-dropdown .nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page || (page === 'profile' && link.dataset.page === 'find'));
  });
}
function initReveal() {
  const els = document.querySelectorAll('.reveal'); if (!els.length) return;
  const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
window.addEventListener('popstate', e => { if (e.state) navigate(e.state.page, e.state.extra||null, false); else navigate('home', null, false); });
document.addEventListener('DOMContentLoaded', () => {
  bindNavEvents();
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const [page, extra] = hash.split('/');
    navigate(page||'home', extra||null, false);
    history.replaceState({ page: page||'home', extra: extra||null }, '', window.location.hash);
  } else { navigate('home', null, false); history.replaceState({ page:'home', extra:null }, '', '#home'); }
});
