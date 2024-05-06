import {
  AnyPublication,
  Profile,
  ProtocolSharedRevenueCollectOpenActionSettings,
  erc20Amount,
  findCollectModuleSettings,
  isMirrorPublication,
} from '@lens-protocol/api-bindings';
import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  Amount,
  ChainType,
  Erc20Amount,
  EvmAddress,
  erc20,
  invariant,
  never,
} from '@lens-protocol/shared-kernel';

import { SessionType } from '../../authentication';

function createTokenAllowanceRequest(
  args: Omit<TokenAllowanceRequest, 'kind'>,
): TokenAllowanceRequest {
  return {
    ...args,
    kind: TransactionKind.APPROVE_MODULE,
  };
}

function buildMintFeeAmount(_module: ProtocolSharedRevenueCollectOpenActionSettings): Erc20Amount {
  // TODO replace with data from `_module` once available
  const bonsai = erc20({
    address: '0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c',
    chainType: ChainType.POLYGON,
    decimals: 18,
    name: 'BONSAI',
    symbol: 'BONSAI',
  });
  return Amount.erc20(bonsai, 10);
}

export type ResolveTokenAllowanceRequestForCollectArgs = {
  publicActProxy: EvmAddress;
  limit: TokenAllowanceLimit;
  publication: AnyPublication;
  sessionType: SessionType.JustWallet | SessionType.WithProfile;
};

export function resolveTokenAllowanceRequestForCollect({
  limit,
  publicActProxy,
  publication,
  sessionType,
}: ResolveTokenAllowanceRequestForCollectArgs): TokenAllowanceRequest {
  if (isMirrorPublication(publication)) {
    return resolveTokenAllowanceRequestForCollect({
      publication: publication.mirrorOn,
      limit,
      publicActProxy,
      sessionType,
    });
  }

  const module = findCollectModuleSettings(publication);

  invariant(module, `Publication ${publication.id} has no collect module`);

  switch (module.__typename) {
    case 'LegacyAaveFeeCollectModuleSettings':
    case 'LegacyERC4626FeeCollectModuleSettings':
    case 'LegacyFeeCollectModuleSettings':
    case 'LegacyLimitedFeeCollectModuleSettings':
    case 'LegacyLimitedTimedFeeCollectModuleSettings':
    case 'LegacyMultirecipientFeeCollectModuleSettings':
    case 'LegacySimpleCollectModuleSettings':
    case 'LegacyTimedFeeCollectModuleSettings':
      return createTokenAllowanceRequest({
        amount: erc20Amount(module.amount),
        limit,
        spender: module.contract.address,
      });

    case 'MultirecipientFeeCollectOpenActionSettings':
    case 'SimpleCollectOpenActionSettings':
    case 'ProtocolSharedRevenueCollectOpenActionSettings': {
      const spender =
        sessionType === SessionType.JustWallet ? publicActProxy : module.contract.address;

      switch (module.__typename) {
        case 'MultirecipientFeeCollectOpenActionSettings':
        case 'SimpleCollectOpenActionSettings':
          return createTokenAllowanceRequest({
            amount: erc20Amount(module.amount),
            limit,
            spender,
          });

        case 'ProtocolSharedRevenueCollectOpenActionSettings': {
          const collectAmount = erc20Amount(module.amount);

          if (collectAmount.isZero()) {
            return createTokenAllowanceRequest({
              amount: buildMintFeeAmount(module),
              limit,
              spender,
            });
          }

          return createTokenAllowanceRequest({
            amount: collectAmount,
            limit,
            spender,
          });
        }
      }
    }
  }

  never(`Unsupported collect module type ${module.__typename}`);
}

export function resolveTokenAllowanceRequestForFollow(
  profile: Profile,
  limit: TokenAllowanceLimit,
): TokenAllowanceRequest {
  invariant(profile.followModule, `Profile ${profile.id} has no follow module`);

  switch (profile.followModule.__typename) {
    case 'FeeFollowModuleSettings':
      return createTokenAllowanceRequest({
        amount: erc20Amount(profile.followModule.amount),
        limit,
        spender: profile.followModule.contract.address,
      });

    default:
      never(`Unsupported follow module type ${profile.followModule.__typename}`);
  }
}
