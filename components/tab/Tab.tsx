'use client';

interface TabItem {
  value: string | number;
  label: string;
}

interface Props {
  items: TabItem[];
  value?: string | number;
  onChange: (value: string | number) => void;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: {
    padding: 'px-4 py-2',
    text: 'text-sm',
  },
  md: {
    padding: 'px-5 py-2.5',
    text: 'text-base',
  },
  lg: {
    padding: 'px-6 py-3',
    text: 'text-lg',
  },
};

export const Tab = (props: Props) => {
  const { items, value, onChange, direction = 'horizontal', size = 'md', className = '' } = props;

  const containerClass =
    direction === 'horizontal'
      ? 'flex items-center gap-1 p-1 rounded-xl bg-gray-200 dark:bg-gray-700'
      : 'flex flex-col items-stretch gap-1 p-1 rounded-xl bg-gray-200 dark:bg-gray-700';
  const { padding, text } = sizeStyles[size];

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      {items.map((item) => {
        const active = value === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`
              ${padding}
              ${text}
              rounded-lg
              transition-all duration-200 ease-in-out
              font-medium
              whitespace-nowrap
              ${
                active
                  ? 'bg-white dark:bg-gray-300 text-gray-900 dark:text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
