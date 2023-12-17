export type createdItem = { id: string };

export abstract class BaseRepository<DBConnectionT, T> {
  protected readonly dbConnection: DBConnectionT;

  constructor(dbConnection: DBConnectionT) {
    this.dbConnection = dbConnection;
  }

  abstract getAll(): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract create(
    item: Omit<T, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<createdItem>;

  abstract update(
    item: Omit<T, "createdAt" | "updatedAt" | "deletedAt">,
  ): Promise<boolean>;

  abstract delete(id: string): Promise<boolean>;
}
