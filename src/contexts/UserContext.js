import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function useUser() {
  const context = useContext(UserContext);
  return context;
}

function UserProvider({ children, ...props }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={[user, setUser]} {...props}>
      {children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
