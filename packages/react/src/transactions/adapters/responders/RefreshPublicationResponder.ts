import { OpenActionRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IPublicationCacheManager } from '../../../publication/adapters/IPublicationCacheManager';

export class RefreshPublicationResponder implements ITransactionResponder<OpenActionRequest> {
  constructor(private readonly publicationCacheManage: IPublicationCacheManager) {}

  async commit({ request }: TransactionData<OpenActionRequest>) {
    await this.publicationCacheManage.refresh(request.publicationId);
  }
}
