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

type OpenActionContext<TAction extends OpenActionParams = OpenActionParams> = {
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
  const settings = findCollectModuleSettings(collectable);

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
          amount: erc20Amount(settings.amount),
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
      const amount = erc20Amount(settings.amount);

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
          amount: erc20Amount(settings.amount),
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
): settings is UnknownOpenActionModuleSettings {
  return settings.__typename === 'UnknownOpenActionModuleSettings';
}

function resolveUnknownRequestFor(
  publication: AnyPublication,
  context: OpenActionContext<UnknownActionParams>,
): UnknownActionRequest {
  const target = publication.__typename === 'Mirror' ? publication.mirrorOn : publication;

  const settings =
    target.openActionModules?.find(
      (entry): entry is UnknownOpenActionModuleSettings =>
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
    data: context.action.data as Data,
    public: context.public,
    signless: context.signless,
    sponsored: context.sponsored,
  };
}

function internal(publication: AnyPublication, context: OpenActionContext): OpenActionRequest {
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

export function createOpenActionRequest(
  { publication, sponsored = true }: OpenActionArgs,
  params: OpenActionParams,
  session: ProfileSession | WalletOnlySession,
) {
  const context: OpenActionContext = {
    action: params,
    signless: session.type === SessionType.WithProfile ? session.profile.signless : false, // cannot use Lens Manager with Public Collect
    public: session.type === SessionType.JustWallet,
    sponsored: session.type === SessionType.WithProfile ? sponsored : false, // cannot use gasless with Public Collect
  };
  return internal(publication, context);
}
