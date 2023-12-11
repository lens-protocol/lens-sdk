/* eslint-disable no-console */
import { ILogger, LoggerLevel } from '@lens-protocol/shared-kernel';

export type ConsoleLoggerOptions = {
  level?: LoggerLevel;
};

export class ConsoleLogger implements ILogger {
  readonly level: LoggerLevel;

  constructor(options: ConsoleLoggerOptions = {}) {
    this.level = options.level ?? LoggerLevel.Info;
  }

  info(message: string, data?: unknown): void {
    if (this.level > LoggerLevel.Info) return;
    console.info(message, data);
  }

  debug(message: string, data?: unknown): void {
    if (this.level > LoggerLevel.Debug) return;
    console.info(message, data);
  }

  warn(message: string, data?: unknown): void {
    if (this.level > LoggerLevel.Warn) return;
    console.error(message, data);
  }

  error(error: Error, message?: string, data?: unknown): void {
    if (this.level > LoggerLevel.Error) return;
    console.error(message, error, data);
  }

  fatal(error: Error, message?: string, data?: unknown): void {
    if (this.level > LoggerLevel.Fatal) return;
    console.error(message, error, data);
  }
}
