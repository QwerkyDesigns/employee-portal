import { Button, Select } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { headerLinkGroups, unGroupedHeaderLinks } from "./headerLinks";
import { Text } from "@mantine/core";

export const NavItems = () => {
    const router = useRouter();
    return (
        <nav className="flex flex-row justify-between w-full ml-2 mr-2 items-center h-[150px]">
            <div />
            {unGroupedHeaderLinks.map((hl, i) => {
                return (
                    <Link href={hl.value}>
                        <Text fw={700} fz="lg">
                            {hl.label}
                        </Text>
                    </Link>
                );
            })}
            {Object.keys(headerLinkGroups).map((name, i) => {
                return (
                    <div className="flex flex-col justify-center text-center">
                        <Text className="underline" fz="lg" fw={700}>
                            {name}
                        </Text>
                        {headerLinkGroups[name].map((g, i) => {
                            return (
                                <Button
                                    className="text-lg text-text bg-primary m-1"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(g.value);
                                    }}
                                >
                                    {g.label}
                                </Button>
                            );
                        })}
                    </div>
                );
            })}
            <div />
        </nav>
    );
};
