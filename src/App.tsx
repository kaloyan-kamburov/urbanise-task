import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//normalize styles
import "./normalize.css";
import "react-datepicker/dist/react-datepicker.css";

//components
import Header from "./components/Header/header.component";
import Loader from "./components/Loader/loader.component";
import ContentWrapper from "./components/ContentWrapper/contentWrapper.component";

//pages integrated
import HomePage from "./pages/Home/home.page";
import NotFoundPage from "./pages/NotFound/notFound.page";

//lazy loaded pages
const ItemDetailsPage = lazy(() => import("./pages/Items/item.details.page"));
const ItemCreatePage = lazy(() => import("./pages/Items/item.create.page"));
const ItemsPage = lazy(() => import("./pages/Items/items.list.page"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Header />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/:id" element={<ItemDetailsPage />} />
            <Route path="/items/create" element={<ItemCreatePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ContentWrapper>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
