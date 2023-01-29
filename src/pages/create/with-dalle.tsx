import Layout from "@/components/Layout";
import { Container, Input, TextInput } from "@mantine/core";

export default function CreateWithDallePage() {
    return (
        <Layout pageName="Create dall-e images">
            <Container>
                <TextInput
                    style={{ marginTop: "4rem" }}
                    placeholder="A manatee sitting on the beach with a cocktail"
                    label="Provide a moderately specific description of an image you would like to create"
                    withAsterisk
                />
            </Container>
        </Layout>
    );
}
