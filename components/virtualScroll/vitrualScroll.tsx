// 'use client';
//
// import { useState, useRef, useCallback, useEffect } from 'react';
//
// interface VirtualScrollProps {
//   data: any[];
//   loadMoreThreshold?: number;
//   renderItem: (item: any, index: number) => React.ReactNode;
// }
//
// const VirtualScroll: React.FC<VirtualScrollProps> = ({ data, loadMoreThreshold = 20, renderItem }) => {
//   // const [visibleItems, setVisibleItems] = useState([]);
//   // const observerRef = useRef<HTMLDivElement>(null);
//   //
//   // const loadMoreItems = useCallback(() => {
//   //   if (data && visibleItems.length < data.length) {
//   //     const nextItems = data.slice(visibleItems.length, visibleItems.length + loadMoreThreshold);
//   //     setVisibleItems((prevItems) => [...prevItems, ...nextItems]);
//   //   }
//   // }, [data, visibleItems, loadMoreThreshold]);
//   //
//   // useEffect(() => {
//   //   loadMoreItems();
//   // }, [data, loadMoreItems]);
//   //
//   // useEffect(() => {
//   //   const observer = new IntersectionObserver(
//   //     (entries) => {
//   //       if (entries[0].isIntersecting) {
//   //         loadMoreItems();
//   //       }
//   //     },
//   //     { threshold: 1.0 },
//   //   );
//   //
//   //   if (observerRef.current) {
//   //     observer.observe(observerRef.current);
//   //   }
//   //
//   //   return () => {
//   //     if (observerRef.current) {
//   //       observer.unobserve(observerRef.current);
//   //     }
//   //   };
//   // }, [loadMoreItems]);
//   //
//   // return (
//   //   <div className="flex flex-col gap-4">
//   //     {visibleItems.map((item, index) => renderItem(item, index))}
//   //     <div ref={observerRef} style={{ height: '1px' }}></div>
//   //   </div>
//   // );
// };
//
// export default VirtualScroll;
