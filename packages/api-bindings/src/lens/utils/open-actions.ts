/* eslint-disable no-case-declarations */
import { ProfileId, PublicationId, TransactionKind } from '@lens-protocol/domain/entities';
import {
  AllOpenActionType,
  CollectRequest,
  OpenActionRequest,
  UnknownActionRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { Data, EvmAddress, invariant, never } from '@lens-protocol/shared-kernel';

import * as gql from '../graphql/generated';
import { AnyPublication, OpenActionModuleSettings } from '../publication';
import { findCollectActionModuleSettings } from './KnownCollectModuleSettings';
import { erc20Amount } from './amount';

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
   * The address of the unknown open action to perform.
   *
   * MUST be within the publications' `openActionModules` list.
   */
  address: EvmAddress;
  /**
   * The data required by the unknown Open Action contract address to operate.
   *
   * It's consumer responsibility to encode it correctly.
   */
  data: Data;
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

export type OpenActionContext<TAction extends OpenActionParams = OpenActionParams> = {
  action: TAction;
  public: boolean;
  signless: boolean;
  sponsored: boolean;
};

function resolveCollectRequestFor(
  publication: AnyPublication,
  context: OpenActionContext<CollectParams>,
): CollectRequest {
  const collectable = publication.__typename === 'Mirror' ? publication.mirrorOn : publication;
  const settings = findCollectActionModuleSettings(collectable);

  invariant(settings, 'No open action module settings found for publication');

  switch (settings.__typename) {
    case 'LegacyAaveFeeCollectModuleSettings':
    case 'LegacyERC4626FeeCollectModuleSettings':
    case 'LegacyFeeCollectModuleSettings':
    case 'LegacyLimitedFeeCollectModuleSettings':
    case 'LegacyLimitedTimedFeeCollectModuleSettings':
    case 'LegacyMultirecipientFeeCollectModuleSettings':
    case 'LegacyTimedFeeCollectModuleSettings':
    case 'LegacySimpleCollectModuleSettings':
      invariant(context.public === false, 'Legacy collect cannot be collected with just a wallet');
      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.LEGACY_COLLECT,
        publicationId: collectable.id,
        referrer: publication !== collectable ? publication.id : undefined,
        fee: {
          amount: erc20Amount({ from: settings.amount }),
          contractAddress: settings.contract.address,
        },
        public: false,
        signless: context.signless,
        sponsored: context.sponsored,
      };

    case 'LegacyFreeCollectModuleSettings':
      invariant(context.public === false, 'Legacy collect cannot be collected with just a wallet');
      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.LEGACY_COLLECT,
        publicationId: collectable.id,
        referrer: publication !== collectable ? publication.id : undefined,
        public: false,
        signless: context.signless,
        sponsored: context.sponsored,
      };

    case 'SimpleCollectOpenActionSettings':
      const amount = erc20Amount({ from: settings.amount });

      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.SIMPLE_COLLECT,
        publicationId: collectable.id,
        referrers:
          context.action.referrers ?? (publication !== collectable ? [publication.id] : undefined),
        fee: amount.isZero()
          ? undefined
          : {
              amount,
              contractAddress: settings.contract.address,
            },
        signless: context.signless,
        public: context.public,
        sponsored: context.sponsored,
      };

    case 'MultirecipientFeeCollectOpenActionSettings':
      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.MULTIRECIPIENT_COLLECT,
        publicationId: collectable.id,
        referrers:
          context.action.referrers ?? (publication !== collectable ? [publication.id] : undefined),
        fee: {
          amount: erc20Amount({ from: settings.amount }),
          contractAddress: settings.contract.address,
        },
        public: context.public,
        signless: context.signless,
        sponsored: context.sponsored,
      };

    default:
      never(`The publication ${collectable.id} is not collectable`);
  }
}

function isUnknownOpenActionModuleSettings(
  settings: OpenActionModuleSettings,
): settings is gql.UnknownOpenActionModuleSettings {
  return settings.__typename === 'UnknownOpenActionModuleSettings';
}

function resolveUnknownRequestFor(
  publication: AnyPublication,
  context: OpenActionContext<UnknownActionParams>,
): UnknownActionRequest {
  const target = publication.__typename === 'Mirror' ? publication.mirrorOn : publication;

  const settings =
    target.openActionModules?.find(
      (entry): entry is gql.UnknownOpenActionModuleSettings =>
        isUnknownOpenActionModuleSettings(entry) &&
        entry.contract.address === context.action.address,
    ) ??
    never(
      `Cannot find Open Action settings ${context.action.address} fro publication ${target.id}`,
    );

  return {
    kind: TransactionKind.ACT_ON_PUBLICATION,
    type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
    publicationId: target.id,
    address: settings.contract.address,
    data: context.action.data,
    public: context.public,
    signless: context.signless,
    sponsored: context.sponsored,
  };
}

export function resolveOpenActionRequestFor(
  publication: AnyPublication,
  context: OpenActionContext,
): OpenActionRequest {
  switch (context.action.kind) {
    case OpenActionKind.COLLECT:
      return resolveCollectRequestFor(publication, context as OpenActionContext<CollectParams>);

    case OpenActionKind.UNKNOWN:
      return resolveUnknownRequestFor(
        publication,
        context as OpenActionContext<UnknownActionParams>,
      );
  }
}
