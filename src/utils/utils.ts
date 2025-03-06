/**
 * utils.ts
 *
 * 고속도로 데이터 처리를 위한 유틸리티 함수들을 제공합니다.
 * 사고 정보, 실시간 교통 정보, 경로 정보 등을 가공하고 처리하는 함수들이 포함되어 있습니다.
 */

import {
  AccidentInfo,
  RealTimeTraffic,
  RouteInfo,
  SectionInfo,
} from "@/types/index";

/**
 * 사고 데이터에 경로 정보를 추가하는 함수
 *
 * 사고 데이터에 해당 사고가 발생한 구간의 시작점과 끝점 정보를 추가합니다.
 * 정방향(forward)과 역방향(reverse) 섹션 정보를 확인하여 일치하는 구간 정보를 찾습니다.
 *
 * @param accidents - 사고 정보 배열
 * @param forward - 정방향 구간 정보 배열
 * @param reverse - 역방향 구간 정보 배열
 * @returns 시작점과 끝점 정보가 추가된 사고 정보 배열
 */
export const processAccidentData = (
  accidents: AccidentInfo["accidents"],
  forward: SectionInfo[],
  reverse: SectionInfo[]
): AccidentInfo["accidents"] => {
  return accidents.map((accident) => {
    const { conzone_id } = accident;
    const filteredForwardSection = forward.filter(
      (el) => el.section_id === conzone_id
    )[0];

    const filteredReverseSection = reverse.filter(
      (el) => el.section_id === conzone_id
    )[0];

    if (!!filteredForwardSection) {
      const { start_name, end_name } = filteredForwardSection;
      return {
        ...accident,
        start_name,
        end_name,
      };
    } else if (!!filteredReverseSection) {
      const { start_name, end_name } = filteredReverseSection;
      return {
        ...accident,
        start_name,
        end_name,
      };
    } else {
      return {
        ...accident,
      };
    }
  });
};

/**
 * 섹션에 사고 발생 여부를 표시하는 함수
 *
 * 각 구간(섹션)에 사고 발생 여부를 표시하는 hasAccident 속성을 추가합니다.
 * 사고 정보와 구간 ID를 비교하여 해당 구간에 사고가 있는지 확인합니다.
 *
 * @param sections - 구간 정보 배열
 * @param accidents - 사고 정보 배열
 * @returns 사고 발생 여부가 표시된 구간 정보 배열
 */
export const updateSectionsWithAccidents = (
  sections: SectionInfo[],
  accidents: AccidentInfo["accidents"]
): SectionInfo[] => {
  return sections.map((section) => {
    const hasAccident = !!accidents.find(
      (accident) => accident.conzone_id === section.section_id
    );
    return {
      ...section,
      hasAccident,
    };
  });
};

/**
 * 실시간 교통 정보를 섹션에 추가하는 함수
 *
 * 각 구간(섹션)에 실시간 교통 정보(혼잡도, 이동 시간)를 추가합니다.
 * 실시간 데이터와 구간 ID를 비교하여 해당 구간의 교통 정보를 업데이트합니다.
 *
 * @param sections - 구간 정보 배열
 * @param realtimeData - 실시간 교통 정보 배열
 * @returns 실시간 교통 정보가 추가된 구간 정보 배열
 */
export const updateSectionsWithRealTime = (
  sections: SectionInfo[],
  realtimeData: RealTimeTraffic[]
): SectionInfo[] => {
  return sections.map((section) => {
    const data = realtimeData.find((d) => d.conzone_id === section.section_id)!;
    if (!data) return section;
    const { conzone_id, congestion, travel_time } = data;
    return {
      ...section,
      section_id: conzone_id,
      status: congestion,
      travel_time,
    };
  });
};

/**
 * 경로 데이터를 가공하는 함수
 *
 * 기본 경로 데이터에 사고 정보와 시작/종료 지점 정보를 추가합니다.
 * 정방향과 역방향 모두에 사고 정보를 업데이트합니다.
 *
 * @param routeData - 기본 경로 데이터
 * @param accidents - 경로 데이터에 추가할 사고 정보
 * @param startPoint - 고속도로 시작 지점 이름
 * @param endPoint - 고속도로 끝 지점 이름
 * @returns 사고 정보와 시작/종료 지점이 추가된 경로 데이터
 */
export const processRouteData = (
  routeData: RouteInfo,
  accidents: AccidentInfo["accidents"],
  startPoint: string,
  endPoint: string
): RouteInfo & { from: string; to: string } => {
  return {
    ...routeData,
    directions: {
      forward: {
        sections: updateSectionsWithAccidents(
          routeData.directions.forward.sections,
          accidents
        ),
      },
      reverse: {
        sections: updateSectionsWithAccidents(
          routeData.directions.reverse.sections,
          accidents
        ),
      },
    },
    from: startPoint,
    to: endPoint,
  };
};

/**
 * 실시간 교통 정보를 경로 데이터에 추가하는 함수
 *
 * 경로 데이터에 실시간 교통 정보를 추가합니다.
 * 정방향과 역방향 모두에 실시간 교통 정보를 업데이트합니다.
 *
 * @param routeData - 기본 경로 데이터 (시작/종료 지점 포함)
 * @param realtimeData - 실시간 교통 정보 배열
 * @returns 실시간 교통 정보가 추가된 경로 데이터
 */
export const processRealTimeRouteData = (
  routeData: RouteInfo & { from: string; to: string },
  realtimeData: RealTimeTraffic[]
) => {
  return {
    ...routeData,
    directions: {
      forward: {
        sections: updateSectionsWithRealTime(
          routeData.directions.forward.sections,
          realtimeData
        ),
      },
      reverse: {
        sections: updateSectionsWithRealTime(
          routeData.directions.reverse.sections,
          realtimeData
        ),
      },
    },
  };
};
