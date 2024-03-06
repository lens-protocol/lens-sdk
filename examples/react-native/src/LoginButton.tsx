import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { useSession, useLogin, useLogout, SessionType } from '@lens-protocol/react-native';
import React from 'react';

import { wallet } from './wallet';

export function LoginButton() {
  const { execute: login, loading: loginLoading } = useLogin();
  const { execute: logout, loading: logoutLoading } = useLogout();
  const { data: session } = useSession();

  const onLoginPress = async () => {
    const result = await login(wallet);

    if (result.isFailure()) {
    }
  };

  const onLogoutPress = async () => {
    await logout();
  };

  if (session?.authenticated) {
    return (
      <Box>
        <Text isTruncated>
          Welcome{' '}
          {session.type === SessionType.WithProfile
            ? session.profile.metadata?.displayName ?? session.profile.handle?.fullHandle
            : session.address}
        </Text>
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          disabled={logoutLoading}
          onPress={onLogoutPress}
        >
          <ButtonText>Log out</ButtonText>
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        disabled={loginLoading}
        onPress={onLoginPress}
      >
        <ButtonText>Log in</ButtonText>
      </Button>
    </Box>
  );
}
