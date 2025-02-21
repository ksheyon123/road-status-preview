import { renderHook, act } from "@testing-library/react";
import { useModal } from "./useModal";

describe("useModal", () => {
  it("초기 상태가 올바르게 설정되어야 함", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.content).toBeNull();
    expect(result.current.header).toBeNull();
    expect(result.current.options).toEqual({
      useDefaultContainer: true,
      useDefaultBackdrop: true,
      useDefaultHeader: true,
    });
  });

  it("openModal이 모달을 열고 content를 설정해야 함", () => {
    const { result } = renderHook(() => useModal());
    const testContent = <div>Test Content</div>;

    act(() => {
      result.current.openModal(testContent);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.content).toEqual(testContent);
  });

  it("closeModal이 모달을 닫고 content를 초기화해야 함", () => {
    const { result } = renderHook(() => useModal());
    const testContent = <div>Test Content</div>;

    act(() => {
      result.current.openModal(testContent);
    });

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.content).toBeNull();
  });

  it("useDefaultHeader 옵션이 올바르게 적용되어야 함", () => {
    const { result } = renderHook(() => useModal());
    const testContent = <div>Test Content</div>;
    const modalOptions = {
      useHeader: false,
    };

    act(() => {
      result.current.openModal(testContent, null, modalOptions);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.content).toEqual(testContent);
    expect(result.current.options.useHeader).toBe(false);
  });

  it("openModal이 옵션과 함께 모달을 열어야 함", () => {
    const { result } = renderHook(() => useModal());
    const testContent = <div>Test Content</div>;
    const modalOptions = {
      useDefaultContainer: false,
      useDefaultBackdrop: false,
    };

    act(() => {
      result.current.openModal(testContent, null, modalOptions);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.content).toEqual(testContent);
    expect(result.current.options).toEqual(modalOptions);
  });
});
