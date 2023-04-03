/* eslint-disable no-console */
import { invariant, never } from '@lens-protocol/shared-kernel';
import { Wallet } from 'ethers';

import { Authentication } from '../authentication';
import { Profile } from '../profile';
import { isRelayerResult, Transaction } from '../transaction';
import { buildTestEnvironment } from './buildTestEnvironment';
import { signAndBroadcast } from './signAndBroadcast';

const testConfig = {
  environment: buildTestEnvironment(),
};

export type TestSetup = {
  authentication: Authentication;
  profileId: string;
  wallet: Wallet;
  walletAddress: string;
};

export type SetupOptions = {
  withNewProfile?: boolean;
  withDispatcher?: boolean;
};

const defaultOptions: SetupOptions = {
  withNewProfile: false,
  withDispatcher: false,
};

type GetTestSetupFn = () => TestSetup;

export const describeAuthenticatedScenario =
  (options?: SetupOptions) => (callback: (f: GetTestSetupFn) => void) => {
    const { withNewProfile, withDispatcher } = { ...defaultOptions, ...options };

    invariant(
      !(withDispatcher && !withNewProfile),
      'Wrong SetupOptions: dispatcher can only be added together with profile',
    );

    const testHandle = Date.now().toString();
    const wallet = Wallet.createRandom();

    const authentication = new Authentication(testConfig);
    const profile = new Profile(testConfig, authentication);
    const transaction = new Transaction(testConfig, authentication);

    let _walletAddress: string;
    let _testProfileId: string;

    beforeAll(async () => {
      // authenticate
      const address = await wallet.getAddress();
      const challenge = await authentication.generateChallenge(address);
      const signature = await wallet.signMessage(challenge);
      await authentication.authenticate(address, signature);

      // create a new profile
      if (withNewProfile) {
        await createProfile({
          handle: testHandle,
          walletAddress: address,
          profile,
          transaction,
        });
      }

      // find test profileId
      const testProfileId = withNewProfile
        ? await findProfileId({
            handle: testHandle,
            walletAddress: address,
            profile,
          })
        : '';

      if (withDispatcher && testProfileId) {
        await enableDispatcher({
          profileId: testProfileId,
          wallet,
          profile,
          transaction,
        });
      }

      // store all at the end
      _walletAddress = address;
      _testProfileId = testProfileId || '';
    });

    afterAll(async () => {
      if (!_testProfileId) {
        return;
      }

      await burnProfile({
        profileId: _testProfileId,
        handle: testHandle,
        wallet,
        walletAddress: _walletAddress,
        profile,
        transaction,
      });
    });

    describe(buildDescribeName(options), () =>
      callback(() => ({
        authentication,
        profileId: _testProfileId,
        wallet,
        walletAddress: _walletAddress,
      })),
    );
  };

function buildDescribeName(options?: SetupOptions): string {
  if (!options) {
    return 'and the instance is authenticated with a random wallet';
  }
  if (options.withNewProfile && options.withDispatcher) {
    return 'and the instance is authenticated with a random wallet with a profile and dispatcher';
  }
  if (options.withNewProfile) {
    return 'and the instance is authenticated with a random wallet with a profile';
  }

  never('withDispatcher cannot be used without withNewProfile');
}

type CreateProfile = {
  handle: string;
  walletAddress: string;
  profile: Profile;
  transaction: Transaction;
};

async function createProfile({ handle, walletAddress, profile, transaction }: CreateProfile) {
  console.log(`Creating a new profile for ${walletAddress} with handle ${handle}`);

  const profileCreateResult = await profile.create({ handle });

  const value = profileCreateResult.unwrap();
  if (!isRelayerResult(value)) {
    throw new Error(`Profile creation error: ${value.reason}`);
  }

  // wait in a loop
  await transaction.waitForIsIndexed(value.txId);
}

type FindProfileId = {
  handle: string;
  walletAddress: string;
  profile: Profile;
};

async function findProfileId({ handle, walletAddress, profile }: FindProfileId) {
  const allOwnedProfiles = await profile.fetchAll({
    ownedBy: [walletAddress],
    limit: 20,
  });

  // console.log(allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })));

  const testProfile = allOwnedProfiles.items.find((item) => item.handle === `${handle}.test`);
  return testProfile?.id;
}

type EnableDispatcher = {
  profileId: string;
  wallet: Wallet;
  profile: Profile;
  transaction: Transaction;
};

async function enableDispatcher({ profileId, wallet, profile, transaction }: EnableDispatcher) {
  console.log(`Enabling dispatcher for profileId ${profileId}`);

  const setDispatcherTypedDataResult = await profile.createSetDispatcherTypedData({
    profileId,
  });
  const txId = await signAndBroadcast(transaction, wallet, setDispatcherTypedDataResult);

  if (!txId) {
    throw Error('Enabling dispatcher failed');
  }
  // wait in a loop
  await transaction.waitForIsIndexed(txId);
}

type BurnProfile = {
  profileId: string;
  handle: string;
  wallet: Wallet;
  walletAddress: string;
  profile: Profile;
  transaction: Transaction;
};

async function burnProfile({
  profileId,
  handle,
  wallet,
  walletAddress,
  profile,
  transaction,
}: BurnProfile) {
  console.log('All tests finished, burning the test profile', {
    profileId,
    handle,
  });

  const burnProfileTypedDataResult = await profile.createBurnProfileTypedData({
    profileId,
  });

  const txId = await signAndBroadcast(transaction, wallet, burnProfileTypedDataResult);

  if (!txId) {
    throw Error('Profile burn failed');
  }

  console.log(`Profile ${profileId} owned by wallet ${walletAddress} is burned in a txId ${txId}`);
}
