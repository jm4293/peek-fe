'use client';

import dayjs from 'dayjs';
import { AreaSeries, BarSeries, BaselineSeries, ColorType, createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

interface IProps {
  data: any;
}

export const ChartStockIndex = (props: IProps) => {
  const { data } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const areaSeriesRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      layout: { textColor: 'black', background: { type: ColorType.Solid, color: 'white' } },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    areaSeriesRef.current = chart.addSeries(AreaSeries, {
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
      areaSeriesRef.current = null;
    };
  }, [chartContainerRef.current?.clientWidth]);

  useEffect(() => {
    if (!areaSeriesRef.current || !data) {
      return;
    }

    const hour = data.bsop_hour?.slice(0, 2) ?? '00';
    const min = data.bsop_hour?.slice(2, 4) ?? '00';
    const sec = data.bsop_hour?.slice(4, 6) ?? '00';

    const today = dayjs().format('YYYY-MM-DD');
    const timeString = `${today} ${hour}:${min}:${sec}`;

    const timeUnix = dayjs(timeString).unix();

    areaSeriesRef.current.update({
      time: timeUnix,
      value: Number(data.prpr_nmix),
    });
  }, [data]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: 300 }} />;
};
