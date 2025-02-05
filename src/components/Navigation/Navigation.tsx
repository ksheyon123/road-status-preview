import React from "react";

interface NavigationState {
  activeTab: string;
}

class Navigation extends React.Component<{}, NavigationState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeTab: "전체구간",
    };
  }

  private tabs = ["전체구간", "구간상세", "사고.통제"];

  handleTabClick = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  render() {
    return (
      <div className="w-full">
        <div className="flex">
          {this.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => this.handleTabClick(tab)}
              className={`flex-1 py-3 text-center text-sm transition-colors
                ${
                  this.state.activeTab === tab
                    ? "border-b-2 border-blue-600 text-black font-medium"
                    : "text-gray-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Navigation;
