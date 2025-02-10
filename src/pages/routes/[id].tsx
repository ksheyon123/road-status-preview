import { STATUS_CODE } from "@/constants";
import dynamic from "next/dynamic";
import {} from "@/types/index";

const DynamicView = dynamic<{ data: any }>(
  () => import("@/components/View/View"),
  {
    ssr: false, // 필요한 경우
  }
);

export default function Home(props: any) {
  const { data } = props;
  return (
    <main>
      <DynamicView data={data} />
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps(props: any) {
  let data = [];
  const { query } = props;
  const id = query.id || "";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/routes/${id}`
  );

  if (!response) {
    return {
      notFound: true,
    };
  }
  if (response.status === STATUS_CODE.SUCCESS) {
    const { data: result } = await response.json();
    data = result;
  }
  // Pass data to the page via props
  return {
    props: {
      data,
    },
  };
}
