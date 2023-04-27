import { faker } from '@faker-js/faker';
import { CollectModuleParams, ReferenceModuleParams } from '@lens-protocol/api-bindings';
import {
  mockFreeCollectPolicyConfig,
  mockNoCollectPolicyConfig,
  mockChargeCollectPolicyConfig,
} from '@lens-protocol/domain/mocks';
import {
  CollectPolicyConfig,
  ReferencePolicyConfig,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';

export type PublicationExerciseData = {
  requestVars: {
    reference?: ReferencePolicyConfig;
    collect?: CollectPolicyConfig;
  };
  expectedMutationRequestDetails: {
    collectModule: CollectModuleParams;
    referenceModule?: ReferenceModuleParams;
  };
};

export const createFollowerOnlyReferenceModuleExerciseData = (): PublicationExerciseData => {
  return {
    requestVars: {
      collect: mockNoCollectPolicyConfig(),
      reference: {
        type: ReferencePolicyType.FOLLOWERS_ONLY,
      },
    },

    expectedMutationRequestDetails: {
      collectModule: {
        revertCollectModule: true,
      },
      referenceModule: {
        followerOnlyReferenceModule: true,
      },
    },
  };
};

export const createRevertCollectModuleExerciseData = (): PublicationExerciseData => {
  return {
    requestVars: {
      collect: mockNoCollectPolicyConfig(),
    },

    expectedMutationRequestDetails: {
      collectModule: {
        revertCollectModule: true,
      },
    },
  };
};

export const createFreeCollectModuleExerciseData = (): PublicationExerciseData => {
  return {
    requestVars: {
      collect: mockFreeCollectPolicyConfig({
        followersOnly: false,
      }),
    },

    expectedMutationRequestDetails: {
      collectModule: {
        freeCollectModule: {
          followerOnly: false,
        },
      },
    },
  };
};

export const createFreeCollectModuleFollowersOnlyExerciseData = (): PublicationExerciseData => {
  return {
    requestVars: {
      collect: mockFreeCollectPolicyConfig({
        followersOnly: true,
      }),
    },

    expectedMutationRequestDetails: {
      collectModule: {
        freeCollectModule: {
          followerOnly: true,
        },
      },
    },
  };
};

export const createFeeCollectModuleExerciseData = (): PublicationExerciseData => {
  const collect = mockChargeCollectPolicyConfig({ followersOnly: false });
  return {
    requestVars: {
      collect,
    },

    expectedMutationRequestDetails: {
      collectModule: {
        feeCollectModule: {
          amount: {
            currency: collect.fee.asset.address,
            value: collect.fee.toSignificantDigits(),
          },
          followerOnly: false,
          recipient: collect.recipient,
          referralFee: collect.mirrorReward,
        },
      },
    },
  };
};

export const createFeeCollectModuleFollowersOnlyExerciseData = (): PublicationExerciseData => {
  const collect = mockChargeCollectPolicyConfig({ followersOnly: true });
  return {
    requestVars: {
      collect,
    },

    expectedMutationRequestDetails: {
      collectModule: {
        feeCollectModule: {
          amount: {
            currency: collect.fee.asset.address,
            value: collect.fee.toSignificantDigits(),
          },
          followerOnly: true,
          recipient: collect.recipient,
          referralFee: collect.mirrorReward,
        },
      },
    },
  };
};

export const createLimitedFeeCollectModuleExerciseData = (): PublicationExerciseData => {
  const collectLimit = faker.datatype.number(10_000);
  const collect = mockChargeCollectPolicyConfig({ followersOnly: false, collectLimit });
  return {
    requestVars: {
      collect,
    },

    expectedMutationRequestDetails: {
      collectModule: {
        limitedFeeCollectModule: {
          amount: {
            currency: collect.fee.asset.address,
            value: collect.fee.toSignificantDigits(),
          },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          collectLimit: collect.collectLimit!.toString(),
          followerOnly: false,
          recipient: collect.recipient,
          referralFee: collect.mirrorReward,
        },
      },
    },
  };
};

export const createLimitedFeeCollectModuleFollowersOnlyExerciseData =
  (): PublicationExerciseData => {
    const collectLimit = faker.datatype.number(10_000);
    const collect = mockChargeCollectPolicyConfig({ followersOnly: true, collectLimit });
    return {
      requestVars: {
        collect,
      },

      expectedMutationRequestDetails: {
        collectModule: {
          limitedFeeCollectModule: {
            amount: {
              currency: collect.fee.asset.address,
              value: collect.fee.toSignificantDigits(),
            },
            collectLimit: collectLimit.toString(),
            followerOnly: true,
            recipient: collect.recipient,
            referralFee: collect.mirrorReward,
          },
        },
      },
    };
  };

export const createTimedFeeCollectModuleExerciseData = (): PublicationExerciseData => {
  const collect = mockChargeCollectPolicyConfig({ followersOnly: false, timeLimited: true });
  return {
    requestVars: {
      collect,
    },

    expectedMutationRequestDetails: {
      collectModule: {
        timedFeeCollectModule: {
          amount: {
            currency: collect.fee.asset.address,
            value: collect.fee.toSignificantDigits(),
          },
          followerOnly: false,
          recipient: collect.recipient,
          referralFee: collect.mirrorReward,
        },
      },
    },
  };
};

export const createTimedFeeCollectModuleFollowersOnlyExerciseData = (): PublicationExerciseData => {
  const collect = mockChargeCollectPolicyConfig({ followersOnly: true, timeLimited: true });
  return {
    requestVars: {
      collect,
    },

    expectedMutationRequestDetails: {
      collectModule: {
        timedFeeCollectModule: {
          amount: {
            currency: collect.fee.asset.address,
            value: collect.fee.toSignificantDigits(),
          },
          followerOnly: true,
          recipient: collect.recipient,
          referralFee: collect.mirrorReward,
        },
      },
    },
  };
};

export const createLimitedTimedFeeCollectModuleExerciseData = (): PublicationExerciseData => {
  const collectLimit = faker.datatype.number(10_000);
  const collect = mockChargeCollectPolicyConfig({
    followersOnly: false,
    collectLimit,
    timeLimited: true,
  });
  return {
    requestVars: {
      collect,
    },

    expectedMutationRequestDetails: {
      collectModule: {
        limitedTimedFeeCollectModule: {
          amount: {
            currency: collect.fee.asset.address,
            value: collect.fee.toSignificantDigits(),
          },
          collectLimit: collectLimit.toString(),
          followerOnly: false,
          recipient: collect.recipient,
          referralFee: collect.mirrorReward,
        },
      },
    },
  };
};

export const createLimitedTimedFeeCollectModuleFollowersOnlyExerciseData =
  (): PublicationExerciseData => {
    const collectLimit = faker.datatype.number(10_000);
    const collect = mockChargeCollectPolicyConfig({
      followersOnly: true,
      collectLimit,
      timeLimited: true,
    });
    return {
      requestVars: {
        collect,
      },

      expectedMutationRequestDetails: {
        collectModule: {
          limitedTimedFeeCollectModule: {
            amount: {
              currency: collect.fee.asset.address,
              value: collect.fee.toSignificantDigits(),
            },
            collectLimit: collectLimit.toString(),
            followerOnly: true,
            recipient: collect.recipient,
            referralFee: collect.mirrorReward,
          },
        },
      },
    };
  };
