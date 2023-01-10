import { ProfileFieldsFragment, useUpdateProfileImage } from '@lens-protocol/react';
import { useState } from 'react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { useFilePreview } from '../hooks/useFilePreview';
import { ILocalFile, ImageType, useFileSelect } from '../hooks/useFileSelect';
import { uploadImage } from '../upload';
import { SmallProfileCard } from './components/ProfileCard';

function UpdateProfileImageInner({ profile }: { profile: ProfileFieldsFragment }) {
  const [candidateFile, setCandidateFile] = useState<ILocalFile<ImageType> | null>(null);
  const [uploadError, setUploadError] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);

  const openFileSelector = useFileSelect({
    onSelect: (fileList) => {
      setCandidateFile(fileList.item(0));
    },
    accept: [ImageType.JPEG, ImageType.PNG, ImageType.WEBP],
    multiple: false,
  });

  const previewUrl = useFilePreview(candidateFile);

  const {
    update,
    error: updateError,
    isPending,
  } = useUpdateProfileImage({
    profileId: profile.id,
  });

  const handleUploadCandidateFileClick = () => {
    openFileSelector();
  };

  const handleDismissCandidateFileClick = () => {
    setCandidateFile(null);
  };

  const uploadImageCandidate = async () => {
    if (candidateFile) {
      setUploadError('');
      setIsUploading(true);

      try {
        const url = await uploadImage(candidateFile);
        setIsUploading(false);
        return url;
      } catch (e) {
        setIsUploading(false);
        if (e instanceof Error) {
          setUploadError(`Upload error: ${e.message}`);
        }
      }
    }
  };

  const handleUpdateProfileImage = async () => {
    const url = await uploadImageCandidate();

    if (url) {
      await update(url);
    }
  };

  return (
    <div>
      <SmallProfileCard profile={profile} />

      <div>
        <button onClick={handleUploadCandidateFileClick}>Upload a new profile image</button>
        {previewUrl && (
          <div>
            {uploadError && <p>{uploadError}</p>}
            {updateError && <p>{updateError.message}</p>}
            {isPending && <p>Updating your Lens profile's image...</p>}
            {isUploading && <p>Uploading image to Arweave...</p>}
            <img src={previewUrl} alt="Your new avatar" width="300px" />
            <div>
              <button onClick={handleUpdateProfileImage}>Save</button>{' '}
              <button onClick={handleDismissCandidateFileClick}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function UseUpdateProfileImage() {
  return (
    <>
      <h1>
        <code>useUpdateProfileImage</code>
      </h1>
      <WhenLoggedIn>{({ profile }) => <UpdateProfileImageInner profile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
