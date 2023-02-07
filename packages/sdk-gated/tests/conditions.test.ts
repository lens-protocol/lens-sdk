import { ContractType, LensEnvironment, ScalarOperator } from '../src';
import { transform } from '../src/conditions/';
import { transformAndCondition, validateBooleanCondition } from '../src/conditions/and-condition';
import { transformCollectCondition } from '../src/conditions/collect-condition';
import { transformEoaCondition, validateEoaCondition } from '../src/conditions/eoa-condition';
import { transformFollowCondition } from '../src/conditions/follow-condition';
import { transformNftCondition, validateNftCondition } from '../src/conditions/nft-condition';
import { transformOrCondition, validateOrCondition } from '../src/conditions/or-condition';
import { transformProfileCondition } from '../src/conditions/profile-condition';
import { transformErc20Condition } from '../src/conditions/token-condition';
import { getScalarOperatorSymbol } from '../src/conditions/utils';
import { InvalidAccessCriteriaError } from '../src/error';
import { AndConditionOutput, EoaOwnershipOutput, OrConditionOutput } from '../src/graphql/types';
import LensAPIClient from '../src/lens/client';
import {
  LitConditionType,
  LitKnownMethods,
  LitKnownParams,
  LitScalarOperator,
  SupportedChains,
} from '../src/lit/types';

jest.mock('../src/lens/client');

const TEST_ADDRESS = '0x1234123412341234123412341234123412341234';
const profileId = '0x01';
const profileIdDecimal = '1';
const api = new LensAPIClient(LensEnvironment.Mumbai);
const apiSandbox = new LensAPIClient(LensEnvironment.MumbaiSandbox);

describe('eoa', () => {
  const api = new LensAPIClient(LensEnvironment.Mumbai);
  const EOA_CONDITION: EoaOwnershipOutput = {
    address: TEST_ADDRESS,
  };
  const EOA_EXPECTED = [
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.POLYGON,
      contractAddress: '',
      method: '',
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: TEST_ADDRESS,
      },
      standardContractType: '',
    },
  ];
  it('should validate an eoa condition', () => {
    expect(validateEoaCondition(EOA_CONDITION)).toBeUndefined();
  });
  it('should create a lit condition successfully', async () => {
    expect(transformEoaCondition(EOA_CONDITION)).toEqual(EOA_EXPECTED);
    expect(await transform({ eoa: EOA_CONDITION }, api.env)).toEqual(EOA_EXPECTED);
  });
});

