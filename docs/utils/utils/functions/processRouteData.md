[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [utils/utils](../README.md) / processRouteData

# Function: processRouteData()

> **processRouteData**(`routeData`, `accidents`, `startPoint`, `endPoint`): [`RouteInfo`](../../../types/type-aliases/RouteInfo.md) & `object`

Defined in: [src/utils/utils.ts:127](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/utils/utils.ts#L127)

경로 데이터를 가공하는 함수

기본 경로 데이터에 사고 정보와 시작/종료 지점 정보를 추가합니다.
정방향과 역방향 모두에 사고 정보를 업데이트합니다.

## Parameters

### routeData

[`RouteInfo`](../../../types/type-aliases/RouteInfo.md)

기본 경로 데이터

### accidents

`object`[]

경로 데이터에 추가할 사고 정보

### startPoint

`string`

고속도로 시작 지점 이름

### endPoint

`string`

고속도로 끝 지점 이름

## Returns

[`RouteInfo`](../../../types/type-aliases/RouteInfo.md) & `object`

사고 정보와 시작/종료 지점이 추가된 경로 데이터
