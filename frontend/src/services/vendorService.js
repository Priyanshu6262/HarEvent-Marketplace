// Base URL is configured via VITE_API_BASE_URL, defaulting to live Render backend in production
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://harevent-marketplace.onrender.com/api'
    : 'http://localhost:5000/api');

/**
 * Fetch all vendors, optionally filtered by search term, category, and city.
 * @param {{ search?: string, category?: string, city?: string }} filters
 */
export const fetchVendors = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.category) params.set('category', filters.category);
  if (filters.city) params.set('city', filters.city);

  const url = `${BASE_URL}/vendors${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json(); // { success, total, data }
};

/**
 * Fetch a single vendor by ID.
 * @param {string|number} id
 */
export const fetchVendorById = async (id) => {
  const response = await fetch(`${BASE_URL}/vendors/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json(); // { success, data }
};
