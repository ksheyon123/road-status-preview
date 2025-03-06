[**고속도로 교통상황 서비스 v0.1.0**](../../README.md)

***

[고속도로 교통상황 서비스](../../modules.md) / [types](../README.md) / RouteInfo

# Type Alias: RouteInfo

> **RouteInfo**: `object`

Defined in: [src/types/index.ts:46](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/types/index.ts#L46)

경로 정보 타입

## Type declaration

### directions

> **directions**: `object`

#### directions.forward

> **forward**: `object`

#### directions.forward.sections

> **sections**: [`SectionInfo`](SectionInfo.md)[]

#### directions.reverse

> **reverse**: `object`

#### directions.reverse.sections

> **sections**: [`SectionInfo`](SectionInfo.md)[]

### end\_point

> **end\_point**: `string`

### route\_id

> **route\_id**: `string`

### route\_name

> **route\_name**: `string`

### start\_point

> **start\_point**: `string`

### updated\_at

> **updated\_at**: `string`
