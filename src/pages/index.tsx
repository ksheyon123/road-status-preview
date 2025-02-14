import Link from "next/link";
import ListView from "@/components/ListView/ListView";
import { STATUS_CODE } from "@/constants";
import ic_highway from "@/assets/images/highway.png";
import ic_right_arrow from "@/assets/images/arrows_button_right__arrow_small.png";

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
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃 설정

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/highways`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data: result } = await response.json();
    const { highways } = result;

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
