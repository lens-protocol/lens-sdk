import type { KeyValuePair } from '@lens-protocol/graphql';
import { fixedBytes32 } from '@lens-protocol/types';
import { describe, expect, it } from 'vitest';
import { encodeKeyValuePairs } from './encoding';

describe('Given the encodeKeyValuePairs helper', () => {
  describe.each([
    {
      type: 'bool',
      value: true,
      name: 'lens.param.bool',
      key: '0x5faa28a1c6642ff01c94ff04364eaab69fd7c24e9fca87e75fdb201dae6ec5ea',
    },
    {
      type: 'string',
      value: 'posting with Lens',
      name: 'lens.param.string',
      key: '0x807f729f3b16f5e0a674ac8b94593ad03bac2f07d184b832507d62f25043244e',
    },
    {
      type: 'address',
      value: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
      name: 'lens.param.address',
      key: '0xa740ced125b3917e1a813047b7ac05ddce590285547a3465692185f1ef4876c4',
    },
    {
      type: 'int256',
      value: 100,
      name: 'lens.param.int256',
      key: '0xdc59ec0d94e0bf86f61b200278ea69b74ce963dac86090241008ddee889baffe',
    },
    {
      type: 'bytes32',
      value:
        '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      name: 'lens.param.bytes32',
      key: '0xe8d3e8ecd52e4595b9924700dc9e3ef5dff6a9fb3571d91d547051ee4a81854d',
    },
    {
      type: '(uint256,string)',
      value: [1000, 'hello'],
      name: 'lens.param.tuple',
      key: '0x3f27e0c3f547c2a8f1a68a32652564973b8672e0c50e135bf31877363dd92031',
    },
  ])('When encoding a $type', ({ type, value, name, key }) => {
    it('Then it should encode the expected KeyValuePair', () => {
      const params = { [name]: value };

      const pairs: KeyValuePair[] = [
        {
          __typename: 'KeyValuePair',
          name,
          key: fixedBytes32(key),
          type,
        },
      ];

      const encoded = encodeKeyValuePairs(params, pairs);
      expect(encoded).toMatchSnapshot();
    });
  });
});
