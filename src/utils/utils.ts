import {
  AccidentInfo,
  RealTimeTraffic,
  RouteInfo,
  SectionInfo,
} from "@/types/index";

/**
 * 사고 데이터에 경로 정보를 추가하는 함수
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
 * @description 경로 데이터를 가공하는 함수
 * @param routeData 기본 Route Data
 * @param accidents Route Data에 추가할 Accidents
 * @param startPoint 고속도로 시작 지점
 * @param endPoint 고속도로 끝 지점
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
