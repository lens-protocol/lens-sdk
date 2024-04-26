import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Card,
  Divider,
  Heading,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Profile } from '@lens-protocol/react-native';
import React from 'react';

type ProfileAvatarProps = {
  profile: Profile;
};

function ProfileAvatar({ profile }: ProfileAvatarProps) {
  const uri =
    profile.metadata?.picture?.__typename === 'ImageSet'
      ? profile.metadata.picture.optimized?.uri
      : undefined;

  return (
    <Avatar mr="$4">
      <AvatarFallbackText fontFamily="$heading">
        {profile.handle?.localName ?? profile.ownedBy.address}
      </AvatarFallbackText>
      {uri && (
        <AvatarImage
          source={{
            uri,
          }}
          alt="profile image"
        />
      )}
    </Avatar>
  );
}

function Ticker({ children }: { children: React.ReactNode }) {
  return (
    <VStack alignItems="center" flex={1}>
      {children}
    </VStack>
  );
}

export type MyProfileProps = {
  profile: Profile;
};

export function MyProfile({ profile }: MyProfileProps) {
  return (
    <Card p="$6" borderRadius="$lg" maxWidth={360} m="$3">
      <Box flexDirection="row">
        <ProfileAvatar profile={profile} />
        <VStack>
          <Heading size="md" fontFamily="$heading" mb="$1">
            {profile.metadata?.displayName ?? profile.handle?.fullHandle}
          </Heading>
          {profile.metadata?.displayName && (
            <Text size="sm" fontFamily="$heading">
              {profile.handle?.fullHandle}
            </Text>
          )}
        </VStack>
      </Box>
      <Box my="$6" flexDirection="row">
        <Ticker>
          <Heading size="xs" fontFamily="$heading">
            {profile.stats.posts}
          </Heading>
          <Text size="xs">posts</Text>
        </Ticker>

        <Divider orientation="vertical" />

        <Ticker>
          <Heading size="xs" fontFamily="$heading">
            {profile.stats.followers}
          </Heading>
          <Text size="xs">followers</Text>
        </Ticker>

        <Divider orientation="vertical" />

        <Ticker>
          <Heading size="xs" fontFamily="$heading">
            {profile.stats.following}
          </Heading>
          <Text size="xs">following</Text>
        </Ticker>
      </Box>
    </Card>
  );
}
