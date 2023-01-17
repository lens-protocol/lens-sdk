import {
  ProfileFieldsFragment,
  useActiveProfile,
  useUpdateProfileDetails,
} from '@lens-protocol/react';
import { useForm } from 'react-hook-form';

import { upload } from '../upload';
import { ProfileCard } from './components/ProfileCard';

type UpdateProfileFormProps = {
  profile: ProfileFieldsFragment;
};

type FormData = {
  name: string;
  bio: string | null;
  attributes: {
    location: string | null;
    website: string | null;
  };
};

function UpdateProfileForm({ profile }: UpdateProfileFormProps) {
  const { register, handleSubmit } = useForm<FormData>();
  const { update, error, isPending } = useUpdateProfileDetails({ profile, upload });

  const onSubmit = handleSubmit(async ({ name, bio, attributes }) => {
    await update({ name, bio, attributes });
  });

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
          defaultValue={profile.name ?? ''}
          {...register('name')}
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
          defaultValue={profile.bio ?? ''}
          {...register('bio')}
        ></textarea>
      </label>

      <label>
        Location:
        <br />
        <input
          required
          type="text"
          placeholder="Where are you?"
          disabled={isPending}
          defaultValue={profile.attributes.location.toString()}
          {...register('attributes.location')}
        />
      </label>

      <label>
        Website:
        <br />
        <input
          required
          type="text"
          placeholder="https://example.com"
          disabled={isPending}
          defaultValue={profile.attributes.website?.toString() ?? ''}
          {...register('attributes.website')}
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

      {loading && <p>Loading...</p>}

      {profile && <UpdateProfileForm profile={profile} />}
    </div>
  );
}
