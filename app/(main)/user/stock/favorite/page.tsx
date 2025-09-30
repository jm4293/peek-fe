import { Wrapper } from '@/components/wrapper';

import StockKoreanFavoriteList from './StockKoreanFavoriteList';

export default function UserStockFavoritePage() {
  return (
    <Wrapper.MAIN text="즐겨찾기 종목">
      <StockKoreanFavoriteList />
    </Wrapper.MAIN>
  );
}
