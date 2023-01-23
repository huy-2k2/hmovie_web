import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { useUser } from "./UserContext";
const NotifisContext = createContext();

function useNotifis() {
  const context = useContext(NotifisContext);
  return context;
}

function NotifisProvider({ children, ...props }) {
  const [notifis, setNotifis] = useState();
  const [user] = useUser();
  useEffect(() => {
    if (user) {
      axios
        .post(`${API_BASE_URL}notifis`, {
          userId: user.id,
          accessToken: user.accessToken,
        })
        .then(({ data }) => setNotifis(data));
    }
  }, [user]);

  return (
    <NotifisContext.Provider value={[notifis, setNotifis]}>
      {children}
    </NotifisContext.Provider>
  );
}

export { useNotifis, NotifisProvider };
