import { chains } from '@lens-chain/sdk/viem';
import { evmAddress } from '@lens-protocol/types';
import { privateKeyToAccount } from 'viem/accounts';
import { describe, expect, it } from 'vitest';

import { OperationType } from '../authorization';
import { OperationApprovalSigner } from './authorization';

const privateKey = '0xa7d25f98c7996df6418d5205d03386b254451d45de060dcd4c7f486d9c12061e';
const appAddress = evmAddress('0x3a24d26AdEBA0d6330F207d0ca699cBE5fFbE553');
const accountAddress = '0xbca85dda68cC21B98F6a416c28F9de94C4cBdcB9';
const lensPrimitive = '0x07753ab956B70498196772E8421379DB12de54eb';

describe(
  `Given an instance of the '${OperationApprovalSigner.name}' for viem`,
  { timeout: 10000 },
  () => {
    describe('When signing an OperationApprovalRequest', () => {
      it('Then it should return the expected signature', async () => {
        const approver = new OperationApprovalSigner({
          app: appAddress,
          chain: chains.testnet,
          signer: privateKeyToAccount(privateKey),
        });

        const signature = await approver.signOperationApproval({
          nonce: '42',
          deadline: '1630000000',
          operation: OperationType.Post,
          validator: lensPrimitive,
          account: accountAddress,
        });

        expect(signature).toEqual(
          '0xc0dc1300e351b79ba63b17581c5d5dd914ed2d6ddcd7cd4476b3930c199fd75807adc8c989db3da1af0ceb66689d0d3954f7180a81cfcb3e77af1bdcb6508d111c',
        );
      });
    });
  },
);
