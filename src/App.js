import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingListDetailPage from "./components/shopping-list/detail/ShoppingListDetailPage";
import ShoppingListsOverviewPage from "./components/shopping-list/overview/ShoppingListOverviewPage";
import { APIProvider } from "./components/shopping-list/APIProvider";
import { ThemeProviderWrapper } from "./components/ThemeContext";
import { TranslationProvider } from "./components/TranslationContext";

function App() {
  return (
    <TranslationProvider>
      <APIProvider>
        <ThemeProviderWrapper>
          <Router>
            <Routes>
              <Route
                path="/shopping-lists"
                element={<ShoppingListsOverviewPage />}
              />
              <Route
                path="/shopping-lists/:shoppingListId/detail"
                element={<ShoppingListDetailPage />}
              />
            </Routes>
          </Router>
        </ThemeProviderWrapper>
      </APIProvider>
    </TranslationProvider>
  );
}

export default App;