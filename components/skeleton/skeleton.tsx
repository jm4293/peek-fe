import styles from './skeleton.module.css';

export default function Skeleton() {
  return <div className={`${styles.skeletonRectangle} ${styles.animatePulse}`}></div>;
}
