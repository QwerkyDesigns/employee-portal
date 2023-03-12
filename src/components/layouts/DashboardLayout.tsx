import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { isAuthenticated } from '@/lib/get-server-side-props/authentication';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
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
            console.log(response);
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

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    return await isAuthenticated(context, (session) => ({
        props: {
            session
        }
    }));
}
