import { useSharedDependencies } from '../../shared';

type SponsoredEnabled<T extends { sponsored?: boolean }> = T & {
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
  return function <T extends { sponsored?: boolean }>(request: T): SponsoredEnabled<T> {
    return config.sponsored
      ? { ...request, sponsored: request.sponsored ?? true }
      : { ...request, sponsored: false };
  };
}
