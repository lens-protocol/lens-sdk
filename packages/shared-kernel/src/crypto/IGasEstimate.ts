import { Amount } from './Amount';
import { CryptoAsset } from './Asset';

export interface IGasEstimate<GasType extends CryptoAsset> {
  get estimatedCost(): Amount<GasType>;

  get maxCost(): Amount<GasType>;
}
