import { PublicationRevenueFragment } from '@lens-protocol/react';

import { ProfilePicture } from '../../profiles/components/ProfilePicture';

type RevenueCardProps = {
  publicationRevenue: PublicationRevenueFragment;
};

export function PublicationRevenueCard({ publicationRevenue }: RevenueCardProps) {
  return (
    <article>
      <div style={{ borderBottom: '1px solid', borderBottomColor: 'var(--border)' }}>
        <ProfilePicture picture={publicationRevenue.publication.profile.picture} />
        <p>
          {publicationRevenue.publication.profile.name ??
            `@${publicationRevenue.publication.profile.handle}`}
        </p>

        <p>{publicationRevenue.publication.metadata.content}</p>
      </div>

      <p>{`Currency: ${publicationRevenue.revenue.total.asset.name} `}</p>
      <p>{`Symbol: ${publicationRevenue.revenue.total.asset.symbol}`}</p>
      <p>{`Amount: ${publicationRevenue.revenue.total.value}`}</p>
    </article>
  );
}
