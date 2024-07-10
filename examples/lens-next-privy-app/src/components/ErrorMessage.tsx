type ErrorMessageProps = {
  error: Error | null;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <section>
      <h3 className="mb-3 text-xl font-semibold text-red-700">Something went wrong</h3>
      <pre className="m-2 p-2 bg-white rounded-lg">{error?.message ?? "Unknown error"}</pre>
    </section>
  );
}
