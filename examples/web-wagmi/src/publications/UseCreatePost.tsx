import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedIn } from '../components/auth/auth';
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
      <UnauthenticatedFallback message="Log in to create a post." />
    </div>
  );
}
