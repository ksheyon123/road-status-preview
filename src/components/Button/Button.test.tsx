import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("자식 요소를 올바르게 렌더링한다", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("variant 속성에 따라 올바른 스타일을 적용한다", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-blue-500");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-gray-100");

    rerender(<Button variant="text">Text</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-blue-500");
  });

  it("size 속성에 따라 올바른 크기를 적용한다", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });

  it("클릭 이벤트를 올바르게 처리한다", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("로딩 상태일 때 버튼을 비활성화한다", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveClass("opacity-60");
  });

  it("아이콘을 올바르게 렌더링한다", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    const { rerender } = render(
      <Button startIcon={<TestIcon />}>With Start Icon</Button>
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("With Start Icon")).toBeInTheDocument();

    rerender(<Button endIcon={<TestIcon />}>With End Icon</Button>);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("With End Icon")).toBeInTheDocument();

    rerender(<Button icon={<TestIcon />} iconOnly aria-label="Icon Button" />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.queryByText("With Icon")).not.toBeInTheDocument();
  });

  it("사용자 정의 너비를 올바르게 적용한다", () => {
    render(<Button width="200px">Custom Width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-[200px]");
  });

  it("사용자 정의 className을 올바르게 적용한다", () => {
    render(<Button className="custom-class">Custom Class</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("hover 효과가 없는 버튼을 렌더링한다", () => {
    const { rerender } = render(<Button hover={false}>No Hover Effect</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("hover:bg-blue-600");
    expect(screen.getByRole("button")).not.toHaveClass("hover:bg-gray-200");
    expect(screen.getByRole("button")).not.toHaveClass("hover:bg-blue-50");

    // 각 variant에 대해 hover 효과가 없는지 확인
    rerender(
      <Button variant="primary" hover={false}>
        Primary No Hover
      </Button>
    );
    expect(screen.getByRole("button")).not.toHaveClass("hover:bg-blue-600");

    rerender(
      <Button variant="secondary" hover={false}>
        Secondary No Hover
      </Button>
    );
    expect(screen.getByRole("button")).not.toHaveClass("hover:bg-gray-200");

    rerender(
      <Button variant="text" hover={false}>
        Text No Hover
      </Button>
    );
    expect(screen.getByRole("button")).not.toHaveClass("hover:bg-blue-50");
  });
});
