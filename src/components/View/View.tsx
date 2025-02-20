import { RouteInfo } from "@/types/index";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useModalContext } from "@/contexts/ModalContext";
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

const View: React.FC<{ data: RouteInfo & { from: string; to: string } }> = ({
  data,
}) => {
  const { openComponent } = useModalContext();
  const { route_name, route_id } = data;
  const [activeTab, setActiveTab] = useState("전체구간");

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
        <DynamicTrafficDashboard data={data} onClickDetail={onClickDetail} />
      </div>
    </>
  );
};

export default View;
