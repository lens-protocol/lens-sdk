import type { PromiseResult } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import type { LensConfig } from '../consts/config';
import type { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { FetchGraphQLClient } from '../graphql/FetchGraphQLClient';
import type {
  CommentFragment,
  CreateDataAvailabilityPublicationResultFragment,
  PostFragment,
  RelayerResultFragment,
  RelayErrorFragment,
  WalletFragment,
} from '../graphql/fragments.generated';
import type { PublicationFragment } from '../graphql/types';
import type {
  CreateCollectRequest,
  CreateDataAvailabilityCommentRequest,
  CreateDataAvailabilityMirrorRequest,
  CreateDataAvailabilityPostRequest,
  CreateMirrorRequest,
  CreatePublicCommentRequest,
  CreatePublicPostRequest,
  GetPublicationMetadataStatusRequest,
  HidePublicationRequest,
  ProfilePublicationsForSaleRequest,
  PublicationMetadataStatus,
  PublicationMetadataV2Input,
  PublicationQueryRequest,
  PublicationsQueryRequest,
  PublicationValidateMetadataResult,
  PublicMediaRequest,
  ReportPublicationRequest,
  TypedDataOptions,
  WhoCollectedPublicationRequest,
} from '../graphql/types.generated';
import {
  buildPaginatedQueryResult,
  PaginatedResult,
  provideAuthHeaders,
  requireAuthHeaders,
} from '../helpers';
import {
  CreateCollectTypedDataFragment,
  CreateCommentTypedDataFragment,
  CreateMirrorTypedDataFragment,
  CreatePostTypedDataFragment,
  getSdk,
  PublicationStatsFragment,
  PublicMediaResultsFragment,
  Sdk,
} from './graphql/publication.generated';

/**
 * Publications are the posts, comments and mirrors that a profile creates.
 *
 * @remarks
 *
 * Make sure you understand the metadata standards that are set
 * for publications. If a publication does not conform to these
 * standards it will not be indexed by the Lens API.
 * These are the guidelines set for the API. The Lens Protocol itself
 * does not validate these guidelines. Building a standard allows
 * compatibility for all kinds of projects, so we advise following
 * the standards.
 *
 * @group LensClient Modules
 */
export class Publication {
  private readonly authentication: Authentication | undefined;
  private readonly sdk: Sdk;

  constructor(config: LensConfig, authentication?: Authentication) {
    const client = new FetchGraphQLClient(config.environment.gqlEndpoint);

    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Fetch a publication
   *
   * @param request - Request object for the query
   * @returns Publication or null if not found
   *
   * @example
   * ```ts
   * const result = await client.publication.fetch({
   *   publicationId: '0x123',
   * });
   * ```
   */
  async fetch(
    request: PublicationQueryRequest,
    observerId?: string,
  ): Promise<PublicationFragment | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.Publication(
        {
          request,
          observerId,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Fetch a publication's stats
   *
   * Returns global stats for a publication, like total amount of
   * mirrors, collects, comments, upvotes and downvotes, as well
   * as `appId` specific stats, like comments (if `sources` provided).
   *
   * @param request - Request object for the query
   * @param sources - Required to calculate stats specific to provided appIds
   * @returns Publication stats or undefined if not found
   *
   * @example
   * ```ts
   * const result = await client.publication.stats({ publicationId: '0x123' }, ['lenster']);
   * ```
   */
  async stats(
    request: PublicationQueryRequest,
    sources: string[],
  ): Promise<PublicationStatsFragment | undefined> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.PublicationStats(
        {
          request,
          sources,
        },
        headers,
      );

      return result.data.result?.stats;
    });
  }

  /**
   * Validate a publication's metadata before creating it
   *
   * @param metadata - Metadata to validate
   * @returns Validation result
   *
   * @example
   * ```ts
   * const result = await client.publication.validateMetadata(metadata);
   *
   * if (!result.valid) {
   *   throw new Error(`Metadata is not valid.`);
   * }
   * ```
   */
  async validateMetadata(
    metadata: PublicationMetadataV2Input,
  ): Promise<PublicationValidateMetadataResult> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.ValidatePublicationMetadata({ metadata }, headers);

      return result.data.validatePublicationMetadata;
    });
  }

  /**
   * Check the status of a publication's metadata.
   * Helps to debug why a publication has not been indexed by Lens API.
   *
   * @param request - Request object for the query
   * @returns Status of the publication's metadata
   *
   * @example
   * ```ts
   * const result = await client.publication.metadataStatus({
   *   publicationId: '0x123-0x456',
   * });
   * ```
   */
  async metadataStatus(
    request: GetPublicationMetadataStatusRequest,
  ): Promise<PublicationMetadataStatus | null> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.PublicationMetadataStatus({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Fetch all publications by requested criteria
   *
   * @param request - Request object for the query
   * @returns Publications wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.publication.fetchAll({
   *   profileId: '0x123',
   * });
   * ```
   */
  async fetchAll(
    request: PublicationsQueryRequest,
    observerId?: string,
  ): Promise<PaginatedResult<PublicationFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.Publications(
          {
            request: currRequest,
            observerId,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  /**
   * Fetch all wallets that collected a publication
   *
   * @param request - Request object for the query
   * @returns Wallets wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.publication.allWalletsWhoCollected({
   *   publicationId: '0x123-0x456',
   * });
   * ```
   */
  async allWalletsWhoCollected(
    request: WhoCollectedPublicationRequest,
    observerId?: string,
  ): Promise<PaginatedResult<WalletFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.WhoCollectedPublication(
          {
            request: currRequest,
            observerId,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  /**
   * Fetch all publications for sale by requested criteria
   *
   * @param request - Request object for the query
   * @returns Publications wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.publication.allForSale({
   *   profileId: '0x123',
   * });
   * ```
   */
  async allForSale(
    request: ProfilePublicationsForSaleRequest,
    observerId?: string,
  ): Promise<PaginatedResult<CommentFragment | PostFragment>> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      return buildPaginatedQueryResult(async (currRequest) => {
        const result = await this.sdk.ProfilePublicationsForSale(
          {
            request: currRequest,
            observerId,
          },
          headers,
        );

        return result.data.result;
      }, request);
    });
  }

  /**
   * Create typed data for creating a post.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for creating a post
   *
   * @example
   * ```ts
   * const result = await client.publication.createPostTypedData({
   *   profileId: '0x123',
   *   contentURI: 'ipfs://Qm...', // or arweave
   *   collectModule: {
   *     revertCollectModule: true, // collect disabled
   *   },
   *   referenceModule: {
   *     followerOnlyReferenceModule: false, // anybody can comment or mirror
   *   },
   * });
   * ```
   */
  async createPostTypedData(
    request: CreatePublicPostRequest,
    options?: TypedDataOptions,
  ): PromiseResult<CreatePostTypedDataFragment, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreatePostTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Create a post using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.publication.createPostViaDispatcher({
   *   profileId: '0x123',
   *   contentURI: 'ipfs://Qm...', // or arweave
   *   collectModule: {
   *     revertCollectModule: true, // collect disabled
   *   },
   *   referenceModule: {
   *     followerOnlyReferenceModule: false, // anybody can comment or mirror
   *   },
   * });
   * ```
   */
  async createPostViaDispatcher(
    request: CreatePublicPostRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreatePostViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Create typed data for creating a comment.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for creating a comment
   *
   * @example
   * ```ts
   * const result = await client.publication.createCommentTypedData({
   *   profileId: '0x123',
   *   publicationId: '0x123-0x456',
   *   contentURI: 'ipfs://Qm...', // or arweave
   *   collectModule: {
   *     revertCollectModule: true, // collect disabled
   *   },
   *   referenceModule: {
   *     followerOnlyReferenceModule: false, // anybody can comment or mirror
   *   },
   * });
   * ```
   */
  async createCommentTypedData(
    request: CreatePublicCommentRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateCommentTypedDataFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateCommentTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Create a comment using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.publication.createCommentViaDispatcher({
   *   profileId: '0x123',
   *   publicationId: '0x123-0x456',
   *   contentURI: 'ipfs://Qm...', // or arweave
   *   collectModule: {
   *     revertCollectModule: true, // collect disabled
   *   },
   *   referenceModule: {
   *     followerOnlyReferenceModule: false, // anybody can comment or mirror
   *   },
   * });
   * ```
   */
  async createCommentViaDispatcher(
    request: CreatePublicCommentRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateCommentViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Create typed data for creating a mirror.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for creating a mirror
   *
   * @example
   * ```ts
   * const result = await client.publication.createMirrorTypedData({
   *   profileId: '0x123',
   *   publicationId: '0x123-0x456',
   *   referenceModule: {
   *     followerOnlyReferenceModule: false, // anybody can comment or mirror
   *   },
   * });
   * ```
   */
  async createMirrorTypedData(
    request: CreateMirrorRequest,
    options?: TypedDataOptions,
  ): PromiseResult<CreateMirrorTypedDataFragment, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMirrorTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Create a mirror using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.publication.createMirrorViaDispatcher({
   *   profileId: '0x123',
   *   publicationId: '0x123-0x456',
   *   referenceModule: {
   *     followerOnlyReferenceModule: false, // anybody can comment or mirror
   *   },
   * });
   * ```
   */
  async createMirrorViaDispatcher(
    request: CreateMirrorRequest,
  ): PromiseResult<
    RelayerResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateMirrorViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Create typed data for collecting a publication or a comment.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @param options - Configure returned typed data
   * @returns Typed data for collecting a publication or a comment
   *
   * @example
   * ```ts
   * const result = await client.publication.createCollectTypedData({
   *   publicationId: '0x123-0x456',
   * });
   * ```
   */
  async createCollectTypedData(
    request: CreateCollectRequest,
    options?: TypedDataOptions,
  ): PromiseResult<
    CreateCollectTypedDataFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateCollectTypedData(
        {
          request,
          options,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Media endpoint allows to upload AUDIO and VIDEO directly to the Lens API
   * without using IPFS or a storage provider. It will create a copy of the
   * file in Lens API cache and streaming system before pinning it to
   * the decentralised IPFS.
   *
   * @param request - Request object for the mutation
   *
   * | name    | type     | desc                                                                                |
   * | :------ | :------- | :---------------------------------------------------------------------------------- |
   * | itemCid | IpfsCid  | You need to precalculate the CID of the file before upload it with the presignedURL |
   * | type    | MimeType | Mime type of the file to upload                                                     |
   * | altTag  | String   | Alternative text to show on the embed object                                        |
   * | cover   | Url      | Url cover image                                                                     |
   *
   * @returns Signed url for uploading the media together with media data
   *
   * @example
   * ```ts
   * const result = await client.publication.createAttachMediaData({
   *   itemCid: 'QmTAznyH583xUgEyY5zdrPB2LSGY7FUBPDddWKj58GmBgp',
   *   type: 'video/mp4',
   *   altTag: 'Video alt tag',
   *   cover: 'ifps://QmVwvsJrFzAAb1fPe5uXF4QpPib1T6gjc3xLpS96BUsTL6'
   * });
   * ```
   */
  async createAttachMediaData(request: PublicMediaRequest): Promise<PublicMediaResultsFragment> {
    return provideAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateAttachMediaData({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Hide a publication
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * await client.publication.hide({
   *  publicationId: '0x014e-0x0a',
   * });
   * ```
   */
  async hide(
    request: HidePublicationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.HidePublication({ request }, headers);
    });
  }

  /**
   * Report a publication with a reason
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * import { buildReportingReasonInputParams, PublicationReportReason } from '@lens-protocol/client';
   *
   * await client.publication.report({
   *   publicationId: '0x014e-0x0a',
   *   reason: buildReportingReasonInputParams(PublicationReportReason.FAKE_ENGAGEMENT),
   *   additionalComments: 'comment',
   * });
   * ```
   */
  async report(
    request: ReportPublicationRequest,
  ): PromiseResult<void, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      await this.sdk.ReportPublication({ request }, headers);
    });
  }

  /**
   * Create typed data for creating a data availability post.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastDataAvailability}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns Typed data for creating a data availability post
   *
   * @example
   * ```ts
   * const result = await client.publication.createDataAvailabilityPostTypedData({
   *   from: '0x123',
   *   contentURI: 'ipfs://Qm...', // or arweave
   * });
   * ```
   */
  async createDataAvailabilityPostTypedData(
    request: CreateDataAvailabilityPostRequest,
  ): PromiseResult<CreatePostTypedDataFragment, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateDataAvailabilityPostTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Create a data availability post using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.publication.createDataAvailabilityPostViaDispatcher({
   *   from: '0x123',
   *   contentURI: 'ipfs://Qm...', // or arweave
   * });
   * ```
   */
  async createDataAvailabilityPostViaDispatcher(
    request: CreateDataAvailabilityPostRequest,
  ): PromiseResult<
    CreateDataAvailabilityPublicationResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateDataAvailabilityPostViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }

  /**
   * Create typed data for creating a data availability comment.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastDataAvailability}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns Typed data for creating a data availability comment
   *
   * @example
   * ```ts
   * const result = await client.publication.createDataAvailabilityCommentTypedData({
   *   from: '0x123',
   *   commentOn: '0x123-0x456',
   *   contentURI: 'ipfs://Qm...', // or arweave
   * });
   * ```
   */
  async createDataAvailabilityCommentTypedData(
    request: CreateDataAvailabilityCommentRequest,
  ): PromiseResult<
    CreateCommentTypedDataFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateDataAvailabilityCommentTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Create a data availability comment using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.publication.createDataAvailabilityCommentViaDispatcher({
   *   from: '0x123',
   *   commentOn: '0x123-0x456',
   *   contentURI: 'ipfs://Qm...', // or arweave
   * });
   * ```
   */
  async createDataAvailabilityCommentViaDispatcher(
    request: CreateDataAvailabilityCommentRequest,
  ): PromiseResult<
    CreateDataAvailabilityPublicationResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateDataAvailabilityCommentViaDispatcher(
        { request },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Create typed data for creating a data availability mirror.
   *
   * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastDataAvailability}.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns Typed data for creating a data availability mirror
   *
   * @example
   * ```ts
   * const result = await client.publication.createDataAvailabilityMirrorTypedData({
   *   from: '0x123',
   *   mirror: '0x123-0x456',
   * });
   * ```
   */
  async createDataAvailabilityMirrorTypedData(
    request: CreateDataAvailabilityMirrorRequest,
  ): PromiseResult<CreateMirrorTypedDataFragment, CredentialsExpiredError | NotAuthenticatedError> {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateDataAvailabilityMirrorTypedData(
        {
          request,
        },
        headers,
      );

      return result.data.result;
    });
  }

  /**
   * Create a data availability mirror using dispatcher. Profile has to have the dispatcher enabled.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.publication.createDataAvailabilityMirrorViaDispatcher({
   *   from: '0x123',
   *   mirror: '0x123-0x456',
   * });
   * ```
   */
  async createDataAvailabilityMirrorViaDispatcher(
    request: CreateDataAvailabilityMirrorRequest,
  ): PromiseResult<
    CreateDataAvailabilityPublicationResultFragment | RelayErrorFragment,
    CredentialsExpiredError | NotAuthenticatedError
  > {
    return requireAuthHeaders(this.authentication, async (headers) => {
      const result = await this.sdk.CreateDataAvailabilityMirrorViaDispatcher({ request }, headers);

      return result.data.result;
    });
  }
}
