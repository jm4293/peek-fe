import { Text } from '../text';
import styles from './skeleton.module.css';

interface IProps {
  h?: number;
  text?: string;
}

export const LineSkeleton = (props: IProps) => {
  const { h = 1, text } = props;

  return (
    <div className={`w-full ${styles.animatePulse}`} style={{ height: `${h}rem` }}>
      {text && <Text.PARAGRAPH text={text} />}
    </div>
  );
};
