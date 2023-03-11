import { createContext } from 'react';

export type DashboardContextType = {
    currentFunds: number;
    sideBarOpen: boolean;
    setSideBarOpen(state: boolean): null;
}

const defaultDashboardContext: DashboardContextType = {
    currentFunds: 0,
    sideBarOpen: true,
    setSideBarOpen: (state: boolean) => null
};

export const DashboardContext = createContext<DashboardContextType>(defaultDashboardContext);
