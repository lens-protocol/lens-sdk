import { useActiveProfile } from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { CreatePost } from './components/CreatePost';

export function UseCreatePost() {
  const { data: profile } = useActiveProfile();
  return (
    <div>
      <h1>
        <code>useCreatePost</code>
      </h1>
      <CreatePost />
      {!profile && (
        <div>
          <p>Log in to create a post.</p>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
