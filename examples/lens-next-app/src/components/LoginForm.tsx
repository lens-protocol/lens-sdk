import { profileId, useLogin, useProfilesManaged } from "@lens-protocol/react-web";

import { ErrorMessage } from "./ErrorMessage";
import { Loading } from "./Loading";
import { Button } from "./Button";

export function LoginForm({ owner, onSuccess }: { owner: string; onSuccess?: () => void }) {
  const { execute: login, loading: isLoginPending } = useLogin();
  const { data: profiles, error, loading } = useProfilesManaged({ for: owner, includeOwned: true });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const id = profileId(formData.get("id") as string);

    const result = await login({
      address: owner,
      profileId: id,
    });

    if (result.isSuccess()) {
      console.info(`Welcome ${String(result.value?.handle?.fullHandle ?? result.value?.id)}`);
      return onSuccess?.();
    }

    console.error(result.error.message);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (profiles.length === 0) {
    return <p className="mb-4 text-base text-gray-500">No Lens Profiles found in this wallet.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex">
      <fieldset className="flex place-items-center flex-col">
        <legend className="text-base text-gray-500">Select a Lens Profile to login with.</legend>

        <div className="my-4 space-y-2">
          {profiles.map((profile, idx) => (
            <label
              key={profile.id}
              className="w-full items-center p-4 rounded-lg cursor-pointer border transition-colors border-gray-300 hover:border-gray-500 grid grid-cols-[24px_auto]"
            >
              <input
                disabled={isLoginPending}
                type="radio"
                defaultChecked={idx === 0}
                name="id"
                value={profile.id}
                className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-green-500 checked:ring-green-500"
              />
              <span className="text-gray-800 text-sm font-semibold">
                {profile.handle?.fullHandle ?? profile.id}
              </span>
            </label>
          ))}
        </div>

        <div>
          <Button disabled={isLoginPending} type="submit">
            {isLoginPending ? "Sign message in your wallet" : "Login to Lens"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
