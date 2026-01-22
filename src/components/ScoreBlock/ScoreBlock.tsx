import { ScoreBlockVariant } from '@/types';
import './ScoreBlock.scss';

interface ScoreBlockProps {
  label: string;
  value: number | string;
  variant?: ScoreBlockVariant;
}

export const ScoreBlock = ({ label, value, variant = ScoreBlockVariant.Default }: ScoreBlockProps) => {
  return (
    <div className={`score-block score-block--${variant}`}>
      <span className="score-block__label">{label}</span>
      <span className="score-block__value">{value}</span>
    </div>
  );
};

