import {
  useRecentPosts,
  ContentFocus,
  ProfileOwnedByMe,
  DecryptionCriteriaType,
  DecryptionCriteria,
  NftContractType,
  SimpleCriterion,
  useCreateEncryptedPost,
  publicationId,
} from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/WhenLoggedInWithProfile';
import { upload } from '../upload';
import { never } from '../utils';
import { PublicationCard } from './components/PublicationCard';

export type ComposerProps = {
  publisher: ProfileOwnedByMe;
};

export function Composer({ publisher }: ComposerProps) {
  const { execute: create, error, isPending } = useCreateEncryptedPost({ publisher, upload });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    const criteria: SimpleCriterion[] = [];

    if (formData.has('nft') && formData.get('nft')?.length) {
      criteria.push({
        type: DecryptionCriteriaType.NFT_OWNERSHIP,
        chainId: 137,
        contractType: NftContractType.Erc1155,
        contractAddress: formData.get('nft') as string,
      });
    }

    if (formData.has('eoa') && formData.get('eoa')?.length) {
      criteria.push({
        type: DecryptionCriteriaType.ADDRESS_OWNERSHIP,
        address: formData.get('eoa') as string,
      });
    }

    if (formData.has('collect') && formData.get('collect')?.length) {
      criteria.push({
        type: DecryptionCriteriaType.COLLECT_PUBLICATION,
        publicationId: publicationId(formData.get('collect') as string),
      });
    }

    const decryptionCriteria: DecryptionCriteria =
      criteria.length > 1
        ? {
            type: DecryptionCriteriaType.OR,
            or: criteria,
          }
        : criteria[0];

    await create({
      content,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
      decryptionCriteria,
    });

    form.reset();
  };

  return (
    <form onSubmit={submit}>
      <fieldset>
        <textarea
          name="content"
          minLength={1}
          required
          rows={3}
          placeholder="What's happening?"
          style={{ resize: 'none' }}
          disabled={isPending}
        ></textarea>

        <fieldset>
          <legend>Visible to profiles satisfying one or more</legend>
          <label>
            Own Mumbai NFT:
            <br />
            <input type="text" name="nft" placeholder="Contract address" />
          </label>

          <label>
            Own EOA:
            <br />
            <input type="text" name="eoa" placeholder="Address" />
          </label>

          <label>
            Collected:
            <br />
            <input type="text" name="collect" placeholder="Publication ID" />
          </label>
        </fieldset>

        <button type="submit" disabled={isPending}>
          Post
        </button>

        {error && <pre>{error.message}</pre>}
      </fieldset>
    </form>
  );
}

export function RecentPosts() {
  const recentPosts = useRecentPosts();

  return (
    <div>
      {recentPosts.map((item, i) => (
        <PublicationCard key={`${item.id}-${i}`} publication={item} />
      ))}
    </div>
  );
}

export function UseCreateEncryptedPost() {
  return (
    <div>
      <h1>
        <code>useCreateEncrypted</code>
      </h1>

      <WhenLoggedInWithProfile>
        {({ profile }) => (
          <>
            <Composer publisher={profile} />

            <RecentPosts />
          </>
        )}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to create a post." />
    </div>
  );
}
