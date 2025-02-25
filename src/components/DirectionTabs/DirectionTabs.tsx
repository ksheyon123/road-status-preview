import React, { useState } from "react";
import AlertCircleIcon from "@/assets/images/info.png";
import Image from "next/image";
import { useHighwayContext } from "@/contexts/HighwayContext";
import { AccidentInfo } from "@/types/index";
import moment from "moment";

export const TravelItem = ({
  data,
  tableWidth,
  rowHeight,
  rowWidth,
}: {
  data: {
    route: string;
    type: string;
    content: string;
    time: string;
  };
  tableWidth?: number;
  rowHeight?: number;
  rowWidth?: number;
}) => (
  <table className="w-full border border-gray-200">
    <tbody>
      <tr>
        <th
          className={`w-[46px] h-[${rowHeight}px] text-sm text-center text-gray-600 bg-gray-100 border-b border-gray-200`}
        >
          구간
        </th>
        <td
          className={`w-[${rowWidth}px] pl-2 py-2 bg-white border-b border-gray-200`}
        >
          {data.route}
        </td>
      </tr>
      <tr>
        <th
          className={`w-[46px] h-[${rowHeight}px] text-sm text-center text-gray-600 bg-gray-100 border-b border-gray-200`}
        >
          요약
        </th>
        <td
          className={`w-[${rowWidth}px] pl-2 py-2 bg-white border-b border-gray-200 text-red-500`}
        >
          {data.type}
        </td>
      </tr>
      <tr className={`min-h-[${rowHeight}px]`}>
        <th
          className={`w-[46px] text-sm text-center text-gray-600 bg-gray-100 border-b border-gray-200`}
        >
          내용
        </th>
        <td
          className={`w-[${rowWidth}px] pl-2 py-2 bg-white border-b border-gray-200`}
        >
          {data.content}
        </td>
      </tr>
      <tr className={`min-h-[${rowHeight}px]`}>
        <th
          className={`w-[46px] text-sm text-center text-gray-600 bg-gray-100`}
        >
          일시
        </th>
        <td className={`w-[${rowWidth}px] pl-2 py-2 bg-white`}>{data.time}</td>
      </tr>
    </tbody>
  </table>
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

const DirectionTabs = ({ data }: { data: AccidentInfo["accidents"] }) => {
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

  const s = curHighway?.start_point;
  const e = curHighway?.end_point;

  const filteredData = data.filter((el) => {
    if (activeTab === "down") {
      if (el.direction === `${s} 방향`) {
        return {
          ...el,
        };
      }
    }

    if (activeTab === "up") {
      if (el.direction === `${e} 방향`) {
        return {
          ...el,
        };
      }
    }
  });

  console.log(moment("2025-02-19T18:47:37").format("YYYY-MM-DD HH:mm:ss"));
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
      <div className="w-full">
        {travelData.length > 0 ? (
          filteredData.map((item, index) => {
            const {
              direction,
              accident_type,
              accident_detail_type,
              description,
              occurred_at,
              cleared_at,
              start_name,
              end_name,
            } = item;
            const data = {
              route: `${start_name} -> ${end_name}`,
              type: `${accident_type} ${accident_detail_type}`,
              content: description,
              time: `${moment(occurred_at).format("YYYY-MM-DD HH:mm:ss")} ~ ${
                cleared_at === "-" || !cleared_at
                  ? "진행중"
                  : moment(cleared_at).format("YYYY-MM-DD HH:mm:ss")
              }`,
            };
            return (
              <div className="py-2">
                <TravelItem key={index} data={data} />
              </div>
            );
          })
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export { DirectionTabs };
