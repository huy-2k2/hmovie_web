import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getApiUrlGenres } from "../helper";

const CategoriesContext = createContext();

function useCategories() {
  const context = useContext(CategoriesContext);
  return context;
}

function CategoriesProvider({ children, ...props }) {
  const [categories, setCategories] = useState();
  useEffect(() => {
    if (!categories)
      axios
        .get(getApiUrlGenres())
        .then(({ data: { genres } }) => setCategories(genres));
  }, [categories]);

  return (
    <CategoriesContext.Provider {...props} value={[categories, setCategories]}>
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesProvider, useCategories };
