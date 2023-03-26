import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export { getServerSideProps } from '@/lib/get-server-side-props/authentication';

export default function Account() {
    return (
        <DashboardLayout pageName="Account">
            <div></div>
        </DashboardLayout>
    );
}
