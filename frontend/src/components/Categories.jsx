import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Cake,
  Gem,
  Briefcase,
  Gift,
  Baby,
  Camera,
  UtensilsCrossed,
  Sparkles,
  Palette,
  Building2,
  Music2,
  Search,
  ArrowRight,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import './Categories.css';

const FILTER_TABS = [
  { id: 'all', label: 'All Categories' },
  { id: 'events', label: 'Event Types' },
  { id: 'services', label: 'Vendor Services' },
];

const CATEGORIES = [
  {
    id: 'wedding',
    name: 'Wedding',
    categoryType: 'events',
    typeLabel: 'Event Type',
    Icon: Heart,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    desc: 'Grand palaces, fairytale decor, and timeless bridal experiences.',
    queryName: 'Wedding',
  },
  {
    id: 'birthday',
    name: 'Birthday Party',
    categoryType: 'events',
    typeLabel: 'Event Type',
    Icon: Cake,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    desc: 'Vibrant themes, fun games, and unforgettable celebration vibes.',
    queryName: 'Birthday Party',
  },
  {
    id: 'engagement',
    name: 'Engagement',
    categoryType: 'events',
    typeLabel: 'Event Type',
    Icon: Gem,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    desc: 'Intimate ring ceremonies and elegant celebratory dinners.',
    queryName: 'Engagement',
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    categoryType: 'events',
    typeLabel: 'Event Type',
    Icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    desc: 'Conferences, gala dinners, summits, and executive meetups.',
    queryName: 'Corporate Events',
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    categoryType: 'events',
    typeLabel: 'Event Type',
    Icon: Gift,
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    desc: 'Toast to milestones of togetherness with romantic ambiences.',
    queryName: 'Anniversary',
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    categoryType: 'events',
    typeLabel: 'Event Type',
    Icon: Baby,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    desc: 'Warm blessings, soft pastel themes, and memorable family moments.',
    queryName: 'Baby Shower',
  },
  {
    id: 'photography',
    name: 'Photography',
    categoryType: 'services',
    typeLabel: 'Service',
    Icon: Camera,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    desc: 'Cinematic wedding films, pre-wedding shoots, and candid portraits.',
    queryName: 'Photography',
  },
  {
    id: 'catering',
    name: 'Catering',
    categoryType: 'services',
    typeLabel: 'Service',
    Icon: UtensilsCrossed,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    desc: 'Multi-cuisine banquets, gourmet live counters, and artisanal desserts.',
    queryName: 'Catering',
  },
  {
    id: 'decoration',
    name: 'Decoration',
    categoryType: 'services',
    typeLabel: 'Service',
    Icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    desc: 'Bespoke floral setups, grand mandaps, and dazzling mood lighting.',
    queryName: 'Decoration',
  },
  {
    id: 'makeup',
    name: 'Makeup & Beauty',
    categoryType: 'services',
    typeLabel: 'Service',
    Icon: Palette,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    desc: 'High-definition bridal makeup, hairstyling, and mehendi artists.',
    queryName: 'Makeup & Beauty',
  },
  {
    id: 'venues',
    name: 'Venues & Halls',
    categoryType: 'services',
    typeLabel: 'Service',
    Icon: Building2,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
    desc: 'Lush open lawns, luxurious banquet halls, and heritage properties.',
    queryName: 'Venues & Halls',
  },
  {
    id: 'entertainment',
    name: 'Music & Entertainment',
    categoryType: 'services',
    typeLabel: 'Service',
    Icon: Music2,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    desc: 'Live bands, celebrity DJs, cultural performers, and sound setups.',
    queryName: 'Music & Entertainment',
  },
];

export default function Categories({ onCategorySelect }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      const matchesTab = activeTab === 'all' || cat.categoryType === activeTab;
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        cat.desc.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleSelectCategory = (cat) => {
    if (onCategorySelect) {
      onCategorySelect(cat.queryName);
    }
    const params = new URLSearchParams(window.location.search);
    params.set('category', cat.id);
    navigate(`/?${params.toString()}`, { replace: true });

    const el = document.getElementById('vendors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e, cat) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectCategory(cat);
    }
  };

  return (
    <section
      id="categories"
      aria-label="Find the Perfect Services for Your Event"
      className="cat-section"
    >
      <div className="cat-container">
        
        {/* Header Section */}
        <div className="cat-header">
          <h2 className="cat-title">
            Find the Perfect Services <br />
            <span className="cat-title--accent">for Your Event</span>
          </h2>
        </div>

        {/* Search & Filter Controls */}
        <div className="cat-controls">
          
          {/* Tabs */}
          <div className="cat-tabs" role="tablist" aria-label="Category filter tabs">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`cat-tab-btn ${isActive ? 'cat-tab-btn--active' : ''}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="cat-search-box">
            <Search size={18} className="cat-search-icon" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category or service..."
              aria-label="Search category or service"
              className="cat-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="cat-search-clear"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="cat-cards-grid">
            {filteredCategories.map((cat) => {
              const IconComponent = cat.Icon;
              return (
                <div
                  key={cat.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectCategory(cat)}
                  onKeyDown={(e) => handleKeyDown(e, cat)}
                  aria-label={`Explore vendors for ${cat.name}`}
                  className="cat-item-card group"
                >
                  {/* Card Image Banner */}
                  <div className="cat-img-box">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="cat-img"
                    />
                    <div className="cat-img-overlay" />

                    {/* Floating Circular Icon */}
                    <div className="cat-icon-badge" aria-hidden="true">
                      <IconComponent size={20} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="cat-card-body">
                    <div>
                      <h3 className="cat-card-name">
                        {cat.name}
                      </h3>
                      <p className="cat-card-desc">
                        {cat.desc}
                      </p>
                    </div>

                    {/* Action Link */}
                    <div className="cat-card-action">
                      <span>Explore Vendors</span>
                      <ArrowRight size={15} className="cat-arrow-icon" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="cat-empty-state" role="status" aria-live="polite">
            <div className="cat-empty-icon">
              <SlidersHorizontal size={26} />
            </div>
            <h3 className="cat-empty-title">
              No matching categories found
            </h3>
            <p className="cat-empty-desc">
              We couldn&apos;t find any service matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="cat-empty-btn"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
