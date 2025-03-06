[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [utils/utils](../README.md) / processRealTimeRouteData

# Function: processRealTimeRouteData()

> **processRealTimeRouteData**(`routeData`, `realtimeData`): `object`

Defined in: [src/utils/utils.ts:164](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/utils/utils.ts#L164)

실시간 교통 정보를 경로 데이터에 추가하는 함수

경로 데이터에 실시간 교통 정보를 추가합니다.
정방향과 역방향 모두에 실시간 교통 정보를 업데이트합니다.

## Parameters

### routeData

[`RouteInfo`](../../../types/type-aliases/RouteInfo.md) & `object`

기본 경로 데이터 (시작/종료 지점 포함)

### realtimeData

[`RealTimeTraffic`](../../../types/type-aliases/RealTimeTraffic.md)[]

실시간 교통 정보 배열

## Returns

`object`

실시간 교통 정보가 추가된 경로 데이터

### directions

> **directions**: `object`

#### directions.forward

> **forward**: `object`

#### directions.forward.sections

> **sections**: [`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

#### directions.reverse

> **reverse**: `object`

#### directions.reverse.sections

> **sections**: [`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

### end\_point

> **end\_point**: `string`

### from

> **from**: `string`

### route\_id

> **route\_id**: `string`

### route\_name

> **route\_name**: `string`

### start\_point

> **start\_point**: `string`

### to

> **to**: `string`

### updated\_at

> **updated\_at**: `string`
