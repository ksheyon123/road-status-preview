import React, { useState } from "react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["전체구간", "사고.통제"];

  return (
    <div className="w-full">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-base transition-colors
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
