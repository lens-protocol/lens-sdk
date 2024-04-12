import { AnyPaidAction, FollowPaidAction, OpenActionPaidAction } from '@lens-protocol/react-web';

import { formatProfileIdentifier } from '../../utils/formatProfileIdentifier';

function FollowPaidActionItem({ action }: { action: FollowPaidAction }) {
  return (
    <div>
      Followed {formatProfileIdentifier(action.followed)} on {action.latestActed[0].actedAt}
    </div>
  );
}

function OpenActionPaidActionItem({ action }: { action: OpenActionPaidAction }) {
  return (
    <div>
      Acted on publication {action.actedOn.id} on {action.latestActed[0].actedAt}
    </div>
  );
}

type PaidActionItemProps = {
  action: AnyPaidAction;
};

export function PaidActionItem({ action }: PaidActionItemProps) {
  switch (action.__typename) {
    case 'FollowPaidAction':
      return <FollowPaidActionItem action={action} />;
    case 'OpenActionPaidAction':
      return <OpenActionPaidActionItem action={action} />;
  }
}
