import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from "../components/auth/auth";
import { CreatePost } from "./components/CreatePost";

export function UseCreatePost() {
  return (
    <div>
      <h1>
        <code>useCreatePost</code>
      </h1>
      <WhenLoggedIn>{({ profile }) => <CreatePost activeProfile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>Log in to create a post.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
