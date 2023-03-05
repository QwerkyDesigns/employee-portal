import { Model } from "@/types/sharedTypes";

export interface AccountModel extends Model {
    user_name: string;
    email: string;
    password?: string;
    stripe_customer_id: string;
    usage?: (UsageModel & { account: AccountModel | null }) | null;
    created_at: Date;
    updated_at?: Date;
}

export interface UsageModel extends Model {
    available_funds: number;
    updated_at?: Date;
    account: (AccountModel & { usage: UsageModel | null }) | null;
}
