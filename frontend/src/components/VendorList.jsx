import { useState } from 'react';
import VendorCard from './VendorCard';
import VendorModal from './VendorModal';
import './VendorList.css';

export default function VendorList({ vendors, total, loading, error, hasActiveFilters, onClearFilters }) {
  const [selectedVendor, setSelectedVendor] = useState(null);

  if (loading) {
    return (
      <div className="vendor-list__state">
        <div className="spinner" />
        <p className="vendor-list__state-text">Loading vendors…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vendor-list__state vendor-list__state--error">
        <span className="vendor-list__state-icon">⚠️</span>
        <p className="vendor-list__state-title">Unable to load vendors</p>
        <p className="vendor-list__state-text">{error}</p>
        <p className="vendor-list__state-hint">
          Make sure the backend is running at <code>http://localhost:5000</code>
        </p>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="vendor-list__state">
        <span className="vendor-list__state-icon">🔍</span>
        <p className="vendor-list__state-title">No vendors found</p>
        <p className="vendor-list__state-text">
          Try adjusting your search or filters.
        </p>
        {hasActiveFilters && (
          <button className="btn btn-outline" onClick={onClearFilters}>
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="vendor-list">
      <div className="vendor-list__count">
        Showing <strong>{vendors.length}</strong> of <strong>{total}</strong> vendors
        {hasActiveFilters && (
          <button className="vendor-list__clear-btn" onClick={onClearFilters}>
            × Clear filters
          </button>
        )}
      </div>
      <div className="vendor-list__grid">
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onViewDetails={setSelectedVendor}
          />
        ))}
      </div>

      {selectedVendor && (
        <VendorModal
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
        />
      )}
    </div>
  );
}
