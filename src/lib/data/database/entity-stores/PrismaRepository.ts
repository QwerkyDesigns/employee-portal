import prismaClient from "@/lib/client/prisma";
import { DomainEntity, Model } from "@/types/sharedTypes";

export abstract class PrismaRepository<M extends Model, D extends DomainEntity> {
    protected abstract mapToModel(entity: D): M;
    protected abstract mapToDomainEntity(prismaEntity: M): D;
    public entityName: string = "";

    async findById(id: number, include?: string): Promise<D | null> {
        const domainEntity = await (prismaClient as any)[this.entityName].findUnique({
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
        await (prismaClient as any)[this.entityName].upsert({
            where: { id: entity.id },
            update: this.mapToModel(entity),
            create: this.mapToModel(entity),
        });
    }
}
