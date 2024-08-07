import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { AdminPage } from "./pages/admin-page";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import ContactPage from "./pages/contact-page";
import PortfolioPage from "./pages/portfolio-page";
import { PublicPage } from "./pages/public-page";
import CategoryPage from "./pages/category-page";
import ImageListPhoto from "./pages/ImageListPhoto";
import CategoryPhotoForm from "./pages/categoryphotoform";
import PhotosByCategory from "./pages/photosbycategory";
import ContactList from "./pages/contact-list";
import ThankYouPage from "./pages/thank-you-page";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/public" element={<PublicPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/admin" element={<AuthenticationGuard component={AdminPage} />} />
      <Route path="/ImageListPhoto" element={<AuthenticationGuard component={ImageListPhoto} />} />
      <Route path="/categoryphotoform" element={<AuthenticationGuard component={CategoryPhotoForm} />} />
      <Route path="/photosbycategory" element={<AuthenticationGuard component={PhotosByCategory} />} />
      <Route path="/contactlist" element={<AuthenticationGuard component={ContactList} />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
