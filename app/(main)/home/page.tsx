import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import BestNews from './BestNews';
import BestWeekend from './best-weekend';
import Chart from './chart';

export default async function HomePage() {
  // const { success, data } = await getStockToken();

  // if (!success) {
  //   return (
  //     <Wrapper.MAIN text="메인">
  //       <Wrapper.SECTION>
  //         <Text.HEADING text="문제가 발생했습니다." />
  //       </Wrapper.SECTION>
  //     </Wrapper.MAIN>
  //   );
  // }

  // return (
  //   <Wrapper.MAIN text="메인">
  //     <div className="flex gap-2">
  //       <div className="w-full flex flex-col gap-2">
  //         <BestNews token={data!} />
  //         {/* <BestWeekend /> */}
  //       </div>

  //       <div className="w-full">
  //         <Chart />
  //       </div>
  //     </div>
  //   </Wrapper.MAIN>
  // );

  return (
    <Wrapper.MAIN text="메인">
      <BestWeekend />
    </Wrapper.MAIN>
  );
}
