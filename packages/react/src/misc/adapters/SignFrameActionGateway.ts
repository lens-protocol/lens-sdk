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
  omitTypename,
} from '@lens-protocol/api-bindings';
import { SignedFrameAction, UnsignedFrameAction } from '@lens-protocol/domain/entities';
import { ISignFrameActionGateway } from '@lens-protocol/domain/use-cases/wallets';

export class SignFrameActionGateway
  implements ISignFrameActionGateway<FrameLensManagerEip712Request, CreateFrameEip712TypedData>
{
  constructor(private apolloClient: SafeApolloClient) {}

  async signFrameAction(
    request: FrameEip712Request,
  ): Promise<SignedFrameAction<CreateFrameEip712TypedData>> {
    // omit deadline from request
    const { deadline: _, ...requestWithoutDeadline } = request;

    const result = await this.apolloClient.mutate<SignFrameActionData, SignFrameActionVariables>({
      mutation: SignFrameActionDocument,
      variables: {
        request: requestWithoutDeadline,
      },
    });

    return omitTypename(result.data.result);
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
      data: omitTypename(result.data.result),
    };
  }
}
