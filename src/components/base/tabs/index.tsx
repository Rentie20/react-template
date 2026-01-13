interface TabOption<T> {
  value: T;
  label: string;
}

interface TabsProps<T> {
  items: TabOption<T>[];
  value: T;
  className?: string;
  onChange: (value: T) => void;
}

export const Tabs = <T extends string | number>({
  items,
  value,
  className = "",
  onChange,
}: TabsProps<T>) => {
  return (
    <div className={`flex flex-1 rounded-lg bg-neutral-900 ${className}`}>
      {items.map((item) => (
        <div key={item.value} className="p-0.5 flex-1">
          <button
            onClick={() => onChange(item.value)}
            className={`w-full py-2 px-5 rounded-lg font-medium text-xs cursor-pointer ${
              value === item.value
                ? "bg-neutral-700 text-gray-50"
                : "bg-transparent text-gray-400"
            }`}
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};
