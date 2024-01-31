import { ProfileReportingReason, ProfileReportingSpamSubreason } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.profile.report({
    for: '0x014e',
    reason: {
      spamReason: {
        reason: ProfileReportingReason.Spam,
        subreason: ProfileReportingSpamSubreason.Repetitive,
      },
    },
    additionalComments: 'Human readable comments, if any.',
  });

  console.log(`Profile was reported: `, result);
}

main();
