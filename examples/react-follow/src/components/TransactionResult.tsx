interface TransactionResultProps {
  loading?: boolean;
  txHash?: string;
  message?: string;
  error?: string;
}

export function TransactionResult({ loading, txHash, message, error }: TransactionResultProps) {
  if (loading) {
    return (
      <div
        style={{
          padding: '10px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      >
        <p style={{ margin: 0, color: '#1976d2' }}>⏳ Processing transaction...</p>
      </div>
    );
  }

  if (txHash && message) {
    return (
      <div
        style={{
          padding: '10px',
          backgroundColor: '#e8f5e8',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      >
        <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold' }}>✅ {message}</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#555' }}>
          Transaction Hash:{' '}
          <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '2px' }}>
            {txHash}
          </code>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      >
        <p style={{ margin: 0, color: '#c62828' }}>❌ {error}</p>
      </div>
    );
  }

  return null;
}
