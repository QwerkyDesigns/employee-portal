export type HeaderLink = {
    label: string;
    value: string;
};

export const headerLinkGroups: { [key: string]: HeaderLink[] } = {
    Create: [
        {
            label: "Create w/ Dalle",
            value: "/create/with-dalle",
        },
        {
            label: "Upload images",
            value: "/create/with-upload",
        },
    ],
    Review: [
        {
            label: "Review Dalle Creations",
            value: "/review/dalle",
        },
        {
            label: "Review uploads",
            value: "/review/uploads",
        },
    ],
    Archive: [
        {
            label: "Archived Images",
            value: "/archive/all-archived"
        }
    ]
};

export const unGroupedHeaderLinks: HeaderLink[] = [
    {
        label: "Home",
        value: "/",
    },
];
