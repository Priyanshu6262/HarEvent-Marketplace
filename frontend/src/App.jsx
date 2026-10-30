import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/customer" element={<LoginPage role="customer" />} />
        <Route path="/login/vendor" element={<LoginPage role="vendor" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
