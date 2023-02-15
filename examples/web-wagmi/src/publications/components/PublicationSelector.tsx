import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  usePublications,
} from '@lens-protocol/react';

import { ErrorMessage } from '../../components/error/ErrorMessage';
import { never } from '../../utils';

type PublicationSelectorProps = {
  onPublicationSelected: (publication: CommentFragment | MirrorFragment | PostFragment) => void;
  profileId: string;
};

export function PublicationSelector({
  onPublicationSelected,
  profileId,
}: PublicationSelectorProps) {
  const { data: publications, error, loading } = usePublications({ profileId, limit: 30 });

  if (loading) return null;

  if (error) return <ErrorMessage error={error} />;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const publication = publications.find(({ id }) => id === e.target.value) ?? never();
    onPublicationSelected(publication);
  };

  return (
    <select onChange={onChange}>
      <option value="default">Select a publication</option>
      {publications.map((publication) => (
        <option key={publication.id} value={publication.id}>
          {publication.id} ({publication.metadata.content?.slice(0, 10)})
        </option>
      ))}
    </select>
  );
}
