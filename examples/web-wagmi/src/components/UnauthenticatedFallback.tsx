import { LoginButton, WhenLoggedOut } from './auth';

type UnauthenticatedFallbackProps = {
  message?: string;
};

export function UnauthenticatedFallback({ message }: UnauthenticatedFallbackProps) {
  return (
    <WhenLoggedOut>
      <div>
        <p>{message ?? 'Log in to view this example.'}</p>
        <LoginButton />
      </div>
    </WhenLoggedOut>
  );
}
