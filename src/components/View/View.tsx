import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicHeader = dynamic(() => import("@/components/Header/Header"), {
  ssr: false, // 필요한 경우
});

const DynamicTrafficDashboard = dynamic(
  () => import("@/components/TrafficDashboard/TrafficDashboard"),
  {
    ssr: false, // 필요한 경우
  }
);

const DynamicTabs = dynamic(() => import("@/components/Tabs/Tabs"), {
  ssr: false, // 필요한 경우
});

// const DynamicMap = dynamic(
//   () =>
//     import("leaflet/LeafLet")
//       .then((module) => (module as any).LeafletD3Map)
//       .catch((err) => {
//         console.error("Map loading failed:", err);
//         return () => <></>;
//       }),
//   {
//     loading: () => <div>Loading map...</div>,
//     ssr: false, // 서버사이드 렌더링이 필요없다면
//   }
// );

const View: React.FC = () => {
  const [activeTab, setActiveTab] = useState("전체구간");
  return (
    <>
      <DynamicHeader />
      <div className="pt-[56px]">
        <DynamicTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {/* <DynamicMap /> */}
      <DynamicTrafficDashboard />
    </>
  );
};

export default View;
