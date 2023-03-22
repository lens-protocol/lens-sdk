import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useCreateProfile',
    description: `Create a profile.`,
    path: '/profiles/useCreateProfile',
  },
  {
    label: 'useProfile',
    description: `Get a profile by the profile id or by its handle.`,
    path: '/profiles/useProfile',
  },
  {
    label: 'useProfiles',
    description: `Get a paginated list of profile by their profile handles or their profile Ids.`,
    path: '/profiles/useProfiles',
  },
  {
    label: 'useMutualFollowers',
    description: `Get a list of mutual followers between accounts.`,
    path: '/profiles/useMutualFollowers',
  },
  {
    label: 'useProfilesToFollow',
    description: `Get a list of recommended profiles.`,
    path: '/profiles/useProfilesToFollow',
  },
  {
    label: 'useFollow / useUnfollow',
    description: `Follow or unfollow a profile.`,
    path: '/profiles/useFollow',
  },
  {
    label: 'useUpdateProfileImage',
    description: `Update your profile image.`,
    path: '/profiles/useUpdateProfileImage',
  },
  {
    label: 'useUpdateFollowPolicy',
    description: `Update the follow policy of a profile.`,
    path: '/profiles/useUpdateFollowPolicy',
  },
  {
    label: 'useUpdateProfileDetails',
    description: `Updates profile details.`,
    path: '/profiles/useUpdateProfileDetails',
  },
  {
    label: 'useUpdateDispatcherConfig',
    description: `Update profile dispatcher configuration.`,
    path: '/profiles/useUpdateDispatcherConfig',
  },
  {
    label: 'useActiveProfileSwitch',
    description: `Switch active profile.`,
    path: '/profiles/useActiveProfileSwitch',
  },
  {
    label: 'useProfilesOwnedBy',
    description: `Fetch a list of profiles owed by a given address.`,
    path: '/profiles/useProfilesOwnedBy',
  },
  {
    label: 'useProfileFollowers',
    description: `Fetch a list of profile followers.`,
    path: '/profiles/useProfileFollowers',
  },
  {
    label: 'useProfileFollowing',
    description: `Fetch a list of profile following.`,
    path: '/profiles/useProfileFollowing',
  },
];

export function ProfilesPage() {
  return (
    <div>
      <h1>Profiles</h1>

      {profileHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
