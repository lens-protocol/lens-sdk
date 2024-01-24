import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { assertNever, invariant, never } from '@lens-protocol/shared-kernel';

import { Profile } from '../graphql/generated';
import { AnyPublication, PrimaryPublication } from '../publication';
import { findCollectModuleSettings } from './CollectModuleSettings';
import { erc20Amount } from './amount';

function resolveTokenAllowanceRequestForCollect(
  publication: PrimaryPublication,
  limit: TokenAllowanceLimit,
): TokenAllowanceRequest {
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
    case 'MultirecipientFeeCollectOpenActionSettings':
    case 'SimpleCollectOpenActionSettings':
      return {
        kind: TransactionKind.APPROVE_MODULE,
        amount: erc20Amount(module.amount),
        limit,
        spender: module.contract.address,
      };

    default:
      never(`Unsupported collect module type ${module.__typename}`);
  }
}

function resolveTokenAllowanceRequestForFollow(
  profile: Profile,
  limit: TokenAllowanceLimit,
): TokenAllowanceRequest {
  invariant(profile.followModule, `Profile ${profile.id} has no follow module`);

  switch (profile.followModule.__typename) {
    case 'FeeFollowModuleSettings':
      return {
        kind: TransactionKind.APPROVE_MODULE,
        amount: erc20Amount(profile.followModule.amount),
        limit,
        spender: profile.followModule.contract.address,
      };
    default:
      never(`Unsupported follow module type ${profile.followModule.__typename}`);
  }
}

export function resolveTokenAllowanceRequest(
  item: AnyPublication | Profile,
  limit: TokenAllowanceLimit,
): TokenAllowanceRequest {
  switch (item.__typename) {
    case 'Mirror':
      return resolveTokenAllowanceRequestForCollect(item.mirrorOn, limit);

    case 'Comment':
    case 'Post':
    case 'Quote':
      return resolveTokenAllowanceRequestForCollect(item, limit);

    case 'Profile':
      return resolveTokenAllowanceRequestForFollow(item, limit);

    default:
      assertNever(item);
  }
}
