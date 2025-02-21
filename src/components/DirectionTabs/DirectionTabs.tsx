import React, { useState } from "react";
import AlertCircleIcon from "@/assets/images/info.png";
import Image from "next/image";
import { useHighwayContext } from "@/contexts/HighwayContext";
import { highways } from "@/constants";

const DirectionTabs = () => {
  const { curHighway } = useHighwayContext();
  const [activeTab, setActiveTab] = useState("down");

  const travelData = [
    {
      route: "대형반교IC→ 상석교",
      type: "공사",
      content:
        "[공사] 경부고속도로 대형반교IC 에서 금토JC방향 종점방향 작업 5차로 대형반교IC→ 금토JC 경부선 종점",
      time: "2025.02.20. 14:18 ~ 2025.02.20. 14:48",
    },
  ];

  const TravelItem = ({ data }: any) => (
    <div className="flex">
      {/* 레이블 컬럼 */}
      <div className="w-16 bg-gray-100">
        <div className="px-4 py-2 text-gray-600 border-b border-gray-200">
          구간
        </div>
        <div className="px-4 py-2 text-gray-600 border-b border-gray-200">
          요약
        </div>
        <div className="px-4 py-2 text-gray-600 border-b border-gray-200">
          내용
        </div>
        <div className="px-4 py-2 text-gray-600 border-gray-200">일시</div>
      </div>
      {/* 내용 컬럼 */}
      <div className="flex-1 bg-white">
        <div className="px-4 py-2 border-b border-gray-200">{data.route}</div>
        <div className="px-4 py-2 border-b border-gray-200 text-red-500">
          {data.type}
        </div>
        <div className="px-4 py-2 border-b border-gray-200">{data.content}</div>
        <div className="px-4 py-2 border-gray-200">{data.time}</div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <Image
        width={32}
        height={32}
        src={AlertCircleIcon.src}
        alt="alert_circle"
      />
      <p>사고 • 통제 정보가 없습니다.</p>
    </div>
  );
  const s = curHighway?.start_point;
  const e = curHighway?.end_point;
  return (
    <div className="w-full px-[10px] pt-2 ">
      <div className="w-full h-10 py-2">
        <div className="flex w-full h-full text-[10px]">
          <div
            className={`flex-1 text-center pt-1 rounded-sm ${
              activeTab === "up"
                ? "bg-[#F5F5F8] text-[#000]"
                : "bg-[#444447] text-white"
            }`}
            onClick={() => setActiveTab("down")}
          >
            {s} 방향
          </div>
          <div
            className={`flex-1 text-center pt-1 rounded-sm ${
              activeTab === "down"
                ? "bg-[#F5F5F8] text-[#000]"
                : "bg-[#444447] text-white"
            }`}
            onClick={() => setActiveTab("up")}
          >
            {e} 방향
          </div>
        </div>
      </div>
      <div className="w-full border border-gray-200">
        {activeTab === "up" && travelData.length > 0 ? (
          travelData.map((item, index) => (
            <TravelItem key={index} data={item} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default DirectionTabs;
