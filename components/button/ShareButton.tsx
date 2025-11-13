'use client';

import { Share } from 'lucide-react';

interface Props {
  text: string;
}

export const ShareButton = (props: Props) => {
  const { text } = props;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${text} PEEK 공유하기`,
          url: window.location.href,
        });
      } catch (error) {}
    } else {
    }
  };

  return <Share onClick={handleShare} />;
};
