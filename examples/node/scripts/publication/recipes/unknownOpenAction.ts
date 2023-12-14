import {
  LensClient,
  ModuleParam,
  decodeData,
  development,
  encodeData,
  isPostPublication,
  isRelaySuccess,
  isUnknownOpenActionModuleSettings,
} from '@lens-protocol/client';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  // fetch publication with open action module
  const publication = await client.publication.fetch({
    forId: '0x123-0x456',
  });

  if (!publication || !isPostPublication(publication)) {
    throw new Error('Publication is not a post publication');
  }

  // the open action contract address we are interested in
  const openActionContractAddress = '0x1234567890123456789012345678901234567890';

  // retrieve open action settings
  const openActionSettings = publication.openActionModules.find(
    (module) =>
      module.contract.address.toLowerCase() === openActionContractAddress.toLocaleLowerCase(),
  );

  if (!openActionSettings || !isUnknownOpenActionModuleSettings(openActionSettings)) {
    throw new Error('No UnknownOpenActionModule settings found');
  }

  // fetch open action metadata
  const result = await client.modules.fetchMetadata({
    implementation: openActionSettings.contract.address,
  });

  if (!result) {
    throw new Error('No metadata found');
  }

  // decode init data if needed
  if (openActionSettings.initializeCalldata) {
    const initData = decodeData(
      JSON.parse(result.metadata.initializeCalldataABI) as ModuleParam[],
      openActionSettings.initializeCalldata,
    );
    console.log('initData', initData);
  }

  // decode init result if needed
  if (openActionSettings.initializeResultData && result.metadata.initializeResultDataABI) {
    const initResult = decodeData(
      JSON.parse(result.metadata.initializeResultDataABI) as ModuleParam[],
      openActionSettings.initializeResultData,
    );
    console.log('initResult', initResult);
  }

  // Use initData and/or initResult to inform the user about the module
  // configuration. This depends on the specific module used.

  const calldata = encodeData(JSON.parse(result.metadata.processCalldataABI) as ModuleParam[], [
    /* data according to ABI spec, might leverage initData and/or initResult */
  ]);

  // act on open action
  const actOnResult = await client.publication.actions.actOn({
    actOn: {
      unknownOpenAction: {
        address: openActionSettings.contract.address,
        data: calldata,
      },
    },
    for: publication.id,
  });

  const actOnResultValue = actOnResult.unwrap();

  if (!isRelaySuccess(actOnResultValue)) {
    console.log(`Something went wrong`, actOnResultValue);
    return;
  }

  console.log(`Transaction was successfully broadcasted with txId`, actOnResultValue.txId);
}

main();