describe('nft', () => {
  const NFT_CONDITION_NO_IDS = {
    contractAddress: TEST_ADDRESS,
    chainID: 1,
    contractType: ContractType.Erc721,
    tokenIds: [],
  };
  const NFT_CONDITION_1_ID = {
    contractAddress: TEST_ADDRESS,
    chainID: 1,
    contractType: ContractType.Erc721,
    tokenIds: ['1'],
  };
  const NFT_CONDITION_1_ID_SCALAR = {
    contractAddress: TEST_ADDRESS,
    chainID: 1,
    contractType: ContractType.Erc721,
    tokenIds: '1',
  };
  const NFT_CONDITION_2_IDS = {
    contractAddress: TEST_ADDRESS,
    chainID: 1,
    contractType: ContractType.Erc721,
    tokenIds: ['1', '2'],
  };
  const NFT_INVALID_ID = {
    contractAddress: TEST_ADDRESS,
    chainID: 1,
    contractType: ContractType.Erc721,
    tokenIds: ['a'],
  };
  const NFT_EXPECTED_NO_IDS = [
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.ETHEREUM,
      contractAddress: TEST_ADDRESS,
      method: 'balanceOf',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: LitScalarOperator.GREATER_THAN,
        value: '0',
      },
      standardContractType: ContractType.Erc721,
    },
  ];
  const NFT_EXPECTED_1_ID = [
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.ETHEREUM,
      contractAddress: TEST_ADDRESS,
      method: 'ownerOf',
      parameters: ['1'],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: ':userAddress',
      },
      standardContractType: ContractType.Erc721,
    },
  ];
  const NFT_EXPECTED_2_IDS = [
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.ETHEREUM,
      contractAddress: TEST_ADDRESS,
      method: 'ownerOf',
      parameters: ['1'],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: ':userAddress',
      },
      standardContractType: ContractType.Erc721,
    },
    { operator: 'or' },
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.ETHEREUM,
      contractAddress: TEST_ADDRESS,
      method: 'ownerOf',
      parameters: ['2'],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: ':userAddress',
      },
      standardContractType: ContractType.Erc721,
    },
  ];
  it('should validate an nft condition', () => {
    expect(() => validateNftCondition(NFT_CONDITION_1_ID)).not.toThrow();
    // @ts-ignore
    expect(() => validateNftCondition(NFT_CONDITION_1_ID_SCALAR)).not.toThrow();
    expect(() => validateNftCondition(NFT_CONDITION_2_IDS)).not.toThrow();
    expect(() => validateNftCondition(NFT_CONDITION_NO_IDS)).not.toThrow();
    expect(() => validateNftCondition(NFT_INVALID_ID)).toThrow();
  });
  it('should create a lit condition successfully with no token ids', async () => {
    expect(transformNftCondition(NFT_CONDITION_NO_IDS)).toEqual(NFT_EXPECTED_NO_IDS);
    expect(await transform({ nft: NFT_CONDITION_NO_IDS }, api.env)).toEqual(NFT_EXPECTED_NO_IDS);
  });
  it('should create a lit condition successfully with 1 token id', async () => {
    expect(transformNftCondition(NFT_CONDITION_1_ID)).toEqual(NFT_EXPECTED_1_ID);
    expect(await transform({ nft: NFT_CONDITION_1_ID }, api.env)).toEqual(NFT_EXPECTED_1_ID);
    // @ts-ignore
    expect(transformNftCondition(NFT_CONDITION_1_ID_SCALAR)).toEqual(NFT_EXPECTED_1_ID);
    // @ts-ignore
    expect(await transform({ nft: NFT_CONDITION_1_ID_SCALAR }, api.env)).toEqual(NFT_EXPECTED_1_ID);
  });
  it('should create a lit condition successfully with 2 token ids', async () => {
    expect(transformNftCondition(NFT_CONDITION_2_IDS)).toEqual(NFT_EXPECTED_2_IDS);
    expect(await transform({ nft: NFT_CONDITION_2_IDS }, api.env)).toEqual(NFT_EXPECTED_2_IDS);
  });
  it('should not create condition with invalid token id', async () => {
    expect.assertions(2);
    expect(() => transformNftCondition(NFT_INVALID_ID)).toThrow();
    await expect(transform({ nft: NFT_INVALID_ID }, api.env)).rejects.toEqual(
      new InvalidAccessCriteriaError('Invalid token id: a')
    );
  });
});

