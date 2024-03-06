import { Alert, AlertIcon, InfoIcon, AlertText } from '@gluestack-ui/themed';
import React from 'react';

export type ErrorCalloutProps = {
  error: Error;
};

export function ErrorCallout({ error }: ErrorCalloutProps) {
  return (
    <Alert mx="$2.5" action="error" variant="solid">
      <AlertIcon as={InfoIcon} mr="$3" />
      <AlertText>{error.message}</AlertText>
    </Alert>
  );
}
