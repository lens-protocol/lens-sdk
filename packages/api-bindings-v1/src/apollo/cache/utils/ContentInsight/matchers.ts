import { Url } from '@lens-protocol/shared-kernel';

import {
  ContentInsight,
  ContentInsightType,
  SnapshotProposalId,
  SnapshotSpaceId,
} from '../../../../lens';
import { Matcher } from '../firstMatch';

export type ContentInsightMatcher = Matcher<Url, ContentInsight>;

const snapshotRegExp = /https:\/\/snapshot\.org\/#\/([^/]+)\/proposal\/(0x[a-fA-F0-9]+)/;

const snapshotDemoRegExp = /https:\/\/demo\.snapshot\.org\/#\/([^/]+)\/proposal\/(0x[a-fA-F0-9]+)/;

function snapshotUrlMatcher(pattern: RegExp, url: Url) {
  const [, spaceId, proposalId] = pattern.exec(url) ?? [];

  if (spaceId && proposalId) {
    return {
      type: ContentInsightType.SNAPSHOT_POLL,
      spaceId: spaceId as SnapshotSpaceId,
      proposalId: proposalId as SnapshotProposalId,
      url,
    };
  }
  return null;
}

export function snapshotPoll(url: Url) {
  return snapshotUrlMatcher(snapshotRegExp, url);
}

export function demoSnapshotPoll(url: Url) {
  return snapshotUrlMatcher(snapshotDemoRegExp, url);
}
