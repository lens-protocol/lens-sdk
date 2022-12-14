type GenericErrorProps = {
  error: Error | null;
};

export function GenericError({ error }: GenericErrorProps) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error?.message ?? 'Unknown error'}</pre>
    </div>
  );
}
