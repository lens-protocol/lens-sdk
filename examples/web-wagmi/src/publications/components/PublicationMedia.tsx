import { Post, Comment, Media } from '@lens-protocol/react-web';

import { isSupportedImageMedia } from '../../utils/media';
import { resolveFullResourceUrl } from '../../utils/resolveFullResourceUrl';

type MediaItemProps = {
  media: Media;
};

function MediaItem({ media }: MediaItemProps) {
  if (isSupportedImageMedia(media)) {
    const uri = resolveFullResourceUrl(media.url);

    return <img src={uri} alt={media.altTag || ''} width="45%" />;
  }

  return null;
}

type PublicationMediaProps = {
  publication: Post | Comment;
};

export function PublicationMedia({ publication }: PublicationMediaProps) {
  const medias = publication.metadata.media.map((mediaSet) => {
    return mediaSet.small ?? mediaSet.medium ?? mediaSet.optimized ?? mediaSet.original;
  });

  return (
    <>
      {medias.map((media) => (
        <MediaItem key={media.url} media={media} />
      ))}
    </>
  );
}
