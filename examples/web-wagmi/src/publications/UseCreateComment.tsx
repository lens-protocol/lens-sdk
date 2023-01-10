import { useState } from 'react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { CommentComposer } from './components/CommentComposer';
import { PublicationComments } from './components/PublicationComments';

export function UseCreateComment() {
  const [publicationId, setPublicationId] = useState<string>('0x1b-0x0118');

  return (
    <div>
      <h1>
        <code>useCreateComment</code>
      </h1>
      <WhenLoggedIn>
        {({ profile }) => (
          <>
            <p>
              <label htmlFor="publicationId">Publication id</label>
              <input
                id="publicationId"
                type="text"
                value={publicationId}
                onChange={(event) => setPublicationId(event.target.value)}
              />
            </p>

            {publicationId && (
              <>
                <CommentComposer activeProfile={profile} publicationId={publicationId} />

                <p>Publication comments:</p>
                <PublicationComments publicationId={publicationId} />
              </>
            )}
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
