import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

function PackageDetail() {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  
  // Later we'll fetch actual package details from Cloudflare API
  // For now, this is a beautiful placeholder.
  
  return (
    <div style={{ backgroundColor: 'var(--clr-bg)' }}>
      {/* Basic Navbar for Details Page */}
      <nav className="navbar scrolled">
        <div className="container" style={{ paddingInline: '30px' }}>
          <Link to="/" className="nav-logo-link">
            {!imageError && (
              <img 
                src="/images/logo.png" 
                alt="Cussy Tourism Logo" 
                className="nav-logo-img"
                style={{ filter: 'none' }}
                onError={() => setImageError(true)} 
              />
            )}
            {imageError && (
              <div className="fallback-logo" style={{ color: 'var(--clr-primary)' }}>
                <div className="brand-icon">CT</div>
                Cussy<span>Tourism</span>
              </div>
            )}
          </Link>
          <div className="nav-links">
            <Link to="/" style={{ color: 'var(--clr-text-muted)' }}>Back to Home</Link>
          </div>
        </div>
      </nav>

      {/* Hero / Detail Content Placeholder */}
      <div style={{ padding: '150px 20px 80px', minHeight: '100vh', textAlign: 'center', backgroundColor: 'var(--clr-bg-secondary)' }}>
        <h1 className="section-title">Exploring {id.charAt(0).toUpperCase() + id.slice(1)}</h1>
        <p className="section-subtitle" style={{ margin: '0 auto', marginBottom: '2rem' }}>
          We are currently building this detailed itinerary page. Soon, it will feature pricing, day-by-day plans, and booking integrations directly via our Cloudflare D1 Database!
        </p>
        <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
           Return to Destinations
        </Link>
      </div>
    </div>
  );
}

export default PackageDetail;
