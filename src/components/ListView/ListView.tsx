import React from "react";

export interface ListViewProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  emptyMessage?: string;
  isLoading?: boolean;
}

const ListView = <T,>({
  items,
  renderItem,
  className = "",
  emptyMessage = "데이터가 없습니다.",
  isLoading = false,
}: ListViewProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default ListView;
