/**
 * Tabs.tsx
 *
 * 탭 네비게이션 컴포넌트입니다.
 * 여러 탭 간의 전환을 관리하고 현재 활성화된 탭을 표시합니다.
 */

import React, { useState } from "react";
import Button from "@/components/Button/Button";

/**
 * 탭 네비게이션 컴포넌트의 Props 인터페이스
 *
 * @interface NavigationProps
 * @property {string} activeTab - 현재 활성화된 탭의 이름
 * @property {(tab: string) => void} setActiveTab - 활성 탭을 변경하는 함수
 */
interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

/**
 * 탭 컴포넌트
 *
 * 여러 탭 간의 전환을 관리하는 네비게이션 컴포넌트입니다.
 * 현재 활성화된 탭을 시각적으로 표시합니다.
 *
 * @param {NavigationProps} props - 탭 컴포넌트 props
 * @returns {JSX.Element} 탭 컴포넌트 JSX 요소
 */
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
