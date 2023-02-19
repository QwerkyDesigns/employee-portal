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
    public InitialTransfersContainer: string = "qd-uploads-and-transfers-dev";
    public BusinessStore: string = "qd-categorized-images-dev";
    public ArchivedImagesStore: string = "qd-archived-images-dev";
}

class StagingDataContainers implements IDataContainer {
    public InitialTransfersContainer: string = "qd-uploads-and-transfers-staging";
    public BusinessStore: string = "qd-categorized-images-staging";
    public ArchivedImagesStore: string = "qd-archived-images-staging";
}

class ProductionDataContainers implements IDataContainer {
    public InitialTransfersContainer: string = "qd-uploads-and-transfers-prod";
    public BusinessStore: string = "qd-categorized-images-prod";
    public ArchivedImagesStore: string = "qd-archived-images-prod";
}

export default DataContainers;
