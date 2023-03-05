import { UsageDomainEntity } from "../DomainEntities";
import { UsageModel } from "../Models";
import { PrismaRepository } from "./PrismaRepository";

export class UsageRepository extends PrismaRepository<UsageModel, UsageDomainEntity> {
    entityName = "usage";

    protected mapToModel(usage: UsageDomainEntity): UsageModel {
        return {
            id: usage.id,
            available_funds: usage.availableFunds,
            account: null
        };
    }

    protected mapToDomainEntity(usageModel: UsageModel): UsageDomainEntity {
        return {
            id: usageModel.id,
            availableFunds: usageModel.available_funds,
            updatedAt: usageModel.updated_at,
            account: {
                id: usageModel!.account!.id,
                userName: usageModel!.account!.user_name,
                email: usageModel!.account!.email,
                password: usageModel!.account!.password,
                stripeCustomerId: usageModel!.account!.stripe_customer_id,
                usage: undefined,
                createdAt: usageModel!.account!.created_at,
                updatedAt: usageModel!.account!.updated_at,
            },
        };
    }
}
