import { AccidentInfo, RealTimeTraffic, RouteInfo } from "@/types/index";
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
import {
  processRouteData,
  processAccidentData,
  processRealTimeRouteData,
} from "@/utils/utils";

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
  const [realtimeData, setRealtimeData] = useState<RealTimeTraffic[]>([]);
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
    const temp = processRouteData(
      rawRouteData,
      filteredAccidents,
      start_point,
      end_point
    );

    const processedRouteData = processRealTimeRouteData(temp, realtimeData);
    setAccidents(processedAccidents);
    setRoute(processedRouteData);
  }, [
    rawRouteData,
    rawAccidents,
    realtimeData,
    route_id,
    start_point,
    end_point,
  ]);

  // API에서 데이터 가져오기
  const fetchData = async () => {
    try {
      const [accidentData, routeData] = await Promise.all([
        getAccidents(),
        getRoutes(route_id),
      ]);
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
    processData();
  }, [processData]);

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
      from: "정보없음",
      to: "정보없음",
      accidentType: "정보없음",
      accidentDetailType: "정보없음",
      content: "정보없음",
      fromTime: "",
      toTime: "",
    };

    // 사고 정보가 있을 경우 데이터 업데이트
    if (currentAccident) {
      const {
        accident_detail_type,
        description,
        occurred_at,
        cleared_at,
        start_name,
        end_name,
      } = currentAccident;
      defaultData = {
        from: start_name,
        to: end_name,
        accidentType: "",
        accidentDetailType: accident_detail_type,
        content: description,
        fromTime: occurred_at
          ? moment(occurred_at).format("YYYY-MM-DD HH:mm:ss")
          : "",
        toTime: cleared_at
          ? moment(cleared_at).format("YYYY-MM-DD HH:mm:ss")
          : "",
      };
    }

    openModal(
      <div className="px-2.5 py-2.5 w-[500px]">
        <TravelItem rowWidth={414} rowHeight={40} data={defaultData} />
      </div>,
      <AlertModalHeader direction={conzoneId.includes("S") ? "s" : "e"} />,
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
          brokerURL: process.env.NEXT_PUBLIC_WS_URL,
          ...(process.env.NODE_ENV === "development" && {
            debug: console.log,
          }),
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
                    setRawAccidents(accidentData);
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
                  const trafficData: RealTimeTraffic[] = JSON.parse(
                    message.body
                  );
                  console.log("교통 메시지 수신:", trafficData);

                  // 소켓으로 받은 교통 데이터 업데이트
                  if (trafficData && trafficData.length > 0) {
                    setRealtimeData((prevRouteData) => {
                      if (!prevRouteData) return trafficData;
                      return trafficData.map((newItem) => {
                        // 이전 데이터에서 같은 conzone_id를 가진 항목 찾기
                        const prevItem = prevRouteData.find(
                          (item) => item.conzone_id === newItem.conzone_id
                        );

                        // 이전 항목이 없거나, congestion 상태나 travel_time이 변경된 경우에만 추가
                        if (
                          !prevItem ||
                          prevItem.congestion !== newItem.congestion ||
                          prevItem.travel_time !== newItem.travel_time
                        ) {
                          return newItem;
                        } else {
                          return prevItem;
                        }
                      });
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
