import { LineSkeleton } from '../skeleton';
import { Wrapper } from './Wrapper';

export const LoadingView = () => {
  return (
    <Wrapper.SECTION>
      <LineSkeleton />
      <LineSkeleton />
    </Wrapper.SECTION>
  );
};
