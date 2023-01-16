import { useState } from 'react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedIn } from '../components/auth/auth';
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
      <UnauthenticatedFallback message="Log in to create a comment." />
    </div>
  );
}