describe('token', () => {
  (Object.values(ScalarOperator) as (ScalarOperator | LitScalarOperator)[])
    .concat(Object.values(LitScalarOperator) as (ScalarOperator | LitScalarOperator)[])
    .map((o) => [o, getScalarOperatorSymbol(o)])
    .forEach(async ([operator, litOperator]) => {
      it(`should create a lit condition for operator ${operator} successfully`, async () => {
        const ERC_INPUT = {
          contractAddress: TEST_ADDRESS,
          chainID: 1,
          amount: '100',
          decimals: 18,
          condition: operator as ScalarOperator,
        };
        const ERC_EXPECTED = [
          {
            conditionType: LitConditionType.EVM_BASIC,
            chain: SupportedChains.ETHEREUM,
            contractAddress: TEST_ADDRESS,
            method: 'balanceOf',
            parameters: [':userAddress'],
            returnValueTest: {
              comparator: litOperator,
              value: '100000000000000000000',
            },
            standardContractType: ContractType.Erc20,
          },
        ];
        expect(transformErc20Condition(ERC_INPUT)).toEqual(ERC_EXPECTED);
        expect(await transform({ token: ERC_INPUT }, api.env)).toEqual(ERC_EXPECTED);
      });
    });

  it('should transform condition with decimal amount', async () => {
    const ERC_INPUT_DECIMAL = {
      contractAddress: TEST_ADDRESS,
      chainID: 1,
      amount: '0.1',
      decimals: 18,
      condition: ScalarOperator.GreaterThan,
    };
    const ERC_EXPECTED_DECIMAL = [
      {
        conditionType: LitConditionType.EVM_BASIC,
        chain: SupportedChains.ETHEREUM,
        contractAddress: TEST_ADDRESS,
        method: 'balanceOf',
        parameters: [':userAddress'],
        returnValueTest: {
          comparator: LitScalarOperator.GREATER_THAN,
          value: '100000000000000000',
        },
        standardContractType: ContractType.Erc20,
      },
    ];
    expect(transformErc20Condition(ERC_INPUT_DECIMAL)).toEqual(ERC_EXPECTED_DECIMAL);
    expect(await transform({ token: ERC_INPUT_DECIMAL }, api.env)).toEqual(ERC_EXPECTED_DECIMAL);
  });
});

