import { MetadataAttributeType, profile } from '@lens-protocol/metadata';
import { Profile, useSetProfileMetadata } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { Loading } from '../components/loading/Loading';
import { uploadJson } from '../upload';
import { ProfileCard } from './components/ProfileCard';

type UpdateProfileFormProps = {
  activeProfile: Profile;
};

function UpdateProfileForm({ activeProfile }: UpdateProfileFormProps) {
  const { execute: update, error, loading } = useSetProfileMetadata();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string | undefined;
    const bio = formData.get('bio') as string | undefined;
    const location = formData.get('location') as string | undefined;
    const website = formData.get('website') as string | undefined;

    const metadata = profile({
      name,
      bio,
      attributes: [
        {
          key: 'location',
          value: location ?? '',
          type: MetadataAttributeType.STRING,
        },
        {
          key: 'website',
          value: website ?? '',
          type: MetadataAttributeType.STRING,
        },
      ],
    });

    const metadataURI = await uploadJson(metadata);

    const result = await update({ metadataURI });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      toast.error(completion.error.message);
      return;
    }

    toast.success('Profile updated');
  }

  const location = activeProfile.metadata?.attributes?.find((a) => a.key === 'location');
  const website = activeProfile.metadata?.attributes?.find((a) => a.key === 'website');

  return (
    <form onSubmit={onSubmit}>
      <ProfileCard profile={activeProfile} />

      <label>
        Name:
        <br />
        <input
          type="text"
          placeholder="Your name"
          disabled={loading}
          name="name"
          defaultValue={activeProfile.metadata?.displayName ?? undefined}
        />
      </label>

      <label>
        Bio:
        <br />
        <textarea
          rows={3}
          placeholder="Write a line about you"
          style={{ resize: 'none' }}
          disabled={loading}
          name="bio"
          defaultValue={activeProfile.metadata?.bio ?? undefined}
        ></textarea>
      </label>

      <label>
        Location:
        <br />
        <input
          type="text"
          placeholder="Where are you?"
          disabled={loading}
          name="location"
          defaultValue={location?.value ?? undefined}
        />
      </label>

      <label>
        Website:
        <br />
        <input
          type="text"
          placeholder="https://example.com"
          disabled={loading}
          name="website"
          defaultValue={website?.value ?? undefined}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

export function UseSetProfileMetadata() {
  return (
    <div>
      <h1>
        <code>useSetProfileMetadata</code>
      </h1>

      <WhenLoggedIn loadingElement={<Loading />}>
        {({ profile: activeProfile }) => <UpdateProfileForm activeProfile={activeProfile} />}
      </WhenLoggedIn>

      <WhenLoggedOut>
        <p>You need to be logged in to use this example.</p>
      </WhenLoggedOut>
    </div>
  );
}
