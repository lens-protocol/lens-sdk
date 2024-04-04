import { Command } from '@commander-js/extra-typings';
import { isAddress } from '@ethersproject/address';
import { isRelaySuccess, isValidHandle } from '@lens-protocol/client';
import { createSpinner } from 'nanospinner';

import {
  ensureParentCommand,
  getHandlePrefix,
  initLensClient,
} from '../utils/commandToEnvironment.js';

const createTestProfile = new Command('create-profile')
  .description('Create a new test profile, possible only in the development environment')
  .requiredOption('-h, --handle <handle>', 'Test profile handle')
  .requiredOption('-a, --address <address>', 'Wallet address')
  .action(async (options) => {
    const validation = createSpinner(`Validating input data`).start();

    if (!isValidHandle(options.handle)) {
      validation.error();
      console.error(`Invalid handle: ${options.handle}`);
      process.exit(1);
    }

    if (!isAddress(options.address)) {
      validation.error();
      console.error(`Invalid address: ${options.address}`);
      process.exit(1);
    }

    const parentCommandName = ensureParentCommand(createTestProfile);
    const client = initLensClient(parentCommandName);

    // check if the requested handle is available
    const handleOwnerAddress = await client.handle.resolveAddress({
      handle: `${getHandlePrefix(parentCommandName)}/${options.handle}`,
    });

    if (handleOwnerAddress) {
      validation.error();
      console.error(`The requested handle "${options.handle}" is not available.`);
      process.exit(1);
    }
    validation.success();

    const creation = createSpinner(
      `Creating new test profile with handle "${options.handle}" for address "${options.address}"`,
    ).start();

    try {
      const profileCreateResult = await client.wallet.createProfileWithHandle({
        handle: options.handle,
        to: options.address,
      });

      if (!isRelaySuccess(profileCreateResult)) {
        creation.error();
        console.error(`Something went wrong`, profileCreateResult);
        process.exit(1);
      }

      await client.transaction.waitUntilComplete({ forTxId: profileCreateResult.txId });

      creation.success();
      console.log(`Profile created successfully`);
    } catch (error) {
      creation.error();
      console.error(error);
      process.exit(1);
    }
  });

export { createTestProfile };
