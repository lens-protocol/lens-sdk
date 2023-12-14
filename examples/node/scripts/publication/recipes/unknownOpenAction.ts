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

  // retrieve open action settings
  const openActionSettings = publication.openActionModules.find(
    (module) => module.__typename === 'UnknownOpenActionModuleSettings',
  );

  if (!openActionSettings || !isUnknownOpenActionModuleSettings(openActionSettings)) {
    throw new Error('No UnknownOpenActionModule settings found');
  }

  // fetch open action metadata
  const metadata = await client.modules.fetchMetadata({
    implementation: openActionSettings.contract.address,
  });

  if (!metadata) {
    throw new Error('No metadata found');
  }

  // decode init data if needed
  if (openActionSettings.initializeCalldata) {
    const initData = decodeData(
      JSON.parse(metadata.metadata.initializeCalldataABI) as ModuleParam[],
      openActionSettings.initializeCalldata,
    );
    console.log('initData', initData);
  }

  // decode init result if needed
  if (openActionSettings.initializeResultData && metadata.metadata.initializeResultDataABI) {
    const initResult = decodeData(
      JSON.parse(metadata.metadata.initializeResultDataABI) as ModuleParam[],
      openActionSettings.initializeResultData,
    );
    console.log('initResult', initResult);
  }

  // Use initData and/or initResult to inform the user about the module
  // configuration. This depends on the specific module used.

  const calldata = encodeData(JSON.parse(metadata.metadata.processCalldataABI) as ModuleParam[], [
    /* data according to ABI spec, might leverage initData and/or initResult */
  ]);

  // act on open action
  const result = await client.publication.actions.actOn({
    actOn: {
      unknownOpenAction: {
        address: openActionSettings.contract.address,
        data: calldata,
      },
    },
    for: publication.id,
  });

  const resultValue = result.unwrap();

  if (!isRelaySuccess(resultValue)) {
    console.log(`Something went wrong`, resultValue);
    return;
  }

  console.log(`Transaction was successfully broadcasted with txId`, resultValue.txId);
}

main();
