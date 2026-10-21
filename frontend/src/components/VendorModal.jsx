import { X, MapPin, Star, Phone, Mail, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import './VendorModal.css';

export default function VendorModal({ vendor, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!vendor) return null;

  const { name, category, city, description, startingPrice, rating, reviewCount, image, tags, experience } = vendor;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${name}`}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-img-wrap">
          <img src={image} alt={name} className="modal-img" />
          <span className="modal-category badge badge-primary">{category}</span>
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <div>
              <h2 className="modal-name">{name}</h2>
              <div className="modal-meta">
                <span className="modal-city">
                  <MapPin size={14} />
                  {city}
                </span>
                {experience && <span className="modal-exp">{experience} experience</span>}
              </div>
            </div>
            {startingPrice && (
              <div className="modal-price">
                <span className="modal-price-from">Starting from</span>
                <span className="modal-price-num">
                  ₹{startingPrice.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>

          <div className="modal-rating">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(rating) ? '#f39c12' : 'none'}
                stroke={i < Math.floor(rating) ? '#f39c12' : '#d0ccc5'}
                strokeWidth={1.5}
              />
            ))}
            <span className="modal-rating-text">{rating} ({reviewCount} reviews)</span>
          </div>

          <p className="modal-desc">{description}</p>

          {tags && tags.length > 0 && (
            <div className="modal-tags">
              <h4 className="modal-tags-title">Specialisations</h4>
              <div className="modal-tags-list">
                {tags.map((t) => (
                  <span key={t} className="badge badge-accent">{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-note">
            <p>
              <strong>📋 Demo Note:</strong> Contact details and booking are not available in this demo. 
              This is sample data for HarEvent LLP's intern assignment.
            </p>
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={onClose}>
              Browse More Vendors
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
