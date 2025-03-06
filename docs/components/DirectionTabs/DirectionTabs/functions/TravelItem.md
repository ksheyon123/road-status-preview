[**고속도로 교통상황 서비스 v0.1.0**](../../../../README.md)

***

[고속도로 교통상황 서비스](../../../../modules.md) / [components/DirectionTabs/DirectionTabs](../README.md) / TravelItem

# Function: TravelItem()

> **TravelItem**(`props`): `Element`

Defined in: [src/components/DirectionTabs/DirectionTabs.tsx:34](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/DirectionTabs/DirectionTabs.tsx#L34)

여행 정보 아이템 컴포넌트

사고 또는 통제 정보를 테이블 형식으로 표시합니다.

## Parameters

### props

컴포넌트 props

#### data

\{ `accidentDetailType`: `string`; `accidentType`: `string`; `content`: `string`; `from`: `string`; `fromTime`: `string`; `to`: `string`; `toTime`: `string`; \}

표시할 데이터

#### data.accidentDetailType

`string`

사고 상세 유형

#### data.accidentType

`string`

사고 유형

#### data.content

`string`

사고 내용

#### data.from

`string`

시작 지점

#### data.fromTime

`string`

시작 시간

#### data.to

`string`

종료 지점

#### data.toTime

`string`

종료 시간

#### rowHeight?

`number`

행 높이

#### rowWidth?

`number`

행 너비

#### tableWidth?

`number`

테이블 너비

## Returns

`Element`

여행 정보 아이템 JSX 요소
