import {
  CollectPolicyType,
  ContentFocus,
  ProfileFieldsFragment,
  ReferencePolicy,
  useCreateComment,
} from '@lens-protocol/react';
import { useState } from 'react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { upload } from '../upload';

type CreatePostProps = {
  activeProfile: ProfileFieldsFragment;
};

export function CreateComment({ activeProfile }: CreatePostProps) {
  const [publicationId, setPublicationId] = useState<string>('0x1b-0x0118');
  const [content, setContent] = useState<string>('');

  const { create, error, isPending } = useCreateComment({ profile: activeProfile, upload });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.length === 0) {
      return;
    }
    await create({
      publicationId,
      content,
      profileId: activeProfile.id,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
      collect: {
        type: CollectPolicyType.NO_COLLECT,
      },
      reference: ReferencePolicy.ANYBODY,
    });

    setContent('');
  };

  return (
    <form onSubmit={submit}>
      {error && <p>{error.message}</p>}

      <p>
        <label htmlFor="publicationId">Publication id</label>
        <input
          id="publicationId"
          type="text"
          disabled={isPending}
          value={publicationId}
          onChange={(event) => setPublicationId(event.target.value)}
        />
      </p>

      <textarea
        rows={3}
        placeholder="Say gm...?"
        style={{ resize: 'none' }}
        disabled={isPending}
        onChange={(event) => setContent(event.target.value)}
        value={content}
      ></textarea>

      <button type="submit" disabled={isPending}>
        Comment
      </button>
    </form>
  );
}

export function UseCreateComment() {
  return (
    <div>
      <h1>
        <code>useCreateComment</code>
      </h1>
      <WhenLoggedIn>{({ profile }) => <CreateComment activeProfile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>Log in to create a post.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
