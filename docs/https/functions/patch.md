[**고속도로 교통상황 서비스 v0.1.0**](../../README.md)

***

[고속도로 교통상황 서비스](../../modules.md) / [https](../README.md) / patch

# Function: patch()

> **patch**\<`T`\>(`url`, `body`, `config`?): `Promise`\<[`ApiResponse`](../../types/https/interfaces/ApiResponse.md)\<`T`\>\>

Defined in: [src/https/index.ts:140](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/https/index.ts#L140)

PATCH 요청 함수

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
