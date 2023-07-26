import { FieldReadFunction } from '@apollo/client';
import { ProfileId } from '@lens-protocol/domain/entities';

export const observedBy: FieldReadFunction<ProfileId | null> = (_, { variables }) => {
  if (variables?.observerId) {
    return variables.observerId as ProfileId;
  }
  return null;
};
