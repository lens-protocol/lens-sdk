import {
  CreateFrameEip712TypedData,
  CreateFrameTypedDataData,
  CreateFrameTypedDataDocument,
  CreateFrameTypedDataVariables,
  FrameEip712Request,
  FrameLensManagerEip712Request,
  SafeApolloClient,
  SignFrameActionData,
  SignFrameActionDocument,
  SignFrameActionVariables,
} from '@lens-protocol/api-bindings';
import {
  ISignFrameActionGateway,
  SignedFrameAction,
  UnsignedFrameAction,
} from '@lens-protocol/domain/use-cases/wallets';

export class SignFrameActionGateway
  implements ISignFrameActionGateway<FrameLensManagerEip712Request, CreateFrameEip712TypedData>
{
  constructor(private apolloClient: SafeApolloClient) {}

  async signFrameAction(
    request: FrameLensManagerEip712Request,
  ): Promise<SignedFrameAction<CreateFrameEip712TypedData>> {
    const result = await this.apolloClient.mutate<SignFrameActionData, SignFrameActionVariables>({
      mutation: SignFrameActionDocument,
      variables: {
        request,
      },
    });

    return result.data.result;
  }

  async createUnsignedFrameAction(
    request: FrameEip712Request,
  ): Promise<UnsignedFrameAction<CreateFrameEip712TypedData>> {
    const result = await this.apolloClient.query<
      CreateFrameTypedDataData,
      CreateFrameTypedDataVariables
    >({
      query: CreateFrameTypedDataDocument,
      variables: {
        request: request,
      },
    });

    return {
      data: result.data.result,
    };
  }
}
