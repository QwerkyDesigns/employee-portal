import { PaintBrushIcon, DocumentMagnifyingGlassIcon, ArrowUpOnSquareIcon, ClipboardDocumentCheckIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

type NavItems = {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
    current?: boolean;
};
const navItems: NavItems[] = [
    {
        name: 'Create New Artwork',
        href: '/portal/create/image-wizard',
        icon: PaintBrushIcon
    },
    {
        name: 'Upload',
        href: '/portal/create/with-upload',
        icon: ArrowUpOnSquareIcon
    },
    {
        name: 'Review your Creations',
        href: '/portal/review/dalle',
        icon: ClipboardDocumentCheckIcon
    },
    {
        name: 'Review your Uploads',
        href: '/portal/review/uploads',
        icon: DocumentMagnifyingGlassIcon
    },

    {
        name: 'Send images to your stores',
        href: '/portal/review/categorize',
        icon: DocumentCheckIcon
    }
];

export const navigation = (currentRoute: string) => {
    return navItems.map((obj) => {
        return {
            ...obj,
            current: obj.href === currentRoute
        };
    });
};
