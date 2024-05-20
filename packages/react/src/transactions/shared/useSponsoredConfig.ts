import { ProtocolTransactionRequestModel } from '@lens-protocol/domain/entities';

import { useSharedDependencies } from '../../shared';

type SponsoredRequest<T extends ProtocolTransactionRequestModel> = T & {
  sponsored: boolean;
};

/**
 * @internal
 */
export function useSponsoredConfig() {
  const { config } = useSharedDependencies();

  /**
   * Disables the sponsored flag if RequiredConfig says so
   */
  return function <T extends ProtocolTransactionRequestModel>(request: SponsoredRequest<T>) {
    return config.sponsored ? request : { ...request, sponsored: false };
  };
}
