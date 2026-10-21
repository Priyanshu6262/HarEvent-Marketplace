import './WhatsAppButton.css';

/**
 * Floating WhatsApp chat button.
 *
 * HOW TO CONFIGURE:
 * Set VITE_WHATSAPP_NUMBER in the frontend/.env file.
 * Format: international number without + or spaces, e.g. 919876543210
 * Default greeting message can also be changed via VITE_WHATSAPP_MESSAGE.
 */
export default function WhatsAppButton() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const message =
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    'Hello!%20I%20found%20HarEvent%20and%20would%20like%20to%20know%20more.';

  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="whatsapp-btn__icon"
        aria-hidden="true"
      >
        <path d="M16 2a13.9 13.9 0 0 0-12 20.9L2 30l7.3-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.2-4.4 1.1 1.2-4.3-.3-.4A11.6 11.6 0 1 1 16 27.5zm6.4-8.6c-.3-.2-2-1-2.3-1.1-.3-.1-.6-.2-.8.2s-.9 1.1-1.1 1.3c-.2.2-.4.3-.8.1a9.8 9.8 0 0 1-2.9-1.8 10.8 10.8 0 0 1-2-2.5c-.2-.4 0-.6.2-.8l.5-.6c.2-.2.3-.4.4-.6a.7.7 0 0 0 0-.7c0-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7a1.4 1.4 0 0 0-1 .5 4.3 4.3 0 0 0-1.3 3.2 7.6 7.6 0 0 0 1.6 4 17.4 17.4 0 0 0 6.6 5.8c.9.4 1.7.6 2.3.8.9.3 1.8.2 2.5.1a4.1 4.1 0 0 0 2.7-1.9 3.4 3.4 0 0 0 .2-1.9c-.1-.1-.3-.2-.6-.4z" />
      </svg>
      <span className="whatsapp-tooltip">Chat with us</span>
    </a>
  );
}
