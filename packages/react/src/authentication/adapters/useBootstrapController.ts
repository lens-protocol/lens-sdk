import { Bootstrap } from '@lens-protocol/domain/use-cases/authentication';
import { useEffect, useRef } from 'react';

import { SharedDependencies } from '../../shared';
import { BootstrapPresenter } from './BootstrapPresenter';

export function useBootstrapController({
  credentialsGateway,
  credentialsFactory,
  logout,
  transactionQueue,
}: SharedDependencies) {
  const isStartedRef = useRef(false);

  useEffect(() => {
    // Protects again multiple calls to start (quite likely from `useEffect` hook in concurrent mode or in development strict mode)
    if (isStartedRef.current) {
      return;
    }

    isStartedRef.current = true;

    const bootstrap = new Bootstrap(
      credentialsGateway,
      credentialsFactory,
      transactionQueue,
      logout,
      new BootstrapPresenter(),
    );

    void bootstrap.execute();
  }, [credentialsFactory, credentialsGateway, logout, transactionQueue]);
}
