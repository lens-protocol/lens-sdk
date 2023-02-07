import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import {
  ContractType,
  LensEnvironment,
  LensGatedSDK,
  MetadataV2,
  PublicationMainFocus,
} from '../src';

jest.mock('../src/lens/client');
jest.setTimeout(10000);

describe('client', () => {
  const provider = new JsonRpcProvider('http://localhost:8545');
  const signer = Wallet.createRandom().connect(provider);
  const handle = 'testing.lens';
  const profileId = '0x01';
  const pubId = '0x02';
  let client: LensGatedSDK;
  const metadata: MetadataV2 = {
    version: '2.0.0',
    name: 'name',
    description: 'description',
    attributes: [],
    content: 'content',
    metadata_id: '1',
    appId: 'app_id',
    mainContentFocus: PublicationMainFocus.TextOnly,
    locale: 'en',
  };
  const nftAccessCondition = {
    nft: {
      contractAddress: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
      tokenIds: [],
      chainID: 1,
      contractType: ContractType.Erc721,
    },
  };
  const eoaAccessCondition = {
    eoa: {
      address: signer.address,
      chainID: 137,
    },
  };
  const mockUploadHandler = jest.fn().mockReturnValue('contentURI');

  beforeEach(async () => {
    client = await LensGatedSDK.create({
      provider,
      signer,
      env: LensEnvironment.Polygon,
    });
    mockUploadHandler.mockClear();
  });

  it('should populate fields correctly', async () => {
    expect(client.env).toEqual(LensEnvironment.Polygon);
    expect(client.ready).toBeFalsy();
  });

  it('should connect to polygon correctly', async () => {
    await client.connect({
      address: signer.address,
      env: LensEnvironment.Polygon,
    });
    expect(client.ready).toBeTruthy();
    expect(client.env).toEqual(LensEnvironment.Polygon);
    expect(client.gated.ready).toEqual(true);
  });

  it('should switch networks correctly', async () => {
    await client.connect({
      address: signer.address,
      env: LensEnvironment.Mumbai,
    });
    expect(client.ready).toBeTruthy();
    expect(client.env).toEqual(LensEnvironment.Mumbai);
    client.handleEnvChanged(LensEnvironment.Polygon);
    expect(client.env).toEqual(LensEnvironment.Polygon);
  });

  it('should disconnect successfully', async () => {
    await client.connect({
      address: signer.address,
      env: LensEnvironment.MumbaiSandbox,
    });
    await client.disconnect();
    expect(client.ready).toBeFalsy();
    expect(client.gated.ready).toBeFalsy();
  });

  it('should encrypt and decrypt metadata with eoa condition correctly', async () => {
    const actualEncrypted = await client.gated.encryptMetadata(
      metadata,
      profileId,
      eoaAccessCondition,
      mockUploadHandler
    );

    expect(mockUploadHandler).toHaveBeenCalledTimes(1);
    expect(actualEncrypted.error).toBeUndefined();
    expect(actualEncrypted.contentURI).toEqual('contentURI');
    expect(actualEncrypted.encryptedMetadata).toBeDefined();
    expect(actualEncrypted.encryptedMetadata).toMatchObject({
      version: '2.0.0',
      name: 'name',
      description: 'description',
      attributes: [],
      metadata_id: '1',
      appId: 'app_id',
      mainContentFocus: PublicationMainFocus.TextOnly,
      locale: 'en',
      encryptionParams: {
        accessCondition: {
          or: {
            criteria: [{ profile: { profileId } }, eoaAccessCondition],
          },
        },
        encryptionProvider: 'LIT_PROTOCOL',
      },
    });
    expect(actualEncrypted.encryptedMetadata?.content).toEqual(expect.any(String));
    expect(actualEncrypted.encryptedMetadata?.encryptionParams?.encryptedFields.content).toEqual(
      expect.any(String)
    );
    expect(
      actualEncrypted.encryptedMetadata?.encryptionParams?.providerSpecificParams.encryptionKey
    ).toEqual(expect.any(String));

    const actualDecrypted = await client.gated.decryptMetadata(actualEncrypted.encryptedMetadata!);

    expect(actualDecrypted.error).toBeUndefined();
    expect(actualDecrypted.decrypted).toEqual(metadata);
  });

  it('should encrypt data with collect condition and thisPublication = true correctly', async () => {
    const actualEncrypted = await client.gated.encryptMetadata(
      metadata,
      profileId,
      {
        collect: {
          thisPublication: true,
        },
      },
      mockUploadHandler
    );

    expect(mockUploadHandler).toHaveBeenCalledTimes(1);
    expect(actualEncrypted.error).toBeUndefined();
    expect(actualEncrypted.contentURI).toEqual('contentURI');
    expect(actualEncrypted.encryptedMetadata).toBeDefined();
    expect(actualEncrypted.encryptedMetadata).toMatchObject({
      version: '2.0.0',
      name: 'name',
      description: 'description',
      attributes: [],
      metadata_id: '1',
      appId: 'app_id',
      mainContentFocus: PublicationMainFocus.TextOnly,
      locale: 'en',
      encryptionParams: {
        accessCondition: {
          or: {
            criteria: [
              { profile: { profileId } },
              { collect: { publicationId: `${profileId}-${pubId}` } },
            ],
          },
        },
        encryptionProvider: 'LIT_PROTOCOL',
      },
    });
    expect(actualEncrypted.encryptedMetadata?.content).toEqual(expect.any(String));
    expect(actualEncrypted.encryptedMetadata?.encryptionParams?.encryptedFields.content).toEqual(
      expect.any(String)
    );
    expect(
      actualEncrypted.encryptedMetadata?.encryptionParams?.providerSpecificParams.encryptionKey
    ).toEqual(expect.any(String));
  });

  it('should encrypt data with a collect condition and thisPublication = true wrapped in and condition correctly', async () => {
    const actualEncrypted = await client.gated.encryptMetadata(
      metadata,
      profileId,
      {
        and: {
          criteria: [
            {
              collect: {
                thisPublication: true,
              },
            },
            {
              follow: {
                profileId,
              },
            },
          ],
        },
      },
      mockUploadHandler
    );

    expect(mockUploadHandler).toHaveBeenCalledTimes(1);
    expect(actualEncrypted.error).toBeUndefined();
    expect(actualEncrypted.contentURI).toEqual('contentURI');
    expect(actualEncrypted.encryptedMetadata).toBeDefined();
    expect(actualEncrypted.encryptedMetadata).toMatchObject({
      version: '2.0.0',
      name: 'name',
      description: 'description',
      attributes: [],
      metadata_id: '1',
      appId: 'app_id',
      mainContentFocus: PublicationMainFocus.TextOnly,
      locale: 'en',
      encryptionParams: {
        accessCondition: {
          or: {
            criteria: [
              { profile: { profileId } },
              {
                and: {
                  criteria: [
                    { collect: { publicationId: `${profileId}-${pubId}` } },
                    { follow: { profileId } },
                  ],
                },
              },
            ],
          },
        },
        encryptionProvider: 'LIT_PROTOCOL',
      },
    });
    expect(actualEncrypted.encryptedMetadata?.content).toEqual(expect.any(String));
    expect(actualEncrypted.encryptedMetadata?.encryptionParams?.encryptedFields.content).toEqual(
      expect.any(String)
    );
    expect(
      actualEncrypted.encryptedMetadata?.encryptionParams?.providerSpecificParams.encryptionKey
    ).toEqual(expect.any(String));
  });
});
