export interface ICredentials {
  readonly address: string;

  isExpired(): boolean;
}
