import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

export type DashboardInnerHeaderProps = {
    currentFunds: number;
};

export default function DashboardInnerHeader({ currentFunds }: DashboardInnerHeaderProps) {
    return (
        <div className="flex flex-row" style={{ borderBottom: '1px solid gray' }}>
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="m-3 min-w-0 flex-1">
                    <div className="mt-1 flex flex-row sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="m-auto flex text-sm text-gray-500">
                            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
                        </div>
                        <div>{`Available Credits: ${currentFunds}c`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
