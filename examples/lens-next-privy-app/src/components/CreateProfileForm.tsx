import { useState } from "react";
import { useCreateProfile, useValidateHandle } from "@lens-protocol/react-web";
import { Address } from "viem";
import { ButtonAlt } from "@/components/Button";

type CreateProfileFormProps = {
  address: Address;
};

export function CreateProfileForm({ address }: CreateProfileFormProps) {
  const [localName, setLocalName] = useState("");
  const { execute: validateHandle, loading: verifying } = useValidateHandle();
  const { execute: createProfile, loading: creating } = useCreateProfile();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validity = await validateHandle({ localName });

    if (validity.isFailure()) {
      window.alert(validity.error.message);
      return;
    }

    const result = await createProfile({ localName, to: address });

    if (result.isFailure()) {
      window.alert(result.error.message);
      return;
    }

    const profile = result.value;
    window.alert(`Congratulations! You now own: ${profile.handle?.fullHandle}!`);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <input
        type="text"
        className="bg-black border rounded-md px-4 py-1"
        placeholder="Enter a new handle"
        disabled={verifying || creating}
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
      />

      <ButtonAlt type="submit" disabled={verifying || creating}>
        Create
      </ButtonAlt>
    </form>
  );
}
