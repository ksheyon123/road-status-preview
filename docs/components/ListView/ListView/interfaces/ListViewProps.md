[**고속도로 교통상황 서비스 v0.1.0**](../../../../README.md)

***

[고속도로 교통상황 서비스](../../../../modules.md) / [components/ListView/ListView](../README.md) / ListViewProps

# Interface: ListViewProps\<T\>

Defined in: [src/components/ListView/ListView.tsx:21](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/ListView/ListView.tsx#L21)

리스트 뷰 컴포넌트의 Props 인터페이스

 ListViewProps

## Type Parameters

• **T**

리스트 아이템의 타입

## Properties

### className?

> `optional` **className**: `string`

Defined in: [src/components/ListView/ListView.tsx:24](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/ListView/ListView.tsx#L24)

추가 CSS 클래스

***

### emptyMessage?

> `optional` **emptyMessage**: `string`

Defined in: [src/components/ListView/ListView.tsx:25](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/ListView/ListView.tsx#L25)

데이터가 없을 때 표시할 메시지

***

### isLoading?

> `optional` **isLoading**: `boolean`

Defined in: [src/components/ListView/ListView.tsx:26](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/ListView/ListView.tsx#L26)

로딩 상태 여부

***

### items

> **items**: `T`[]

Defined in: [src/components/ListView/ListView.tsx:22](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/ListView/ListView.tsx#L22)

렌더링할 아이템 배열

***

### renderItem()

> **renderItem**: (`item`, `index`) => `ReactNode`

Defined in: [src/components/ListView/ListView.tsx:23](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/ListView/ListView.tsx#L23)

각 아이템을 렌더링하는 함수

#### Parameters

##### item

`T`

##### index

`number`

#### Returns

`ReactNode`
