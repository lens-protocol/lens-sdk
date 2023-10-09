import { waitFor } from '@testing-library/react';

import { localStorage } from '../storage';

const key = 'key';
const data = 'value';

function setupTestScenario() {
  const provider = localStorage();

  const subscriber = jest.fn();
  const subscription = provider.subscribe(key, subscriber);

  return {
    subscriber,

    subscription,

    waitForUpdate: async () => {
      await waitFor(() => {
        expect(subscriber).toHaveBeenCalled();
      });
    },

    dispatchStorageEvent: (init: StorageEventInit) => {
      const event = new StorageEvent('storage', init);
      window.dispatchEvent(event);
    },
  };
}

describe(`Given an instance of IStorageProvider created via the "${localStorage.name}" factory`, () => {
  describe('and a storage subscription for a given key', () => {
    describe(`when a Web Storage API ${StorageEvent.name} is fired`, () => {
      describe(`for a key different from the one of the subscription`, () => {
        it('should not invoke the subscriber ', async () => {
          const { subscriber, dispatchStorageEvent } = setupTestScenario();
          dispatchStorageEvent({
            key: 'otherKey',
            storageArea: window.localStorage,
          });

          await Promise.resolve(); // give it a chance to execute

          expect(subscriber).not.toHaveBeenCalled();
        });
      });

      describe(`for a ${Storage.name} area other than ${localStorage.name}`, () => {
        it('should not invoke the subscriber', async () => {
          const { subscriber, dispatchStorageEvent } = setupTestScenario();
          dispatchStorageEvent({
            key,
            storageArea: window.sessionStorage,
          });

          await Promise.resolve(); // give it a chance to execute

          expect(subscriber).not.toHaveBeenCalled();
        });
      });

      describe(`with 'event.oldValue = null' and new data in the 'event.newValue'`, () => {
        it(`should invoke the subscribers with new data and 'null' as old data`, async () => {
          const { dispatchStorageEvent, waitForUpdate, subscriber } = setupTestScenario();

          dispatchStorageEvent({
            key,
            storageArea: window.localStorage,
            newValue: data,
            oldValue: null,
          });

          await waitForUpdate();
          expect(subscriber).toHaveBeenCalledWith(data, null);
        });
      });

      describe(`with 'event.newValue = null'`, () => {
        it(`should invoke the subscribers with 'null' and old data`, async () => {
          const { dispatchStorageEvent, waitForUpdate, subscriber } = setupTestScenario();

          dispatchStorageEvent({
            key,
            storageArea: window.localStorage,
            newValue: null,
            oldValue: data,
          });

          await waitForUpdate();
          expect(subscriber).toHaveBeenCalledWith(null, data);
        });
      });
    });

    describe(`when unsubscribing`, () => {
      it('should no longer invoke the subscriber', async () => {
        const { dispatchStorageEvent, subscriber, subscription } = setupTestScenario();

        subscription.unsubscribe();

        dispatchStorageEvent({
          key,
          storageArea: window.localStorage,
          newValue: null,
          oldValue: data,
        });

        await waitFor(() => {
          expect(subscriber).not.toHaveBeenCalled();
        });
      });
    });
  });
});
