import type { Authentication } from '../authentication';

type Handler<Val> = (headers: Record<string, string>) => Promise<Val>;

async function getHeader(
  authentication: Authentication | undefined,
): Promise<Record<string, string>> {
  if (!authentication) {
    return {};
  }

  const headerResult = await authentication.getRequestHeader();
  if (headerResult.isFailure()) {
    return {};
  }

  return headerResult.value;
}

export async function provideAuthHeaders<Val>(
  authentication: Authentication | undefined,
  handler: Handler<Val>,
): Promise<Val> {
  const header = await getHeader(authentication);

  return handler(header);
}
