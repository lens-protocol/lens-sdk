import { ApolloLink, FetchResult, from, NextLink, Operation } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Observable, Observer } from '@apollo/client/utilities';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/authentication';
import { invariant, PromiseResult } from '@lens-protocol/shared-kernel';

import { graphQLResultHasUnauthenticatedError } from '../errors';

export interface IAccessTokenStorage {
  getAccessToken(): string | null;
  refreshToken(): PromiseResult<void, CredentialsExpiredError>;
}

type RequestsQueueEntry = {
  operation: Operation;
  observer: Observer<FetchResult>;
  forward: NextLink;
};

class RequestsQueue {
  private requests = new Map<Operation, RequestsQueueEntry>();

  enqueue(request: RequestsQueueEntry) {
    this.requests.set(request.operation, request);
  }

  dequeue(operation: Operation) {
    this.requests.delete(operation);
  }

  consume() {
    for (const request of this.requests.values()) {
      request.forward(request.operation).subscribe(request.observer);
    }
  }
}

class RefreshTokensLink extends ApolloLink {
  private refreshing = false;

  private queue = new RequestsQueue();

  constructor(private readonly accessTokenStorage: IAccessTokenStorage) {
    super();
  }

  request(operation: Operation, forward?: NextLink): Observable<FetchResult> | null {
    invariant(
      forward,
      `${RefreshTokensLink.name} is a non-terminating link and should not be the last in the composed chain`,
    );

    return new Observable((observer) => {
      // this if is extremely difficult to test with standard Apollo Client mocks
      if (this.refreshing) {
        this.queue.enqueue({ operation, forward, observer });

        return () => {
          this.queue.dequeue(operation);
        };
      }

      const subscription = forward(operation).subscribe({
        next: async (result) => {
          if (this.refreshing) {
            this.queue.enqueue({ operation, forward, observer });
            return;
          }

          if (graphQLResultHasUnauthenticatedError(result)) {
            if (!this.refreshing) {
              this.refreshing = true;
              const refresh = await this.accessTokenStorage.refreshToken();
              this.refreshing = false;

              if (refresh.isFailure()) {
                observer.next(result);
              } else {
                forward(operation).subscribe(observer);
              }
              this.queue.consume();
            }
            return;
          }

          observer.next(result);
        },
        error: (error) => {
          observer.error(error);
        },
        complete: () => {
          // if refreshing, do not close the observer
          if (this.refreshing) {
            return;
          }
          observer.complete();
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}

export function createAuthLink(accessTokenStorage: IAccessTokenStorage) {
  const tokenRefreshLink = new RefreshTokensLink(accessTokenStorage);

  const authHeaderLink = setContext((_, prevContext) => {
    const token = accessTokenStorage.getAccessToken();

    if (token) {
      return {
        ...prevContext,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
          authorization: `Bearer ${token}`,
          ...('headers' in prevContext && prevContext.headers),
        },
      };
    }

    return prevContext;
  });

  return from([tokenRefreshLink, authHeaderLink]);
}
