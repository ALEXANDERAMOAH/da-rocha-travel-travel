import { useState, useEffect } from 'react';

const messages = [
  '🌸 Free delivery on orders above GH₵200',
  '💄 New arrivals every Friday',
  '✨ WhatsApp us for custom orders',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="announcement-bar-inner">
        <span
          key={index}
          className="announcement-bar-text"
        >
          {messages[index]}
        </span>
      </div>
    </div>
  );
}
