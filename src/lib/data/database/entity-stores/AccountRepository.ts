import { prisma } from "@/lib/client/prisma";
import { AccountDomainEntity } from "../DomainEntities";
import { AccountModel, UsageModel } from "../Models";
import { PrismaRepository } from "./PrismaRepository";

export class AccountRepository extends PrismaRepository<AccountModel, AccountDomainEntity> {
    entityName = "account";

    async findByStripeCustomerId(stripeCustomerId: string): Promise<AccountDomainEntity | null> {
        const accountModel = await (prisma as any)[this.entityName].findUnique({
            where: { stripe_customer_id: stripeCustomerId },
            include: { usage: true },
        });
        return accountModel ? this.mapToDomainEntity(accountModel as any) : null;
    }

    protected mapToModel(account: AccountDomainEntity): AccountModel {
        return {
            id: account.id,
            user_name: account.userName,
            email: account.email,
            password: account.password,
            stripe_customer_id: account.stripeCustomerId,
            usage: null,
            created_at: account.createdAt,
        };
    }

    protected mapToDomainEntity(accountModel: AccountModel): AccountDomainEntity {
        return {
            id: accountModel.id,
            userName: accountModel.user_name,
            email: accountModel.email,
            password: accountModel.password,
            stripeCustomerId: accountModel.stripe_customer_id,
            usage: accountModel.usage
                ? {
                      id: accountModel.usage.id,
                      availableFunds: accountModel.usage.available_funds,
                      updatedAt: accountModel.usage.updated_at,
                      account: undefined,
                  }
                : undefined,
            createdAt: accountModel.created_at,
            updatedAt: accountModel.updated_at,
        };
    }
}
