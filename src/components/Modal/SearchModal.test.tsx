import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchModal from "./SearchModal";
import { useModalContext } from "@/contexts/ModalContext";
import { get } from "@/https";

// Mock modules
jest.mock("@/contexts/ModalContext");
jest.mock("@/https");
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("SearchModal", () => {
  const mockCloseModal = jest.fn();
  const mockHighways = {
    highways: [
      { route_name: "경부고속도로", route_no: "1" },
      { route_name: "서해안고속도로", route_no: "15" },
      { route_name: "중부고속도로", route_no: "35" },
    ],
  };

  beforeEach(() => {
    (useModalContext as jest.Mock).mockReturnValue({
      closeModal: mockCloseModal,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    // 기본적으로 성공 응답을 반환하도록 설정
    (get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: mockHighways })
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("SearchModal이 정상적으로 렌더링된다", async () => {
    await act(async () => {
      render(<SearchModal />);
    });

    // 검색 입력창이 렌더링되는지 확인
    expect(screen.getByPlaceholderText("고속도로")).toBeInTheDocument();

    // 취소 버튼이 렌더링되는지 확인
    expect(screen.getByText("취소")).toBeInTheDocument();

    // 고속도로 목록이 로드되는지 확인
    expect(screen.getByText("경부고속도로")).toBeInTheDocument();
    expect(screen.getByText("서해안고속도로")).toBeInTheDocument();
    expect(screen.getByText("중부고속도로")).toBeInTheDocument();
  });

  it("검색어 입력 시 고속도로 목록이 필터링된다", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(<SearchModal />);
    });

    // 검색어 입력
    const searchInput = screen.getByPlaceholderText("고속도로");
    await user.type(searchInput, "중부");

    // 필터링 결과 확인
    expect(screen.queryByText("경부고속도로")).not.toBeInTheDocument();
    expect(screen.queryByText("서해안고속도로")).not.toBeInTheDocument();
    expect(screen.getByText("중부고속도로")).toBeInTheDocument();
  });

  it("취소 버튼 클릭 시 모달이 닫힌다", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(<SearchModal />);
    });

    const cancelButton = screen.getByText("취소");
    await user.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("API 호출 실패 시 에러가 콘솔에 출력된다", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const error = new Error("API 호출 실패");

    // 이 테스트에서만 실패 응답을 반환하도록 설정
    (get as jest.Mock).mockImplementationOnce(() => Promise.reject(error));

    await act(async () => {
      render(<SearchModal />);
    });

    // 비동기 작업이 완료될 때까지 대기
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "고속도로 데이터를 불러오는데 실패했습니다:",
        error
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
