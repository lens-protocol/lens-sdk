/**
 * Represent number of milliseconds since the Unix Epoch
 */
export type Unix = number;

export class DateUtils {
  static toUnix(date: Date | number | string): Unix {
    if (date instanceof Date) {
      return date.getTime();
    }

    if (typeof date === 'string') {
      return new Date(date).getTime();
    }

    return date;
  }

  static toISOString(date: Date | number | string): string {
    if (typeof date === 'string' || typeof date === 'number') {
      return new Date(date).toISOString();
    }

    return date.toISOString();
  }

  static unix(): Unix {
    return Date.now();
  }

  static unixInSeconds() {
    return this.unix() / 1000;
  }

  static hoursToMs(hours: number): number {
    return this.minutesToMs(hours * 60);
  }

  static minutesToMs(minutes: number): number {
    return minutes * 6 * 10 * 1000;
  }

  static secondsToMs(seconds: number): number {
    return seconds * 1000;
  }
}
