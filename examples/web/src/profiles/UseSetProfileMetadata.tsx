import { MetadataAttributeType, profile } from '@lens-protocol/metadata';
import { Profile, useSetProfileMetadata } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { useIrysUploadHandler } from '../hooks/useIrysUploader';
import { ProfileCard } from './components/ProfileCard';

type UpdateProfileFormProps = {
  activeProfile: Profile;
};

function UpdateProfileForm({ activeProfile }: UpdateProfileFormProps) {
  const uploadMetadata = useIrysUploadHandler();
  const { execute: update, error, loading } = useSetProfileMetadata();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const location = formData.get('location') as string;
    const website = formData.get('website') as string;

    const metadata = profile({
      name,
      bio,
      attributes: [
        {
          key: 'location',
          value: location,
          type: MetadataAttributeType.STRING,
        },
        {
          key: 'website',
          value: website,
          type: MetadataAttributeType.STRING,
        },
      ],
    });

    const metadataURI = await uploadMetadata(metadata);

    const result = await update({
      metadataURI,
      sponsored: formData.get('sponsored') === 'on',
    });

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
      <ProfileCard profile={activeProfile}>
        <p>Attributes</p>
        <ul>
          {(activeProfile.metadata?.attributes ?? []).map((attribute, idx) => (
            <li key={`${attribute.key}-${idx}`}>
              <b>{attribute.key}:</b>&nbsp;
              {attribute.value}
            </li>
          ))}
        </ul>
      </ProfileCard>

      <label>
        Name:
        <br />
        <input
          type="text"
          placeholder="Your name"
          required
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
          required
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
          required
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
          required
          name="website"
          defaultValue={website?.value ?? undefined}
        />
      </label>

      <label>
        <input
          type="checkbox"
          name="sponsored"
          disabled={loading}
          value="on"
          defaultChecked={true}
        />
        sponsored
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

      <RequireProfileSession message="Log in to view this example.">
        {({ profile: activeProfile }) => <UpdateProfileForm activeProfile={activeProfile} />}
      </RequireProfileSession>
    </div>
  );
}
