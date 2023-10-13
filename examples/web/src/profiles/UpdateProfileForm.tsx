import { MetadataAttributeType, profile } from '@lens-protocol/metadata';
import { useSetProfileMetadata } from '@lens-protocol/react-web';
import { ProfileCard } from './components/ProfileCard';
import { UpdateProfileFormProps } from './UseUpdateProfileDetails';

export function UpdateProfileForm({ activeProfile: activeProfile }: UpdateProfileFormProps) {
  const { execute: update, error, isPending } = useSetProfileMetadata({ profile: activeProfile });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string | undefined;
    const location = formData.get('location') as string | undefined;
    const website = formData.get('website') as string | undefined;
    const attributes = [
      ...(location ? [{ key: 'location', value: location, type: MetadataAttributeType.JSON }] : []),
    ];

    profile({
      name,
      bio,
      attributes: [
        ...(location
          ? [{ key: 'location', value: location, type: MetadataAttributeType.STRING } as const]
          : []),
      ],
    });

    await update({ metadataURI: '' });
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
