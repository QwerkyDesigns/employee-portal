import styles from "@/styles/header.module.css";
import Link from "next/link";
import { headerLinks } from "./headerLinks";

export const NavItems = () => {
    return (
        <nav style={{ display: "flex", flexDirection: "row" }}>
            {headerLinks.map((hl, i) => {
                return (
                    <ul key={i} className={styles.navItems}>
                        <li className={styles.navItem}>
                            <Link href={hl.path}>{hl.text}</Link>
                        </li>
                    </ul>
                );
            })}
        </nav>
    );
};
