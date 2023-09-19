import { LensClient, development } from '@lens-protocol/client';

async function main() {
  const lensClient = new LensClient({
    environment: development,
  });

  const collectRevenue = await lensClient.revenue.fromPublications({
    for: 'PROFILE_ID',
    // where: {
    //   fromCollects: true,
    // },
  });

  collectRevenue.items.map((item) => {
    console.log(
      `Collect revenue for publication with id: ${item.publication.id} - ${JSON.stringify(
        item.revenue,
      )}`,
    );
  });

  const revenueFromQuoteCollects = await lensClient.revenue.fromPublications({
    for: 'PROFILE_ID',
    // where: {
    //   fromCollects: true,
    //   publicationTypes: [PublicationType.Quote],
    // },
  });

  revenueFromQuoteCollects.items.map((item) => {
    console.log(
      `Collect revenue for quote publication with id: ${item.publication.id} - ${JSON.stringify(
        item.revenue,
      )}`,
    );
  });

  const revenueFromOpenAction = await lensClient.revenue.fromPublications({
    for: 'PROFILE_ID',
    // where: {
    //   fromCollects: false,
    //   anyOf: [
    //     {
    //       address: '0x000',
    //       category: OpenActionCategoryType.Collect,
    //     },
    //   ],
    // },
  });

  revenueFromOpenAction.items.map((item) => {
    console.log(
      `Open action revenue for publication with id: ${item.publication.id} - ${JSON.stringify(
        item.revenue,
      )}`,
    );
  });
}

main();
