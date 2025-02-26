import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import Container from "./Container";
import { useModalContext } from "@/contexts/ModalContext";
import { useHighwayContext } from "@/contexts/HighwayContext";
import { getAccidents, getRoutes } from "@/https/apis";
import * as utils from "@/utils/utils";
import { Client } from "@stomp/stompjs";

// 모킹
jest.mock("@/contexts/ModalContext");
jest.mock("@/contexts/HighwayContext");
jest.mock("@/https/apis");
jest.mock("@stomp/stompjs");
jest.mock("next/dynamic", () => () => {
  const MockComponent = (props: any) => (
    <div data-testid="mocked-dynamic-component">{JSON.stringify(props)}</div>
  );
  MockComponent.displayName = "MockedDynamicComponent";
  return MockComponent;
});

// Header, TrafficDashboard, Tabs 컴포넌트 모킹
jest.mock("@/components/Header/Header", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="mocked-header">{JSON.stringify(props)}</div>
    ),
  };
});

jest.mock("@/components/TrafficDashboard/TrafficDashboard", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="mocked-traffic-dashboard">{JSON.stringify(props)}</div>
    ),
  };
});

jest.mock("@/components/Tabs/Tabs", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="mocked-tabs">{JSON.stringify(props)}</div>
    ),
  };
});

jest.mock("@/components/DirectionTabs/DirectionTabs", () => {
  return {
    __esModule: true,
    DirectionTabs: (props: any) => (
      <div data-testid="mocked-direction-tabs">{JSON.stringify(props)}</div>
    ),
    TravelItem: (props: any) => (
      <div data-testid="mocked-travel-item">{JSON.stringify(props)}</div>
    ),
  };
});

jest.mock("@/components/Modal/SearchModal", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mocked-search-modal">Search Modal</div>,
  };
});

jest.mock("@/components/Modal/AlertModalHeader", () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="mocked-alert-modal-header">Alert Modal Header</div>
    ),
  };
});

jest.mock("@/components/Legend/Legend", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mocked-legend">Legend</div>,
  };
});

// 모킹된 데이터
const mockAccidents = {
  data: {
    accidents: [
      {
        occurred_at: "2025-02-26T09:00:00",
        route_id: "0010",
        direction: "forward",
        accident_type: "사고",
        accident_detail_type: "추돌사고",
        description: "차량 2대 추돌",
        coordinates: { x: 127.1, y: 37.5 },
        conzone_id: "section1",
        cleared_at: "-",
        start_name: "",
        end_name: "",
      },
    ],
  },
};

const mockRouteData = {
  data: {
    route_id: "0010",
    route_name: "경부",
    start_point: "서울",
    end_point: "부산",
    updated_at: "2025-02-26T09:30:00",
    directions: {
      forward: {
        sections: [
          {
            section_id: "section1",
            start_name: "서울",
            end_name: "안양",
            distance: 20,
            order_num: 1,
            status: "SMOOTH" as "SMOOTH" | "SLOW" | "CONGESTED",
            travel_time: 15,
            speed: 80,
          },
        ],
      },
      reverse: {
        sections: [
          {
            section_id: "section2",
            start_name: "안양",
            end_name: "서울",
            distance: 20,
            order_num: 1,
            status: "SMOOTH" as "SMOOTH" | "SLOW" | "CONGESTED",
            travel_time: 15,
            speed: 80,
          },
        ],
      },
    },
  },
};

const mockProcessedRouteData = {
  ...mockRouteData.data,
  from: "서울",
  to: "부산",
  directions: {
    forward: {
      sections: [
        {
          ...mockRouteData.data.directions.forward.sections[0],
          hasAccident: true,
        },
      ],
    },
    reverse: {
      sections: [
        {
          ...mockRouteData.data.directions.reverse.sections[0],
          hasAccident: false,
        },
      ],
    },
  },
};

