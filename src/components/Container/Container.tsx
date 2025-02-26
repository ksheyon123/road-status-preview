import { AccidentInfo, RouteInfo, SectionInfo } from "@/types/index";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { useModalContext } from "@/contexts/ModalContext";
import { useHighwayContext } from "@/contexts/HighwayContext";
import SearchModal from "../Modal/SearchModal";
import { getAccidents, getRoutes } from "@/https/apis";
import { DirectionTabs, TravelItem } from "../DirectionTabs/DirectionTabs";
import AlertModalHeader from "../Modal/AlertModalHeader";
import moment from "moment";
import Legend from "@/components/Legend/Legend";

import SockJS from "sockjs-client";
import { Client, IMessage, IFrame, StompSubscription } from "@stomp/stompjs";
import { processRouteData, processAccidentData } from "@/utils/utils";

const DynamicHeader = dynamic(() => import("@/components/Header/Header"), {
  ssr: false, // 필요한 경우
});

const DynamicTrafficDashboard = dynamic<{
  data: RouteInfo & { from: string; to: string };
  onClickDetail: Function;
  openModal: Function;
}>(() => import("@/components/TrafficDashboard/TrafficDashboard"), {
  ssr: false, // 필요한 경우
});

const DynamicTabs = dynamic(() => import("@/components/Tabs/Tabs"), {
  ssr: false, // 필요한 경우
});

