import { AccidentInfo, RouteInfo, SectionInfo } from "@/types/index";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useModalContext } from "@/contexts/ModalContext";
import { useHighwayContext } from "@/contexts/HighwayContext";
import SearchModal from "../Modal/SearchModal";
import { getAccidents, getRoutes } from "@/https/apis";
import { DirectionTabs, TravelItem } from "../DirectionTabs/DirectionTabs";
import AlertModalHeader from "../Modal/AlertModalHeader";
import moment from "moment";
import Legend from "@/components/Legend/Legend";

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
  const [accidents, setAccidents] = useState<AccidentInfo["accidents"]>([]);

  const [activeTab, setActiveTab] = useState("전체구간");
  const [viewData, setViewData] = useState<
    RouteInfo & { from: string; to: string }
  >();

  const { route_name, route_id, start_point, end_point } = curHighway!;

  const accidentRouteSet = (
    accidents: AccidentInfo["accidents"],
    forward: SectionInfo[],
    reverse: SectionInfo[]
  ) => {
    return accidents.map((accident) => {
      const { conzone_id } = accident;
      const filteredForwardSection = forward.filter(
        (el) => el.section_id === conzone_id
      )[0];

      const filteredReverseSection = reverse.filter(
        (el) => el.section_id === conzone_id
      )[0];
      if (!!filteredForwardSection) {
        const { start_name, end_name } = filteredForwardSection;
        return {
          ...accident,
          start_name,
          end_name,
        };
      } else if (!!filteredReverseSection) {
        const { start_name, end_name } = filteredReverseSection;
        return {
          ...accident,
          start_name,
          end_name,
        };
      } else {
        return {
          ...accident,
        };
      }
    });
  };

  const updateAccident = (
    sections: SectionInfo[],
    accidents: AccidentInfo["accidents"]
  ) => {
    return sections.map((section) => {
      const hasAccident = !!accidents.find(
        (accident) => accident.conzone_id === section.section_id
      );
      return {
        ...section,
        hasAccident,
      };
    });
  };

  const updateRoute = async () => {
    try {
      const [accidentData, routeData] = await Promise.all([
        getAccidents(),
        getRoutes(route_id),
      ]);
      const { accidents } = accidentData.data;
      const { data } = routeData;
      const filteredAccidents = accidents.filter(
        (el) => el.route_id === route_id
      );
      const { forward, reverse } = data.directions;
      const returnValue = accidentRouteSet(
        filteredAccidents,
        forward.sections,
        reverse.sections
      );
      setAccidents(returnValue);
      setViewData({
        ...data,
        directions: {
          forward: {
            sections: updateAccident(
              data.directions.forward.sections,
              filteredAccidents
            ),
          },
          reverse: {
            sections: updateAccident(
              data.directions.reverse.sections,
              filteredAccidents
            ),
          },
        },
        from: start_point,
        to: end_point,
      });
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    updateRoute();
  }, [route_id]);

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

  return (
    <>
      <div className="pt-[40px]">
        <DynamicHeader
          title={`${route_name}고속도로`}
          routeId={Number(route_id)}
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
