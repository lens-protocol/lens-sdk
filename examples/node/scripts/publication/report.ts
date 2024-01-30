import {
  PublicationReportingReason,
  PublicationReportingSpamSubreason,
} from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  const result = await client.publication.report({
    for: '0x014e-0x0a',
    reason: {
      spamReason: {
        reason: PublicationReportingReason.Spam,
        subreason: PublicationReportingSpamSubreason.FakeEngagement,
      },
    },
    additionalComments: 'Human readable comments, if any.',
  });

  console.log(`Publication was reported: `, result);
}

main();
