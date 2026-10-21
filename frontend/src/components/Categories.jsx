import './Categories.css';

const CATEGORIES = [
  { name: 'Wedding Photographers', emoji: '📷', count: 80, color: '#c0392b' },
  { name: 'Event Planners', emoji: '📋', count: 65, color: '#8e44ad' },
  { name: 'Decorators', emoji: '🌸', count: 90, color: '#e67e22' },
  { name: 'Caterers', emoji: '🍽️', count: 120, color: '#27ae60' },
  { name: 'Makeup Artists', emoji: '💄', count: 75, color: '#e91e8c' },
  { name: 'DJs & Entertainment', emoji: '🎵', count: 55, color: '#2980b9' },
  { name: 'Wedding Venues', emoji: '🏛️', count: 40, color: '#f39c12' },
  { name: 'Florists', emoji: '💐', count: 35, color: '#16a085' },
];

export default function Categories({ onCategorySelect }) {
  return (
    <section className="categories section" id="categories" aria-label="Browse by category">
      <div className="container">
        <div className="categories__head">
          <p className="section-label">Browse By</p>
          <h2 className="section-title">Popular Categories</h2>
          <p className="section-subtitle">
            Find the exact kind of vendor you need — browse by category to discover the best professionals for your event.
          </p>
        </div>

        <div className="categories__grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className="category-card"
              onClick={() => onCategorySelect && onCategorySelect(cat.name)}
              style={{ '--cat-color': cat.color }}
              aria-label={`Browse ${cat.name}`}
            >
              <span className="category-card__emoji">{cat.emoji}</span>
              <span className="category-card__name">{cat.name}</span>
              <span className="category-card__count">{cat.count}+ vendors</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
