'use client';

import { CandlestickSeries, ColorType, createChart } from 'lightweight-charts';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

import { useStockKoreanIndexCandleList } from '@/services/stock';

import { KoreanStockIndex } from '@/shared/types/stock';

interface Props {
  data: KoreanStockIndex;
}

const light = {
  layout: {
    background: { type: ColorType.Solid, color: '#ffffff' },
    textColor: '#151515',
  },
  grid: {
    vertLines: { color: '#e1e1e1' },
    horzLines: { color: '#e1e1e1' },
  },
  crosshair: {
    mode: 0,
  },
  rightPriceScale: {
    borderColor: '#e1e1e1',
  },
  timeScale: {
    borderColor: '#e1e1e1',
    timeVisible: true,
    secondsVisible: false,
    tickMarkFormatter: (time: number, tickMarkType: any, locale: string) => {
      const date = new Date(time * 1000);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
  },
};

const dark = {
  layout: {
    background: { type: ColorType.Solid, color: '#1b1b1d' },
    textColor: '#d0d0d4',
  },
  grid: {
    vertLines: { color: '#2a2a2e' },
    horzLines: { color: '#2a2a2e' },
  },
  crosshair: {
    mode: 0,
  },
  rightPriceScale: {
    borderColor: '#2a2a2e',
  },
  timeScale: {
    borderColor: '#e1e1e1',
    timeVisible: true,
    secondsVisible: false,
    tickMarkFormatter: (time: number, tickMarkType: any, locale: string) => {
      const date = new Date(time * 1000);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
  },
};

const getChartTheme = (theme: string | undefined) => {
  switch (theme) {
    case 'light':
      return light;
    case 'dark':
      return dark;
    default:
      return light;
  }
};

export const ChartStockIndex = (props: Props) => {
  const { data } = props;
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const chartDataRef = useRef<any>(null);
  const chartResizingRef = useRef<any>(null);

  const { data: candleList, isSuccess } = useStockKoreanIndexCandleList({ code: data.upcode });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;

        if (chartResizingRef.current) {
          chartResizingRef.current.applyOptions({ width });
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    const chart = createChart(containerRef.current, {
      ...getChartTheme(theme),
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
    if (isSuccess) {
      chartDataRef.current.setData(candleList?.candleList);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (chartResizingRef.current) {
      chartResizingRef.current.applyOptions(getChartTheme(theme));
    }
  }, [theme]);

  return <div ref={containerRef} />;
};

// https://tradingview.github.io/lightweight-charts/docs/series-types
