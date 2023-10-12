import { faker } from '@faker-js/faker';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { Eip712TypedDataDomain, Eip712TypedDataField } from '../../graphql/generated';

export function mockEIP712TypedDataField(): Eip712TypedDataField {
  return {
    name: 'nonce',
    type: 'uint256',
  };
}

export function mockEIP712TypedDataDomain(): Eip712TypedDataDomain {
  return {
    name: 'Lens',
    version: '1',
    chainId: 0,
    verifyingContract: mockEvmAddress(),
  };
}

export function mockCreateTypedDataResult<T extends string, D extends object>(
  __typename: T,
  typedData: D,
) {
  return {
    __typename,
    id: faker.datatype.uuid(),
    expiresAt: faker.date.future().toISOString(),
    typedData,
  };
}
