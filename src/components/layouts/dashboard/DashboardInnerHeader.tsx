import { DashboardContext, DashboardContextType } from '@/lib/contexts/DashboardContext';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';

export type DashboardInnerHeaderProps = {
    currentFunds: number;
};

export default function DashboardInnerHeader({ currentFunds }: DashboardInnerHeaderProps) {
    return (
        <div className="flex flex-row" style={{ borderBottom: '1px solid gray' }}>
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="m-3 min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Creator Studio</h2>
                    <div className="mt-1 flex flex-row sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        </div>
                        <div>{`Current Funds: $${currentFunds / 100}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
