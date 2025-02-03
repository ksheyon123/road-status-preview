// app/page.tsx
import dynamic from "next/dynamic";
import { ComponentType, Suspense } from "react";
const Header: ComponentType<any> = dynamic(
  () => {
    return import("component/Header").catch((err) => {
      console.error("Error loading remote Header:", err);
      return () => <div>Error loading Header</div>;
    });
  },
  {
    ssr: false,
    loading: () => <div>Loading Header...</div>,
  }
);

const Map: ComponentType<any> = dynamic(
  async () => {
    const component = await import("leaflet/LeafLet");
    return component.default || component;
  },
  {
    ssr: false,
    loading: () => <div>Loading Header...</div>,
  }
);
export default function Page() {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <Header backBtn="a" />
      </Suspense>
      <Suspense fallback={<>Loading...</>}>
        <Map />
      </Suspense>
    </div>
  );
}
