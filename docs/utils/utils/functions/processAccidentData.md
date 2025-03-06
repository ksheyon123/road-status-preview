[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [utils/utils](../README.md) / processAccidentData

# Function: processAccidentData()

> **processAccidentData**(`accidents`, `forward`, `reverse`): `object`[]

Defined in: [src/utils/utils.ts:26](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/utils/utils.ts#L26)

사고 데이터에 경로 정보를 추가하는 함수

사고 데이터에 해당 사고가 발생한 구간의 시작점과 끝점 정보를 추가합니다.
정방향(forward)과 역방향(reverse) 섹션 정보를 확인하여 일치하는 구간 정보를 찾습니다.

## Parameters

### accidents

`object`[]

사고 정보 배열

### forward

[`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

정방향 구간 정보 배열

### reverse

[`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

역방향 구간 정보 배열

## Returns

`object`[]

시작점과 끝점 정보가 추가된 사고 정보 배열
