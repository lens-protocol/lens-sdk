import {
  useAddProfileInterests,
  useRemoveProfileInterests,
  ProfileInterestTypes,
  Profile,
} from '@lens-protocol/react-web';
import { Fragment, useMemo } from 'react';

import { RequireProfileSession } from '../components/auth';

// Capitalizes each word in a string
function capitalize(label: string): string {
  return label.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

type Interest = {
  parent: string;
  value: ProfileInterestTypes;
  label: string;
};

// Processes raw interest types into structured interests array
function createInterests(categories: ProfileInterestTypes[]): Interest[] {
  return categories.map((item) => {
    const [parent, subcategory] = item.split('__');
    const label = capitalize(
      subcategory ? subcategory.replace(/_/g, ' ') : parent.replace(/_/g, ' '),
    );
    return { parent, value: item, label };
  });
}

type ButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ToggleButton({ isActive, onClick, children }: ButtonProps) {
  const normalStyle = {
    backgroundColor: 'transparent',
    border: '1px solid grey',
    color: '#111',
    outline: 'none',
  };

  const activeStyle = {
    ...normalStyle,
    backgroundColor: '#333',
    color: '#eee',
  };

  return (
    <button style={isActive ? activeStyle : normalStyle} onClick={onClick}>
      {children}
    </button>
  );
}

function UseProfileInterestsInner({ profile }: { profile: Profile }) {
  const { execute: addInterests } = useAddProfileInterests();
  const { execute: removeInterests } = useRemoveProfileInterests();

  const groupedInterests = useMemo(() => {
    const interests = createInterests(Object.values(ProfileInterestTypes));

    // Group interests by category
    return interests.reduce((acc, interest) => {
      acc[interest.parent] = acc[interest.parent] || [];
      acc[interest.parent].push(interest);
      return acc;
    }, {} as Record<string, Interest[]>);
  }, []);

  const handleClick = async (interest: ProfileInterestTypes) => {
    const request = {
      interests: [interest],
    };

    if (profile.interests.includes(interest)) {
      await removeInterests(request);
    } else {
      await addInterests(request);
    }
  };

  return (
    <div>
      {Object.entries(groupedInterests).map(([category, items]) => (
        <div key={category}>
          <h4>{capitalize(category.replace(/_/g, ' '))}</h4>
          <div>
            {items.map((item) => (
              <Fragment key={item.value}>
                <ToggleButton
                  onClick={() => handleClick(item.value)}
                  isActive={profile.interests.includes(item.value)}
                >
                  {item.label}
                </ToggleButton>{' '}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function UseProfileInterests() {
  return (
    <div>
      <h2>
        <code>useAddProfileInterests & useRemoveProfileInterests</code>
      </h2>

      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UseProfileInterestsInner profile={profile} />}
      </RequireProfileSession>
    </div>
  );
}
