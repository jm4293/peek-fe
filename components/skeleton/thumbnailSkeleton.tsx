import styles from './skeleton.module.css';

interface IProps {
  width?: number;
  height?: number;
}

export default function ThumbnailSkeleton(props: IProps) {
  const { width = 1, height = 1 } = props;

  return (
    <div className={`rounded-3xl  ${styles.animatePulse}`} style={{ width: `${width}rem`, height: `${height}rem` }} />
  );
}
