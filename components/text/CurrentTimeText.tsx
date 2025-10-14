'use client';

import { useEffect, useState } from 'react';

import { Text } from './Text';

export const CurrentTimeText = () => {
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text.PARAGRAPH text={currentTime} className="text-nowrap text-end" />;
};
