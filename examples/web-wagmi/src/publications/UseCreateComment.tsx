import { useState } from 'react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { CommentComposer } from './components/CommentComposer';
import { PublicationComments } from './components/PublicationComments';

export function UseCreateComment() {
  const [publicationId, setPublicationId] = useState<string>('0x1b-0x0118');

  return (
    <div>
      <h1>
        <code>useCreateComment</code>
      </h1>
      <WhenLoggedInWithProfile>
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
                <CommentComposer publisher={profile} publicationId={publicationId} />

                <p>Publication comments:</p>
                <PublicationComments publicationId={publicationId} />
              </>
            )}
          </>
        )}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to create a comment." />
    </div>
  );
}
