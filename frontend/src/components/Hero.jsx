import { useState } from 'react';
import { Search, MapPin, Layers, X } from 'lucide-react';
import './Hero.css';

const EVENT_TYPES = [
  '', 'Wedding', 'Engagement', 'Birthday', 'Corporate', 'Anniversary', 'Sangeet', 'Reception',
];

const CITIES = [
  '', 'Delhi', 'Mumbai', 'Bangalore', 'Jaipur', 'Hyderabad', 'Pune', 'Chennai', 'Udaipur',
];

const CATEGORIES = [
  '', 'Wedding Photographers', 'Event Planners', 'Decorators', 'Caterers',
  'Makeup Artists', 'DJs and Entertainment', 'Wedding Venues', 'Florists',
];

export default function Hero({ onSearch }) {
  const [vendor, setVendor] = useState('');
  const [event, setEvent] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const hasFilters = vendor || event || city || category;

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ search: vendor.trim(), city: city, category: category });
    const el = document.getElementById('vendors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClear = () => {
    setVendor('');
    setEvent('');
    setCity('');
    setCategory('');
    onSearch({});
  };

  return (
    <section className="hero" aria-label="Hero section">
      {/* Background overlay */}
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80"
          alt="Elegant wedding celebration with floral decorations"
          className="hero__bg-img"
          loading="eager"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        {/* Headline */}
        <div className="hero__text">
          <span className="hero__label">India's Trusted Event Marketplace</span>
          <h1 className="hero__title heading-display">
            Find the Perfect Vendors <br />
            for <span className="hero__title-accent">Every Celebration</span>
          </h1>
          <p className="hero__subtitle">
            Discover photographers, planners, decorators, caterers, and more — all
            in one place. Trusted by thousands of happy couples across India.
          </p>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">500+</span>
              <span className="hero__stat-label">Verified Vendors</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">50+</span>
              <span className="hero__stat-label">Cities Covered</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">10K+</span>
              <span className="hero__stat-label">Happy Clients</span>
            </div>
          </div>
        </div>

        {/* Search Panel */}
        <form className="hero__search-panel" onSubmit={handleSearch} role="search">
          <h2 className="hero__search-title">Search Vendors</h2>
          <div className="hero__search-grid">
            {/* Vendor Name */}
            <div className="hero__field">
              <label className="hero__field-label" htmlFor="hero-vendor">
                <Search size={14} />
                Vendor Name
              </label>
              <input
                id="hero-vendor"
                type="text"
                className="input"
                placeholder="e.g. Royal Decors"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="hero__field">
              <label className="hero__field-label" htmlFor="hero-category">
                <Layers size={14} />
                Category
              </label>
              <select
                id="hero-category"
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c || 'All Categories'}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="hero__field">
              <label className="hero__field-label" htmlFor="hero-city">
                <MapPin size={14} />
                City
              </label>
              <select
                id="hero-city"
                className="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c || 'All Cities'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hero__search-actions">
            <button type="submit" className="btn btn-primary btn-lg hero__search-btn">
              <Search size={18} />
              Search Vendors
            </button>
            {hasFilters && (
              <button
                type="button"
                className="btn btn-ghost hero__clear-btn"
                onClick={handleClear}
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
