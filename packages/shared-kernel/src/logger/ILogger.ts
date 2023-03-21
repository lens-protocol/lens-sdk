/**
 * Logger interface
 */
export interface ILogger {
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(error: Error | unknown, message?: string, data?: unknown): void;
  fatal(error: Error | unknown, message?: string, data?: unknown): void;
}
