import { MetaTransaction, TransactionKind } from '@lens-protocol/domain/entities';
import {
  mockCreateProfileRequest,
  mockUnconstrainedFollowRequest,
  mockUnfollowRequest,
  mockUpdateDispatcherConfigRequest,
  mockUpdateFollowPolicyRequest,
  mockUpdateOffChainProfileImageRequest,
  mockUpdateProfileDetailsRequest,
  mockCreateCommentRequest,
  mockCreateMirrorRequest,
  mockCreatePostRequest,
  mockFreeCollectRequest,
  mockTokenAllowanceRequest,
} from '@lens-protocol/domain/mocks';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { InvariantError } from '@lens-protocol/shared-kernel';
import { IStorage, Storage } from '@lens-protocol/storage';
import { mockStorage } from '@lens-protocol/storage/mocks';

import { TransactionFactory } from '../../../infrastructure/TransactionFactory';
import {
  mockITransactionFactory,
  mockMetaTransactionData,
  mockNativeTransactionData,
} from '../../__helpers__/mocks';
import { PendingTransactionGateway } from '../PendingTransactionGateway';
import { TransactionStorageSchema } from '../schema';

function setupPendingTransactionGateway({
  factory = mockITransactionFactory(),
  storage = mockStorage<TransactionStorageSchema>(),
}: {
  factory?: TransactionFactory;
  storage?: IStorage<TransactionStorageSchema>;
}) {
  return new PendingTransactionGateway(storage, factory);
}

type TransactionRequest = {
  [K in TransactionKind]: Extract<AnyTransactionRequest, { kind: K }>;
};

const requests: TransactionRequest = {
  [TransactionKind.APPROVE_MODULE]: mockTokenAllowanceRequest(),
  [TransactionKind.COLLECT_PUBLICATION]: mockFreeCollectRequest(),
  [TransactionKind.CREATE_COMMENT]: mockCreateCommentRequest(),
  [TransactionKind.CREATE_POST]: mockCreatePostRequest(),
  [TransactionKind.FOLLOW_PROFILES]: mockUnconstrainedFollowRequest(),
  [TransactionKind.MIRROR_PUBLICATION]: mockCreateMirrorRequest(),
  [TransactionKind.UPDATE_FOLLOW_POLICY]: mockUpdateFollowPolicyRequest(),
  [TransactionKind.UPDATE_PROFILE_DETAILS]: mockUpdateProfileDetailsRequest(),
  [TransactionKind.UPDATE_PROFILE_IMAGE]: mockUpdateOffChainProfileImageRequest(),
  [TransactionKind.CREATE_PROFILE]: mockCreateProfileRequest(),
  [TransactionKind.UNFOLLOW_PROFILE]: mockUnfollowRequest(),
  [TransactionKind.UPDATE_DISPATCHER_CONFIG]: mockUpdateDispatcherConfigRequest(),
};

const lensHubTransactionKinds = [
  TransactionKind.COLLECT_PUBLICATION,
  TransactionKind.CREATE_COMMENT,
  TransactionKind.CREATE_POST,
  TransactionKind.FOLLOW_PROFILES,
  TransactionKind.MIRROR_PUBLICATION,
  TransactionKind.UPDATE_DISPATCHER_CONFIG,
  TransactionKind.UPDATE_FOLLOW_POLICY,
  TransactionKind.UPDATE_PROFILE_IMAGE,
] as const;

const lensPeripheryTransactionKinds = [TransactionKind.UPDATE_PROFILE_DETAILS] as const;

