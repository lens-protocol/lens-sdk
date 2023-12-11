/* eslint-disable no-console */
import { ILogger } from '@lens-protocol/shared-kernel';

export enum ConsoleLoggerLevel {
  Info = 1,
  Debug = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
}

export type ConsoleLoggerOptions = {
  level?: ConsoleLoggerLevel;
};

export class ConsoleLogger implements ILogger {
  private readonly level: ConsoleLoggerLevel;

  constructor(options: ConsoleLoggerOptions = {}) {
    this.level = options.level ?? ConsoleLoggerLevel.Info;
  }

  info(message: string, data?: unknown): void {
    if (this.level > ConsoleLoggerLevel.Info) return;
    console.info(message, data);
  }

  debug(message: string, data?: unknown): void {
    if (this.level > ConsoleLoggerLevel.Debug) return;
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
