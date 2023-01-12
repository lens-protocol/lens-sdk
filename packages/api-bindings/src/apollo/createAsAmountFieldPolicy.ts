import { Erc20Amount, erc20Amount } from '../graphql';
import { TypePolicy } from './TypePolicy';

export function createAsAmountFieldPolicy(): TypePolicy<Erc20Amount> {
  return {
    fields: {
      asAmount(_, { readField }) {
        const asset = readField('asset');
        const value = readField('value');
        if (!value || !asset) return undefined;
        return erc20Amount({ from: { __asset: asset, __value: value } });
      },
    },
  };
}
