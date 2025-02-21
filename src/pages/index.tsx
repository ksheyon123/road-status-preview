import Container from "@/components/Container/Container";
import { getRoutes } from "@/https/apis";

export default function Page(props: any) {
  const { data } = props;
  return (
    <main>
      <Container data={data} />
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const initRouteId = "0010";
  const { data } = await getRoutes(initRouteId);
  return {
    props: {
      data,
    },
  };
}
