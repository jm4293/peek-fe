import styles from './skeleton.module.css';

export default function ThumbnailSkeleton() {
  return <div className={`rounded-3xl w-[40px] h-[40px] ${styles.animatePulse}`} />;
}
