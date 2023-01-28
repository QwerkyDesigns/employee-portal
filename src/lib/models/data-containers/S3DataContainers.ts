import currentOperatingEnvironment from "@/lib/environment/CurrentOperatingEnvironment";
import { IDataContainer } from "./IDataContainer";

class DataContainers {
    public static CurrentDataContainer(): IDataContainer {
        const dataContainer = currentOperatingEnvironment.ResovleInEnviron<IDataContainer>(
            () => {
                return new DevDataContainers();
            },
            () => {
                return new StagingDataContainers();
            },
            () => {
                return new ProductionDataContainers();
            }
        );
        return dataContainer;
    }
}

class DevDataContainers implements IDataContainer {
    getBusinessStoreContainer(): string {
        return this.BusinessStore;
    }
    getInitialTransfersContainer(): string {
        return this.InitialTransfersContainer;
    }
    public InitialTransfersContainer: string = "qd-uploads-and-transfers-dev";
    public BusinessStore: string = "qd-business-front-data-dev";
}

class StagingDataContainers implements IDataContainer {
    getBusinessStoreContainer(): string {
        return this.BusinessStore;
    }
    getInitialTransfersContainer(): string {
        return this.InitialTransfersContainer;
    }
    public InitialTransfersContainer: string = "qd-uploads-and-transfers-staging";
    public BusinessStore: string = "qd-business-front-data-staging";
}

class ProductionDataContainers implements IDataContainer {
    getBusinessStoreContainer(): string {
        return this.BusinessStore;
    }
    getInitialTransfersContainer(): string {
        return this.InitialTransfersContainer;
    }
    public InitialTransfersContainer: string = "qd-uploads-and-transfers-prod";
    public BusinessStore: string = "qd-business-front-data-prod";
}

export default DataContainers;
