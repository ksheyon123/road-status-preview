/**
 * TrafficDashboard.tsx
 *
 * 고속도로 교통 상황을 시각적으로 표시하는 대시보드 컴포넌트입니다.
 * 상행/하행 방향의 구간별 교통 상태, 소요 시간, 사고 정보 등을 표시합니다.
 */

import React from "react";
import { RouteInfo, SectionInfo } from "@/types/index";
import ic_direction_up from "@/assets/images/up.png";
import ic_direction_down from "@/assets/images/down.png";
import ic_right_arrow_small from "@/assets/images/arrows_button_right__arrow_small.png";
import ic_warning_sign from "@/assets/images/warning-sign.png";

/**
 * 상태에 따른 색상 반환 함수
 *
 * @param {string} status - 교통 상태 ("SMOOTH", "SLOW", "CONGESTED")
 * @returns {string} 상태에 해당하는 색상 코드
 */
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

/**
 * 방향 아이콘 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.direction - 방향 ("up" 또는 "down")
 * @returns {JSX.Element} 방향 아이콘 JSX 요소
 */
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

/**
 * 원형 방향 아이콘 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.status - 교통 상태
 * @param {"up" | "down"} props.direction - 방향
 * @returns {JSX.Element} 원형 방향 아이콘 JSX 요소
 */
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
      className="w-4 h-4"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="10.25"
        fill={getStatusColor(status)}
        stroke={getStatusColor(status)}
        strokeLinejoin="round"
        // strokeWidth="1.5"
      />
      <path
        fill="#fff"
        transform={direction === "up" ? "rotate(180 11 11)" : ""}
        d="M11.536 6.415a.611.611 0 0 0-1.072 0l-4.123 7.51a.611.611 0 0 0 .768.86L11 13.186l3.891 1.599a.611.611 0 0 0 .768-.86z"
      />
    </svg>
  );
};

/**
 * 교통 상태 막대 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.time - 소요 시간 (초)
 * @param {"SMOOTH" | "SLOW" | "CONGESTED"} props.status - 교통 상태
 * @param {string} props.sectionId - 구간 ID
 * @param {boolean} [props.hasAccident] - 사고 발생 여부
 * @param {Function} [props.openModal] - 모달 열기 함수
 * @returns {JSX.Element} 교통 상태 막대 JSX 요소
 */
