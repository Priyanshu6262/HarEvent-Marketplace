import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './VendorCTA.css';

const BENEFITS = [
  'Free vendor profile listing',
  'Access to thousands of potential clients',
  'Verified badge for trusted vendors',
  'Analytics and inquiry tracking dashboard',
  'Priority placement in search results',
];

export default function VendorCTA() {
  return (
    <section className="vendor-cta section" aria-label="Join as a vendor">
      <div className="container">
        <div className="vendor-cta__inner">
          <div className="vendor-cta__text">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Grow Your Business
            </p>
            <h2 className="section-title" style={{ color: '#fff' }}>
              Are You an Event Vendor?
            </h2>
            <p className="vendor-cta__subtitle">
              Join India's fastest-growing event marketplace and connect with thousands of couples and families
              who are actively looking for your services.
            </p>
            <ul className="vendor-cta__benefits">
              {BENEFITS.map((b) => (
                <li key={b} className="vendor-cta__benefit">
                  <CheckCircle size={16} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="vendor-cta__actions">
              <Link to="/login/vendor" className="btn vendor-cta__btn-main">
                Register as Vendor
                <ArrowRight size={16} />
              </Link>
              <a href="#about" className="btn vendor-cta__btn-ghost">
                Learn More
              </a>
            </div>
          </div>
          <div className="vendor-cta__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80"
              alt="Vendor setting up an event"
              className="vendor-cta__img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
