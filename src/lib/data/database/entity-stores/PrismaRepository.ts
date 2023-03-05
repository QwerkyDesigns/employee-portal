import { prisma } from "@/lib/client/prisma";
import { DomainEntity, Model } from "@/types/sharedTypes";

// getting a properly typed generic repo with Prisma is hard (i've tried)
// this is because prisma dynamically generates its types based off your schema
// and all types that are generated dont extend a parent type
// so all types are different, as far as the type system goes
// why don't we skip over a generic repo for now, in favour of
// spending that effort on copy and pasting some typesafe code around
// we can always come back after we have a few paying customers
// and make a generic repo.
// Solving the problem like this adds a layer of complexity and unsafe typeness
// to a part of our stack

export abstract class PrismaRepository<M extends Model, D extends DomainEntity> {
    protected abstract mapToModel(entity: D): M;
    protected abstract mapToDomainEntity(prismaEntity: M): D;
    public entityName: string = "";

    async findById(id: number, include?: string): Promise<D | null> {
        const domainEntity = await (prisma as any)[this.entityName].findUnique({
            where: { id },
            include: include
                ? {
                      [include]: true,
                  }
                : {},
        });
        return domainEntity ? this.mapToDomainEntity(domainEntity) : null;
    }

    async save(entity: D): Promise<void> {
        await (prisma as any)[this.entityName].upsert({
            where: { id: entity.id },
            update: this.mapToModel(entity),
            create: this.mapToModel(entity),
        });
    }
}
