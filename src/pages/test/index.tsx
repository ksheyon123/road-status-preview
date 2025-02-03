// app/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Header = dynamic(
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
export default function Page() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Header />
    </Suspense>
  );
}
