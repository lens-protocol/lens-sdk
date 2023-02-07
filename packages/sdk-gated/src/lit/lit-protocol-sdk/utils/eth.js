import { hexlify } from '@ethersproject/bytes';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { toUtf8Bytes } from '@ethersproject/strings';
import { verifyMessage } from '@ethersproject/wallet/lib.esm';
import detectEthereumProvider from '@metamask/detect-provider';
import { LIT_CHAINS } from '../lib-js/constants';
import { log } from '../lib-js/utils';

export async function connectWeb3({ chainId = 1 } = {}) {
  const rpcUrls = {};
  // need to make it look like this:
  // rpc: {
  //   1: "https://mainnet.mycustomnode.com",
  //   3: "https://ropsten.mycustomnode.com",
  //   100: "https://dai.poa.network",
  //   // ...
  // },

  for (let i = 0; i < Object.keys(LIT_CHAINS).length; i++) {
    const chainName = Object.keys(LIT_CHAINS)[i];
    const chainId = LIT_CHAINS[chainName].chainId;
    rpcUrls[chainId] = LIT_CHAINS[chainName].rpcUrls[0];
  }

  const provider = await detectEthereumProvider();
  const web3 = new Web3Provider(provider);

  // trigger metamask popup
  await provider.enable();

  log('listing accounts');
  const accounts = await provider.request({
    method: 'eth_requestAccounts',
    params: [],
  });
  log('accounts', accounts);
  const account = accounts[0].toLowerCase();

  return { web3, account };
}

export async function signMessage({ body, web3, account }) {
  if (!web3 || !account) {
    let resp = await connectWeb3();
    web3 = resp.web3;
    account = resp.account;
  }

  log('pausing...');
  await new Promise((resolve) => setTimeout(resolve, 500));
  log('signing with ', account);
  // const signature = await web3.getSigner().signMessage(body);
  const signature = await signMessageAsync(web3.getSigner(), account, body);
  //.request({ method: 'personal_sign', params: [account, body] })
  const address = verifyMessage(body, signature).toLowerCase();

  log('Signature: ', signature);
  log('recovered address: ', address);

  if (address !== account) {
    const msg = `ruh roh, the user signed with a different address (${address}) then they\'re using with web3 (${account}).  this will lead to confusion.`;
    console.error(msg);
    alert(
      'something seems to be wrong with your wallets message signing.  maybe restart your browser or your wallet.  your recovered sig address does not match your web3 account address'
    );
    throw new Error(msg);
  }

  return { signature, address };
}

// wrapper around signMessage that tries personal_sign first.  this is to fix a
// bug with walletconnect where just using signMessage was failing
export const signMessageAsync = async (signer, address, message) => {
  const messageBytes = toUtf8Bytes(message);
  if (signer instanceof JsonRpcSigner) {
    try {
      log('Signing with personal_sign');
      return signer.provider.send('personal_sign', [hexlify(messageBytes), address.toLowerCase()]);
    } catch (e) {
      log('Signing with personal_sign failed, trying signMessage as a fallback');
      if (e.message.includes('personal_sign')) {
        return await signer.signMessage(messageBytes);
      }
      throw e;
    }
  } else {
    log('signing with signMessage');
    return await signer.signMessage(messageBytes);
  }
};
