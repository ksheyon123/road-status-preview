import Container from "@/components/Container/Container";

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
