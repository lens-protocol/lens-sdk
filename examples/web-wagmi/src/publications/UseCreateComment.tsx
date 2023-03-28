import { PublicationId, publicationId } from '@lens-protocol/react-web';
import { useState } from 'react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { CommentComposer } from './components/CommentComposer';
import { PublicationComments } from './components/PublicationComments';

export function UseCreateComment() {
  const [parentId, setParentId] = useState<PublicationId>(publicationId('0x1b-0x0118'));

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
                value={parentId}
                onChange={(event) => setParentId(publicationId(event.target.value))}
              />
            </p>

            {parentId && (
              <>
                <CommentComposer publisher={profile} publicationId={parentId} />

                <p>Publication comments:</p>
                <PublicationComments publicationId={parentId} />
              </>
            )}
          </>
        )}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to create a comment." />
    </div>
  );
}
