type LogMethod = (...args: unknown[]) => void;

export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  SILENT = 5,
}

export class Logger {
  private level: LogLevel;
  private name: string;

  private constructor(name: string, level: LogLevel = LogLevel.WARN) {
    this.name = name;
    this.level = level;
    this.replaceMethods();
  }

  static named(name: string, level: LogLevel = LogLevel.WARN): Logger {
    return new Logger(name, level);
  }

  trace: LogMethod = () => {};
  debug: LogMethod = () => {};
  info: LogMethod = () => {};
  warn: LogMethod = () => {};
  error: LogMethod = () => {};
  log: LogMethod = () => {}; // alias for debug

  private replaceMethods() {
    (['trace', 'debug', 'info', 'warn', 'error'] as const).forEach(
      (methodName, index) => {
        if (index >= this.level) {
          this[methodName] = () => {};
        } else {
          this[methodName] = (...args) =>
            console[methodName === 'debug' ? 'log' : methodName](
              `[${this.name}]`,
              ...args,
            );
        }
      },
    );
    this.log = this.debug;
  }
}
