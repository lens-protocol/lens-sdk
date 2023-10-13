import { Brand } from '@lens-protocol/shared-kernel';

export type PublicationId = Brand<string, 'PublicationId'>;

const momokaSuffix = 'DA';
/**
 * @internal
 */
export function isMomokaPublicationId(id: PublicationId) {
  const [, , da] = id.split('-');
  return da === momokaSuffix;
}
