export function handleInputChange<T>(setState: React.Dispatch<React.SetStateAction<T>>) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
}
