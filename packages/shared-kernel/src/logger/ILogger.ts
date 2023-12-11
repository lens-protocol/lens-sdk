/**
 * Logger interface
 */
export interface ILogger {
  level: LoggerLevel;
  info(message: string, data?: unknown): void;
  debug(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(error: Error, message?: string, data?: unknown): void;
  fatal(error: Error, message?: string, data?: unknown): void;
}

export enum LoggerLevel {
  Info = 1,
  Debug = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
}
