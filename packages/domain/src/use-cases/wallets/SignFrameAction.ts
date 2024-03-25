import { UnknownObject, success } from '@lens-protocol/shared-kernel';

import {
  PendingSigningRequestError,
  SignedFrameAction,
  UnsignedFrameAction,
  UserRejectedError,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../authentication/ActiveWallet';
import { IGenericResultPresenter } from '../transactions';

export type SignFrameActionRequest<TInput extends UnknownObject> = {
  input: TInput;
  signless: boolean;
};

export interface ISignFrameActionGateway<TInput extends UnknownObject, TData> {
  signFrameAction(input: TInput): Promise<SignedFrameAction<TData>>;
  createUnsignedFrameAction(input: TInput): Promise<UnsignedFrameAction<TData>>;
}

export type ISignFrameActionPresenter<TData> = IGenericResultPresenter<
  SignedFrameAction<TData>,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export class SignFrameAction<TInput extends UnknownObject, TData> {
  constructor(
    protected readonly activeWallet: ActiveWallet,
    protected readonly gateway: ISignFrameActionGateway<TInput, TData>,
    protected readonly presenter: ISignFrameActionPresenter<TData>,
  ) {}

  async execute(request: SignFrameActionRequest<TInput>) {
    if (request.signless) {
      const signedAction = await this.gateway.signFrameAction(request.input);

      this.presenter.present(success(signedAction));
      return;
    }

    const wallet = await this.activeWallet.requireActiveWallet();
    const unsignedAction = await this.gateway.createUnsignedFrameAction(request.input);
    const signedActionResult = await wallet.signFrameAction(unsignedAction);

    this.presenter.present(signedActionResult);
  }
}
