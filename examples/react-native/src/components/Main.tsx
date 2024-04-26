import { Heading, Spinner, Text, VStack } from '@gluestack-ui/themed';
import { useSession, SessionType } from '@lens-protocol/react-native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import React from 'react';

import { ErrorCallout } from './ErrorCallout';
import { LoginForm } from './LoginForm';
import { MyProfile } from './MyProfile';

export function Main() {
  const { address } = useWalletConnectModal();
  const { data: session, error, loading } = useSession();

  if (loading) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <ErrorCallout error={error} />;
  }

  if (!address) {
    return (
      <VStack gap="$4">
        <Heading size="lg" textAlign="center">
          Welcome to Lens
        </Heading>

        <Text textAlign="center" mb="$4">
          Connect your wallet to begin.
        </Text>
      </VStack>
    );
  }

  if (session.authenticated === false) {
    return <LoginForm address={address} />;
  }

  if (session.type === SessionType.JustWallet) {
    return (
      <VStack gap="$2">
        <Text>
          Welcome <Text isTruncated>{session.address}</Text>, you need a Profile to use this app.
        </Text>
      </VStack>
    );
  }

  return <MyProfile profile={session.profile} />;
}
