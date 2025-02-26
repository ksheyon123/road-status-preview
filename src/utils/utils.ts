import { AccidentInfo, RouteInfo, SectionInfo } from "@/types/index";

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

/**
 * 경로 데이터를 가공하는 함수
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
