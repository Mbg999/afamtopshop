export type createdItem = { id: string };

export abstract class BaseRepository<DBConnectionT, T> {
  protected readonly dbConnection: DBConnectionT;

  constructor(dbConnection: DBConnectionT) {
    this.dbConnection = dbConnection;
  }

  abstract getAll(): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract create(item: T): Promise<createdItem>;

  abstract update(item: T): Promise<boolean>;

  abstract delete(id: string): Promise<boolean>;
}
