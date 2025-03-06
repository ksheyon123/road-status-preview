/**
 * ModalContext.tsx
 *
 * 모달 관리를 위한 Context입니다.
 * 애플리케이션 전체에서 모달을 쉽게 열고 닫을 수 있도록 합니다.
 * 모달의 내용, 헤더, 스타일 등을 관리합니다.
 */

import React, { createContext, useContext, ReactNode } from "react";
import { useModal, type ModalOptions } from "@/hooks/useModal";

/**
 * ModalContext에서 제공하는 값들의 타입 정의
 */
interface ModalContextType {
  isOpen: boolean; // 모달 열림 상태
  content: ReactNode | null; // 모달 내용 컴포넌트
  header: ReactNode | null; // 모달 헤더 컴포넌트
  options: ModalOptions; // 모달 설정 옵션
  openModal: ReturnType<typeof useModal>["openModal"]; // 모달 열기 함수
  closeModal: ReturnType<typeof useModal>["closeModal"]; // 모달 닫기 함수
}

/**
 * 모달 정보를 관리하는 Context
 * 기본값은 undefined로 설정되어 있어 Provider 내부에서만 사용 가능합니다.
 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * ModalProvider의 props 타입 정의
 */
interface ModalProviderProps {
  children: ReactNode; // 자식 컴포넌트
}

/**
 * 모달 Context Provider 컴포넌트
 * 모달 상태를 관리하고 자식 컴포넌트에 제공합니다.
 *
 * @param {ModalProviderProps} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 컴포넌트
 */
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  // useModal 훅을 사용하여 모달 상태와 기능을 가져옵니다.
  const modal = useModal();

  return (
    <ModalContext.Provider value={modal}>
      {children}
      {/* 모달이 열려있고 내용이 있을 때만 렌더링합니다 */}
      {modal.isOpen && modal.content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 영역 (backdrop) */}
          {modal.options.useDefaultBackdrop ? (
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={modal.closeModal}
              {...modal.options.backdropProps}
            />
          ) : (
            modal.options.backdropProps && (
              <div {...modal.options.backdropProps} />
            )
          )}
          {/* 모달 컨텐츠 영역 */}
          {modal.options.useDefaultContainer ? (
            <div
              className="relative z-50 bg-white rounded-lg shadow-lg "
              {...modal.options.containerProps}
            >
              {modal.options.useHeader && (
                <div {...modal.options.headerProps}>{modal.header}</div>
              )}
              {modal.content}
            </div>
          ) : modal.options.containerProps ? (
            <div {...modal.options.containerProps}>
              {modal.options.useHeader && (
                <div {...modal.options.headerProps}>{modal.header}</div>
              )}
              {modal.content}
            </div>
          ) : (
            modal.content
          )}
        </div>
      )}
    </ModalContext.Provider>
  );
};

/**
 * 모달 Context를 사용하기 위한 커스텀 훅
 * 컴포넌트에서 모달 기능에 쉽게 접근할 수 있도록 합니다.
 *
 * @returns {ModalContextType} 모달 Context 값
 * @throws {Error} Provider 외부에서 사용될 경우 에러 발생
 */
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
