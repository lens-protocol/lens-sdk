import {
  MetadataBooleanAttribute,
  MetadataDateAttribute,
  MetadataJsonAttribute,
  MetadataNumberAttribute,
  MetadataStringAttribute,
} from './graphql/generated';

/**
 * Convenience type for metadata attributes.
 *
 * @example
 * Use this type as prop type for a component that renders metadata attributes.
 * ```tsx
 *
 * function PublicationAttribute({ attribute }: { attribute: MetadataAttribute }) {
 *   switch (attribute.__typename) {
 *     case 'MetadataBooleanAttribute':
 *       return <p><strong>{attribute.key}</strong>{attribute.value === 'true' ? 'Yes' : 'No'}</p>;
 *
 *     case 'MetadataDateAttribute':
 *       return <p><strong>{attribute.key}</strong>{new Date(attribute.value).toLocaleString()}</p>;
 *
 *     case 'MetadataNumberAttribute':
 *       return <p><strong>{attribute.key}</strong>{parseFloat(attribute.value).toFixed(2)}</p>;
 *
 *     // ...
 * }
 * ```
 */
export type MetadataAttribute =
  | MetadataBooleanAttribute
  | MetadataDateAttribute
  | MetadataNumberAttribute
  | MetadataJsonAttribute
  | MetadataStringAttribute;
