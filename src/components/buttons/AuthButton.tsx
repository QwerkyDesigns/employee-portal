import { Button } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./AuthButton.module.css";

export const AuthButton = () => {
  const { data: session } = useSession();
  return (
    <Button
      className={styles.authButton}
      onClick={(e) => {
        e.preventDefault();
        if (session) {
          signOut();
        } else {
          signIn();
        }
      }}
    >
      {session ? "Sign Out" : "Sign In"}
    </Button>
  );
};
