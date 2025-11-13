interface Props {
  children: React.ReactNode;
}

export default function BoardDetailLayout(props: Props) {
  const { children } = props;

  return <>{children}</>;
}
