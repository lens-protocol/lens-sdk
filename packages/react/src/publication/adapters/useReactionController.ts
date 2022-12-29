import { Reaction, ReactionRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { ReactionGateway } from './ReactionGateway';
import { ReactionPresenter } from './ReactionPresenter';

export function useReactionController() {
  const { apolloClient } = useSharedDependencies();

  const presenter = new ReactionPresenter(apolloClient.cache);
  const gateway = new ReactionGateway(apolloClient);
  const reaction = new Reaction(gateway, presenter);

  const add = async (request: ReactionRequest) => {
    return reaction.add(request);
  };

  const remove = async (request: ReactionRequest) => {
    return reaction.remove(request);
  };

  return {
    add,
    remove,
  };
}
