import { createContext } from 'react';

export interface IDashboardContext {
    currentFunds: number;
}

const defaultDashboardContext: IDashboardContext = {
    currentFunds: 0
};

export const DashboardContext = createContext(defaultDashboardContext as IDashboardContext);
