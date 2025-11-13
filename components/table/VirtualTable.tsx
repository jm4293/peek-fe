import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

interface Props {
  total: number;
  renderRow: (index: number) => React.ReactNode;
  estimateSize?: number;
  rowHeight?: number;
}

export const VirtualTable = (props: Props) => {
  const { total, renderRow, estimateSize = 35, rowHeight } = props;

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: total,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
  });

  return (
    <div
      ref={parentRef}
      className="flex flex-col gap-4 overflow-y-auto"
      style={{ maxHeight: `${rowHeight ? rowHeight : '50vh'}` }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}>
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                display: 'flex',
                alignItems: 'center',
              }}>
              {renderRow(virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
