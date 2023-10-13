import { MetadataAttributeType, profile } from '@lens-protocol/metadata';
import { Profile, useSetProfileMetadata } from '@lens-protocol/react-web';

import { WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { Loading } from '../components/loading/Loading';
import { uploadJson } from '../upload';
import { ProfileCard } from './components/ProfileCard';

type UpdateProfileFormProps = {
  activeProfile: Profile;
};

function UpdateProfileForm({ activeProfile: activeProfile }: UpdateProfileFormProps) {
  const { execute: update, error, isPending } = useSetProfileMetadata({ profile: activeProfile });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string | undefined;
    const location = formData.get('location') as string | undefined;
    const website = formData.get('website') as string | undefined;
    const locationAttribute = location
      ? [{ key: 'location', value: location, type: MetadataAttributeType.STRING } as const]
      : [];
    const websiteAttribute = website
      ? [{ key: 'website', value: website, type: MetadataAttributeType.STRING } as const]
      : [];

    const metadata = profile({
      name,
      bio,
      attributes: [...locationAttribute, ...websiteAttribute],
    });

    const metadataURI = await uploadJson(metadata);

    await update({ metadataURI });
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
          required
          type="text"
          placeholder="Your name"
          disabled={isPending}
          name="name"
          defaultValue={activeProfile.metadata?.displayName ?? ''}
        />
      </label>

      <label>
        Bio:
        <br />
        <textarea
          rows={3}
          placeholder="Write a line about you"
          style={{ resize: 'none' }}
          disabled={isPending}
          name="bio"
          defaultValue={activeProfile.metadata?.bio ?? ''}
        ></textarea>
      </label>

      <label>
        Location:
        <br />
        <input
          type="text"
          placeholder="Where are you?"
          disabled={isPending}
          name="location"
          defaultValue={location?.value ?? ''}
        />
      </label>

      <label>
        Website:
        <br />
        <input
          type="text"
          placeholder="https://example.com"
          disabled={isPending}
          name="website"
          defaultValue={website?.value ?? ''}
        />
      </label>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

export function UseUpdateProfileDetails() {
  return (
    <div>
      <h1>
        <code>useUpdateProfileDetails</code>
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
