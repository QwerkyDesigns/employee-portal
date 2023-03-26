import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import frontendClient from '@/lib/client/frontendClient';
import { GetCurrentFundsResponse } from '@/lib/controllers/GetCurrentFundsController';
import { DashboardContext } from '@/lib/contexts/DashboardContext';
import AccessDenied from '../errorpages/AccessDenied';
import { InnerDashboardLayout } from './dashboard/core/InnerDashboardLayout';

export function DashboardLayout({ pageName, children }: { pageName: string; children: React.ReactNode }) {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const { data: session } = useSession();

    const [currentFunds, setCurrentFunds] = useState<number>(0);

    const sideBarSetter = (state: boolean) => {
        setSideBarOpen(state);
        return null;
    };

    useEffect(() => {
        (async () => {
            const response = await frontendClient.get<GetCurrentFundsResponse>('account/funds/available');
            if (response) {
                setCurrentFunds(response.currentFunds);
            } else {
                setCurrentFunds(0);
            }
        })();
    }, []);

    return session ? (
        <DashboardContext.Provider value={{ currentFunds, sideBarOpen, setSideBarOpen: sideBarSetter }}>
            <InnerDashboardLayout pageName={pageName} session={session}>
                {children}
            </InnerDashboardLayout>
        </DashboardContext.Provider>
    ) : (
        <AccessDenied />
    );
}
