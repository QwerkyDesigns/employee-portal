import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/errorpages/AccessDenied";
import Layout from "@/components/Layout";

export default function ProtectedPage({ pageName }: { pageName: string }) {
  const { data: session } = useSession();
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout pageName={pageName}>
        <AccessDenied />
      </Layout>
    );
  }

  // If session exists, display content
  return (
    <Layout pageName={pageName}>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Layout>
  );
}
