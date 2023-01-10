import { print } from 'graphql';
import gql from 'graphql-tag';

import { removeClientTypeFromExtendedUnion } from '../transforms';

describe(`Given the ${removeClientTypeFromExtendedUnion.name} GQL transform function`, () => {
  describe('when invoked on DocumentNode to remove a given fragment by name', () => {
    it('should remove all occurrences of such fragment spreads, the fragment definition and inline fragments', () => {
      const query = gql`
        query {
          field(usingVariable: $variable) {
            ... on FragmentToRemove {
              ...FragmentToRemove
            }

            ... on AnotherFragment {
              ...AnotherFragment
            }
          }
        }

        fragment FragmentToRemove on Thing {
          foo
          bar
          baz
        }

        fragment AnotherFragment on Thing {
          oof
          rab
          zab
        }
      `;
      const expected = gql`
        query {
          field(usingVariable: $variable) {
            ... on AnotherFragment {
              ...AnotherFragment
            }
          }
        }

        fragment AnotherFragment on Thing {
          oof
          rab
          zab
        }
      `;

      const doc = removeClientTypeFromExtendedUnion('FragmentToRemove', query);

      expect(print(doc)).toBe(print(expected));
    });
  });
});
