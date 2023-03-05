import { DomainEntity } from "@/types/sharedTypes";

export interface AccountDomainEntity extends DomainEntity {
    id: number;
    userName: string;
    email: string;
    password?: string;
    stripeCustomerId: string;
    usage?: UsageDomainEntity;
    createdAt: Date;
    updatedAt?: Date;
}

export interface UsageDomainEntity extends DomainEntity {
    id: number;
    availableFunds: number;
    updatedAt?: Date;
    account?: AccountDomainEntity;
}
