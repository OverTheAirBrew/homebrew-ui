import { createContext, useState } from 'react';

let GlobalContext = createContext({
  showSidebar: false,
  toggleSidebar: () => {},
});

function GlobalProvider(props: any) {
  const [showSidebar, setShowSidebar] = useState(true);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <GlobalContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

const Consumer = GlobalContext.Consumer;
export { GlobalContext, GlobalProvider, Consumer };
