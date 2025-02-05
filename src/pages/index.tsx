import dynamic from "next/dynamic";

const DynamicView = dynamic(() => import("@/components/View/View"), {
  ssr: false, // 필요한 경우
});

export default function Home() {
  return (
    <main>
      <DynamicView />
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Pass data to the page via props
  return { props: {} };
}
