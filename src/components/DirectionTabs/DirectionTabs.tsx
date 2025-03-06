/**
 * DirectionTabs.tsx
 *
 * 고속도로 방향별 사고 및 통제 정보를 표시하는 탭 컴포넌트입니다.
 * 상행/하행 방향을 선택하고 해당 방향의 사고 정보를 표시합니다.
 */

import React, { useState } from "react";
import AlertCircleIcon from "@/assets/images/info.png";
import Image from "next/image";
import { useHighwayContext } from "@/contexts/HighwayContext";
import { AccidentInfo } from "@/types/index";
import moment from "moment";

/**
 * 여행 정보 아이템 컴포넌트
 *
 * 사고 또는 통제 정보를 테이블 형식으로 표시합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.data - 표시할 데이터
 * @param {string} props.data.from - 시작 지점
 * @param {string} props.data.to - 종료 지점
 * @param {string} props.data.accidentType - 사고 유형
 * @param {string} props.data.accidentDetailType - 사고 상세 유형
 * @param {string} props.data.content - 사고 내용
 * @param {string} props.data.fromTime - 시작 시간
 * @param {string} props.data.toTime - 종료 시간
 * @param {number} [props.tableWidth] - 테이블 너비
 * @param {number} [props.rowHeight] - 행 높이
 * @param {number} [props.rowWidth] - 행 너비
 * @returns {JSX.Element} 여행 정보 아이템 JSX 요소
 */
export const TravelItem = ({
  data,
  tableWidth,
  rowHeight,
  rowWidth,
}: {
  data: {
    from: string;
    to: string;
    accidentType: string;
    accidentDetailType: string;
    content: string;
    fromTime: string;
    toTime: string;
  };
  tableWidth?: number;
  rowHeight?: number;
  rowWidth?: number;
}) => (
  <table className={`w-full border border-gray-200`}>
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
          <span>{data.from}</span>
          <span> ~ </span>
          <span>{data.to}</span>
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
          <span>{data.accidentType || ""}</span>
          <span> </span>
          <span>{data.accidentDetailType || ""}</span>
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
          {data.content || ""}
        </td>
      </tr>
      <tr className={`min-h-[${rowHeight}px]`}>
        <th
          className={`w-[46px] text-sm text-center text-gray-600 bg-gray-100`}
        >
          일시
        </th>
        <td className={`w-[${rowWidth}px] pl-2 py-2 bg-white`}>
          <span>{data.fromTime}</span>
          {/* <span> - </span> */}
          {/* <span>{data.toTime || "진행중"}</span> */}
        </td>
      </tr>
    </tbody>
  </table>
);

/**
 * 빈 상태 컴포넌트
 *
 * 사고 또는 통제 정보가 없을 때 표시되는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 빈 상태 JSX 요소
 */
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

/**
 * 방향 탭 컴포넌트
 *
 * 고속도로 방향별 사고 및 통제 정보를 표시하는 탭 컴포넌트입니다.
 * 상행/하행 방향을 선택하고 해당 방향의 사고 정보를 표시합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {AccidentInfo["accidents"]} props.data - 사고 데이터 배열
 * @returns {JSX.Element} 방향 탭 JSX 요소
 */
const DirectionTabs = ({ data }: { data: AccidentInfo["accidents"] }) => {
  const { curHighway } = useHighwayContext();
  // 상행 : E, 하행 : S
  const [activeTab, setActiveTab] = useState("S");

  const s = curHighway?.start_point;
  const e = curHighway?.end_point;

  const filteredData = data.filter((el) => {
    if (activeTab === "E") {
      if (el.conzone_id.includes("E")) {
        return {
          ...el,
        };
      }
    }

    if (activeTab === "S") {
      if (el.conzone_id.includes("S")) {
        return {
          ...el,
        };
      }
    }
  });

  return (
    <div className="w-full px-[10px] pt-2 ">
      <div className="w-full h-10 py-2">
        <div className="flex w-full h-full text-[10px]">
          <div
            className={`flex-1 text-center pt-1 rounded-sm cursor-pointer ${
              activeTab === "E"
                ? "bg-[#F5F5F8] text-[#000]"
                : "bg-[#444447] text-white"
            }`}
            onClick={() => setActiveTab("S")}
          >
            {s} 방향
          </div>
          <div
            className={`flex-1 text-center pt-1 rounded-sm cursor-pointer ${
              activeTab === "S"
                ? "bg-[#F5F5F8] text-[#000]"
                : "bg-[#444447] text-white"
            }`}
            onClick={() => setActiveTab("E")}
          >
            {e} 방향
          </div>
        </div>
      </div>
      <div className="w-full">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => {
            const {
              accident_detail_type,
              description,
              occurred_at,
              cleared_at,
              start_name,
              end_name,
            } = item;
            const data = {
              from: start_name,
              to: end_name,
              accidentType: "",
              accidentDetailType: accident_detail_type,
              content: description,
              fromTime: occurred_at
                ? moment(occurred_at).format("YYYY-MM-DD HH:mm:ss")
                : "",
              toTime: cleared_at
                ? moment(cleared_at).format("YYYY-MM-DD HH:mm:ss")
                : "",
            };
            return (
              <div key={index} className="py-2">
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
