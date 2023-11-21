type ErrorMessageProps = {
  error: Error | null;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <section>
      <h3>Something went wrong</h3>
      <pre>{error?.message ?? 'Unknown error'}</pre>
    </section>
  );
}
