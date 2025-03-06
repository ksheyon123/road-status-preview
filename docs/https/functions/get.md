[**고속도로 교통상황 서비스 v0.1.0**](../../README.md)

***

[고속도로 교통상황 서비스](../../modules.md) / [https](../README.md) / get

# Function: get()

> **get**\<`T`\>(`url`, `config`?): `Promise`\<[`ApiResponse`](../../types/https/interfaces/ApiResponse.md)\<`T`\>\>

Defined in: [src/https/index.ts:97](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/https/index.ts#L97)

GET 요청 함수

## Type Parameters

• **T** = `any`

## Parameters

### url

`string`

요청할 URL

### config?

[`RequestConfig`](../../types/https/interfaces/RequestConfig.md)

요청 설정

## Returns

`Promise`\<[`ApiResponse`](../../types/https/interfaces/ApiResponse.md)\<`T`\>\>

응답 데이터를 포함한 Promise
