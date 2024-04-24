import { Button, ButtonText } from '@gluestack-ui/themed';
import { useLogout } from '@lens-protocol/react-native';
import React from 'react';

export function LogoutButton() {
  const { execute: logout, loading } = useLogout();

  return (
    <Button
      size="md"
      variant="solid"
      action="primary"
      isDisabled={false}
      isFocusVisible={false}
      disabled={loading}
      onPress={() => logout()}
    >
      <ButtonText>Log out</ButtonText>
    </Button>
  );
}
