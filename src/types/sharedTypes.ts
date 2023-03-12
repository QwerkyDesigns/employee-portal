import { Session } from 'next-auth';
import { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type DashboardProps = {
    pageName: string;
    session: Session | null;
    children: React.ReactNode;
};

export type ArtistStyleMeta = {
    style: string;
    artistName: string;
    imageUrl: string;
    wiki: string;
};
