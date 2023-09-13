import {
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  LensClient,
  development,
} from '@lens-protocol/client';

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const latestPublications = await lensClient.explore.publications({
    orderBy: ExplorePublicationsOrderByType.Latest,
  });

  const topCommented = await lensClient.explore.publications({
    orderBy: ExplorePublicationsOrderByType.TopCommented,
  });

  const highestMirroredPosts = await lensClient.explore.publications({
    orderBy: ExplorePublicationsOrderByType.TopMirrored,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
  });

  const topCollected = await lensClient.explore.publications({
    orderBy: ExplorePublicationsOrderByType.TopCollectedOpenAction,
  });

  const curatedProfiles = await lensClient.explore.publications({
    orderBy: ExplorePublicationsOrderByType.LensCurated,
  });

  console.log(JSON.stringify(latestPublications, null, 2));
  console.log(JSON.stringify(topCommented, null, 2));
  console.log(JSON.stringify(highestMirroredPosts, null, 2));
  console.log(JSON.stringify(topCollected, null, 2));
  console.log(JSON.stringify(curatedProfiles, null, 2));
}

main();
