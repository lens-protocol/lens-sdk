import { Wallet } from 'ethers';

import { GatedContent } from '.';

describe('Gated ', () => {
  const tokenGating = new GatedContent();
  const wallet = Wallet.createRandom();

  it('should create auth signature and store in memory', async () => {
    await tokenGating.connect(wallet);

    expect(tokenGating.authSignature).toEqual(expect.objectContaining({ address: wallet.address }));
  });

  it('should encrypt a string', async () => {
    await tokenGating.connect(wallet);
    const encryptedString = await tokenGating.encrypt('Lens Protocol');

    expect(encryptedString.encryptedString).toBeDefined();
    expect(encryptedString.encryptedSymmetricKey).toBeDefined();
  });

  it('should decrypt a string', async () => {
    await tokenGating.connect(wallet);
    const encryptedString = await tokenGating.encrypt('Lens Protocol');

    const decryptedString = await tokenGating.decrypt(
      encryptedString.encryptedString,
      encryptedString.encryptedSymmetricKey,
    );

    expect(decryptedString).toEqual('Lens Protocol');
  });

  it('should fail to decrypt when conditions not met', async () => {
    await tokenGating.connect(wallet);
    const encryptedString = await tokenGating.encrypt('Lens Protocol');

    await tokenGating.connect(Wallet.createRandom());

    const decryptedString = await tokenGating.decrypt(
      encryptedString.encryptedString,

      encryptedString.encryptedSymmetricKey,
    );

    expect(decryptedString).toEqual('Lens Protocol');
  });
});
