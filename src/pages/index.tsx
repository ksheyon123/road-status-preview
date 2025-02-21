import Container from "@/components/Container/Container";
import { getRoutes } from "@/https/apis";

export default function Page() {
  return (
    <main>
      <Container />
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  return {
    props: {},
  };
}
