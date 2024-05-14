import '@walletconnect/react-native-compat';
import Clipboard from '@react-native-clipboard/clipboard';
import { WalletConnectModal as Modal } from '@walletconnect/modal-react-native';
import React from 'react';
import Config from 'react-native-config';

import { getChainId } from '../utils/environment';

const projectId = Config.WALLET_CONNECT_PROJECT_ID || ''; // your WalletConnect Cloud Project ID

const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      chains: [`eip155:${getChainId()}`],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
};

const providerMetadata = {
  name: 'NativeLens',
  description: 'Lens React Native SDK Example using WalletConnect',
  url: 'https://nativelens.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'nativelens://',
    universal: 'nativelens.com',
  },
};

export function WalletConnectModal() {
  const onCopy = (value: string) => {
    Clipboard.setString(value);
  };

  return (
    <Modal
      projectId={projectId}
      providerMetadata={providerMetadata}
      sessionParams={sessionParams}
      onCopyClipboard={onCopy}
    />
  );
}
