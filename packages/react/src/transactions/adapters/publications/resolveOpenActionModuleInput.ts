import { AddressZero } from '@ethersproject/constants';
import { OpenActionModuleInput } from '@lens-protocol/api-bindings';
import { OpenActionConfig, OpenActionType } from '@lens-protocol/domain/use-cases/publications';

export function resolveOpenActionModuleInput(config: OpenActionConfig): OpenActionModuleInput {
  switch (config.type) {
    case OpenActionType.SIMPLE_COLLECT:
      return {
        collectOpenAction: {
          simpleCollectOpenAction: {
            ...(config.amount && {
              amount: {
                currency: config.amount.asset.address,
                value: config.amount.toSignificantDigits(),
              },

              referralFee: config.referralFee,

              recipient: config.recipient ?? AddressZero,
            }),

            collectLimit: config.collectLimit?.toString() ?? null,

            endsAt: config.endsAt?.toISOString() ?? null,

            followerOnly: config.followerOnly,
          },
        },
      };

    case OpenActionType.MULTIRECIPIENT_COLLECT:
      return {
        collectOpenAction: {
          multirecipientCollectOpenAction: {
            ...(config.amount && {
              amount: {
                currency: config.amount.asset.address,
                value: config.amount.toSignificantDigits(),
              },

              referralFee: config.referralFee,

              recipients: config.recipients.map(({ recipient, split }) => ({
                recipient,
                split,
              })),
            }),

            collectLimit: config.collectLimit?.toString() ?? null,

            endsAt: config.endsAt?.toISOString() ?? null,

            followerOnly: config.followerOnly,
          },
        },
      };

    case OpenActionType.UNKNOWN_OPEN_ACTION:
      return {
        unknownOpenAction: {
          address: config.address,
          data: config.data,
        },
      };
  }
}
