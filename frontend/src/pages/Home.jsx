import Hero from '../components/Hero';
import Categories from '../components/Categories';
import TopVendors from '../components/TopVendors';
import HowItWorks from '../components/HowItWorks';
import VendorCTA from '../components/VendorCTA';
import './Home.css';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <TopVendors />
      <HowItWorks />
      <VendorCTA />
    </main>
  );
}
