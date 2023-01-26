import styles from "@/styles/header.module.css";
import { AuthButton } from "../buttons/AuthButton";

export const UnAuthenticatedHeader = () => {
  return (
    <div className={styles.headerContent}>
      <span className={styles.notSignedInText}>
        You are not signed in
      </span>
      <div />
      <AuthButton />
    </div>
  );
};
