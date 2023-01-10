import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }}>
      <Link to="/">Home</Link>

      {paths.map((path, index) => {
        const to = `/${paths.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={to}>
            <span>/</span>
            <span key={to}>
              <Link to={to}>{capitalizeFirstLetter(path)}</Link>
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
