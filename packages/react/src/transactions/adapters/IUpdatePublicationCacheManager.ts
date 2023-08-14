import { AnyPublication } from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';

export interface IUpdatePublicationCacheManager {
  update(
    publicationId: PublicationId,
    updateFn: <TPublication extends AnyPublication>(current: TPublication) => TPublication,
  ): void;
}
