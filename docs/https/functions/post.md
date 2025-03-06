[**고속도로 교통상황 서비스 v0.1.0**](../../README.md)

***

[고속도로 교통상황 서비스](../../modules.md) / [https](../README.md) / post

# Function: post()

> **post**\<`T`\>(`url`, `body`, `config`?): `Promise`\<[`ApiResponse`](../../types/https/interfaces/ApiResponse.md)\<`T`\>\>

Defined in: [src/https/index.ts:108](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/https/index.ts#L108)

POST 요청 함수

## Type Parameters

• **T** = `any`

## Parameters

### url

`string`

요청할 URL

### body

`any`

요청 바디

### config?

[`RequestConfig`](../../types/https/interfaces/RequestConfig.md)

요청 설정

## Returns

`Promise`\<[`ApiResponse`](../../types/https/interfaces/ApiResponse.md)\<`T`\>\>

응답 데이터를 포함한 Promise
