export abstract class DBBase<T, C> {
  readonly CONFIG: C;
  readonly FOLDER: string;

  constructor(config: C, folder: string) {
    this.CONFIG = config;
    this.FOLDER = folder;
  }

  abstract getConnection(): Promise<T>;

  abstract closeConnection(): void;
}
