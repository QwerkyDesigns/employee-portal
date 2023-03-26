import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Container } from '@mantine/core';

export { getServerSideProps } from '@/lib/get-server-side-props/authentication';

export default function DeleteForeverPage() {
    return (
        <DashboardLayout pageName="Do Not Delete">
            <Container>Please do not delete any images yet. We are just starting.</Container>
        </DashboardLayout>
    );
}