const TrafficBar = ({
  time,
  status,
  sectionId,
  hasAccident,
  openModal,
}: {
  time: number;
  status: "SMOOTH" | "SLOW" | "CONGESTED";
  sectionId: string;
  hasAccident?: boolean;
  openModal?: Function;
}) => {
  const convertTime = (time: number) => {
    const min = Math.floor(time / 60);
    const seconds = time % 60;
    if (min === 0) {
      return `1분 미만`;
    }
    return `약 ${min}분 ${seconds}초`;
  };
  return (
    <div className="h-full w-full flex items-center justify-center">
      {/* 상태 및 시간 막대 */}
      <div className="relative h-[46px] w-2 bg-[#939396]">
        <div className="relative h-[64px] top-[-8px] w-full">
          <div
            style={{
              height: "100%",
              backgroundColor: getStatusColor(status),
            }}
          />

          {/* 경고 아이콘 */}
          {hasAccident && (
            <div
              className="absolute z-[5] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 "
              onClick={() => {
                if (!!openModal) openModal(sectionId);
              }}
            >
              <img
                src={ic_warning_sign.src}
                alt="warning"
                className="w-full h-full cursor-pointer"
              />
            </div>
          )}

          {/* 상태 및 시간 텍스트 */}
          <div className="absolute top-[16px] left-0 w-[120px] flex flex-col pl-6">
            <span
              className="text-xs font-bold"
              style={{ color: getStatusColor(status) }}
            >
              {status === "CONGESTED"
                ? "정체"
                : status === "SLOW"
                ? "서행"
                : "원활"}
            </span>
            <span className="text-xs text-[#77777a]">{convertTime(time)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 구간 컴포넌트 props 인터페이스
 *
 * @interface SectionProps
 * @property {string} startPoint - 구간 시작점
 * @property {string} endPoint - 구간 종점
 * @property {number} distance - 구간 거리 (km)
 * @property {Omit<SectionInfo, "start_name" & "end_name" & "distance">} forward - 정방향 구간 정보
 * @property {Omit<SectionInfo, "start_name" & "end_name" & "distance">} reverse - 역방향 구간 정보
 * @property {boolean} [isLast] - 마지막 구간 여부
 * @property {Function} [onClick] - 클릭 이벤트 핸들러
 * @property {Function} [openModal] - 모달 열기 함수
 */
interface SectionProps {
  startPoint: string;
  endPoint: string;
  distance: number;
  forward: Omit<SectionInfo, "start_name" & "end_name" & "distance">;
  reverse: Omit<SectionInfo, "start_name" & "end_name" & "distance">;
  isLast?: boolean;
  onClick?: Function;
  openModal?: Function;
}

/**
 * 구간 컴포넌트
 *
 * @param {SectionProps} props - 컴포넌트 props
 * @returns {JSX.Element} 구간 JSX 요소
 */
const Section = (props: SectionProps) => {
  const {
    startPoint,
    endPoint,
    distance,
    isLast = false,
    onClick,
    forward,
    reverse,
    openModal,
  } = props;
  const {
    status: forwardStatus,
    travel_time: forwardTime,
    section_id: forwardSectionId,
    hasAccident: forwardHasAccident,
  } = forward;
  const {
    status: reverseStatus,
    travel_time: reverseTime,
    section_id: reverseSectionId,
    hasAccident: reverseHasAccident,
  } = reverse;
  return (
    <div className="w-full">
      <div className="h-8 bg-white grid grid-cols-4 items-center">
        <div className="pl-4 text-[#777779] font-bold text-[10px]">
          {startPoint}
        </div>
        <div className="flex justify-center">
          <CircleDirectionIcon status={forwardStatus} direction="up" />
        </div>
        <div className="flex justify-center">
          <CircleDirectionIcon status={reverseStatus} direction="down" />
        </div>
        <div></div>
      </div>

      <div className="h-[46px] bg-gray-100 grid grid-cols-4 items-center">
        <div className="flex items-center pl-4 text-[#777779] text-[10px]">
          <span>{distance}km</span>
          {/* <img
            className="w-[5px] h-[8px] ml-2 cursor-pointer"
            onClick={() => {
              if (!!onClick) {
                onClick("구간상세");
              }
            }}
            src={ic_right_arrow_small.src}
            alt="right_arrow_small"
          /> */}
        </div>
        <div className="w-full h-full">
          <TrafficBar
            time={forwardTime}
            status={forwardStatus}
            sectionId={forwardSectionId}
            hasAccident={forwardHasAccident}
            openModal={openModal}
          />
        </div>
        <div className="w-full h-full">
          <TrafficBar
            time={reverseTime}
            status={reverseStatus}
            sectionId={reverseSectionId}
            hasAccident={reverseHasAccident}
            openModal={openModal}
          />
        </div>
        <div className="w-full h-full"></div>
      </div>

      {isLast && (
        <div className="h-8 bg-white grid grid-cols-4 items-center">
          <div className="pl-4 text-[10px] text-[#777779] font-bold">
            {endPoint}
          </div>
          <div className="flex justify-center">
            <CircleDirectionIcon status={forwardStatus} direction="up" />
          </div>
          <div className="flex justify-center">
            <CircleDirectionIcon status={reverseStatus} direction="down" />
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

/**
 * 교통 대시보드 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {RouteInfo & { from: string; to: string }} props.data - 경로 데이터
 * @param {Function} props.onClickDetail - 상세 정보 클릭 핸들러
 * @param {Function} [props.openModal] - 모달 열기 함수
 * @returns {JSX.Element} 교통 대시보드 JSX 요소
 */
const TrafficDashboard = (props: {
  data: RouteInfo & { from: string; to: string };
  onClickDetail: Function;
  openModal?: Function;
}) => {
  const { data, onClickDetail, openModal } = props;
  const { from, to } = data;
  /**
   * 정방향과 역방향 구간을 매칭하는 함수
   *
   * @param {RouteInfo} param0 - 경로 정보
   * @returns {Array<Object>} 매칭된 구간 배열
   */
  function matchSections({ directions }: RouteInfo) {
    const { forward, reverse } = directions;

    // 매칭된 구간들을 저장할 배열
    const matchedSections: any[] = [];

    // 정방향 구간을 기준으로 순회
    forward.sections.forEach((forwardSection) => {
      // 역방향에서 매칭되는 구간 찾기
      const reverseSection = reverse.sections.find((revSection) => {
        // 시작점과 끝점이 반대로 매칭되는지 확인
        return (
          forwardSection.start_name === revSection.end_name &&
          forwardSection.end_name === revSection.start_name
        );
      });

      if (reverseSection) {
        matchedSections.push({
          start_name: forwardSection.start_name,
          end_name: forwardSection.end_name,
          distance: forwardSection.distance,
          forward: {
            section_id: forwardSection.section_id,
            conzone_id: forwardSection.section_id,
            hasAccident: forwardSection.hasAccident,
            speed: forwardSection.speed,
            status: forwardSection.status,
            travel_time: forwardSection.travel_time,
          },
          reverse: {
            section_id: reverseSection.section_id,
            conzone_id: reverseSection.section_id,
            hasAccident: reverseSection.hasAccident,
            speed: reverseSection.speed,
            status: reverseSection.status,
            travel_time: reverseSection.travel_time,
          },
        });
      }
    });

    return matchedSections;
  }

  const matchedSections = matchSections(data);
  return (
    <>
      <div className="flex flex-col w-screen min-w-[600px] mx-auto bg-gray-50">
        <div className="h-[30px] bg-[#F5F5F8] grid grid-cols-4 items-center border-b">
          <div className="pl-4"></div>
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <DirectionIcon direction="down" />
              <div className="absolute text-[12px] text-[#8F8F92] left-8 top-[-2px] w-32">
                <span>{from} 방향</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <DirectionIcon direction="up" />
              <div className="absolute text-[12px] text-[#8F8F92] left-8 top-[-2px] w-32">
                <span>{to} 방향</span>
              </div>
            </div>
          </div>
        </div>

        {/* 섹션 렌더링 */}
        <div className="flex-1 overflow-y-auto divide-y">
          {matchedSections.map((item, index) => {
            return (
              <Section
                key={index}
                startPoint={item.start_name}
                endPoint={item.end_name}
                distance={item.distance}
                forward={item.forward}
                reverse={item.reverse}
                isLast={index === matchedSections.length - 1}
                onClick={onClickDetail}
                openModal={openModal}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrafficDashboard;
