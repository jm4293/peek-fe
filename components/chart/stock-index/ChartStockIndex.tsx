'use client';

import dayjs from 'dayjs';
import { CandlestickSeries, createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

import { IKoreanStockIndex } from '@/shared/types/stock-index';

interface IProps {
  data: IKoreanStockIndex;
}

export const ChartStockIndex = (props: IProps) => {
  const { data } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const chartDataRef = useRef<any>(null);
  const chartResizingRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;

        chartResizingRef.current.applyOptions({ width });
        chartResizingRef.current.timeScale().fitContent();
      }
    });

    resizeObserver.observe(containerRef.current);

    const chart = createChart(containerRef.current, {
      // layout: { textColor: 'black', background: { type: ColorType.Solid, color: 'white' } },
      // width: containerRef.current.clientWidth,
      height: 300,
    });

    chartResizingRef.current = chart;
    chartDataRef.current = chart.addSeries(CandlestickSeries);

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chartDataRef.current || !data) {
      return;
    }

    const hour = data.time?.slice(0, 2) ?? '00';
    const min = data.time?.slice(2, 4) ?? '00';
    const sec = data.time?.slice(4, 6) ?? '00';

    const today = dayjs().format('YYYY-MM-DD');
    const timeString = `${today} ${hour}:${min}:${sec}`;

    const timeUnix = dayjs(timeString).unix();

    // chartDataRef.current.update({
    //   time: timeUnix,
    //   value: Number(data.jisu),
    // });

    chartDataRef.current.setData([
      { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
      { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
      { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
      { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
      { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
      { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
      { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
      { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
      { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
      { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    ]);
  }, [data]);

  return <div ref={containerRef} />;
};
