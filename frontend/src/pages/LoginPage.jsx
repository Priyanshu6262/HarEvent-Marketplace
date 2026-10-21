import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';
import './LoginPage.css';

function validate(fields, isVendor) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!isVendor) {
    // Customer: email OR mobile
    const v = fields.identifier?.trim() || '';
    if (!v) {
      errors.identifier = 'Email or mobile number is required.';
    } else if (!emailRegex.test(v) && !phoneRegex.test(v)) {
      errors.identifier = 'Enter a valid email address or 10-digit mobile number.';
    }
  } else {
    // Vendor: email only
    if (!fields.email?.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(fields.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
  }

  if (!fields.password) {
    errors.password = 'Password is required.';
  } else if (fields.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export default function LoginPage({ role = 'customer' }) {
  const isVendor = role === 'vendor';
  const [fields, setFields] = useState({ identifier: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields, isVendor);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Back Link */}
        <Link to="/" className="login-back">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="login-header">
          <div className="login-icon">
            {isVendor ? '🏢' : '👤'}
          </div>
          <h1 className="login-title">
            {isVendor ? 'Vendor Login' : 'Customer Login'}
          </h1>
          <p className="login-subtitle">
            {isVendor
              ? 'Access your vendor dashboard and manage your listings.'
              : 'Sign in to discover and connect with the best event vendors.'}
          </p>
        </div>

        {/* Demo Notice */}
        <div className="login-demo-notice">
          <strong>📋 Demo Mode:</strong> This is a sample login form. No real authentication is implemented. Submitting any valid-format credentials will show a success message.
        </div>

        {submitted ? (
          <div className="login-success">
            <div className="login-success__icon">✅</div>
            <h2 className="login-success__title">Login Successful!</h2>
            <p className="login-success__text">
              This is a demo. In the full application, you would be redirected to your {isVendor ? 'vendor' : 'customer'} dashboard.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => { setSubmitted(false); setFields({ identifier: '', email: '', password: '' }); }}
            >
              Try Again
            </button>
            <Link to="/" className="btn btn-ghost">Return Home</Link>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Identifier / Email Field */}
            {isVendor ? (
              <div className="form-field">
                <label htmlFor="vendor-email" className="form-label">
                  <Mail size={14} /> Email Address
                </label>
                <input
                  id="vendor-email"
                  type="email"
                  name="email"
                  className={`input${errors.email ? ' input--error' : ''}`}
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            ) : (
              <div className="form-field">
                <label htmlFor="customer-id" className="form-label">
                  <User size={14} /> Email or Mobile Number
                </label>
                <input
                  id="customer-id"
                  type="text"
                  name="identifier"
                  className={`input${errors.identifier ? ' input--error' : ''}`}
                  placeholder="email@example.com or 9876543210"
                  value={fields.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                />
                {errors.identifier && <span className="form-error">{errors.identifier}</span>}
              </div>
            )}

            {/* Password */}
            <div className="form-field">
              <label htmlFor="login-password" className="form-label">
                <Lock size={14} /> Password
              </label>
              <div className="form-pass-wrap">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  className={`input${errors.password ? ' input--error' : ''}`}
                  placeholder="••••••••"
                  value={fields.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="form-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary login-submit">
              {isVendor ? 'Login to Dashboard' : 'Login'}
            </button>
          </form>
        )}

        {/* Switch Role */}
        <p className="login-switch">
          {isVendor ? (
            <>
              Not a vendor?{' '}
              <Link to="/login/customer" className="login-switch-link">
                Customer Login
              </Link>
            </>
          ) : (
            <>
              Are you a vendor?{' '}
              <Link to="/login/vendor" className="login-switch-link">
                Vendor Login
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
