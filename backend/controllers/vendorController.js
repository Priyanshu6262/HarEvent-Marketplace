import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load vendor data from JSON file
const vendorsFilePath = join(__dirname, '../data/vendors.json');
let vendors = [];

try {
  const data = readFileSync(vendorsFilePath, 'utf-8');
  vendors = JSON.parse(data);
} catch (err) {
  console.error('Failed to load vendors data:', err.message);
}

// GET /api/vendors — with optional search, category, city query params
export const getAllVendors = (req, res) => {
  const { search, category, city } = req.query;
  let results = [...vendors];

  if (search && search.trim()) {
    const term = search.trim().toLowerCase();
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(term) ||
        v.description.toLowerCase().includes(term) ||
        v.category.toLowerCase().includes(term)
    );
  }

  if (category && category.trim()) {
    const cat = category.trim().toLowerCase();
    results = results.filter((v) => v.category.toLowerCase().includes(cat));
  }

  if (city && city.trim()) {
    const c = city.trim().toLowerCase();
    results = results.filter((v) => v.city.toLowerCase().includes(c));
  }

  return res.status(200).json({
    success: true,
    total: results.length,
    data: results,
  });
};

// GET /api/vendors/:id
export const getVendorById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid vendor ID. ID must be a positive number.',
    });
  }

  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return res.status(404).json({
      success: false,
      message: `Vendor with ID ${id} not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    data: vendor,
  });
};
