import { Heading, Spinner, Text, VStack } from '@gluestack-ui/themed';
import { useProfilesManaged } from '@lens-protocol/react-native';
import React from 'react';

import { ErrorCallout } from './ErrorCallout';
import { LoginButton } from './LoginButton';

export type LoginFormProps = {
  address: string;
};

export function LoginForm({ address }: LoginFormProps) {
  const {
    data: profiles,
    error,
    loading,
  } = useProfilesManaged({
    for: address,
  });

  if (loading) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <ErrorCallout error={error} />;
  }

  if (profiles.length === 0) {
    return <Text>No profiles on this wallet.</Text>;
  }

  return (
    <VStack gap="$4">
      <Heading size="lg" textAlign="center">
        Select a profile to log in
      </Heading>
      <VStack gap="$4" mb="$4">
        {profiles.map((profile) => (
          <LoginButton key={profile.id} address={address} profile={profile} />
        ))}
      </VStack>
    </VStack>
  );
}
