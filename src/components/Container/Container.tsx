import { HighwayInfo, RouteInfo } from "@/types/index";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useModalContext } from "@/contexts/ModalContext";
import { useHighwayContext } from "@/contexts/HighwayContext";
import SearchModal from "../Modal/SearchModal";
import { getRoutes } from "@/https/apis";
import DirectionTabs from "../DirectionTabs/DirectionTabs";
import AlertModalHeader from "../Modal/AlertModalHeader";

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

  const [activeTab, setActiveTab] = useState("전체구간");
  const [viewData, setViewData] = useState<
    RouteInfo & { from: string; to: string }
  >();

  const { route_name, route_id, start_point, end_point } = curHighway!;

  const updateRoute = async () => {
    try {
      const { data } = await getRoutes(route_id);
      setViewData({
        ...data,
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

  const openAlertModal = () => {
    openModal(<div>AAAAAA</div>, <AlertModalHeader />, {
      useHeader: true,
    });
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
        {activeTab === "사고.통제" && <DirectionTabs />}
      </div>
    </>
  );
};

export default Container;
