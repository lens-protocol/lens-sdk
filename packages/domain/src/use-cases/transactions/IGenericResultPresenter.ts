import { IEquatableError, Result } from '@lens-protocol/shared-kernel';

export interface IGenericResultPresenter<T, E extends IEquatableError> {
  present(result: Result<T, E>): void;
}
