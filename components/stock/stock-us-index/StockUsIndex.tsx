'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useStockUsIndex } from '@/hooks/socket';

export const StockUsIndex = () => {
  const { loading, isConnected } = useStockUsIndex();

  const StockUsIndexWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Text.HEADING text="미국 지수" />
            {/* {isConnected && kospi && (
              <Text.CAPTION text={DayjsUtil.of(kospi.createdAt).formatMMDDHHmmss()} className="text-nowrap" />
            )} */}
          </div>
          {/* {isConnected && kospi && <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />} */}
        </div>
        {children}
      </Wrapper.SECTION>
    );
  };

  return (
    <StockUsIndexWrapper>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Text.HEADING text="개발중" />
        </div>
      </div>
    </StockUsIndexWrapper>
  );
};
