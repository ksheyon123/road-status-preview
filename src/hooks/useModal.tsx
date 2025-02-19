import React, { useState, ReactNode } from "react";

interface ModalComponentProps {
  onClose: () => void;
  [key: string]: any;
}

type ModalComponent = React.ComponentType<ModalComponentProps>;

interface ModalOptions {
  useDefaultContainer?: boolean;
  useDefaultBackdrop?: boolean;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [options, setOptions] = useState<ModalOptions>({
    useDefaultContainer: true,
    useDefaultBackdrop: true,
  });

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  const openModal = (modalContent: ReactNode, modalOptions?: ModalOptions) => {
    setContent(modalContent);
    setOptions((prev) => ({ ...prev, ...modalOptions }));
    setIsOpen(true);
  };

  const openComponent = (
    Component: ModalComponent,
    props: Omit<ModalComponentProps, "onClose"> = {}
  ) => {
    const content = React.createElement(Component, {
      ...props,
      onClose: closeModal,
    });
    setContent(content);
    setOptions({
      useDefaultContainer: true,
      useDefaultBackdrop: true,
    });
    setIsOpen(true);
  };

  const openComponentWithOptions = (
    Component: ModalComponent,
    props: Omit<ModalComponentProps, "onClose"> = {},
    modalOptions: ModalOptions = {}
  ) => {
    const content = React.createElement(Component, {
      ...props,
      onClose: closeModal,
    });
    openModal(content, modalOptions);
  };

  const customModal = (
    content: ReactNode,
    {
      container,
      backdrop,
    }: {
      container?: {
        className?: string;
        style?: React.CSSProperties;
        onClick?: (e: React.MouseEvent) => void;
      };
      backdrop?: {
        className?: string;
        onClick?: () => void;
      };
    } = {}
  ) => {
    openModal(content, {
      useDefaultContainer: !container,
      useDefaultBackdrop: !backdrop,
      containerProps: container && {
        className: container.className,
        style: container.style,
        onClick: container.onClick,
      },
      backdropProps: backdrop && {
        className: backdrop.className,
        onClick: backdrop.onClick,
      },
    });
  };

  return {
    isOpen,
    content,
    options,
    openModal,
    openComponent,
    openComponentWithOptions,
    closeModal,
    customModal,
  };
};

export type { ModalOptions, ModalComponent, ModalComponentProps };
