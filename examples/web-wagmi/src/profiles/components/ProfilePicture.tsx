import { ProfileFieldsFragment } from '@lens-protocol/react';

import { useBuildResourceSrc } from '../../hooks/useBuildResourceSrc';

const PROFILE_PICTURE_SIZE = '4rem';

function FallbackProfilePicture() {
  return (
    <div
      style={{
        height: PROFILE_PICTURE_SIZE,
        width: PROFILE_PICTURE_SIZE,
        background: '#b6b4b4',
        borderRadius: '50%',
        display: 'inline-block',
      }}
    />
  );
}

type ProfilePictureInnerProps = {
  url: string;
};

function IPFSProfilePicture({ url }: ProfilePictureInnerProps) {
  const src = useBuildResourceSrc(url);
  return (
    <img
      src={src}
      style={{
        height: PROFILE_PICTURE_SIZE,
        width: PROFILE_PICTURE_SIZE,
        borderRadius: '50%',
      }}
    />
  );
}

type ProfilePictureProps = {
  picture: ProfileFieldsFragment['picture'];
};

export function ProfilePicture({ picture }: ProfilePictureProps) {
  if (!picture) return <FallbackProfilePicture />;

  switch (picture.__typename) {
    case 'MediaSet':
      return <IPFSProfilePicture url={picture.original.url} />;
    default:
      return <FallbackProfilePicture />;
  }
}
