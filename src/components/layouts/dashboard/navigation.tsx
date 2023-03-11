import { PaintBrushIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

type NavItems = {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
    current?: boolean;
};
const navItems: NavItems[] = [
    {
        name: 'Create with Dall-E',
        href: '/portal/create/with-dalle',
        icon: PaintBrushIcon
    },
    {
        name: 'Review Dall-E creations',
        href: '/portal/review/dalle',
        icon: DocumentMagnifyingGlassIcon
    },
    {
        name: 'Upload',
        href: '/portal/create/with-upload',
        icon: PaintBrushIcon
    },
    {
        name: 'Review Uploads',
        href: '/portal/review/uploads',
        icon: DocumentMagnifyingGlassIcon
    },

    {
        name: 'Categorize',
        href: '/portal/review/uploads',
        icon: DocumentMagnifyingGlassIcon
    },
    {
        name: 'Top Up Money',
        href: '/portal/stripe/payments/choose-top-up-method',
        icon: DocumentMagnifyingGlassIcon
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
