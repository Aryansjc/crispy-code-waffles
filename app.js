
// Global state
const state = {
  currentPage: 'home',
  isMenuOpen: false,
  isScrolled: false,
  activeTab: 'event'  // For the rules tabs
};

// Routes configuration
const routes = {
  home: {
    title: 'Waffle Web Challenge',
    render: renderHome
  },
  gallery: {
    title: 'Gallery | Waffle Web Challenge',
    render: renderGallery
  },
  requirements: {
    title: 'Requirements | Waffle Web Challenge',
    render: renderRequirements
  },
  rules: {
    title: 'Rules | Waffle Web Challenge',
    render: renderRules
  },
  prizes: {
    title: 'Prizes | Waffle Web Challenge',
    render: renderPrizes
  },
  getstarted: {
    title: 'Get Started | Waffle Web Challenge',
    render: renderGetStarted
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Set up event listeners
  setupEventListeners();
  
  // Initial routing
  handleRouting();
  
  // Scroll listener for header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      document.querySelector('.header').classList.add('scrolled');
      state.isScrolled = true;
    } else {
      document.querySelector('.header').classList.remove('scrolled');
      state.isScrolled = false;
    }
  });
});

// Set up event listeners
function setupEventListeners() {
  // Handle clicking on navigation links
  document.addEventListener('click', (e) => {
    // Handle navigation links
    if (e.target.closest('[data-nav-link]')) {
      e.preventDefault();
      const page = e.target.closest('[data-nav-link]').getAttribute('data-nav-link');
      navigateTo(page);
      
      // Close mobile menu if it's open
      if (state.isMenuOpen) {
        toggleMobileMenu();
      }
    }
    
    // Handle tab buttons in rules page
    if (e.target.closest('[data-tab]')) {
      const tab = e.target.closest('[data-tab]').getAttribute('data-tab');
      setActiveTab(tab);
    }
    
    // Toggle mobile menu
    if (e.target.closest('#mobileMenuButton')) {
      toggleMobileMenu();
    }
    
    // Close mobile menu when clicking outside
    if (state.isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('#mobileMenuButton')) {
      toggleMobileMenu();
    }
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', handleRouting);
}

// Handle routing based on URL
function handleRouting() {
  const path = window.location.hash.substring(1) || 'home';
  navigateTo(path, true);
}

// Navigate to a page
function navigateTo(page, skipPushState = false) {
  // Default to home if page doesn't exist
  if (!routes[page]) {
    page = 'home';
  }
  
  // Update state
  state.currentPage = page;
  
  // Update document title
  document.title = routes[page].title;
  
  // Render the page
  const appElement = document.getElementById('app');
  appElement.innerHTML = '';
  appElement.appendChild(renderLayout());
  
  // Update URL if not from back/forward buttons
  if (!skipPushState) {
    window.history.pushState({}, '', `#${page}`);
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  // Update active navigation link
  updateActiveNavLink();
}

// Update the active navigation link
function updateActiveNavLink() {
  // Remove active class from all links
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current page link
  document.querySelectorAll(`[data-nav-link="${state.currentPage}"]`).forEach(link => {
    link.classList.add('active');
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  state.isMenuOpen = !state.isMenuOpen;
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (state.isMenuOpen) {
    mobileMenu.classList.add('open');
  } else {
    mobileMenu.classList.remove('open');
  }
  
  // Update menu button icon
  const menuIcon = document.querySelector('#mobileMenuButton');
  if (state.isMenuOpen) {
    menuIcon.innerHTML = '✕';
  } else {
    menuIcon.innerHTML = '☰';
  }
}

// Set active tab in rules page
function setActiveTab(tab) {
  state.activeTab = tab;
  
  // Update tab buttons
  document.querySelectorAll('[data-tab]').forEach(button => {
    if (button.getAttribute('data-tab') === tab) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Update tab content
  document.querySelectorAll('[data-tab-content]').forEach(content => {
    if (content.getAttribute('data-tab-content') === tab) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// Render the overall layout
function renderLayout() {
  const wrapper = document.createElement('div');
  wrapper.className = 'site-wrapper';
  
  // Add header
  wrapper.appendChild(renderHeader());
  
  // Add main content
  const main = document.createElement('main');
  main.appendChild(routes[state.currentPage].render());
  wrapper.appendChild(main);
  
  // Add footer
  wrapper.appendChild(renderFooter());
  
  return wrapper;
}

// Render header
function renderHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  if (state.isScrolled) {
    header.classList.add('scrolled');
  }
  
  const headerContainer = document.createElement('div');
  headerContainer.className = 'container header-container';
  
  // Logo
  const logo = document.createElement('a');
  logo.href = '#home';
  logo.setAttribute('data-nav-link', 'home');
  logo.className = 'logo';
  
  const logoIcon = document.createElement('div');
  logoIcon.className = 'logo-icon waffle-grid';
  logoIcon.innerHTML = '🧇';
  
  logo.appendChild(logoIcon);
  logo.appendChild(document.createTextNode('Waffles 🧇'));
  
  // Desktop Navigation
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'desktop-nav';
  
  // Navigation items
  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'Gallery', path: 'gallery' },
    { name: 'Requirements', path: 'requirements' },
    { name: 'Rules', path: 'rules' },
    { name: 'Prizes', path: 'prizes' }
  ];
  
  navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = `#${item.path}`;
    link.setAttribute('data-nav-link', item.path);
    link.className = 'nav-link';
    if (state.currentPage === item.path) {
      link.classList.add('active');
    }
    link.textContent = item.name;
    desktopNav.appendChild(link);
  });
  
  // Get Started button
  const getStartedBtn = document.createElement('a');
  getStartedBtn.href = '#getstarted';
  getStartedBtn.setAttribute('data-nav-link', 'getstarted');
  getStartedBtn.className = 'waffle-button';
  getStartedBtn.textContent = 'Get Started 🧇';
  desktopNav.appendChild(getStartedBtn);
  
  // Mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.id = 'mobileMenuButton';
  mobileMenuBtn.className = 'mobile-menu-button';
  mobileMenuBtn.innerHTML = state.isMenuOpen ? '✕' : '☰';
  
  headerContainer.appendChild(logo);
  headerContainer.appendChild(desktopNav);
  headerContainer.appendChild(mobileMenuBtn);
  
  header.appendChild(headerContainer);
  
  // Mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  if (state.isMenuOpen) {
    mobileMenu.classList.add('open');
  }
  
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  
  navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = `#${item.path}`;
    link.setAttribute('data-nav-link', item.path);
    link.className = 'mobile-link';
    if (state.currentPage === item.path) {
      link.classList.add('active');
    }
    link.textContent = `${item.name} 🧇`;
    mobileNav.appendChild(link);
  });
  
  // Get Started button for mobile
  const mobileGetStartedBtn = document.createElement('a');
  mobileGetStartedBtn.href = '#getstarted';
  mobileGetStartedBtn.setAttribute('data-nav-link', 'getstarted');
  mobileGetStartedBtn.className = 'waffle-button';
  mobileGetStartedBtn.textContent = 'Get Started 🧇';
  mobileNav.appendChild(mobileGetStartedBtn);
  
  mobileMenu.appendChild(mobileNav);
  header.appendChild(mobileMenu);
  
  return header;
}

// Render footer
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  // Footer content
  const footerContent = document.createElement('div');
  footerContent.className = 'footer-content';
  
  // Footer info
  const footerInfo = document.createElement('div');
  footerInfo.className = 'footer-info';
  
  const footerLogo = document.createElement('div');
  footerLogo.className = 'footer-logo';
  
  const logoIcon = document.createElement('div');
  logoIcon.className = 'logo-icon waffle-grid';
  logoIcon.style.width = '2.5rem';
  logoIcon.style.height = '2.5rem';
  logoIcon.innerHTML = '🧇';
  
  footerLogo.appendChild(logoIcon);
  footerLogo.appendChild(document.createTextNode('Waffles 🧇'));
  
  const footerDescription = document.createElement('p');
  footerDescription.className = 'footer-description';
  footerDescription.textContent = 'The Waffle Web Challenge is a fun competition for web developers to showcase their HTML, CSS, and JavaScript skills while competing for delicious waffle prizes.';
  
  footerInfo.appendChild(footerLogo);
  footerInfo.appendChild(footerDescription);
  
  // Footer links
  const footerLinks = document.createElement('div');
  footerLinks.className = 'footer-links';
  
  const linksTitle = document.createElement('h3');
  linksTitle.textContent = 'Quick Links';
  
  const footerNav = document.createElement('ul');
  footerNav.className = 'footer-nav';
  
  const links = [
    { name: 'Home', path: 'home' },
    { name: 'Gallery', path: 'gallery' },
    { name: 'Requirements', path: 'requirements' },
    { name: 'Rules', path: 'rules' },
    { name: 'Prizes', path: 'prizes' },
    { name: 'Get Started', path: 'getstarted' }
  ];
  
  links.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${link.path}`;
    a.setAttribute('data-nav-link', link.path);
    a.className = 'footer-nav-link';
    a.textContent = link.name;
    li.appendChild(a);
    footerNav.appendChild(li);
  });
  
  footerLinks.appendChild(linksTitle);
  footerLinks.appendChild(footerNav);
  
  footerContent.appendChild(footerInfo);
  footerContent.appendChild(footerLinks);
  
  // Footer copyright
  const footerCopyright = document.createElement('div');
  footerCopyright.className = 'footer-copyright';
  
  const copyrightText = document.createElement('p');
  copyrightText.className = 'copyright-text';
  copyrightText.textContent = `© ${new Date().getFullYear()} Waffle Web Challenge. All rights reserved.`;
  
  footerCopyright.appendChild(copyrightText);
  
  container.appendChild(footerContent);
  container.appendChild(footerCopyright);
  
  footer.appendChild(container);
  
  return footer;
}

// Render Home page
function renderHome() {
  const home = document.createElement('div');
  
  // Hero section
  const hero = document.createElement('section');
  hero.className = 'hero';
  
  // Decorative elements
  const heroBg = document.createElement('div');
  heroBg.className = 'hero-bg';
  
  const blob1 = document.createElement('div');
  blob1.className = 'hero-blob-1';
  
  const blob2 = document.createElement('div');
  blob2.className = 'hero-blob-2';
  
  const pattern = document.createElement('div');
  pattern.className = 'hero-pattern';
  
  heroBg.appendChild(blob1);
  heroBg.appendChild(blob2);
  heroBg.appendChild(pattern);
  
  // Hero content
  const container = document.createElement('div');
  container.className = 'container';
  
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';
  
  // Waffle symbol
  const waffleSymbol = document.createElement('div');
  waffleSymbol.className = 'waffle-symbol';
  
  const waffleIcon = document.createElement('div');
  waffleIcon.className = 'waffle-icon waffle-grid';
  
  // Syrup drops
  for (let i = 0; i < 3; i++) {
    const drop = document.createElement('div');
    drop.className = 'syrup-drop';
    waffleSymbol.appendChild(drop);
  }
  
  // Butter pat
  const butterPat = document.createElement('div');
  butterPat.className = 'butter-pat';
  
  waffleSymbol.appendChild(waffleIcon);
  waffleSymbol.appendChild(butterPat);
  
  // Hero title
  const heroTitle = document.createElement('h1');
  heroTitle.className = 'hero-title';
  
  const titleSpan = document.createElement('span');
  titleSpan.className = 'title-accent';
  titleSpan.textContent = 'Waffle';
  
  heroTitle.appendChild(titleSpan);
  heroTitle.appendChild(document.createTextNode(' Web Challenge'));
  
  // Hero description
  const heroDesc = document.createElement('p');
  heroDesc.className = 'hero-description';
  heroDesc.textContent = 'Showcase your web design skills and win delicious waffles! Create beautiful websites with HTML, CSS, and JavaScript.';
  
  // Hero buttons
  const heroButtons = document.createElement('div');
  heroButtons.className = 'hero-buttons';
  
  const joinBtn = document.createElement('a');
  joinBtn.href = '#getstarted';
  joinBtn.setAttribute('data-nav-link', 'getstarted');
  joinBtn.className = 'waffle-button';
  joinBtn.textContent = 'Join the Challenge';
  
  const learnBtn = document.createElement('a');
  learnBtn.href = '#rules';
  learnBtn.setAttribute('data-nav-link', 'rules');
  learnBtn.className = 'btn-outline';
  learnBtn.textContent = 'Learn More';
  
  heroButtons.appendChild(joinBtn);
  heroButtons.appendChild(learnBtn);
  
  // Assemble hero content
  heroContent.appendChild(waffleSymbol);
  heroContent.appendChild(heroTitle);
  heroContent.appendChild(heroDesc);
  heroContent.appendChild(heroButtons);
  
  container.appendChild(heroContent);
  
  hero.appendChild(heroBg);
  hero.appendChild(container);
  
  home.appendChild(hero);
  
  return home;
}

// Render Gallery page
function renderGallery() {
  const gallery = document.createElement('section');
  gallery.className = 'gallery-section';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  // Section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h1');
  title.className = 'section-title';
  title.textContent = 'Gallery';
  
  header.appendChild(title);
  
  // Coming soon content
  const comingSoon = document.createElement('div');
  comingSoon.className = 'coming-soon';
  
  const waffleIcon = document.createElement('div');
  waffleIcon.className = 'waffle-grid-icon waffle-grid';
  
  const comingSoonTitle = document.createElement('h2');
  comingSoonTitle.className = 'coming-soon-title';
  comingSoonTitle.textContent = 'Coming Soon!';
  
  const comingSoonDesc = document.createElement('p');
  comingSoonDesc.className = 'coming-soon-description';
  comingSoonDesc.textContent = 'Our gallery of amazing web designs is currently being prepared. Check back soon to see inspiring submissions from talented creators!';
  
  comingSoon.appendChild(waffleIcon);
  comingSoon.appendChild(comingSoonTitle);
  comingSoon.appendChild(comingSoonDesc);
  
  container.appendChild(header);
  container.appendChild(comingSoon);
  
  gallery.appendChild(container);
  
  return gallery;
}

// Render Requirements page
function renderRequirements() {
  const section = document.createElement('section');
  section.className = 'rules-section';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  // Section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h1');
  title.className = 'section-title';
  title.textContent = 'Requirements';
  
  const description = document.createElement('p');
  description.className = 'section-description';
  description.textContent = 'Check back soon for detailed requirements for the Waffle Web Challenge!';
  
  header.appendChild(title);
  header.appendChild(description);
  
  container.appendChild(header);
  section.appendChild(container);
  
  return section;
}

// Render Rules page
function renderRules() {
  const section = document.createElement('section');
  section.className = 'rules-section';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  // Section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h1');
  title.className = 'section-title';
  title.textContent = 'Competition Rules 🧇';
  
  const description = document.createElement('p');
  description.className = 'section-description';
  description.textContent = 'Follow these guidelines to ensure your submission is valid and qualifies for our delicious waffle prizes!';
  
  header.appendChild(title);
  header.appendChild(description);
  
  // Tabs
  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  
  // Tab buttons
  const tabsList = document.createElement('div');
  tabsList.className = 'tabs-list';
  
  const tabData = [
    { id: 'event', title: 'Event Rules' },
    { id: 'conduct', title: 'Code of Conduct' },
    { id: 'submission', title: 'Submission Rules' }
  ];
  
  tabData.forEach(tab => {
    const tabButton = document.createElement('button');
    tabButton.className = 'tab-button';
    tabButton.setAttribute('data-tab', tab.id);
    tabButton.textContent = tab.title;
    
    if (state.activeTab === tab.id) {
      tabButton.classList.add('active');
    }
    
    tabsList.appendChild(tabButton);
  });
  
  // Tab content
  const eventRulesContent = document.createElement('div');
  eventRulesContent.className = 'tab-content';
  eventRulesContent.setAttribute('data-tab-content', 'event');
  if (state.activeTab === 'event') {
    eventRulesContent.classList.add('active');
  }
  
  // Event Rules content
  const eventRulesList = document.createElement('ul');
  eventRulesList.className = 'rules-list';
  
  const eventRules = [
    'All Hack Clubbers under 18 can participate',
    'High schoolers over 18 in the USA can participate through a club/hackathon',
    'Participants must register before the deadline',
    'Each participant can submit only one project',
    'Team submissions are allowed with a maximum of 3 members per team'
  ];
  
  eventRules.forEach(rule => {
    const li = document.createElement('li');
    li.className = 'rule-item';
    
    const icon = document.createElement('span');
    icon.className = 'rule-icon';
    icon.innerHTML = '✓';
    
    const text = document.createElement('span');
    text.className = 'rule-text';
    text.textContent = rule;
    
    li.appendChild(icon);
    li.appendChild(text);
    eventRulesList.appendChild(li);
  });
  
  eventRulesContent.appendChild(eventRulesList);
  
  // Code of Conduct content
  const conductContent = document.createElement('div');
  conductContent.className = 'tab-content';
  conductContent.setAttribute('data-tab-content', 'conduct');
  if (state.activeTab === 'conduct') {
    conductContent.classList.add('active');
  }
  
  const conductList = document.createElement('ul');
  conductList.className = 'rules-list';
  
  const conductRules = [
    'All participants must adhere to the Hack Club Code of Conduct',
    'Be respectful and supportive of other participants',
    'Inappropriate or offensive content will result in disqualification',
    'All communication should be constructive and respectful',
    'Harassment of any kind will not be tolerated'
  ];
  
  conductRules.forEach(rule => {
    const li = document.createElement('li');
    li.className = 'rule-item';
    
    const icon = document.createElement('span');
    icon.className = 'rule-icon';
    icon.innerHTML = '✓';
    
    const text = document.createElement('span');
    text.className = 'rule-text';
    text.textContent = rule;
    
    li.appendChild(icon);
    li.appendChild(text);
    conductList.appendChild(li);
  });
  
  conductContent.appendChild(conductList);
  
  // Submission Rules content
  const submissionContent = document.createElement('div');
  submissionContent.className = 'tab-content';
  submissionContent.setAttribute('data-tab-content', 'submission');
  if (state.activeTab === 'submission') {
    submissionContent.classList.add('active');
  }
  
  const submissionList = document.createElement('ul');
  submissionList.className = 'rules-list';
  
  const submissionRules = [
    'All submissions must be original work',
    'No copy-pasting code from other projects or sources',
    'Submissions must be made before the deadline (no exceptions)',
    'Projects must be hosted and accessible for judging',
    'Source code must be publicly available on GitHub'
  ];
  
  submissionRules.forEach(rule => {
    const li = document.createElement('li');
    li.className = 'rule-item';
    
    const icon = document.createElement('span');
    icon.className = 'rule-icon';
    icon.innerHTML = '✓';
    
    const text = document.createElement('span');
    text.className = 'rule-text';
    text.textContent = rule;
    
    li.appendChild(icon);
    li.appendChild(text);
    submissionList.appendChild(li);
  });
  
  submissionContent.appendChild(submissionList);
  
  // Note for submission rules
  const note = document.createElement('div');
  note.className = 'rules-note';
  
  const noteIcon = document.createElement('span');
  noteIcon.className = 'note-icon';
  noteIcon.innerHTML = 'ℹ️';
  
  const noteText = document.createElement('span');
  noteText.textContent = 'Submissions that don\'t meet all requirements may still be considered, but might not qualify for all prizes.';
  
  note.appendChild(noteIcon);
  note.appendChild(noteText);
  submissionContent.appendChild(note);
  
  // Assemble tabs
  tabs.appendChild(tabsList);
  tabs.appendChild(eventRulesContent);
  tabs.appendChild(conductContent);
  tabs.appendChild(submissionContent);
  
  container.appendChild(header);
  container.appendChild(tabs);
  
  section.appendChild(container);
  
  return section;
}

// Render Prizes page
function renderPrizes() {
  const section = document.createElement('section');
  section.className = 'prizes-section';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  // Section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h1');
  title.className = 'section-title';
  title.textContent = 'Delicious Prizes';
  
  header.appendChild(title);
  
  // Coming soon content
  const comingSoon = document.createElement('div');
  comingSoon.className = 'coming-soon';
  
  const waffleEmoji = document.createElement('div');
  waffleEmoji.className = 'text-6xl mb-6';
  waffleEmoji.innerHTML = '🧇';
  waffleEmoji.style.fontSize = '4rem';
  waffleEmoji.style.marginBottom = '1.5rem';
  
  const comingSoonTitle = document.createElement('h2');
  comingSoonTitle.className = 'coming-soon-title';
  comingSoonTitle.textContent = 'Coming Soon!';
  
  const comingSoonDesc = document.createElement('p');
  comingSoonDesc.className = 'coming-soon-description';
  comingSoonDesc.textContent = 'We\'re cooking up some delicious prizes for our winners. Check back soon to discover what mouthwatering rewards await!';
  
  comingSoon.appendChild(waffleEmoji);
  comingSoon.appendChild(comingSoonTitle);
  comingSoon.appendChild(comingSoonDesc);
  
  container.appendChild(header);
  container.appendChild(comingSoon);
  
  section.appendChild(container);
  
  return section;
}

// Render Get Started page
function renderGetStarted() {
  const section = document.createElement('section');
  section.className = 'rules-section';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  // Section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h1');
  title.className = 'section-title';
  title.textContent = 'Get Started';
  
  const description = document.createElement('p');
  description.className = 'section-description';
  description.textContent = 'Check back soon for information on how to get started with the Waffle Web Challenge!';
  
  header.appendChild(title);
  header.appendChild(description);
  
  container.appendChild(header);
  section.appendChild(container);
  
  return section;
}
