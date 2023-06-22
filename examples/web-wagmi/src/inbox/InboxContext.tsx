import { XMTPProvider } from '@xmtp/react-sdk';
import { Outlet } from 'react-router-dom';

export function InboxContext() {
  return (
    <XMTPProvider>
      <Outlet />
    </XMTPProvider>
  );
}
