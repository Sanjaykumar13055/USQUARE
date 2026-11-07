const { useState, useEffect, useMemo } = React;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCHN0rR7dFBRm8wp1X-RUYN36pV5Jolps",
  authDomain: "usquare-59fc2.firebaseapp.com",
  projectId: "usquare-59fc2",
  storageBucket: "usquare-59fc2.firebasestorage.app",
  messagingSenderId: "761030377337",
  appId: "1:761030377337:web:7678b92828f5ba3bcd39a8",
  measurementId: "G-FKC6F9FWEK"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Custom SVG Icon Components
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "var(--gold-primary)" : "none"} stroke={filled ? "var(--gold-primary)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible', display: 'block' }}>
    <path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CrescentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-7.54-7.54C12.92 3.04 12.46 3 12 3z"></path>
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
  </svg>
);

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= fullStars ? "#F59E0B" : "none"} stroke={i <= fullStars ? "#F59E0B" : "var(--text-muted)"} strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    );
  }
  return <div style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>{stars}</div>;
};

const CreditCardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const CashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <circle cx="12" cy="12" r="3"/>
    <line x1="6" y1="12" x2="6.01" y2="12"/>
    <line x1="18" y1="12" x2="18.01" y2="12"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// Mehndi-specific icons
const MehndiHandIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>
    <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 16"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// Custom Luxury Royal Dropdown Component
