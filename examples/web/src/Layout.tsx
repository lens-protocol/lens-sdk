import { Outlet } from 'react-router-dom';

import { Breadcrumbs } from './components/Breadcrumbs';

export function Layout() {
  return (
    <>
      <div style={{ marginBottom: '1em' }}>
        <Breadcrumbs />
      </div>

      <Outlet />
    </>
  );
}
