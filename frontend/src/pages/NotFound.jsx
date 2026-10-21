import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__inner">
        <span className="not-found__emoji">🎪</span>
        <h1 className="not-found__code">404</h1>
        <h2 className="not-found__title">Page Not Found</h2>
        <p className="not-found__text">
          The page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
