import { ApolloCache } from '@apollo/client';
import { never } from '@lens-protocol/shared-kernel';

import { ProfileFieldsFragment, ProfileFieldsFragmentDoc } from '../../graphql';
import { mockAttributeFragment, mockProfileFieldsFragment } from '../../mocks';
import { createApolloCache } from '../createApolloCache';

describe(`Given an instance of the ${ApolloCache.name}`, () => {
  describe('when retrieving a ProfileFieldsFragment with attributes', () => {
    const date = new Date();
    const profile = mockProfileFieldsFragment({
      __attributes: [
        mockAttributeFragment({
          key: 'validDate',
          value: date.toISOString(),
        }),
        mockAttributeFragment({
          key: 'invalidDate',
          value: 'invalid',
        }),
        mockAttributeFragment({
          key: 'validNumber',
          value: '42',
        }),
        mockAttributeFragment({
          key: 'invalidNumber',
          value: '',
        }),
        mockAttributeFragment({
          key: 'string',
          value: 'NY',
        }),
        mockAttributeFragment({
          key: 'validBoolean',
          value: 'true',
        }),
        mockAttributeFragment({
          key: 'invalidBoolean',
          value: '1',
        }),
      ],
    });
    const cache = createApolloCache();
    cache.writeFragment({
      data: profile,
      fragment: ProfileFieldsFragmentDoc,
      fragmentName: 'ProfileFields',
    });

    const read =
      cache.readFragment<ProfileFieldsFragment>({
        fragment: ProfileFieldsFragmentDoc,
        fragmentName: 'ProfileFields',
        id: cache.identify(profile),
      }) ?? never();

    it('should allow to access date attributes as Date instances', () => {
      expect(read.attributes.validDate?.toDate()).toEqual(date);
    });

    it('should allow to access date attributes as string', () => {
      expect(read.attributes.validDate?.toString()).toEqual(date.toISOString());
    });

    it('should return null if attempting to access date attributes as Number', () => {
      expect(read.attributes.validDate?.toNumber()).toEqual(null);
    });

    it('should return null if parsing a date attribute fails', () => {
      expect(read.attributes.invalidDate?.toDate()).toBe(null);
    });

    it('should allow to access number attributes as Number', () => {
      expect(read.attributes.validNumber?.toNumber()).toEqual(42);
    });

    it('should allow to access number attributes as String', () => {
      expect(read.attributes.validNumber?.toString()).toEqual('42');
    });

    it('should return null if parsing a number attribute fails', () => {
      expect(read.attributes.invalidNumber?.toNumber()).toBe(null);
    });

    it('should allow to access boolean attributes as Boolean', () => {
      expect(read.attributes.validBoolean?.toBoolean()).toBe(true);
    });

    it('should return null if parsing a boolean attribute fails', () => {
      expect(read.attributes.invalidBoolean?.toBoolean()).toBe(null);
    });

    it('should allow to access string attributes as String', () => {
      expect(read.attributes.string?.toString()).toEqual('NY');
    });
  });
});
