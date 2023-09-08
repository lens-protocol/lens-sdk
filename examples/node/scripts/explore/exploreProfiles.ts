import { ExploreProfileOrderBy, LensClient, development } from "@lens-protocol/client";

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const mostFollowers = await lensClient.explore.profiles({
    orderBy: ExploreProfileOrderBy.MostFollowers,
  });

  const mostPostsThisYear = await lensClient.explore.profiles({
    orderBy: ExploreProfileOrderBy.MostPosts,
    where: {
      since: "2023-01-01T00:00:00.000Z",
    },
  });

  const mostMirrored = await lensClient.explore.profiles({
    orderBy: ExploreProfileOrderBy.MostMirrors,
  });

  console.log(JSON.stringify(mostFollowers, null, 2));
  console.log(JSON.stringify(mostPostsThisYear, null, 2));
  console.log(JSON.stringify(mostMirrored, null, 2));
}

main();
