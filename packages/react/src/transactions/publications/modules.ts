import {
  OpenActionConfig,
  OpenActionType,
  ReferencePolicyConfig,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { EvmAddress } from '@lens-protocol/shared-kernel';

function extractUnknownOpenActionModuleAddresses(actions: OpenActionConfig[] = []): EvmAddress[] {
  return actions.reduce((addresses, action) => {
    if (action.type === OpenActionType.UNKNOWN_OPEN_ACTION) {
      addresses.push(action.address);
    }
    return addresses;
  }, [] as EvmAddress[]);
}

function extractUnknownReferenceModuleAddress(reference?: ReferencePolicyConfig): EvmAddress[] {
  if (!reference) {
    return [];
  }

  if (reference.type !== ReferencePolicyType.UNKNOWN) {
    return [];
  }

  return [reference.address];
}

export function extractUnknownModuleConfigAddresses({
  actions = [],
  reference,
}: {
  actions: OpenActionConfig[] | undefined; // | undefined is intentional to force consumers to provide a value
  reference: ReferencePolicyConfig | undefined; // | undefined is intentional to force consumers to provide a value
}): EvmAddress[] {
  return [
    ...extractUnknownOpenActionModuleAddresses(actions),
    ...extractUnknownReferenceModuleAddress(reference),
  ];
}
