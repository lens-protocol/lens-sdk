import {
  ConversationsDisabledError,
  IConversationWallet,
  createInboxKeyStorage,
  development,
} from '@lens-protocol/react';
import { PromiseResult, assertError, failure, success } from '@lens-protocol/shared-kernel';
import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { ethers } from 'ethers';

import { WebConversationProvider } from '../adapters/WebConversationProvider';

class WalletAdapter implements IConversationWallet {
  address: string;

  constructor(private readonly wallet: ethers.Wallet) {
    this.address = wallet.address;
  }

  async signMessage(value: string): PromiseResult<string, Error> {
    try {
      const signature = await this.wallet.signMessage(value);
      return success(signature);
    } catch (error) {
      assertError(error);
      return failure(error);
    }
  }
}

function setupWalletInstance() {
  const wallet = ethers.Wallet.createRandom();
  return new WalletAdapter(wallet);
}

function setupStorage() {
  const inMemoryStorage = new InMemoryStorageProvider();
  return createInboxKeyStorage(inMemoryStorage, development.name);
}

describe(`Given a ${WebConversationProvider.name} instance`, () => {
  describe(`when calling "${WebConversationProvider.prototype.enableConversations.name}" method`, () => {
    const sharedStorage = setupStorage();

    describe(`and the storage is empty`, () => {
      it('should create a new xmtp client and save the key bundle in the storage', async () => {
        const provider = new WebConversationProvider(development, sharedStorage);
        const signer = setupWalletInstance();

        const result = await provider.enableConversations(signer, {
          participant: {
            profileId: undefined,
            address: signer.address,
          },
        });

        expect(result.isSuccess()).toEqual(true);
        expect(result.unwrap()).toEqual({
          profileId: undefined,
          address: signer.address,
        });

        const keyBundle = await sharedStorage.get();
        expect(typeof keyBundle).toBe('string');
      });
    });

    describe(`and the storage contains a key`, () => {
      it('should create a new xmtp client from the key in the storage', async () => {
        // make sure that the storage is not empty
        const keyBundle = await sharedStorage.get();
        expect(typeof keyBundle).toBe('string');

        const provider = new WebConversationProvider(development, sharedStorage);
        const signer = setupWalletInstance();

        const result = await provider.enableConversations(signer, {
          participant: {
            profileId: undefined,
            address: signer.address,
          },
        });

        expect(result.isSuccess()).toEqual(true);
        expect(result.unwrap()).toEqual({
          profileId: undefined,
          address: signer.address,
        });
      });
    });
  });

  describe(`when calling "${WebConversationProvider.prototype.fetchConversation.name}" method`, () => {
    const storage = setupStorage();
    const provider = new WebConversationProvider(development, storage);
    const signer = setupWalletInstance();
    const participant = {
      profileId: undefined,
      address: signer.address,
    };

    describe(`and the conversations are not enabled`, () => {
      it(`should return ${ConversationsDisabledError.name}`, async () => {
        const result = await provider.fetchConversation({
          conversationId: '123',
          participant,
        });

        expect(result.isFailure()).toEqual(true);

        if (result.isFailure()) {
          expect(result.error).toBeInstanceOf(ConversationsDisabledError);
        }
      });
    });

    describe(`and the conversations are enabled`, () => {
      it(`should return null if requested conversation not found`, async () => {
        await provider.enableConversations(signer, {
          participant,
        });

        const result = await provider.fetchConversation({
          conversationId: '123',
          participant,
        });

        expect(result.isSuccess()).toEqual(true);
        expect(result.unwrap()).toEqual(null);
      });
    });
  });
});
