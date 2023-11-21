import { AnyPublication } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

export interface IPublicationCacheManager {
  update(
    publicationId: PublicationId,
    updateFn: <TPublication extends AnyPublication>(current: TPublication) => TPublication,
  ): void;

  refresh(publicationId: PublicationId): Promise<void>;
}
