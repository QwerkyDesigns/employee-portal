import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ImageCreationWizard } from '@/components/page/imageWizard';

export default function CreatorWizardFlowProto() {
    return (
        <DashboardLayout pageName="Creator Wizard">
            <ImageCreationWizard />
        </DashboardLayout>
    );
}
