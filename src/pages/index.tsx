import Link from "next/link";
import dynamic from "next/dynamic";
import { ListViewProps } from "@/components/ListView/ListView";
import { STATUS_CODE } from "@/constants";
import { RouteInfo } from "@/types/index";
import ic_highway from "@/assets/images/highway.png";
import ic_right_arrow from "@/assets/images/arrows_button_right__arrow_small.png";

const ListView = dynamic<ListViewProps<RouteInfo>>(
  () => import("@/components/ListView/ListView"),
  {
    ssr: false, // 필요한 경우
    loading: () => <>Loading...</>,
  }
);

export default function Home(props: any) {
  const { data } = props;
  return (
    <div>
      <ListView
        items={data}
        renderItem={(item, idx) => {
          const { route_name, route_id } = item;
          return (
            <Link
              href={`/routes/${route_id}`}
              className="flex items-center justify-between p-4 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <img src={ic_highway.src} alt="route_img" />
                <span className="text-lg">{route_name}</span>
              </div>
              <img src={ic_right_arrow.src} alt="right_arrow" />
            </Link>
          );
        }}
      />
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  let data = [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/highways`
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
