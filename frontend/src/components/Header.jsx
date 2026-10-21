import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import './Header.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore Vendors', href: '/#vendors' },
  { label: 'Categories', href: '/#categories' },
  { label: 'About Us', href: '/#about' },
];

export default function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchValue.trim());
    // Navigate to home and scroll to vendors
    navigate('/#vendors');
  };

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href.includes('#')) {
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container">
        {/* Logo */}
        <Link to="/" className="header__logo" aria-label="HarEvent Home">
          <span className="header__logo-icon">🎊</span>
          <div className="header__logo-text">
            <span className="header__logo-brand">HarEvent</span>
            <span className="header__logo-tagline">LLP</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="header__nav-link"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <form className="header__search" onSubmit={handleSearch} role="search">
          <div className="header__search-wrap">
            <Search size={15} className="header__search-icon" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search vendors…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="header__search-input"
              aria-label="Search vendors"
            />
          </div>
        </form>

        {/* Auth Buttons */}
        <div className="header__actions">
          <Link to="/login/customer" className="btn btn-outline btn-sm">
            Customer Login
          </Link>
          <Link to="/login/vendor" className="btn btn-primary btn-sm">
            Vendor Login
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="header__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu${menuOpen ? ' header__mobile-menu--open' : ''}`}>
        <nav className="header__mobile-nav">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="header__mobile-link"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <form className="header__mobile-search" onSubmit={handleSearch}>
          <div className="header__search-wrap">
            <Search size={15} className="header__search-icon" />
            <input
              type="text"
              placeholder="Search vendors…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="header__search-input"
              aria-label="Search vendors"
            />
          </div>
        </form>
        <div className="header__mobile-actions">
          <Link
            to="/login/customer"
            className="btn btn-outline"
            onClick={() => setMenuOpen(false)}
          >
            Customer Login
          </Link>
          <Link
            to="/login/vendor"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Vendor Login
          </Link>
        </div>
      </div>
    </header>
  );
}
