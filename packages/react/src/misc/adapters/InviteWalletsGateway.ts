import {
  InviteData,
  InviteDocument,
  InviteVariables,
  ProfileAlreadyInvitedData,
  ProfileAlreadyInvitedDocument,
  ProfileAlreadyInvitedVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { Invite } from '@lens-protocol/domain/entities';
import {
  IInviteWalletsFactory,
  IInviteWalletsGateway,
  InviteWalletsRequest,
} from '@lens-protocol/domain/use-cases/wallets';

export class InviteWalletsGateway implements IInviteWalletsGateway, IInviteWalletsFactory {
  constructor(private apolloClient: SafeApolloClient) {}

  async create(request: InviteWalletsRequest): Promise<Invite[]> {
    const invites: Invite[] = request.wallets.map((wallet) => ({ address: wallet }));

    const invalid = await Promise.all(
      invites.map(async (invite) => {
        const wasInvited = await this.wasWalletInvited(invite.address);
        return wasInvited ? invite.address : undefined;
      }),
    );

    return invites.filter((invite) => !invalid.includes(invite.address));
  }

  async invite(invites: Invite[]): Promise<void> {
    await this.apolloClient.mutate<InviteData, InviteVariables>({
      mutation: InviteDocument,
      variables: {
        request: {
          invites: invites.map((i) => i.address),
        },
      },
    });
  }

  private async wasWalletInvited(address: string): Promise<boolean> {
    const result = await this.apolloClient.query<
      ProfileAlreadyInvitedData,
      ProfileAlreadyInvitedVariables
    >({
      query: ProfileAlreadyInvitedDocument,
      variables: {
        request: {
          for: address,
        },
      },
    });

    return result.data.result;
  }
}
