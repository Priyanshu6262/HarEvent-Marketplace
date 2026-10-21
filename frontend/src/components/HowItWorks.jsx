import { Search, CheckCircle, Star, Smile } from 'lucide-react';
import './HowItWorks.css';

const STEPS = [
  {
    icon: <Search size={28} />,
    step: '01',
    title: 'Search & Discover',
    description:
      'Browse hundreds of verified vendors by category, city, or service. Use filters to find exactly what you need for your event.',
  },
  {
    icon: <CheckCircle size={28} />,
    step: '02',
    title: 'Compare & Select',
    description:
      'Review vendor profiles, read genuine customer ratings, check pricing, and shortlist the ones that best match your vision and budget.',
  },
  {
    icon: <Star size={28} />,
    step: '03',
    title: 'Book with Confidence',
    description:
      'Connect directly with your chosen vendor through HarEvent. Our platform ensures transparent communication and reliable service.',
  },
  {
    icon: <Smile size={28} />,
    step: '04',
    title: 'Celebrate & Share',
    description:
      'Enjoy your flawlessly planned event and share your experience. Help other families find the best vendors by leaving a review.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works section" id="about" aria-label="How HarEvent works">
      <div className="container">
        <div className="how-it-works__head">
          <p className="section-label">Simple Process</p>
          <h2 className="section-title">How HarEvent Works</h2>
          <p className="section-subtitle">
            From searching the perfect vendor to celebrating your dream event — HarEvent makes every step effortless.
          </p>
        </div>
        <div className="how-it-works__steps">
          {STEPS.map((step, idx) => (
            <div key={idx} className="hiw-step">
              <div className="hiw-step__num">{step.step}</div>
              <div className="hiw-step__icon">{step.icon}</div>
              <h3 className="hiw-step__title">{step.title}</h3>
              <p className="hiw-step__desc">{step.description}</p>
              {idx < STEPS.length - 1 && <div className="hiw-step__connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
