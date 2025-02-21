import React, { useState } from "react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["전체구간", "사고.통제"];

  return (
    <div className="w-full h-[38px] border-b border-[#EEE] border-solid">
      <div className="flex h-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 h-full text-center text-xs transition-colors
              ${
                activeTab === tab
                  ? "bg-[#F7F7F8] text-[#7C7C7E] font-bold"
                  : "bg-[#F7F7F8] text-[#9A9A9C] hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
