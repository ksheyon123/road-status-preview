import Link from "next/link";
import ListView from "@/components/ListView/ListView";
import { STATUS_CODE } from "@/constants";
import ic_highway from "@/assets/images/highway.png";
import ic_right_arrow from "@/assets/images/arrows_button_right__arrow_small.png";
import { get } from "@/https";
import { HighwayInfo, RouteInfo } from "@/types/index";
import { ApiError } from "@/types/https";

export default function Home(props: any) {
  const { data } = props;
  return (
    <div>
      <ListView
        items={data}
        renderItem={(item: any, idx) => {
          const { route_name, route_id } = item;
          return (
            <Link
              href={`/routes/${route_id}`}
              className="flex items-center justify-between p-4 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="relative w-[30px] h-[30px]">
                  <img
                    className="w-full h-full"
                    src={ic_highway.src}
                    alt="route_img"
                  />
                  <div className="absolute w-[30px] h-[30px] flex justify-center items-center top-[2px] left-0">
                    <div className="text-[10px] text-[#FFF]">
                      {Number(route_id)}
                    </div>
                  </div>
                </div>
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
  try {
    const config = {};
    const { data } = await get<HighwayInfo>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/highways`,
      config
    );
    const { highways } = data;
    return {
      props: {
        data: highways,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        data: [],
        error: "Failed to load data",
      },
    };
  }
}
