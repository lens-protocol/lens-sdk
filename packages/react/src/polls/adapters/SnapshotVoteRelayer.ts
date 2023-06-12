import { TypedData } from '@lens-protocol/blockchain-bindings';
import { ISignedVote } from '@lens-protocol/domain/entities';
import { IPollVoteRelayer } from '@lens-protocol/domain/use-cases/polls';
import { EthereumAddress, Url } from '@lens-protocol/shared-kernel';

export interface ISnapshotVote extends ISignedVote {
  voter: EthereumAddress;
  data: TypedData;
}

export class SnapshotRelayError extends Error {
  name = 'SnapshotRelayError' as const;
}

export class SnapshotVoteRelayer implements IPollVoteRelayer {
  constructor(private readonly sequencer: Url) {}

  async relay({ data, pollId, signature, voter }: ISnapshotVote): Promise<void> {
    const envelope = {
      address: voter,
      data,
      sig: signature,
    };

    const response = await fetch(this.sequencer, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(envelope),
    });

    if (!response.ok) {
      throw new SnapshotRelayError(
        `Failed to relay snapshot vote for proposal: ${pollId}\n\n` +
          `${JSON.stringify(data, null, 2)
            .split(`\n`)
            .map((line) => `  ${line}`)
            .join('\n')}`,
      );
    }
  }
}