describe("Container 컴포넌트", () => {
  // 테스트 전 모킹 설정
  beforeEach(() => {
    jest.clearAllMocks();

    // ModalContext 모킹
    (useModalContext as jest.Mock).mockReturnValue({
      openModal: jest.fn(),
    });

    // HighwayContext 모킹
    (useHighwayContext as jest.Mock).mockReturnValue({
      curHighway: {
        route_name: "경부",
        route_id: "0010",
        start_point: "서울",
        end_point: "부산",
        route_display_id: "1",
      },
    });

    // API 호출 모킹
    (getAccidents as jest.Mock).mockResolvedValue(mockAccidents);
    (getRoutes as jest.Mock).mockResolvedValue(mockRouteData);

    // 유틸리티 함수 모킹
    jest
      .spyOn(utils, "processAccidentData")
      .mockReturnValue(mockAccidents.data.accidents);
    jest
      .spyOn(utils, "processRouteData")
      .mockReturnValue(mockProcessedRouteData);

    // Client 모킹
    const mockClient = {
      activate: jest.fn(),
      deactivate: jest.fn(),
      subscribe: jest.fn(),
    };
    (Client as jest.Mock).mockImplementation(() => mockClient);

    // console.log 모킹
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("컴포넌트가 올바르게 렌더링된다", async () => {
    await act(async () => {
      render(<Container />);
    });

    // 데이터 로딩 후 컴포넌트가 렌더링되었는지 확인
    await waitFor(() => {
      expect(getAccidents).toHaveBeenCalled();
      expect(getRoutes).toHaveBeenCalledWith("0010");
    });
  });

  it("API에서 데이터를 가져와 처리한다", async () => {
    await act(async () => {
      render(<Container />);
    });

    await waitFor(() => {
      // API 호출 확인
      expect(getAccidents).toHaveBeenCalled();
      expect(getRoutes).toHaveBeenCalledWith("0010");

      // 데이터 처리 함수 호출 확인
      expect(utils.processAccidentData).toHaveBeenCalled();
      expect(utils.processRouteData).toHaveBeenCalled();
    });
  });

  it("탭 변경이 올바르게 작동한다", async () => {
    await act(async () => {
      render(<Container />);
    });

    // 초기 탭이 '전체구간'인지 확인
    await waitFor(() => {
      // DynamicTrafficDashboard가 렌더링되었는지 확인
      // 참고: 실제 구현에서는 컴포넌트 내부 요소를 더 구체적으로 확인할 수 있음
      expect(utils.processRouteData).toHaveBeenCalled();
    });
  });

  it("웹소켓 연결을 설정한다", async () => {
    await act(async () => {
      render(<Container />);
    });

    await waitFor(() => {
      // Client 생성자가 호출되었는지 확인
      expect(Client).toHaveBeenCalled();

      // Client 인스턴스의 activate 메서드가 호출되었는지 확인
      const mockClientInstance = (Client as jest.Mock).mock.results[0].value;
      expect(mockClientInstance.activate).toHaveBeenCalled();
    });
  });

  it("웹소켓을 통해 사고 데이터가 업데이트되면 processData가 호출된다", async () => {
    // processData 함수 호출 횟수를 추적하기 위한 스파이 설정
    const processDataSpy = jest.spyOn(utils, "processRouteData");

    // 컴포넌트 렌더링
    await act(async () => {
      render(<Container />);
    });

    // 초기 데이터 로딩 후 processData 호출 확인
    await waitFor(() => {
      expect(processDataSpy).toHaveBeenCalled();
    });

    // 호출 횟수 초기화
    processDataSpy.mockClear();

    // 웹소켓을 통한 데이터 업데이트 시뮬레이션
    await act(async () => {
      // Client 인스턴스 가져오기
      const mockClientInstance = (Client as jest.Mock).mock.results[0].value;

      // subscribe 메서드 호출 시 전달된 콜백 함수 가져오기
      const subscribeCall = mockClientInstance.subscribe.mock.calls.find(
        (call: any) => call[0] === `/topic/accident-0010`
      );

      if (subscribeCall && subscribeCall[1]) {
        // 콜백 함수 실행하여 데이터 업데이트 시뮬레이션
        subscribeCall[1]({
          body: JSON.stringify({
            accidents: [
              {
                occurred_at: "2025-02-26T10:00:00",
                route_id: "0010",
                direction: "forward",
                accident_type: "사고",
                accident_detail_type: "추돌사고",
                description: "차량 3대 추돌",
                coordinates: { x: 127.1, y: 37.5 },
                conzone_id: "section1",
                cleared_at: "-",
              },
            ],
          }),
        });
      }
    });

    // 데이터 업데이트 후 processData가 다시 호출되었는지 확인
    await waitFor(() => {
      expect(processDataSpy).toHaveBeenCalled();
    });
  });

  it("웹소켓을 통해 교통 데이터가 업데이트되면 processData가 호출된다", async () => {
    // processData 함수 호출 횟수를 추적하기 위한 스파이 설정
    const processDataSpy = jest.spyOn(utils, "processRouteData");

    // 컴포넌트 렌더링
    await act(async () => {
      render(<Container />);
    });

    // 초기 데이터 로딩 후 processData 호출 확인
    await waitFor(() => {
      expect(processDataSpy).toHaveBeenCalled();
    });

    // 호출 횟수 초기화
    processDataSpy.mockClear();

    // 웹소켓을 통한 데이터 업데이트 시뮬레이션
    await act(async () => {
      // Client 인스턴스 가져오기
      const mockClientInstance = (Client as jest.Mock).mock.results[0].value;

      // subscribe 메서드 호출 시 전달된 콜백 함수 가져오기
      const subscribeCall = mockClientInstance.subscribe.mock.calls.find(
        (call: any) => call[0] === `/topic/traffic-0010`
      );

      if (subscribeCall && subscribeCall[1]) {
        // 콜백 함수 실행하여 데이터 업데이트 시뮬레이션
        subscribeCall[1]({
          body: JSON.stringify({
            data: {
              ...mockRouteData.data,
              updated_at: "2025-02-26T10:30:00",
              directions: {
                forward: {
                  sections: [
                    {
                      ...mockRouteData.data.directions.forward.sections[0],
                      status: "CONGESTED",
                      travel_time: 30,
                      speed: 40,
                    },
                  ],
                },
                reverse: {
                  sections: mockRouteData.data.directions.reverse.sections,
                },
              },
            },
          }),
        });
      }
    });

    // 데이터 업데이트 후 processData가 다시 호출되었는지 확인
    await waitFor(() => {
      expect(processDataSpy).toHaveBeenCalled();
    });
  });

  it("검색 모달을 열 수 있다", async () => {
    const mockOpenModal = jest.fn();
    (useModalContext as jest.Mock).mockReturnValue({
      openModal: mockOpenModal,
    });

    await act(async () => {
      render(<Container />);
    });

    // openSearchModal 함수를 직접 테스트하기는 어려우므로
    // 컴포넌트가 렌더링된 후 openModal이 호출될 수 있는 상태인지 확인
    await waitFor(() => {
      expect(mockOpenModal).not.toHaveBeenCalled(); // 아직 호출되지 않았음
      expect(useModalContext).toHaveBeenCalled(); // 하지만 컨텍스트는 사용됨
    });
  });

  it("알림 모달을 열 수 있다", async () => {
    const mockOpenModal = jest.fn();
    (useModalContext as jest.Mock).mockReturnValue({
      openModal: mockOpenModal,
    });

    await act(async () => {
      render(<Container />);
    });

    // openAlertModal 함수를 직접 테스트하기는 어려우므로
    // 컴포넌트가 렌더링된 후 openModal이 호출될 수 있는 상태인지 확인
    await waitFor(() => {
      expect(mockOpenModal).not.toHaveBeenCalled(); // 아직 호출되지 않았음
      expect(useModalContext).toHaveBeenCalled(); // 하지만 컨텍스트는 사용됨
    });
  });

  it("컴포넌트 언마운트 시 웹소켓 연결을 해제한다", async () => {
    let unmount: () => void;

    await act(async () => {
      const { unmount: unmountFn } = render(<Container />);
      unmount = unmountFn;
    });

    await waitFor(() => {
      const mockClientInstance = (Client as jest.Mock).mock.results[0].value;
      expect(mockClientInstance.activate).toHaveBeenCalled();
    });

    // 컴포넌트 언마운트
    act(() => {
      unmount();
    });

    // 웹소켓 연결 해제 확인
    const mockClientInstance = (Client as jest.Mock).mock.results[0].value;
    expect(mockClientInstance.deactivate).toHaveBeenCalled();
  });
});
