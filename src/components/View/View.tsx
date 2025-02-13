import { RouteInfo } from "@/types/index";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";

const DynamicHeader = dynamic(() => import("@/components/Header/Header"), {
  ssr: false, // 필요한 경우
});

const DynamicTrafficDashboard = dynamic<{
  data: RouteInfo;
  onClickDetail: Function;
}>(() => import("@/components/TrafficDashboard/TrafficDashboard"), {
  ssr: false, // 필요한 경우
});

const DynamicTabs = dynamic(() => import("@/components/Tabs/Tabs"), {
  ssr: false, // 필요한 경우
});

const DynamicMap = dynamic<{ width: string; height: string }>(
  () =>
    import("leaflet/LeafLet")
      .then((module) => (module as any).LeafletD3Map)
      .catch((err) => {
        console.error("Map loading failed:", err);
        return false;
      }),
  {
    loading: () => <div>Loading map...</div>,
    ssr: false, // 서버사이드 렌더링이 필요없다면
  }
);

const View: React.FC = ({ data }: any) => {
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
        <DynamicHeader onBack={handleBack} />
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
