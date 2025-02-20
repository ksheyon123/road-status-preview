import View from "@/components/View/View";
import { get } from "@/https";
import { HighwayInfo, RouteInfo } from "@/types/index";
import { ModalProvider } from "@/contexts/ModalContext";

export default function Home(props: any) {
  const { data } = props;
  return (
    <main>
      <ModalProvider>
        <View data={data} />
      </ModalProvider>
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const id = "0010";
  const config = {};
  const [rHighway, rRoutes] = await Promise.all([
    get<HighwayInfo>(`${process.env.NEXT_PUBLIC_API_URL}/api/highways`, config),
    get<RouteInfo>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/routes/${id}`,
      config
    ),
  ]);

  const { data: hD } = rHighway;
  const { highways } = hD;
  const { data: rD } = rRoutes;
  const { route_id } = rD;
  const [filtered] = highways.filter((el) => el.route_id === route_id);
  let newData = {
    ...rD,
    from: filtered.start_point,
    to: filtered.end_point,
  };
  // Pass data to the page via props
  return {
    props: {
      data: newData,
    },
  };
}
