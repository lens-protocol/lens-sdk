import {
  evmAddress,
  type Post,
  postId,
  useExecutePostAction,
  usePost,
} from '@lens-protocol/react';
import {
  handleOperationWith,
  useUnknownPostActionEncoder,
} from '@lens-protocol/react/viem';
import { useWalletClient } from 'wagmi';

const POST_SLUG = 'b84rn3awqztera37ek';
const ACTION_ADDRESS = '0xE34b5bF6e385084F43F827077E49EdAa33a3c9Dd';

export function App() {
  const { data: wallet } = useWalletClient();
  const { data: post, loading } = usePost({
    post: postId(POST_SLUG),
  }) as { data: Post | null; loading: boolean };

  const { execute: executePostAction, loading: executing } =
    useExecutePostAction({
      handler: handleOperationWith(wallet),
    });

  const encodeParams = useUnknownPostActionEncoder(
    post,
    evmAddress(ACTION_ADDRESS),
  );

  const handleVote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!post || !wallet) return;

    const formData = new FormData(event.currentTarget);
    const params = {
      'lens.param.vote': formData.get('lens.param.vote') === 'true',
    };

    const encodedParams = encodeParams(params);

    const result = await executePostAction({
      post: postId(post.id),
      action: {
        unknown: {
          address: evmAddress(ACTION_ADDRESS),
          params: encodedParams,
        },
      },
    });

    if (result.isErr()) {
      console.error(result.error);
      alert(`Failed to vote: ${result.error.message}`);
      return;
    }

    alert(
      `Successfully voted!\nVote: ${formData.get('lens.param.vote') === 'true' ? 'Yes' : 'No'}`,
    );
  };

  return (
    <div>
      <h1>Custom Action Example</h1>
      {loading && <p>Loading post...</p>}
      {!post && !loading && <p>Post not found</p>}
      {post && (
        <div>
          <h2>Post: {post.slug}</h2>
          <p>
            Content:{' '}
            {post.metadata?.__typename === 'TextOnlyMetadata' &&
              post.metadata.content}
          </p>
          <h3>Vote on this poll:</h3>
          <form onSubmit={handleVote}>
            <div>
              <h4>Choose your vote:</h4>
              <label>
                <input
                  type='radio'
                  name='lens.param.vote'
                  value='true'
                  required
                  disabled={executing}
                  defaultChecked
                />
                Yes
              </label>
              <label>
                <input
                  type='radio'
                  name='lens.param.vote'
                  value='false'
                  required
                  disabled={executing}
                />
                No
              </label>
            </div>
            <br />
            <button type='submit' disabled={executing}>
              {executing ? 'Voting...' : 'Vote'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
