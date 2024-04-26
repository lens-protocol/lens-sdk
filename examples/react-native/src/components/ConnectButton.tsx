import '@walletconnect/react-native-compat';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { useLogout } from '@lens-protocol/react-native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import React from 'react';

export function ConnectButton() {
  const { open, isConnected, provider } = useWalletConnectModal();
  const { execute: logout } = useLogout();

  const onPress = () => {
    if (isConnected && provider) {
      void provider.disconnect();
      void logout();
    } else {
      void open();
    }
  };

  return (
    <Button size="md" variant="solid" action="primary" onPress={onPress}>
      <ButtonText>{isConnected ? 'Disconnect' : 'Connect Wallet'}</ButtonText>
    </Button>
  );
}
