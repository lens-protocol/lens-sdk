import {
  Button,
  ButtonText,
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import { Profile, useLogin } from '@lens-protocol/react-native';
import React from 'react';

export type LoginButtonProps = {
  address: string;
  profile: Profile;
};

export function LoginButton({ address, profile }: LoginButtonProps) {
  const toast = useToast();
  const { execute: login, loading: loginLoading } = useLogin();

  const onLoginPress = async () => {
    const result = await login({
      address,
      profileId: profile?.id,
    });

    if (result.isFailure()) {
      toast.show({
        placement: 'top',
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="attention" variant="solid">
              <VStack space="xs">
                <ToastTitle>Log-in error</ToastTitle>
                <ToastDescription>{result.error.message}</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  return (
    <Button
      size="md"
      variant="link"
      action="primary"
      isDisabled={false}
      isFocusVisible={false}
      disabled={loginLoading}
      onPress={onLoginPress}
    >
      <ButtonText isTruncated>{profile.handle?.fullHandle ?? profile.ownedBy.address}</ButtonText>
    </Button>
  );
}
