import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../buttons/Button';
import { headerLinkGroups, unGroupedHeaderLinks } from './headerLinks';

export const NavItems = () => {
    const router = useRouter();
    return (
        <nav className="ml-2 mr-2 flex h-[150px] w-full flex-row items-center justify-between">
            <div />
            {unGroupedHeaderLinks.map((hl, i) => {
                return (
                    <Link key={hl.label} href={hl.value}>
                        <h3>{hl.label}</h3>
                    </Link>
                );
            })}
            {Object.keys(headerLinkGroups).map((name, i) => {
                return (
                    <div key={name} className="flex flex-col justify-center text-center">
                        <h3 className="underline">{name}</h3>
                        {headerLinkGroups[name].map((g, i) => {
                            return (
                                <div key={g.value}>
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push(g.value);
                                        }}
                                    >
                                        {g.label}
                                    </Button>
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
