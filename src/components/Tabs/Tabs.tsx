import React, { useState } from "react";
import Button from "@/components/Button/Button";

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
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant="text"
            className={`flex-1 h-full text-center text-xs transition-colors
              ${
                activeTab === tab
                  ? "bg-[#F7F7F8] text-[#7C7C7E] font-bold"
                  : "bg-[#F7F7F8] text-[#9A9A9C] hover:bg-gray-50"
              }`}
          >
            {tab}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
