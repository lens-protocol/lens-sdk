import {
  Notification,
  NewFollowerNotificationFragment,
  NewCollectNotificationFragment,
  NewCommentNotificationFragment,
  NewMentionNotificationFragment,
  NewMirrorNotificationFragment,
  NewReactionNotificationFragment,
} from '@lens-protocol/react-web';
import { ReactNode } from 'react';

function NotificationItemWrapper({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}

function NewReactionNotification({
  notification,
}: {
  notification: NewReactionNotificationFragment;
}) {
  return (
    <NotificationItemWrapper>
      <p>
        {notification.profile.handle} reacted {notification.reaction} to publication{' '}
        {notification.publication.id}
      </p>
    </NotificationItemWrapper>
  );
}
function NewMirrorNotification({ notification }: { notification: NewMirrorNotificationFragment }) {
  return (
    <NotificationItemWrapper>
      <p>
        Publication {notification.publication.id} collected by {notification.profile.handle}
      </p>
    </NotificationItemWrapper>
  );
}

function NewMentionNotification({
  notification,
}: {
  notification: NewMentionNotificationFragment;
}) {
  return (
    <NotificationItemWrapper>
      <p>
        Mentioned "{notification.mentionPublication.metadata.content}" by{' '}
        {notification.mentionPublication.profile.handle}
      </p>
    </NotificationItemWrapper>
  );
}

function NewCommentNotification({
  notification,
}: {
  notification: NewCommentNotificationFragment;
}) {
  return (
    <NotificationItemWrapper>
      <p>
        Comment "{notification.comment.metadata.content}" by {notification.comment.profile.handle}{' '}
        on {notification.comment.mainPost.id}
      </p>
    </NotificationItemWrapper>
  );
}

function NewCollectNotification({
  notification,
}: {
  notification: NewCollectNotificationFragment;
}) {
  return (
    <NotificationItemWrapper>
      <p>
        Publication {notification.collectedPublication.id} collected by{' '}
        {notification.wallet.defaultProfile?.handle}
      </p>
    </NotificationItemWrapper>
  );
}

function NewFollowerNotification({
  notification,
}: {
  notification: NewFollowerNotificationFragment;
}) {
  return (
    <NotificationItemWrapper>
      <p>Followed by {notification.wallet.defaultProfile?.handle}</p>
    </NotificationItemWrapper>
  );
}

type NotificationItemProps = {
  notification: Notification;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  switch (notification.__typename) {
    case 'NewFollowerNotification':
      return <NewFollowerNotification notification={notification} />;
    case 'NewCollectNotification':
      return <NewCollectNotification notification={notification} />;
    case 'NewCommentNotification':
      return <NewCommentNotification notification={notification} />;
    case 'NewMentionNotification':
      return <NewMentionNotification notification={notification} />;
    case 'NewMirrorNotification':
      return <NewMirrorNotification notification={notification} />;
    case 'NewReactionNotification':
      return <NewReactionNotification notification={notification} />;
  }
}
