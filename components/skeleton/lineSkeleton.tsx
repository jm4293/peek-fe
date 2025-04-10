import styles from './skeleton.module.css';
import Text from '@/components/text/text';

interface IProps {
  height?: number;
  text?: string;
}

export default function LineSkeleton(props: IProps) {
  const { height = 1, text } = props;

  return (
    <div className={`w-full ${styles.animatePulse}`} style={{ height: `${height}rem` }}>
      {text && <Text value={text} />}
    </div>
  );
}
