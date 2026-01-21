import { useState, useEffect } from 'react';
import './ScreenFlash.scss';

interface ScreenFlashProps {
  trigger: boolean;
  onComplete?: () => void;
}

const ScreenFlash = ({ trigger, onComplete }: ScreenFlashProps) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsFlashing(true);
      const timer = setTimeout(() => {
        setIsFlashing(false);
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isFlashing) return null;

  return <div className="screen-flash" />;
};

export { ScreenFlash };
export default ScreenFlash;
