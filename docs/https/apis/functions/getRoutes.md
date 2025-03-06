[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [https/apis](../README.md) / getRoutes

# Function: getRoutes()

> **getRoutes**(`id`): `Promise`\<[`ApiResponse`](../../../types/https/interfaces/ApiResponse.md)\<[`RouteInfo`](../../../types/type-aliases/RouteInfo.md)\>\>

Defined in: [src/https/apis.ts:31](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/https/apis.ts#L31)

특정 고속도로의 경로 정보를 가져옵니다.

## Parameters

### id

`string`

고속도로 ID

## Returns

`Promise`\<[`ApiResponse`](../../../types/https/interfaces/ApiResponse.md)\<[`RouteInfo`](../../../types/type-aliases/RouteInfo.md)\>\>

경로 정보를 담은 Promise 객체

## Throws

API 요청이 실패할 경우 에러를 던집니다.
