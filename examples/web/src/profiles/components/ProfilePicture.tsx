import { NftImage, ProfilePictureSet } from '@lens-protocol/react-web';

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

type RemoteProfilePictureProps = {
  picture: ProfilePictureSet;
};

function RemoteProfilePicture({ picture }: RemoteProfilePictureProps) {
  const url = picture.optimized?.uri || picture.raw.uri;
  const src = useBuildResourceSrc(url);
  if (!src) return null;
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
  picture: ProfilePictureSet | NftImage | null;
};

export function ProfilePicture({ picture }: ProfilePictureProps) {
  if (!picture) return <FallbackProfilePicture />;

  switch (picture.__typename) {
    case 'ImageSet':
      return <RemoteProfilePicture picture={picture} />;
    default:
      return <FallbackProfilePicture />;
  }
}
