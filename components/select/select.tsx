interface IProps {}

export default function Select(props: IProps) {
  const {} = props;

  return (
    <select>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
      <option value="option5">Option 5</option>
    </select>
  );
}
