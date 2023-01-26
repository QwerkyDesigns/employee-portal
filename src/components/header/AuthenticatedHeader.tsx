import Link from "next/link";
import styles from "@/styles/header.module.css";
import { Session } from "next-auth";
import { AuthButton } from "../buttons/AuthButton";
import { Container } from "@mantine/core";

export const AuthenticatedHeader = ({ session }: { session: Session }) => {
  return (
    <div className={styles.headerContent}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.userDetails}>
        {session.user?.image && (
          <span
            style={{ backgroundImage: `url('${session.user.image}')` }}
            className={styles.avatar}
          />
        )}
        <span className={styles.signedInText}>
          <small>Signed in as</small>
          <br />
          <strong>
            {session.user?.email ??
              session.user?.name ??
              "Could not find a username for the current session..."}
          </strong>
        </span>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">API</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin">Admin</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/me">Me</Link>
          </li>
        </ul>
      </nav>
      <AuthButton />
    </div>
  );
};
