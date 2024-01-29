import {
  OpenActionModuleFragment,
  PublicationType,
  isMirrorPublication,
  isOpenActionModuleWithReferralFee,
  isRelaySuccess,
} from '@lens-protocol/client';

import { getAuthenticatedClient } from '../../shared/getAuthenticatedClient';
import { setupWallet } from '../../shared/setupWallet';

function mapOpenActionModuleToInputType(openActionModule: OpenActionModuleFragment) {
  switch (openActionModule.__typename) {
    case 'SimpleCollectOpenActionSettings':
      return {
        simpleCollectOpenAction: true,
      };
    case 'MultirecipientFeeCollectOpenActionSettings':
      return {
        multirecipientCollectOpenAction: true,
      };
    default:
      throw new Error(`Unsupported openActionModule type: ${openActionModule.__typename}`);
  }
}

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);

  // fetch mirrors
  const mirrorsResult = await client.publication.fetchAll({
    where: {
      publicationTypes: [PublicationType.Mirror],
    },
  });

  let mirror = undefined;

  // iterate over pages of mirrors to find a mirror of a post with referralFee
  while (mirrorsResult.pageInfo.next && !mirror) {
    console.log(`Fetching page for cursor: ${mirrorsResult.pageInfo.next}`);

    const nextPage = await mirrorsResult.next();

    if (nextPage) {
      // type safe as Mirror
      const mirrors = mirrorsResult.items.filter(isMirrorPublication);

      // look for referralFee
      mirror = mirrors.find((m) =>
        m.mirrorOn.openActionModules.find((o) => 'referralFee' in o && o.referralFee > 0),
      );
    }
  }

  if (!mirror) {
    throw new Error('No mirror found with referralFee');
  }

  const openActionWithReferralFee = mirror.mirrorOn.openActionModules.find(
    (o) => 'referralFee' in o && o.referralFee > 0,
  );

  // type safe as OpenActionModuleWithReferralFeeFragment
  if (
    !openActionWithReferralFee ||
    (openActionWithReferralFee && !isOpenActionModuleWithReferralFee(openActionWithReferralFee))
  ) {
    throw new Error('No openAction found with referralFee');
  }

  console.log(
    `We found a mirror with ID ${mirror.id} by profile ${mirror.by.id} 
    of a publication ID ${mirror.mirrorOn.id} with openActionModule ${openActionWithReferralFee.__typename} and referralFee: ${openActionWithReferralFee.referralFee}`,
  );

  // map the openActionModule to the correct input type
  const actOnInput = mapOpenActionModuleToInputType(openActionWithReferralFee);

  // now collect the publication
  // notice that paid actions need to be signed and sent through broadcast
  const resultTypedData = await client.publication.actions.createActOnTypedData({
    actOn: actOnInput,
    for: mirror.mirrorOn.id,
    referrers: [{ profileId: mirror.by.id }, { publicationId: mirror.id }],
  });

  const { id, typedData } = resultTypedData.unwrap();

  console.log(`Typed data: `, typedData);

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value,
  );

  console.log(`Broadcasting signed typed data...`);

  const broadcastResult = await client.transaction.broadcastOnchain({
    id,
    signature: signedTypedData,
  });

  const broadcastValue = broadcastResult.unwrap();

  if (!isRelaySuccess(broadcastValue)) {
    console.log(`Something went wrong`, broadcastValue);
    return;
  }

  console.log(`Transaction was successfully broadcasted with txId`, broadcastValue.txId);
}

main();
