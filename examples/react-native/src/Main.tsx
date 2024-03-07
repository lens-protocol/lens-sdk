import { Spinner, Text, VStack } from '@gluestack-ui/themed';
import { useSession, SessionType } from '@lens-protocol/react-native';
import React from 'react';

import { ErrorCallout } from './ErrorCallout';
import { LoginForm } from './LoginForm';
import { LogoutButton } from './LogoutButton';
import { MyProfile } from './MyProfile';
import { wallet } from './wallet';

export function Main() {
  const { data: session, error, loading } = useSession();

  if (loading) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <ErrorCallout error={error} />;
  }

  if (session.authenticated === false) {
    return <LoginForm address={wallet.address} />;
  }

  if (session.type === SessionType.JustWallet) {
    return (
      <VStack gap="$2">
        <Text>
          Welcome <Text isTruncated>{session.address}</Text>, you need a Profile to use this app.
        </Text>
        <LogoutButton />
      </VStack>
    );
  }

  return <MyProfile profile={session.profile} />;
}
