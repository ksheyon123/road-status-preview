/**
 * useModal.tsx
 *
 * 모달 상태와 기능을 관리하는 커스텀 훅입니다.
 * 모달의 열림/닫힘 상태, 내용, 헤더, 스타일 옵션 등을 관리합니다.
 */

import React, { useState, ReactNode } from "react";

/**
 * 모달 컴포넌트에 전달되는 props 인터페이스
 *
 * @interface ModalComponentProps
 * @property {Function} onClick - 모달 내부 요소 클릭 시 실행되는 함수
 * @property {any} [key: string] - 추가적인 props
 */
interface ModalComponentProps {
  onClick: () => void;
  [key: string]: any;
}

/**
 * 모달 컴포넌트 타입 정의
 *
 * @typedef {React.ComponentType<ModalComponentProps>} ModalComponent
 */
type ModalComponent = React.ComponentType<ModalComponentProps>;

/**
 * 모달 옵션 인터페이스
 *
 * @interface ModalOptions
 * @property {boolean} [useDefaultBackdrop] - 기본 배경 사용 여부 (배경 클릭시 모달 닫힘)
 * @property {React.HTMLAttributes<HTMLDivElement>} [backdropProps] - 배경 요소에 전달할 props
 * @property {boolean} [useDefaultContainer] - 기본 컨테이너 사용 여부
 * @property {React.HTMLAttributes<HTMLDivElement>} [containerProps] - 컨테이너 요소에 전달할 props
 * @property {boolean} [useHeader] - 헤더 사용 여부
 * @property {React.HTMLAttributes<HTMLDivElement>} [headerProps] - 헤더 요소에 전달할 props
 */
interface ModalOptions {
  useDefaultBackdrop?: boolean; // 배경 클릭시 Modal 닫음
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;

  useDefaultContainer?: boolean; // 기본 컴포넌트 안에 컴포넌트 그림
  containerProps?: React.HTMLAttributes<HTMLDivElement>;

  useHeader?: boolean; // 기본 헤더 사용 여부
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * 모달 상태와 기능을 관리하는 커스텀 훅
 *
 * @returns {Object} 모달 상태와 제어 함수들
 * @property {boolean} isOpen - 모달 열림 상태
 * @property {ReactNode | null} content - 모달 내용 컴포넌트
 * @property {ReactNode | null} header - 모달 헤더 컴포넌트
 * @property {ModalOptions} options - 모달 옵션
 * @property {Function} openModal - 모달을 여는 함수
 * @property {Function} closeModal - 모달을 닫는 함수
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [header, setHeader] = useState<ReactNode>(null);
  const [options, setOptions] = useState<ModalOptions>({
    useDefaultContainer: true,
    useDefaultBackdrop: true,
    useHeader: true,
  });

  /**
   * 모달을 닫고 content를 초기화합니다.
   */
  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
    setHeader(null);
  };

  /**
   * ReactNode를 모달 컨텐츠로 설정하고 모달을 엽니다.
   *
   * @param {ReactNode} modalContent - 모달에 표시할 내용 컴포넌트
   * @param {ReactNode} [modalHeader] - 모달에 표시할 헤더 컴포넌트
   * @param {ModalOptions} [modalOptions] - 모달 옵션
   */
  const openModal = (
    modalContent: ReactNode,
    modalHeader?: ReactNode,
    modalOptions?: ModalOptions
  ) => {
    setContent(modalContent);
    setHeader(modalHeader);
    setOptions((prev) => ({ ...prev, ...modalOptions }));
    setIsOpen(true);
  };

  return {
    isOpen,
    content,
    header,
    options,
    openModal,
    closeModal,
  };
};

export type { ModalOptions, ModalComponent, ModalComponentProps };
