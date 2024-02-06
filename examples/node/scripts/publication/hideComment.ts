import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  if (!profileId) {
    throw new Error('Profile not authenticated');
  }

  // get user's publications
  const publications = await client.publication.fetchAll({
    where: {
      from: [profileId],
    },
  });

  // get comments on your first publication
  const comments = await client.publication.fetchAll({
    where: {
      commentOn: {
        id: publications.items[0].id,
      },
    },
  });

  const commentIdToHide = comments.items[0].id;

  // hide it
  await client.publication.hideComment({
    for: commentIdToHide,
  });

  // unhide it
  await client.publication.unhideComment({
    for: commentIdToHide,
  });
}

main();
