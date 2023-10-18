import { SafeApolloClient } from '@lens-protocol/api-bindings';
import { IUnsignedProtocolCall, Transaction } from '@lens-protocol/domain/entities';
import { BlockProfilesRequest } from '@lens-protocol/domain/src/use-cases/profile/BlockProfiles';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOnChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { ITransactionFactory } from '../ITransactionFactory';

export class BlockProfilesGateway
  implements
    IDelegatedTransactionGateway<BlockProfilesRequest>,
    IOnChainProtocolCallGateway<BlockProfilesRequest>
{
  constructor(
    private readonly _apolloClient: SafeApolloClient,
    private readonly _transactionFactory: ITransactionFactory<BlockProfilesRequest>,
  ) {}

  createUnsignedProtocolCall(
    _request: BlockProfilesRequest,
    _nonceOverride?: number | undefined,
  ): Promise<IUnsignedProtocolCall<BlockProfilesRequest>> {
    throw new Error('Method not implemented.');
  }
  createDelegatedTransaction(
    _request: BlockProfilesRequest,
  ): PromiseResult<Transaction<BlockProfilesRequest>, BroadcastingError> {
    throw new Error('Method not implemented.');
  }
}
