/**
 * ChainType is an enum that represents the different types of chains that we support.
 *
 * Rather than couple the chain type to the chain id, we use a separate enum to represent the chain type.
 * At runtime, depending on the consumer application, the same chain type may be mapped to different chain ids.
 * For example ChainType.POLYGON may be mapped to chain id 137 (Polygon Mainnet) or 80001 (Polygon Mumbai Testnet).
 */
export enum ChainType {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
}
