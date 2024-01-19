/* eslint-disable no-console */
import { ILogger } from '@lens-protocol/shared-kernel';

export enum ConsoleLoggerLevel {
  Info = 1,
  Warn = 2,
  Error = 3,
  Fatal = 4,
}

export class ConsoleLogger implements ILogger {
  readonly level: ConsoleLoggerLevel;

  constructor({ level }: { level?: ConsoleLoggerLevel } = {}) {
    this.level = level ?? ConsoleLoggerLevel.Warn;
  }

  info(message: string, data?: unknown): void {
    if (this.level > ConsoleLoggerLevel.Info) return;
    console.info(message, data);
  }

  warn(message: string, data?: unknown): void {
    if (this.level > ConsoleLoggerLevel.Warn) return;
    console.error(message, data);
  }

  error(error: Error, message?: string, data?: unknown): void {
    if (this.level > ConsoleLoggerLevel.Error) return;
    console.error(message, error, data);
  }

  fatal(error: Error, message?: string, data?: unknown): void {
    if (this.level > ConsoleLoggerLevel.Fatal) return;
    console.error(message, error, data);
  }
}
