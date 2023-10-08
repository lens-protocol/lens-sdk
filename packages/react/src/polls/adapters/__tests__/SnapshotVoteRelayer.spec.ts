/*
 * @jest-environment node
 */

import { faker } from '@faker-js/faker';
import { mock32BytesHexString, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { when } from 'jest-when';

import { production } from '../../../environments';
import { mockSignedVote } from '../../../wallet/adapters/__helpers__/mocks';
import { SnapshotRelayError, SnapshotVoteRelayer } from '../SnapshotVoteRelayer';

const sequencer = production.snapshot.sequencer;

function createHttpJsonResponse(
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

function createSuccessfulResponse() {
  return createHttpJsonResponse(
    200,
    JSON.stringify({
      id: mock32BytesHexString(),
      ipfs: faker.random.alphaNumeric(10),
      relayer: {
        address: mockEvmAddress(),
        receipt: faker.datatype.hexadecimal({ length: 65 }),
      },
    }),
  );
}

function createFailedRequest() {
  return createHttpJsonResponse(
    500,
    `<!DOCTYPE html><html>...`, // properly wrong to prove robustness
  );
}

function setupTestScenario() {
  const snapshotVoteRelayer = new SnapshotVoteRelayer(production.snapshot.sequencer);
  return snapshotVoteRelayer;
}

describe(`Given an instance of the ${SnapshotVoteRelayer.name}`, () => {
  describe(`when calling "${SnapshotVoteRelayer.prototype.relay.name}" method`, () => {
    const signedVote = mockSignedVote();

    beforeAll(() => {
      jest.spyOn(global, 'fetch');
    });

    afterAll(() => {
      jest.mocked(fetch).mockRestore();
    });

    it('should send the expected data envelope to the snapshot sequencer', async () => {
      when(fetch).mockResolvedValue(createSuccessfulResponse());

      const snapshotVoteRelayer = setupTestScenario();

      await snapshotVoteRelayer.relay(signedVote);

      expect(fetch).toBeCalledWith(
        sequencer,
        expect.objectContaining({
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: signedVote.voter,
            data: signedVote.data,
            sig: signedVote.signature,
          }),
        }),
      );
    });

    it(`should throw an ${SnapshotRelayError.name} in case of failed request`, async () => {
      when(fetch).mockResolvedValue(createFailedRequest());

      const snapshotVoteRelayer = setupTestScenario();

      await expect(snapshotVoteRelayer.relay(signedVote)).rejects.toThrowError(SnapshotRelayError);
    });
  });
});
