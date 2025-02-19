import React, { createContext, useContext, ReactNode } from "react";
import { useModal, type ModalOptions } from "../hooks/useModal";

interface ModalContextType {
  isOpen: boolean;
  content: ReactNode | null;
  options: ModalOptions;
  openModal: ReturnType<typeof useModal>["openModal"];
  openComponent: ReturnType<typeof useModal>["openComponent"];
  openComponentWithOptions: ReturnType<
    typeof useModal
  >["openComponentWithOptions"];
  closeModal: ReturnType<typeof useModal>["closeModal"];
  customModal: ReturnType<typeof useModal>["customModal"];
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
          {modal.options.useDefaultContainer ? (
            <div
              className="relative z-50 bg-white rounded-lg shadow-lg"
              {...modal.options.containerProps}
            >
              {modal.content}
            </div>
          ) : modal.options.containerProps ? (
            <div {...modal.options.containerProps}>{modal.content}</div>
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
