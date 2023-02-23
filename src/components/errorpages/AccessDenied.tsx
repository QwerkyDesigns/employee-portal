import { Container, Text, Title } from "@mantine/core";
export default function AccessDenied() {
  return (
    <Container className="m-2">
      <Title align="center">Access Denied</Title>
      <Text align="center">You must be signed in to view this page</Text>
    </Container>
  );
}
