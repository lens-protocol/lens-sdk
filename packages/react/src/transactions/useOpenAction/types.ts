import { AnyPublication } from '@lens-protocol/api-bindings';
import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import { EvmAddress } from '@lens-protocol/shared-kernel';

/**
 * The category of Open Actions to perform on a given publication.
 */
export enum OpenActionKind {
  COLLECT = 'COLLECT',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Execute the specified Unknown Open Action.
 */
export type UnknownActionParams = {
  kind: OpenActionKind.UNKNOWN;
  /**
   * The address of the Unknown Open Action  module contract.
   *
   * It MUST be within the target publication's `openActionModules` list.
   */
  address: EvmAddress;
  /**
   * The data required by the Unknown Open Action to be executed.
   *
   * It's consumer responsibility to encode it correctly.
   */
  data: string;
  /**
   * The referrers list. It can be a list of Publication IDs or Profile IDs.
   *
   * The usage of referrers is determined by the specific Open Action module.
   */
  referrers?: ReadonlyArray<PublicationId | ProfileId>;
};

/**
 * Execute the Collect Open Action defined by the publication.
 */
export type CollectParams = {
  kind: OpenActionKind.COLLECT;

  /**
   * The referrers list. It can be a list of Publication IDs or Profile IDs.
   *
   * The referrers will be rewarded with a percentage of the referral reward fee.
   * In case there are multiple referrers, they will split the referral reward fee equally.
   *
   * This field is ignored for legacy publications (pre-v2).
   *
   * @defaultValue if the publication is a Mirror the Mirror ID, empty otherwise.
   */
  referrers?: ReadonlyArray<PublicationId | ProfileId>;
};

/**
 * The Open Action to perform.
 */
export type OpenActionParams = CollectParams | UnknownActionParams;

/**
 * Arguments for the `useOpenAction` hook.
 */
export type UseOpenActionArgs = {
  /**
   * The action to perform on the publication.
   */
  action: OpenActionParams;
};

/**
 * Arguments for the `useOpenAction` hook callback.
 */
export type OpenActionArgs = {
  /**
   * The publication to perform the Open Action on.
   */
  publication: AnyPublication;
  /**
   * Whether the transaction gas costs should be sponsored by the Lens API or
   * should be paid by the authenticated wallet.
   *
   * There are scenarios where the sponsorship will be denied regardless of this value.
   * See {@link BroadcastingError} with:
   * - {@link BroadcastingErrorReason.NOT_SPONSORED} - the profile is not sponsored
   * - {@link BroadcastingErrorReason.RATE_LIMITED} - the profile reached the rate limit
   * - {@link BroadcastingErrorReason.APP_NOT_ALLOWED} - the app is not whitelisted for gasless transactions
   *
   * If not specified, or `true`, the hook will attempt a Sponsored Transaction.
   * Set it to `false` to force it to use a Self-Funded Transaction.
   */
  sponsored?: boolean;
};
