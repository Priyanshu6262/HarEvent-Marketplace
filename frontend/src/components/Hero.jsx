import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import './Hero.css';

const BG_IMAGES = [
  '/assets/harevent_hero_bg_1.png',
  '/assets/harevent_hero_bg_2.png',
  '/assets/harevent_hero_bg_3.png',
  '/assets/harevent_hero_bg_4.png',
  '/assets/harevent_hero_bg_5.png',
];
const SLIDE_INTERVAL = 6000; // ms

export default function Hero({ onSearch }) {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const serviceRef = useRef(null);

  // ---- Slideshow state ----
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIdx((curr) => {
        const next = (curr + 1) % BG_IMAGES.length;
        setPrevIdx(curr);
        setFading(true);
        return next;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, []);

  // Clear the "prev" layer once the fade animation finishes
  const handleFadeEnd = () => {
    setPrevIdx(null);
    setFading(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!service.trim()) newErrors.service = 'Please enter a service you need.';
    if (!location.trim()) newErrors.location = 'Please enter your location.';
    return newErrors;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus first error field
      if (errs.service) serviceRef.current?.focus();
      return;
    }
    setErrors({});
    const query = { service: service.trim(), location: location.trim() };
    setSubmitted(query);
    if (onSearch) onSearch(query);

    // Scroll to vendor section if present
    const el = document.getElementById('vendors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="hero"
      aria-label="Hero — discover event vendors"
    >
      {/* Background slideshow */}
      <div className="hero__bg" aria-hidden="true">
        {/* Previous image — fades out */}
        {prevIdx !== null && (
          <img
            key={`prev-${prevIdx}`}
            src={BG_IMAGES[prevIdx]}
            alt=""
            className="hero__bg-img hero__bg-img--prev"
            draggable="false"
            onAnimationEnd={handleFadeEnd}
          />
        )}
        {/* Active image — fades in */}
        <img
          key={`active-${activeIdx}`}
          src={BG_IMAGES[activeIdx]}
          alt=""
          className={`hero__bg-img hero__bg-img--active${fading ? ' hero__bg-img--fade-in' : ''}`}
          loading="eager"
          draggable="false"
          onError={(e) => {
            // Graceful fallback to a warm cream bg if image not found
            e.target.style.display = 'none';
            e.target.parentElement.classList.add('hero__bg--fallback');
          }}
        />
      </div>

      {/* Content — left cream column */}
      <div className="hero__content container">
        <div className="hero__left">
          {/* Badge */}
          <span className="hero__badge" role="text">
            All Event Services in One Place
          </span>

          {/* Headline */}
          <h1 className="hero__title">
            Make Your<br />
            <span className="hero__title--pink">Special Moments</span><br />
            Happen{' '}
            <span className="hero__title--orange">Easily</span>
          </h1>

          {/* Description */}
          <p className="hero__desc">
            Discover and connect with trusted event vendors for weddings,
            birthdays, parties, and special occasions — all in one place.
          </p>

          {/* Search Bar */}
          <form
            className="hero__search"
            onSubmit={handleSearch}
            noValidate
            role="search"
            aria-label="Search for event vendors"
          >
            {/* Service Input */}
            <div className={`hero__search-field${errors.service ? ' hero__search-field--error' : ''}`}>
              <Search
                size={16}
                className="hero__search-field-icon"
                aria-hidden="true"
              />
              <input
                ref={serviceRef}
                id="hero-service"
                type="text"
                className="hero__search-input"
                placeholder="What service do you need?"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  if (errors.service) setErrors((prev) => ({ ...prev, service: '' }));
                }}
                aria-label="What service do you need?"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? 'service-error' : undefined}
              />
            </div>

            {/* Location Input */}
            <div className={`hero__search-field${errors.location ? ' hero__search-field--error' : ''}`}>
              <MapPin
                size={16}
                className="hero__search-field-icon hero__search-field-icon--pin"
                aria-hidden="true"
              />
              <input
                id="hero-location"
                type="text"
                className="hero__search-input"
                placeholder="Your Location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                }}
                aria-label="Your location"
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? 'location-error' : undefined}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="hero__search-btn"
              aria-label="Search vendors"
            >
              Search Vendors
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            {/* Validation Messages */}
            {(errors.service || errors.location) && (
              <div className="hero__search-errors" role="alert" aria-live="polite">
                {errors.service && (
                  <p id="service-error" className="hero__search-error">
                    {errors.service}
                  </p>
                )}
                {errors.location && (
                  <p id="location-error" className="hero__search-error">
                    {errors.location}
                  </p>
                )}
              </div>
            )}
          </form>

          {/* Confirmation after successful search */}
          {submitted && !errors.service && !errors.location && (
            <p className="hero__search-result" role="status" aria-live="polite">
              Searching for <strong>{submitted.service}</strong> in{' '}
              <strong>{submitted.location}</strong>…
            </p>
          )}
        </div>

        {/* Right side is the image — handled by background; spacer for layout */}
        <div className="hero__right" aria-hidden="true" />
      </div>
    </section>
  );
}
