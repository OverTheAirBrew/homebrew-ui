import { createContext, useContext, useState } from 'react';
import { connect } from 'socket.io-client';
import { isDesktop } from './is-desktop';

const socket = connect('http://localhost:9090');

const AppContext = createContext({
  sidebar: {
    show: true,
    toggle: () => {},
  },
  socket,
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
    socket,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
