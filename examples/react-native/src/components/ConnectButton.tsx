import '@walletconnect/react-native-compat';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import React from 'react';

export function ConnectButton() {
  const { open, isConnected, provider } = useWalletConnectModal();

  const onPress = () => {
    if (isConnected && provider) {
      void provider.disconnect();
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
