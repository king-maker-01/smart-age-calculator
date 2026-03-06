const limits={
  "UPSC Civil Services":[21,32],
  "SSC CGL":[18,32],
  "Bank PO":[20,30],
  "MPSC":[19,38],
  "GATE":[0,100]
};

function calculateAge(){

  const dob = document.getElementById("dob").value;
  const ageOn = document.getElementById("ageOn").value;
  const exam = document.getElementById("exam").value;
  const result = document.getElementById("result");

  if(!dob || !ageOn){
    result.innerHTML = "⚠ Please select both dates";
    return;
  }

  const b = new Date(dob);
  const t = new Date(ageOn);

  let y = t.getFullYear() - b.getFullYear();
  let m = t.getMonth() - b.getMonth();
  let d = t.getDate() - b.getDate();

  if(d < 0){
    m--;
    d += new Date(t.getFullYear(), t.getMonth(), 0).getDate();
  }

  if(m < 0){
    y--;
    m += 12;
  }

  let eligibility="";

  if(limits[exam]){
    const [min,max]=limits[exam];

    if(y>=min && y<=max){
      eligibility = "✅ Eligible";
    }else if(y<min){
      eligibility = "⏳ Not Eligible Yet";
    }else{
      eligibility = "❌ Over Age";
    }
  }

  result.innerHTML = `
    Age: ${y} Years ${m} Months ${d} Days <br><br>
    ${eligibility}
  `;
}

/* ===== HEADER FUNCTIONALITY ===== */

// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
const htmlElement = document.documentElement;

// helper to update toggle attributes (aria + title)
function updateDarkToggleState(){
  if(!darkToggle) return;
  const isDark = htmlElement.classList.contains('dark');
  darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  darkToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

// Check for saved dark mode preference and set initial state.
if (localStorage.getItem('darkMode') === 'enabled') {
  htmlElement.classList.add('dark');
} else if (localStorage.getItem('darkMode') === 'disabled') {
  htmlElement.classList.remove('dark');
} else {
  // no saved pref: ensure light mode by default (so moon icon shows)
  htmlElement.classList.remove('dark');
}

// initialize toggle attributes/icons
updateDarkToggleState();

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');

    // Save preference
    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }

    // update aria/title and let CSS handle icon visibility via body.dark
    updateDarkToggleState();
  });
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Dropdown interaction for desktop & mobile
const dropdownToggle = document.querySelector('.dropdown-toggle');
const megaMenu = document.getElementById('megaMenu');
const hasDropdown = document.querySelector('.has-dropdown');
if (hasDropdown) {
  // desktop hover handled via CSS, but for accessibility add JS to keep open on hover
  hasDropdown.addEventListener('mouseenter', () => {
    hasDropdown.classList.add('active');
  });
  hasDropdown.addEventListener('mouseleave', () => {
    hasDropdown.classList.remove('active');
  });
}

if (dropdownToggle && hasDropdown) {
  // mobile: toggle on click
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    hasDropdown.classList.toggle('active');
  });
}

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').endsWith(currentPage)) {
      link.classList.add('active');
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-wrapper')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    if (hasDropdown) {
      hasDropdown.classList.remove('active');
    }
  }
});