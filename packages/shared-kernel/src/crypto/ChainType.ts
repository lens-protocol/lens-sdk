/**
 * ChainType is an enum that represents the different types of chains that we support.
 *
 * Rather than couple the chain type to the chain id, we use a separate enum to represent the chain type.
 * At runtime, depending on the consumer application, the same chain type may be mapped to different chain ids.
 * For example ChainType.POLYGON may be mapped to chain id 137 (Polygon Mainnet) or 80001 (Polygon Mumbai Testnet).
 *
 * This allows consumers to express logic that is bound to the nature of the chain but not to a specific chain id, so that
 * the same logic can be deployed into a testing, staging or production environment without having to change the code or
 * account for the different chain ids associated with each environment.
 */
export enum ChainType {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
}
