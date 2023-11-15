"use client";

import { useExploreProfiles } from "@lens-protocol/react-web";

export default function Home() {
  const { data, loading, error } = useExploreProfiles();

  if (loading) return null;

  if (!data || error) {
    return <p>Error</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-8">
      <h1 className="text-4xl font-bold">Explore Profiles</h1>

      <ul role="list" className="divide-y divide-gray-500">
        {data.map(({ handle, id, metadata }) => (
          <li className="flex justify-between gap-x-6 py-5" key={id}>
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {handle?.fullHandle ?? handle?.fullHandle ?? id}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{metadata?.bio}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
