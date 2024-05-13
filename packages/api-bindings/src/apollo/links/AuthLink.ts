import { ApolloLink, FetchResult, from, NextLink, Operation } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Observable, Observer } from '@apollo/client/utilities';
import { CredentialsExpiredError } from '@lens-protocol/domain/use-cases/authentication';
import { invariant, PromiseResult } from '@lens-protocol/shared-kernel';

import { isUnauthorizedServerError } from '../errors';

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

  retryAll() {
    for (const request of this.requests.values()) {
      request.forward(request.operation).subscribe(request.observer);
    }
  }

  failWith(result: FetchResult) {
    for (const request of this.requests.values()) {
      request.observer.next?.(result);
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

          observer.next(result);
        },
        error: async (error) => {
          if (isUnauthorizedServerError(error)) {
            this.queue.enqueue({ operation, forward, observer });

            if (this.refreshing) {
              return;
            }

            this.refreshing = true;
            const refresh = await this.accessTokenStorage.refreshToken();
            this.refreshing = false;

            if (refresh.isSuccess()) {
              this.queue.retryAll();
              return;
            }

            this.queue.failWith(error.result as FetchResult);

            return;
          }
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

export type AuthLinkArgs = {
  accessTokenStorage: IAccessTokenStorage;
};

export function createAuthLink({ accessTokenStorage }: AuthLinkArgs) {
  const tokenRefreshLink = new RefreshTokensLink(accessTokenStorage);

  const authHeaderLink = setContext((_, prevContext) => {
    const token = accessTokenStorage.getAccessToken();

    return {
      ...prevContext,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...('headers' in prevContext && prevContext.headers),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  });

  return from([tokenRefreshLink, authHeaderLink]);
}
