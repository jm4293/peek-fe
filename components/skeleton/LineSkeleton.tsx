import { Text } from '../text';
import styles from './skeleton.module.css';

interface Props {
  h?: number;
  text?: string;
  variant?: 'default' | 'rounded' | 'circle';
  animation?: 'pulse' | 'wave' | 'shimmer';
  className?: string;
}

export const LineSkeleton = (props: Props) => {
  const { h = 1, text, variant = 'default', animation = 'wave', className = '' } = props;

  const variantStyles = {
    default: 'rounded',
    rounded: 'rounded-lg',
    circle: 'rounded-full',
  };

  const animationStyles = {
    pulse: styles.animatePulse,
    wave: styles.animateWave,
    shimmer: styles.animateShimmer,
  };

  return (
    <div className="w-full space-y-2">
      {text && <Text.CAPTION text={text} color="gray" className="mb-1" />}
      <div
        className={`w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
        style={{ height: `${h}rem` }}
      />
    </div>
  );
};
