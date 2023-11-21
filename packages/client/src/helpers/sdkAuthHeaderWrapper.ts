import { Authentication } from '../authentication';
import { SdkFunctionWrapper } from '../graphql/fragments.generated';

type AuthHeaderWrapper = (authentication: Authentication | undefined) => SdkFunctionWrapper;

export const sdkAuthHeaderWrapper: AuthHeaderWrapper = (authentication) => async (action) => {
  const header = await getHeader(authentication);
  return action(header);
};

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
