import React, { createContext, useContext, ReactNode } from "react";
import { useModal, type ModalOptions } from "@/hooks/useModal";

interface ModalContextType {
  isOpen: boolean;
  content: ReactNode | null;
  header: ReactNode | null;
  options: ModalOptions;
  openModal: ReturnType<typeof useModal>["openModal"];
  closeModal: ReturnType<typeof useModal>["closeModal"];
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const modal = useModal();

  return (
    <ModalContext.Provider value={modal}>
      {children}
      {modal.isOpen && modal.content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 영역 */}
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
          {/* 컨텐츠 영역 */}
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

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
