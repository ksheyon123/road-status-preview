[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [types/https](../README.md) / ApiError

# Class: ApiError

Defined in: [src/types/https.ts:17](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/types/https.ts#L17)

API 에러 클래스
HTTP 요청 중 발생한 에러를 표현합니다.

 ApiError

## Extends

- `Error`

## Constructors

### new ApiError()

> **new ApiError**(`status`, `data`, `message`): [`ApiError`](ApiError.md)

Defined in: [src/types/https.ts:18](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/types/https.ts#L18)

#### Parameters

##### status

`number`

##### data

`any`

##### message

`string`

#### Returns

[`ApiError`](ApiError.md)

#### Overrides

`Error.constructor`

## Properties

### data

> **data**: `any`

Defined in: [src/types/https.ts:18](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/types/https.ts#L18)

에러 응답 데이터

***

### status

> **status**: `number`

Defined in: [src/types/https.ts:18](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/types/https.ts#L18)

HTTP 상태 코드
