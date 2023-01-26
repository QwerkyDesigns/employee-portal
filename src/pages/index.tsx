import { Inter } from "@next/font/google";
import Layout from "@/components/Layout";
import { Title, Text } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout pageName="Qwerky Designs Employee Portal">
      <div style={{ marginTop: "4rem" }}>
        <Title align="center" style={{ marginBottom: "1rem" }}>
          Welcome to the Qwerky Designs backend portal!
        </Title>
        <Text align="center">
          You can use the navigation in the header to navigate to the page you
          need to do your work, or you can use the following options:
        </Text>
      </div>
    </Layout>
  );
}
