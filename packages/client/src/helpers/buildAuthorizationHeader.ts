export function buildAuthorizationHeader(accessToken: string | undefined) {
  return { authorization: `Bearer ${accessToken || ''}` };
}
