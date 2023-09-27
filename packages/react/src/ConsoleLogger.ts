/* eslint-disable no-console */
import { ILogger } from '@lens-protocol/shared-kernel';

export class ConsoleLogger implements ILogger {
  info(message: string, data?: unknown): void {
    console.info(message, data);
  }

  debug(message: string, data?: unknown): void {
    console.info(message, data);
  }

  warn(message: string, data?: unknown): void {
    console.error(message, data);
  }

  error(error: Error, message?: string, data?: unknown): void {
    console.error(message, error, data);
  }

  fatal(error: Error, message?: string, data?: unknown): void {
    console.error(message, error, data);
  }
}
