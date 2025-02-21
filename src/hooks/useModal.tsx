import React, { useState, ReactNode } from "react";

interface ModalComponentProps {
  onClick: () => void;
  [key: string]: any;
}

type ModalComponent = React.ComponentType<ModalComponentProps>;

interface ModalOptions {
  useDefaultBackdrop?: boolean; // 배경 클릭시 Modal 닫음
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;

  useDefaultContainer?: boolean; // 기본 컴포넌트 안에 컴포넌트 그림
  containerProps?: React.HTMLAttributes<HTMLDivElement>;

  useHeader?: boolean; // 기본 헤더 사용 여부
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
}

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
   * @param modalContent Modal에 표시할 ReactNode
   * @param modalOptions 모달 옵션 (useDefaultContainer, useDefaultBackdrop, useDefaultHeader 등)
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
