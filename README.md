# HarEvent Marketplace 🎪

> Full-Stack Event & Vendor Listing Platform for HarEvent LLP.

## 🌐 Live Deployments

- **Frontend Live (Vercel):** [https://har-event-marketplace.vercel.app](https://har-event-marketplace.vercel.app)
- **Backend Live (Render):** [https://harevent-marketplace.onrender.com](https://harevent-marketplace.onrender.com)
- **API Health Check:** [https://harevent-marketplace.onrender.com/health](https://harevent-marketplace.onrender.com/health)
- **Vendors Endpoint:** [https://harevent-marketplace.onrender.com/api/vendors](https://harevent-marketplace.onrender.com/api/vendors)

---

## 🌟 Key Features

- **Hero Search & Filtering**: Multi-criteria search panel with real-time category, city, and text search with transparent glassmorphic UI.
- **Vendor Directory**: Dynamic card grid showcasing ratings, reviews, pricing, verified badges, and tags.
- **Vendor Detail Modal**: Interactive detail view with comprehensive services, gallery, contact details, pricing tiers, and booking inquiries.
- **Top Rated Showcase**: Highlighted carousel/grid of top-rated verified vendors.
- **Categories Grid**: One-click browsing across major event vendor categories.
- **Authentication Pages**: Dedicated responsive Customer and Vendor login interfaces with validation and toggleable password visibility.
- **WhatsApp Direct Connect**: Floating action button with direct chat and custom greeting pre-fill.
- **RESTful API**: Node.js & Express backend serving filtered JSON data with robust error handling and CORS support.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS (Custom Design System, CSS Variables, Glassmorphism, Animations)
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API with custom service layer

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, Morgan (HTTP logging)
- **Data Store**: Local JSON database with 12+ curated event vendors across India

---

## 📁 Project Structure

```
HarEvent LLP/
├── backend/
│   ├── controllers/
│   │   └── vendorController.js   # Vendor logic & filter matching
│   ├── data/
│   │   └── vendors.json          # Curated vendor database
│   ├── middleware/
│   │   └── errorHandler.js       # Centralized error handler
│   ├── routes/
│   │   └── vendorRoutes.js       # API routes (/api/vendors)
│   ├── server.js                 # Express server configuration
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/           # Header, Footer, Hero, VendorCard, Modal, WhatsApp
│   │   ├── hooks/                # useVendors custom data hook
│   │   ├── pages/                # Home, LoginPage, NotFound
│   │   ├── services/             # API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css             # Design tokens & global styling
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Priyanshu6262/HarEvent-Marketplace.git
cd HarEvent-Marketplace
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
*Server runs on `http://localhost:5000`*

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*Vite dev server runs on `http://localhost:5173`*

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/vendors` | Fetch all vendors (supports `?search=`, `?category=`, `?city=`, `?featured=`) |
| `GET` | `/api/vendors/:id` | Fetch vendor by ID |
| `GET` | `/api/vendors/categories` | List distinct vendor categories |
| `GET` | `/api/vendors/cities` | List distinct covered cities |

---

## 📄 License
This project is proprietary and developed for HarEvent LLP.
