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

// S3 related types
export type CoreFile = { key: string; data: any; contentType: string };
export type ImageLocationDetails = {
    presignedUrl: string;
    key: string;
};

export type PresignedUrlWithMeta = {
    url: string;
    key: string;
};

export type S3GetObjectRequest = {
    Bucket: string;
    Key: string;
};
