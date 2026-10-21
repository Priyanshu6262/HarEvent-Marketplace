import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__top container">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">🎊</span>
            <div>
              <span className="footer__logo-name">HarEvent</span>
              <span className="footer__logo-llp">LLP</span>
            </div>
          </Link>
          <p className="footer__tagline">
            India's trusted marketplace for event vendors and professionals. Making every celebration unforgettable since 2020.
          </p>
          <div className="footer__socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer__social-link">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social-link">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><a href="/#vendors">Explore Vendors</a></li>
            <li><a href="/#categories">Categories</a></li>
            <li><a href="/#about">About Us</a></li>
            <li><Link to="/login/vendor">List Your Business</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer__col">
          <h4 className="footer__col-title">Categories</h4>
          <ul className="footer__links">
            <li><a href="/#vendors">Wedding Photographers</a></li>
            <li><a href="/#vendors">Event Planners</a></li>
            <li><a href="/#vendors">Decorators</a></li>
            <li><a href="/#vendors">Caterers</a></li>
            <li><a href="/#vendors">Makeup Artists</a></li>
            <li><a href="/#vendors">DJs & Entertainment</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact Us</h4>
          <ul className="footer__contact">
            <li>
              <MapPin size={15} />
              <span>123 Event Street, Connaught Place,<br />New Delhi – 110001</span>
            </li>
            <li>
              <Phone size={15} />
              <a href="tel:+919876543210">+91 98765 43210</a>
            </li>
            <li>
              <Mail size={15} />
              <a href="mailto:hello@harevent.in">hello@harevent.in</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {year} HarEvent LLP. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