describe('and', () => {
  const AND_INPUT = {
    criteria: [
      {
        eoa: {
          address: TEST_ADDRESS,
        },
      },
      {
        nft: {
          contractAddress: TEST_ADDRESS,
          chainID: 1,
          contractType: ContractType.Erc721,
          tokenIds: [],
        },
      },
    ],
  };
  const AND_EXPECTED = [
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.POLYGON,
      contractAddress: '',
      method: '',
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: TEST_ADDRESS,
      },
      standardContractType: '',
    },
    { operator: 'and' },
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.ETHEREUM,
      contractAddress: TEST_ADDRESS,
      method: 'balanceOf',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: LitScalarOperator.GREATER_THAN,
        value: '0',
      },
      standardContractType: ContractType.Erc721,
    },
  ];
  it('should create a lit condition successfully', async () => {
    expect(await transformAndCondition(AND_INPUT, api.env)).toEqual(AND_EXPECTED);
    expect(await transform({ and: AND_INPUT }, api.env)).toEqual(AND_EXPECTED);
  });
  it('should create a nested lit condition successfully', async () => {
    const AND_NESTED_INPUT_1 = {
      criteria: [
        {
          and: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
        {
          profile: {
            profileId,
          },
        },
      ],
    };
    const AND_NESTED_INPUT_2 = {
      criteria: [
        {
          and: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
        {
          and: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
      ],
    };
    const AND_NESTED_EXPECTED_1 = [
      [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.IS_FOLLOWING,
          functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0', '0x'],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'profileId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'followerProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.IS_FOLLOWING,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
        { operator: 'and' },
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.HAS_COLLECTED,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            profileIdDecimal,
            profileIdDecimal,
            '0',
            '0x',
          ],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'publisherId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pubId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'collectorProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.HAS_COLLECTED,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
      ],
      { operator: 'and' },
      {
        conditionType: 'evmContract',
        contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
        chain: 'mumbai',
        functionName: 'hasAccess',
        functionParams: [':userAddress', '1', '0x'],
        functionAbi: {
          constant: true,
          inputs: [
            {
              internalType: 'address',
              name: 'requestorAddress',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'profileId',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'hasAccess',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        returnValueTest: {
          key: '',
          comparator: '=',
          value: 'true',
        },
      },
    ];
    const AND_NESTED_EXPECTED_2 = [
      [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.IS_FOLLOWING,
          functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0', '0x'],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'profileId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'followerProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.IS_FOLLOWING,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
        { operator: 'and' },
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.HAS_COLLECTED,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            profileIdDecimal,
            profileIdDecimal,
            '0',
            '0x',
          ],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'publisherId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pubId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'collectorProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.HAS_COLLECTED,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
      ],
      { operator: 'and' },
      [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.IS_FOLLOWING,
          functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0', '0x'],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'profileId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'followerProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.IS_FOLLOWING,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
        { operator: 'and' },
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.HAS_COLLECTED,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            profileIdDecimal,
            profileIdDecimal,
            '0',
            '0x',
          ],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'publisherId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pubId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'collectorProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.HAS_COLLECTED,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
      ],
    ];
    expect(await transformAndCondition(AND_NESTED_INPUT_1, apiSandbox.env)).toEqual(
      AND_NESTED_EXPECTED_1
    );
    expect(await transform({ and: AND_NESTED_INPUT_1 }, apiSandbox.env)).toEqual(
      AND_NESTED_EXPECTED_1
    );
    expect(await transformAndCondition(AND_NESTED_INPUT_2, apiSandbox.env)).toEqual(
      AND_NESTED_EXPECTED_2
    );
    expect(await transform({ and: AND_NESTED_INPUT_2 }, apiSandbox.env)).toEqual(
      AND_NESTED_EXPECTED_2
    );
  });
  it('should not allow less than 2 criteria', async () => {
    const AND_1_CRITERIA: AndConditionOutput = {
      criteria: [
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
      ],
    };
    expect(() => validateBooleanCondition(AND_1_CRITERIA, true)).toThrow();
    expect(() => validateBooleanCondition(AND_1_CRITERIA, false)).toThrow();
  });
  it('should not allow more than 5 criteria', async () => {
    const AND_6_CRITERIA: AndConditionOutput = {
      criteria: [
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
      ],
    };
    expect(() => validateBooleanCondition(AND_6_CRITERIA, true)).toThrow();
    expect(() => validateBooleanCondition(AND_6_CRITERIA, false)).toThrow();
  });
  it('should not allow more than 1 level of nested criteria', async () => {
    const AND_NESTED: AndConditionOutput = {
      criteria: [
        {
          and: {
            criteria: [
              {
                eoa: {
                  address: TEST_ADDRESS,
                },
              },
              {
                eoa: {
                  address: TEST_ADDRESS,
                },
              },
            ],
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
      ],
    };
    expect(() => validateBooleanCondition(AND_NESTED, true)).not.toThrow();
    expect(() => validateBooleanCondition(AND_NESTED, false)).toThrow();
  });
  it('should not allow nested lit with only one criteria', async () => {
    const AND_NESTED_INPUT_ONE_CRITERIA = {
      criteria: [
        {
          and: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
      ],
    };
    expect(() => validateBooleanCondition(AND_NESTED_INPUT_ONE_CRITERIA, true)).toThrow();
    expect(() => validateBooleanCondition(AND_NESTED_INPUT_ONE_CRITERIA, false)).toThrow();
  });
});

describe('or', () => {
  const OR_INPUT = {
    criteria: [
      {
        eoa: {
          address: TEST_ADDRESS,
        },
      },
      {
        nft: {
          contractAddress: TEST_ADDRESS,
          chainID: 1,
          contractType: ContractType.Erc721,
          tokenIds: [],
        },
      },
    ],
  };
  const OR_EXPECTED = [
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.POLYGON,
      contractAddress: '',
      method: '',
      parameters: [LitKnownParams.USER_ADDRESS],
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        value: TEST_ADDRESS,
      },
      standardContractType: '',
    },
    { operator: 'or' },
    {
      conditionType: LitConditionType.EVM_BASIC,
      chain: SupportedChains.ETHEREUM,
      contractAddress: TEST_ADDRESS,
      method: 'balanceOf',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: LitScalarOperator.GREATER_THAN,
        value: '0',
      },
      standardContractType: ContractType.Erc721,
    },
  ];
  it('should create a lit condition successfully', async () => {
    expect(await transformOrCondition(OR_INPUT, api.env)).toEqual(OR_EXPECTED);
    expect(await transform({ or: OR_INPUT }, api.env)).toEqual(OR_EXPECTED);
  });
  it('should create a nested lit condition successfully', async () => {
    const OR_NESTED_INPUT_1 = {
      criteria: [
        {
          and: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
        {
          profile: {
            profileId,
          },
        },
      ],
    };
    const OR_NESTED_INPUT_2 = {
      criteria: [
        {
          and: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
        {
          and: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
      ],
    };
    const OR_NESTED_EXPECTED_1 = [
      [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.IS_FOLLOWING,
          functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0', '0x'],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'profileId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'followerProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.IS_FOLLOWING,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
        { operator: 'and' },
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.HAS_COLLECTED,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            profileIdDecimal,
            profileIdDecimal,
            '0',
            '0x',
          ],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'publisherId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pubId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'collectorProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.HAS_COLLECTED,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
      ],
      { operator: 'or' },
      {
        conditionType: 'evmContract',
        contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
        chain: 'mumbai',
        functionName: 'hasAccess',
        functionParams: [':userAddress', '1', '0x'],
        functionAbi: {
          constant: true,
          inputs: [
            {
              internalType: 'address',
              name: 'requestorAddress',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'profileId',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'hasAccess',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        returnValueTest: {
          key: '',
          comparator: '=',
          value: 'true',
        },
      },
    ];
    const OR_NESTED_EXPECTED_2 = [
      [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.IS_FOLLOWING,
          functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0', '0x'],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'profileId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'followerProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.IS_FOLLOWING,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
        { operator: 'and' },
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.HAS_COLLECTED,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            profileIdDecimal,
            profileIdDecimal,
            '0',
            '0x',
          ],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'publisherId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pubId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'collectorProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.HAS_COLLECTED,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
      ],
      { operator: 'or' },
      [
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.IS_FOLLOWING,
          functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0', '0x'],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'profileId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'followerProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.IS_FOLLOWING,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
        { operator: 'and' },
        {
          conditionType: LitConditionType.EVM_CONTRACT,
          chain: SupportedChains.MUMBAI,
          contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
          functionName: LitKnownMethods.HAS_COLLECTED,
          functionParams: [
            LitKnownParams.USER_ADDRESS,
            profileIdDecimal,
            profileIdDecimal,
            '0',
            '0x',
          ],
          functionAbi: {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'requestorAddress',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'publisherId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pubId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'collectorProfileId',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
            ],
            name: LitKnownMethods.HAS_COLLECTED,
            outputs: [
              {
                internalType: 'bool',
                name: '',
                type: 'bool',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          returnValueTest: {
            comparator: LitScalarOperator.EQUAL,
            key: '',
            value: 'true',
          },
        },
      ],
    ];
    expect(await transformOrCondition(OR_NESTED_INPUT_1, apiSandbox.env)).toEqual(
      OR_NESTED_EXPECTED_1
    );
    expect(await transform({ or: OR_NESTED_INPUT_1 }, apiSandbox.env)).toEqual(
      OR_NESTED_EXPECTED_1
    );
    expect(await transformOrCondition(OR_NESTED_INPUT_2, apiSandbox.env)).toEqual(
      OR_NESTED_EXPECTED_2
    );
    expect(await transform({ or: OR_NESTED_INPUT_2 }, apiSandbox.env)).toEqual(
      OR_NESTED_EXPECTED_2
    );
  });
  it('should validate a lit condition with nullables and typename successfully', async () => {
    const OR_INPUT_NULLABLES = {
      __typename: 'OrConditionOutput',
      criteria: [
        {
          __typename: 'AccessConditionOutput',
          nft: null,
          profile: {
            __typename: 'ProfileOwnershipOutput',
            profileId: '0x28a2',
          },
        },
        {
          __typename: 'AccessConditionOutput',
          nft: {
            __typename: 'NftOwnershipOutput',
            contractAddress: '0x25ed58c027921E14D86380eA2646E3a1B5C55A8b',
            chainID: 1,
            contractType: 'ERC721',
          },
          profile: null,
        },
      ],
    };
    const OR_EXPECTED_NULLABLES = [
      {
        chain: 'mumbai',
        conditionType: 'evmContract',
        contractAddress: '0x8fc44e306CCc61D7ab20Cf743247cfa330ac35bF',
        functionAbi: {
          constant: true,
          inputs: [
            {
              internalType: 'address',
              name: 'requestorAddress',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'profileId',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'hasAccess',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        functionName: 'hasAccess',
        functionParams: [':userAddress', '10402', '0x'],
        returnValueTest: {
          comparator: '=',
          key: '',
          value: 'true',
        },
      },
      {
        operator: 'or',
      },
      {
        chain: 'ethereum',
        conditionType: 'evmBasic',
        contractAddress: '0x25ed58c027921e14d86380ea2646e3a1b5c55a8b',
        method: 'balanceOf',
        parameters: [':userAddress'],
        returnValueTest: {
          comparator: '>',
          value: '0',
        },
        standardContractType: 'ERC721',
      },
    ];
    // @ts-ignore
    expect(await transformOrCondition(OR_INPUT_NULLABLES, api.env)).toEqual(OR_EXPECTED_NULLABLES);
    // @ts-ignore
    expect(await transform({ or: OR_INPUT_NULLABLES }, api.env)).toEqual(OR_EXPECTED_NULLABLES);
    expect(
      await transform(
        {
          __typename: 'AccessConditionOutput',
          // @ts-ignore
          or: OR_INPUT_NULLABLES,
        },
        api.env
      )
    ).toEqual(OR_EXPECTED_NULLABLES);
  });
  it('should not allow less than 2 criteria', async () => {
    const OR_1_CRITERIA: OrConditionOutput = {
      criteria: [
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
      ],
    };
    expect(() => validateOrCondition(OR_1_CRITERIA, true)).toThrow();
    expect(() => validateOrCondition(OR_1_CRITERIA, false)).toThrow();
  });
  it('should not allow more than 5 criteria', async () => {
    const OR_6_CRITERIA: OrConditionOutput = {
      criteria: [
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
      ],
    };
    expect(() => validateOrCondition(OR_6_CRITERIA, true)).toThrow();
    expect(() => validateOrCondition(OR_6_CRITERIA, false)).toThrow();
  });
  it('should not allow more than 1 level of nested criteria', async () => {
    const OR_NESTED: OrConditionOutput = {
      criteria: [
        {
          or: {
            criteria: [
              {
                eoa: {
                  address: TEST_ADDRESS,
                },
              },
              {
                eoa: {
                  address: TEST_ADDRESS,
                },
              },
            ],
          },
        },
        {
          eoa: {
            address: TEST_ADDRESS,
          },
        },
      ],
    };
    expect(() => validateOrCondition(OR_NESTED, true)).not.toThrow();
    expect(() => validateOrCondition(OR_NESTED, false)).toThrow();
  });
  it('should not allow nested lit with only one criteria', async () => {
    const OR_NESTED_INPUT_ONE_CRITERIA = {
      criteria: [
        {
          or: {
            criteria: [
              {
                follow: {
                  profileId,
                },
              },
              {
                collect: {
                  publicationId: '0x01-0x01',
                },
              },
            ],
          },
        },
      ],
    };
    expect(() => validateBooleanCondition(OR_NESTED_INPUT_ONE_CRITERIA, true)).toThrow();
    expect(() => validateBooleanCondition(OR_NESTED_INPUT_ONE_CRITERIA, false)).toThrow();
  });
});

describe('profile', () => {
  const PROFILE_INPUT = {
    profileId,
  };
  const PROFILE_EXPECTED = [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      chain: SupportedChains.MUMBAI,
      contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
      functionName: LitKnownMethods.HAS_ACCESS,
      functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0x'],
      functionAbi: {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: 'requestorAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'profileId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'hasAccess',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        key: '',
        value: 'true',
      },
    },
  ];
  it('should create a lit condition for sandbox successfully', async () => {
    expect(transformProfileCondition(PROFILE_INPUT, LensEnvironment.MumbaiSandbox)).toEqual(
      PROFILE_EXPECTED
    );
    expect(await transform({ profile: PROFILE_INPUT }, apiSandbox.env)).toEqual(PROFILE_EXPECTED);
  });
});

describe('follow', () => {
  const FOLLOW_INPUT = {
    profileId,
  };
  const FOLLOW_EXPECTED = [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      chain: SupportedChains.MUMBAI,
      contractAddress: '0xcc44c4e8066fFA4acfb619A82dCF918263045c87',
      functionName: LitKnownMethods.IS_FOLLOWING,
      functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '0', '0x'],
      functionAbi: {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: 'requestorAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'profileId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'followerProfileId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: LitKnownMethods.IS_FOLLOWING,
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        key: '',
        value: 'true',
      },
    },
  ];
  it('should create a lit condition for sandbox successfully', async () => {
    expect(transformFollowCondition(FOLLOW_INPUT, LensEnvironment.MumbaiSandbox)).toEqual(
      FOLLOW_EXPECTED
    );
    expect(await transform({ follow: FOLLOW_INPUT }, apiSandbox.env)).toEqual(FOLLOW_EXPECTED);
  });
});

describe('collect', () => {
  const COLLECT_INPUT = {
    publicationId: `${profileId}-${profileId}`,
  };
  const COLLECT_INPUT_INVALID = {
    publicationId: `${profileId}-${profileId}`,
    thisPublication: true,
  };
  const COLLECT_INPUT_THIS_PUBLICATION = {
    thisPublication: true,
  };
  const COLLECT_EXPECTED = [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      chain: SupportedChains.MUMBAI,
      contractAddress: '0x8fc44e306CCc61D7ab20Cf743247cfa330ac35bF',
      functionName: LitKnownMethods.HAS_COLLECTED,
      functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, profileIdDecimal, '0', '0x'],
      functionAbi: {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: 'requestorAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'publisherId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pubId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'collectorProfileId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: LitKnownMethods.HAS_COLLECTED,
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        key: '',
        value: 'true',
      },
    },
  ];
  const COLLECT_EXPECTED_THIS_PUBLICATION = [
    {
      conditionType: LitConditionType.EVM_CONTRACT,
      chain: SupportedChains.MUMBAI,
      contractAddress: '0x8fc44e306CCc61D7ab20Cf743247cfa330ac35bF',
      functionName: LitKnownMethods.HAS_COLLECTED,
      functionParams: [LitKnownParams.USER_ADDRESS, profileIdDecimal, '2', '0', '0x'],
      functionAbi: {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: 'requestorAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'publisherId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pubId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'collectorProfileId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: LitKnownMethods.HAS_COLLECTED,
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      returnValueTest: {
        comparator: LitScalarOperator.EQUAL,
        key: '',
        value: 'true',
      },
    },
  ];
  it('should not create a collect condition with invalid input', async () => {
    await expect(transformCollectCondition(COLLECT_INPUT_INVALID, api.env)).rejects.toThrow(
      'Invalid input: "transformer should not be called until the collect condition has been converted to a named publication id"!'
    );
  });
  it('should create a collect condition with publication id successfully', async () => {
    expect(await transformCollectCondition(COLLECT_INPUT, api.env)).toEqual(COLLECT_EXPECTED);
    expect(await transform({ collect: COLLECT_INPUT }, api.env)).toEqual(COLLECT_EXPECTED);
  });
  it('should not create a collect condition with thisPublication successfully', async () => {
    await expect(
      transformCollectCondition(COLLECT_INPUT_THIS_PUBLICATION, api.env)
    ).rejects.toThrow(
      'Invalid input: "transformer should not be called until the collect condition has been converted to a named publication id"!'
    );
    await expect(transform({ collect: COLLECT_INPUT_THIS_PUBLICATION }, api.env)).rejects.toThrow(
      'Invalid input: "transformer should not be called until the collect condition has been converted to a named publication id"!'
    );
  });
});
