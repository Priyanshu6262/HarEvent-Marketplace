import { useState, useEffect, useCallback } from 'react';
import { fetchVendors } from '../services/vendorService';

/**
 * Custom hook for fetching and filtering vendors from the API.
 * @param {{ search?: string, category?: string, city?: string }} initialFilters
 */
const useVendors = (initialFilters = {}) => {
  const [vendors, setVendors] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const loadVendors = useCallback(async (activeFilters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchVendors(activeFilters);
      setVendors(result.data || []);
      setTotal(result.total || 0);
    } catch (err) {
      setError(err.message || 'Failed to load vendors. Please try again.');
      setVendors([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVendors(filters);
  }, [filters, loadVendors]);

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return { vendors, total, loading, error, filters, applyFilters, clearFilters };
};

export default useVendors;
