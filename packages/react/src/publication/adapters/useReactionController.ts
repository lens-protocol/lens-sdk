import { Reaction, ReactionRequest } from '@lens-protocol/domain/use-cases/publications';

import { useSharedDependencies } from '../../shared';
import { ReactionGateway } from './ReactionGateway';
import { ReactionPresenter } from './ReactionPresenter';

export function useReactionController() {
  const { apolloClient } = useSharedDependencies();

  const add = async (request: ReactionRequest) => {
    const presenter = new ReactionPresenter(apolloClient.cache);
    const gateway = new ReactionGateway(apolloClient);
    const reaction = new Reaction(gateway, presenter);

    void reaction.add(request);

    return presenter.asResult();
  };

  const remove = async (request: ReactionRequest) => {
    const presenter = new ReactionPresenter(apolloClient.cache);
    const gateway = new ReactionGateway(apolloClient);
    const reaction = new Reaction(gateway, presenter);

    void reaction.remove(request);

    return presenter.asResult();
  };

  return {
    add,
    remove,
  };
}
