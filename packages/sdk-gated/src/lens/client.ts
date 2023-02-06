import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { RetryLink } from '@apollo/client/link/retry';
import { APIError, ValidationError } from '../error';
import {
  AddressOwningProfileDocument,
  GetLatestPublicationForProfileIdDocument,
  GetProfilesForAddressDocument,
  Profile,
  PublicationValidateMetadataResult,
  ValidatePublicationMetadataDocument,
} from '../graphql/types';
import { LensEnvironment, MetadataV2 } from '../types';
import { validateLensEnvironment } from '../validators';
import { getLensAPIUrlFromEnv } from './utils';

export default class LensAPIClient {
  _client: ApolloClient<NormalizedCacheObject>;
  private _env: LensEnvironment;

  constructor(env: LensEnvironment) {
    this._env = validateLensEnvironment(env);
    this._client = new ApolloClient({
      link: this._createLink(env),
      cache: new InMemoryCache(),
    });
  }

  get env() {
    return this._env;
  }

  set env(env: LensEnvironment) {
    this._env = validateLensEnvironment(env);
    this._client.setLink(this._createLink(env));
  }

  /***
   * Validates some metadata object for validity.
   * @param metadata An object that satisfies the Lens Protocol Metadata V2 standards
   */
  public async validateMetadata(metadata: MetadataV2): Promise<PublicationValidateMetadataResult> {
    const result = await this._client.query({
      query: ValidatePublicationMetadataDocument,
      variables: {
        metadata,
      },
    });

    if (result.errors) {
      throw new APIError(result.errors.join(', '));
    }

    return result.data.validatePublicationMetadata;
  }

  /**
   * Gets the latest publication ID for a profile, used in order to calculate `thisPublicationId` when
   * interpreting Collect Conditions. Returns null if profile ID has not made any publications.
   * @param profileId The profile ID
   */
  public async getLastPublicationIdForProfileId(profileId: string): Promise<string | null> {
    const result = await this._client.query({
      query: GetLatestPublicationForProfileIdDocument,
      variables: {
        profileId,
      },
    });

    if (result.errors) {
      throw new APIError(result.errors.join(', '));
    }

    const items = result.data.publications.items;
    if (!Array.isArray(items) || items.length === 0) {
      return null;
    }
    return items[0].id;
  }

  /**
   * Checks if the given wallet address owns the profile Id
   * @param address The EOA wallet address
   * @param profileId The profile Id to be checked
   */
  public async validateAddressOwnsProfile(address: string, profileId: string): Promise<void> {
    const result = await this._client.query({
      query: AddressOwningProfileDocument,
      variables: {
        profileId,
      },
    });

    if (result.errors) {
      throw new APIError(result.errors.join(', '));
    }

    if (!result.data.profile) {
      throw new APIError(`Profile ID ${profileId} not found.`);
    }

    if (result.data.profile.ownedBy.toLowerCase() !== address.toLowerCase()) {
      throw new ValidationError(`The signed address ${address} does not own profile ${profileId}`);
    }
  }

  public async getProfilesForAddress(
    address: string
  ): Promise<Pick<Profile, 'id' | 'handle'>[] | null> {
    const result = await this._client.query({
      query: GetProfilesForAddressDocument,
      variables: {
        address,
      },
    });

    if (result.errors) {
      throw new APIError(result.errors.join(', '));
    }

    if (!result.data.profiles) {
      throw new APIError(`Address ${address} does not own any profiles`);
    }

    let profiles = result.data.profiles.items;

    if (Array.isArray(profiles) && profiles.length === 0) {
      return null;
    }
    return profiles;
  }

  private _createLink(env: LensEnvironment): ApolloLink {
    const retryLink = new RetryLink({
      delay: {
        initial: 100,
      },
      attempts: {
        max: 3,
        retryIf: (error) => !!error,
      },
    });
    const httpLink = new HttpLink({
      uri: getLensAPIUrlFromEnv(env),
      fetchOptions: 'no-cors',
      fetch,
    });

    return from([retryLink, httpLink]);
  }
}
