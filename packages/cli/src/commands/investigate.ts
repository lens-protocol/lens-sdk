import { Command } from '@commander-js/extra-typings';
import { isAddress } from '@ethersproject/address';
import { BigDecimal } from '@lens-protocol/shared-kernel';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

import { ensureParentCommand, initLensClient } from '../lib/commandToEnvironment.js';
import { LENS_HANDLES_CONTRACT, LENS_PROFILES_CONTRACT } from '../lib/consts.js';
import { formatHandle, formatProfile } from '../lib/formatters.js';
import { output } from '../lib/output.js';
import { safeRequest } from '../lib/safeRequest.js';

const hexToDecimal = (hex: string) => BigDecimal.from(hex).toFixed();

export function investigate() {
  const cmd = new Command('investigate')
    .description('Investigate a Profile ID, Handle or Wallet Address')
    .option('-h, --handle <handle>', 'Handle with prefix (lens/handle)')
    .option('-a, --address <address>', 'Wallet address')
    .option('-p, --profile <address>', 'Profile ID')
    .action(async (options) => {
      if (!options.handle && !options.address && !options.profile) {
        output.error('At least one of the options is required. See --help for more information.');
        process.exit(1);
      }

      const parentCommandName = ensureParentCommand(cmd);
      const client = initLensClient(parentCommandName);

      // investigate handle
      if (options.handle) {
        const fullHandle = options.handle;

        // fetch data
        const spinner = createSpinner(
          `Investigating handle: ${chalk.green(options.handle)}`,
        ).start();

        const address = await safeRequest(
          async () => client.handle.resolveAddress({ handle: fullHandle }),
          () => spinner.error(),
        );

        const profile = await safeRequest(
          async () => client.profile.fetch({ forHandle: fullHandle }),
          () => spinner.error(),
        );

        spinner.success();

        // render results
        output.value(`Resolved address:`, address);
        output.info(`Handle details:`, profile && profile.handle && formatHandle(profile.handle));
        output.info(`Linked profile:`, profile && formatProfile(profile));

        if (parentCommandName === 'production') {
          output.value(`URL:`, `https://share.lens.xyz/u/${fullHandle}`);
          profile &&
            profile.handle &&
            output.value(
              `Lens Handles OpenSea:`,
              `https://opensea.io/assets/matic/${LENS_HANDLES_CONTRACT}/${hexToDecimal(
                profile.handle.id,
              )}`,
            );
          profile &&
            output.value(
              `Lens Profiles OpenSea:`,
              `https://opensea.io/assets/matic/${LENS_PROFILES_CONTRACT}/${hexToDecimal(
                profile.id,
              )}`,
            );
        }
      }

      // investigate address
      if (options.address) {
        const address = options.address;

        // validate
        if (!isAddress(address)) {
          output.error(`Invalid address: ${address}`);
          process.exit(1);
        }

        // fetch data
        const spinner = createSpinner(`Investigating address: ${chalk.green(address)}`).start();

        const managedProfiles = await safeRequest(
          async () => client.wallet.profilesManaged({ for: address }),
          () => spinner.error(),
        );

        const ownedProfiles = await safeRequest(
          async () => client.profile.fetchAll({ where: { ownedBy: [address] } }),
          () => spinner.error(),
        );

        const ownedHandles = await safeRequest(
          async () => client.wallet.ownedHandles({ for: address }),
          () => spinner.error(),
        );

        const rateLimits = await safeRequest(
          async () => client.wallet.rateLimits({ userAddress: address }),
          () => spinner.error(),
        );

        spinner.success();

        // render results
        output.info(`Managed profiles:`, managedProfiles.items.map(formatProfile));
        output.info(`Owned profiles:`, ownedProfiles.items.map(formatProfile));
        output.info(
          `Owned handles:`,
          ownedHandles.items.map((handle) => formatHandle(handle)),
        );
        output.info(`Rate limits:`);
        console.table(rateLimits);
      }

      // investigate profile
      if (options.profile) {
        const profileId = options.profile;

        // fetch data
        const spinner = createSpinner(`Investigating profile: ${chalk.green(profileId)}`).start();

        const profile = await safeRequest(
          async () => client.profile.fetch({ forProfileId: profileId }),
          () => spinner.error(),
        );

        const managers = await safeRequest(
          async () => client.profile.managers({ for: profileId }),
          () => spinner.error(),
        );

        spinner.success();

        // render results
        output.info(`Profile details:`, profile && formatProfile(profile));

        output.info(`Profile managers:`, managers.items);

        if (profile && profile.handle) {
          output.info(`Handle details:`, formatHandle(profile.handle));
        }

        if (parentCommandName === 'production') {
          profile &&
            profile.handle &&
            output.value(`URL:`, `https://share.lens.xyz/u/${profile.handle.fullHandle}`);

          profile &&
            output.value(
              `Lens Profiles OpenSea:`,
              `https://opensea.io/assets/matic/${LENS_PROFILES_CONTRACT}/${hexToDecimal(
                profile.id,
              )}`,
            );

          profile &&
            profile.handle &&
            output.value(
              `Lens Handles OpenSea:`,
              `https://opensea.io/assets/matic/${LENS_HANDLES_CONTRACT}/${hexToDecimal(
                profile.handle.id,
              )}`,
            );
        }
      }
    });

  return cmd;
}
