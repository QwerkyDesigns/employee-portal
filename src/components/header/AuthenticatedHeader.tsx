import styles from "@/styles/header.module.css";
import { Session } from "next-auth";
import { AuthButton } from "../buttons/AuthButton";
import { NavItems } from "./NavItems";

export const AuthenticatedHeader = ({ session }: { session: Session }) => {
    return (
        <div className={styles.headerContent}>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <div className={styles.userDetails}>
                {session.user?.image && (
                    <span style={{ backgroundImage: `url('${session.user.image}')` }} className={styles.avatar} />
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
            <NavItems />
            <AuthButton />
        </div>
    );
};

