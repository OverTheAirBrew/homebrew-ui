import { createContext, useContext, useState } from 'react';
import { isDesktop } from './is-desktop';

const AppContext = createContext({
  sidebar: {
    show: true,
    toggle: () => {},
  },
});

export function AppWrapper({ children }: { children: any }) {
  const [showSidebar, setSidebar] = useState(isDesktop());

  const toggleSidebar = () => {
    setSidebar(!showSidebar);
  };

  let sharedState = {
    sidebar: {
      show: showSidebar,
      toggle: toggleSidebar,
    },
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
