import React from "react";
import { render } from "@testing-library/react";
import List from "./List";

describe("List Component", () => {
  it("리스트 아이템을 올바르게 렌더링한다", () => {
    const items = [1, 2, 3];
    const { getAllByText } = render(
      <List
        items={items}
        children={(item: number) => <div>Item: {item}</div>}
      />
    );

    const listItems = getAllByText(/Item: [123]/);
    expect(listItems).toHaveLength(items.length);
  });

  it("각 아이템에 대해 children 함수를 렌더링한다", () => {
    const items = ["a", "b"];
    const { getAllByText } = render(
      <List items={items}>{(item: string) => <div>Item: {item}</div>}</List>
    );

    const childElements = getAllByText(/Item: [ab]/);
    expect(childElements).toHaveLength(items.length);
  });

  it("커스텀 className을 적용한다", () => {
    const items = [1];
    const { container } = render(
      <List items={items} className="custom-class">
        {(item: number) => <div>Item: {item}</div>}
      </List>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
