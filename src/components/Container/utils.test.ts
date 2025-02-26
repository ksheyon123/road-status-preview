import {
  processAccidentData,
  updateSectionsWithAccidents,
  processRouteData,
} from "./utils";
import { AccidentInfo, RouteInfo, SectionInfo } from "@/types/index";

describe("Container 유틸리티 함수", () => {
  // 테스트용 더미 데이터
  const mockAccidents: AccidentInfo["accidents"] = [
    {
      occurred_at: "2025-02-26T09:00:00",
      route_id: "0010",
      direction: "forward",
      accident_type: "사고",
      accident_detail_type: "추돌사고",
      description: "차량 2대 추돌",
      coordinates: { x: 127.1, y: 37.5 },
      conzone_id: "section1",
      cleared_at: "-",
      start_name: "",
      end_name: "",
    },
    {
      occurred_at: "2025-02-26T08:30:00",
      route_id: "0010",
      direction: "reverse",
      accident_type: "공사",
      accident_detail_type: "도로보수",
      description: "도로 보수 공사",
      coordinates: { x: 127.2, y: 37.6 },
      conzone_id: "section3",
      cleared_at: "2025-02-26T10:30:00",
      start_name: "",
      end_name: "",
    },
  ];

  const mockForwardSections: SectionInfo[] = [
    {
      section_id: "section1",
      start_name: "서울",
      end_name: "안양",
      distance: 20,
      order_num: 1,
      status: "SMOOTH",
      travel_time: 15,
      speed: 80,
    },
    {
      section_id: "section2",
      start_name: "안양",
      end_name: "수원",
      distance: 15,
      order_num: 2,
      status: "SLOW",
      travel_time: 20,
      speed: 60,
    },
  ];

  const mockReverseSections: SectionInfo[] = [
    {
      section_id: "section3",
      start_name: "수원",
      end_name: "안양",
      distance: 15,
      order_num: 1,
      status: "CONGESTED",
      travel_time: 30,
      speed: 40,
    },
    {
      section_id: "section4",
      start_name: "안양",
      end_name: "서울",
      distance: 20,
      order_num: 2,
      status: "SMOOTH",
      travel_time: 15,
      speed: 80,
    },
  ];

  const mockRouteData: RouteInfo = {
    route_id: "0010",
    route_name: "경부",
    start_point: "서울",
    end_point: "부산",
    updated_at: "2025-02-26T09:30:00",
    directions: {
      forward: {
        sections: mockForwardSections,
      },
      reverse: {
        sections: mockReverseSections,
      },
    },
  };

  describe("processAccidentData", () => {
    it("사고 데이터에 경로 정보를 올바르게 추가한다", () => {
      const result = processAccidentData(
        mockAccidents,
        mockForwardSections,
        mockReverseSections
      );

      // 첫 번째 사고는 forward 방향의 section1에 해당
      expect(result[0].start_name).toBe("서울");
      expect(result[0].end_name).toBe("안양");

      // 두 번째 사고는 reverse 방향의 section3에 해당
      expect(result[1].start_name).toBe("수원");
      expect(result[1].end_name).toBe("안양");
    });

    it("일치하는 섹션이 없는 경우 원본 사고 데이터를 반환한다", () => {
      const unknownAccident = [
        {
          ...mockAccidents[0],
          conzone_id: "unknown_section",
        },
      ];

      const result = processAccidentData(
        unknownAccident,
        mockForwardSections,
        mockReverseSections
      );

      // 일치하는 섹션이 없으므로 원본 데이터 그대로 반환
      expect(result[0].start_name).toBe("");
      expect(result[0].end_name).toBe("");
    });
  });

  describe("updateSectionsWithAccidents", () => {
    it("섹션에 사고 발생 여부를 올바르게 표시한다", () => {
      const result = updateSectionsWithAccidents(
        mockForwardSections,
        mockAccidents
      );

      // section1에는 사고가 있음
      expect(result[0].hasAccident).toBe(true);

      // section2에는 사고가 없음
      expect(result[1].hasAccident).toBe(false);
    });

    it("사고가 없는 경우 모든 섹션의 hasAccident가 false로 설정된다", () => {
      const result = updateSectionsWithAccidents(mockForwardSections, []);

      expect(result[0].hasAccident).toBe(false);
      expect(result[1].hasAccident).toBe(false);
    });
  });

  describe("processRouteData", () => {
    it("경로 데이터를 올바르게 가공한다", () => {
      const result = processRouteData(
        mockRouteData,
        mockAccidents,
        "서울",
        "부산"
      );

      // 기본 정보 확인
      expect(result.route_id).toBe("0010");
      expect(result.route_name).toBe("경부");

      // from, to 추가 확인
      expect(result.from).toBe("서울");
      expect(result.to).toBe("부산");

      // 사고 정보 업데이트 확인
      expect(result.directions.forward.sections[0].hasAccident).toBe(true);
      expect(result.directions.forward.sections[1].hasAccident).toBe(false);
      expect(result.directions.reverse.sections[0].hasAccident).toBe(true);
      expect(result.directions.reverse.sections[1].hasAccident).toBe(false);
    });
  });
});
