export type HeaderLink = {
    text: string;
    path: string;
};

export const headerLinks: HeaderLink[] = [
    {
        text: "Home",
        path: "/",
    },
    {
        text: "Create w/ Dalle",
        path: "/create/with-dalle",
    },
    {
        text: "Review Dalle Creations",
        path: "/review/dalle",
    },
    {
        text: "Upload images",
        path: "/create/with-upload",
    },
    {
        text: "Review uploads",
        path: "/review/uploads",
    },
];
