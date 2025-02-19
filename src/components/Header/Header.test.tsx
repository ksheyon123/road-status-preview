import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header Component", () => {
  const defaultProps = {
    title: "경부고속도로",
    routeId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("기본 제목으로 헤더가 렌더링된다", () => {
      render(<Header />);
      const titleElement = screen.getByText("경부고속도로");
      expect(titleElement).toBeInTheDocument();
    });

    it("사용자 지정 제목으로 헤더가 렌더링된다", () => {
      const customTitle = "서해안고속도로";
      render(<Header {...defaultProps} title={customTitle} />);
      const titleElement = screen.getByText(customTitle);
      expect(titleElement).toBeInTheDocument();
    });

    it("검색 버튼과 메뉴 버튼이 렌더링된다", () => {
      render(<Header />);
      const searchButton = screen.getByAltText("검색");
      const menuButton = screen.getByAltText("메뉴");

      expect(searchButton).toBeInTheDocument();
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("Back Button", () => {
    const user = userEvent.setup();

    it("onBack이 제공되지 않으면 뒤로가기 버튼이 렌더링되지 않는다", () => {
      render(<Header {...defaultProps} />);
      const backButton = screen.queryByAltText("뒤로가기");
      expect(backButton).not.toBeInTheDocument();
    });

    it("onBack이 제공되면 뒤로가기 버튼이 렌더링된다", () => {
      const onBack = jest.fn();
      render(<Header {...defaultProps} onBack={onBack} />);
      const backButton = screen.getByAltText("뒤로가기");
      expect(backButton).toBeInTheDocument();
    });

    it("뒤로가기 버튼 클릭 시 onBack이 호출된다", async () => {
      const onBack = jest.fn();
      render(<Header {...defaultProps} onBack={onBack} />);
      const backButton = screen.getByAltText("뒤로가기");

      await user.click(backButton);
      expect(onBack).toHaveBeenCalledTimes(1);
    });
  });

  describe("Route ID", () => {
    it("노선 ID가 제공되면 렌더링된다", () => {
      render(<Header {...defaultProps} routeId={15} />);
      const routeIdElement = screen.getByText("15");
      expect(routeIdElement).toBeInTheDocument();
    });

    it("노선 ID가 제공되지 않으면 표시되지 않는다", () => {
      render(<Header title="테스트 고속도로" />);
      const highwayIcon = screen.getByAltText("고속도로");
      const routeIdContainer = highwayIcon.parentElement?.lastElementChild;
      expect(routeIdContainer?.textContent).toBe("");
    });
  });
});
