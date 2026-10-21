import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import './TopVendors.css';

// Featured top vendors — a curated subset with strong ratings
const TOP_VENDORS = [
  {
    id: '1',
    name: 'Shutter Stories Photography',
    category: 'Wedding Photographers',
    city: 'Delhi',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
  },
  {
    id: '9',
    name: 'Frame Perfect Films',
    category: 'Wedding Photographers',
    city: 'Mumbai',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  },
  {
    id: '5',
    name: 'Glam & Glow Studio',
    category: 'Makeup Artists',
    city: 'Bangalore',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80',
  },
  {
    id: '11',
    name: 'Serenade Events',
    category: 'Event Planners',
    city: 'Delhi',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&q=80',
  },
  {
    id: '2',
    name: 'Celebrations by Priya',
    category: 'Event Planners',
    city: 'Mumbai',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  },
  {
    id: '7',
    name: 'The Lakeside Palace',
    category: 'Wedding Venues',
    city: 'Udaipur',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80',
  },
  {
    id: '10',
    name: 'Mehndi Magic',
    category: 'Makeup Artists',
    city: 'Jaipur',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=400&q=80',
  },
];

export default function TopVendors() {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const CARD_WIDTH = 260 + 16; // card width + gap

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 10);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * CARD_WIDTH * 2, behavior: 'smooth' });
  };

  return (
    <section className="top-vendors section" aria-label="Top Vendors">
      <div className="container">
        <div className="top-vendors__header">
          <div>
            <p className="section-label">Highly Rated</p>
            <h2 className="section-title">Top Vendors</h2>
            <p className="section-subtitle">
              Our highest-rated vendors, trusted by thousands of couples and families across India.
            </p>
          </div>
          <div className="top-vendors__controls">
            <button
              className="top-vendors__btn"
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="top-vendors__btn"
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="top-vendors__scroll"
          ref={scrollRef}
          onScroll={handleScroll}
          role="list"
        >
          {TOP_VENDORS.map((v) => (
            <div key={v.id} className="top-vendor-card" role="listitem">
              <div className="top-vendor-card__img-wrap">
                <img
                  src={v.image}
                  alt={v.name}
                  className="top-vendor-card__img"
                  loading="lazy"
                />
              </div>
              <div className="top-vendor-card__body">
                <p className="top-vendor-card__category">{v.category}</p>
                <h3 className="top-vendor-card__name">{v.name}</h3>
                <div className="top-vendor-card__footer">
                  <span className="top-vendor-card__city">
                    <MapPin size={12} />
                    {v.city}
                  </span>
                  <span className="top-vendor-card__rating">
                    <Star size={12} fill="#f39c12" stroke="#f39c12" />
                    {v.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
