import styles from './skeleton.module.css';

interface IProps {
  size: string;
}

export default function Skeleton() {
  return <div className={`${styles.skeletonRectangle} ${styles.animatePulse}`}></div>;
}
