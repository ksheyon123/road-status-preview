import { RouteInfo } from "@/types/index";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";

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
  const { route_name } = data;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("전체구간");

  const handleBack = () => {
    router.back();
  };

  const onClickDetail = async () => {
    setActiveTab("구간상세");
  };

  return (
    <>
      <div className="pt-[40px]">
        <DynamicHeader onBack={handleBack} title={`${route_name}고속도로`} />
        <DynamicTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* {!!DynamicMap && (
          <div className="relative z-0 flex justify-center items-center w-screen h-[600px]  bg-[#e7e7e6]">
            <DynamicMap width="600px" height="600px" />
          </div>
        )} */}
        <DynamicTrafficDashboard data={data} onClickDetail={onClickDetail} />
      </div>
    </>
  );
};

export default View;
