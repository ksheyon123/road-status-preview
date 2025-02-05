// app/page.tsx
import dynamic from "next/dynamic";
import { ComponentType, Suspense } from "react";
import "tailwindcss/tailwind.css";

// const Header: ComponentType<any> = dynamic(
//   () => {
//     return import("component/Header").catch((err) => {
//       console.error("Error loading remote Header:", err);
//       return () => <div>Error loading Header</div>;
//     });
//   },
//   {
//     ssr: false,
//     loading: () => <div>Loading Header...</div>,
//   }
// );

// const Map: ComponentType<any> = dynamic(
//   async () => {
//     const component = await import("leaflet/LeafLet");
//     return (component as any).LeafletD3Map;
//   },
//   {
//     ssr: false,
//     loading: () => <div>Loading Header...</div>,
//   }
// );
export default function Page() {
  return (
    <main>
      <div></div>
    </main>
  );
}
