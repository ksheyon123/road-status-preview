[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [hooks/useModal](../README.md) / useModal

# Function: useModal()

> **useModal**(): `object`

Defined in: [src/hooks/useModal.tsx:62](https://github.com/ksheyon123/road-status-preview/blob/d56258a23fae54155a9cd30000ae39fff6269a67/src/hooks/useModal.tsx#L62)

모달 상태와 기능을 관리하는 커스텀 훅

## Returns

`object`

모달 상태와 제어 함수들

### closeModal()

> **closeModal**: () => `void`

모달을 닫고 content를 초기화합니다.

#### Returns

`void`

### content

> **content**: `ReactNode`

### header

> **header**: `ReactNode`

### isOpen

> **isOpen**: `boolean`

### openModal()

> **openModal**: (`modalContent`, `modalHeader`?, `modalOptions`?) => `void`

ReactNode를 모달 컨텐츠로 설정하고 모달을 엽니다.

#### Parameters

##### modalContent

`ReactNode`

모달에 표시할 내용 컴포넌트

##### modalHeader?

`ReactNode`

모달에 표시할 헤더 컴포넌트

##### modalOptions?

[`ModalOptions`](../interfaces/ModalOptions.md)

모달 옵션

#### Returns

`void`

### options

> **options**: [`ModalOptions`](../interfaces/ModalOptions.md)
