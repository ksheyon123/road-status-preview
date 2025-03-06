/**
 * index.ts
 *
 * 고속도로 교통 정보 관련 타입 정의 파일입니다.
 * 고속도로, 경로, 구간, 실시간 교통, 사고 정보 등의 타입을 정의합니다.
 */

/**
 * 고속도로 정보 타입
 *
 * @typedef {Object} HighwayInfo
 * @property {Array<Object>} highways - 고속도로 목록
 * @property {string} highways[].route_display_id - 표시용 고속도로 ID (예: 1, 10, 15)
 * @property {string} highways[].route_id - 내부 식별용 고속도로 ID
 * @property {string} highways[].route_name - 고속도로 이름 (예: 경부, 서해안)
 * @property {string} highways[].start_point - 고속도로 시작점 (예: 서울)
 * @property {string} highways[].end_point - 고속도로 종점 (예: 부산)
 * @property {number} highways[].distance - 고속도로 총 거리 (km)
 */
export type HighwayInfo = {
  highways: {
    route_display_id: string;
    route_id: string;
    route_name: string;
    start_point: string;
    end_point: string;
    distance: number;
  }[];
};

/**
 * 경로 정보 타입
 *
 * @typedef {Object} RouteInfo
 * @property {string} route_id - 고속도로 ID
 * @property {string} route_name - 고속도로 이름
 * @property {string} start_point - 시작점
 * @property {string} end_point - 종점
 * @property {string} updated_at - 업데이트 시간
 * @property {Object} directions - 방향별 구간 정보
 * @property {Object} directions.forward - 정방향(상행) 구간 정보
 * @property {Array<SectionInfo>} directions.forward.sections - 정방향 구간 목록
 * @property {Object} directions.reverse - 역방향(하행) 구간 정보
 * @property {Array<SectionInfo>} directions.reverse.sections - 역방향 구간 목록
 */
export type RouteInfo = {
  route_id: string;
  route_name: string;
  start_point: string;
  end_point: string;
  updated_at: string;
  directions: {
    forward: {
      sections: SectionInfo[];
    };
    reverse: {
      sections: SectionInfo[];
    };
  };
};

/**
 * 구간 정보 타입
 *
 * @typedef {Object} SectionInfo
 * @property {string} section_id - 구간 ID
 * @property {string} start_name - 구간 시작점
 * @property {string} end_name - 구간 종점
 * @property {number} distance - 구간 거리 (km)
 * @property {number} order_num - 구간 순서
 * @property {"SMOOTH" | "SLOW" | "CONGESTED"} status - 교통 상태 (원활/서행/정체)
 * @property {number} travel_time - 소요 시간 (초)
 * @property {number} speed - 평균 속도 (km/h)
 * @property {boolean} [hasAccident] - 사고 발생 여부
 */
export type SectionInfo = {
  section_id: string;
  start_name: string;
  end_name: string;
  distance: number;
  order_num: number;
  status: "SMOOTH" | "SLOW" | "CONGESTED";
  travel_time: number;
  speed: number;
  hasAccident?: boolean;
};

/**
 * 실시간 교통 정보 타입
 *
 * @typedef {Object} RealTimeTraffic
 * @property {string} conzone_id - 구간 ID
 * @property {"SMOOTH" | "SLOW" | "CONGESTED"} congestion - 교통 상태 (원활/서행/정체)
 * @property {number} travel_time - 소요 시간 (초)
 */
export type RealTimeTraffic = {
  conzone_id: string;
  congestion: "SMOOTH" | "SLOW" | "CONGESTED";
  travel_time: number;
};

/**
 * 사고 정보 타입
 *
 * @typedef {Object} AccidentInfo
 * @property {Array<Object>} accidents - 사고 목록
 * @property {string} accidents[].occurred_at - 발생 시간
 * @property {string} accidents[].route_id - 고속도로 ID
 * @property {string} accidents[].direction - 방향
 * @property {string} accidents[].accident_type - 사고 유형
 * @property {string} accidents[].accident_detail_type - 사고 상세 유형
 * @property {string} accidents[].description - 설명
 * @property {Object} accidents[].coordinates - 좌표
 * @property {number} accidents[].coordinates.x - X 좌표
 * @property {number} accidents[].coordinates.y - Y 좌표
 * @property {string} accidents[].conzone_id - 구간 ID
 * @property {string} accidents[].cleared_at - 해소 시간
 * @property {string} accidents[].start_name - 시작점
 * @property {string} accidents[].end_name - 종점
 */
export type AccidentInfo = {
  accidents: {
    occurred_at: string;
    route_id: string;
    direction: string;
    accident_type: string;
    accident_detail_type: string;
    description: string;
    coordinates: {
      x: number;
      y: number;
    };
    conzone_id: string;
    cleared_at: string;
    start_name: string;
    end_name: string;
  }[];
};