function CustomRoyalDropdown({ options, value, onChange, placeholder = "Select option", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className={`royal-dropdown-container ${className}`} ref={dropdownRef}>
      <button 
        type="button"
        className={`royal-dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="royal-dropdown-label">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDownIcon style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', color: 'var(--gold-primary)' }} />
      </button>

      {isOpen && (
        <div className="royal-dropdown-menu anim-fade-up">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`royal-dropdown-item ${opt.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              <span>{opt.label}</span>
              {opt.value === value && <SparkleIcon style={{ width: 14, height: 14, color: 'var(--gold-primary)' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// Mehndi Designers Data
const MEHNDI_DESIGNERS = [
  {
    id: 1,
    name: 'Fatima Zahra',
    initials: 'ف',
    specialty: 'Bridal & Arabic Mehndi',
    rating: 4.9,
    reviews: 245,
    experience: '12+ Years',
    location: 'U Square Studio & Home Visit',
    mapUrl: 'https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw',
    startingPrice: 2500,
    designs: ['Bridal Full Hands', 'Arabic Trails', 'Indo-Arabic Fusion', 'Dulhan Special'],
    availability: 'Booking for Jul-Aug 2026'
  },
  {
    id: 2,
    name: 'Ayesha Siddiqui',
    initials: 'ع',
    specialty: 'Rajasthani & Traditional',
    rating: 4.8,
    reviews: 189,
    experience: '8+ Years',
    location: 'U Square Studio & Home Visit',
    mapUrl: 'https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw',
    startingPrice: 1800,
    designs: ['Rajasthani Peacock', 'Traditional Mughal', 'Mandala Art', 'Jaali Pattern'],
    availability: 'Booking Open'
  },
  {
    id: 3,
    name: 'Mariam Begum',
    initials: 'م',
    specialty: 'Modern & Minimalist',
    rating: 4.7,
    reviews: 156,
    experience: '6+ Years',
    location: 'U Square Studio & Home Visit',
    mapUrl: 'https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw',
    startingPrice: 1200,
    designs: ['Minimalist Vine', 'Finger Trails', 'Geometric Modern', 'Floral Minimal'],
    availability: 'Booking Open'
  },
  {
    id: 4,
    name: 'Khadija Noor',
    initials: 'خ',
    specialty: 'Kids & Party Mehndi',
    rating: 4.9,
    reviews: 312,
    experience: '10+ Years',
    location: 'U Square Studio & Events',
    mapUrl: 'https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw',
    startingPrice: 800,
    designs: ['Kids Cartoon', 'Party Quick Designs', 'Eid Special', 'Glitter Mehndi'],
    availability: 'Booking for Events'
  }
];

function App() {
  // Preloader Screen state
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);

  // Custom Animated Cursor State
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const [isCursorClicked, setIsCursorClicked] = useState(false);

  useEffect(() => {
    let animFrameId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setCursorPos({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (target) {
        const interactive = target.closest('a, button, input, select, textarea, .product-card, .category-tab, .search-dropdown-item, .designer-card, .chip, [role="button"]');
        setIsCursorHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsCursorClicked(true);
    const handleMouseUp = () => setIsCursorClicked(false);

    const smoothLerpLoop = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      setRingPos({ x: currentX, y: currentY });
      animFrameId = requestAnimationFrame(smoothLerpLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animFrameId = requestAnimationFrame(smoothLerpLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingScreen(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Theme state
  const [theme, setTheme] = useState('light');
  
  // Data state
  const [productList, setProductList] = useState(() => {
    try {
      const saved = localStorage.getItem('usquare_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(15000);
  
  // Modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('usquare_logged_in') === 'true');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  
  // Product Detail Selection
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [detailQty, setDetailQty] = useState(1);
  const [reviews, setReviews] = useState({});
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Promo code & Checkout form
  const [promoInput, setPromoInput] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('usquare_orders')) || []; }
    catch { return []; }
  });
  const [promoCodes, setPromoCodes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('usquare_promos')) || { 'EID2026': 0.15, 'WELCOME10': 0.10 }; }
    catch { return { 'EID2026': 0.15, 'WELCOME10': 0.10 }; }
  });
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('usquare_bookings')) || []; }
    catch { return []; }
  });
  const [storeSettings, setStoreSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('usquare_settings')) || { shippingFee: 50, freeShippingThreshold: 1000 }; }
    catch { return { shippingFee: 50, freeShippingThreshold: 1000 }; }
  });

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });
  // Mehndi Booking State
  const [isMehndiOpen, setIsMehndiOpen] = useState(false);
  const [bookingDesigner, setBookingDesigner] = useState(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    phone: '',
    eventDate: '',
    eventType: 'Bridal Mehndi',
    location: '',
    notes: ''
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll Lock for Modals
  useEffect(() => {
    if (isAdminOpen || isCheckoutOpen || isWishlistOpen || activeProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAdminOpen, isCheckoutOpen, isWishlistOpen, activeProduct]);

  // Scroll & Entrance Animations Observer
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in, .product-card, .footer, .section-title h2, .mehndi-toggle-bar, .designer-card');
    animElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedCategory, filteredProducts, isMehndiOpen]);

  // Toast notification helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Handle Mehndi Booking Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.clientName || !bookingForm.phone || !bookingForm.eventDate) {
      showToast('Please fill in all required booking details');
      return;
    }
    const newBooking = { ...bookingForm, id: Date.now(), status: 'Pending', submitDate: new Date().toLocaleDateString() };
    db.collection('bookings').add({ ...newBooking, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    
    setBookingSubmitted(true);
    showToast(`Booking request sent to ${bookingDesigner ? bookingDesigner.name : 'Designer'}!`);
  };

  // Real categories from user products
  const categories = [
    'All', 
    'Cotton Shimmer Hijabs', 
    'Instant Hijabs', 
    'Malaysian Double Layer Hijabs', 
    'Partywear Hijabs', 
    'Organic Mehendi Cones', 
    'Rayon Cotton Shawls', 
    'Kids Hijab Sets'
  ];



  // Advanced Multi-Field Filter Matching
  const filteredProducts = useMemo(() => {
    return productList.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch = (
          product.name.toLowerCase().includes(q) || 
          product.category.toLowerCase().includes(q) || 
          product.description.toLowerCase().includes(q) || 
          (product.badge && product.badge.toLowerCase().includes(q)) || 
          (product.colors && product.colors.some(c => c.toLowerCase().includes(q))) ||
          (product.sizes && product.sizes.some(s => s.toLowerCase().includes(q)))
        );
      }
      
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [selectedCategory, searchQuery, sortBy, maxPrice]);

  // Instant Search Autocomplete Matches
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return productList.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) || 
      (p.colors && p.colors.some(c => c.toLowerCase().includes(q)))
    ).slice(0, 6);
  }, [searchQuery]);

  // Cart operations
  const addToCart = (product, color = null, size = null, qty = 1) => {
    const itemColor = color || (product.colors ? product.colors[0] : '');
    const itemSize = size || (product.sizes ? product.sizes[0] : '');
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && item.color === itemColor && item.size === itemSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { ...product, color: itemColor, size: itemSize, quantity: qty }];
      }
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const updateCartQty = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast("Item removed from cart");
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Removed from Wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Saved to Wishlist");
        return [...prev, productId];
      }
    });
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountRate;
  const shippingFee = subtotal >= storeSettings.freeShippingThreshold || subtotal === 0 ? 0 : storeSettings.shippingFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (promoCodes[code]) {
      setDiscountRate(promoCodes[code]);
      showToast(`Promo code applied! ${promoCodes[code] * 100}% OFF`);
    } else {
      showToast("Invalid Promo Code. Try EID2026 or WELCOME10");
    }
  };

  // Open Product Modal
  const openProductModal = (product) => {
    setActiveProduct(product);
    setSelectedColor(product.colors ? product.colors[0] : '');
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setDetailQty(1);
  };

  // Submit Review
  const addReview = (productId) => {
    if (!newReviewText.trim()) return;
    const rev = { id: Date.now(), rating: newReviewRating, text: newReviewText, author: "Verified Customer", date: "Just now" };
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), rev]
    }));
    setNewReviewText('');
    showToast("Thank you for your review!");
  };

  // Place Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.address) {
      showToast("Please fill in your shipping details");
      return;
    }
    const orderId = "ALN-" + Math.floor(100000 + Math.random() * 900000);
    setLastOrder({
      id: orderId,
      items: [...cart],
      total: grandTotal,
      shipping: shippingInfo,
      date: new Date().toLocaleDateString()
    });
    setCheckoutStep(3); // Confirmation screen
    setCart([]);
  };

  // Admin Dashboard State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [inwardOutwardProduct, setInwardOutwardProduct] = useState(null);
  const [stockChangeQty, setStockChangeQty] = useState('');

  // Admin Dashboard Component
  const AdminDashboard = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      if (loginUsername === 'admin' && loginPassword === 'admin') {
        setIsLoggedIn(true);
        localStorage.setItem('usquare_logged_in', 'true');
        showToast('Successfully logged in');
      } else {
        showToast('Invalid credentials');
      }
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('usquare_logged_in');
      setIsAdminOpen(false);
      showToast('Logged out');
    };

    const handleSaveProduct = (e) => {
      e.preventDefault();
      const updatedList = [...productList];
      
      // Parse numbers and arrays
      const productToSave = {
        ...editingProduct,
        price: parseFloat(editingProduct.price) || 0,
        originalPrice: editingProduct.originalPrice ? parseFloat(editingProduct.originalPrice) : null,
        stock: parseInt(editingProduct.stock) || 0,
        colors: typeof editingProduct.colors === 'string' ? editingProduct.colors.split(',').map(c => c.trim()) : editingProduct.colors,
        sizes: typeof editingProduct.sizes === 'string' ? editingProduct.sizes.split(',').map(s => s.trim()) : editingProduct.sizes,
        badges: typeof editingProduct.badges === 'string' ? editingProduct.badges.split(',').map(b => b.trim()) : editingProduct.badges,
      };

      if (productToSave.id && productList.some(p => p.id === productToSave.id)) {
        db.collection('products').doc(productToSave.id).set(productToSave);
        showToast('Product updated successfully');
      } else {
        productToSave.id = productToSave.id || 'P' + Date.now();
        db.collection('products').doc(productToSave.id).set(productToSave);
        showToast('Product added successfully');
      }
      setEditingProduct(null);
    };

    const handleDeleteProduct = (id) => {
      if (confirm('Are you sure you want to delete this product?')) {
        db.collection('products').doc(id).delete();
        showToast('Product deleted');
      }
    };

    const handleStockUpdate = (e, type) => {
      e.preventDefault();
      const qty = parseInt(stockChangeQty);
      if (!qty || qty <= 0) return showToast('Enter a valid quantity');
      
      const updatedList = [...productList];
      const index = updatedList.findIndex(p => p.id === inwardOutwardProduct.id);
      
      if (type === 'outward' && updatedList[index].stock < qty) {
        return showToast('Not enough stock for outward movement');
      }
      
      const newStock = updatedList[index].stock + (type === 'inward' ? qty : -qty);
      db.collection('products').doc(inwardOutwardProduct.id).update({ stock: newStock });
      
      showToast(`Stock updated: ${type} ${qty}`);
      setInwardOutwardProduct(null);
      setStockChangeQty('');
    };

    if (!isLoggedIn) {
      return (
        <div className="admin-overlay anim-visible">
          <div className="admin-login-container">
            <div className="admin-login-card admin-card">
              <h2 className="admin-title" style={{marginBottom: '10px'}}>Admin Access</h2>
              <p style={{color: 'var(--text-secondary)', marginBottom: '30px'}}>Please login to manage store inventory</p>
              <form onSubmit={handleLogin}>
                <div className="admin-form-group" style={{textAlign: 'left'}}>
                  <label>Username</label>
                  <input type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} required />
                </div>
                <div className="admin-form-group" style={{textAlign: 'left'}}>
                  <label>Password</label>
                  <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                </div>
                <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                  <button type="submit" className="admin-btn" style={{flex: 1}}>Login</button>
                  <button type="button" className="admin-btn-outline" style={{flex: 1}} onClick={() => setIsAdminOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="admin-overlay anim-visible">
        <div className="admin-sidebar">
          <div className="admin-sidebar-logo">U SQUARE<br/><span style={{fontSize:'0.8rem', letterSpacing:'2px'}}>ADMIN</span></div>
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            Overview
          </button>
          <button className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            Orders
          </button>
          <button className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            Product Management
          </button>
          <button className={`admin-nav-item ${activeTab === 'stock' ? 'active' : ''}`} onClick={() => setActiveTab('stock')}>
            Stock Maintenance
          </button>
          <button className={`admin-nav-item ${activeTab === 'promos' ? 'active' : ''}`} onClick={() => setActiveTab('promos')}>
            Promotions
          </button>
          <button className={`admin-nav-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            Mehndi Bookings
          </button>
          <button className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            Settings
          </button>
          <div style={{marginTop: 'auto'}}>
            <button className="admin-nav-item" onClick={() => setIsAdminOpen(false)} style={{width:'100%', justifyContent:'center', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.2)'}}>
              Return to Store
            </button>
            <button className="admin-nav-item" onClick={handleLogout} style={{width:'100%', justifyContent:'center', color: '#ffb3b3'}}>
              Logout
            </button>
          </div>
        </div>

        <div className="admin-main">
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-header">
                <h2 className="admin-title">Dashboard Overview</h2>
              </div>
              <div className="admin-stats-grid">
                <div className="admin-stat-box">
                  <div className="admin-stat-value">{productList.length}</div>
                  <div className="admin-stat-label">Total Products</div>
                </div>
                <div className="admin-stat-box">
                  <div className="admin-stat-value">₹{productList.reduce((sum, p) => sum + (p.price * (p.stock||0)), 0).toLocaleString('en-IN')}</div>
                  <div className="admin-stat-label">Total Inventory Value</div>
                </div>
                <div className="admin-stat-box">
                  <div className="admin-stat-value">{productList.filter(p => (p.stock||0) < 5).length}</div>
                  <div className="admin-stat-label">Low Stock Alerts</div>
                </div>
                <div className="admin-stat-box">
                  <div className="admin-stat-value">{orders.length}</div>
                  <div className="admin-stat-label">Total Orders</div>
                </div>
              </div>
              
              <div className="admin-charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div className="admin-card">
                   <h3 style={{marginBottom: '15px'}}>Sales Activity</h3>
                   <div className="fake-chart-container" style={{height: '150px', display: 'flex', alignItems: 'flex-end', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                     <div className="chart-bar" style={{flex: 1, backgroundColor: 'var(--gold-primary)', height: '40%', borderRadius: '4px 4px 0 0'}}></div>
                     <div className="chart-bar" style={{flex: 1, backgroundColor: 'var(--gold-primary)', height: '70%', borderRadius: '4px 4px 0 0'}}></div>
                     <div className="chart-bar" style={{flex: 1, backgroundColor: 'var(--gold-primary)', height: '50%', borderRadius: '4px 4px 0 0'}}></div>
                     <div className="chart-bar" style={{flex: 1, backgroundColor: 'var(--gold-primary)', height: '90%', borderRadius: '4px 4px 0 0'}}></div>
                     <div className="chart-bar" style={{flex: 1, backgroundColor: 'var(--gold-primary)', height: '60%', borderRadius: '4px 4px 0 0'}}></div>
                   </div>
                </div>
                <div className="admin-card">
                   <h3 style={{marginBottom: '15px'}}>Recent Orders</h3>
                   {orders.slice(0, 4).map(o => (
                     <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 0'}}>
                       <span>#{o.id}</span>
                       <span style={{color: 'var(--gold-primary)'}}>₹{o.total.toFixed(2)}</span>
                       <span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span>
                     </div>
                   ))}
                   {orders.length === 0 && <div style={{color: 'var(--text-secondary)'}}>No orders yet.</div>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="admin-header">
                <h2 className="admin-title">Product Management</h2>
                <button className="admin-btn" onClick={() => setEditingProduct({
                  name: '', category: 'Hijabs', price: '', image: './images/placeholder.jpg', stock: 10, colors: '', sizes: '', description: '', tags: '', badges: ''
                })}>+ Add New Product</button>
              </div>
              
              {editingProduct ? (
                <div className="admin-card">
                  <h3 style={{marginBottom: '20px'}}>{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
                  <form onSubmit={handleSaveProduct} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                    <div className="admin-form-group">
                      <label>Product Name</label>
                      <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} required />
                    </div>
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                        <option>Hijabs</option>
                        <option>Modest Wear</option>
                        <option>Accessories</option>
                        <option>Organic Mehendi</option>
                        <option>Bridal</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Price (₹)</label>
                      <input type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} required />
                    </div>
                    <div className="admin-form-group">
                      <label>Original Price (₹) (Optional)</label>
                      <input type="number" step="0.01" value={editingProduct.originalPrice || ''} onChange={e => setEditingProduct({...editingProduct, originalPrice: e.target.value})} />
                    </div>
                    <div className="admin-form-group">
                      <label>Stock Quantity</label>
                      <input type="number" value={editingProduct.stock} onChange={e => setEditingProduct({...editingProduct, stock: e.target.value})} required />
                    </div>
                    <div className="admin-form-group">
                      <label>Image URL</label>
                      <input type="text" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} required />
                    </div>
                    <div className="admin-form-group" style={{gridColumn: '1 / -1'}}>
                      <label>Description</label>
                      <textarea rows="3" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} required></textarea>
                    </div>
                    <div className="admin-form-group">
                      <label>Colors (comma separated)</label>
                      <input type="text" value={Array.isArray(editingProduct.colors) ? editingProduct.colors.join(', ') : (editingProduct.colors || '')} onChange={e => setEditingProduct({...editingProduct, colors: e.target.value})} />
                    </div>
                    <div className="admin-form-group">
                      <label>Sizes (comma separated)</label>
                      <input type="text" value={Array.isArray(editingProduct.sizes) ? editingProduct.sizes.join(', ') : (editingProduct.sizes || '')} onChange={e => setEditingProduct({...editingProduct, sizes: e.target.value})} />
                    </div>
                    <div className="admin-form-group">
                      <label>Tags (comma separated)</label>
                      <input type="text" value={Array.isArray(editingProduct.tags) ? editingProduct.tags.join(', ') : (editingProduct.tags || '')} onChange={e => setEditingProduct({...editingProduct, tags: e.target.value})} />
                    </div>
                    <div className="admin-form-group">
                      <label>Badges (comma separated)</label>
                      <input type="text" value={Array.isArray(editingProduct.badges) ? editingProduct.badges.join(', ') : (editingProduct.badges || '')} onChange={e => setEditingProduct({...editingProduct, badges: e.target.value})} />
                    </div>
                    
                    <div style={{gridColumn: '1 / -1', display: 'flex', gap: '15px', marginTop: '10px'}}>
                      <button type="submit" className="admin-btn">Save Product</button>
                      <button type="button" className="admin-btn-outline" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="admin-card" style={{padding: 0, overflow: 'hidden'}}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map(p => (
                        <tr key={p.id}>
                          <td><img src={p.image} alt={p.name} style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'4px'}}/></td>
                          <td style={{fontWeight: 500}}>{p.name}</td>
                          <td>{p.category}</td>
                          <td>₹{Number(p.price).toFixed(2)}</td>
                          <td>
                            <span style={{
                              padding: '4px 8px', 
                              borderRadius: '4px', 
                              fontSize: '0.8rem',
                              background: (p.stock||0) < 5 ? '#ffe6e6' : 'var(--emerald-subtle)',
                              color: (p.stock||0) < 5 ? '#cc0000' : 'var(--emerald-primary)'
                            }}>{p.stock || 0}</span>
                          </td>
                          <td>
                            <div style={{display: 'flex', gap: '10px'}}>
                              <button className="admin-btn-outline" style={{padding: '4px 10px', fontSize: '0.8rem'}} onClick={() => setEditingProduct(p)}>Edit</button>
                              <button className="admin-btn-danger" style={{padding: '4px 10px', fontSize: '0.8rem'}} onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stock' && (
            <div>
              <div className="admin-header">
                <h2 className="admin-title">Stock Maintenance</h2>
              </div>
              
              <div className="admin-card">
                <h3 style={{marginBottom: '20px'}}>Inward / Outward Entry</h3>
                <form style={{display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '500px'}}>
                  <div className="admin-form-group">
                    <label>Select Product</label>
                    <select 
                      value={inwardOutwardProduct ? inwardOutwardProduct.id : ''} 
                      onChange={e => setInwardOutwardProduct(productList.find(p => p.id === e.target.value))}
                    >
                      <option value="">-- Choose Product --</option>
                      {productList.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (Current Stock: {p.stock || 0})</option>
                      ))}
                    </select>
                  </div>
                  
                  {inwardOutwardProduct && (
                    <>
                      <div className="admin-form-group">
                        <label>Quantity</label>
                        <input type="number" min="1" value={stockChangeQty} onChange={e => setStockChangeQty(e.target.value)} placeholder="Enter quantity..." />
                      </div>
                      
                      <div style={{display: 'flex', gap: '15px'}}>
                        <button type="button" className="admin-btn" style={{flex: 1, background: 'var(--emerald-primary)'}} onClick={(e) => handleStockUpdate(e, 'inward')}>+ Inward (Add)</button>
                        <button type="button" className="admin-btn-outline" style={{flex: 1, color: '#dc3545', borderColor: '#dc3545'}} onClick={(e) => handleStockUpdate(e, 'outward')}>- Outward (Remove)</button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Admin Dashboard */}
      {isAdminOpen && AdminDashboard()}
      {/* Interactive Custom Animated Cursor */}
      <div 
        className={`custom-cursor-dot ${isCursorHovered ? 'cursor-hover' : ''} ${isCursorClicked ? 'cursor-clicked' : ''}`}
        style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}
      />
      <div 
        className={`custom-cursor-ring ${isCursorHovered ? 'cursor-hover' : ''} ${isCursorClicked ? 'cursor-clicked' : ''}`}
        style={{ transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)` }}
      />

      {/* Opening Splash / Intro Animation Screen */}
      <div className={`preloader-overlay ${!isLoadingScreen ? 'fade-out' : ''}`}>
        <div className="preloader-logo-ring">
          <img src="./images/usquare_logo.png" alt="U SQUARE LIFESTYLE Emblem" className="preloader-logo-img" />
        </div>
        <h1 className="preloader-title">U SQUARE LIFESTYLE</h1>
        <p className="preloader-subtitle">Modest Elegance & Certified Henna Studio</p>
        <div className="preloader-bar">
          <div className="preloader-bar-fill"></div>
        </div>
      </div>

      {/* Top Announcement & Contact Bar */}
      <div className="announcement-bar">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.85rem' }}>Special Offer: Use Code <strong>EID2026</strong> for 20% OFF</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <a href="https://wa.me/918939167359" target="_blank" rel="noopener noreferrer" className="contact-chip-phone" title="Chat on WhatsApp (+91 89391 67359)">
            <PhoneIcon /> WhatsApp: +91 89391 67359
          </a>
          <a href="mailto:usquare2106@gmail.com" className="contact-chip-email">
            <MailIcon /> usquare2106@gmail.com
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="navbar">
        <div className="navbar-container">
          <a href="#" className="brand-logo" title="U SQUARE LIFESTYLE">
            <img src="./images/usquare_logo.png" alt="U SQUARE LIFESTYLE Logo" className="brand-logo-img" />
            <div className="brand-text">
              <h1>U SQUARE LIFESTYLE</h1>
              <span>Modest Elegance & Mehndi Studio</span>
            </div>
          </a>

          {/* Search Bar with Autocomplete */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon"><SearchIcon /></span>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search colors (Black, Gold...), codes (PW1008), or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery('')} title="Clear search">
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Floating Search Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="search-dropdown">
                <div className="search-dropdown-header">
                  <span>Matches Found ({searchMatches.length})</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Click to inspect</span>
                </div>
                {searchMatches.length === 0 ? (
                  <div style={{ padding: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    No instant matches found for "{searchQuery}"
                  </div>
                ) : (
                  searchMatches.map(product => (
                    <div 
                      key={product.id} 
                      className="search-dropdown-item" 
                      onClick={() => { openProductModal(product); setIsSearchFocused(false); }}
                    >
                      <img src={product.image} alt={product.name} className="search-dropdown-thumb" />
                      <div className="search-dropdown-info">
                        <div className="search-dropdown-title">{product.name}</div>
                        <div className="search-dropdown-meta">{product.category} {product.colors && `• ${product.colors[0]}`}</div>
                      </div>
                      <div className="search-dropdown-price">₹{product.price.toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Toggle Dark/Light Mode">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

            <button className="icon-btn" onClick={() => setIsWishlistOpen(true)} title="Wishlist">
              <HeartIcon filled={wishlist.length > 0} />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </button>

            <button className="icon-btn" onClick={() => setIsAdminOpen(true)} title="Admin Dashboard">
              <UserIcon />
            </button>

            <button className="icon-btn" onClick={() => setIsCartOpen(true)} title="Shopping Cart">
              <CartIcon />
              {cart.length > 0 && <span className="badge-count">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div>
            <div className="hero-tag">
              <CrescentIcon /> Exclusive Modest Collection
            </div>
            <h1 className="hero-title">Grace, Pure Elegance & Authentic Beauty</h1>
            <p className="hero-subtitle">
              Discover our Cotton Shimmer wraps, Malaysian double layer hijabs, instant pull-on shawls, organic Rajasthani Mehendi cones, and partywear collections.
            </p>
            <div className="hero-buttons">
              <a href="#catalog" className="btn-primary">
                Explore Collection <SparkleIcon />
              </a>
              <a href="#catalog" onClick={() => setSelectedCategory('Organic Mehendi Cones')} className="btn-outline">
                Organic Mehendi Cones
              </a>
            </div>
          </div>

          {/* Hero Showcase Card */}
          <div className="hero-card">
            <img 
              src="./images/Cotton%20Shimmer/Cotton%20Shimmer%20Black.png" 
              alt="Luxury Cotton Shimmer Hijab Showcase" 
              className="hero-card-img"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="text-gold" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>FEATURED FLAGSHIP</span>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF' }}>Luxury Cotton Shimmer Hijab</h3>
              </div>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => openProductModal(productList[0])}>
                View Product
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Catalog Section */}
      <main className="main-container" id="catalog">
        <div className="section-header">
          <div className="section-title">
            <h2>Our Signature Collection</h2>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <label style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Max Price: <strong>₹{maxPrice}</strong></label>
            <input 
              type="range" 
              min="500" 
              max="15000" 
              step="500"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ accentColor: 'var(--gold-primary)' }}
            />
          </div>
        </div>



        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="controls-bar">
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> modest items
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Sort by:</span>
            <CustomRoyalDropdown 
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 'popular', label: 'Most Popular' },
                { value: 'rating', label: 'Highest Rated' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' }
              ]}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <h3>No products found matching "{searchQuery}".</h3>
              <p style={{ marginTop: '8px', marginBottom: '20px' }}>Try searching by color (e.g., Black, Gold, Maroon), category, or style.</p>
              <button className="btn-primary" style={{ marginTop: '8px' }} onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>Clear All Filters</button>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div key={product.id} className={`product-card stagger-${(index % 8) + 1}`}>
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" onClick={() => openProductModal(product)} />
                  <span className={`badge-tag badge-${product.badgeType}`}>{product.badge}</span>
                  <button 
                    className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    title="Wishlist"
                  >
                    <HeartIcon filled={wishlist.includes(product.id)} />
                  </button>
                </div>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-title" onClick={() => openProductModal(product)}>{product.name}</h3>

                  <div className="product-rating">
                    <StarRating rating={product.rating} />
                    <span style={{ marginLeft: '4px' }}>{product.rating} ({product.reviewsCount})</span>
                  </div>

                  <div className="product-footer">
                    <div className="product-price">
                      <span className="current-price">₹{product.price.toFixed(2)}</span>
                      {product.originalPrice && <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>}
                    </div>

                    <button className="add-cart-btn" onClick={() => addToCart(product)}>
                      <PlusIcon /> <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Mehndi Designers Booking Section */}
      <section className="mehndi-section anim-fade-up">
        <div 
          className="mehndi-toggle-bar"
          onClick={() => setIsMehndiOpen(!isMehndiOpen)}
        >
          <div className="mehndi-toggle-left">
            <div className="mehndi-toggle-icon">
              <MehndiHandIcon />
            </div>
            <div className="mehndi-toggle-text">
              <h3>Mehndi Artists & Bridal Booking</h3>
              <p>Book verified bridal & event henna designers for home visits or studio appointments</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#F5E6A3', fontWeight: 600, background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '20px' }}>
              {isMehndiOpen ? 'Hide Artists' : 'Explore & Book'}
            </span>
            <div className={`mehndi-toggle-arrow ${isMehndiOpen ? 'open' : ''}`}>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        <div className={`mehndi-panel ${isMehndiOpen ? 'open' : ''}`}>
          <div className="mehndi-panel-inner">
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="text-gold" style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>CERTIFIED ARTISTS</span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginTop: '4px' }}>Choose Your Preferred Henna Artist</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '6px auto 0' }}>
                All our artists use 100% natural, chemical-free organic Rajasthani henna cones. Visit 
                <a href="https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', fontWeight: 600, marginLeft: '5px', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPinIcon /> U Square Mehndi Artist Studio on Google Maps
                </a>.
              </p>
            </div>

            <div className="designers-grid">
              {MEHNDI_DESIGNERS.map(designer => (
                <div key={designer.id} className="designer-card">
                  <div className="designer-header">
                    <div className="designer-avatar">{designer.initials}</div>
                    <div className="designer-info">
                      <h4>{designer.name}</h4>
                      <div className="designer-specialty">{designer.specialty}</div>
                    </div>
                  </div>

                  <div className="designer-stats">
                    <div className="designer-stat">
                      <StarRating rating={designer.rating} />
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{designer.rating}</span>
                      <span>({designer.reviews})</span>
                    </div>
                    <div className="designer-stat">
                      <ClockIcon />
                      <span>{designer.experience}</span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPinIcon /> 
                    <a href={designer.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', textDecoration: 'underline', fontWeight: 500 }}>
                      {designer.location} (Maps)
                    </a>
                  </div>

                  <div className="designer-designs">
                    {designer.designs.map((d, i) => (
                      <span key={i} className="design-tag">{d}</span>
                    ))}
                  </div>

                  <div className="designer-price-row">
                    <div className="designer-price">
                      ₹{designer.startingPrice.toLocaleString()} <span>/ starting</span>
                    </div>

                    <button 
                      className="book-btn"
                      onClick={() => {
                        setBookingDesigner(designer);
                        setBookingSubmitted(false);
                      }}
                    >
                      <CalendarIcon /> <span>Book Artist</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Store & Studio Location Map View Section */}
      <section className="main-container anim-fade-up" id="locations" style={{ marginTop: '60px', marginBottom: '60px' }}>
        <div className="section-header center" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '36px' }}>
          <div className="section-title center" style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span className="section-subtitle-tag">VISIT OUR STORES</span>
            <h2 className="section-main-heading">Store & Studio Locations</h2>
            <p className="section-desc">
              Explore our boutique store and certified bridal henna studio. Click any location card to open direct navigation in Google Maps.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {/* Card 1: USquare Lifestyle Store */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px 24px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.08em' }}>FLAGSHIP BOUTIQUE</span>
                  <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: '2px 0 4px' }}>USquare Lifestyle Store</h3>
                </div>
                <div style={{ background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                  Open Today
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                <a href="https://wa.me/918939167359" target="_blank" rel="noopener noreferrer" className="contact-chip-phone" style={{ width: 'fit-content' }} title="Chat on WhatsApp (+91 89391 67359)">
                  <PhoneIcon /> WhatsApp: +91 89391 67359
                </a>
                <a href="mailto:usquare2106@gmail.com" className="contact-chip-email" style={{ width: 'fit-content' }}>
                  <MailIcon /> usquare2106@gmail.com
                </a>
              </div>
            </div>

            {/* Embedded Visual Map View Preview */}
            <div style={{ position: 'relative', height: '220px', width: '100%', background: '#E5E3DF' }}>
              <iframe 
                title="USquare Lifestyle Store Map View"
                src="https://maps.google.com/maps?q=13.0827,80.2707&z=15&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                <a 
                  href="https://maps.app.goo.gl/2mKUXnvRUtaecEi79?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '20px', boxShadow: 'var(--shadow-md)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                >
                  <span>Open Maps App</span> <ExternalLinkIcon />
                </a>
              </div>
            </div>

            <div style={{ padding: '16px 24px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
              <a 
                href="https://maps.app.goo.gl/2mKUXnvRUtaecEi79?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="checkout-btn"
                style={{ width: '100%', textAlign: 'center', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <span>Navigate to USquare Lifestyle Store</span> <ArrowRightIcon />
              </a>
            </div>
          </div>

          {/* Card 2: U Square Mehndi Artist Studio */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px 24px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.08em' }}>HENNA & BRIDAL STUDIO</span>
                  <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', margin: '2px 0 4px' }}>U Square Mehndi Artist Studio</h3>
                </div>
                <div style={{ background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                  By Appointment
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                <a href="https://wa.me/918939167359" target="_blank" rel="noopener noreferrer" className="contact-chip-phone" style={{ width: 'fit-content' }} title="Chat on WhatsApp (+91 89391 67359)">
                  <PhoneIcon /> WhatsApp: +91 89391 67359
                </a>
                <a href="mailto:usquare2106@gmail.com" className="contact-chip-email" style={{ width: 'fit-content' }}>
                  <MailIcon /> usquare2106@gmail.com
                </a>
              </div>
            </div>

            {/* Embedded Visual Map View Preview */}
            <div style={{ position: 'relative', height: '220px', width: '100%', background: '#E5E3DF' }}>
              <iframe 
                title="U Square Mehndi Artist Studio Map View"
                src="https://maps.google.com/maps?q=13.0827,80.2707&z=15&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                <a 
                  href="https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '20px', boxShadow: 'var(--shadow-md)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                >
                  <span>Open Maps App</span> <ExternalLinkIcon />
                </a>
              </div>
            </div>

            <div style={{ padding: '16px 24px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
              <a 
                href="https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="checkout-btn"
                style={{ width: '100%', textAlign: 'center', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <span>Navigate to Mehndi Artist Studio</span> <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mehndi Artist Booking Form Modal */}
      {bookingDesigner && (
        <>
          <div className="backdrop open" onClick={() => setBookingDesigner(null)}></div>
          <div className="modal open" style={{ maxWidth: '640px' }}>
            <div className="modal-content">
              <button 
                className="close-btn" 
                style={{ position: 'absolute', top: '20px', right: '20px' }} 
                onClick={() => setBookingDesigner(null)}
              >
                <CloseIcon />
              </button>

              {!bookingSubmitted ? (
                <div className="booking-form-card" style={{ border: 'none', padding: 0, boxShadow: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div className="designer-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                      {bookingDesigner.initials}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Book Appointment with {bookingDesigner.name}</h3>
                      <span className="text-gold" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                        {bookingDesigner.specialty} • ₹{bookingDesigner.startingPrice.toLocaleString()} starting
                      </span>
                    </div>
                  </div>

                  <p className="booking-subtitle" style={{ marginBottom: '20px' }}>
                    Fill in your event details below. The artist will reach out to confirm design patterns, time slot & custom pricing.
                  </p>

                  <form onSubmit={handleBookingSubmit}>
                    <div className="booking-form-grid">
                      <div className="form-group">
                        <label>Your Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Ayesha Khan" 
                          value={bookingForm.clientName}
                          onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number (WhatsApp) *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210" 
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Event Date *</label>
                        <input 
                          type="date" 
                          required 
                          value={bookingForm.eventDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>Event / Function Type</label>
                        <CustomRoyalDropdown 
                          value={bookingForm.eventType}
                          onChange={(val) => setBookingForm({ ...bookingForm, eventType: val })}
                          options={[
                            { value: 'Bridal Mehndi', label: 'Bridal Full Mehndi' },
                            { value: 'Engagement / Ring Ceremony', label: 'Engagement / Ring Ceremony' },
                            { value: 'Eid Celebration', label: 'Eid Celebration' },
                            { value: 'Family Function', label: 'Family Function / Sangeet' },
                            { value: 'Party Guest Mehndi', label: 'Party Guest Mehndi' }
                          ]}
                        />
                      </div>

                      <div className="form-group form-full">
                        <label>Address / Event Venue Location</label>
                        <input 
                          type="text" 
                          placeholder="House No, Area, City (for Home Visit)" 
                          value={bookingForm.location}
                          onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                        />
                      </div>

                      <div className="form-group form-full">
                        <label>Special Instructions / Design Preferences</label>
                        <textarea 
                          placeholder="e.g., Both hands up to elbows, portrait bridal design, organic dark stain requirement..."
                          value={bookingForm.notes}
                          onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="booking-actions">
                      <button 
                        type="button" 
                        className="booking-cancel-btn" 
                        onClick={() => setBookingDesigner(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="booking-submit-btn">
                        <SparkleIcon /> <span>Confirm Booking Request</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="booking-confirmed">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                    <CheckCircleIcon />
                  </div>
                  <h3>JazakAllah Khair! Booking Request Received</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5', fontSize: '0.92rem' }}>
                    Your booking request for <strong>{bookingDesigner.name}</strong> on <strong>{bookingForm.eventDate}</strong> has been logged. 
                    {bookingDesigner.name} will contact you via WhatsApp at <strong>{bookingForm.phone}</strong> to discuss pattern selections and slot timing.
                  </p>
                  
                  <div style={{ background: 'var(--bg-primary)', padding: '14px 18px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'left' }}>
                    <div><strong>Client:</strong> {bookingForm.clientName}</div>
                    <div><strong>Function:</strong> {bookingForm.eventType}</div>
                    <div><strong>Estimated Rate:</strong> Starting from ₹{bookingDesigner.startingPrice.toLocaleString()}</div>
                  </div>

                  <button className="btn-primary" onClick={() => setBookingDesigner(null)}>
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Cart Drawer & Backdrop */}
      <div className={`backdrop ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}><CloseIcon /></button>
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <CartIcon />
              </div>
              <p>Your shopping cart is empty.</p>
              <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => setIsCartOpen(false)}>Start Shopping</button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {item.color} {item.size && `• Size: ${item.size}`}
                  </div>
                  <div className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                  
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => updateCartQty(index, -1)}>-</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateCartQty(index, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(index)} title="Remove item"><TrashIcon /></button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="promo-wrapper">
              <input 
                type="text" 
                className="promo-input" 
                placeholder="Promo Code (e.g. EID2026)" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button className="promo-btn" onClick={applyPromo}>Apply</button>
            </div>

            <div className="price-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discountRate > 0 && (
                <div className="summary-row" style={{ color: 'var(--text-gold)' }}>
                  <span>Discount ({(discountRate * 100)}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={() => { setIsCartOpen(false); setCheckoutStep(1); setIsCheckoutOpen(true); }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Modal */}
      <div className={`backdrop ${isWishlistOpen ? 'open' : ''}`} onClick={() => setIsWishlistOpen(false)}></div>
      <div className={`modal ${isWishlistOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Your Saved Items (Wishlist)</h2>
            <button className="close-btn" onClick={() => setIsWishlistOpen(false)}><CloseIcon /></button>
          </div>

          {wishlist.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No items saved yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {productList.filter(p => wishlist.includes(p.id)).map(product => (
                <div key={product.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <img src={product.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1rem' }}>{product.name}</h4>
                    <span style={{ color: 'var(--emerald-primary)', fontWeight: 'bold' }}>₹{product.price.toFixed(2)}</span>
                  </div>
                  <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem' }} onClick={() => { addToCart(product); toggleWishlist(product.id); }}>
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <>
          <div className="backdrop open" onClick={() => setActiveProduct(null)}></div>
          <div className="modal open">
            <div className="modal-content">
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="close-btn" onClick={() => setActiveProduct(null)}><CloseIcon /></button>
              </div>

              <div className="product-detail-grid">
                <img src={activeProduct.image} alt={activeProduct.name} className="product-detail-img" />

                <div>
                  <span className="product-category">{activeProduct.category}</span>
                  <h2 style={{ fontSize: '1.6rem', margin: '8px 0' }}>{activeProduct.name}</h2>
                  <div className="product-price" style={{ margin: '12px 0' }}>
                    <span className="current-price" style={{ fontSize: '1.5rem' }}>₹{activeProduct.price.toFixed(2)}</span>
                    {activeProduct.originalPrice && <span className="original-price">₹{activeProduct.originalPrice.toFixed(2)}</span>}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
                    {activeProduct.description}
                  </p>

                  {/* Colors */}
                  {activeProduct.colors && (
                    <div className="option-group">
                      <div className="option-label">Available Colors / Variants:</div>
                      <div className="option-chips">
                        {activeProduct.colors.map(c => (
                          <button key={c} className={`chip ${selectedColor === c ? 'selected' : ''}`} onClick={() => setSelectedColor(c)}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {activeProduct.sizes && (
                    <div className="option-group">
                      <div className="option-label">Select Size / Pack:</div>
                      <div className="option-chips">
                        {activeProduct.sizes.map(s => (
                          <button key={s} className={`chip ${selectedSize === s ? 'selected' : ''}`} onClick={() => setSelectedSize(s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features List */}
                  <div className="option-group">
                    <div className="option-label">Key Highlights:</div>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      {activeProduct.features.map((f, i) => <li key={i} style={{ marginBottom: '4px' }}>{f}</li>)}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                    <button className="btn-primary" style={{ flex: 1 }} onClick={() => { addToCart(activeProduct, selectedColor, selectedSize, detailQty); setActiveProduct(null); }}>
                      Add to Cart — ₹{(activeProduct.price * detailQty).toFixed(2)}
                    </button>
                  </div>
                </div>
              </div>

              {/* Customer Reviews Section */}
              <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                <h3 style={{ marginBottom: '16px' }}>Customer Reviews & Experience</h3>

                {/* Existing & New Reviews */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong>Fatima K. — Verified Buyer</strong>
                      <StarRating rating={5} />
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      "The cotton shimmer hijab texture is unbelievable! Doesn't slip and the glitter shine is subtle and classy."
                    </p>
                  </div>

                  {(reviews[activeProduct.id] || []).map(r => (
                    <div key={r.id} style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong>{r.author}</strong>
                        <StarRating rating={r.rating} />
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{r.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    className="promo-input" 
                    placeholder="Write your honest review..." 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                  />
                  <button className="promo-btn" onClick={() => addReview(activeProduct.id)}>Submit Review</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Multi-Step Checkout Modal */}
      {isCheckoutOpen && (
        <>
          <div className="backdrop open" onClick={() => setIsCheckoutOpen(false)}></div>
          <div className="modal open" style={{ maxWidth: '600px' }}>
            <div className="modal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2>{checkoutStep === 3 ? 'Order Confirmed!' : 'Checkout & Payment'}</h2>
                <button className="close-btn" onClick={() => setIsCheckoutOpen(false)}><CloseIcon /></button>
              </div>

              {checkoutStep === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep(2); }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-gold)' }}>Step 1: Shipping Address</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    <input 
                      type="text" 
                      className="promo-input" 
                      placeholder="Full Name" 
                      required 
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    />
                    <input 
                      type="email" 
                      className="promo-input" 
                      placeholder="Email Address" 
                      required 
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    />
                    <input 
                      type="text" 
                      className="promo-input" 
                      placeholder="Street Address" 
                      required 
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input 
                        type="text" 
                        className="promo-input" 
                        placeholder="City" 
                        required 
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      />
                      <input 
                        type="text" 
                        className="promo-input" 
                        placeholder="Postal / ZIP Code" 
                        required 
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="checkout-btn" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <span>Continue to Payment</span> <ArrowRightIcon />
                  </button>
                </form>
              )}

              {checkoutStep === 2 && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-gold)' }}>Step 2: Secure Payment Options</h3>

                  <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                    <div className="summary-row"><span>Total Payable:</span><strong>₹{grandTotal.toFixed(2)}</strong></div>
                    <div className="summary-row"><span>Ship To:</span><span>{shippingInfo.fullName}, {shippingInfo.city}</span></div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      <input type="radio" name="pay" defaultChecked /> 
                      <CreditCardIcon /> 
                      <span>Credit / Debit Card (Visa, Mastercard)</span>
                    </label>
                    <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      <input type="radio" name="pay" /> 
                      <CashIcon /> 
                      <span>Cash on Delivery (COD)</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-outline" style={{ flex: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }} onClick={() => setCheckoutStep(1)}>
                      <ArrowLeftIcon /> <span>Back</span>
                    </button>
                    <button className="checkout-btn" style={{ flex: 2, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={handlePlaceOrder}>
                      <span>Complete Purchase</span> <SparkleIcon />
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && lastOrder && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <CheckCircleIcon />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--emerald-primary)', marginBottom: '8px' }}>JazakAllah Khair!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Your order <strong>#{lastOrder.id}</strong> has been successfully placed. We have sent a confirmation email to {lastOrder.shipping.email}.
                  </p>

                  <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', textAlign: 'left', marginBottom: '24px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Order Details:</div>
                    {lastOrder.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '4px' }}>
                        <span>{item.quantity}x {item.name} ({item.color})</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '8px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Total Paid</span>
                      <span>₹{lastOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="btn-primary" onClick={() => setIsCheckoutOpen(false)}>Return to Store</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Toast System */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <SparkleIcon />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <img src="./images/usquare_logo.png" alt="U SQUARE LIFESTYLE Logo" style={{ height: '54px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>U SQUARE LIFESTYLE</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>Modest Elegance & Mehndi Studio</span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              Your destination for handcrafted silk abayas, Malaysian double layer hijabs, organic Rajasthani Mehendi, and certified bridal henna services.
            </p>
          </div>

          <div className="footer-col">
            <h4>Contact Details</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="https://wa.me/918939167359" target="_blank" rel="noopener noreferrer" className="contact-chip-phone" title="Chat on WhatsApp (+91 89391 67359)">
                  <PhoneIcon /> WhatsApp: +91 89391 67359
                </a>
              </li>
              <li>
                <a href="mailto:usquare2106@gmail.com" className="contact-chip-email">
                  <MailIcon /> usquare2106@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Store & Studio Locations</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="https://maps.app.goo.gl/2mKUXnvRUtaecEi79?g_st=aw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <MapPinIcon /> USquare Lifestyle Store <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/xz6Sw91JL3NeuUuA9?g_st=aw" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <MapPinIcon /> U Square Mehndi Artist Studio <ExternalLinkIcon />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Shop Categories</h4>
            <ul>
              <li><a href="#catalog" onClick={() => setSelectedCategory('Cotton Shimmer Hijabs')}>Cotton Shimmer Hijabs</a></li>
              <li><a href="#catalog" onClick={() => setSelectedCategory('Instant Hijabs')}>Instant Hijabs</a></li>
              <li><a href="#catalog" onClick={() => setSelectedCategory('Malaysian Double Layer Hijabs')}>Malaysian Double Layer</a></li>
              <li><a href="#catalog" onClick={() => setSelectedCategory('Partywear Hijabs')}>Partywear Collection</a></li>
              <li><a href="#catalog" onClick={() => setSelectedCategory('Organic Mehendi Cones')}>Organic Mehendi Cones</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 U SQUARE LIFESTYLE. All rights reserved.</span>
          <span>Crafted with Elegance for Modest Fashion Enthusiasts Worldwide</span>
        </div>
      </footer>
    </div>
  );
}

// Render React Application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
