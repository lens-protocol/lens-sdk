import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { MyFeed } from './components/MyFeed';
import { PostComposer } from './components/PostComposer';

export function UseCreatePost() {
  return (
    <div>
      <h1>
        <code>useCreatePost</code>
      </h1>

      <WhenLoggedIn>
        {({ profile }) => (
          <>
            <PostComposer profile={profile} />
            <p>My feed:</p>
            <MyFeed profileId={profile.id} />
          </>
        )}
      </WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>Log in to create a post.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
