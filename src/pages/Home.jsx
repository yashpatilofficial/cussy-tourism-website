import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

// SVG Icons (Simplified for inline usage)
const ChevronRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [wishlist, setWishlist] = useState({});
  const [imageError, setImageError] = useState(false);

  // Slides data
  const slides = [
    { src: '/images/hero-tajmahal.png', alt: 'Taj Mahal at sunrise' },
    { src: '/images/destination-kashmir.png', alt: 'Kashmir\'s Dal Lake' },
    { src: '/images/hero-adventure.png', alt: 'Mountain trekking adventure' },
  ];

  const [packages, setPackages] = useState([
    { id: 'kashmir', category: 'india', img: '/images/destination-kashmir.png', dest: 'India · Kashmir', title: 'Magical Kashmir — Srinagar, Gulmarg & Pahalgam', duration: '5 Nights / 6 Days', type: 'Group Tour', price: '₹32,999', badge: 'Bestseller' },
    { id: 'kerala', category: 'india honeymoon', img: '/images/destination-kerala.png', dest: 'India · Kerala', title: 'Wonders of Kerala — Munnar, Alleppey & Cochin', duration: '4 Nights / 5 Days', type: 'Family Tour', price: '₹24,999', badge: 'Popular' },
    { id: 'europe', category: 'international honeymoon', img: '/images/destination-europe.png', dest: 'International · Europe', title: 'Best of Europe — Paris, Swiss Alps & Santorini', duration: '10 Nights / 11 Days', type: 'All Inclusive', price: '₹1,49,999', badge: 'Premium' },
    { id: 'rajasthan', category: 'india family', img: '/images/destination-rajasthan.png', dest: 'India · Rajasthan', title: 'Royal Rajasthan — Jaipur, Udaipur & Jaisalmer', duration: '6 Nights / 7 Days', type: 'Family Tour', price: '₹28,999', badge: 'Royal' },
    { id: 'dubai', category: 'international', img: '/images/destination-dubai.png', dest: 'International · Dubai', title: 'Dazzling Dubai — Burj Khalifa, Safari & Marina', duration: '5 Nights / 6 Days', type: 'Group Tour', price: '₹59,999', badge: 'Luxury' },
    { id: 'ladakh', category: 'india adventure', img: '/images/destination-ladakh.png', dest: 'India · Ladakh', title: 'Ladakh Explorer — Pangong, Nubra & Khardungla', duration: '7 Nights / 8 Days', type: 'Adventure Tour', price: '₹35,999', badge: 'Adventure' },
  ]);

  // Fetch dynamic packages from Cloudflare D1
  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPackages(data);
        }
      })
      .catch(err => console.log('Running in static mode: D1 API not reachable yet.'));
  }, []);

  // Auto-slide hero
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Scroll effects & reveal animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
    window.addEventListener('scroll', handleScroll);
    
    // Stats counter logic
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-item h3');
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const updateCount = () => {
              const current = +counter.innerText.replace(/,/g, '');
              const increment = target / 50;
              if (current < target) {
                counter.innerText = Math.ceil(current + increment).toLocaleString();
                setTimeout(updateCount, 40);
              } else {
                counter.innerText = target.toLocaleString() + '+';
              }
            };
            if (counter.innerText === '0') updateCount();
          });
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('#stats');
    if (statsSection) statObserver.observe(statsSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      statObserver.disconnect();
    };
  }, []);

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing! We'll send you our best deals soon.");
    e.target.reset();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="nav-logo-link">
            {!imageError && (
              <img 
                src="/images/logo.png" 
                alt="Cussy Tourism Logo" 
                className="nav-logo-img"
                onError={() => setImageError(true)} 
              />
            )}
            {imageError && (
              <div className="fallback-logo">
                <div className="brand-icon">CT</div>
                Cussy<span>Tourism</span>
              </div>
            )}
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a>
            <a href="#packages" onClick={() => setMenuOpen(false)}>Packages</a>
            <a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Book Now ✈</a>
          </div>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-slider">
          {slides.map((slide, idx) => (
            <div key={idx} className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}>
              <img src={slide.src} alt={slide.alt} loading={idx === 0 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>India's Most Trusted Tour Company
          </div>
          <h1>Discover the<br/>World's Most<br/><em>Beautiful Places</em></h1>
          <p className="hero-desc">
            From the majestic Himalayas to pristine beaches, from royal palaces to exotic
            international getaways — your dream vacation starts here.
          </p>
          <div className="hero-actions">
            <a href="#packages" className="btn btn-primary">Explore Packages <ChevronRight /></a>
            <a href="#destinations" className="btn btn-outline">Top Destinations</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><h3>50,000+</h3><p>Happy Travellers</p></div>
            <div className="hero-stat"><h3>500+</h3><p>Tour Packages</p></div>
            <div className="hero-stat"><h3>120+</h3><p>Destinations</p></div>
            <div className="hero-stat"><h3>4.9★</h3><p>Average Rating</p></div>
          </div>
        </div>
        <div className="hero-dots">
          {slides.map((_, idx) => (
            <button key={idx} className={`hero-dot ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)} aria-label={`Slide ${idx + 1}`}></button>
          ))}
        </div>
      </section>

      {/* DESTINATIONS (Static grid for performance) */}
      <section className="destinations" id="destinations">
        <div className="container">
          <div className="destinations-header reveal">
            <div>
              <span className="section-label">Top Destinations</span>
              <h2 className="section-title">Explore Popular <span className="text-gradient">Destinations</span></h2>
              <p className="section-subtitle">Handpicked destinations that our travellers love the most. From serene backwaters to rugged mountain passes.</p>
            </div>
            <a href="#packages" className="btn btn-outline" style={{borderColor: 'var(--clr-border)', color: 'var(--clr-text-muted)'}}>
              View All <ChevronRight />
            </a>
          </div>
          <div className="destinations-grid reveal">
            {[
              { id: 'kashmir', name: 'Kashmir', img: '/images/destination-kashmir.png', tag: '🔥 Trending', loc: 'India', rating: '4.9', duration: '5N/6D', price: '₹32,999' },
              { id: 'kerala', name: 'Kerala', img: '/images/destination-kerala.png', tag: '🌴 Bestseller', loc: 'India', rating: '4.8', duration: '4N/5D', price: '₹24,999' },
              { id: 'europe', name: 'Europe', img: '/images/destination-europe.png', tag: '✨ Premium', loc: 'International', rating: '4.9', duration: '10N/11D', price: '₹1,49,999' },
              { id: 'rajasthan', name: 'Rajasthan', img: '/images/destination-rajasthan.png', tag: '👑 Royal', loc: 'India', rating: '4.7', duration: '6N/7D', price: '₹28,999' },
              { id: 'ladakh', name: 'Ladakh', img: '/images/destination-ladakh.png', tag: '🏔 Adventure', loc: 'India', rating: '4.8', duration: '7N/8D', price: '₹35,999' }
            ].map((d) => (
              <div className="destination-card" key={d.id}>
                <img src={d.img} alt={d.name} loading="lazy" />
                <div className="card-overlay">
                  <span className="card-tag">{d.tag}</span>
                  <h3>{d.name}</h3>
                  <div className="card-meta"><span>📍 {d.loc}</span><span>⭐ {d.rating}</span><span>🗓 {d.duration}</span></div>
                </div>
                <div className="card-price">From <strong>{d.price}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="container">
          <div className="features-header reveal">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">All-Inclusive <span className="text-gradient">Tour Packages</span></h2>
            <p className="section-subtitle">We take care of every detail so you can focus on creating memories that last a lifetime.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '🏨', title: 'Premium Accommodation', desc: 'Hand-selected 3 to 5-star hotels and heritage stays curated for comfort and convenience.' },
              { icon: '🍽', title: 'All Meals Included', desc: 'Enjoy authentic local cuisine with breakfast, lunch, and dinner included on every tour day.' },
              { icon: '🚐', title: 'Seamless Transport', desc: 'Comfortable AC coaches, flights, and ferries — all transport is included in your package.' },
              { icon: '👨‍✈️', title: 'Expert Tour Managers', desc: 'Our 200+ experienced tour managers specialise in India and international destinations.' },
              { icon: '💎', title: 'Best Value Itinerary', desc: 'Our dedicated research team curates the best value-for-money itineraries for every destination.' },
              { icon: '✈️', title: 'Airfare Included', desc: 'Round-trip airfare from major Indian cities is included in most of our tour packages.' }
            ].map((f, i) => (
              <div className="feature-card reveal" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages" id="packages">
        <div className="container">
          <div className="packages-header reveal">
            <span className="section-label">Featured Packages</span>
            <h2 className="section-title">Popular <span className="text-gradient">Tour Packages</span></h2>
            <p className="section-subtitle">Carefully crafted journeys that balance adventure, culture, relaxation, and value.</p>
          </div>
          
          <div className="package-tabs reveal">
            {['all', 'india', 'international', 'honeymoon', 'adventure', 'family'].map(tab => (
              <button 
                key={tab} 
                className={`package-tab ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="packages-grid">
            {packages.filter(p => activeFilter === 'all' || p.category.includes(activeFilter)).map(pkg => (
              <div className="package-card reveal" key={pkg.id}>
                <div className="package-card-image">
                  <img src={pkg.img} alt={pkg.title} loading="lazy" />
                  <span className="package-badge">{pkg.badge}</span>
                  <button 
                    className={`package-wishlist ${wishlist[pkg.id] ? 'active' : ''}`}
                    onClick={(e) => toggleWishlist(e, pkg.id)}
                    aria-label="Toggle wishlist"
                  >
                    {wishlist[pkg.id] ? '♥' : '♡'}
                  </button>
                </div>
                <div className="package-card-body">
                  <p className="package-dest">{pkg.dest}</p>
                  <h3>{pkg.title}</h3>
                  <div className="package-info">
                    <span>🗓 {pkg.duration}</span>
                    <span>👥 {pkg.tour_type || pkg.type}</span>
                  </div>
                  <div className="package-card-footer">
                    <div className="package-price">
                      <span className="from">Starting from</span>
                      <span className="amount">{pkg.price}</span>
                      <span className="per">per person</span>
                    </div>
                    <Link to={`/package/${pkg.id}`} className="btn-book">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="experiences" id="experiences">
        <div className="container">
          <div className="experiences-header reveal">
            <span className="section-label">Themed Experiences</span>
            <h2 className="section-title">Find Your <span className="text-gradient">Perfect Getaway</span></h2>
            <p className="section-subtitle">Specialised tours designed for every occasion, interest, and travel style.</p>
          </div>
          <div className="experiences-grid reveal">
            {[
              { img: '/images/destination-goa.png', icon: '💑', title: 'Honeymoon Special', desc: 'Romantic getaways for newlyweds' },
              { img: '/images/destination-kerala.png', icon: '👨‍👩‍👧‍👦', title: 'Family Tours', desc: 'Kid-friendly adventures for all ages' },
              { img: '/images/hero-adventure.png', icon: '🏔', title: 'Adventure Tours', desc: 'Thrilling treks and extreme sports' },
              { img: '/images/destination-dubai.png', icon: '👑', title: 'Luxury Holidays', desc: 'Premium 5-star travel experiences' },
            ].map((exp, i) => (
              <div className="experience-card" key={i}>
                <img src={exp.img} alt={exp.title} loading="lazy" />
                <div className="exp-overlay">
                  <span className="exp-icon">{exp.icon}</span>
                  <h3>{exp.title}</h3>
                  <p>{exp.desc}</p>
                </div>
                <div className="exp-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats" id="stats">
        <div className="container">
          <div className="stats-inner reveal">
            <div className="stat-item"><h3 data-count="50000">0</h3><p>Happy Travellers</p></div>
            <div className="stat-item"><h3 data-count="15000">0</h3><p>Tours Completed</p></div>
            <div className="stat-item"><h3 data-count="200">0</h3><p>Expert Tour Guides</p></div>
            <div className="stat-item"><h3 data-count="120">0</h3><p>Destinations Worldwide</p></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="testimonials-header reveal">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our <span className="text-gradient">Guests Say</span></h2>
            <p className="section-subtitle">Real experiences from real travellers who chose Cussy Tourism.</p>
          </div>
          <div className="testimonials-track reveal">
            {[
              { initial: 'PK', name: 'Priya Kulkarni', tour: 'Kashmir Tour · Dec 2025', quote: '"Our Kashmir trip was absolutely magical! The hotels were amazing, the food was delicious, and our tour manager Rajesh made everything so smooth. Can\'t wait to book our next trip with Cussy Tourism!"' },
              { initial: 'AM', name: 'Amitabh Mehta', tour: 'Europe Tour · Oct 2025', quote: '"Best Europe trip ever! The itinerary was perfectly planned — we got to see all the iconic spots without feeling rushed. The all-inclusive package was great value for money. Highly recommended!"' },
              { initial: 'SJ', name: 'Sneha Joshi', tour: 'Kerala Family Tour · Jan 2026', quote: '"We took the Kerala family package and it was perfect for our kids and parents alike. The houseboat experience was a highlight. Thank you Cussy Tourism for an unforgettable vacation!"' }
            ].map((t, i) => (
              <div className="testimonial-card" key={i}>
                <span className="quote-mark">"</span>
                <div className="testimonial-stars">★ ★ ★ ★ ★</div>
                <blockquote>{t.quote}</blockquote>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initial}</div>
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <p>{t.tour}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / NEWSLETTER */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-inner reveal">
            <img src="/images/destination-bali.png" alt="Beautiful Bali landscape" loading="lazy" />
            <h2>Ready for Your Next <span className="text-gradient">Adventure?</span></h2>
            <p>Subscribe to our newsletter and get exclusive deals, early access to new tours, and travel tips straight to your inbox.</p>
            <form className="cta-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <div className="footer-brand">
                <div className="brand-icon">CT</div>
                Cussy Tourism
              </div>
              <p>Cussy Tourism Pvt. Ltd is one of India's leading travel companies offering all-inclusive tour packages to destinations across India and the world. We believe travel should be joyful, stress-free, and accessible to everyone.</p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="Twitter/X">🐦</a>
                <a href="#" aria-label="YouTube">📺</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Destinations</h4>
              <ul>
                <li><a href="#">Kashmir</a></li><li><a href="#">Kerala</a></li><li><a href="#">Rajasthan</a></li>
                <li><a href="#">Ladakh</a></li><li><a href="#">Goa</a></li><li><a href="#">North East</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>International</h4>
              <ul>
                <li><a href="#">Europe</a></li><li><a href="#">Dubai</a></li><li><a href="#">Bali</a></li>
                <li><a href="#">Thailand</a></li><li><a href="#">Singapore</a></li><li><a href="#">Maldives</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li><a href="tel:18001234567">📞 1800-123-4567</a></li>
                <li><a href="mailto:info@cussytourism.com">✉ info@cussytourism.com</a></li>
                <li><a href="#">📍 Mumbai, Maharashtra</a></li>
                <li><a href="#">🕐 Mon–Sat, 10AM – 7PM</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Cussy Tourism Pvt. Ltd. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button 
        className={`back-to-top ${scrolled ? 'visible' : ''}`} 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
};

export default Home;
