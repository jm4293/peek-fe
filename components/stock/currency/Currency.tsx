'use client';

import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useCurrencyList } from '@/services/currency/query';

import styles from './Currency.module.css';

export const Currency = () => {
  const { data, isLoading, isSuccess } = useCurrencyList();

  return (
    <Wrapper.SECTION>
      <div className="flex justify-between items-center">
        <Text.HEADING text="환율" />
        <Text.CAPTION text="1분마다 갱신됩니다." color="gray" className="text-end" />
      </div>

      {isLoading ? (
        <LineSkeleton />
      ) : isSuccess && data ? (
        <div className={styles.container}>
          <div className={`${styles.scrollContainer} ${styles.animateScroll}`}>
            {/* 원본 데이터 */}
            {data.map((item) => (
              <div key={`original-${item.id}`} className={styles.scrollItem}>
                <Text.HEADING text={`${item.curNm}(${item.curUnit})`} nowrap />
                <Text.HEADING text={item.standard} nowrap className="text-end" />
              </div>
            ))}
            {/* 복제된 데이터 (연속성을 위해) */}
            {data.map((item) => (
              <div key={`duplicate-${item.id}`} className={styles.scrollItem}>
                <Text.HEADING text={`${item.curNm}(${item.curUnit})`} nowrap />
                <Text.HEADING text={item.standard} nowrap className="text-end" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <Text.CAPTION text="데이터를 불러올 수 없습니다." color="gray" />
        </div>
      )}
    </Wrapper.SECTION>
  );
};
