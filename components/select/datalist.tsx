import { LineSkeleton } from '../skeleton';

interface IProps {
  name: string;
  optionList: string[] | undefined;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Datalist = (props: IProps) => {
  const { name, optionList, value, onChange } = props;

  if (!optionList) {
    return <LineSkeleton h={2} />;
  }

  return (
    <>
      <input type="text" list={`${name}-datalist`} value={value} onChange={onChange} />

      <datalist id={`${name}-datalist`}>
        {optionList.map((option, index) => (
          <option key={`${option}-${index}`} value={option} />
        ))}
      </datalist>
    </>
  );
};
