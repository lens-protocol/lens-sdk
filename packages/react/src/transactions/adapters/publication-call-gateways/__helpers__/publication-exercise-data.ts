import { faker } from '@faker-js/faker';
import {
  CollectModuleParams,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataV2Input,
  ReferenceModuleParams,
} from '@lens-protocol/api-bindings';
import {
  mockDateNftAttribute,
  mockFreeCollectPolicy,
  mockMedia,
  mockNftMetadata,
  mockStringNftAttribute,
  mockNumberNftAttribute,
  mockNoCollectPolicy,
  mockChargeCollectPolicy,
} from '@lens-protocol/domain/mocks';
import {
  CollectPolicy,
  ContentFocus,
  Media,
  ReferencePolicyConfig,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';

export type PublicationExerciseData = {
  requestVars: {
    content?: string;
    media?: Media[];
    contentFocus?: ContentFocus;
    locale?: string;
    reference?: ReferencePolicyConfig;
    collect?: CollectPolicy;
  };
  expectedMetadata: Partial<Omit<PublicationMetadataV2Input, 'metadata_id' | 'version'>>;
  expectedMutationRequestDetails: {
    collectModule: CollectModuleParams;
    referenceModule?: ReferenceModuleParams;
  };
};

export const createBasicExerciseData = (): PublicationExerciseData => {
  const content = faker.lorem.sentence();
  const media = [mockMedia()];
  const metadata = mockNftMetadata({
    description: faker.lorem.sentence(),
  });
  const locale = 'en';
  const contentFocus = ContentFocus.TEXT;

  return {
    requestVars: {
      content,
      media,
      contentFocus,
      locale,
      collect: mockFreeCollectPolicy({ metadata }),
    },
    expectedMetadata: {
      attributes: [],
      content: content,
      description: metadata.description,
      media: media.map((m) => ({ type: m.mimeType, item: m.url })),
      name: metadata.name,
      locale: locale,
      mainContentFocus: PublicationMainFocus[contentFocus],
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

export const createSupportedNFTAttributesExerciseData = (): PublicationExerciseData => {
  const content = faker.lorem.sentence();
  const dateNftAttribute = mockDateNftAttribute();
  const numberNftAttribute = mockNumberNftAttribute();
  const stringNftAttribute = mockStringNftAttribute();
  const metadata = mockNftMetadata({
    attributes: [dateNftAttribute, numberNftAttribute, stringNftAttribute],
  });
  return {
    requestVars: {
      content,
      collect: mockFreeCollectPolicy({ metadata }),
    },
    expectedMetadata: {
      attributes: [
        {
          displayType: PublicationMetadataDisplayTypes[dateNftAttribute.displayType],
          traitType: dateNftAttribute.traitType,
          value: dateNftAttribute.value.toString(),
        },
        {
          displayType: PublicationMetadataDisplayTypes[numberNftAttribute.displayType],
          traitType: numberNftAttribute.traitType,
          value: numberNftAttribute.value.toString(),
        },
        {
          displayType: PublicationMetadataDisplayTypes[stringNftAttribute.displayType],
          traitType: stringNftAttribute.traitType,
          value: stringNftAttribute.value.toString(),
        },
      ],
      name: metadata.name,
      content,
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

export const createFollowerOnlyReferenceModuleExerciseData = (): PublicationExerciseData => {
  const content = faker.lorem.sentence();

  return {
    requestVars: {
      content,
      collect: mockNoCollectPolicy(),
      reference: {
        type: ReferencePolicyType.FOLLOWERS_ONLY,
      },
    },
    expectedMetadata: {
      content,
      name: 'none',
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
  const content = faker.lorem.sentence();
  return {
    requestVars: {
      content,
      collect: mockNoCollectPolicy(),
    },
    expectedMetadata: { content },
    expectedMutationRequestDetails: {
      collectModule: {
        revertCollectModule: true,
      },
    },
  };
};

export const createFreeCollectModuleExerciseData = (): PublicationExerciseData => {
  const content = faker.lorem.sentence();
  const metadata = mockNftMetadata();
  return {
    requestVars: {
      content,
      collect: mockFreeCollectPolicy({
        followersOnly: false,
        metadata,
      }),
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: metadata.name,
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
  const content = faker.lorem.sentence();
  const metadata = mockNftMetadata();
  return {
    requestVars: {
      content,
      collect: mockFreeCollectPolicy({
        followersOnly: true,
        metadata,
      }),
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: metadata.name,
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
  const content = faker.lorem.sentence();
  const collect = mockChargeCollectPolicy({ followersOnly: false });
  return {
    requestVars: {
      content,
      collect,
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: collect.metadata.name,
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
  const content = faker.lorem.sentence();
  const collect = mockChargeCollectPolicy({ followersOnly: true });
  return {
    requestVars: {
      content,
      collect,
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: collect.metadata.name,
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
  const content = faker.lorem.sentence();
  const collectLimit = faker.datatype.number(10_000);
  const collect = mockChargeCollectPolicy({ followersOnly: false, collectLimit });
  return {
    requestVars: {
      content,
      collect,
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: collect.metadata.name,
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
    const content = faker.lorem.sentence();
    const collectLimit = faker.datatype.number(10_000);
    const collect = mockChargeCollectPolicy({ followersOnly: true, collectLimit });
    return {
      requestVars: {
        content,
        collect,
      },
      expectedMetadata: {
        attributes: [],
        content,
        name: collect.metadata.name,
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
  const content = faker.lorem.sentence();
  const collect = mockChargeCollectPolicy({ followersOnly: false, timeLimited: true });
  return {
    requestVars: {
      content,
      collect,
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: collect.metadata.name,
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
  const content = faker.lorem.sentence();
  const collect = mockChargeCollectPolicy({ followersOnly: true, timeLimited: true });
  return {
    requestVars: {
      content,
      collect,
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: collect.metadata.name,
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
  const content = faker.lorem.sentence();
  const collectLimit = faker.datatype.number(10_000);
  const collect = mockChargeCollectPolicy({
    followersOnly: false,
    collectLimit,
    timeLimited: true,
  });
  return {
    requestVars: {
      content,
      collect,
    },
    expectedMetadata: {
      attributes: [],
      content,
      name: collect.metadata.name,
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
    const content = faker.lorem.sentence();
    const collectLimit = faker.datatype.number(10_000);
    const collect = mockChargeCollectPolicy({
      followersOnly: true,
      collectLimit,
      timeLimited: true,
    });
    return {
      requestVars: {
        content,
        collect,
      },
      expectedMetadata: {
        attributes: [],
        content,
        name: collect.metadata.name,
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
