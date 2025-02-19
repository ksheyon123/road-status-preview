import React from "react";
import { render, screen } from "@testing-library/react";
import BasicInput from "./BasicInput";

describe("BasicInput", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
  };

  it("BaseInput이 정상적으로 렌더링된다", () => {
    render(<BasicInput {...defaultProps} />);
    expect(screen.getByTestId("base-input")).toBeInTheDocument();
  });

  it("label prop이 제공되면 라벨이 렌더링된다", () => {
    const label = "테스트 라벨";
    render(<BasicInput {...defaultProps} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("error prop이 제공되면 에러 메시지가 렌더링된다", () => {
    const error = "에러 메시지";
    render(<BasicInput {...defaultProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("helperText prop이 제공되면 도움말 텍스트가 렌더링된다", () => {
    const helperText = "도움말 텍스트";
    render(<BasicInput {...defaultProps} helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it("icon prop이 제공되면 아이콘이 렌더링된다", () => {
    const icon = "/test-icon.png";
    render(<BasicInput {...defaultProps} icon={icon} />);
    expect(screen.getByAltText("input icon")).toHaveAttribute("src", icon);
  });

  it("width와 height prop이 제공되면 해당 크기가 적용된다", () => {
    const width = 300;
    const height = 80;
    render(<BasicInput {...defaultProps} width={width} height={height} />);
    const container =
      screen.getByTestId("base-input").parentElement?.parentElement;
    expect(container).toHaveStyle({
      width: `${width}px`,
      minHeight: `${height}px`,
    });
  });
});
