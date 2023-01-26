import { Container, Text, Title } from "@mantine/core";
import styles from "./AccessDenied.module.css";
export default function AccessDenied() {
  return (
    <Container className={styles.container}>
      <Title align="center">Access Denied</Title>
      <Text align="center">You must be signed in to view this page</Text>
    </Container>
  );
}
