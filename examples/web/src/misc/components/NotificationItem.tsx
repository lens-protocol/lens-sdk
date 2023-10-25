import {
  Notification,
  ActedNotification,
  CommentNotification,
  FollowNotification,
  MentionNotification,
  MirrorNotification,
  QuoteNotification,
  ReactionNotification,
} from '@lens-protocol/react-web';
import { ReactNode } from 'react';

function NotificationItemWrapper({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}

function NewActedNotification({ notification }: { notification: ActedNotification }) {
  return (
    <NotificationItemWrapper>
      <p>
        Publication {notification.publication.id} acted by{' '}
        {notification.actions.map((action) => action.by.handle).join(', ')}
      </p>
    </NotificationItemWrapper>
  );
}

function NewCommentNotification({ notification }: { notification: CommentNotification }) {
  return (
    <NotificationItemWrapper>
      <p>
        Comment by {notification.comment.by.handle?.fullHandle ?? notification.comment.by.id} on{' '}
        {notification.comment.commentOn.id}
      </p>
    </NotificationItemWrapper>
  );
}

function NewFollowNotification({ notification }: { notification: FollowNotification }) {
  return (
    <NotificationItemWrapper>
      <p>
        Followed by{' '}
        {notification.followers.map((profile) => (
          <div key={profile.id}>{profile.handle?.fullHandle ?? profile.id}</div>
        ))}
      </p>
    </NotificationItemWrapper>
  );
}

function NewMentionNotification({ notification }: { notification: MentionNotification }) {
  return (
    <NotificationItemWrapper>
      <p>
        Mentioned "{notification.publication.id}" by{' '}
        {notification.publication.by.handle?.fullHandle ?? notification.publication.by.id}
      </p>
    </NotificationItemWrapper>
  );
}

function NewMirrorNotification({ notification }: { notification: MirrorNotification }) {
  return (
    <NotificationItemWrapper>
      <p>New mirror on {notification.publication.id}</p>
    </NotificationItemWrapper>
  );
}

function NewQuoteNotification({ notification }: { notification: QuoteNotification }) {
  return (
    <NotificationItemWrapper>
      <p>New quote {notification.quote.id}</p>
    </NotificationItemWrapper>
  );
}

function NewReactionNotification({ notification }: { notification: ReactionNotification }) {
  return (
    <NotificationItemWrapper>
      <p>
        Publication {notification.publication.id} got new reactions:
        {notification.reactions.map((reaction, index) => (
          <div key={index}>by {reaction.profile.handle?.fullHandle ?? reaction.profile.id}</div>
        ))}
      </p>
    </NotificationItemWrapper>
  );
}

type NotificationItemProps = {
  notification: Notification;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  switch (notification.__typename) {
    case 'ActedNotification':
      return <NewActedNotification notification={notification} />;
    case 'CommentNotification':
      return <NewCommentNotification notification={notification} />;
    case 'FollowNotification':
      return <NewFollowNotification notification={notification} />;
    case 'MentionNotification':
      return <NewMentionNotification notification={notification} />;
    case 'MirrorNotification':
      return <NewMirrorNotification notification={notification} />;
    case 'QuoteNotification':
      return <NewQuoteNotification notification={notification} />;
    case 'ReactionNotification':
      return <NewReactionNotification notification={notification} />;
  }
}
