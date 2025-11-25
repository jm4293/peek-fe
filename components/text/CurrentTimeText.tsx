'use client';

import { useEffect, useState } from 'react';

import { Text } from './Text';

export const CurrentTimeText = () => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (currentTime === null) {
    return <Text.PARAGRAPH text="" className="text-nowrap text-end" />;
  }

  return <Text.PARAGRAPH text={currentTime} className="text-nowrap text-end" />;
};
