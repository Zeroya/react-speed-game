import { useState, useEffect } from 'react';
import './Countdown.scss';

interface CountdownProps {
  isActive: boolean;
  onComplete: () => void;
}

const Countdown = ({ isActive, onComplete }: CountdownProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!isActive) {
      setCount(3);
      return;
    }

    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActive, count, onComplete]);

  if (!isActive || count === 0) return null;

  return (
    <div className="countdown-overlay">
      <div key={count} className="countdown__number">
        {count}
      </div>
    </div>
  );
};

export { Countdown };
export default Countdown;
