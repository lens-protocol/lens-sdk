import {
  EnableConversationsResult,
  IEnableConversationsPresenter,
} from '@lens-protocol/domain/use-cases/inbox';
import { invariant } from '@lens-protocol/shared-kernel';

export class EnableConversationsPresenter implements IEnableConversationsPresenter {
  private result: EnableConversationsResult | null = null;

  presentEnableResult(r: EnableConversationsResult) {
    this.result = r;
  }

  asResult(): EnableConversationsResult {
    invariant(this.result, 'Enable result should be present');
    return this.result;
  }
}
