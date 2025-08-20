import { textOnly } from '@lens-protocol/metadata';
import { useCreatePost } from '@lens-protocol/react';
import { handleOperationWith } from '@lens-protocol/react/viem';
import { useWalletClient } from 'wagmi';

export function App() {
  const { data: wallet } = useWalletClient();
  const {
    execute,
    loading,
    data: post,
  } = useCreatePost({ handler: handleOperationWith(wallet) });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const content = formData.get('content') as string;

    const metadata = textOnly({
      content,
    });

    const result = await execute({
      contentUri: `data:application/json,${JSON.stringify(metadata)}`,
    });

    if (result.isErr()) {
      alert(result.error.message);
    }
  };

  return (
    <div>
      <h1>Post Example</h1>
      {post && (
        <div>
          <h2>Post Created</h2>
          <p>Slug: {post.slug}</p>
          <p>Created At: {post.timestamp.toString()}</p>
          <p>
            Content:{' '}
            {post.metadata.__typename === 'TextOnlyMetadata' &&
              post.metadata.content}
          </p>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <label>
          Content:
          <textarea name='content' required />
        </label>
        <button type='submit' disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}
