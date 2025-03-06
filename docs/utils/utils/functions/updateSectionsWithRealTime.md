[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [utils/utils](../README.md) / updateSectionsWithRealTime

# Function: updateSectionsWithRealTime()

> **updateSectionsWithRealTime**(`sections`, `realtimeData`): [`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

Defined in: [src/utils/utils.ts:98](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/utils/utils.ts#L98)

실시간 교통 정보를 섹션에 추가하는 함수

각 구간(섹션)에 실시간 교통 정보(혼잡도, 이동 시간)를 추가합니다.
실시간 데이터와 구간 ID를 비교하여 해당 구간의 교통 정보를 업데이트합니다.

## Parameters

### sections

[`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

구간 정보 배열

### realtimeData

[`RealTimeTraffic`](../../../types/type-aliases/RealTimeTraffic.md)[]

실시간 교통 정보 배열

## Returns

[`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

실시간 교통 정보가 추가된 구간 정보 배열
