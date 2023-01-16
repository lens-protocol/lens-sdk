import {
  AlreadyReportedError,
  IReportPublicationPresenter,
} from '@lens-protocol/domain/use-cases/publications';
import { Deferred, Result } from '@lens-protocol/shared-kernel';

export class ReportPublicationPresenter implements IReportPublicationPresenter {
  private deferredResult = new Deferred<Result<void, AlreadyReportedError>>();

  present(result: Result<void, AlreadyReportedError>): void {
    this.deferredResult.resolve(result);
  }

  asResult(): Promise<Result<void, AlreadyReportedError>> {
    return this.deferredResult.promise;
  }
}
