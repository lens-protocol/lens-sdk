import type { Account } from '@lens-protocol/graphql';

interface AccountListItemProps {
  account: Account;
  onFollow: (address: string) => void;
  onUnfollow: (address: string) => void;
  isLoading: boolean;
}

export function AccountListItem({ account, onFollow, onUnfollow, isLoading }: AccountListItemProps) {
  return (
    <li style={{ marginBottom: '10px', padding: '8px', borderBottom: '1px solid #eee' }}>
      <span style={{ fontWeight: 'bold' }}>
        {account.username?.localName ?? account.address}
      </span>
      <span style={{ margin: '0 10px', color: '#666' }}>→</span>
      <span style={{ fontWeight: 'bold' }}>
        {account.operations?.isFollowedByMe ? 'Followed' : 'Not Followed'}
      </span>
      
      {/* Follow Button */}
      <button 
        onClick={() => onFollow(account.address)}
        style={{ 
          marginLeft: '50px', 
          padding: '6px 12px', 
          backgroundColor: isLoading ? '#ccc' : '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: isLoading ? 'not-allowed' : 'pointer' 
        }}
        disabled={account.operations?.isFollowedByMe || isLoading}
      >
        {isLoading ? 'Following...' : account.operations?.isFollowedByMe ? 'Following' : 'Follow'}
      </button>

      {/* Unfollow Button */}
      <button 
        onClick={() => onUnfollow(account.address)}
        style={{ 
          marginLeft: '10px', 
          padding: '6px 12px', 
          backgroundColor: isLoading ? '#ccc' : '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: isLoading ? 'not-allowed' : 'pointer' 
        }}
        disabled={!account.operations?.isFollowedByMe || isLoading}
      >
        {isLoading ? 'Unfollowing...' : account.operations?.isFollowedByMe ? 'Unfollow' : 'Not Following'}
      </button>
    </li>
  );
} 
