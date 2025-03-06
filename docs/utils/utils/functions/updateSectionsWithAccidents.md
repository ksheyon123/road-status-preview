[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [utils/utils](../README.md) / updateSectionsWithAccidents

# Function: updateSectionsWithAccidents()

> **updateSectionsWithAccidents**(`sections`, `accidents`): [`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

Defined in: [src/utils/utils.ts:73](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/utils/utils.ts#L73)

섹션에 사고 발생 여부를 표시하는 함수

각 구간(섹션)에 사고 발생 여부를 표시하는 hasAccident 속성을 추가합니다.
사고 정보와 구간 ID를 비교하여 해당 구간에 사고가 있는지 확인합니다.

## Parameters

### sections

[`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

구간 정보 배열

### accidents

`object`[]

사고 정보 배열

## Returns

[`SectionInfo`](../../../types/type-aliases/SectionInfo.md)[]

사고 발생 여부가 표시된 구간 정보 배열
