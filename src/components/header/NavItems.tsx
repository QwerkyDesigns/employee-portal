import { Button, Select } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { headerLinkGroups, unGroupedHeaderLinks } from "./headerLinks";
import { Text } from "@mantine/core";
import { NormalButton } from "../buttons/NormalButton";

export const NavItems = () => {
    const router = useRouter();
    return (
        <nav className="flex flex-row justify-between w-full ml-2 mr-2 items-center h-[150px]">
            <div />
            {unGroupedHeaderLinks.map((hl, i) => {
                return (
                    <Link key={hl.label} href={hl.value}>
                        <Text fw={700} fz="lg">
                            {hl.label}
                        </Text>
                    </Link>
                );
            })}
            {Object.keys(headerLinkGroups).map((name, i) => {
                return (
                    <div key={name} className="flex flex-col justify-center text-center">
                        <Text className="underline" fz="lg" fw={700}>
                            {name}
                        </Text>
                        {headerLinkGroups[name].map((g, i) => {
                            return (
                                <div key={g.value}>
                                    <NormalButton
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push(g.value);
                                        }}
                                    >
                                        {g.label}
                                    </NormalButton>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <div />
        </nav>
    );
};
