import { useState, useEffect, useRef } from 'react';
import './ScreenFlash.scss';

interface ScreenFlashProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const ScreenFlash = ({ trigger, onComplete }: ScreenFlashProps) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const prevTriggerRef = useRef(false);

  useEffect(() => {
    if (trigger && !prevTriggerRef.current) {
      prevTriggerRef.current = true;
      setTimeout(() => setIsFlashing(true), 0);
      const timer = setTimeout(() => {
        setIsFlashing(false);
        prevTriggerRef.current = false;
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    } else if (!trigger) {
      prevTriggerRef.current = false;
    }
  }, [trigger, onComplete]);

  if (!isFlashing) return null;

  return <div className="screen-flash" />;
};

