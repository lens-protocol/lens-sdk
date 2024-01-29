/* eslint-disable no-case-declarations */
import {
  AnyPublication,
  OpenActionModuleSettings,
  UnknownOpenActionModuleSettings,
  erc20Amount,
  findCollectModuleSettings,
} from '@lens-protocol/api-bindings';
import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  AllOpenActionType,
  CollectRequest,
  OpenActionRequest,
  UnknownActionRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { Data, invariant, never } from '@lens-protocol/shared-kernel';

import { ProfileSession, SessionType, WalletOnlySession } from '../../authentication';
import {
  CollectParams,
  OpenActionArgs,
  OpenActionKind,
  OpenActionParams,
  UnknownActionParams,
} from './types';

type RequiredOpenActionArgs = Required<OpenActionArgs>;

function resolveTargetPublication(publication: AnyPublication) {
  return publication.__typename === 'Mirror' ? publication.mirrorOn : publication;
}

function resolveCollectRequestFor(
  args: RequiredOpenActionArgs,
  params: CollectParams,
  session: ProfileSession | WalletOnlySession,
): CollectRequest {
  const collectable = resolveTargetPublication(args.publication);
  const settings = findCollectModuleSettings(collectable);

  const sponsored = session.type === SessionType.WithProfile ? args.sponsored : false;
  // technically profile.sponsor cannot be false if profile.signless is true, but we want to be explicit here
  const signless =
    session.type === SessionType.WithProfile && sponsored && session.profile.signless;

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
      invariant(
        session.type === SessionType.WithProfile,
        'Legacy collect cannot be collected with just a wallet',
      );
      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.LEGACY_COLLECT,
        publicationId: collectable.id,
        referrer: args.publication !== collectable ? args.publication.id : undefined,
        fee: {
          amount: erc20Amount(settings.amount),
          contractAddress: settings.contract.address,
        },
        public: false,
        signless,
        sponsored,
      };

    case 'LegacyFreeCollectModuleSettings':
      invariant(
        session.type === SessionType.WithProfile,
        'Legacy collect cannot be collected with just a wallet',
      );
      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.LEGACY_COLLECT,
        publicationId: collectable.id,
        referrer: args.publication !== collectable ? args.publication.id : undefined,
        public: false,
        signless,
        sponsored,
      };

    case 'SimpleCollectOpenActionSettings':
      const amount = erc20Amount(settings.amount);

      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.SIMPLE_COLLECT,
        publicationId: collectable.id,
        referrers:
          params.referrers ??
          (args.publication !== collectable ? [args.publication.id] : undefined),
        fee: amount.isZero()
          ? undefined
          : {
              amount,
              contractAddress: settings.contract.address,
            },
        public: session.type === SessionType.JustWallet,
        signless,
        sponsored,
      };

    case 'MultirecipientFeeCollectOpenActionSettings':
      return {
        kind: TransactionKind.ACT_ON_PUBLICATION,
        type: AllOpenActionType.MULTIRECIPIENT_COLLECT,
        publicationId: collectable.id,
        referrers:
          params.referrers ??
          (args.publication !== collectable ? [args.publication.id] : undefined),
        fee: {
          amount: erc20Amount(settings.amount),
          contractAddress: settings.contract.address,
        },
        public: session.type === SessionType.JustWallet,
        signless,
        sponsored,
      };

    default:
      never(`The publication ${collectable.id} is not collectable`);
  }
}

function isUnknownOpenActionModuleSettings(
  settings: OpenActionModuleSettings,
): settings is UnknownOpenActionModuleSettings {
  return settings.__typename === 'UnknownOpenActionModuleSettings';
}

function resolveExecutionDynamics(
  args: RequiredOpenActionArgs,
  session: ProfileSession | WalletOnlySession,
  settings: UnknownOpenActionModuleSettings,
): {
  public: boolean;
  signless: boolean;
  sponsored: boolean;
} {
  if (session.type === SessionType.JustWallet) {
    return {
      public: true,
      signless: false,
      sponsored: false,
    };
  }

  if (settings.sponsoredApproved) {
    return {
      public: false,
      signless: settings.signlessApproved ? session.profile.signless : false,
      sponsored: args.sponsored,
    };
  }

  return {
    public: false,
    signless: false,
    sponsored: false,
  };
}

function resolveUnknownRequestFor(
  args: RequiredOpenActionArgs,
  params: UnknownActionParams,
  session: ProfileSession | WalletOnlySession,
): UnknownActionRequest {
  const target = resolveTargetPublication(args.publication);

  const settings =
    target.openActionModules?.find(
      (entry): entry is UnknownOpenActionModuleSettings =>
        isUnknownOpenActionModuleSettings(entry) && entry.contract.address === params.address,
    ) ?? never(`Cannot find Open Action settings ${params.address} fro publication ${target.id}`);

  return {
    kind: TransactionKind.ACT_ON_PUBLICATION,
    type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
    publicationId: target.id,
    address: settings.contract.address,
    data: params.data as Data,
    referrers: params.referrers,

    ...resolveExecutionDynamics(args, session, settings),
  };
}

export function createOpenActionRequest(
  { publication, sponsored = true }: OpenActionArgs,
  params: OpenActionParams,
  session: ProfileSession | WalletOnlySession,
): OpenActionRequest {
  const args = { publication, sponsored };
  switch (params.kind) {
    case OpenActionKind.COLLECT:
      return resolveCollectRequestFor(args, params, session);

    case OpenActionKind.UNKNOWN:
      return resolveUnknownRequestFor(args, params, session);
  }
}
