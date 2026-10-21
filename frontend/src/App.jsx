import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

export default function App() {
  // Header search state is passed down to Home to trigger filtering
  const [headerSearch, setHeaderSearch] = useState('');

  return (
    <>
      <Header onSearch={setHeaderSearch} />
      <Routes>
        <Route path="/" element={<Home headerSearch={headerSearch} />} />
        <Route path="/login/customer" element={<LoginPage role="customer" />} />
        <Route path="/login/vendor" element={<LoginPage role="vendor" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
