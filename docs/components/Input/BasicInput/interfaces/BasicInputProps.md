[**고속도로 교통상황 서비스 v0.1.0**](../../../../README.md)

***

[고속도로 교통상황 서비스](../../../../modules.md) / [components/Input/BasicInput](../README.md) / BasicInputProps

# Interface: BasicInputProps

Defined in: [src/components/Input/BasicInput.tsx:28](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L28)

기본 입력 필드 컴포넌트의 Props 인터페이스

 BasicInputProps

## Extends

- `Omit`\<`React.InputHTMLAttributes`\<`HTMLInputElement`\>, `"onChange"`\>

## Properties

### className?

> `optional` **className**: `string`

Defined in: [src/components/Input/BasicInput.tsx:32](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L32)

추가 CSS 클래스

#### Overrides

`Omit.className`

***

### error?

> `optional` **error**: `string`

Defined in: [src/components/Input/BasicInput.tsx:36](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L36)

에러 메시지

***

### height?

> `optional` **height**: `string` \| `number`

Defined in: [src/components/Input/BasicInput.tsx:40](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L40)

컨테이너 높이

#### Overrides

`Omit.height`

***

### helperIcon?

> `optional` **helperIcon**: `ReactNode`

Defined in: [src/components/Input/BasicInput.tsx:38](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L38)

도움말 아이콘

***

### helperText?

> `optional` **helperText**: `string`

Defined in: [src/components/Input/BasicInput.tsx:37](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L37)

도움말 텍스트

***

### icon?

> `optional` **icon**: `string`

Defined in: [src/components/Input/BasicInput.tsx:34](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L34)

아이콘 URL

***

### iconClass?

> `optional` **iconClass**: `string`

Defined in: [src/components/Input/BasicInput.tsx:35](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L35)

아이콘 CSS 클래스

***

### label?

> `optional` **label**: `string`

Defined in: [src/components/Input/BasicInput.tsx:33](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L33)

입력 필드 레이블

***

### onChange()

> **onChange**: (`event`) => `void`

Defined in: [src/components/Input/BasicInput.tsx:31](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L31)

값 변경 이벤트 핸들러

#### Parameters

##### event

`ChangeEvent`\<`HTMLInputElement`\>

#### Returns

`void`

***

### value

> **value**: `string`

Defined in: [src/components/Input/BasicInput.tsx:30](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L30)

입력 필드의 값

#### Overrides

`Omit.value`

***

### width?

> `optional` **width**: `string` \| `number`

Defined in: [src/components/Input/BasicInput.tsx:39](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/components/Input/BasicInput.tsx#L39)

컨테이너 너비

#### Overrides

`Omit.width`
