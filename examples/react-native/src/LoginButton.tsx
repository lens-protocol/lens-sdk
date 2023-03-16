import React from 'react';
import {useActiveProfile, useWalletLogin, useWalletLogout} from '@lens-protocol/react';
import {Button, Text, View} from 'react-native';

import {wallet} from './wallet';

export function LoginButton() {
  const {execute: login, isPending: loginPending} = useWalletLogin();
  const {execute: logout, isPending: logoutPending} = useWalletLogout();
  const {data: profile} = useActiveProfile();

  const onLoginPress = async () => {
    await login(wallet);
  };

  const onLogoutPress = async () => {
    await logout();
  };

  return (
    <View>
      {profile && (
        <View>
          <Text>Welcome @{profile.handle}</Text>
          <Button disabled={logoutPending} onPress={onLogoutPress} title="Log out" />
        </View>
      )}
      {!profile && <Button disabled={loginPending} onPress={onLoginPress} title="Log in" />}
    </View>
  );
}
