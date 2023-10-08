import { Outlet } from 'react-router-dom';

import { Breadcrumbs } from './components/Breadcrumbs';

export function Layout() {
  return (
    <>
      <Breadcrumbs />
      <Outlet />
    </>
  );
}
