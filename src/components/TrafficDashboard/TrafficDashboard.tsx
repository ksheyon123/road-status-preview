import React from "react";
import ic_direction_up from "@/assets/images/up.png";
import ic_direction_down from "@/assets/images/down.png";
import ic_right_arrow_small from "@/assets/images/arrows_button_right__arrow_small.png";
import { RouteInfo, SectionInfo } from "@/types/index";

// 상태에 따른 색상 반환 함수
const getStatusColor = (status: string) => {
  switch (status) {
    case "SMOOTH":
      return "#03bd41";
    case "SLOW":
      return "#ffac00";
    case "CONGESTED":
      return "#d80f17";
    default:
      return "#cad1d8";
  }
};

// 방향 아이콘 컴포넌트
const DirectionIcon = ({ direction }: { direction: string }) => {
  return (
    <img
      className="w-[14px] h-[14px]"
      aria-hidden="true"
      src={direction === "up" ? ic_direction_up.src : ic_direction_down.src}
      alt="direction"
    />
  );
};

// 원형 방향 아이콘 컴포넌트
const CircleDirectionIcon = ({
  status,
  direction,
}: {
  status: string;
  direction: "up" | "down";
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      className="w-8 h-8"
      aria-hidden="true"
      style={{ position: "relative", zIndex: 20 }}
    >
      <circle
        cx="11"
        cy="11"
        r="10.25"
        fill={getStatusColor(status)}
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        fill="#fff"
        transform={direction === "up" ? "rotate(180 11 11)" : ""}
        d="M11.536 6.415a.611.611 0 0 0-1.072 0l-4.123 7.51a.611.611 0 0 0 .768.86L11 13.186l3.891 1.599a.611.611 0 0 0 .768-.86z"
      />
    </svg>
  );
};

// 수정된 TrafficBar 컴포넌트
const TrafficBar = ({ time, distance, status }: SectionProps) => {
  const min = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative h-[46px] w-3 bg-[#939396]">
        <div className="relative h-[54px] top-[-4px] w-full">
          <div
            style={{
              height: "100%",
              backgroundColor: getStatusColor(status),
            }}
          />

          {/* 상태 및 시간 텍스트 */}
          <div className="absolute top-[5px] left-0 w-[120px] flex flex-col pl-6">
            <span
              className="text-base font-bold"
              style={{ color: getStatusColor(status) }}
            >
              {status === "CONGESTED"
                ? "정체"
                : status === "SLOW"
                ? "지체"
                : "원활"}
            </span>
            <span className="text-base text-[#77777a]">
              약 {min}분 {seconds}초
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 컴포넌트 props 인터페이스 업데이트
interface SectionProps {
  startPoint: string;
  endPoint: string;
  distance: number;
  status: "SMOOTH" | "SLOW" | "CONGESTED";
  time: number;
  isLast?: boolean;
}

// 수정된 Section 컴포넌트
const Section = (props: SectionProps) => {
  const { startPoint, endPoint, distance, status, isLast = false } = props;
  // 주요 상태 결정 (가장 높은 비율을 차지하는 상태)
  const getMainStatus = (segments: SectionInfo[]) => {
    return segments.reduce((prev, current) =>
      current.distance > prev.distance ? current : prev
    ).status;
  };

  return (
    <div className="w-full">
      <div className="h-[30px] bg-white grid grid-cols-4 items-center">
        <div className="pl-4 font-medium">{startPoint}</div>
        <div className="flex justify-center">
          <CircleDirectionIcon status={status} direction="up" />
        </div>
        <div className="flex justify-center">
          <CircleDirectionIcon status={status} direction="down" />
        </div>
        <div></div>
      </div>

      <div className="h-[46px] bg-gray-100 grid grid-cols-4 items-center">
        <div className="flex items-center pl-4 text-gray-600">
          <span>{distance / 1000}km</span>
          <img
            className="w-[5px] h-[8px] ml-2 cursor-pointer"
            src={ic_right_arrow_small.src}
            alt="right_arrow_small"
          />
        </div>
        <div className="w-full h-full">
          <TrafficBar {...props} />
        </div>
        <div className="w-full h-full">
          <TrafficBar {...props} />
        </div>
        <div className="w-full h-full"></div>
      </div>

      {isLast && (
        <div className="h-[30px] bg-white grid grid-cols-4 items-center">
          <div className="pl-4 font-medium">{endPoint}</div>
          <div className="flex justify-center">
            <CircleDirectionIcon status={status} direction="up" />
          </div>
          <div className="flex justify-center">
            <CircleDirectionIcon status={status} direction="down" />
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

const TrafficDashboard = (props: { data: RouteInfo }) => {
  const { data } = props;
  const { start_point, end_point, directions } = data;
  const { forward, reverse } = directions;
  return (
    <>
      <div className="w-screen min-w-[600px] mx-auto bg-gray-50 h-[600px] flex flex-col">
        {/* 헤더 */}
        <div className="h-[35px] bg-white grid grid-cols-4 items-center border-b">
          <div className="pl-4"></div>
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <DirectionIcon direction="down" />
              <div className="absolute text-[14px] text-[#8F8F92] left-6 top-[-4px] w-20">
                <span>{start_point} 방향</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <DirectionIcon direction="up" />
              <div className="absolute text-[14px] text-[#8F8F92] left-6 top-[-4px] w-20">
                <span>{end_point} 방향</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        {/* 섹션 렌더링 */}
        <div className="flex-1 overflow-y-auto divide-y">
          {forward.sections.map((item, index) => {
            return (
              <Section
                key={index}
                startPoint={item.start_name}
                endPoint={item.end_name}
                distance={item.distance}
                status={item.status}
                time={item.travel_time}
                isLast={index === forward.sections.length - 1}
              />
            );
          })}
        </div>

        {/* 범례 */}
        <div className="flex gap-4 p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <div
              className="w-12 h-1"
              style={{ backgroundColor: "#03bd41" }}
            ></div>
            <span>원활</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-12 h-1"
              style={{ backgroundColor: "#ffac00" }}
            ></div>
            <span>서행</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-12 h-1"
              style={{ backgroundColor: "#d80f17" }}
            ></div>
            <span>정체</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrafficDashboard;
