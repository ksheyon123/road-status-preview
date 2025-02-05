import React, { useState } from "react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("전체구간");

  const tabs = ["전체구간", "구간상세", "사고.통제"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 py-3 text-center text-sm transition-colors
              ${
                activeTab === tab
                  ? "bg-[#4B7BF5] text-white font-medium"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
