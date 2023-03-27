import { Attribute } from './operations';

export class ProfileAttributeReader {
  constructor(private readonly attribute: Attribute) {}

  toBoolean(): boolean | null {
    const parsed: unknown = this.jsonParse(this.attribute.value);

    if (typeof parsed === 'boolean') {
      return parsed;
    }
    return null;
  }

  toDate(): Date | null {
    const date = new Date(this.attribute.value);

    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  }

  toNumber(): number | null {
    const parsed: unknown = this.jsonParse(this.attribute.value);

    if (typeof parsed === 'number' && isFinite(parsed)) {
      return parsed;
    }
    return null;
  }

  toString(): string {
    return this.attribute.value;
  }

  private jsonParse(value: string): unknown | null {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
}
