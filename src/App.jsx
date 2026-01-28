import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import NewsCategory from "./pages/NewsCategory";
import NewsDetails from "./pages/NewsDetails";
import { useEffect, useReducer } from "react";
import { favouritesReducer, initialState } from "./store/reducer";
import { FavouritesContext } from "./store/context";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";

const routes = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Page404 /> },
  { path: "/favourites", element: <Favourites /> },
  { path: "/category/:categoryId", element: <NewsCategory /> },
  { path: "/news/:newsId", element: <NewsDetails /> },
]);

function App() {
  const [storedFavourites, setStoredFavourites] = useLocalStorage("favourites", []);

  const [favoritesState, favoritesDispatch] = useReducer(
    favouritesReducer,
    { ...initialState, news: storedFavourites }
  );

  useEffect(() => {
    setStoredFavourites(favoritesState.news);
  }, [favoritesState.news, setStoredFavourites]);

  const favoritesConextValue = { favoritesState, favoritesDispatch };

  return (
    <div className="App">
      <FavouritesContext.Provider value={favoritesConextValue}>
        <RouterProvider router={routes} />
      </FavouritesContext.Provider>
    </div>
  );
}

export default App;
