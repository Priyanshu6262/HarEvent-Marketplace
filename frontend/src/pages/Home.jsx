import { useCallback } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import VendorList from '../components/VendorList';
import TopVendors from '../components/TopVendors';
import HowItWorks from '../components/HowItWorks';
import VendorCTA from '../components/VendorCTA';
import useVendors from '../hooks/useVendors';
import './Home.css';

export default function Home() {
  const { vendors, total, loading, error, filters, applyFilters, clearFilters } = useVendors({});

  const hasActiveFilters = !!(filters.search || filters.category || filters.city);

  const handleHeroSearch = useCallback(
    (newFilters) => {
      // Map hero search shape { service, location } → vendor filters { search, city }
      applyFilters({
        search: newFilters.service || '',
        city: newFilters.location || '',
      });
    },
    [applyFilters]
  );

  const handleCategorySelect = useCallback(
    (categoryName) => {
      applyFilters({ category: categoryName });
      const el = document.getElementById('vendors');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    [applyFilters]
  );

  return (
    <main>
      <Hero onSearch={handleHeroSearch} />
      <Categories onCategorySelect={handleCategorySelect} />
      <TopVendors />

      {/* Vendor Listing Section */}
      <section className="vendors-section section" id="vendors" aria-label="Vendor listings">
        <div className="container">
          <div className="vendors-section__head">
            <div>
              <p className="section-label">Discover</p>
              <h2 className="section-title">
                {hasActiveFilters ? 'Search Results' : 'All Vendors'}
              </h2>
              {!hasActiveFilters && (
                <p className="section-subtitle">
                  Explore our curated network of verified event professionals across India.
                </p>
              )}
            </div>
            {hasActiveFilters && (
              <button className="btn btn-outline" onClick={clearFilters}>
                View All Vendors
              </button>
            )}
          </div>
          <VendorList
            vendors={vendors}
            total={total}
            loading={loading}
            error={error}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        </div>
      </section>

      <HowItWorks />
      <VendorCTA />
    </main>
  );
}