describe(`Given an instance of the ${PendingTransactionGateway.name}`, () => {
  const factory = mockITransactionFactory();

  describe(`when the "${PendingTransactionGateway.prototype.save.name}" method is invoked`, () => {
    const request = mockCreatePostRequest();

    it(`should save in memory all the given Transaction alongside existing ones`, async () => {
      const gateway = setupPendingTransactionGateway({ factory });

      const init = mockMetaTransactionData({ request });
      const tx = factory.createMetaTransaction(init);

      await gateway.save(tx);

      const actual = await gateway.getAll();
      expect(actual).toEqual([tx]);
    });

    it('should update the existing tx if provided a second time', async () => {
      const gateway = setupPendingTransactionGateway({ factory });

      const init = mockMetaTransactionData({ request });
      const tx = factory.createMetaTransaction(init);

      await gateway.save(tx);
      await gateway.save(tx);

      const actual = await gateway.getAll();
      expect(actual).toEqual([tx]);
    });

    it(`should throw an ${InvariantError.name} in case of ${MetaTransaction.name} with Nonce out of sequence`, async () => {
      const initTx1 = mockMetaTransactionData({ request });
      const tx1 = factory.createMetaTransaction(initTx1);

      const gateway = setupPendingTransactionGateway({ factory });
      await gateway.save(tx1);

      const initTx2 = mockMetaTransactionData({ request, nonce: initTx1.nonce + 4002 });
      const tx2 = factory.createMetaTransaction(initTx2);

      await expect(() => gateway.save(tx2)).rejects.toThrow(InvariantError);
    });
  });

  describe(`when the "${PendingTransactionGateway.prototype.remove.name}" method is invoked`, () => {
    const request = mockCreatePostRequest();
    const init = mockMetaTransactionData({ request });
    const tx = factory.createMetaTransaction(init);

    it(`should remove the Transaction for the given Id`, async () => {
      const gateway = setupPendingTransactionGateway({ factory });
      await gateway.save(tx);

      await gateway.remove(tx.id);

      const actual = await gateway.getAll();
      expect(actual).toEqual([]);
    });
  });

  describe(`when the underlying ${Storage.name} emits new data`, () => {
    const request = mockCreatePostRequest();
    const init = mockNativeTransactionData({ request });
    const tx = factory.createNativeTransaction(init);
    const mainStorage = mockStorage<TransactionStorageSchema>();
    const mainGateway = setupPendingTransactionGateway({ factory, storage: mainStorage });

    beforeAll(async () => {
      await mainGateway.save(tx);
    });

    it('should emit new transactions', async () => {
      const secondaryStorage = mockStorage<TransactionStorageSchema>();
      const underTestGateway = setupPendingTransactionGateway({
        factory,
        storage: secondaryStorage,
      });

      const transactionsData = await mainStorage.get();
      const subscriber = jest.fn();
      underTestGateway.subscribe(subscriber);
      secondaryStorage.simulateUpdate(transactionsData, null);

      expect(subscriber).toHaveBeenCalledWith([
        expect.objectContaining({
          id: tx.id,
        }),
      ]);
    });

    it('should not emit in case of updated transactions only', async () => {
      const underTestGateway = setupPendingTransactionGateway({
        factory,
        storage: mainStorage,
      });

      const transactionsData = await mainStorage.get();
      const subscriber = jest.fn();
      underTestGateway.subscribe(subscriber);
      mainStorage.simulateUpdate(transactionsData, transactionsData);

      expect(subscriber).not.toHaveBeenCalled();
    });

    it('should not emit in case of cleared storage event', async () => {
      const storage = mockStorage<TransactionStorageSchema>();
      const underTestGateway = setupPendingTransactionGateway({
        factory,
        storage,
      });

      const subscriber = jest.fn();
      underTestGateway.subscribe(subscriber);
      const transactionsData = await mainStorage.get();
      storage.simulateUpdate(null, transactionsData);

      expect(subscriber).not.toHaveBeenCalled();
    });
  });

  describe(`when the "${PendingTransactionGateway.prototype.getNextMetaTransactionNonceFor.name}" method is invoked`, () => {
    const request = mockCreatePostRequest();

    it('should return undefined if empty', async () => {
      const gateway = setupPendingTransactionGateway({ factory });

      const nonce = await gateway.getNextMetaTransactionNonceFor(request.kind);

      expect(nonce).toBeUndefined();
    });

    it(`should return undefined if no ${MetaTransaction.name}s are present`, async () => {
      const init = mockNativeTransactionData({ request });
      const tx = factory.createNativeTransaction(init);
      const gateway = setupPendingTransactionGateway({ factory });
      await gateway.save(tx);

      const nonce = await gateway.getNextMetaTransactionNonceFor(TransactionKind.CREATE_POST);

      expect(nonce).toBeUndefined();
    });

    describe('for a TransactionKind corresponding to a protocol method exposed on the LensHub.sol contract', () => {
      it(`should compute the next Nonce based on the most recent ${MetaTransaction.name} exposed from the same contract`, async () => {
        const gateway = setupPendingTransactionGateway({ factory });

        for (let idx = 0; idx < lensHubTransactionKinds.length; idx++) {
          const kind = lensHubTransactionKinds[idx];
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const init = mockMetaTransactionData({ request: requests[kind!], nonce: idx });
          const tx = factory.createMetaTransaction(init);

          await gateway.save(tx);

          expect(await gateway.getNextMetaTransactionNonceFor(TransactionKind.CREATE_POST)).toBe(
            tx.nonce + 1,
          );
        }
      });

      it(`should not be affected by ${MetaTransaction.name} for methods exposed on LensPeriphery.sol contract`, async () => {
        const request = mockUpdateProfileDetailsRequest();
        const gateway = setupPendingTransactionGateway({ factory });
        const init = mockMetaTransactionData({ request });
        const tx = factory.createMetaTransaction(init);
        await gateway.save(tx);

        const nonce = await gateway.getNextMetaTransactionNonceFor(TransactionKind.CREATE_POST);

        expect(nonce).toBeUndefined();
      });
    });

    describe('for a TransactionKind corresponding to a protocol method exposed on the LensPeriphery.sol contract', () => {
      it(`should compute the next Nonce based on the most recent ${MetaTransaction.name} exposed from the same contract`, async () => {
        const gateway = setupPendingTransactionGateway({ factory });

        for (let idx = 0; idx < lensPeripheryTransactionKinds.length; idx++) {
          const kind = lensPeripheryTransactionKinds[idx];
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const init = mockMetaTransactionData({ request: requests[kind!], nonce: idx });
          const tx = factory.createMetaTransaction(init);

          await gateway.save(tx);

          expect(
            await gateway.getNextMetaTransactionNonceFor(TransactionKind.UPDATE_PROFILE_DETAILS),
          ).toBe(tx.nonce + 1);
        }
      });

      it(`should not be affected by ${MetaTransaction.name} for methods exposed on LensHub.sol contract`, async () => {
        const request = mockCreatePostRequest();
        const gateway = setupPendingTransactionGateway({ factory });
        const init = mockMetaTransactionData({ request });
        const tx = factory.createMetaTransaction(init);
        await gateway.save(tx);

        const nonce = await gateway.getNextMetaTransactionNonceFor(
          TransactionKind.UPDATE_PROFILE_DETAILS,
        );

        expect(nonce).toBeUndefined();
      });
    });

    describe(`for ${TransactionKind.UNFOLLOW_PROFILE} meta-tx`, () => {
      const request = mockUnfollowRequest();
      const init = mockMetaTransactionData({ request });
      const tx = factory.createMetaTransaction(init);

      it(`should always return undefined cause the burn method is on Follow NFT contract
            and keeping accurate tracking of nonces is more complex and not worth it`, async () => {
        const gateway = setupPendingTransactionGateway({ factory });
        await gateway.save(tx);

        const nonce = await gateway.getNextMetaTransactionNonceFor(
          TransactionKind.UNFOLLOW_PROFILE,
        );

        expect(nonce).toBeUndefined();
      });
    });
  });
});