const Container: React.FC = () => {
  const { openModal } = useModalContext();
  const { curHighway } = useHighwayContext();
  const [rawRouteData, setRawRouteData] = useState<RouteInfo | null>(null);
  const [rawAccidents, setRawAccidents] = useState<AccidentInfo["accidents"]>(
    []
  );
  const [activeTab, setActiveTab] = useState("전체구간");
  const [accidents, setAccidents] = useState<AccidentInfo["accidents"]>([]);
  const [viewData, setRoute] = useState<
    RouteInfo & { from: string; to: string }
  >();

  const { route_name, route_id, start_point, end_point, route_display_id } =
    curHighway!;

  // 데이터 처리 함수 - 원본 데이터를 기반으로 가공된 데이터 생성
  const processData = useCallback(() => {
    if (!rawRouteData || !rawAccidents.length) return;

    const filteredAccidents = rawAccidents.filter(
      (el) => el.route_id === route_id
    );

    const { forward, reverse } = rawRouteData.directions;

    // 가공된 사고 데이터 생성
    const processedAccidents = processAccidentData(
      filteredAccidents,
      forward.sections,
      reverse.sections
    );

    // 가공된 경로 데이터 생성
    const processedRouteData = processRouteData(
      rawRouteData,
      filteredAccidents,
      start_point,
      end_point
    );

    setAccidents(processedAccidents);
    setRoute(processedRouteData);
  }, [rawRouteData, rawAccidents, route_id, start_point, end_point]);

  // API에서 데이터 가져오기
  const fetchData = async () => {
    try {
      const [accidentData, routeData] = await Promise.all([
        getAccidents(),
        getRoutes(route_id),
      ]);
      console.log(
        accidentData.data.accidents.filter((el) => el.route_id === "0010")
      );
      // 원본 데이터 저장
      setRawAccidents(accidentData.data.accidents);
      setRawRouteData(routeData.data);
    } catch (e) {
      console.error("데이터 가져오기 오류:", e);
      throw e;
    }
  };

  // 데이터 가져오기 및 처리
  useEffect(() => {
    fetchData();
  }, [route_id]);

  // 원본 데이터가 변경되면 가공 데이터 업데이트
  useEffect(() => {
    console.log("PROCESSING");
    processData();
  }, [rawRouteData, rawAccidents, processData]);

  const openSearchModal = () => {
    openModal(<SearchModal />);
  };

  const openAlertModal = (conzoneId: string) => {
    const filteredAccidents = accidents.filter(
      (el) => el.conzone_id === conzoneId
    );
    const currentAccident = filteredAccidents[0];

    // 기본 데이터 초기화
    let defaultData = {
      route: "정보없음",
      type: "정보없음",
      content: "정보없음",
      time: "- ~ -",
    };

    // 사고 정보가 있을 경우 데이터 업데이트
    if (currentAccident) {
      const {
        accident_type,
        accident_detail_type,
        description,
        occurred_at,
        cleared_at,
        start_name,
        end_name,
      } = currentAccident;

      defaultData = {
        route: `${start_name} -> ${end_name}`,
        type: `${accident_type} ${accident_detail_type}`,
        content: description,
        time: `${moment(occurred_at).format("YYYY-MM-DD HH:mm:ss")} ~ ${
          cleared_at === "-" || !cleared_at
            ? "진행중"
            : moment(cleared_at).format("YYYY-MM-DD HH:mm:ss")
        }`,
      };
    }

    openModal(
      <div className="px-2.5 py-2.5">
        <TravelItem
          tableWidth={500}
          rowWidth={414}
          rowHeight={40}
          data={defaultData}
        />
      </div>,
      <AlertModalHeader />,
      {
        useHeader: true,
      }
    );
  };

  // 소켓 연결 및 데이터 처리
  useEffect(() => {
    let client: Client;
    const createStompClient = (): void => {
      try {
        client = new Client({
          brokerURL: "wss://svc1.metadium.club:8888/ws-highway/websocket",
          debug:
            process.env.NODE_ENV === "development" ? console.log : undefined,
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          onConnect: (frame: IFrame): void => {
            console.log("STOMP 연결 성공:", frame);

            // 사고 정보 구독
            client.subscribe(
              `/topic/accident-${route_id}`,
              (message: IMessage): void => {
                try {
                  const accidentData: AccidentInfo["accidents"] = JSON.parse(
                    message.body
                  );
                  console.log("사고 메시지 수신:", accidentData);

                  // 소켓으로 받은 사고 데이터 업데이트
                  if (accidentData && accidentData.length > 0) {
                    setRawAccidents((prevAccidents) => {
                      // 기존 데이터와 새 데이터를 병합하는 로직
                      // 실제 구현은 데이터 구조에 따라 달라질 수 있음
                      const newAccidents = [...prevAccidents];

                      // 새로운 사고 정보 추가 또는 기존 정보 업데이트
                      accidentData.forEach((newAccident: any) => {
                        const existingIndex = newAccidents.findIndex(
                          (acc) => acc.conzone_id === newAccident.conzone_id
                        );

                        if (existingIndex >= 0) {
                          newAccidents[existingIndex] = newAccident;
                        } else {
                          newAccidents.push(newAccident);
                        }
                      });

                      return newAccidents;
                    });
                  }
                } catch (e) {
                  console.error("사고 메시지 파싱 오류:", e);
                }
              }
            );

            // 교통 정보 구독
            client.subscribe(
              `/topic/traffic-${route_id}`,
              (message: IMessage): void => {
                try {
                  const trafficData: RouteInfo = JSON.parse(message.body);
                  console.log("교통 메시지 수신:", trafficData);

                  // 소켓으로 받은 교통 데이터 업데이트
                  if (trafficData) {
                    setRawRouteData((prevRouteData) => {
                      if (!prevRouteData) return trafficData;

                      // 기존 데이터와 새 데이터를 병합하는 로직
                      // 실제 구현은 데이터 구조에 따라 달라질 수 있음
                      return {
                        ...prevRouteData,
                        // 필요한 필드 업데이트
                        ...trafficData,
                      };
                    });
                  }
                } catch (e) {
                  console.error("교통 메시지 파싱 오류:", e);
                }
              }
            );
          },
          onStompError: (frame: IFrame): void => {
            console.error("STOMP 프로토콜 오류:", frame);
          },
          onWebSocketClose: (evt: CloseEvent): void => {
            console.log("WebSocket 연결 종료:", evt);
          },
        });

        client.activate();
      } catch (e) {
        console.error("STOMP 클라이언트 생성 오류:", e);
      }
    };

    createStompClient();

    return () => {
      console.log("STOMP 연결 해제됨");
      if (client) {
        client.deactivate();
      }
    };
  }, [route_id]);

  console.log(accidents);

  return (
    <>
      <div className="pt-[40px]">
        <DynamicHeader
          title={`${route_name}고속도로`}
          routeId={route_display_id}
          openModal={openSearchModal}
        />
        <DynamicTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "전체구간" && viewData && (
          <DynamicTrafficDashboard
            data={viewData}
            onClickDetail={() => {}}
            openModal={openAlertModal}
          />
        )}
        {activeTab === "사고.통제" && <DirectionTabs data={accidents} />}
        <Legend />
      </div>
    </>
  );
};

export default Container;
