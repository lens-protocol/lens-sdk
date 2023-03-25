import {
  ProfileOwnedByMe,
  useActiveProfile,
  useUpdateProfileDetails,
} from '@lens-protocol/react-web';

import { Loading } from '../components/loading/Loading';
import { upload } from '../upload';
import { ProfileCard } from './components/ProfileCard';

type UpdateProfileFormProps = {
  profile: ProfileOwnedByMe;
};

function UpdateProfileForm({ profile }: UpdateProfileFormProps) {
  const { execute: update, error, isPending } = useUpdateProfileDetails({ profile, upload });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string | null;
    const attributes = {
      location: (formData.get('location') as string | null) || null,
      website: (formData.get('website') as string | null) || null,
    };
    await update({ name, bio, attributes });
  }

  return (
    <form onSubmit={onSubmit}>
      <ProfileCard profile={profile} />

      <label>
        Name:
        <br />
        <input
          required
          type="text"
          placeholder="Your name"
          disabled={isPending}
          name="name"
          defaultValue={profile.name ?? ''}
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
          defaultValue={profile.bio ?? ''}
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
          defaultValue={profile.attributes.location?.toString()}
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
          defaultValue={profile.attributes.website?.toString() ?? ''}
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
  const { data: profile, loading } = useActiveProfile();

  return (
    <div>
      <h1>
        <code>useUpdateProfileDetails</code>
      </h1>

      {loading && <Loading />}

      {profile && <UpdateProfileForm profile={profile} />}
    </div>
  );
}
