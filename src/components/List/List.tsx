import React from "react";

interface ListProps<T> {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
  className?: string;
}

const List = <T,>({ items, children, className = "" }: ListProps<T>) => {
  return (
    <div className={`w-full list-none ${className}`}>
      {items.map((item, index) => (
        <>{children(item, index)}</>
      ))}
    </div>
  );
};

export default List;
