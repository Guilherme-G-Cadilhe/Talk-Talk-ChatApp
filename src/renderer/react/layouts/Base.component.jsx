
import React from 'react';
import { Navbar } from '../components/export.components';


export default function BaseLayout({ children, ...props }) {

  return (
    <>
      <Navbar {...props} />
      {children}
    </>
  )
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

export const withBaseLayout = (Component, config) =>
  (props) => {
    const viewName = getDisplayName(Component)
    return (
      <>
        <Navbar {...config} view={viewName} />
        <Component {...props} />
      </>
    )
  }


