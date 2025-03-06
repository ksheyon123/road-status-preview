[**고속도로 교통상황 서비스 v0.1.0**](../../../README.md)

***

[고속도로 교통상황 서비스](../../../modules.md) / [pages/\_document](../README.md) / default

# Class: default

Defined in: [src/pages/\_document.tsx:3](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/pages/_document.tsx#L3)

## Extends

- `default`

## Constructors

### new default()

> **new default**(`props`): [`default`](default.md)

Defined in: node\_modules/@types/react/index.d.ts:1015

#### Parameters

##### props

`RenderPageResult` & `object` & `HtmlProps`

#### Returns

[`default`](default.md)

#### Inherited from

`Document.constructor`

### new default()

> **new default**(`props`, `context`): [`default`](default.md)

Defined in: node\_modules/@types/react/index.d.ts:1020

#### Parameters

##### props

`RenderPageResult` & `object` & `HtmlProps`

##### context

`any`

#### Returns

[`default`](default.md)

#### Deprecated

#### See

[://legacy.reactjs.org/docs/legacy-context.html React Docs](../../../https/README.md)

#### Inherited from

`Document.constructor`

## Methods

### render()

> **render**(): `Element`

Defined in: [src/pages/\_document.tsx:9](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/pages/_document.tsx#L9)

#### Returns

`Element`

#### Overrides

`Document.render`

***

### getInitialProps()

> `static` **getInitialProps**(`ctx`): `Promise`\<`DocumentInitialProps`\>

Defined in: [src/pages/\_document.tsx:4](https://github.com/ksheyon123/road-status-preview/blob/f8475dd9e1f35d9b8acf92ef20ed9d0782a8bb42/src/pages/_document.tsx#L4)

`getInitialProps` hook returns the context object with the addition of `renderPage`.
`renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers

#### Parameters

##### ctx

`any`

#### Returns

`Promise`\<`DocumentInitialProps`\>

#### Overrides

`Document.getInitialProps`
