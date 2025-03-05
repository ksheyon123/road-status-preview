# 고속도로 교통상황 서비스 프로젝트 정리 문서

## 1. 프로젝트 개요

이 프로젝트는 실시간으로 고속도로 교통 상황을 모니터링하고 표시하는 웹 애플리케이션입니다. 사용자는 다양한 고속도로의 교통 흐름, 사고 정보, 통제 상황 등을 확인할 수 있습니다.

### 주요 기능

- 실시간 고속도로 교통 상황 모니터링
- 고속도로별 상행/하행 구간 교통 정보 표시
- 사고 및 통제 정보 확인
- 고속도로 검색 기능
- 실시간 데이터 업데이트 (WebSocket 연결)

## 2. 기술 스택

- **프론트엔드**: Next.js 14.2.23, React 18.3.1, TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Context API
- **실시간 통신**: STOMP over WebSocket (SockJS)
- **HTTP 클라이언트**: 자체 구현 Fetch 래퍼
- **테스트**: Jest, React Testing Library

## 3. 프로젝트 구조

```
src/
├── assets/            # 이미지 등 정적 자산
├── components/        # 재사용 가능한 UI 컴포넌트
├── constants/         # 상수 정의
├── contexts/          # React Context 정의
├── hooks/             # 커스텀 React Hooks
├── https/             # HTTP 클라이언트 및 API 호출
├── pages/             # Next.js 페이지 컴포넌트
├── styles/            # 전역 스타일
├── types/             # TypeScript 타입 정의
└── utils/             # 유틸리티 함수
```

## 4. 핵심 컴포넌트 및 기능

### 4.1 컨테이너 (Container)

`Container` 컴포넌트는 애플리케이션의 핵심 컴포넌트로, 다음과 같은 역할을 수행합니다:

- 고속도로 경로 및 사고 데이터 가져오기
- WebSocket을 통한 실시간 데이터 구독
- 데이터 처리 및 가공
- 탭 관리 (전체구간/사고.통제)
- 모달 관리

### 4.2 교통 대시보드 (TrafficDashboard)

`TrafficDashboard` 컴포넌트는 고속도로의 전체 구간에 대한 교통 상황을 시각적으로 표시합니다:

- 상행/하행 방향 구분
- 구간별 교통 상태 표시 (원활/서행/정체)
- 구간별 소요 시간 표시
- 사고 발생 표시 및 상세 정보 모달 연결

### 4.3 방향 탭 (DirectionTabs)

`DirectionTabs` 컴포넌트는 사고 및 통제 정보를 방향별로 표시합니다:

- 상행/하행 방향 탭 전환
- 사고 및 통제 정보 목록 표시
- 사고 상세 정보 표시 (구간, 유형, 내용, 발생 시간 등)

### 4.4 검색 모달 (SearchModal)

`SearchModal` 컴포넌트는 고속도로 검색 기능을 제공합니다:

- 고속도로 목록 표시
- 검색어 기반 필터링
- 고속도로 선택 시 해당 고속도로로 전환

### 4.5 헤더 (Header)

`Header` 컴포넌트는 현재 선택된 고속도로 정보와 검색 버튼을 표시합니다:

- 고속도로 이름 및 ID 표시
- 검색 모달 열기 버튼

## 5. 데이터 흐름

### 5.1 API 데이터 흐름

1. `Container` 컴포넌트에서 `getHighways`, `getRoutes`, `getAccidents` API 호출
2. 받아온 데이터를 상태로 저장
3. `processRouteData`, `processAccidentData` 등의 유틸리티 함수로 데이터 가공
4. 가공된 데이터를 하위 컴포넌트에 전달

### 5.2 실시간 데이터 흐름

1. `Container` 컴포넌트에서 STOMP 클라이언트 생성 및 연결
2. `/topic/accident-{route_id}`, `/topic/traffic-{route_id}` 주제 구독
3. 실시간 데이터 수신 시 상태 업데이트
4. 업데이트된 데이터를 하위 컴포넌트에 전달

### 5.3 상태 관리

- `HighwayContext`: 고속도로 목록 및 현재 선택된 고속도로 관리
- `ModalContext`: 모달 상태 및 컨텐츠 관리
- 컴포넌트 로컬 상태: 탭 상태, 필터링된 데이터 등

