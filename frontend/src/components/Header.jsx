import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Event Planner', href: '/#planner' },
  { label: 'Event Category', href: '/#categories' },
  { label: 'Venues', href: '/#venues' },
  { label: 'About Us', href: '/#about' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href.includes('#')) {
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.hash === href.split('#')[1]
      ? true
      : false;
  };

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} role="banner">
      <div className="header__inner container">
        {/* Logo */}
        <Link to="/" className="header__logo" aria-label="HarEvent — go to homepage">
          <img
            src="/assets/HarEvent Logo.png"
            alt="HarEvent"
            className="header__logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <span className="header__logo-fallback" aria-hidden="true">
            <span className="header__logo-brand">Har<span className="header__logo-brand--accent">Event</span></span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`header__nav-link${link.href === '/' && location.pathname === '/' && !location.hash ? ' header__nav-link--active' : ''}`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Profile Icon */}
        <button
          className="header__profile"
          aria-label="User profile"
          type="button"
        >
          <User size={20} aria-hidden="true" />
        </button>

        {/* Hamburger (mobile) */}
        <button
          className="header__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`header__mobile${menuOpen ? ' header__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="header__mobile-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="header__mobile-link"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__mobile-footer">
          <button className="header__mobile-profile" type="button" aria-label="User profile">
            <User size={18} aria-hidden="true" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
