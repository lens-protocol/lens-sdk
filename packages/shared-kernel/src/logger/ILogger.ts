/**
 * Logger interface
 */
export interface ILogger {
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(error: Error, message?: string, data?: unknown): void;
  fatal(error: Error, message?: string, data?: unknown): void;
}
