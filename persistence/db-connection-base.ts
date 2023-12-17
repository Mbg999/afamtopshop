export abstract class DBConnectionBase<T, C> {
  protected readonly CONFIG: C;

  constructor(config: C) {
    this.CONFIG = config;
  }

  abstract getConnection(): Promise<T>;

  abstract closeConnection(): void;
}
