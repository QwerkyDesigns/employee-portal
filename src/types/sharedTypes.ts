import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface Model {
    id: number;
}

export interface DomainEntity {
    id: number;
}
