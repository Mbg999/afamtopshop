export class Log {
  static error(
    filePath: string,
    methodName: string,
    error: any,
  ): void {
    console.error(
      `ERROR: ${filePath}.${methodName}: ${JSON.stringify(error)}`,
    );
  }
}
