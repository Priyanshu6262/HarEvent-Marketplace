import { Star, MapPin, Tag, IndianRupee } from 'lucide-react';
import './VendorCard.css';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="vendor-card__stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < full ? '#f39c12' : 'none'}
          stroke={i < full || (i === full && half) ? '#f39c12' : '#d0ccc5'}
          strokeWidth={1.5}
        />
      ))}
      <span className="vendor-card__rating-num">{rating}</span>
    </div>
  );
}

export default function VendorCard({ vendor, onViewDetails }) {
  const {
    name,
    category,
    city,
    description,
    startingPrice,
    rating,
    reviewCount,
    image,
    tags = [],
  } = vendor;

  const formatPrice = (price) => {
    if (!price) return null;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
    return `₹${price}`;
  };

  return (
    <article className="vendor-card card" aria-label={`Vendor: ${name}`}>
      {/* Image */}
      <div className="vendor-card__img-wrap">
        <img
          src={image}
          alt={`${name} — ${category}`}
          className="vendor-card__img"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=60';
          }}
        />
        <span className="vendor-card__category badge badge-primary">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="vendor-card__body">
        <div className="vendor-card__header">
          <h3 className="vendor-card__name">{name}</h3>
          {startingPrice && (
            <div className="vendor-card__price">
              <span className="vendor-card__price-from">From</span>
              <span className="vendor-card__price-num">{formatPrice(startingPrice)}</span>
            </div>
          )}
        </div>

        <div className="vendor-card__meta">
          <span className="vendor-card__city">
            <MapPin size={13} />
            {city}
          </span>
          <StarRating rating={rating} />
          <span className="vendor-card__reviews">({reviewCount} reviews)</span>
        </div>

        <p className="vendor-card__desc">{description}</p>

        {tags.length > 0 && (
          <div className="vendor-card__tags">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="vendor-card__tag badge badge-accent">
                {tag}
              </span>
            ))}
          </div>
        )}

        <button
          className="btn btn-primary vendor-card__cta"
          onClick={() => onViewDetails && onViewDetails(vendor)}
          aria-label={`View details for ${name}`}
        >
          View Details
        </button>
      </div>
    </article>
  );
}
