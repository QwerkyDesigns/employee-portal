import { PaintBrushIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const navigation = [
    {
        name: 'Create with Dall-E',
        href: '/portal/create/with-dalle',
        icon: PaintBrushIcon,
        current: false
    },
    {
        name: 'Review Dall-E creations',
        href: '/portal/review/dalle',
        icon: DocumentMagnifyingGlassIcon,
        current: false
    },
    {
        name: 'Upload',
        href: '/portal/create/with-upload',
        icon: PaintBrushIcon,
        current: false
    },
    {
        name: 'Review Uploads',
        href: '/portal/review/uploads',
        icon: DocumentMagnifyingGlassIcon,
        current: false
    },

    {
        name: 'Categorize',
        href: '/portal/review/uploads',
        icon: DocumentMagnifyingGlassIcon,
        current: false
    },
    {
        name: 'Top Up Money',
        href: '/portal/stripe/payments/choose-top-up-method',
        icon: DocumentMagnifyingGlassIcon,
        current: false
    }
];
