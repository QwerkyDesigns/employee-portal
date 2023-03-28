import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export { getServerSideProps } from '@/lib/get-server-side-props/authentication';

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Portal() {
    return <DashboardLayout pageName="wow">{'Lets put links to the various services in cards here'}</DashboardLayout>;
}
