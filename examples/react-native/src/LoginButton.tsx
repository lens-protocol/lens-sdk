import { useSession, useLogin, useLogout, SessionType } from '@lens-protocol/react-native';
import React from 'react';
import { Button, Text, View } from 'react-native';

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
      <View>
        <Text>
          Welcome{' '}
          {session.type === SessionType.WithProfile
            ? session.profile.metadata?.displayName ?? session.profile.handle?.fullHandle
            : session.address}
        </Text>
        <Button disabled={logoutLoading} onPress={onLogoutPress} title="Log out" />
      </View>
    );
  }

  return (
    <View>
      <Button disabled={loginLoading} onPress={onLoginPress} title="Log in" />
    </View>
  );
}
