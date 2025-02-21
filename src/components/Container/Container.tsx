import { HighwayInfo, RouteInfo } from "@/types/index";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useModalContext } from "@/contexts/ModalContext";
import { useHighwayContext } from "@/contexts/HighwayContext";
import SearchModal from "../Modal/SearchModal";

const DynamicHeader = dynamic(() => import("@/components/Header/Header"), {
  ssr: false, // 필요한 경우
});

const DynamicTrafficDashboard = dynamic<{
  data: RouteInfo & { from: string; to: string };
  onClickDetail: Function;
}>(() => import("@/components/TrafficDashboard/TrafficDashboard"), {
  ssr: false, // 필요한 경우
});

const DynamicTabs = dynamic(() => import("@/components/Tabs/Tabs"), {
  ssr: false, // 필요한 경우
});

const Container: React.FC<{ data: RouteInfo }> = ({ data }) => {
  const { openComponent } = useModalContext();
  const { highways, curHighway } = useHighwayContext();
  const [activeTab, setActiveTab] = useState("전체구간");
  const [viewData, setViewData] = useState<
    RouteInfo & { from: string; to: string }
  >({
    ...data,
    from: "",
    to: "",
  });

  const { route_name, route_id } = curHighway!;

  useEffect(() => {
    if (highways.length > 0) {
      const [filtered] = highways.filter(
        (el: HighwayInfo["highways"][0]) => el.route_id === route_id
      );
      setViewData({
        ...data,
        from: filtered.start_point,
        to: filtered.end_point,
      });
    }
  }, [highways, data, route_id]);

  const onClickDetail = async () => {
    setActiveTab("구간상세");
  };

  const openModal = () => {
    openComponent(SearchModal);
  };

  return (
    <>
      <div className="pt-[40px]">
        <DynamicHeader
          title={`${route_name}고속도로`}
          routeId={Number(route_id)}
          openModal={openModal}
        />
        <DynamicTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <DynamicTrafficDashboard
          data={viewData}
          onClickDetail={onClickDetail}
        />
      </div>
    </>
  );
};

export default Container;
