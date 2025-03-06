**고속도로 교통상황 서비스 v0.1.0**

***

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

## 4. 컴포넌트 아키텍처: Container와 Presentational 패턴

이 프로젝트는 React의 Container/Presentational 패턴을 적용하여 관심사 분리와 재사용성을 높였습니다. 이 패턴은 컴포넌트를 두 가지 유형으로 분리합니다:

### 4.1 Container 컴포넌트

Container 컴포넌트는 "어떻게 동작하는지"에 집중합니다:

- 데이터 페칭 및 상태 관리
- 비즈니스 로직 처리
- 이벤트 핸들러 정의
- Presentational 컴포넌트에 데이터와 콜백 전달

**주요 Container 컴포넌트:**

- `Container`: 애플리케이션의 핵심 컨테이너로, API 호출, WebSocket 연결, 데이터 처리, 상태 관리를 담당합니다.
- `HighwayProvider`: 고속도로 데이터를 관리하고 하위 컴포넌트에 제공합니다.
- `ModalProvider`: 모달 상태와 컨텐츠를 관리합니다.

### 4.2 Presentational 컴포넌트

Presentational 컴포넌트는 "어떻게 보이는지"에 집중합니다:

- UI 렌더링에 집중
- 자체 상태를 최소화(UI 상태만 관리)
- props를 통해 데이터와 콜백 함수 수신
- 스타일링과 시각적 표현 담당

**Presentational 컴포넌트:**

1. `TrafficDashboard`: 고속도로 구간별 교통 상황을 시각화합니다.

- 상행/하행 방향 구분
- 구간별 교통 상태 표시 (원활/서행/정체)
- 구간별 소요 시간 표시

2. `DirectionTabs`: 사고 및 통제 정보를 방향별로 표시합니다.

- 상행/하행 방향 탭 전환
- 사고 및 통제 정보 목록 표시

3. `SearchModal`: 고속도로 검색 인터페이스를 제공합니다.

- 고속도로 목록 표시
- 검색어 기반 필터링

4. `Header`: 현재 선택된 고속도로 정보와 검색 버튼을 표시합니다.

- 고속도로 이름 및 ID 표시
- 검색 모달 열기 버튼

5. `TravelItem`: 고속도로 사고 상황을 표시합니다.

- 고속 도로 사고 데이터 표시

6. `Button`: 다양한 스타일과 크기의 버튼 컴포넌트

- variant, size, width, icon 등 다양한 props를 통한 커스터마이징
- 로딩 상태 및 비활성화 상태 지원

7. `Input` 컴포넌트 시리즈:

- `BaseInput`: 기본 입력 필드 컴포넌트
- `BasicInput`: 일반 텍스트 입력용 컴포넌트
- `SearchInput`: 검색 기능에 특화된 입력 컴포넌트

8. `List`: 데이터 목록을 표시하는 범용 컴포넌트

- 아이템 렌더링을 위한 children 함수 패턴 사용
- 스크롤 및 스타일링 옵션 제공

9. `Tabs`: 탭 전환 인터페이스 제공

- 활성 탭 상태 관리
- 탭 전환 이벤트 처리

10. `AlertModalHeader`: 사고 현황 모달의 헤더 부분

11. `AlertModalContent`: 사고 현황 모달의 내용 부분

### 4.3 컴포넌트 설계 원칙

- **단일 책임 원칙**: 각 컴포넌트는 하나의 책임만 가짐
- **Props를 통한 구성**: 컴포넌트 동작과 외관은 props로 제어
- **내부 상태 최소화**: UI 상태만 내부적으로 관리하고 데이터는 props로 전달받음
- **재사용성 극대화**: 특정 비즈니스 로직에 종속되지 않는 범용적 설계

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

## 10. 배포 환경

- `rsync -avz --exclude='node_modules' --exclude='.env.local' --exclude='.next' --exclude='.git' .  ubuntu@3.36.200.143:~/mlff__front` 프로젝트 코드를 AWS로 복사합니다.
- `ssh ubuntu@3.36.200.143` 접근
- AWS의 root에서 `bash deploy.sh` 실행합니다.
- Docker 컨테이너화 지원 (Dockerfile 및 docker-compose.yml 포함)
- 환경 변수를 통한 설정 관리 (.env 파일)
