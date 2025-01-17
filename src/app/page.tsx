import { sections } from "@/constants";
import React from "react";

// 상태에 따른 색상 반환 함수
const getStatusColor = (status: string) => {
  switch (status) {
    case "원활":
      return "#03bd41";
    case "서행":
      return "#ffac00";
    case "정체":
      return "#d80f17";
    default:
      return "#cad1d8";
  }
};

// 방향 아이콘 컴포넌트
const DirectionIcon = ({ direction }: { direction: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <path
        fill="#939396"
        d={
          direction === "down"
            ? "M13.462 19.687a.611.611 0 0 0 1.076 0L19.77 9.98a.611.611 0 0 0-.774-.854L14 11.217l-4.997-2.09a.611.611 0 0 0-.774.853z"
            : "M13.462 8.313a.611.611 0 0 1 1.076 0L19.77 18.02a.611.611 0 0 1-.774.854L14 16.783l-4.997 2.09a.611.611 0 0 1-.774-.853z"
        }
      />
    </svg>
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

// VDS 인터페이스 정의
interface VDS {
  status: string;
  percentage: number;
  time: string;
}

// 수정된 TrafficBar 컴포넌트
const TrafficBar = ({ segments }: { segments: VDS[] }) => {
  // 전체 시간 계산
  const totalTime = segments.reduce((acc, segment) => {
    return acc + parseInt(segment.time);
  }, 0);

  // percentage가 가장 큰 상태 찾기
  const mainStatus = segments.reduce((prev, current) =>
    current.percentage > prev.percentage ? current : prev
  ).status;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative h-12 w-3 bg-[#939396]">
        {/* 상태별 막대 렌더링 */}
        {segments.map((segment, index) => {
          let prevHeight = segments
            .slice(0, index)
            .reduce((acc, s) => acc + s.percentage, 0);

          return (
            <div
              key={index}
              className="absolute left-0 w-3"
              style={{
                top: `${prevHeight}%`,
                height: `${segment.percentage}%`,
                backgroundColor: getStatusColor(segment.status),
              }}
            />
          );
        })}

        {/* 상태 및 시간 텍스트 */}
        <div className="absolute top-[5px] left-0 w-20 h-[30px] flex flex-col pl-6">
          <span
            className="text-sm"
            style={{ color: getStatusColor(mainStatus) }}
          >
            {mainStatus}
          </span>
          <span className="text-sm text-[#77777a]">약 {totalTime}분</span>
        </div>
      </div>
    </div>
  );
};

// Section 컴포넌트 props 인터페이스 업데이트
interface SectionProps {
  name: string;
  distance?: string;
  leftVDS: VDS[];
  rightVDS: VDS[];
  isLast?: boolean;
}

// 수정된 Section 컴포넌트
const Section = ({
  name,
  distance,
  leftVDS,
  rightVDS,
  isLast = false,
}: SectionProps) => {
  // 주요 상태 결정 (가장 높은 비율을 차지하는 상태)
  const getMainStatus = (segments: VDS[]) => {
    return segments.reduce((prev, current) =>
      current.percentage > prev.percentage ? current : prev
    ).status;
  };

  return (
    <div className="w-full">
      <div className="h-8 bg-white grid grid-cols-4 items-center">
        <div className="pl-4 font-medium">{name}</div>
        <div className="flex justify-center">
          <CircleDirectionIcon status={getMainStatus(leftVDS)} direction="up" />
        </div>
        <div className="flex justify-center">
          <CircleDirectionIcon
            status={getMainStatus(rightVDS)}
            direction="down"
          />
        </div>
        <div></div>
      </div>

      {!isLast && (
        <div className="h-12 bg-gray-100 grid grid-cols-4 items-center">
          <div className="pl-4 text-gray-600">{distance}km</div>
          <div className="w-full h-full">
            <TrafficBar segments={leftVDS} />
          </div>
          <div className="w-full h-full">
            <TrafficBar segments={rightVDS} />
          </div>
          <div className="w-full h-full"></div>
        </div>
      )}
    </div>
  );
};

// 메인 컴포넌트
const TrafficDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-50 h-[600px] flex flex-col">
      {/* 헤더 */}
      <div className="h-12 bg-white grid grid-cols-4 items-center border-b">
        <div className="pl-4"></div>
        <div className="flex items-center justify-center gap-2">
          <div className="relative">
            <DirectionIcon direction="down" />
            <div className="absolute left-9 top-1 w-20">
              <span>부산 방향</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="relative">
            <DirectionIcon direction="up" />
            <div className="absolute left-9 top-1 w-20">
              <span>서울 방향</span>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* 섹션 렌더링 */}
      <div className="flex-1 overflow-y-auto divide-y">
        {sections.map((section, index) => (
          <Section
            key={index}
            name={section.name}
            distance={section.distance}
            leftVDS={section.leftVDS}
            rightVDS={section.rightVDS}
            isLast={index === sections.length - 1}
          />
        ))}
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
  );
};

export default TrafficDashboard;