## 6. 데이터 모델

### 6.1 고속도로 정보 (HighwayInfo)

```typescript
type HighwayInfo = {
  highways: {
    route_display_id: string; // 표시용 ID (예: 1, 10, 15)
    route_id: string; // 내부 식별자
    route_name: string; // 고속도로 이름 (예: 경부, 서해안)
    start_point: string; // 시작점 (예: 서울)
    end_point: string; // 종점 (예: 부산)
    distance: number; // 총 거리 (km)
  }[];
};
```

### 6.2 경로 정보 (RouteInfo)

```typescript
type RouteInfo = {
  route_id: string;
  route_name: string;
  start_point: string;
  end_point: string;
  updated_at: string;
  directions: {
    forward: {
      sections: SectionInfo[]; // 상행 구간 정보
    };
    reverse: {
      sections: SectionInfo[]; // 하행 구간 정보
    };
  };
};
```

### 6.3 구간 정보 (SectionInfo)

```typescript
type SectionInfo = {
  section_id: string;
  start_name: string; // 구간 시작점
  end_name: string; // 구간 종점
  distance: number; // 구간 거리 (km)
  order_num: number; // 구간 순서
  status: "SMOOTH" | "SLOW" | "CONGESTED"; // 교통 상태
  travel_time: number; // 소요 시간 (초)
  speed: number; // 평균 속도 (km/h)
  hasAccident?: boolean; // 사고 발생 여부
};
```

### 6.4 실시간 교통 정보 (RealTimeTraffic)

```typescript
type RealTimeTraffic = {
  conzone_id: string; // 구간 ID
  congestion: "SMOOTH" | "SLOW" | "CONGESTED"; // 교통 상태
  travel_time: number; // 소요 시간 (초)
};
```

### 6.5 사고 정보 (AccidentInfo)

```typescript
type AccidentInfo = {
  accidents: {
    occurred_at: string; // 발생 시간
    route_id: string; // 고속도로 ID
    direction: string; // 방향
    accident_type: string; // 사고 유형
    accident_detail_type: string; // 사고 상세 유형
    description: string; // 설명
    coordinates: {
      // 좌표
      x: number;
      y: number;
    };
    conzone_id: string; // 구간 ID
    cleared_at: string; // 해소 시간
    start_name: string; // 시작점
    end_name: string; // 종점
  }[];
};
```

## 7. 주요 유틸리티 함수

### 7.1 데이터 처리 함수

- `processAccidentData`: 사고 데이터에 경로 정보 추가
- `updateSectionsWithAccidents`: 섹션에 사고 발생 여부 표시
- `updateSectionsWithRealTime`: 실시간 데이터로 섹션 정보 업데이트
- `processRouteData`: 경로 데이터 가공
- `processRealTimeRouteData`: 실시간 데이터로 경로 정보 업데이트

## 8. HTTP 클라이언트

프로젝트는 Fetch API를 래핑한 자체 HTTP 클라이언트를 사용합니다:

- 기본 타임아웃 및 헤더 설정
- 에러 처리 및 응답 파싱
- HTTP 메서드별 편의 함수 (get, post, put, del, patch)

## 9. 실시간 통신

STOMP over WebSocket을 사용하여 실시간 데이터를 수신합니다:

- SockJS를 통한 WebSocket 연결
- 고속도로 ID 기반 주제 구독
- 사고 및 교통 정보 실시간 업데이트

## 10. UI 컴포넌트

### 10.1 기본 컴포넌트

- `Button`: 다양한 스타일과 크기의 버튼 컴포넌트
- `BaseInput`, `BasicInput`, `SearchInput`: 입력 필드 컴포넌트
- `List`: 목록 표시 컴포넌트
- `Tabs`: 탭 전환 컴포넌트

### 10.2 모달 컴포넌트

- `SearchModal`: 고속도로 검색 모달
- `AlertModalHeader`: 알림 모달 헤더
- `AlertModalContent`: 알림 모달 내용

## 11. 배포 환경

- Docker 컨테이너화 지원 (Dockerfile 및 docker-compose.yml 포함)
- 환경 변수를 통한 설정 관리 (.env 파일)
