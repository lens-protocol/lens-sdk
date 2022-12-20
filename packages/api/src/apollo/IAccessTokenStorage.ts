export interface IAccessTokenStorage {
  getAccessToken(): string | null;
  refreshToken(): Promise<void>;
}
